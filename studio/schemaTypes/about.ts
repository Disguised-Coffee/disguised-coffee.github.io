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
      name: 'qa',
      title: 'Q&A',
      type: 'array',
      of: [
        defineField({
          name: 'qaItem',
          title: 'Question & Answer',
          type: 'object',
          fields: [
            defineField({
              name: 'q',
              title: 'Question',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'a',
              title: 'Answers',
              type: 'array',
              of: [{type: 'block'}],
              description: 'Answer as Portable Text',
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
})
