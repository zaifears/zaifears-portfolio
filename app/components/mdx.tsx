import React, { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Custom Image component to fix width/height types for next/image
function CustomImage({
  src,
  alt,
  width,
  height,
  ...rest
}: {
  src: string;
  alt: string;
  width?: string | number;
  height?: string | number;
  [key: string]: any;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={typeof width === 'string' ? parseInt(width, 10) : width || 800}
      height={typeof height === 'string' ? parseInt(height, 10) : height || 400}
      {...rest}
    />
  );
}

// Custom Link component to avoid 'href' type issues and ref errors
function CustomLink({ href, children, ...rest }: { href: string; children: ReactNode; [key: string]: any }) {
  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  );
}

// MDX components mapping
export const MDXComponents = {
  a: CustomLink,
  img: CustomImage,

  // You can add or override more elements if needed
  // For example headings h1, h2 etc., paragraphs, etc.
};

export default MDXComponents;
