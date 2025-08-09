import { contentfulClient } from '@/lib/contentfulClient';
import Image from 'next/image';
import Link from 'next/link';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';

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
async function getLifeEvents() {
  const response = await contentfulClient.getEntries({
    content_type: 'zaifearsBlogPost',
    order: ['-fields.date'],   // Order by date, newest first
  });
  return response.items as unknown as LifeEvent[];
}

export default async function LifePage() {
  const lifeEvents = await getLifeEvents();

  // Separate the latest post from the rest
  const latestEvent = lifeEvents[0];
  const olderEvents = lifeEvents.slice(1);

  return (
    <section>
      <h1 className="font-bold text-3xl md:text-4xl mb-8">Life Journey</h1>
      
      {/* --- Featured Latest Post --- */}
      {latestEvent && (
        <div className="mb-12">
          <Link href={`/life/${latestEvent.fields.slug}`} className="block group">
            {/* --- FIX: Added a more robust check for the image --- */}
            {latestEvent.fields.coverImage?.fields?.file?.url && (
              <div className="relative h-64 md:h-96 mb-6 overflow-hidden rounded-lg">
                <Image
                  src={`https:${latestEvent.fields.coverImage.fields.file.url}`}
                  alt={latestEvent.fields.coverImage.fields.title || 'Cover Image'}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            <h2 className="text-3xl font-bold mb-3 group-hover:text-blue-400 transition-colors">{latestEvent.fields.title}</h2>
            <p className="text-sm text-neutral-400 mb-4">
              {new Date(latestEvent.fields.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <p className="text-neutral-300">
              {documentToPlainTextString(latestEvent.fields.content).substring(0, 200) + '...'}
            </p>
          </Link>
        </div>
      )}

      {/* --- Grid of Older Posts --- */}
      {olderEvents.length > 0 && (
        <>
          <hr className="my-12 border-neutral-800" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {olderEvents.map((event, index) => {
              const previewText = documentToPlainTextString(event.fields.content).substring(0, 150) + '...';

              return (
                <Link href={`/life/${event.fields.slug}`} key={index} className="block bg-neutral-900 p-6 rounded-lg border border-neutral-800 hover:border-blue-500 transition-colors">
                  {/* --- FIX: Added a more robust check for the image --- */}
                  {event.fields.coverImage?.fields?.file?.url && (
                    <div className="relative h-48 mb-4">
                      <Image
                        src={`https:${event.fields.coverImage.fields.file.url}`}
                        alt={event.fields.coverImage.fields.title || 'Cover Image'}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-md"
                      />
                    </div>
                  )}
                  <h2 className="text-xl font-bold mb-2">{event.fields.title}</h2>
                  <p className="text-sm text-neutral-400 mb-4">
                    {new Date(event.fields.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                  </p>
                  <p className="text-neutral-300 text-sm">
                    {previewText}
                  </p>
                </Link>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}

