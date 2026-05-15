import {defineField, defineType} from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Project Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'dn',
      title: 'Designation Name',
      type: 'string',
      description: 'Internal project designation (e.g., "project-github-website-v3")',
    }),
    defineField({
      name: 'image',
      title: 'Project Image',
      type: 'object',
      fields: [
        defineField({
          name: 'asset',
          title: 'Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
        defineField({
          name: 'caption',
          title: 'Caption',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'object',
      fields: [
        defineField({
          name: 'begin',
          title: 'Start Date',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'end',
          title: 'End Date',
          type: 'string',
        }),
        defineField({
          name: 'ongoing',
          title: 'Is Ongoing?',
          type: 'boolean',
          description: 'Check if the project is still ongoing',
        }),
      ],
    }),
    defineField({
      name: 'desc',
      title: 'Description',
      type: 'array',
      of: [{type: 'block'}],
      validation: (Rule) => Rule.required(),
      description: 'Project description as Portable Text',
    }),
    defineField({
      name: 'icon',
      title: 'Project Icon',
      type: 'reference',
      to: [{type: 'icon'}],
      description: 'Reference to the project icon',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      description: 'URL-friendly slug for the project',
    }),
    defineField({
      name: 'misc',
      title: 'Miscellaneous Links',
      type: 'array',
      of: [
        defineField({
          name: 'miscLink',
          title: 'Link',
          type: 'object',
          fields: [
            defineField({
              name: 'src',
              title: 'URL',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'type',
              title: 'Link Type',
              type: 'string',
              options: {
                list: [
                  {title: 'Site', value: 'site'},
                  {title: 'GitHub', value: 'github'},
                  {title: 'Video', value: 'video'},
                ],
              },
            }),
            defineField({
              name: 'display',
              title: 'Display Text',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'isHighlight',
      title: 'Is Highlight?',
      type: 'boolean',
      description: 'Mark as a highlighted/featured project',
    }),
    defineField({
      name: 'note',
      title: 'Special Note',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Note Text',
          type: 'string',
        }),
        defineField({
          name: 'links',
          title: 'Links in Note',
          type: 'array',
          of: [
            defineField({
              name: 'noteLink',
              title: 'Link',
              type: 'object',
              fields: [
                defineField({
                  name: 'src',
                  title: 'URL',
                  type: 'string',
                }),
                defineField({
                  name: 'type',
                  title: 'Link Type',
                  type: 'string',
                  options: {
                    list: [
                      {title: 'GitHub', value: 'github'},
                      {title: 'LinkedIn', value: 'lin'},
                      {title: 'Site', value: 'site'},
                    ],
                  },
                }),
                defineField({
                  name: 'display',
                  title: 'Display Text',
                  type: 'string',
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'chips',
      title: 'Project Tags/Chips',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Tags to display on the project card',
    }),
  ],
})
