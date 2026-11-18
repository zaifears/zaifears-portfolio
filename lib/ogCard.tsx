import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

export const ogSize = {
  width: 1200,
  height: 630,
};

export interface HallmarkOgCardProps {
  routePill: string;
  tagPill: string;
  headline: string;
  subtitle?: string;
  headlineSize?: string;
  footerTitle?: string;
  footerSubtitle?: string;
  imagePath?: string;
  imageFit?: 'portrait' | 'logo';
}

export async function renderHallmarkOgCard({
  routePill,
  tagPill,
  headline,
  subtitle,
  headlineSize,
  footerTitle = 'Md Al Shahoriar Hossain',
  footerSubtitle = 'Audit Associate at EY Bangladesh, CA Candidate (ICAB), BUP',
  imagePath = 'public/shahoriar-hossain.png',
  imageFit = 'portrait',
}: HallmarkOgCardProps): Promise<ImageResponse> {
  const [coolveticaFont, portraitBuffer] = await Promise.all([
    readFile(path.join(process.cwd(), 'public/fonts/Coolvetica-Regular.otf')),
    readFile(path.join(process.cwd(), imagePath)),
  ]);

  const ext = imagePath.toLowerCase().endsWith('.jpg') || imagePath.toLowerCase().endsWith('.jpeg')
    ? 'jpeg'
    : 'png';
  const portraitBase64 = `data:image/${ext};base64,${portraitBuffer.toString('base64')}`;
  const computedHeadlineSize =
    headlineSize ||
    (subtitle
      ? headline.length > 26
        ? '64px'
        : headline.length > 18
          ? '74px'
          : '86px'
      : headline.length > 22
        ? '96px'
        : headline.length > 14
          ? '108px'
          : '118px');

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          backgroundColor: '#090d18',
          color: '#f3f6fc',
          padding: '44px',
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
            padding: '48px',
            justifyContent: 'space-between',
            alignItems: 'stretch',
          }}
        >
          {/* Left column: Route & Tag Pills, Huge Coolvetica H1, Optional Subtitle (Home only), Author Footer */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              width: '620px',
              paddingRight: '32px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  display: 'flex',
                  backgroundColor: '#19284c',
                  color: '#7fb0ff',
                  borderRadius: '999px',
                  padding: '8px 20px',
                  fontSize: '18px',
                  fontWeight: 600,
                }}
              >
                {routePill}
              </div>
              <div
                style={{
                  display: 'flex',
                  backgroundColor: '#162035',
                  color: '#98a6c0',
                  border: '1px solid #253453',
                  borderRadius: '999px',
                  padding: '8px 18px',
                  fontSize: '18px',
                }}
              >
                {tagPill}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div
                style={{
                  fontFamily: 'Coolvetica',
                  fontSize: computedHeadlineSize,
                  lineHeight: 0.94,
                  color: '#f8fafc',
                  letterSpacing: '-0.02em',
                }}
              >
                {headline}
              </div>
              {subtitle ? (
                <div
                  style={{
                    fontSize: '28px',
                    lineHeight: 1.38,
                    color: '#b8c4da',
                  }}
                >
                  {subtitle}
                </div>
              ) : null}
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderTop: '1px solid #222f49',
                paddingTop: '22px',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ fontSize: '22px', fontWeight: 700, color: '#f8fafc' }}>
                  {footerTitle}
                </div>
                <div style={{ fontSize: '17px', color: '#8c9bb5' }}>
                  {footerSubtitle}
                </div>
              </div>
            </div>
          </div>

          {/* Right column: Portrait cutout or Project logo inside rounded tile */}
          <div
            style={{
              display: 'flex',
              width: '380px',
              height: '100%',
              backgroundColor: imageFit === 'logo' ? '#090d18' : '#f1f5f9',
              border:
                imageFit === 'logo'
                  ? '2px solid #222f49'
                  : '2px solid #cbd5e1',
              borderRadius: '28px',
              overflow: 'hidden',
              alignItems: imageFit === 'logo' ? 'center' : 'flex-end',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            <img
              src={portraitBase64}
              alt={headline}
              width={imageFit === 'logo' ? 300 : 410}
              height={imageFit === 'logo' ? 300 : 410}
              style={{
                width: imageFit === 'logo' ? '300px' : '410px',
                height: imageFit === 'logo' ? '300px' : '410px',
                objectFit: 'contain',
                objectPosition:
                  imageFit === 'logo' ? 'center center' : 'bottom center',
              }}
            />
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
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
