import {defineField, defineType} from 'sanity'

export const aboutQaItem = defineType({
  name: 'aboutQaItem',
  title: 'About Q&A Item',
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
      title: 'Answer',
      type: 'array',
      of: [{type: 'block'}],
      validation: (Rule) => Rule.required(),
      description: 'Answer as Portable Text',
    }),
  ],
})
