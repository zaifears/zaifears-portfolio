import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache, type ReactNode } from 'react';
import { getContentfulEntries } from '@/lib/contentfulClient';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import {
  BLOCKS,
  INLINES,
  MARKS,
  type Node,
} from '@contentful/rich-text-types';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
  faCalendar,
  faClock,
} from '@fortawesome/free-solid-svg-icons';
import {
  buildNormalizedHeadingMap,
  cleanTitle,
  getCleanImageAlt,
  getSmartExcerpt,
  inferPostMeta,
  richTextToSpacedPlainText,
  toIsoDateTime,
  truncateAtWord,
  type ContentfulImage,
  type ContentfulImageFile,
  type LifeEvent,
} from '@/lib/lifeHelpers';

const baseUrl = 'https://shahoriar.bd';
const siteName = 'Md Al Shahoriar Hossain';
const authorName = 'Md Al Shahoriar Hossain';

export const revalidate = 60;

interface RelatedPost {
  fields: {
    title: string;
    date: string;
    slug: string;
    excerpt?: string;
    category?: string;
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
    description?: string;
  };
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
  if (!imageUrl) return undefined;
  return imageUrl.startsWith('http') ? imageUrl : `https:${imageUrl}`;
}

function getPostTitle(event: LifeEvent): string {
  const raw = event.fields.seoTitle?.trim() || event.fields.title;
  return cleanTitle(raw);
}

function getPostDescription(event: LifeEvent): string {
  if (event.fields.seoDescription?.trim()) {
    return truncateAtWord(event.fields.seoDescription, 160);
  }
  return getSmartExcerpt(event.fields, 160);
}

function isEmbeddedEntryTarget(value: unknown): value is EmbeddedEntryTarget {
  return typeof value === 'object' && value !== null;
}

function isEmbeddedAssetTarget(value: unknown): value is EmbeddedAssetTarget {
  return typeof value === 'object' && value !== null;
}

function isUpdatedAfterPublished(event: LifeEvent): boolean {
  return (
    new Date(event.sys.updatedAt).getTime() -
      new Date(event.fields.date).getTime() >
    86400000
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

const getLifeEvent = cache(async (slug: string): Promise<LifeEvent | null> => {
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
});

async function getRelatedPosts(
  currentSlug: string,
  targetCategory: string
): Promise<RelatedPost[]> {
  try {
    const response = await getContentfulEntries({
      content_type: 'zaifearsBlogPost',
      'fields.slug[ne]': currentSlug,
      order: '-fields.date',
      limit: 12,
      select: [
        'fields.title',
        'fields.date',
        'fields.slug',
        'fields.excerpt',
      ],
    });

    const candidates = (response.items as unknown as RelatedPost[]) || [];
    const sameCategory: RelatedPost[] = [];
    const otherCategory: RelatedPost[] = [];

    for (const item of candidates) {
      const meta = inferPostMeta({
        title: item.fields.title,
        date: item.fields.date,
        slug: item.fields.slug,
        content: { nodeType: BLOCKS.DOCUMENT, data: {}, content: [] },
        excerpt: item.fields.excerpt,
      });
      if (meta.category === targetCategory) {
        sameCategory.push(item);
      } else {
        otherCategory.push(item);
      }
    }

    return [...sameCategory, ...otherCategory].slice(0, 3);
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
  const ogImageUrl = `${baseUrl}/life/${event.fields.slug}/opengraph-image?v=2`;
  const coverAlt = getCleanImageAlt(
    event.fields.coverImage,
    event.fields.title
  );
  const postMeta = inferPostMeta(event.fields);

  return {
    title,
    description,
    keywords: postMeta.tags,
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
      section: postMeta.category,
      tags: postMeta.tags,
      publishedTime: toIsoDateTime(event.fields.date),
      modifiedTime: toIsoDateTime(event.sys.updatedAt || event.fields.date),
      authors: [authorName],
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: coverAlt.alt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
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
  const event = await getLifeEvent(slug);

  if (!event) {
    notFound();
  }

  const postMeta = inferPostMeta(event.fields);
  const relatedPosts = await getRelatedPosts(slug, postMeta.category);

  const displayTitle = cleanTitle(event.fields.title);
  const postTitle = getPostTitle(event);
  const postDescription = getPostDescription(event);
  const postUrl = `${baseUrl}/life/${event.fields.slug}`;
  const imageUrl = getImageUrl(event.fields.coverImage);
  const coverAlt = getCleanImageAlt(
    event.fields.coverImage,
    event.fields.title
  );

  const contentText = richTextToSpacedPlainText(event.fields.content);
  const wordCount = contentText.split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  const imageWidth =
    event.fields.coverImage?.fields.file?.details?.image?.width || 1200;
  const imageHeight =
    event.fields.coverImage?.fields.file?.details?.image?.height || 630;

  const headingMap = buildNormalizedHeadingMap(event.fields.content);

  const renderHeading = (nodeType: string, children: ReactNode) => {
    const tag = headingMap[nodeType] || 'h2';
    if (tag === 'h2') {
      return (
        <h2 className="mb-4 mt-12 text-2xl sm:text-3xl font-semibold text-ink">
          {children}
        </h2>
      );
    }
    if (tag === 'h3') {
      return (
        <h3 className="mb-3 mt-10 text-xl sm:text-2xl font-semibold text-ink">
          {children}
        </h3>
      );
    }
    return (
      <h4 className="mb-3 mt-8 text-lg sm:text-xl font-semibold text-ink">
        {children}
      </h4>
    );
  };

  const renderOptions = {
    renderMark: {
      [MARKS.BOLD]: (text: ReactNode) => (
        <strong className="font-semibold text-ink">{text}</strong>
      ),
      [MARKS.ITALIC]: (text: ReactNode) => <em className="italic">{text}</em>,
      [MARKS.UNDERLINE]: (text: ReactNode) => (
        <u className="underline">{text}</u>
      ),
      [MARKS.CODE]: (text: ReactNode) => (
        <code className="rounded-control bg-paper-2 px-1.5 py-0.5 font-mono text-sm text-ink">
          {text}
        </code>
      ),
    },

    renderNode: {
      [BLOCKS.PARAGRAPH]: (_node: Node, children: ReactNode) => (
        <p className="my-4 leading-relaxed text-ink-2">{children}</p>
      ),

      [BLOCKS.HEADING_1]: (_node: Node, children: ReactNode) =>
        renderHeading(BLOCKS.HEADING_1, children),
      [BLOCKS.HEADING_2]: (_node: Node, children: ReactNode) =>
        renderHeading(BLOCKS.HEADING_2, children),
      [BLOCKS.HEADING_3]: (_node: Node, children: ReactNode) =>
        renderHeading(BLOCKS.HEADING_3, children),
      [BLOCKS.HEADING_4]: (_node: Node, children: ReactNode) =>
        renderHeading(BLOCKS.HEADING_4, children),
      [BLOCKS.HEADING_5]: (_node: Node, children: ReactNode) =>
        renderHeading(BLOCKS.HEADING_5, children),
      [BLOCKS.HEADING_6]: (_node: Node, children: ReactNode) =>
        renderHeading(BLOCKS.HEADING_6, children),

      [BLOCKS.UL_LIST]: (_node: Node, children: ReactNode) => (
        <ul className="my-4 list-disc space-y-2 pl-6 text-ink-2 marker:text-accent">
          {children}
        </ul>
      ),

      [BLOCKS.OL_LIST]: (_node: Node, children: ReactNode) => (
        <ol className="my-4 list-decimal space-y-2 pl-6 text-ink-2 marker:text-accent">
          {children}
        </ol>
      ),

      [BLOCKS.LIST_ITEM]: (_node: Node, children: ReactNode) => (
        <li className="leading-relaxed">{children}</li>
      ),

      [BLOCKS.QUOTE]: (_node: Node, children: ReactNode) => (
        <blockquote className="my-6 rounded-card border border-rule bg-accent-soft px-6 py-4 text-ink-2 not-italic">
          {children}
        </blockquote>
      ),

      [BLOCKS.HR]: () => <hr className="my-8 border-rule" />,

      [BLOCKS.TABLE]: (_node: Node, children: ReactNode) => (
        <div className="my-6 overflow-x-auto">
          <table className="w-full border-t border-b border-rule text-left text-sm text-ink-2">
            {children}
          </table>
        </div>
      ),

      [BLOCKS.TABLE_ROW]: (_node: Node, children: ReactNode) => (
        <tr className="border-b border-rule">{children}</tr>
      ),

      [BLOCKS.TABLE_HEADER_CELL]: (_node: Node, children: ReactNode) => (
        <th className="bg-paper-2 p-3 font-semibold text-ink">{children}</th>
      ),

      [BLOCKS.TABLE_CELL]: (_node: Node, children: ReactNode) => (
        <td className="p-3 text-ink-2">{children}</td>
      ),

      [BLOCKS.EMBEDDED_ENTRY]: (node: Node) => {
        const target = node.data?.target;
        if (!isEmbeddedEntryTarget(target)) return null;

        const contentTypeId = target.sys?.contentType?.sys?.id;
        if (contentTypeId !== 'video') return null;

        const youtubeUrl = target.fields?.youtubeUrl;
        if (!youtubeUrl) return null;

        const videoId = getYouTubeVideoId(youtubeUrl);
        if (!videoId) {
          return <p className="text-muted">Could not load the embedded YouTube video.</p>;
        }

        return (
          <div className="relative my-8 aspect-video overflow-hidden rounded-card border border-rule bg-paper-3">
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
        if (!isEmbeddedAssetTarget(target)) return null;

        const file = target.fields?.file;
        if (!file?.url) return null;

        const assetUrl = file.url.startsWith('http')
          ? file.url
          : `https:${file.url}`;
        const assetAlt = getCleanImageAlt(
          { fields: target.fields || {} },
          displayTitle
        );

        return (
          <figure className="my-8">
            <Image
              src={assetUrl}
              alt={assetAlt.alt}
              width={file.details?.image?.width || 1200}
              height={file.details?.image?.height || 675}
              sizes="(max-width: 1024px) 100vw, 896px"
              className="h-auto w-full rounded-card border border-rule"
            />
          </figure>
        );
      },

      [INLINES.HYPERLINK]: (node: Node, children: ReactNode) => {
        const uri = typeof node.data?.uri === 'string' ? node.data.uri : '';
        if (!uri) return <>{children}</>;

        const isInternalLink =
          uri.startsWith('/') ||
          uri.startsWith(baseUrl) ||
          uri.startsWith('#');

        return (
          <a
            href={uri}
            className="font-medium text-accent-text underline underline-offset-4 transition-colors"
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
    headline: displayTitle,
    name: postTitle,
    description: postDescription,
    abstract: event.fields.tldr?.trim() || postDescription,
    articleSection: postMeta.category,
    keywords: postMeta.tags.join(', '),
    articleBody: contentText,
    url: postUrl,
    inLanguage: 'en',
    isAccessibleForFree: true,
    datePublished: toIsoDateTime(event.fields.date),
    dateModified: toIsoDateTime(event.sys.updatedAt || event.fields.date),
    wordCount,
    timeRequired: `PT${readingTime}M`,
    ...(event.fields.externalUrl?.trim()
      ? { sameAs: [event.fields.externalUrl.trim()] }
      : {}),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    author: {
      '@type': 'Person',
      '@id': `${baseUrl}/#person`,
      name: authorName,
      jobTitle: 'Audit Associate and Software Developer',
      worksFor: {
        '@type': 'Organization',
        name: 'Islam Hoque Hanif & Co. (EY Bangladesh)',
      },
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
        name: displayTitle,
        item: postUrl,
      },
    ],
  };

  return (
    <article className="mx-auto max-w-4xl pt-2 pb-16">
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

      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="transition-colors hover:text-accent-text">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link
              href="/life"
              className="transition-colors hover:text-accent-text"
            >
              Life Journey
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li
            className="max-w-[20rem] truncate text-ink-2"
            aria-current="page"
          >
            {displayTitle}
          </li>
        </ol>
      </nav>

      <header className="mb-10 space-y-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent-text">
            {postMeta.category}
          </span>
          {postMeta.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-rule bg-paper-2 px-3 py-1 text-xs text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl leading-tight text-ink">
          {displayTitle}
        </h1>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted pt-1">
          <span className="inline-flex items-center gap-1.5">
            <FontAwesomeIcon
              icon={faCalendar}
              className="h-3.5 w-3.5"
              aria-hidden="true"
            />
            <time dateTime={event.fields.date}>
              Published {formatDate(event.fields.date)}
            </time>
          </span>

          {isUpdatedAfterPublished(event) && (
            <span>Updated {formatDate(event.sys.updatedAt)}</span>
          )}

          <span className="inline-flex items-center gap-1.5">
            <FontAwesomeIcon
              icon={faClock}
              className="h-3.5 w-3.5"
              aria-hidden="true"
            />
            <span>{readingTime} min read</span>
          </span>
        </div>
      </header>

      {/* Optional Contentful Key Takeaways / TL;DR Block for GEO Citability */}
      {(() => {
        const takeawaysList = Array.isArray(event.fields.keyTakeaways)
          ? event.fields.keyTakeaways.filter(Boolean)
          : typeof event.fields.keyTakeaways === 'string'
            ? event.fields.keyTakeaways
                .split(/\r?\n/)
                .map((line) => line.replace(/^[-•*]\s*/, '').trim())
                .filter(Boolean)
            : [];

        if (!event.fields.tldr && takeawaysList.length === 0) return null;

        return (
          <section
            aria-label="Key takeaways"
            className="mb-10 panel p-6 sm:p-8 space-y-3"
          >
            <h2 className="text-lg font-semibold text-ink">Key takeaways</h2>
            {takeawaysList.length > 0 ? (
              <ul className="list-disc pl-5 space-y-1.5 text-sm sm:text-base text-ink-2 marker:text-accent">
                {takeawaysList.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : (
              event.fields.tldr && (
                <p className="text-sm sm:text-base leading-relaxed text-ink-2">
                  {event.fields.tldr}
                </p>
              )
            )}
          </section>
        );
      })()}

      {imageUrl && (
        <figure className="mb-12">
          <div className="overflow-hidden rounded-card border border-rule bg-paper-2">
            <Image
              src={imageUrl}
              alt={coverAlt.alt}
              width={imageWidth}
              height={imageHeight}
              priority
              fetchPriority="high"
              sizes="(max-width: 1024px) 100vw, 896px"
              className="h-auto w-full object-cover"
            />
          </div>
        </figure>
      )}

      <div className="prose max-w-none text-ink-2 leading-relaxed [&_iframe]:max-w-full [&_pre]:overflow-x-auto [&_table]:overflow-x-auto">
        {documentToReactComponents(event.fields.content, renderOptions)}
      </div>

      {/* Connected Software Project Callout (Internal Link Equity) */}
      {postMeta.relatedProject && (
        <aside
          aria-label="Related software project"
          className="mt-12 panel p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-ink">
              {postMeta.relatedProject.name}
            </h2>
            <p className="text-sm text-ink-2 max-w-xl">
              {postMeta.relatedProject.description}
            </p>
          </div>
          <Link
            href={postMeta.relatedProject.href}
            className="btn-primary whitespace-nowrap shrink-0 self-start sm:self-center"
          >
            <span>View project</span>
            <FontAwesomeIcon
              icon={faArrowRight}
              className="h-3.5 w-3.5"
              aria-hidden="true"
            />
          </Link>
        </aside>
      )}

      {relatedPosts.length > 0 && (
        <section
          aria-labelledby="related-posts-heading"
          className="mt-16 border-t border-rule pt-10"
        >
          <h2
            id="related-posts-heading"
            className="text-2xl sm:text-3xl font-semibold text-ink"
          >
            Continue exploring
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {relatedPosts.map((post) => {
              const relTitle = cleanTitle(post.fields.title);
              return (
                <Link
                  key={post.fields.slug}
                  href={`/life/${post.fields.slug}`}
                  className="panel p-5 transition-colors hover:bg-paper-3 flex flex-col justify-between gap-3"
                >
                  <div>
                    <p className="text-xs text-muted">
                      {formatDate(post.fields.date)}
                    </p>

                    <h3 className="mt-2 font-semibold text-ink">{relTitle}</h3>

                    {post.fields.excerpt && (
                      <p className="mt-2 line-clamp-3 text-sm text-ink-2">
                        {post.fields.excerpt.normalize('NFKC')}
                      </p>
                    )}
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-text">
                    <span>Read story</span>
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="h-3 w-3"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* E-E-A-T Author Bio */}
      <aside aria-label="About the author" className="mt-16 panel p-6 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <Image
            src="/images/shahoriar-author.jpg"
            alt="Md Al Shahoriar Hossain"
            width={96}
            height={96}
            className="h-20 w-20 rounded-full object-cover shrink-0"
          />

          <div className="flex-1 space-y-2">
            <h2 className="text-xl font-semibold text-ink">
              Md Al Shahoriar Hossain
            </h2>

            <p className="text-sm leading-relaxed text-ink-2">
              Audit Associate at <strong className="font-semibold text-ink">EY Bangladesh (Islam Hoque Hanif &amp; Co.)</strong>, Chartered Accountancy Professional Level candidate at <strong className="font-semibold text-ink">ICAB</strong>, and final-year BBA in Finance and Banking student at <strong className="font-semibold text-ink">Bangladesh University of Professionals (BUP)</strong>.
            </p>

            <div className="pt-1 flex flex-wrap gap-4 text-sm">
              <a
                href="https://www.linkedin.com/in/shahoriarhossain/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-accent-text underline underline-offset-4"
              >
                LinkedIn
              </a>

              <a
                href="https://github.com/zaifears"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-accent-text underline underline-offset-4"
              >
                GitHub
              </a>

              <Link
                href="/skills"
                className="font-semibold text-accent-text underline underline-offset-4"
              >
                Skills and projects
              </Link>
            </div>
          </div>
        </div>
      </aside>

      <div className="mt-10">
        <Link href="/life" className="btn-quiet whitespace-nowrap">
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="h-3.5 w-3.5"
            aria-hidden="true"
          />
          <span>All posts</span>
        </Link>
      </div>
    </article>
  );
}
