import {defineField, defineType} from 'sanity'

export const icon = defineType({
  name: 'icon',
  title: 'Icon',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Icon Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Name of the icon (e.g., "React", "Node.js")',
    }),
    defineField({
      name: 'svg',
      title: 'SVG File',
      type: 'file',
      validation: (Rule) => Rule.required(),
      description: 'SVG file for the icon',
      options: {
        accept: '.svg',
      },
    }),
  ],
})
