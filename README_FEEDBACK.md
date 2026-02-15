# Bagged Up Feedback System

A comprehensive, on-brand feedback collection system that saves to Supabase and automatically posts to Discord with threaded discussions.

## 🎯 Features

- **On-brand feedback form** at `/incident`
- **Automatic ID generation** (FAN-0001, FAN-0002, etc.)
- **Discord integration** - auto-creates forum threads for discussion
- **Screenshot support** - up to 5MB, stored in Supabase
- **District tagging** - links feedback to lore districts
- **Anti-spam protection** - rate limiting + honeypot
- **Color-coded embeds** - Bug (red), Feature (gold), UX (blue), Other (gray)
- **Community voting** - React with 🔥 💯 🐞 🧠 in Discord

## 🏗 Architecture

```
User submits feedback (Website)
        ↓
API validates & saves to Supabase
        ↓
Upload screenshot (if provided)
        ↓
Post to Discord Forum Channel (webhook)
        ↓
Discord creates thread automatically
        ↓
Community reacts & discusses
```

## 📁 Files Created

### Database
- `supabase/migrations/001_feedback_system.sql` - Complete schema
- `supabase/README.md` - Setup instructions

### API
- `app/api/feedback/route.ts` - Feedback submission endpoint

### UI
- `app/incident/page.tsx` - Server component page
- `src/components/FeedbackForm.tsx` - Client form component

### Documentation
- `docs/FEEDBACK_SETUP.md` - Complete setup guide
- `docs/FEEDBACK_PHASE2.md` - Optional automation guide
- `README_FEEDBACK.md` - This file

### Configuration
- `.env.local.example` - Updated with Discord webhook var

## 🚀 Quick Start

### 1. Database Setup

```bash
# In Supabase SQL Editor, run:
cat supabase/migrations/001_feedback_system.sql
```

### 2. Discord Setup

1. Create a **Forum Channel** in your Discord server
2. Add an **Incoming Webhook** to that channel
3. Copy the webhook URL

### 3. Environment Variables

```bash
# Add to .env.local
DISCORD_FEEDBACK_WEBHOOK_URL=https://discord.com/api/webhooks/YOUR_WEBHOOK_URL
```

### 4. Deploy

```bash
npm run build
vercel --prod
```

### 5. Test

Visit `/incident` on your site and submit test feedback!

## 📊 Database Schema

```sql
feedback
├── id (uuid, primary key)
├── public_id (text, unique) - "FAN-0001"
├── type (text) - Bug | Feature | UX | Other
├── district_slug (text, nullable)
├── description (text)
├── screenshot_path (text, nullable)
├── screenshot_url (text, nullable)
├── created_at (timestamptz)
├── submit_ip (text, nullable)
├── user_agent (text, nullable)
├── discord_thread_id (text, nullable)
├── discord_message_id (text, nullable)
├── votes_want (int, default 0)
├── votes_must_have (int, default 0)
├── votes_bug (int, default 0)
├── votes_idea (int, default 0)
└── status (text, default 'open')
```

## 🎨 On-Brand Naming

Instead of generic terms:
- ❌ "Submit Feedback"
- ✅ "Report an Incident"
- ✅ "Tell the City What Happened"
- ✅ "File a Play"

## 🔐 Security Features

1. **Rate Limiting** - 10 second cooldown per IP
2. **Honeypot** - Hidden field catches bots
3. **Validation** - Zod schema validation
4. **File Type Checks** - PNG/JPG/WebP only
5. **File Size Limit** - 5MB max
6. **Service Role Key** - Server-side only DB access
7. **Discord Allowed Mentions** - Prevents @everyone spam

## 🎯 User Flow

1. User visits `/incident`
2. Fills out form (Type, District, Description, Screenshot)
3. Submits → Gets incident ID (e.g., FAN-0023)
4. Discord thread auto-created
5. Community reacts in Discord
6. Team reviews and responds

## 📈 Phase 2 (Optional)

Automate vote counting and milestone tracking:

- **10 votes** → Show in "Popular Feedback"
- **25 votes** → Auto-tag "Under Review" + bot comment
- **50 votes** → Add to roadmap + bot comment

See `docs/FEEDBACK_PHASE2.md` for implementation guide.

## 🧪 Testing Checklist

- [ ] Database migration runs successfully
- [ ] Storage bucket `feedback_screenshots` created
- [ ] Form renders at `/incident`
- [ ] District dropdown populated from lore
- [ ] Submit without screenshot → Success
- [ ] Submit with screenshot → Success + image in Discord
- [ ] Discord thread created with correct title
- [ ] Embed color matches feedback type
- [ ] Public ID increments (FAN-0001, FAN-0002, etc.)
- [ ] Rate limiting triggers on rapid submission
- [ ] Invalid file type rejected
- [ ] File > 5MB rejected

## 🐛 Troubleshooting

### Discord thread not created
- Verify webhook URL is correct
- Check webhook has forum channel permissions
- Test webhook manually with curl

### Screenshot upload fails
- Verify bucket name is `feedback_screenshots`
- Check RLS policies allow service role
- Ensure file < 5MB and is PNG/JPG/WebP

### Public ID not generating
- Run: `SELECT generate_feedback_public_id();` in Supabase
- Check sequence exists: `feedback_id_seq`

## 📚 Complete Documentation

- **Setup**: `docs/FEEDBACK_SETUP.md`
- **Phase 2**: `docs/FEEDBACK_PHASE2.md`
- **Database**: `supabase/README.md`

## 🎉 Success Criteria

✅ Users can submit feedback via website
✅ Feedback auto-logs to Supabase with unique ID
✅ Discord thread auto-created per submission
✅ Screenshots stored and displayed
✅ Rate limiting prevents spam
✅ On-brand language throughout
✅ Zero SaaS cost (just infrastructure)

## 💡 Future Enhancements

- Public roadmap page (`/roadmap`)
- Admin dashboard (`/admin/feedback`)
- Email notifications for team
- Upvote/downvote on website (in addition to Discord)
- Integration with Linear/GitHub Issues
- Analytics dashboard (top districts, types, trends)
- "Feedback of the Week" feature

---

Built with ❤️ for the Fanhattan community
