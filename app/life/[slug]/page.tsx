import { Metadata } from 'next';
import { contentfulClient } from '@/lib/contentfulClient';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, CalendarDays, Clock } from 'lucide-react';

// ISR: revalidate every 60 seconds instead of hitting Contentful on every request
export const revalidate = 60;

// Define the type for a single Life Event
interface LifeEvent {
  fields: {
    title: string;
    date: string;
    slug: string;
    content: any; // Rich text field
    coverImage?: {
      fields: {
        file?: {
          url: string;
          details: { image: { width: number; height: number; }; };
        };
        title?: string;
      };
    };
  };
}

// Function to fetch a single life event by its slug
async function getLifeEvent(slug: string): Promise<LifeEvent | null> {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'zaifearsBlogPost',
      'fields.slug': slug,
      limit: 1,
      include: 2,
    });
    return response.items.length > 0 ? response.items[0] as unknown as LifeEvent : null;
  } catch (error) {
    console.error('Failed to fetch life event from Contentful:', error);
    return null;
  }
}
// Generate static params for faster loading
export async function generateStaticParams() {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'zaifearsBlogPost',
      select: ['fields.slug'],
      limit: 1000,
    });
    
    return response.items.map((item: any) => ({
      slug: item.fields.slug,
    }));
  } catch (error) {
    console.error('Failed to fetch life events for static params:', error);
    return [];
  }
}
// Generate dynamic metadata for SEO and prefetching
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = await getLifeEvent(slug);

  if (!event) {
    return { title: 'Post Not Found' };
  }

  const description = event.fields.content
    ? documentToPlainTextString(event.fields.content).substring(0, 160)
    : '';

  return {
    title: event.fields.title,
    description,
    openGraph: {
      title: event.fields.title,
      description,
      type: 'article',
      publishedTime: event.fields.date,
      ...(event.fields.coverImage?.fields?.file?.url && {
        images: [{ url: `https:${event.fields.coverImage.fields.file.url}` }],
      }),
    },
  };
}

// Function to get the YouTube video ID from a URL
function getYouTubeVideoId(url: string) {
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname === 'youtu.be') {
      return urlObj.pathname.slice(1);
    }
    return urlObj.searchParams.get('v');
  } catch (e) {
    return null;
  }
}

// Fixed for Next.js 15 - params is now a Promise
export default async function LifePostPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  // Await the params since it's now a Promise in Next.js 15
  const { slug } = await params;
  const event = await getLifeEvent(slug);

  if (!event) {
    return (
      <section>
        <h1 className="font-bold text-3xl md:text-4xl mb-8">Post not found</h1>
        <p className="text-gray-600 dark:text-neutral-400">Sorry, we couldn't find the post you were looking for.</p>
        <Link href="/life" className="text-blue-600 dark:text-blue-400 hover:underline mt-4 inline-block">
          &larr; Back to Life Journey
        </Link>
      </section>
    );
  }

  const renderOptions = {
    renderNode: {
      [BLOCKS.EMBEDDED_ENTRY]: (node: any) => {
        const target = node.data?.target;
        if (!target?.sys?.contentType) return null;
        if (target.sys.contentType.sys.id === 'video') {
          const videoId = getYouTubeVideoId(target.fields.youtubeUrl);
          if (!videoId) return <p>Could not load YouTube video.</p>;
          
          return (
            <div className="relative overflow-hidden my-8" style={{ paddingTop: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          );
        }
        return null;
      },
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        const file = node.data?.target?.fields?.file;
        const title = node.data?.target?.fields?.title || 'Embedded image';
        if (!file?.url) return null;
        return (
          <div className="my-8">
            <Image
              src={`https:${file.url}`}
              alt={title}
              width={file.details?.image?.width || 800}
              height={file.details?.image?.height || 600}
              className="rounded-lg w-full h-auto max-w-full"
            />
          </div>
        );
      },
    },
  };

  const readingTime = event.fields.content
    ? Math.max(1, Math.ceil(documentToPlainTextString(event.fields.content).split(/\s+/).length / 200))
    : 1;

  return (
    <article className="max-w-4xl mx-auto overflow-x-hidden">
      {/* Back navigation */}
      <Link 
        href="/life" 
        className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-10 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Life Journey
      </Link>

      {/* Article header */}
      <header className="mb-10 text-center md:text-left">
        <h1 className="font-bold text-3xl md:text-5xl lg:text-[3.5rem] leading-tight tracking-tight text-gray-900 dark:text-white mb-6">
          {event.fields.title}
        </h1>
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-5 gap-y-2 text-sm text-gray-500 dark:text-neutral-400">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="w-4 h-4" />
            <time dateTime={event.fields.date}>
              {new Date(event.fields.date).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric',
              })}
            </time>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {readingTime} min read
          </span>
        </div>
      </header>

      {/* Cover image */}
      {event.fields.coverImage?.fields?.file?.url && (
        <figure className="mb-12">
          <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-neutral-800">
            <Image
              src={`https:${event.fields.coverImage.fields.file.url}`}
              alt={event.fields.coverImage.fields.title || 'Cover Image'}
              width={event.fields.coverImage.fields.file.details.image.width}
              height={event.fields.coverImage.fields.file.details.image.height}
              className="object-cover w-full"
              priority
            />
          </div>
          {event.fields.coverImage.fields.title && (
            <figcaption className="mt-3 text-center text-sm text-gray-400 dark:text-neutral-500">
              {event.fields.coverImage.fields.title}
            </figcaption>
          )}
        </figure>
      )}

      {/* Article body */}
      <div className="prose prose-lg prose-gray dark:prose-invert max-w-none text-justify
        prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-left
        prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
        prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
        prose-p:leading-relaxed prose-p:text-gray-700 dark:prose-p:text-neutral-300
        prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
        prose-img:rounded-xl prose-img:border prose-img:border-gray-200 dark:prose-img:border-neutral-800 prose-img:max-w-full prose-img:h-auto
        prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50/50 dark:prose-blockquote:bg-blue-900/10 prose-blockquote:rounded-r-lg prose-blockquote:py-1 prose-blockquote:not-italic
        prose-li:marker:text-blue-500
        [&_iframe]:max-w-full [&_table]:overflow-x-auto [&_pre]:overflow-x-auto">
        {documentToReactComponents(event.fields.content, renderOptions)}
      </div>

      {/* Bottom navigation */}
      <div className="mt-16 mb-16 md:mb-0 pt-8 border-t border-gray-200 dark:border-neutral-800">
        <Link 
          href="/life" 
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 dark:bg-neutral-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-full transition-all group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          All posts
        </Link>
      </div>
    </article>
  );
}