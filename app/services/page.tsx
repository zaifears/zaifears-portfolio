import { Metadata } from 'next';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowUpRightFromSquare,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import ServicesCatalogGrid from '@/app/components/services/ServicesCatalogGrid';
import {
  CAL_COM_URL,
  SERVICES,
  SITE_BASE_URL,
  SUPPORTKORI_URL,
} from '@/lib/services';

export const metadata: Metadata = {
  title: 'Freelance Technical Services',
  description:
    'Fixed-price technical micro-services by Md Al Shahoriar Hossain: SPF/DKIM/DMARC email deliverability, Next.js and Immich VPS hosting, local SEO, Core Web Vitals speed fixes, uptime monitoring, and lead-form automation.',
  alternates: {
    canonical: `${SITE_BASE_URL}/services`,
  },
  openGraph: {
    title: 'Freelance Technical Services | Md Al Shahoriar Hossain',
    description:
      'Fixed-price technical micro-services starting at $10 USD with 24 to 48 hour delivery and clear scope caps.',
    url: `${SITE_BASE_URL}/services`,
    siteName: 'Md Al Shahoriar Hossain',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Freelance Technical Services | Md Al Shahoriar Hossain',
    description:
      'Fixed-price technical micro-services starting at $10 USD with 24 to 48 hour delivery.',
  },
};

export default function ServicesIndexPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_BASE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Skills',
        item: `${SITE_BASE_URL}/skills`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Services',
        item: `${SITE_BASE_URL}/services`,
      },
    ],
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Freelance Technical Services by Md Al Shahoriar Hossain',
    itemListElement: SERVICES.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${SITE_BASE_URL}/services/${service.slug}`,
      name: service.headline,
    })),
  };

  return (
    <div className="min-h-screen bg-paper text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c'),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListSchema).replace(/</g, '\\u003c'),
        }}
      />

      <div className="max-w-6xl mx-auto px-2 sm:px-4 py-8 md:py-12">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
            <li>
              <Link href="/" className="hover:text-ink transition-colors duration-200">
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3" />
            </li>
            <li>
              <Link
                href="/skills#services"
                className="hover:text-ink transition-colors duration-200"
              >
                Skills
              </Link>
            </li>
            <li aria-hidden="true">
              <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3" />
            </li>
            <li className="text-ink font-medium" aria-current="page">
              Services
            </li>
          </ol>
        </nav>

        <section className="bg-paper-2 border border-rule rounded-panel p-7 md:p-10 mb-12">
          <h1 className="text-4xl md:text-5xl text-ink mb-4">
            Freelance Technical Services
          </h1>
          <p className="text-ink-2 text-base md:text-lg leading-relaxed max-w-3xl mb-7">
            Fixed-price technical setups starting at $10 USD with 24-hour delivery.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={CAL_COM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus active:scale-[0.98]"
            >
              <span>Book & order direct</span>
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="w-3.5 h-3.5"
                aria-hidden="true"
              />
            </a>
            <a
              href={SUPPORTKORI_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-quiet text-sm whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus active:scale-[0.98]"
            >
              <span>Order on SupportKori</span>
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="w-3.5 h-3.5"
                aria-hidden="true"
              />
            </a>
          </div>
        </section>

        <ServicesCatalogGrid showIntroHeader={false} />
      </div>
    </div>
  );
}
