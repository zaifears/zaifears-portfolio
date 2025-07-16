import Image from 'next/image';
import { fetchBlogPostBySlug, type BlogPost } from '@/lib/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { notFound } from 'next/navigation';
import type { Document } from '@contentful/rich-text-types';

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const post = await fetchBlogPostBySlug(params.slug);
  
  if (!post) notFound();

  const { title, date, content, coverImage } = post.fields;
  const coverImageUrl = coverImage?.fields?.file?.url;

  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      
      {date && (
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
            fill
            priority
            className="rounded-lg object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
          />
        </div>
      )}

      <div className="rich-text-content">
        {content && documentToReactComponents(content)}
      </div>
    </article>
  );
}