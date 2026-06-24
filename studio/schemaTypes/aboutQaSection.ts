import {defineField, defineType} from 'sanity'

export const aboutQaSection = defineType({
  name: 'aboutQaSection',
  title: 'About Q&A Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'Optional section heading',
    }),
    defineField({
      name: 'items',
      title: 'Q&A Items',
      type: 'array',
      of: [{type: 'aboutQaItem'}],
      validation: (Rule) => Rule.required(),
    }),
  ],
})
