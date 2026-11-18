import { Metadata } from 'next';
import { getContentfulEntries } from '@/lib/contentfulClient';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCalendar } from '@fortawesome/free-solid-svg-icons';
import {
  cleanTitle,
  getCleanImageAlt,
  getSmartExcerpt,
  inferPostMeta,
  toIsoDateTime,
  type LifeEvent,
} from '@/lib/lifeHelpers';

export const metadata: Metadata = {
  title: 'Life and Blog',
  description:
    'Read Md Al Shahoriar Hossain’s essays, audit career reflections at EY Bangladesh, bKash compliance internship stories, and national case competition write-ups.',
  alternates: {
    canonical: 'https://shahoriar.bd/life',
  },
  openGraph: {
    title: 'Life Journey, Articles and Insights | Md Al Shahoriar Hossain',
    description: 'Personal blog about ongoing life.',
    url: 'https://shahoriar.bd/life',
    siteName: 'Md Al Shahoriar Hossain',
    type: 'website',
    images: [
      {
        url: '/life/opengraph-image?v=2',
        width: 1200,
        height: 630,
        alt: 'Life Journey and Blog: Md Al Shahoriar Hossain',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Life Journey, Articles and Insights | Md Al Shahoriar Hossain',
    description: 'Personal blog about ongoing life.',
    images: ['/life/opengraph-image?v=2'],
  },
};

export const revalidate = 60;

async function getLifeEvents(): Promise<LifeEvent[]> {
  try {
    const response = await getContentfulEntries({
      content_type: 'zaifearsBlogPost',
      order: ['-fields.date'],
      limit: 1000,
      include: 2,
    });
    return response.items as unknown as LifeEvent[];
  } catch (error) {
    console.error('Failed to fetch life events from Contentful:', error);
    return [];
  }
}

export default async function LifePage() {
  const lifeEvents = await getLifeEvents();

  if (!lifeEvents || lifeEvents.length === 0) {
    return (
      <section className="mx-auto max-w-6xl pt-2 pb-16 space-y-8">
        <header className="space-y-3">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl leading-none text-ink">
            Life Journey
          </h1>
          <p className="max-w-2xl text-lg sm:text-xl text-ink-2">
            Personal blog about ongoing life.
          </p>
        </header>
        <div className="panel p-8 text-center">
          <p className="text-ink-2">No posts available yet. Check back soon.</p>
        </div>
      </section>
    );
  }

  const latestEvent = lifeEvents[0];
  const olderEvents = lifeEvents.slice(1);
  const latestTitle = cleanTitle(latestEvent.fields.title);
  const latestExcerpt = getSmartExcerpt(latestEvent.fields, 280);
  const latestAlt = getCleanImageAlt(
    latestEvent.fields.coverImage,
    latestEvent.fields.title
  );
  const latestMeta = inferPostMeta(latestEvent.fields);

  return (
    <section className="mx-auto max-w-6xl pt-2 pb-16 space-y-14 sm:space-y-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://shahoriar.bd',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Life',
                item: 'https://shahoriar.bd/life',
              },
            ],
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: 'Life Journey and Blog: Md Al Shahoriar Hossain',
            description:
              'Personal blog and life updates covering EY Bangladesh audit articleship, bKash compliance internship, engineering systems, and business competition retrospectives.',
            url: 'https://shahoriar.bd/life',
            author: {
              '@type': 'Person',
              '@id': 'https://shahoriar.bd/#person',
              name: 'Md Al Shahoriar Hossain',
              url: 'https://shahoriar.bd',
            },
            blogPost: lifeEvents.slice(0, 15).map((event) => {
              const postTitle = cleanTitle(event.fields.title);
              const postExcerpt = getSmartExcerpt(event.fields, 160);
              const postMeta = inferPostMeta(event.fields);
              const imgUrl = event.fields.coverImage?.fields?.file?.url;
              return {
                '@type': 'BlogPosting',
                headline: postTitle,
                description: postExcerpt,
                articleSection: postMeta.category,
                url: `https://shahoriar.bd/life/${event.fields.slug}`,
                datePublished: toIsoDateTime(event.fields.date),
                dateModified: toIsoDateTime(
                  event.sys?.updatedAt || event.fields.date
                ),
                ...(imgUrl
                  ? {
                      image: imgUrl.startsWith('http')
                        ? imgUrl
                        : `https:${imgUrl}`,
                    }
                  : {}),
                author: {
                  '@type': 'Person',
                  '@id': 'https://shahoriar.bd/#person',
                  name: 'Md Al Shahoriar Hossain',
                  url: 'https://shahoriar.bd',
                },
              };
            }),
          }).replace(/</g, '\\u003c'),
        }}
      />

      <header className="space-y-3">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl leading-none text-ink">
          Life Journey
        </h1>
        <p className="max-w-2xl text-lg sm:text-xl leading-relaxed text-ink-2">
          Personal Blog about ongoing life
        </p>
      </header>

      {/* Featured Latest Post */}
      {latestEvent && (
        <article className="panel overflow-hidden">
          <Link
            href={`/life/${latestEvent.fields.slug}`}
            className="flex flex-col"
          >
            {latestEvent.fields.coverImage?.fields?.file?.url && (
              <div className="w-full overflow-hidden border-b border-rule bg-paper-3">
                <Image
                  src={`https:${latestEvent.fields.coverImage.fields.file.url}`}
                  alt={latestAlt.alt}
                  width={
                    latestEvent.fields.coverImage.fields.file.details?.image
                      ?.width || 1200
                  }
                  height={
                    latestEvent.fields.coverImage.fields.file.details?.image
                      ?.height || 630
                  }
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 1200px) 100vw, 1152px"
                  className="h-auto w-full"
                />
              </div>
            )}

            <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10 gap-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2.5 text-xs text-muted">
                  <span className="rounded-full bg-accent-soft px-3 py-1 font-medium text-accent-text">
                    {latestMeta.category}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <FontAwesomeIcon
                      icon={faCalendar}
                      className="h-3.5 w-3.5"
                      aria-hidden="true"
                    />
                    <time dateTime={latestEvent.fields.date}>
                      {new Date(latestEvent.fields.date).toLocaleDateString(
                        'en-US',
                        {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        }
                      )}
                    </time>
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight text-ink">
                  {latestTitle}
                </h2>

                <p className="text-base leading-relaxed text-ink-2 line-clamp-4">
                  {latestExcerpt}
                </p>
              </div>

              <div className="pt-2">
                <span className="btn-primary whitespace-nowrap">
                  <span>Read full story</span>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="h-3.5 w-3.5"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </div>
          </Link>
        </article>
      )}

      {/* Grid of Previous Posts */}
      {olderEvents.length > 0 && (
        <div className="space-y-8">
          <h2 className="text-3xl sm:text-4xl font-semibold text-ink">
            All articles and milestones
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {olderEvents.map((event) => {
              const postTitle = cleanTitle(event.fields.title);
              const postExcerpt = getSmartExcerpt(event.fields, 180);
              const postAlt = getCleanImageAlt(
                event.fields.coverImage,
                event.fields.title
              );
              const postMeta = inferPostMeta(event.fields);

              return (
                <Link
                  href={`/life/${event.fields.slug}`}
                  key={event.fields.slug}
                  className="panel flex flex-col overflow-hidden transition-colors hover:bg-paper-3 min-w-0"
                >
                  {event.fields.coverImage?.fields?.file?.url && (
                    <div className="relative h-52 w-full overflow-hidden border-b border-rule bg-paper-3">
                      <Image
                        src={`https:${event.fields.coverImage.fields.file.url}`}
                        alt={postAlt.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                  )}

                  <div className="flex flex-col flex-1 justify-between p-6 gap-5 min-w-0">
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted">
                        <span className="rounded-full bg-accent-soft px-2.5 py-0.5 font-medium text-accent-text">
                          {postMeta.category}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <FontAwesomeIcon
                            icon={faCalendar}
                            className="h-3 w-3"
                            aria-hidden="true"
                          />
                          <time dateTime={event.fields.date}>
                            {new Date(event.fields.date).toLocaleDateString(
                              'en-US',
                              {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              }
                            )}
                          </time>
                        </span>
                      </div>

                      <h3 className="text-xl font-semibold leading-snug text-ink line-clamp-2 break-words">
                        {postTitle}
                      </h3>

                      <p className="text-sm leading-relaxed text-ink-2 line-clamp-3 break-words">
                        {postExcerpt}
                      </p>
                    </div>

                    <div className="inline-flex items-center gap-2 text-sm font-semibold text-accent-text">
                      <span>Read story</span>
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        className="h-3.5 w-3.5"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
