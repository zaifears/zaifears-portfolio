import Image from 'next/image';
import { fetchBlogPostBySlug } from '@/lib/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { notFound } from 'next/navigation';
import type { Document } from '@contentful/rich-text-types';

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = params;

  const post = await fetchBlogPostBySlug(slug);

  console.log('Fetched blog post:', JSON.stringify(post, null, 2));

  if (!post) {
    notFound();
  }

  const { title, date, coverImage, content } = post.fields;
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
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      )}

      <div>{content && documentToReactComponents(content as Document)}</div>
    </article>
  );
}
