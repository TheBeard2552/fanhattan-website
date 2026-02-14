# Test Workflow Guide

Run the Sanity CMS workflow tests to verify everything works.

## Quick Test

```bash
# 1. Start the dev server (in one terminal)
npm run dev

# 2. Run the test script (in another terminal)
# Use the port your dev server is on (3000 or 3001)
./scripts/test-workflow.sh 3000
# or
./scripts/test-workflow.sh 3001
```

## What Gets Tested

| Test | Endpoint | Passes when |
|------|----------|-------------|
| Revalidate API | `POST /api/revalidate?secret=...` | Returns 200 with `revalidated: true` |
| Lore hub | `GET /lore` | Returns 200 |
| Sanity Studio | `GET /studio` | Returns 200 |
| Lore by type | `GET /lore/characters` | Returns 200 |

## Manual Tests

### 1. Test Revalidate Endpoint

```bash
# Replace YOUR_SECRET with the value of REVALIDATE_SECRET from .env.local
curl -X POST "http://localhost:3000/api/revalidate?secret=YOUR_SECRET" \
  -H "Content-Type: application/json" \
  -d '{}'
```

**Expected:** `{"revalidated":true,"now":...,"paths":["/lore"]}`

**401?** Secret in URL doesn't match `.env.local`. Restart dev server after adding env vars.

### 2. Test Lore Pages

1. Visit `http://localhost:3000/lore`
2. Should load (may show empty state if no Sanity content yet)
3. Visit `http://localhost:3000/studio`
4. Should show Sanity Studio login

### 3. Full Content Flow

1. Log into Studio at `/studio`
2. Create a Character: title, slug, summary, tags, status=Canon
3. Publish
4. Visit `/lore` — your character should appear within ~60 seconds
5. Click through to `/lore/characters/your-slug`

## Troubleshooting

**Revalidate returns 401**
- Restart dev server after adding `REVALIDATE_SECRET` to `.env.local`
- Ensure no extra spaces in the secret

**Lore/Studio return 500**
- Run `npm install` (styled-components is required for Studio)
- Check `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` in `.env.local`
- Ensure your Sanity project exists at manage.sanity.io

**Empty lore pages**
- Normal if you haven't added content yet
- Create content in Studio, set status to Canon (not Draft), and publish
