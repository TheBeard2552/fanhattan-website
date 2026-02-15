# Phase 2: Reaction Voting & Automation (Optional)

This document outlines how to implement automated reaction tracking and milestone automation for the feedback system.

## Overview

Phase 2 adds:
- Automatic syncing of Discord reaction counts to Supabase
- Automated status updates based on vote thresholds
- Automated milestone comments in Discord threads

## Architecture

### Option 1: Vercel Cron (Recommended for Vercel deployments)

Create a scheduled API route that runs every hour to sync reactions.

**File: `app/api/cron/sync-feedback-reactions/route.ts`**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: NextRequest) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const discordBotToken = process.env.DISCORD_BOT_TOKEN;

  if (!supabaseUrl || !supabaseServiceKey || !discordBotToken) {
    return NextResponse.json({ error: 'Missing config' }, { status: 500 });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  // Get all feedback with Discord thread IDs
  const { data: feedbackList } = await supabase
    .from('feedback')
    .select('id, public_id, discord_thread_id, discord_message_id, votes_want, votes_must_have, votes_bug, votes_idea, status')
    .not('discord_message_id', 'is', null);

  if (!feedbackList) {
    return NextResponse.json({ error: 'No feedback found' }, { status: 404 });
  }

  let updated = 0;

  for (const feedback of feedbackList) {
    try {
      // Fetch message from Discord
      const messageResponse = await fetch(
        `https://discord.com/api/v10/channels/${feedback.discord_thread_id}/messages/${feedback.discord_message_id}`,
        {
          headers: {
            Authorization: `Bot ${discordBotToken}`,
          },
        }
      );

      if (!messageResponse.ok) continue;

      const message = await messageResponse.json();
      const reactions = message.reactions || [];

      // Count reactions
      const voteWant = reactions.find((r: any) => r.emoji.name === '🔥')?.count || 0;
      const voteMustHave = reactions.find((r: any) => r.emoji.name === '💯')?.count || 0;
      const voteBug = reactions.find((r: any) => r.emoji.name === '🐞')?.count || 0;
      const voteIdea = reactions.find((r: any) => r.emoji.name === '🧠')?.count || 0;

      // Calculate total votes
      const totalVotes = voteWant + voteMustHave + voteBug + voteIdea;

      // Determine new status based on thresholds
      let newStatus = feedback.status;
      if (totalVotes >= 50 && feedback.status === 'open') {
        newStatus = 'planned';
      } else if (totalVotes >= 25 && feedback.status === 'open') {
        newStatus = 'under_review';
      }

      // Update Supabase
      await supabase
        .from('feedback')
        .update({
          votes_want: voteWant,
          votes_must_have: voteMustHave,
          votes_bug: voteBug,
          votes_idea: voteIdea,
          status: newStatus,
        })
        .eq('id', feedback.id);

      // Post milestone comment if status changed
      if (newStatus !== feedback.status) {
        await postMilestoneComment(
          feedback.discord_thread_id,
          feedback.public_id,
          newStatus,
          totalVotes,
          discordBotToken
        );
      }

      updated++;
    } catch (error) {
      console.error(`Error syncing feedback ${feedback.public_id}:`, error);
    }
  }

  return NextResponse.json({ success: true, updated });
}

async function postMilestoneComment(
  threadId: string,
  publicId: string,
  status: string,
  votes: number,
  botToken: string
) {
  const statusMessages: Record<string, string> = {
    under_review: `🎯 **Milestone Reached!**\n\nThis feedback (${publicId}) has reached **${votes} votes** and is now **Under Review**. The team will evaluate this soon!`,
    planned: `🚀 **Major Milestone!**\n\nThis feedback (${publicId}) has reached **${votes} votes** and is now on the **Roadmap**! This is being seriously considered for implementation.`,
  };

  const message = statusMessages[status];
  if (!message) return;

  await fetch(`https://discord.com/api/v10/channels/${threadId}/messages`, {
    method: 'POST',
    headers: {
      'Authorization': `Bot ${botToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content: message,
      allowed_mentions: { parse: [] },
    }),
  });
}
```

**Configure Vercel Cron in `vercel.json`:**

```json
{
  "crons": [
    {
      "path": "/api/cron/sync-feedback-reactions",
      "schedule": "0 * * * *"
    }
  ]
}
```

### Option 2: Supabase Edge Function

Create a Supabase Edge Function with cron trigger.

**File: `supabase/functions/sync-feedback-reactions/index.ts`**

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

serve(async (req) => {
  // Similar implementation as above
  // ...
});
```

Then set up pg_cron in Supabase to trigger it hourly.

## Required Environment Variables

Add to `.env.local` and Vercel/deployment platform:

```bash
# Discord Bot Token (for reading reactions)
DISCORD_BOT_TOKEN=your_bot_token_here

# Cron secret (for Vercel Cron authentication)
CRON_SECRET=your_random_secret_here
```

## Discord Bot Setup

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application
3. Go to "Bot" section and create a bot
4. Enable these intents:
   - Message Content Intent (to read messages)
   - Guild Messages (to read messages)
5. Generate a bot token and save it as `DISCORD_BOT_TOKEN`
6. Invite the bot to your server with these permissions:
   - Read Messages
   - Send Messages
   - Read Message History
7. Invite URL: `https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=68608&scope=bot`

## Vote Thresholds

Default thresholds (configurable):

- **10 votes**: Appears in "Popular Feedback" view (UI only)
- **25 votes**: Status → "Under Review" + bot posts comment
- **50 votes**: Status → "Planned" + bot posts comment

## Testing

1. Deploy the cron route
2. Manually trigger it: `curl -H "Authorization: Bearer YOUR_CRON_SECRET" https://your-app.vercel.app/api/cron/sync-feedback-reactions`
3. Check Discord thread for milestone comment
4. Verify Supabase vote counts updated

## Alternative: Manual Review Process

If you prefer not to automate, you can:
1. Weekly review Discord threads manually
2. Update status in Supabase directly
3. Post milestone comments manually
4. This gives you more control over what gets prioritized

## Cost Considerations

- **Vercel Cron**: Free tier includes 100 cron jobs/month (hourly = ~720/month, use daily instead)
- **Discord API**: Free, rate limited to 50 requests/second
- **Supabase**: Edge Functions have generous free tier

## Monitoring

Add logging to track:
- Number of feedback items synced
- API errors
- Status changes triggered
- Discord post failures

Store in a `feedback_sync_logs` table for debugging.
