import { PortableText } from '@portabletext/react';

const portableTextComponents = {
  types: {
    image: ({ value }) => (
      <img
        src={value.asset.url}
        alt={value.alt || 'Image'}
        className="w-full h-auto my-4"
      />
    ),
  },
  block: {
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold my-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold my-3">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold my-2">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="my-2 leading-relaxed">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-400 pl-4 italic my-4">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-gray-200 px-1 py-0.5 rounded font-mono text-sm">
        {children}
      </code>
    ),
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline hover:text-blue-700"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc ml-4 my-2">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal ml-4 my-2">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="ml-2">{children}</li>,
    number: ({ children }) => <li className="ml-2">{children}</li>,
  },
};

export function RenderPortableText({ value }) {
  if (!value) {
    return <p>No content available</p>;
  }
  return <PortableText value={value} components={portableTextComponents} />;
}
