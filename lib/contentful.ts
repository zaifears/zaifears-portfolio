import {
  createClient,
  Entry,
  EntrySkeletonType,
  Asset,
  EntrySys,
  OrderFilterPaths,
  EntriesQueries,
} from 'contentful';
import type { Document } from '@contentful/rich-text-types';

// Asset fields interface (do NOT constrain to ChainModifiers)
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

// Define fields for your blog post
export interface BlogPostFields {
  title: string;
  slug: string;
  date: string;
  coverImage: Asset<ContentfulAssetFields>;
  content: Document;
}

// This is critical: define the EntrySkeletonType *correctly* by
// including the contentTypeId and fields as expected
export interface BlogPostSkeleton extends EntrySkeletonType {
  contentTypeId: 'zaifearsBlogPost';
  fields: BlogPostFields;
}

// Define the type for the entry itself, referencing BlogPostFields and contentTypeId
export type BlogPost = Entry<BlogPostFields, 'zaifearsBlogPost'>;

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
});

// This is the correct way to type the order property to accept 'fields.date'
const orderDate = ['fields.date'] as (OrderFilterPaths<EntrySys, 'sys'> | `fields.${string}`)[];

// Fetch all blog posts ordered by date
export async function fetchBlogPosts(): Promise<BlogPost[]> {
  const entries = await client.getEntries<BlogPostSkeleton>({
    content_type: 'zaifearsBlogPost',
    order: orderDate,
  });
  return entries.items as BlogPost[];
}

// Fetch single blog post by slug - notice use of `EntriesQueries` to allow 'fields.slug'
export async function fetchBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const entries = await client.getEntries<BlogPostSkeleton>({
    content_type: 'zaifearsBlogPost',
    query: {
      'fields.slug': slug,
    } as unknown as EntriesQueries<BlogPostSkeleton, undefined>, // workaround for typings
    limit: 1,
  });
  return entries.items.length > 0 ? (entries.items[0] as BlogPost) : null;
}
