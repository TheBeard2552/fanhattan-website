import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'loreArtifact',
  title: 'Artifact',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(1).max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().min(10).max(500),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required().min(1),
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'district',
      title: 'District',
      type: 'reference',
      to: [{ type: 'loreDistrict' }],
    }),
    defineField({
      name: 'relatedLore',
      title: 'Related Lore',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            { type: 'loreCharacter' },
            { type: 'loreDistrict' },
            { type: 'loreArtifact' },
            { type: 'loreChapter' },
          ],
        },
      ],
    }),
    defineField({
      name: 'relatedCollectibles',
      title: 'Related Collectibles',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Slugs of related collectibles',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Canon', value: 'canon' },
          { title: 'Apocrypha', value: 'apocrypha' },
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
      description: 'Show this entry as featured on the lore hub',
    }),
    defineField({
      name: 'timelineOrder',
      title: 'Timeline Order',
      type: 'number',
      description: 'Higher numbers appear first in timeline. Leave blank to use publish date.',
    }),
    defineField({
      name: 'updatedAt',
      title: 'Updated At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'status',
      media: 'heroImage',
    },
  },
});
