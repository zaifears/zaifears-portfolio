import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import { getContentfulEntries } from '@/lib/contentfulClient';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import {
  BLOCKS,
  INLINES,
  type Document,
  type Node,
} from '@contentful/rich-text-types';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, CalendarDays, Clock } from 'lucide-react';

const baseUrl = 'https://shahoriar.bd';
const siteName = 'Md Al Shahoriar Hossain';
const authorName = 'Md Al Shahoriar Hossain';

export const revalidate = 60;

interface ContentfulImageFile {
  url: string;
  details?: {
    image?: {
      width: number;
      height: number;
    };
  };
}

interface ContentfulImage {
  fields: {
    file?: ContentfulImageFile;
    title?: string;
  };
}

interface LifeEventFields {
  title: string;
  date: string;
  slug: string;
  content: Document;
  excerpt?: string;
  seoTitle?: string;
  seoDescription?: string;
  coverImage?: ContentfulImage;
}

interface LifeEvent {
  sys: {
    updatedAt: string;
  };
  fields: LifeEventFields;
}

interface RelatedPost {
  fields: {
    title: string;
    date: string;
    slug: string;
    excerpt?: string;
  };
}

interface EmbeddedEntryTarget {
  sys?: {
    contentType?: {
      sys?: {
        id?: string;
      };
    };
  };
  fields?: {
    youtubeUrl?: string;
  };
}

interface EmbeddedAssetTarget {
  fields?: {
    file?: ContentfulImageFile;
    title?: string;
  };
}

function normalizeText(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

function limitDescription(value: string, maxLength = 160): string {
  const normalizedValue = normalizeText(value);

  if (normalizedValue.length <= maxLength) {
    return normalizedValue;
  }

  return `${normalizedValue.slice(0, maxLength - 1).trimEnd()}…`;
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function getImageUrl(coverImage?: ContentfulImage): string | undefined {
  const imageUrl = coverImage?.fields.file?.url;

  if (!imageUrl) {
    return undefined;
  }

  return imageUrl.startsWith('http') ? imageUrl : `https:${imageUrl}`;
}

function getPostTitle(event: LifeEvent): string {
  return event.fields.seoTitle?.trim() || event.fields.title;
}

function getPostDescription(event: LifeEvent): string {
  const contentText = documentToPlainTextString(event.fields.content);

  return (
    event.fields.seoDescription?.trim() ||
    event.fields.excerpt?.trim() ||
    limitDescription(contentText)
  );
}

function isEmbeddedEntryTarget(value: unknown): value is EmbeddedEntryTarget {
  return typeof value === 'object' && value !== null;
}

function isEmbeddedAssetTarget(value: unknown): value is EmbeddedAssetTarget {
  return typeof value === 'object' && value !== null;
}

function isUpdatedAfterPublished(event: LifeEvent): boolean {
  return (
    new Date(event.sys.updatedAt).getTime() >
    new Date(event.fields.date).getTime()
  );
}

function getYouTubeVideoId(url: string): string | null {
  try {
    const urlObject = new URL(url);

    if (urlObject.hostname === 'youtu.be') {
      return urlObject.pathname.slice(1);
    }

    return urlObject.searchParams.get('v');
  } catch {
    return null;
  }
}

async function getLifeEvent(slug: string): Promise<LifeEvent | null> {
  try {
    const response = await getContentfulEntries({
      content_type: 'zaifearsBlogPost',
      'fields.slug': slug,
      limit: 1,
      include: 2,
    });

    const event = response.items[0];

    return event ? (event as unknown as LifeEvent) : null;
  } catch (error) {
    console.error('Failed to fetch blog post from Contentful:', error);
    return null;
  }
}

async function getRelatedPosts(
  currentSlug: string
): Promise<RelatedPost[]> {
  try {
    const response = await getContentfulEntries({
      content_type: 'zaifearsBlogPost',
      'fields.slug[ne]': currentSlug,
      order: '-fields.date',
      limit: 3,
      select: [
        'fields.title',
        'fields.date',
        'fields.slug',
        'fields.excerpt',
      ],
    });

    return response.items as unknown as RelatedPost[];
  } catch (error) {
    console.error('Failed to fetch related blog posts:', error);
    return [];
  }
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  try {
    const response = await getContentfulEntries({
      content_type: 'zaifearsBlogPost',
      select: ['fields.slug'],
      limit: 1000,
    });

    return response.items
      .map((item) => {
        const fields = item.fields as { slug?: unknown };

        return typeof fields.slug === 'string'
          ? { slug: fields.slug }
          : null;
      })
      .filter((item): item is { slug: string } => item !== null);
  } catch (error) {
    console.error('Failed to fetch blog posts for static params:', error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = await getLifeEvent(slug);

  if (!event) {
    return {
      title: 'Post Not Found',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = getPostTitle(event);
  const description = getPostDescription(event);
  const articleUrl = `${baseUrl}/life/${event.fields.slug}`;
  const imageUrl = getImageUrl(event.fields.coverImage);

  return {
    title,
    description,
    alternates: {
      canonical: articleUrl,
    },
    authors: [
      {
        name: authorName,
        url: baseUrl,
      },
    ],
    openGraph: {
      type: 'article',
      url: articleUrl,
      siteName,
      title,
      description,
      publishedTime: event.fields.date,
      modifiedTime: event.sys.updatedAt,
      authors: [authorName],
      ...(imageUrl
        ? {
            images: [
              {
                url: imageUrl,
                alt: event.fields.coverImage?.fields.title || title,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(imageUrl ? { images: [imageUrl] } : {}),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
  };
}

export default async function LifePostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [event, relatedPosts] = await Promise.all([
    getLifeEvent(slug),
    getRelatedPosts(slug),
  ]);

  if (!event) {
    notFound();
  }

  const postTitle = getPostTitle(event);
  const postDescription = getPostDescription(event);
  const postUrl = `${baseUrl}/life/${event.fields.slug}`;
  const imageUrl = getImageUrl(event.fields.coverImage);
  const contentText = documentToPlainTextString(event.fields.content);
  const wordCount = normalizeText(contentText)
    .split(/\s+/)
    .filter(Boolean).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  const imageWidth =
    event.fields.coverImage?.fields.file?.details?.image?.width || 1200;

  const imageHeight =
    event.fields.coverImage?.fields.file?.details?.image?.height || 630;

  const renderOptions = {
    renderNode: {
      [BLOCKS.EMBEDDED_ENTRY]: (node: Node) => {
        const target = node.data?.target;

        if (!isEmbeddedEntryTarget(target)) {
          return null;
        }

        const contentTypeId = target.sys?.contentType?.sys?.id;

        if (contentTypeId !== 'video') {
          return null;
        }

        const youtubeUrl = target.fields?.youtubeUrl;

        if (!youtubeUrl) {
          return null;
        }

        const videoId = getYouTubeVideoId(youtubeUrl);

        if (!videoId) {
          return <p>Could not load the embedded YouTube video.</p>;
        }

        return (
          <div className="relative my-8 aspect-video overflow-hidden rounded-xl">
            <iframe
              className="absolute left-0 top-0 h-full w-full"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="Embedded YouTube video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        );
      },

      [BLOCKS.EMBEDDED_ASSET]: (node: Node) => {
        const target = node.data?.target;

        if (!isEmbeddedAssetTarget(target)) {
          return null;
        }

        const file = target.fields?.file;
        const imageTitle = target.fields?.title || 'Embedded article image';

        if (!file?.url) {
          return null;
        }

        const assetUrl = file.url.startsWith('http')
          ? file.url
          : `https:${file.url}`;

        return (
          <figure className="my-8">
            <Image
              src={assetUrl}
              alt={imageTitle}
              width={file.details?.image?.width || 1200}
              height={file.details?.image?.height || 675}
              className="h-auto w-full rounded-xl border border-gray-200 dark:border-neutral-800"
            />
            {target.fields?.title && (
              <figcaption className="mt-3 text-center text-sm text-gray-400 dark:text-neutral-500">
                {target.fields.title}
              </figcaption>
            )}
          </figure>
        );
      },

      [INLINES.HYPERLINK]: (node: Node, children: ReactNode) => {
        const uri = typeof node.data?.uri === 'string' ? node.data.uri : '';

        if (!uri) {
          return <>{children}</>;
        }

        const isInternalLink =
          uri.startsWith('/') ||
          uri.startsWith(baseUrl) ||
          uri.startsWith('#');

        return (
          <a
            href={uri}
            {...(!isInternalLink
              ? {
                  target: '_blank',
                  rel: 'noopener noreferrer',
                }
              : {})}
          >
            {children}
          </a>
        );
      },
    },
  };

  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${postUrl}#article`,
    headline: event.fields.title,
    name: postTitle,
    description: postDescription,
    url: postUrl,
    inLanguage: 'en',
    isAccessibleForFree: true,
    datePublished: event.fields.date,
    dateModified: event.sys.updatedAt || event.fields.date,
    wordCount,
    timeRequired: `PT${readingTime}M`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    author: {
      '@type': 'Person',
      '@id': `${baseUrl}/#person`,
      name: authorName,
      url: baseUrl,
      sameAs: [
        'https://github.com/zaifears',
        'https://www.linkedin.com/in/shahoriarhossain/',
        'https://facebook.com/alshahoriar.hossain',
        'https://www.youtube.com/@takatunes',
      ],
    },
    publisher: {
      '@type': 'Person',
      '@id': `${baseUrl}/#person`,
      name: authorName,
      url: baseUrl,
    },
    ...(imageUrl
      ? {
          image: [
            {
              '@type': 'ImageObject',
              url: imageUrl,
              width: imageWidth,
              height: imageHeight,
            },
          ],
        }
      : {}),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Life Journey',
        item: `${baseUrl}/life`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: event.fields.title,
        item: postUrl,
      },
    ],
  };

  return (
    <article className="mx-auto max-w-4xl overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogPostingSchema).replace(/</g, '\\u003c'),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c'),
        }}
      />

      <nav
        aria-label="Breadcrumb"
        className="mb-6 text-sm text-gray-500 dark:text-neutral-400"
      >
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link
              href="/"
              className="transition-colors hover:text-blue-600 dark:hover:text-blue-400"
            >
              Home
            </Link>
          </li>

          <li aria-hidden="true">/</li>

          <li>
            <Link
              href="/life"
              className="transition-colors hover:text-blue-600 dark:hover:text-blue-400"
            >
              Life Journey
            </Link>
          </li>

          <li aria-hidden="true">/</li>

          <li
            className="max-w-[18rem] truncate text-gray-700 dark:text-neutral-200"
            aria-current="page"
          >
            {event.fields.title}
          </li>
        </ol>
      </nav>

      <Link
        href="/life"
        className="group mb-10 inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-blue-600 dark:text-neutral-400 dark:hover:text-blue-400"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back to Life Journey
      </Link>

      <header className="mb-10 text-center md:text-left">
        <h1 className="mb-6 text-3xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-[3.5rem]">
          {event.fields.title}
        </h1>

        {event.fields.excerpt && (
          <p className="mx-auto mb-6 max-w-3xl text-lg leading-relaxed text-gray-600 dark:text-neutral-300 md:mx-0">
            {event.fields.excerpt}
          </p>
        )}

        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-gray-500 dark:text-neutral-400 md:justify-start">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4" />
            <time dateTime={event.fields.date}>
              Published {formatDate(event.fields.date)}
            </time>
          </span>

          {isUpdatedAfterPublished(event) && (
            <span className="text-gray-400 dark:text-neutral-500">
              Updated {formatDate(event.sys.updatedAt)}
            </span>
          )}

          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            {readingTime} min read
          </span>
        </div>
      </header>

      {imageUrl && (
        <figure className="mb-12">
          <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-neutral-800">
            <Image
              src={imageUrl}
              alt={event.fields.coverImage?.fields.title || event.fields.title}
              width={imageWidth}
              height={imageHeight}
              className="h-auto w-full object-cover"
              priority
            />
          </div>

          {event.fields.coverImage?.fields.title && (
            <figcaption className="mt-3 text-center text-sm text-gray-400 dark:text-neutral-500">
              {event.fields.coverImage.fields.title}
            </figcaption>
          )}
        </figure>
      )}

      <div
        className="prose prose-lg prose-gray max-w-none text-justify dark:prose-invert
          prose-headings:text-left prose-headings:font-bold prose-headings:tracking-tight
          prose-h2:mb-4 prose-h2:mt-12 prose-h2:text-2xl
          prose-h3:mb-3 prose-h3:mt-8 prose-h3:text-xl
          prose-p:leading-relaxed prose-p:text-gray-700 dark:prose-p:text-neutral-300
          prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline dark:prose-a:text-blue-400
          prose-img:h-auto prose-img:max-w-full prose-img:rounded-xl prose-img:border prose-img:border-gray-200 dark:prose-img:border-neutral-800
          prose-blockquote:rounded-r-lg prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50/50 prose-blockquote:py-1 prose-blockquote:not-italic dark:prose-blockquote:bg-blue-900/10
          prose-li:marker:text-blue-500
          [&_iframe]:max-w-full [&_pre]:overflow-x-auto [&_table]:overflow-x-auto"
      >
        {documentToReactComponents(event.fields.content, renderOptions)}
      </div>

      {relatedPosts.length > 0 && (
        <section
          aria-labelledby="related-posts-heading"
          className="mt-16 border-t border-gray-200 pt-10 dark:border-neutral-800"
        >
          <h2
            id="related-posts-heading"
            className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            Continue exploring
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {relatedPosts.map((post) => (
              <Link
                key={post.fields.slug}
                href={`/life/${post.fields.slug}`}
                className="group rounded-xl border border-gray-200 p-5 transition-colors hover:border-blue-400 hover:bg-blue-50/50 dark:border-neutral-800 dark:hover:border-blue-700 dark:hover:bg-blue-900/10"
              >
                <p className="text-xs text-gray-500 dark:text-neutral-400">
                  {formatDate(post.fields.date)}
                </p>

                <h3 className="mt-2 font-bold text-gray-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                  {post.fields.title}
                </h3>

                {post.fields.excerpt && (
                  <p className="mt-2 line-clamp-3 text-sm text-gray-600 dark:text-neutral-300">
                    {post.fields.excerpt}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}

      <aside
        aria-label="About the author"
        className="mt-16 rounded-2xl border border-gray-200 bg-gray-50 p-6 dark:border-neutral-800 dark:bg-neutral-900/50"
      >
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <Image
            src="/images/shahoriar-author.jpg"
            alt="Md Al Shahoriar Hossain"
            width={96}
            height={96}
            className="h-20 w-20 rounded-full object-cover"
          />

          <div className="flex-1">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
              About the author
            </p>

            <h2 className="mt-1 text-xl font-bold text-gray-900 dark:text-white">
              Md Al Shahoriar Hossain
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-neutral-300">
              Finance professional, CA candidate, and developer building
              practical digital products, fintech projects, and
              portfolio-driven experiences.
            </p>

            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              <a
                href="https://www.linkedin.com/in/shahoriarhossain/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-blue-600 hover:underline dark:text-blue-400"
              >
                LinkedIn
              </a>

              <a
                href="https://github.com/zaifears"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-blue-600 hover:underline dark:text-blue-400"
              >
                GitHub
              </a>

              <Link
                href="/skills"
                className="font-medium text-blue-600 hover:underline dark:text-blue-400"
              >
                Skills and projects
              </Link>
            </div>
          </div>
        </div>
      </aside>

      <div className="mb-16 mt-16 border-t border-gray-200 pt-8 dark:border-neutral-800 md:mb-0">
        <Link
          href="/life"
          className="group inline-flex items-center gap-2 rounded-full bg-gray-100 px-5 py-2.5 text-gray-700 transition-all hover:bg-blue-50 hover:text-blue-600 dark:bg-neutral-800 dark:text-gray-300 dark:hover:bg-blue-900/20 dark:hover:text-blue-400"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          All posts
        </Link>
      </div>
    </article>
  );
}