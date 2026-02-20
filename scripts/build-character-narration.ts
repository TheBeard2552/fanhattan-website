#!/usr/bin/env tsx
/**
 * Build plain-text narration scripts from character markdown files.
 *
 * Reads content/characters/*.md and writes one .txt per character into
 * .generated/narration/characters/<slug>.txt.  Those .txt files are then
 * consumed by the Python TTS synthesis step.
 *
 * Usage: tsx scripts/build-character-narration.ts [--force]
 *   --force  re-generate all files even if output is newer than input
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import stripMarkdown from 'strip-markdown';

const CHARACTERS_DIR = path.join(process.cwd(), 'content', 'characters');
const OUTPUT_DIR = path.join(process.cwd(), '.generated', 'narration', 'characters');
const FORCE = process.argv.includes('--force');

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function markdownToPlainText(md: string): string {
  // strip-markdown operates synchronously via remark's .processSync
  const file = remark().use(stripMarkdown).processSync(md);
  return String(file).trim();
}

function buildNarration(frontmatter: Record<string, string>, bodyRaw: string): string {
  const lines: string[] = [];

  lines.push(frontmatter.name + '.');

  if (frontmatter.role) {
    lines.push(frontmatter.role + '.');
  }

  if (bodyRaw) {
    // Strip the leading h1 heading before converting to avoid duplicate name.
    // Trim first so ^ matches even when gray-matter leaves a leading newline.
    const withoutH1 = bodyRaw.trim().replace(/^#+\s+.+(\r?\n|$)/, '').trim();
    if (withoutH1) {
      const bodyPlain = markdownToPlainText(withoutH1);
      if (bodyPlain) {
        lines.push(bodyPlain);
      }
    }
  }

  return lines.join('\n\n');
}

function isOutputStale(inputPath: string, outputPath: string): boolean {
  if (FORCE) return true;
  if (!fs.existsSync(outputPath)) return true;
  const inputMtime = fs.statSync(inputPath).mtimeMs;
  const outputMtime = fs.statSync(outputPath).mtimeMs;
  return inputMtime > outputMtime;
}

function main() {
  ensureDir(OUTPUT_DIR);

  const mdFiles = fs
    .readdirSync(CHARACTERS_DIR)
    .filter((f) => f.endsWith('.md') || f.endsWith('.mdx'))
    .map((f) => path.join(CHARACTERS_DIR, f));

  let generated = 0;
  let skipped = 0;

  for (const inputPath of mdFiles) {
    const basename = path.basename(inputPath, path.extname(inputPath));
    const outputPath = path.join(OUTPUT_DIR, `${basename}.txt`);

    if (!isOutputStale(inputPath, outputPath)) {
      skipped++;
      continue;
    }

    const raw = fs.readFileSync(inputPath, 'utf-8');
    const { data, content } = matter(raw);

    // Slug defaults to filename if frontmatter doesn't set it
    const slug = (data.slug as string | undefined) ?? basename;

    const narration = buildNarration(data as Record<string, string>, content);

    const outputFile = path.join(OUTPUT_DIR, `${slug}.txt`);
    fs.writeFileSync(outputFile, narration, 'utf-8');

    console.log(`✓ ${slug}`);
    generated++;
  }

  console.log(`\nDone. Generated: ${generated}, Skipped (up-to-date): ${skipped}`);
}

main();
