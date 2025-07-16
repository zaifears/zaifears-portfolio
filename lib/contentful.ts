import { createClient } from 'contentful';
import type { Entry, EntrySkeletonType, Asset } from 'contentful';
import type { Document } from '@contentful/rich-text-types';

interface BlogPostFields {
  title: string;
  slug: string;
  date: string;
  coverImage: Asset;
  content: Document;
}

export interface BlogPostSkeleton extends EntrySkeletonType {
  contentTypeId: 'zaifearsBlogPost';
  fields: BlogPostFields;
}

export type BlogPost = Entry<BlogPostSkeleton>;

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    const { items } = await client.getEntries<BlogPostSkeleton>({
      content_type: 'zaifearsBlogPost',
      order: ['-fields.date'] as any,
    });
    return items;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function fetchBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const { items } = await client.getEntries<BlogPostSkeleton>({
      content_type: 'zaifearsBlogPost',
      'fields.slug': slug as any,
      limit: 1,
      include: 2, // Resolve linked assets
    });
    return items[0] ?? null;
  } catch (error) {
    console.error(`Error fetching post "${slug}":`, error);
    return null;
  }
}