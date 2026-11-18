import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { getContentfulEntries } from '@/lib/contentfulClient';
import {
  cleanTitle,
  inferPostMeta,
  richTextToSpacedPlainText,
  truncateAtWord,
  type LifeEvent,
} from '@/lib/lifeHelpers';

export const alt = 'Life Journey Article | Md Al Shahoriar Hossain';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

async function fetchCoverAsDataUri(rawUrl?: string): Promise<string | null> {
  if (!rawUrl) return null;
  try {
    const base = rawUrl.startsWith('http') ? rawUrl : `https:${rawUrl}`;
    const separator = base.includes('?') ? '&' : '?';
    // Ask Contentful Images API for an 800px JPEG so Satori always receives a fast, supported image format
    const optimizedUrl = `${base}${separator}fm=jpg&w=800&q=85`;
    const res = await fetch(optimizedUrl, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const arrayBuffer = await res.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');
    return `data:image/jpeg;base64,${base64}`;
  } catch {
    return null;
  }
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [coolveticaFont, fallbackPortraitBuffer, avatarBuffer, response] =
    await Promise.all([
      readFile(path.join(process.cwd(), 'public/fonts/Coolvetica-Regular.otf')),
      readFile(path.join(process.cwd(), 'public/shahoriar-hossain.png')),
      readFile(path.join(process.cwd(), 'public/images/shahoriar-author.jpg')),
      getContentfulEntries({
        content_type: 'zaifearsBlogPost',
        'fields.slug': slug,
        limit: 1,
        include: 2,
      }),
    ]);

  const fallbackPortraitBase64 = `data:image/png;base64,${fallbackPortraitBuffer.toString('base64')}`;
  const avatarBase64 = `data:image/jpeg;base64,${avatarBuffer.toString('base64')}`;

  const event = (response.items[0] as unknown as LifeEvent) || null;

  const title = event
    ? truncateAtWord(cleanTitle(event.fields.title), 88).replace(/\.?…$/, '...')
    : 'Life Journey and Blog';
  const postMeta = event
    ? inferPostMeta(event.fields)
    : { category: 'Life Journey', tags: [] };

  const imgDetails = event?.fields.coverImage?.fields?.file?.details?.image;
  const aspectRatio =
    imgDetails && imgDetails.width && imgDetails.height
      ? imgDetails.width / imgDetails.height
      : 1.5;
  const frameWidth = 440;
  const frameHeight = Math.max(
    240,
    Math.min(462, Math.round(frameWidth / aspectRatio))
  );

  const formattedDate = event?.fields.date
    ? new Date(event.fields.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : '';

  const wordCount = event
    ? richTextToSpacedPlainText(event.fields.content)
        .split(/\s+/)
        .filter(Boolean).length
    : 200;
  const readingTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;

  const coverDataUri = await fetchCoverAsDataUri(
    event?.fields.coverImage?.fields?.file?.url
  );

  const titleFontSize =
    title.length > 68 ? '56px' : title.length > 46 ? '66px' : '78px';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          backgroundColor: '#090d18',
          color: '#f3f6fc',
          padding: '40px',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            backgroundColor: '#111829',
            borderRadius: '36px',
            border: '2px solid #222f49',
            padding: '44px',
            justifyContent: 'space-between',
            alignItems: 'stretch',
          }}
        >
          {/* Left column: Category, Date, Coolvetica Headline, Excerpt, Author Footer */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              width: '560px',
              paddingRight: '24px',
            }}
          >
            {/* Top pills */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  display: 'flex',
                  backgroundColor: '#19284c',
                  color: '#7fb0ff',
                  borderRadius: '999px',
                  padding: '7px 18px',
                  fontSize: '16px',
                  fontWeight: 600,
                }}
              >
                {postMeta.category}
              </div>
              {formattedDate ? (
                <div
                  style={{
                    display: 'flex',
                    backgroundColor: '#162035',
                    color: '#98a6c0',
                    border: '1px solid #253453',
                    borderRadius: '999px',
                    padding: '7px 16px',
                    fontSize: '15px',
                  }}
                >
                  {`${formattedDate}, ${readingTime}`}
                </div>
              ) : null}
            </div>

            {/* Headline Only (H1) */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: '12px',
                marginBottom: '12px',
              }}
            >
              <div
                style={{
                  fontFamily: 'Coolvetica',
                  fontSize: titleFontSize,
                  lineHeight: 1.02,
                  color: '#f8fafc',
                  letterSpacing: '-0.02em',
                }}
              >
                {title}
              </div>
            </div>

            {/* Bottom Author Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderTop: '1px solid #222f49',
                paddingTop: '18px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <img
                  src={avatarBase64}
                  alt="Md Al Shahoriar Hossain"
                  width={48}
                  height={48}
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '999px',
                    objectFit: 'cover',
                    backgroundColor: '#f1f5f9',
                    border: '2px solid #334155',
                  }}
                />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <div
                    style={{
                      fontSize: '19px',
                      fontWeight: 700,
                      color: '#f8fafc',
                    }}
                  >
                    Md Al Shahoriar Hossain
                  </div>
                  <div style={{ fontSize: '15px', color: '#8c9bb5' }}>
                    Audit Associate, EY Bangladesh (shahoriar.bd)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column: Tightly Framed Contentful Cover Photo (or Hallmark Portrait Tile fallback) */}
          <div
            style={{
              display: 'flex',
              width: '440px',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {coverDataUri ? (
              <div
                style={{
                  display: 'flex',
                  width: `${frameWidth}px`,
                  height: `${frameHeight}px`,
                  backgroundColor: '#090d18',
                  borderRadius: '28px',
                  border: '2px solid #253453',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={coverDataUri}
                  alt={title}
                  width={frameWidth}
                  height={frameHeight}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
            ) : (
              <div
                style={{
                  display: 'flex',
                  width: '380px',
                  height: '446px',
                  backgroundColor: '#f1f5f9',
                  border: '2px solid #cbd5e1',
                  borderRadius: '28px',
                  overflow: 'hidden',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                }}
              >
                <img
                  src={fallbackPortraitBase64}
                  alt="Md Al Shahoriar Hossain"
                  width={410}
                  height={410}
                  style={{
                    width: '410px',
                    height: '410px',
                    objectFit: 'contain',
                    objectPosition: 'bottom center',
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Coolvetica',
          data: coolveticaFont,
          style: 'normal',
          weight: 400,
        },
      ],
    }
  );
}
