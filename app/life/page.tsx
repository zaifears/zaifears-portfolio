import { Metadata } from 'next';
import { contentfulClient } from '@/lib/contentfulClient';
import Image from 'next/image';
import Link from 'next/link';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { CalendarDays, ArrowRight, Star } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Life & Blog',
  description: 'Read Md Al Shahoriar Hossain\'s personal blog and life updates. Explore insights, experiences, and stories from his professional and personal journey in Bangladesh.',
};

// ISR: revalidate every 60 seconds in the background instead of hitting Contentful on every request
export const revalidate = 60;

// Define a type for our Life Event entries for better code safety
interface LifeEvent {
  fields: {
    title: string;
    date: string;
    slug: string;
    content: any; // Rich text field
    coverImage?: {
      fields: {
        file?: { url: string; details: { image: { width: number; height: number; }; }; };
        title?: string;
      };
    };
  };
}

// Function to fetch all life events from Contentful
async function getLifeEvents(): Promise<LifeEvent[]> {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'zaifearsBlogPost',
      order: ['-fields.date'],   // Order by date, newest first
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

  // Handle empty state
  if (!lifeEvents || lifeEvents.length === 0) {
    return (
      <section className="max-w-5xl mx-auto">
        <div className="mb-10 lg:mb-14">
          <h1 className="font-bold text-4xl md:text-5xl tracking-tight mb-4 text-gray-900 dark:text-white">
            Life Journey
          </h1>
          <p className="text-lg text-gray-600 dark:text-neutral-400 max-w-2xl">
            Welcome to my digital garden. Here I share life updates, professional insights, and personal stories.
          </p>
        </div>
        <div className="p-8 text-center bg-gray-50 dark:bg-neutral-900/50 rounded-2xl border border-dashed border-gray-200 dark:border-neutral-800">
          <p className="text-gray-600 dark:text-neutral-400">
            No posts available yet. Check back soon!
          </p>
        </div>
      </section>
    );
  }

  // Separate the latest post from the rest
  const latestEvent = lifeEvents[0];
  const olderEvents = lifeEvents.slice(1);

  return (
    <section className="max-w-6xl mx-auto">
      <div className="mb-10 lg:mb-14">
        <h1 className="font-bold text-4xl md:text-5xl tracking-tight mb-4 text-gray-900 dark:text-white">
          Life Journey
        </h1>
        <p className="text-lg text-gray-600 dark:text-neutral-400 max-w-2xl">
          Welcome to my digital garden. Here I share life updates, professional insights, and personal stories from my journey.
        </p>
      </div>
      
      {/* --- Featured Latest Post --- */}
      {latestEvent && (
        <div className="mb-16 lg:mb-20">
          <h2 className="flex items-center gap-2 text-sm font-semibold tracking-widest uppercase text-blue-600 dark:text-blue-400 mb-6">
            <Star className="w-4 h-4" /> Featured Post
          </h2>
          <Link href={`/life/${latestEvent.fields.slug}`} className="group relative flex flex-col bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-blue-500/5 hover:border-blue-500/30 transition-all duration-500">
            {latestEvent.fields.coverImage?.fields?.file?.url && (
              <div className="relative w-full h-64 md:h-112 overflow-hidden">
                <Image
                  src={`https:${latestEvent.fields.coverImage.fields.file.url}`}
                  alt={latestEvent.fields.coverImage.fields.title || 'Cover Image'}
                  fill
                  className="object-cover transform group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                />
              </div>
            )}
            <div className="flex flex-col flex-1 min-w-0 p-6 md:p-8 overflow-hidden">
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-neutral-400 mb-4">
                <CalendarDays className="w-4 h-4" />
                <time dateTime={latestEvent.fields.date}>
                  {new Date(latestEvent.fields.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </time>
              </div>
              <h3 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 mb-4 md:mb-6 line-clamp-3">
                {latestEvent.fields.title}
              </h3>
              <p className="text-lg text-gray-600 dark:text-neutral-300 mb-8 line-clamp-3 md:line-clamp-4 wrap-break-word">
                {latestEvent.fields.content ? documentToPlainTextString(latestEvent.fields.content).substring(0, 300) : ''}
              </p>
              <div className="mt-auto inline-flex items-center w-fit px-5 py-2.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium rounded-full group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                Read full story <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* --- Grid of Older Posts --- */}
      {olderEvents.length > 0 && (
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Previous Posts</h2>
            <div className="h-px flex-1 bg-gray-200 dark:bg-neutral-800"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            {olderEvents.map((event, index) => {
              return (
                <Link 
                  href={`/life/${event.fields.slug}`} 
                  key={index} 
                  className="group flex flex-col bg-white dark:bg-neutral-900 rounded-2xl border border-gray-200 dark:border-neutral-800 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 overflow-hidden hover:-translate-y-1 min-w-0"
                >
                  {event.fields.coverImage?.fields?.file?.url && (
                    <div className="relative h-56 w-full overflow-hidden">
                      <Image
                        src={`https:${event.fields.coverImage.fields.file.url}`}
                        alt={event.fields.coverImage.fields.title || 'Cover Image'}
                        fill
                        className="object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                    </div>
                  )}
                  <div className="flex flex-col flex-1 p-6 min-w-0 overflow-hidden">
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-neutral-400 mb-3 font-medium">
                      <CalendarDays className="w-3.5 h-3.5" />
                      <time dateTime={event.fields.date}>
                        {new Date(event.fields.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </time>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 mb-3 line-clamp-2 wrap-break-word">
                       {event.fields.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-neutral-400 line-clamp-3 mb-6 flex-1 wrap-break-word">
                      {event.fields.content ? documentToPlainTextString(event.fields.content).substring(0, 200) : ''}
                    </p>
                    <div className="flex items-center text-sm text-blue-600 dark:text-blue-400 font-semibold group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                      Read more <ArrowRight className="ml-1.5 w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
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
