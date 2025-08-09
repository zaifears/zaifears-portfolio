import { contentfulClient } from '@/lib/contentfulClient';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import Image from 'next/image';
import Link from 'next/link';

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
async function getLifeEvent(slug: string) {
  const response = await contentfulClient.getEntries({
    content_type: 'zaifearsBlogPost',
    'fields.slug': slug,
    limit: 1,
  });
  return response.items.length > 0 ? response.items[0] as unknown as LifeEvent : null;
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

export default async function LifePostPage({ params }: { params: { slug: string } }) {
  const event = await getLifeEvent(params.slug);

  if (!event) {
    return (
      <section>
        <h1 className="font-bold text-3xl md:text-4xl mb-8">Post not found</h1>
        <p className="text-neutral-400">Sorry, we couldn't find the post you were looking for.</p>
        <Link href="/life" className="text-blue-400 hover:underline mt-4 inline-block">
          &larr; Back to Life Journey
        </Link>
      </section>
    );
  }

  // Options object to render our embedded video component
  const renderOptions = {
    renderNode: {
      [BLOCKS.EMBEDDED_ENTRY]: (node: any) => {
        const { sys, fields } = node.data.target;
        
        // --- DEBUGGING LOG ---
        // This will show in your terminal when the page loads
        console.log('Found embedded entry with ID:', sys.contentType.sys.id);
        console.log('Available fields:', Object.keys(fields));
        // ---------------------

        if (sys.contentType.sys.id === 'video') {
          // --- FIX: Changed youTubeUrl to youtubeUrl (lowercase 't') ---
          const videoId = getYouTubeVideoId(fields.youtubeUrl);
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
    },
  };

  return (
    <section>
      <Link href="/life" className="text-blue-400 hover:underline mb-8 inline-block">
        &larr; Back to Life Journey
      </Link>

      <h1 className="font-bold text-4xl md:text-5xl mb-4">{event.fields.title}</h1>
      <p className="text-neutral-400 mb-8">
        {new Date(event.fields.date).toLocaleDateString('en-US', {
          year: 'numeric', month: 'long', day: 'numeric',
        })}
      </p>

      {event.fields.coverImage?.fields?.file?.url && (
        <div className="mb-8">
          <Image
            src={`https:${event.fields.coverImage.fields.file.url}`}
            alt={event.fields.coverImage.fields.title || 'Cover Image'}
            width={event.fields.coverImage.fields.file.details.image.width}
            height={event.fields.coverImage.fields.file.details.image.height}
            className="rounded-lg object-cover shadow-md w-full"
          />
        </div>
      )}

      <div className="prose prose-invert max-w-none text-neutral-300">
        {documentToReactComponents(event.fields.content, renderOptions)}
      </div>
    </section>
  );
}