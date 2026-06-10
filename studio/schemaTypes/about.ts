import {defineField, defineType} from 'sanity'

export const about = defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'About Me',
      description: 'Page title (usually "About Me")',
    }),
    defineField({
      name: 'lastUpdate',
      title: 'Last Updated',
      type: 'string',
      description: 'Date when this was last updated (e.g., "August 17, 2024")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sections',
      title: 'About Sections',
      type: 'array',
      of: [
        {type: 'aboutQaSection'},
        {type: 'aboutTextSection'},
      ],
      validation: (Rule) => Rule.required(),
      description: 'Section builder for the About page',
    }),
    defineField({
      name: 'qa',
      title: 'Legacy Q&A',
      type: 'array',
      of: [{type: 'aboutQaItem'}],
      description: 'Legacy field kept for older content; prefer About Sections instead',
    }),
  ],
})
