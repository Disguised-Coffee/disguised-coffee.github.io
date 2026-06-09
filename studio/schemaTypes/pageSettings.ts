import {defineField, defineType} from 'sanity'

export const pageSettings = defineType({
  name: 'pageSettings',
  title: 'Page Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Home Page Settings',
      description: 'Internal title for this settings document',
    }),
    defineField({
      name: 'mainHeading',
      title: 'Main Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'The main "Hello World" heading',
    }),
    defineField({
      name: 'secondaryHeading',
      title: 'Secondary Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'The "FROM DISGUISED_COFFEE" heading',
    }),
    defineField({
      name: 'mainCaptions',
      title: 'Main Captions',
      type: 'array',
      of: [{type: 'block'}],
      validation: (Rule) => Rule.required(),
      description: 'Captions displayed on the page (e.g., "Student Programmer," and "and Computer Engineer.")',
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Text displayed on the learn more button',
    }),
    defineField({
      name: 'codeSnippets',
      title: 'Code Snippets for Typing Animation',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Array of code snippets for the typing animation',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
