# Sanity CMS Setup Guide

This guide will help you set up Sanity CMS for managing lore content.

## Step 1: Create a Sanity Project

1. Go to [manage.sanity.io](https://manage.sanity.io)
2. Click "Create new project"
3. Give your project a name (e.g., "Bagged Up Lore")
4. Choose a dataset name (usually "production")
5. Copy your Project ID

## Step 2: Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`
2. Fill in your Sanity credentials:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-02-14
   REVALIDATE_SECRET=generate_a_random_string_here
   ```

## Step 3: Deploy the Studio

The Sanity Studio is already configured to run at `/studio` in your Next.js app.

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Visit `http://localhost:3000/studio`

3. Log in with your Sanity account

## Step 4: Set Up User Roles (Invite-Only Access)

### For Writers (Contributors):
1. Go to [manage.sanity.io](https://manage.sanity.io)
2. Select your project
3. Go to "Members" in the sidebar
4. Click "Invite members"
5. Enter the writer's email address
6. Select "Contributor" role (can create/edit drafts, cannot publish)
7. Send invite

### For Publishers (You):
- Your account automatically has "Administrator" access
- You can publish drafts and manage all content

## Step 5: Configure Webhook for Auto-Revalidation

To make published content appear on the site immediately:

1. Go to [manage.sanity.io](https://manage.sanity.io) > Your Project > API > Webhooks
2. Click "Create webhook"
3. Configure:
   - **Name**: "Production Revalidation"
   - **URL**: `https://your-domain.com/api/revalidate?secret=YOUR_REVALIDATE_SECRET`
   - **Dataset**: production
   - **Trigger on**: Create, Update, Delete
   - **Filter**: Leave blank (revalidate on all changes)
   - **Projection**: `{_type, "slug": slug.current}`
   - **HTTP method**: POST
   - **API version**: v2021-06-07

4. Save the webhook

## Step 6: Create Your First Lore Entry

1. Visit `/studio` in your browser
2. Click the "+" button
3. Select a document type (Character, District, Artifact, or Chapter)
4. Fill in the required fields:
   - **Title**: The name of your lore entry
   - **Slug**: Auto-generated from title (click "Generate")
   - **Summary**: 1-2 sentence description
   - **Tags**: Add at least one tag
   - **Body**: Write your full lore story
   - **Status**: Set to "Draft" for now
5. Click "Save"

## Step 7: Publish Content

### As a Writer:
- Save drafts (they won't appear on the public site)
- Request review from the publisher

### As a Publisher (You):
1. Review the draft content
2. Click "Publish" in the top right
3. Content will appear on the site within 60 seconds (or immediately if webhook is configured)

## Workflow Tips

### Draft → Review → Publish
1. **Writers** create content and save as drafts (status: "draft")
2. **Writers** notify you when content is ready
3. **You** review the draft in Studio
4. **You** publish the entry
5. Site automatically revalidates (if webhook is set up)

### Content Types
- **Characters**: People who shape Fanhattan
- **Districts**: Neighborhoods and locations
- **Artifacts**: Powerful objects and items
- **Chapters**: Story moments and events

### Best Practices
- Always add relevant **tags** for filtering
- Link related content using **Related Lore** field
- Add **District** references to connect your lore
- Use **Featured** sparingly (only 1 entry should be featured at a time)
- Set **Timeline Order** if you want manual control over timeline display

## Troubleshooting

### Can't see published content on the site?
- Check that status is set to "Canon" or "Apocrypha" (not "Draft")
- Wait 60 seconds for ISR to refresh
- Or trigger manual revalidation: POST to `/api/revalidate?secret=YOUR_SECRET`

### Writer can't publish?
- This is by design! Only Administrators can publish
- Writers should notify you when content is ready

### Images not showing?
- Make sure heroImage is uploaded in Sanity
- Images are automatically optimized and served via Sanity CDN

### Need help?
- Sanity docs: [sanity.io/docs](https://sanity.io/docs)
- Next.js ISR docs: [nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration)
