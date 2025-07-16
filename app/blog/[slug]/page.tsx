import Image from 'next/image';
import { fetchBlogPostBySlug, BlogPost } from '@/lib/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { notFound } from 'next/navigation';
import type { Document } from '@contentful/rich-text-types';

// Define the props for the dynamic page component
interface ImmichPostPageProps {
  params: Promise<{ // params is now expected to be a Promise
    slug: string; // The slug will be passed from the URL
  }>;
}

export default async function ImmichPostPage({ params }: ImmichPostPageProps) {
  // Await the params object before destructuring it
  const { slug } = await params; // <--- CRUCIAL CHANGE HERE

  // Fetch the specific post using the slug from the URL
  const post = (await fetchBlogPostBySlug(slug)) as BlogPost | null;

  // --- Debugging Console Log ---
  console.log('Full fetched post object:', JSON.stringify(post, null, 2));
  // --- END ADDITION ---

  // If Contentful doesn't find the post, show a 404 page
  if (!post) {
    notFound();
  }

  // Safely access fields using optional chaining and nullish coalescing
  const title = post.fields.title || 'Untitled Post';
  const date = post.fields.date;
  const coverImageUrl = post.fields.coverImage?.fields?.file?.url;
  const content = post.fields.content as Document;

  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1 className="text-3xl font-bold mb-4">
        {title}
      </h1>
      {date && typeof date === 'string' && (
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-8">
          Posted on {new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      )}

      {coverImageUrl && (
        <div className="relative w-full h-64 md:h-96 mb-8">
          <Image
            src={`https:${coverImageUrl}`}
            alt={`Cover image for ${title}`}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      )}

      <div>
        {content && documentToReactComponents(content)}
      </div>
    </article>
  );
}
