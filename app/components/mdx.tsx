import Link from 'next/link';
import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote/rsc';
import type { MDXComponents } from 'next-mdx-remote'; // Corrected import source for MDXComponents
import { highlight } from 'sugar-high';
import React from 'react';

// Define the interface for the 'data' prop of the Table component
interface TableData {
  headers: string[];
  rows: string[][];
}

// Update the Table component to use the defined interface for its 'data' prop
function Table({ data }: { data: TableData }) {
  let headers = data.headers.map((header, index) => (
    <th key={index}>{header}</th>
  ));

  let rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

// Fix for Link href type
// We'll define a more specific type for CustomLink props
// Use React.ComponentPropsWithoutRef<'a'> to avoid the ref issue more cleanly
interface CustomLinkProps extends React.ComponentPropsWithoutRef<'a'> {
  href: string; // Make href explicitly required as a string for MDX links
}

function CustomLink(props: CustomLinkProps) { // Use the new specific type
  let href = props.href;

  if (href.startsWith('/')) {
    // When using Link, ensure href is always a string.
    // Use React.ComponentPropsWithoutRef<'a'> to avoid ref issues
    return (
      <Link href={href} {...(props as React.ComponentPropsWithoutRef<typeof Link>)}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith('#')) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

function RoundedImage(props: React.ComponentProps<typeof Image>) {
  return <Image className="rounded-lg" {...props} />;
}

// Fix for Code component type: allow React.ReactNode for children
function Code({ children, ...props }: { children: string | React.ReactNode } & React.ComponentProps<'code'>) {
  // Convert children to string if it's not already
  const codeString = typeof children === 'string' ? children : String(children);
  let codeHTML = highlight(codeString);
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
}

function slugify(str: string): string {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/&/g, '-and-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

function createHeading(level: number) {
  const Heading = ({ children }: { children: string | React.ReactNode }) => {
    let slug = slugify(typeof children === 'string' ? children : '');
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement('a', {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: 'anchor',
        }),
      ],
      children
    );
  };

  Heading.displayName = `Heading${level}`;

  return Heading;
}

// Explicitly type the components object to match MDXComponents
export const components: MDXComponents = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  img: RoundedImage, // MDX uses 'img' tag, not 'Image' component name
  a: CustomLink,
  code: Code,
  table: Table,
};

export function CustomMDX(props: React.ComponentProps<typeof MDXRemote>) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
