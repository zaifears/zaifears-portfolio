import { createClient, Entry, Asset, EntrySkeletonType, EntryFields } from 'contentful';
import type { Document } from '@contentful/rich-text-types';

// Define the shape of asset fields
interface ContentfulAssetFields {
  title?: string;
  description?: string;
  file: {
    url: string;
    details: {
      size: number;
      image?: { width: number; height: number };
    };
    fileName: string;
    contentType: string;
  };
}

// Define the fields for a blog post
export interface BlogPostFields {
  title: string;
  slug: string;
  date: string;
  coverImage: Asset<ContentfulAssetFields>;
  content: Document;
}

// Entry skeleton for Contentful typings
export interface BlogPostSkeleton extends EntrySkeletonType {
  contentTypeId: 'zaifearsBlogPost'; // This must match your Contentful content type ID exactly
  fields: BlogPostFields;
}

// Type for a blog post entry
export type BlogPost = Entry<BlogPostSkeleton>;

// Initialize Contentful client
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
});

// Fetch all blog posts sorted by date
export async function fetchBlogPosts(): Promise<BlogPost[]> {
  const entries = await client.getEntries<BlogPostSkeleton>({
    content_type: 'zaifearsBlogPost',
    order: '-fields.date',
  });
  return entries.items as BlogPost[];
}

// Fetch a single blog post by slug
export async function fetchBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const entries = await client.getEntries<BlogPostSkeleton>({
    content_type: 'zaifearsBlogPost',
    'fields.slug': slug,
    limit: 1,
  } as any); // use `as any` only if TypeScript complains

  return entries.items.length > 0 ? (entries.items[0] as BlogPost) : null;
}
