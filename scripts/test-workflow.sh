#!/bin/bash
# Test workflow for Sanity CMS integration
# Run with: ./scripts/test-workflow.sh [port]
# Default port: 3000

PORT=${1:-3000}
BASE="http://localhost:$PORT"

# Load REVALIDATE_SECRET from .env.local
REVALIDATE_SECRET=""
if [ -f .env.local ]; then
  REVALIDATE_SECRET=$(grep '^REVALIDATE_SECRET=' .env.local | cut -d= -f2- | tr -d '"' | tr -d "'")
fi

echo "=== Sanity CMS Workflow Test ==="
echo "Base URL: $BASE"
echo ""

# 1. Test revalidate endpoint
echo "1. Testing /api/revalidate..."
REVALIDATE_RESPONSE=$(curl -s -w "\nHTTP_CODE:%{http_code}" -X POST "$BASE/api/revalidate?secret=$REVALIDATE_SECRET" -H "Content-Type: application/json" -d '{}')
REVALIDATE_BODY=$(echo "$REVALIDATE_RESPONSE" | sed '/HTTP_CODE:/d')
REVALIDATE_CODE=$(echo "$REVALIDATE_RESPONSE" | grep 'HTTP_CODE:' | sed 's/HTTP_CODE://')

if [ "$REVALIDATE_CODE" = "200" ]; then
  echo "   ✓ Revalidate endpoint OK (200)"
  echo "   Response: $REVALIDATE_BODY"
else
  echo "   ✗ Revalidate failed (HTTP $REVALIDATE_CODE)"
  echo "   Response: $REVALIDATE_BODY"
  if [ "$REVALIDATE_CODE" = "401" ]; then
    echo "   Tip: Check REVALIDATE_SECRET in .env.local matches the secret in the URL"
  fi
fi
echo ""

# 2. Test lore hub page
echo "2. Testing /lore..."
LORE_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/lore")
if [ "$LORE_CODE" = "200" ]; then
  echo "   ✓ Lore hub OK (200)"
else
  echo "   ✗ Lore hub failed (HTTP $LORE_CODE)"
  echo "   Tip: Ensure Sanity project is set up and NEXT_PUBLIC_SANITY_* env vars are correct"
fi
echo ""

# 3. Test Sanity Studio
echo "3. Testing /studio..."
STUDIO_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/studio")
if [ "$STUDIO_CODE" = "200" ]; then
  echo "   ✓ Studio OK (200)"
else
  echo "   ✗ Studio failed (HTTP $STUDIO_CODE)"
  echo "   Tip: Run 'npm install styled-components' if you see module not found errors"
fi
echo ""

# 4. Test lore type pages
echo "4. Testing /lore/characters..."
CHAR_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/lore/characters")
if [ "$CHAR_CODE" = "200" ]; then
  echo "   ✓ Lore characters OK (200)"
else
  echo "   ✗ Lore characters failed (HTTP $CHAR_CODE)"
fi
echo ""

echo "=== Test complete ==="
echo ""
echo "Next steps:"
echo "  - Visit $BASE/studio to add lore content"
echo "  - Create a Character, set status to Canon, publish"
echo "  - Visit $BASE/lore to see your content"
echo "  - After deploy: add webhook in manage.sanity.io for instant updates"
