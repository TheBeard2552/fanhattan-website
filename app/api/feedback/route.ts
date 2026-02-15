import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';

// Validation schema for feedback form fields
const feedbackSchema = z.object({
  type: z.enum(['Bug', 'Feature', 'UX', 'Other'], {
    errorMap: () => ({ message: 'Please select a valid feedback type' }),
  }),
  districtSlug: z.string().optional().nullable(),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(2000, 'Description must be less than 2000 characters'),
  // Honeypot field - should be empty for legitimate users
  website: z.string().optional(),
});

// Simple in-memory rate limiting (best-effort, resets on redeploy)
const ipCooldowns = new Map<string, number>();
const COOLDOWN_MS = 10000; // 10 seconds between submissions from same IP

// Allowed file types and max size
const ALLOWED_MIME_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0] ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const lastSubmit = ipCooldowns.get(ip);

  if (lastSubmit && now - lastSubmit < COOLDOWN_MS) {
    return false; // Too soon
  }

  ipCooldowns.set(ip, now);

  // Cleanup old entries
  if (ipCooldowns.size > 1000) {
    const cutoff = now - COOLDOWN_MS * 2;
    for (const [key, value] of ipCooldowns.entries()) {
      if (value < cutoff) {
        ipCooldowns.delete(key);
      }
    }
  }

  return true;
}

// Color mapping for Discord embeds
const EMBED_COLORS = {
  Bug: 0xef4444, // red
  Feature: 0xeab308, // gold
  UX: 0x3b82f6, // blue
  Other: 0x6b7280, // gray
};

async function postToDiscord(
  webhookUrl: string,
  feedback: {
    publicId: string;
    type: string;
    districtSlug: string | null;
    description: string;
    screenshotUrl: string | null;
  }
): Promise<{ threadId: string; messageId: string } | null> {
  try {
    const embed = {
      title: `${getEmojiForType(feedback.type)} NEW ${feedback.type.toUpperCase()} REPORT`,
      description: feedback.description,
      color: EMBED_COLORS[feedback.type as keyof typeof EMBED_COLORS],
      fields: [
        { name: 'ID', value: `#${feedback.publicId}`, inline: true },
        { name: 'Type', value: feedback.type, inline: true },
        ...(feedback.districtSlug
          ? [
              {
                name: 'District',
                value: formatDistrictName(feedback.districtSlug),
                inline: true,
              },
            ]
          : []),
        { name: 'Submitted via', value: 'Website', inline: true },
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: 'React with 🔥 (Want), 💯 (Must Have), 🐞 (Bug), or 🧠 (Idea)',
      },
      ...(feedback.screenshotUrl && { image: { url: feedback.screenshotUrl } }),
    };

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        thread_name: `${feedback.publicId} Discussion`,
        embeds: [embed],
        allowed_mentions: { parse: [] },
      }),
    });

    if (!response.ok) {
      console.error('Discord webhook error:', await response.text());
      return null;
    }

    const message = await response.json();
    return {
      threadId: message.channel_id || null,
      messageId: message.id || null,
    };
  } catch (error) {
    console.error('Error posting to Discord:', error);
    return null;
  }
}

function getEmojiForType(type: string): string {
  const emojiMap: Record<string, string> = {
    Bug: '🐞',
    Feature: '💡',
    UX: '🎨',
    Other: '📝',
  };
  return emojiMap[type] || '📝';
}

function formatDistrictName(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export async function POST(request: NextRequest) {
  try {
    // Check environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const discordWebhookUrl = process.env.DISCORD_FEEDBACK_WEBHOOK_URL;

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Missing Supabase environment variables');
      return NextResponse.json(
        { ok: false, message: 'Server configuration error' },
        { status: 500 }
      );
    }

    if (!discordWebhookUrl) {
      console.error('Missing Discord webhook URL');
      return NextResponse.json(
        { ok: false, message: 'Discord integration not configured' },
        { status: 500 }
      );
    }

    // Parse multipart form data
    const formData = await request.formData();
    const type = formData.get('type') as string;
    const districtSlug = formData.get('districtSlug') as string | null;
    const description = formData.get('description') as string;
    const website = formData.get('website') as string;
    const screenshot = formData.get('screenshot') as File | null;

    // Validate form fields
    const validation = feedbackSchema.safeParse({
      type,
      districtSlug: districtSlug || null,
      description,
      website,
    });

    if (!validation.success) {
      return NextResponse.json(
        {
          ok: false,
          message: validation.error.errors[0]?.message || 'Invalid input',
        },
        { status: 400 }
      );
    }

    const { type: validType, districtSlug: validDistrict, description: validDescription } = validation.data;

    // Honeypot check
    if (website) {
      console.log('Honeypot triggered:', { type, website });
      return NextResponse.json({ ok: false, message: 'Invalid submission' }, { status: 400 });
    }

    // Rate limiting
    const ip = getClientIp(request);
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { ok: false, message: 'Too many requests. Please try again in a moment.' },
        { status: 429 }
      );
    }

    // Validate screenshot if provided
    if (screenshot && screenshot.size > 0) {
      if (screenshot.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { ok: false, message: 'Screenshot must be smaller than 5MB' },
          { status: 400 }
        );
      }

      if (!ALLOWED_MIME_TYPES.includes(screenshot.type)) {
        return NextResponse.json(
          { ok: false, message: 'Screenshot must be PNG, JPG, or WebP format' },
          { status: 400 }
        );
      }
    }

    // Create Supabase client with service role key
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    const userAgent = request.headers.get('user-agent') || null;

    // Insert feedback record
    const { data: feedbackData, error: insertError } = await supabase
      .from('feedback')
      .insert({
        type: validType,
        district_slug: validDistrict || null,
        description: validDescription,
        submit_ip: ip,
        user_agent: userAgent,
      })
      .select('id, public_id')
      .single();

    if (insertError || !feedbackData) {
      console.error('Supabase insert error:', insertError);
      return NextResponse.json(
        { ok: false, message: 'Failed to save feedback. Please try again.' },
        { status: 500 }
      );
    }

    const publicId = feedbackData.public_id;
    let screenshotUrl: string | null = null;

    // Upload screenshot if provided
    if (screenshot && screenshot.size > 0) {
      try {
        const fileExt = screenshot.name.split('.').pop() || 'png';
        const fileName = `${Date.now()}-${screenshot.name}`;
        const filePath = `${publicId}/${fileName}`;

        const arrayBuffer = await screenshot.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const { error: uploadError } = await supabase.storage
          .from('feedback_screenshots')
          .upload(filePath, buffer, {
            contentType: screenshot.type,
            upsert: false,
          });

        if (uploadError) {
          console.error('Screenshot upload error:', uploadError);
        } else {
          // Get public URL (or signed URL for private buckets)
          const { data: urlData } = supabase.storage
            .from('feedback_screenshots')
            .getPublicUrl(filePath);

          screenshotUrl = urlData.publicUrl;

          // Update feedback record with screenshot info
          await supabase
            .from('feedback')
            .update({
              screenshot_path: filePath,
              screenshot_url: screenshotUrl,
            })
            .eq('id', feedbackData.id);
        }
      } catch (uploadError) {
        console.error('Screenshot processing error:', uploadError);
        // Continue anyway - feedback is saved
      }
    }

    // Post to Discord
    const discordResult = await postToDiscord(discordWebhookUrl, {
      publicId,
      type: validType,
      districtSlug: validDistrict || null,
      description: validDescription,
      screenshotUrl,
    });

    // Update with Discord IDs if successful
    if (discordResult) {
      await supabase
        .from('feedback')
        .update({
          discord_thread_id: discordResult.threadId,
          discord_message_id: discordResult.messageId,
        })
        .eq('id', feedbackData.id);
    }

    return NextResponse.json({
      ok: true,
      message: 'Feedback submitted successfully!',
      publicId,
      discordPosted: !!discordResult,
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { ok: false, message: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
