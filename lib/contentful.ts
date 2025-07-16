// lib/contentful.ts

import { createClient, Entry, EntrySkeletonType, Asset } from 'contentful';
import type { Document } from '@contentful/rich-text-types';

// Define the structure of the 'file' property within an Asset's fields
interface AssetFileDetails {
  url: string;
  details: {
    size: number;
    image?: {
      width: number;
      height: number;
    };
  };
  fileName: string;
  contentType: string;
}

// Define the structure of the *fields object* within a Contentful Asset
// This includes 'title', 'description', and 'file'
interface ContentfulAssetFields {
  title?: string; // Optional: if your Contentful asset has a title field
  description?: string; // Optional: if your Contentful asset has a description field
  file: AssetFileDetails; // The 'file' property itself
}

// Define the structure of your blog post fields as they appear in Contentful
// This interface directly represents the 'fields' object of your Contentful entry
interface BlogPostFields {
  title: string;
  slug: string;
  date: string;
  coverImage: Asset<ContentfulAssetFields>; // Use the Asset type with its specific fields
  content: Document;
}

// Define the skeleton for the blog post content type.
// This interface primarily links the content type ID to its fields structure.
export interface BlogPostSkeleton extends EntrySkeletonType {
  contentTypeId: 'zaifearsBlogPost'; // This MUST match your Contentful Content Type ID
  fields: BlogPostFields; // Link the fields interface here
}

// Define the complete BlogPost entry type using Contentful's Entry generic.
// This tells TypeScript that a BlogPost is an Entry where the 'fields' property
// conforms to BlogPostFields and the 'contentType' has 'zaifearsBlogPost' as its ID.
export type BlogPost = Entry<BlogPostFields, 'zaifearsBlogPost'>;


// Ensure your Contentful Space ID and Access Token are set as environment variables.
const spaceId = process.env.CONTENTFUL_SPACE_ID;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

// --- Debugging Console Logs ---
console.log('Contentful Space ID:', spaceId ? 'Set' : 'Not Set');
console.log('Contentful Access Token:', accessToken ? 'Set' : 'Not Set');
// --- End Debugging Console Logs ---

if (!spaceId || !accessToken) {
  console.error('Contentful Space ID or Access Token is not set. Please check your .env.local file.');
}

// Create Contentful client instance.
// The generic type here tells the client what kind of entries it will be fetching.
const client = createClient<BlogPostSkeleton>({ // Use BlogPostSkeleton here
  space: spaceId || '',
  accessToken: accessToken || '',
});

/**
 * Fetches all blog posts from Contentful.
 *
 * @returns A promise that resolves to an array of blog post entries.
 */
export async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    // The getEntries method will return entries that conform to BlogPostSkeleton,
    // which then get cast to BlogPost (Entry<BlogPostFields, ...>)
    const entries = await client.getEntries<BlogPostSkeleton>({
      content_type: 'zaifearsBlogPost',
      order: ['-fields.date'],
    });
    // --- Debugging Console Logs ---
    console.log('Fetched blog posts count:', entries.items.length);
    if (entries.items.length > 0) {
      console.log('First fetched post title:', entries.items[0].fields.title);
    }
    // --- End Debugging Console Logs ---
    return entries.items as BlogPost[];
  } catch (error) {
    console.error('Error fetching blog posts from Contentful:', error);
    return [];
  }
}

/**
 * Fetches a single blog post by its slug.
 *
 * @param slug The slug of the blog post to fetch.
 * @returns A promise that resolves to the blog post entry, or null if not found.
 */
export async function fetchBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    // Similarly, getEntries for a single slug
    const entries = await client.getEntries<BlogPostSkeleton>({
      content_type: 'zaifearsBlogPost',
      'fields.slug': slug,
      limit: 1,
    });
    // --- Debugging Console Logs ---
    console.log(`Fetched post for slug "${slug}":`, entries.items[0] ? entries.items[0].fields.title : 'Not Found');
    // --- End Debugging Console Logs ---
    return (entries.items[0] as BlogPost) || null;
  } catch (error) {
    console.error(`Error fetching blog post with slug "${slug}" from Contentful:`, error);
    return null;
  }
}
