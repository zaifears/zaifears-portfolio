import { createClient, Entry, EntrySkeletonType, Asset, OrderFilterPaths } from 'contentful';
import type { Document } from '@contentful/rich-text-types';

// Asset fields interface (no need to constrain to ChainModifiers)
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

// Blog post fields only
export interface BlogPostFields {
  title: string;
  slug: string;
  date: string;
  coverImage: Asset<ContentfulAssetFields>;
  content: Document;
}

// BlogPostSkeleton type extending EntrySkeletonType (required for typings)
export interface BlogPostSkeleton extends EntrySkeletonType {
  contentTypeId: 'zaifearsBlogPost';  // your content type id
  fields: BlogPostFields;
}

export type BlogPost = Entry<BlogPostFields, 'zaifearsBlogPost'>;

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
});

// Cast order string array to satisfy typing
const orderDate = ['fields.date'] as unknown as OrderFilterPaths<any, 'sys'>[];

// Fetch all blog posts ordered by date
export async function fetchBlogPosts(): Promise<BlogPost[]> {
  const entries = await client.getEntries<BlogPostSkeleton>({
    content_type: 'zaifearsBlogPost',
    order: orderDate,
  });
  return entries.items as BlogPost[];
}

// Fetch single blog post by slug with casting
export async function fetchBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const entries = await client.getEntries<BlogPostSkeleton>({
    content_type: 'zaifearsBlogPost',
    // Here, types may not allow dynamic keys easily; cast as any
    'fields.slug': slug as any,
    limit: 1,
  });
  return entries.items.length > 0 ? (entries.items[0] as BlogPost) : null;
}
