import Link from 'next/link';
import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { highlight } from 'sugar-high';
import React from 'react';
import type { MDXComponents } from 'next-mdx-remote/dist/types'; // Explicitly import from dist/types for older versions if needed, or just 'next-mdx-remote'

// Define the interface for the 'data' prop of the Table component
// MDX tables often pass data directly, so we need to match the expected props for <table>
interface TableProps extends React.ComponentProps<'table'> {
  // MDX might pass data as a prop directly to the table component
  // Ensure this matches how your MDX content generates tables if it's custom
  data?: { // Make data optional as MDX might not always pass it
    headers: string[];
    rows: string[][];
  };
}

// Update the Table component to use the defined interface for its 'data' prop
// It also needs to accept other standard table props
function Table({ data, ...props }: TableProps) {
  // Provide default empty arrays if data or its properties are undefined
  const headers = data?.headers?.map((header, index) => (
    <th key={index}>{header}</th>
  )) || [];

  const rows = data?.rows?.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  )) || [];

  return (
    <table {...props}>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

// CustomLink: Align with React.ComponentProps<'a'> for MDXComponents
// MDX will pass all standard <a> tag props, including optional href, children, etc.
function CustomLink(props: React.ComponentProps<'a'>) {
  const { href, children, ...rest } = props;

  // Ensure href is a string for Link component
  if (href && href.startsWith('/')) {
    // Omit 'ref' and 'href' from restProps when passing to Link to avoid conflicts
    const { ref, href: omittedHref, ...linkProps } = rest;
    return (
      <Link href={href} {...(linkProps as React.ComponentPropsWithoutRef<typeof Link>)}>
        {children}
      </Link>
    );
  }

  // For hash links or external links, use standard <a> tag
  if (href && href.startsWith('#')) {
    return <a href={href} {...rest}>{children}</a>;
  }

  return <a target="_blank" rel="noopener noreferrer" href={href} {...rest}>{children}</a>;
}

// RoundedImage: Align with React.ComponentProps<'img'> for MDXComponents
// MDX will pass all standard <img> tag props
function RoundedImage(props: React.ComponentProps<'img'>) {
  // Ensure src and alt are always strings for Next.js Image
  const { src, alt, ...rest } = props;
  if (!src || !alt) {
    console.warn("Image component received missing src or alt prop from MDX.");
    return null;
  }
  // Cast to React.ComponentProps<typeof Image> to ensure compatibility
  return <Image src={src} alt={alt} className="rounded-lg" {...(rest as React.ComponentProps<typeof Image>)} />;
}

// Code: Align with React.ComponentProps<'code'> for MDXComponents
function Code(props: React.ComponentProps<'code'>) {
  const { children, ...rest } = props;
  // Ensure children is treated as string for highlight function
  const codeString = typeof children === 'string' ? children : String(children || '');
  let codeHTML = highlight(codeString);
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...rest} />;
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

// createHeading: Align with React.ComponentProps<'hX'> for MDXComponents
function createHeading(level: number) {
  const Heading = (props: React.ComponentProps<`h${typeof level}`>) => {
    const { children, ...rest } = props;
    let slug = slugify(typeof children === 'string' ? children : '');

    return React.createElement(
      `h${level}`,
      { id: slug, ...rest }, // Spread other props to the heading element
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

// Explicitly type the components object by inferring from MDXRemote's props
// Use a direct cast to MDXComponents to satisfy the type checker
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
