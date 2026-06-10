import {defineField, defineType} from 'sanity'

export const aboutTextSection = defineType({
  name: 'aboutTextSection',
  title: 'About Text Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'Optional section heading',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{type: 'block'}],
      validation: (Rule) => Rule.required(),
      description: 'Main body text as Portable Text',
    }),
  ],
})
