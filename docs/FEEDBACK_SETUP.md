# Feedback System Setup Guide

Complete setup instructions for the Bagged Up feedback system.

## Prerequisites

- Supabase project with database access
- Discord server with admin permissions
- Vercel deployment (or similar Next.js host)

## Step 1: Database Setup

1. Open your Supabase project dashboard
2. Go to SQL Editor
3. Run the migration file: `supabase/migrations/001_feedback_system.sql`
4. Verify the `feedback` table was created successfully

### Verify Database

```sql
-- Check table exists
SELECT * FROM feedback LIMIT 1;

-- Test public_id generation
INSERT INTO feedback (type, description) 
VALUES ('Bug', 'Test feedback');

SELECT public_id FROM feedback ORDER BY created_at DESC LIMIT 1;
-- Should return something like "FAN-0001"
```

## Step 2: Storage Setup

1. In Supabase Dashboard, go to **Storage**
2. Verify `feedback_screenshots` bucket exists
3. If not, create it manually:
   - Name: `feedback_screenshots`
   - Public: **No** (we'll use signed URLs)
   - File size limit: 5MB
   - Allowed MIME types: `image/png, image/jpeg, image/jpg, image/webp`

### Test Storage

```typescript
// Upload test in SQL Editor or via client
SELECT storage.buckets WHERE name = 'feedback_screenshots';
```

## Step 3: Discord Setup

### Create Forum Channel

1. In your Discord server, create a new channel
2. Select **Forum** as the channel type
3. Name it something like `city-feedback` or `incident-reports`
4. Configure:
   - Set up tags (optional): Bug, Feature, UX, Other
   - Set default reaction: 🔥
   - Enable "Require users to select tags"

### Create Webhook

1. Right-click the forum channel → **Edit Channel**
2. Go to **Integrations** → **Webhooks**
3. Click **New Webhook**
4. Name it "Feedback Bot" or similar
5. Copy the **Webhook URL**
6. Save it as `DISCORD_FEEDBACK_WEBHOOK_URL` in your `.env.local`

Example webhook URL format:
```
https://discord.com/api/webhooks/123456789/abcdefghijklmnopqrstuvwxyz
```

## Step 4: Environment Variables

### Local Development (`.env.local`)

```bash
# Supabase (already configured)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Discord Webhook (NEW)
DISCORD_FEEDBACK_WEBHOOK_URL=https://discord.com/api/webhooks/YOUR_WEBHOOK_URL
```

### Production (Vercel)

1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add the same variables as above
4. Make sure `DISCORD_FEEDBACK_WEBHOOK_URL` is marked as **Secret**
5. Redeploy your app

## Step 5: Test the System

### Test 1: Submit Feedback via UI

1. Navigate to `/incident` on your site
2. Fill out the form:
   - Type: Bug
   - District: (any)
   - Description: "Test feedback submission"
   - Screenshot: (optional)
3. Submit
4. Verify:
   - ✅ Success message shows with ID like "FAN-0001"
   - ✅ Check Supabase: row appears in `feedback` table
   - ✅ Check Discord: new thread created in forum channel
   - ✅ Discord embed has correct color (red for Bug)

### Test 2: Screenshot Upload

1. Submit feedback with a screenshot (< 5MB, PNG/JPG)
2. Verify:
   - ✅ Screenshot appears in Discord embed
   - ✅ File exists in Supabase Storage bucket
   - ✅ `screenshot_path` and `screenshot_url` populated in database

### Test 3: Rate Limiting

1. Submit feedback
2. Immediately try to submit again
3. Should get error: "Too many requests. Please try again in a moment."

### Test 4: Validation

1. Try submitting without selecting Type → Error
2. Try description < 10 chars → Error
3. Try description > 2000 chars → Error
4. Try screenshot > 5MB → Error
5. Try non-image file → Error

## Step 6: Add to Navigation (Optional)

Update your main navigation to include the feedback link:

```tsx
// src/components/Nav.tsx or similar
<Link 
  href="/incident" 
  className="text-sm font-display uppercase tracking-wide text-foreground/80 hover:text-platform transition-colors"
>
  Report Incident
</Link>
```

## Troubleshooting

### No Discord Thread Created

1. Check Discord webhook URL is correct
2. Verify webhook has permission to post in the forum channel
3. Check server logs for Discord API errors
4. Test webhook manually:
   ```bash
   curl -X POST "YOUR_WEBHOOK_URL" \
     -H "Content-Type: application/json" \
     -d '{"content": "Test message"}'
   ```

### Screenshot Upload Fails

1. Verify Storage bucket exists and is named `feedback_screenshots`
2. Check RLS policies allow service role to insert
3. Verify file size < 5MB and type is PNG/JPG/WebP
4. Check Supabase logs in dashboard

### Public ID Not Generating

1. Verify sequence exists: `SELECT * FROM pg_sequences WHERE sequencename = 'feedback_id_seq';`
2. Verify function exists: `\df generate_feedback_public_id`
3. Test function directly: `SELECT generate_feedback_public_id();`

### Rate Limit Not Working

1. Rate limiting is in-memory and resets on redeploy
2. For production, consider Redis or Upstash Rate Limit
3. IP detection may not work behind certain proxies

## Next Steps

Once basic feedback is working:

1. **Analytics**: Add a page to view all feedback (`/admin/feedback`)
2. **Phase 2**: Implement reaction syncing (see `FEEDBACK_PHASE2.md`)
3. **Public Roadmap**: Create a page showing popular feedback
4. **Email Notifications**: Alert on new high-priority feedback

## Weekly Maintenance

Every Friday (or your chosen cadence):

1. Review new feedback in Discord
2. React to acknowledge you've seen it
3. Update status in Supabase for items being worked on
4. Post updates in Discord threads
5. Close resolved items

## Support

- Discord API Docs: https://discord.com/developers/docs
- Supabase Docs: https://supabase.com/docs
- Next.js API Routes: https://nextjs.org/docs/app/building-your-application/routing/route-handlers
