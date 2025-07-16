import Image from 'next/image';
import { fetchBlogPostBySlug, BlogPost } from '@/lib/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { notFound } from 'next/navigation';
import type { Document } from '@contentful/rich-text-types';

// Define the props for the dynamic page component
interface ImmichPostPageProps {
  params: {
    slug: string; // The slug will be passed from the URL
  };
}

export default async function ImmichPostPage({ params }: ImmichPostPageProps) {
  const { slug } = params;

  const post = (await fetchBlogPostBySlug(slug)) as BlogPost | null;

  if (!post) {
    notFound();
  }

  // Debug: Log post fields to verify data shape
  console.log('Post fields:', post.fields);

  const title = post.fields.title || 'Untitled Post';
  const date = post.fields.date;
  const coverImageUrl = post.fields.coverImage?.fields?.file?.url;
  const content = post.fields.content as Document;

  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>

      {date && typeof date === 'string' && (
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-8">
          Posted on{' '}
          {new Date(date).toLocaleDateString('en-US', {
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
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-lg"
          />
        </div>
      )}

      <div>{content && documentToReactComponents(content)}</div>
    </article>
  );
}
