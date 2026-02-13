import { z } from 'zod';

export const LoreTypeSchema = z.enum(['characters', 'districts', 'artifacts']);
export const LoreStatusSchema = z.enum(['canon', 'apocrypha', 'draft']);

export const LoreFrontmatterSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  type: LoreTypeSchema,
  summary: z.string().min(1, 'Summary is required'),
  tags: z.array(z.string()).min(1, 'At least one tag is required'),
  related: z.array(z.string()),
  updatedAt: z.union([
    z.string(),
    z.date(),
  ]).transform((val) => (val instanceof Date ? val.toISOString() : val)).pipe(
    z.string().refine((val) => {
      const date = new Date(val);
      return !isNaN(date.getTime());
    }, 'updatedAt must be a valid ISO 8601 datetime')
  ),
  status: LoreStatusSchema,
  heroImage: z.string().optional(),
});

export type LoreFrontmatterInput = z.infer<typeof LoreFrontmatterSchema>;
