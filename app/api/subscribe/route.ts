import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';

// Validation schema
const subscribeSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  source: z.string().optional().default('homepage'),
  // Honeypot field - should be empty for legitimate users
  website: z.string().optional(),
});

// Simple in-memory rate limiting (best-effort, resets on redeploy)
const ipCooldowns = new Map<string, number>();
const COOLDOWN_MS = 5000; // 5 seconds between submissions from same IP

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
  
  // Cleanup old entries (keep map from growing forever)
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

export async function POST(request: NextRequest) {
  try {
    // Check environment variables
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Missing Supabase environment variables');
      return NextResponse.json(
        { ok: false, message: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validation = subscribeSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { 
          ok: false, 
          message: validation.error.errors[0]?.message || 'Invalid input' 
        },
        { status: 400 }
      );
    }

    const { email, source, website } = validation.data;

    // Honeypot check - reject if filled
    if (website) {
      console.log('Honeypot triggered:', { email, website });
      return NextResponse.json(
        { ok: false, message: 'Invalid submission' },
        { status: 400 }
      );
    }

    // Rate limiting
    const ip = getClientIp(request);
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { ok: false, message: 'Too many requests. Please try again in a moment.' },
        { status: 429 }
      );
    }

    // Create Supabase client with service role key
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    // Upsert email (lowercase for consistency)
    const normalizedEmail = email.toLowerCase().trim();
    const userAgent = request.headers.get('user-agent') || null;

    const { error } = await supabase
      .from('email_signups')
      .upsert(
        {
          email: normalizedEmail,
          source,
          consent: true,
          ip,
          user_agent: userAgent,
        },
        {
          onConflict: 'email',
          ignoreDuplicates: false, // Update timestamp even on duplicates
        }
      );

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { ok: false, message: 'Failed to save email. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: "You're on the list! Thanks for joining.",
    });

  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { ok: false, message: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
