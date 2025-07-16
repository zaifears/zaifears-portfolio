// app/blog/[slug]/page.tsx

import { notFound } from 'next/navigation';
import { fetchBlogPostBySlug } from '@/lib/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import type { Metadata } from 'next';
import Image from 'next/image';

type BlogPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const post = await fetchBlogPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.fields.title,
    description: post.fields.description || '',
  };
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const post = await fetchBlogPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const { title, date, content, coverImage } = post.fields;

  return (
    <article className="max-w-3xl mx-auto py-10">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>

      {date && (
        <p className="text-gray-500 mb-4">
          {new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      )}

      {coverImage?.fields?.file?.url && (
        <div className="relative w-full h-64 mb-6">
          <Image
            src={`https:${coverImage.fields.file.url}`}
            alt={coverImage.fields.title || title}
            fill
            className="rounded object-cover"
            priority
          />
        </div>
      )}

      <div className="prose prose-lg dark:prose-invert">
        {documentToReactComponents(content)}
      </div>
    </article>
  );
}
