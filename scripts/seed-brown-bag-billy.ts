// @ts-nocheck - Standalone script, @sanity/client may not be installed
/**
 * Seed script: Add Brown Bag Billy character and Stadium South district to Sanity
 * Run: npx tsx scripts/seed-brown-bag-billy.ts
 *
 * Requires SANITY_API_TOKEN in .env.local (create at manage.sanity.io → API → Tokens)
 */

import { config } from 'dotenv';

// Load .env.local
config({ path: '.env.local' });

import { createClient } from '@sanity/client';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !dataset || !token) {
  console.error('Missing env vars. Need: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-02-14',
  token,
  useCdn: false,
});

// Helper: create a portable text block
let keyCounter = 0;
function block(text: string, style: 'normal' | 'h2' | 'h3' = 'normal') {
  keyCounter++;
  const key = `b${keyCounter}${Date.now().toString(36)}`;
  return {
    _type: 'block',
    _key: key,
    style,
    children: [{ _type: 'span', _key: `${key}s`, text, marks: [] }],
    markDefs: [],
  };
}

async function main() {
  console.log('Seeding Brown Bag Billy and Stadium South...\n');

  // 1. Create Stadium South district
  const districtId = 'loreDistrict-stadium-south';
  const districtDoc = {
    _id: districtId,
    _type: 'loreDistrict',
    title: 'Stadium South',
    slug: { _type: 'slug', current: 'stadium-south' },
    summary: 'The heart of Fanhattan\'s resistance. A district built on the ruins of the old stadium, where the Brownbag family legacy runs deep and the Syndicate\'s grip is weakest.',
    tags: ['resistance', 'stadium', 'brownbag'],
    status: 'canon',
    featured: true,
    body: [
      block('Stadium South is the spiritual home of the Resistance and the Brownbag family.', 'normal'),
    ],
  };

  await client.createOrReplace(districtDoc);
  console.log('✓ Stadium South district created');

  // 2. Create Brown Bag Billy character
  const characterBody = [
    block('Role', 'h2'),
    block('Probability manipulator, Resistance operative, living legend (post-merger)', 'normal'),
    block('What They Want', 'h2'),
    block('To protect Fanhattan from the Syndicate while figuring out who the hell he actually is—and whether "Brown Bag Billy the Legend" is something he chose or something the city forced him to become.', 'normal'),
    block('What Stands In Their Way', 'h2'),
    block('The Syndicate\'s infrastructure (wounded but rebuilding). The Convergence (global threat, barely understood). His own fractured identity—he\'s not just Billy anymore, he\'s a merged-timeline entity, and that comes with psychological costs nobody warned him about. Also his dad fucked off to chase The Convergence, leaving him holding the bag (pun intended).', 'normal'),
    block('What They\'re Willing to Risk', 'h2'),
    block('Everything. His identity. His sanity. His probability stability. Billy\'s already proven he\'ll walk into snake-faced nightmares and probability torture if it means protecting the people he cares about. The merger made him confident, not cautious.', 'normal'),
    block('Reputation (Street Truth)', 'h2'),
    block('Depends who you ask. The Resistance thinks he\'s their best shot at beating the Syndicate. The Syndicate thinks he\'s a dangerous anomaly who needs to be eliminated or controlled. The old-timers in Stadium South remember his family and figure he\'s just another Brownbag trying not to get killed—though even they\'re starting to wonder if the kid\'s actually something special.', 'normal'),
    block('On the street? "The guy with the bag who does impossible shit." Half the city thinks he\'s lucky. The other half thinks he\'s cheating. Nobody can prove either way, which makes him terrifying.', 'normal'),
    block('Private Truth', 'h2'),
    block('He\'s scared shitless that the merger didn\'t make him stronger—it just made him better at pretending to be strong. Every time he uses his abilities, he feels pieces of himself scattering across probability branches. He doesn\'t know if there\'s a Billy Brownbag underneath the legend anymore, or if he became the mask when he put it on.', 'normal'),
    block('Also: he misses his dad. Won\'t admit it. Shouldn\'t admit it, considering what Richard did. But he misses him anyway.', 'normal'),
  ];

  const characterDoc = {
    _id: 'loreCharacter-brown-bag-billy',
    _type: 'loreCharacter',
    title: 'Brown Bag Billy',
    slug: { _type: 'slug', current: 'brown-bag-billy' },
    summary: 'Probability manipulator and Resistance operative. A merged-timeline entity who protects Fanhattan from the Syndicate while wrestling with his own fractured identity. Living legend—or just a kid holding the bag.',
    district: { _type: 'reference', _ref: districtId },
    tags: ['protagonist', 'resistance', 'probability', 'stadium-south', 'brownbag'],
    status: 'canon',
    featured: true,
    body: characterBody,
    timelineOrder: 100,
    updatedAt: new Date().toISOString(),
  };

  await client.createOrReplace(characterDoc);
  console.log('✓ Brown Bag Billy character created');

  console.log('\nDone! View at:');
  console.log('  - /lore/characters/brown-bag-billy');
  console.log('  - /lore/districts/stadium-south');
  console.log('\nOr edit in Studio: /studio');
}

main().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
