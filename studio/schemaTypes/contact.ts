import {defineField, defineType} from 'sanity'

export const contact = defineType({
  name: 'contact',
  title: 'Contact',
  type: 'document',
  fields: [
    defineField({
      name: 'site',
      title: 'Site Name',
      type: 'string',
      description: 'Name of the contact site (e.g., "GitHub", "LinkedIn")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
