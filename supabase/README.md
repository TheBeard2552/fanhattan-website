# Supabase Setup

## Running Migrations

1. Go to your Supabase Dashboard
2. Navigate to the SQL Editor
3. Run the migration files in order from the `migrations/` folder

## Storage Setup

After running the SQL migrations:

1. Go to Storage in your Supabase Dashboard
2. Verify that the `feedback_screenshots` bucket was created
3. If not created automatically, create it manually with these settings:
   - Bucket name: `feedback_screenshots`
   - Public: No (we'll use signed URLs for secure access)
   - File size limit: 5MB
   - Allowed MIME types: image/png, image/jpeg, image/jpg, image/webp

## Environment Variables

Make sure your `.env.local` has:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
DISCORD_FEEDBACK_WEBHOOK_URL=your-discord-webhook-url
```
