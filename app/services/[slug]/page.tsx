import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
  faArrowUpRightFromSquare,
  faBan,
  faCheck,
  faChevronDown,
  faChevronRight,
  faClock,
  faKey,
  faShieldHalved,
} from '@fortawesome/free-solid-svg-icons';
import {
  SERVICES,
  SITE_BASE_URL,
  SUPPORTKORI_URL,
  buildFaqJsonLd,
  buildServiceBreadcrumbJsonLd,
  buildServiceJsonLd,
  getPrimaryOrderCta,
  getServiceBySlug,
} from '@/lib/services';

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }

  const canonicalUrl = `${SITE_BASE_URL}/services/${service.slug}`;

  return {
    title: service.headline,
    description: service.metaDescription,
    keywords: service.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${service.headline} | Md Al Shahoriar Hossain`,
      description: service.metaDescription,
      url: canonicalUrl,
      siteName: 'Md Al Shahoriar Hossain',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.headline} | Md Al Shahoriar Hossain`,
      description: service.metaDescription,
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const primaryCta = getPrimaryOrderCta(service);
  const serviceSchema = buildServiceJsonLd(service);
  const faqSchema = buildFaqJsonLd(service);
  const breadcrumbSchema = buildServiceBreadcrumbJsonLd(service);

  const relatedServices = SERVICES.filter((item) => item.slug !== service.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-paper text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema).replace(/</g, '\\u003c'),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c'),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c'),
        }}
      />

      <div className="max-w-5xl mx-auto px-2 sm:px-4 py-8 md:py-12">
        {/* Breadcrumb */}
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
            <li>
              <Link
                href="/services"
                className="hover:text-ink transition-colors duration-200"
              >
                Services
              </Link>
            </li>
            <li aria-hidden="true">
              <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3" />
            </li>
            <li className="text-ink font-medium" aria-current="page">
              {service.name}
            </li>
          </ol>
        </nav>

        {/* Hero + Direct Answer Block (GEO) */}
        <section className="bg-paper-2 border border-rule rounded-panel p-7 md:p-10 mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-accent-soft text-accent-text text-xs font-medium">
              {service.category}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-paper-3 text-ink-2 text-xs font-medium">
              <FontAwesomeIcon icon={faClock} className="w-3 h-3 text-accent-text" aria-hidden="true" />
              <span>{service.turnaround}</span>
            </span>
            <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-paper-3 text-ink font-mono text-xs font-semibold">
              ${service.startingPriceUsd} to ${service.maxPriceUsd} USD
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl text-ink mb-5 leading-tight">
            {service.headline}
          </h1>

          {/* 40–60 word plain-text GEO direct-answer summary right under H1 */}
          <p className="text-ink-2 text-base md:text-lg leading-relaxed max-w-3xl mb-8">
            {service.geoSummary}
          </p>

          {/* Dual-button CTA block */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={primaryCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm sm:text-base whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus active:scale-[0.98]"
            >
              <span>{primaryCta.label}</span>
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
              className="btn-quiet text-sm sm:text-base whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus active:scale-[0.98]"
            >
              <span>Order on SupportKori / Direct</span>
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="w-3.5 h-3.5"
                aria-hidden="true"
              />
            </a>
          </div>
        </section>

        {/* 3-Tier Pricing Table */}
        <section aria-labelledby="pricing-heading" className="mb-14">
          <div className="mb-6">
            <h2 id="pricing-heading" className="text-2xl md:text-3xl font-bold text-ink mb-2">
              Packages and pricing
            </h2>
            <p className="text-ink-2 text-sm md:text-base">
              Every tier has a fixed USD price and a clear scope cap so there are no surprise bills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {service.tiers.map((tier) => (
              <div
                key={tier.name}
                className={`flex flex-col justify-between rounded-card p-6 border ${
                  tier.highlighted
                    ? 'bg-accent-soft border-accent'
                    : 'bg-paper-2 border-rule'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <h3 className="text-lg font-bold text-ink">{tier.name}</h3>
                    {tier.highlighted && (
                      <span className="px-3 py-1 rounded-full bg-accent text-accent-ink text-xs font-medium">
                        Most chosen
                      </span>
                    )}
                  </div>

                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="font-mono text-3xl font-bold text-ink">
                      ${tier.priceUsd}
                    </span>
                    <span className="text-xs text-muted">USD one-time</span>
                  </div>

                  <p className="text-sm text-ink-2 mb-4 leading-relaxed">
                    {tier.summary}
                  </p>

                  <div className="rounded-control bg-paper px-3.5 py-2.5 border border-rule mb-5 text-xs text-ink-2 space-y-1">
                    <div>
                      <span className="font-semibold text-ink">Scope cap: </span>
                      <span>{tier.scopeCap}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-ink">Delivery: </span>
                      <span>{tier.deliveryDays}</span>
                    </div>
                  </div>

                  <ul className="space-y-2.5 text-sm text-ink-2 mb-6">
                    {tier.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="w-3.5 h-3.5 text-accent-text mt-1 shrink-0"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={primaryCta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={
                    tier.highlighted
                      ? 'btn-primary justify-center w-full text-sm'
                      : 'btn-quiet justify-center w-full text-sm'
                  }
                >
                  <span>Choose {tier.name}</span>
                  <FontAwesomeIcon
                    icon={faArrowUpRightFromSquare}
                    className="w-3.5 h-3.5"
                    aria-hidden="true"
                  />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Scannable Scope Breakdown: What You Get / What I Need / Not Included */}
        <section aria-labelledby="scope-heading" className="mb-14">
          <h2 id="scope-heading" className="text-2xl md:text-3xl font-bold text-ink mb-6">
            Scope and requirements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-paper-2 border border-rule rounded-card p-6">
              <h3 className="text-lg font-bold text-ink mb-4">What you get</h3>
              <ul className="space-y-2.5 text-sm text-ink-2 leading-relaxed">
                {service.whatYouGet.map((point) => (
                  <li key={point} className="flex items-start gap-2.5">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="w-3.5 h-3.5 text-accent-text mt-1 shrink-0"
                      aria-hidden="true"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-paper-2 border border-rule rounded-card p-6">
              <h3 className="text-lg font-bold text-ink mb-4">What I need from you</h3>
              <ul className="space-y-2.5 text-sm text-ink-2 leading-relaxed">
                {service.whatINeed.map((point) => (
                  <li key={point} className="flex items-start gap-2.5">
                    <FontAwesomeIcon
                      icon={faKey}
                      className="w-3.5 h-3.5 text-accent-text mt-1 shrink-0"
                      aria-hidden="true"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-paper-2 border border-rule rounded-card p-6">
              <h3 className="text-lg font-bold text-ink mb-4">Not included</h3>
              <ul className="space-y-2.5 text-sm text-ink-2 leading-relaxed">
                {service.notIncluded.map((point) => (
                  <li key={point} className="flex items-start gap-2.5">
                    <FontAwesomeIcon
                      icon={faBan}
                      className="w-3.5 h-3.5 text-muted mt-1 shrink-0"
                      aria-hidden="true"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* How It Works (3 steps) */}
        <section aria-labelledby="how-it-works-heading" className="mb-14">
          <h2 id="how-it-works-heading" className="text-2xl md:text-3xl font-bold text-ink mb-6">
            Three-step delivery process
          </h2>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {service.howItWorks.map((item) => (
              <li
                key={item.step}
                className="bg-paper-2 border border-rule rounded-card p-6"
              >
                <h3 className="text-lg font-bold text-ink mb-2">
                  {item.step}: {item.title}
                </h3>
                <p className="text-sm text-ink-2 leading-relaxed">{item.detail}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Semantic HTML Comparison Table */}
        <section aria-labelledby="comparison-heading" className="mb-14">
          <div className="mb-5">
            <h2 id="comparison-heading" className="text-2xl md:text-3xl font-bold text-ink mb-2">
              {service.comparisonTitle}
            </h2>
            <p className="text-sm md:text-base text-ink-2">
              Direct cost and turnaround comparison against typical alternatives.
            </p>
          </div>

          <div className="overflow-x-auto bg-paper-2 border border-rule rounded-card">
            <table className="[display:table] w-full max-w-none whitespace-normal border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-rule bg-paper-3">
                  <th scope="col" className="py-4 px-5 font-semibold text-ink">
                    Factor
                  </th>
                  <th scope="col" className="py-4 px-5 font-semibold text-accent-text">
                    With Shahoriar
                  </th>
                  <th scope="col" className="py-4 px-5 font-semibold text-muted">
                    {service.comparisonAlternativeLabel}
                  </th>
                </tr>
              </thead>
              <tbody>
                {service.comparisonRows.map((row) => (
                  <tr key={row.item} className="border-b border-rule last:border-b-0">
                    <th scope="row" className="py-4 px-5 font-medium text-ink align-top">
                      {row.item}
                    </th>
                    <td className="py-4 px-5 font-medium text-ink align-top">
                      {row.withMe}
                    </td>
                    <td className="py-4 px-5 text-muted align-top">
                      {row.typicalAlternative}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Verification & Handoff Proof */}
        <section className="mb-14 bg-paper-2 border border-rule rounded-card p-6 md:p-7 flex items-start gap-4">
          <div className="w-11 h-11 rounded-control bg-accent-soft text-accent-text flex items-center justify-center shrink-0">
            <FontAwesomeIcon icon={faShieldHalved} className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-ink mb-1">
              Handoff verification included
            </h2>
            <p className="text-sm md:text-base text-ink-2 leading-relaxed">
              {service.verificationProof}
            </p>
          </div>
        </section>

        {/* FAQs */}
        <section aria-labelledby="faq-heading" className="mb-14">
          <h2 id="faq-heading" className="text-2xl md:text-3xl font-bold text-ink mb-6">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {service.faqs.map((faq, index) => (
              <details
                key={faq.question}
                open={index === 0}
                className="group bg-paper-2 border border-rule rounded-card p-5 md:p-6"
              >
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-semibold text-ink text-base rounded-control focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus">
                  <span>{faq.question}</span>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className="w-4 h-4 text-muted shrink-0 motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-open:rotate-180 motion-reduce:transition-none"
                    aria-hidden="true"
                  />
                </summary>
                <p className="mt-3 pt-3 border-t border-rule text-sm md:text-base text-ink-2 leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Bottom Dual-Button CTA */}
        <section className="bg-paper-2 border border-rule rounded-panel p-7 md:p-10 mb-14">
          <h2 className="text-2xl md:text-3xl font-bold text-ink mb-3">
            Ready to get this fixed?
          </h2>
          <p className="text-ink-2 text-sm md:text-base leading-relaxed max-w-2xl mb-6">
            Start with the Basic micro-fix at ${service.startingPriceUsd} USD or choose the full
            Standard setup. Temporary access only, verified before handoff.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={primaryCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm sm:text-base whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus active:scale-[0.98]"
            >
              <span>{primaryCta.label}</span>
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
              className="btn-quiet text-sm sm:text-base whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus active:scale-[0.98]"
            >
              <span>Order on SupportKori / Direct</span>
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="w-3.5 h-3.5"
                aria-hidden="true"
              />
            </a>
            <Link
              href="/contact"
              className="btn-quiet text-sm sm:text-base whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus active:scale-[0.98]"
            >
              <span>Ask a question first</span>
            </Link>
          </div>
        </section>

        {/* Related Services */}
        <section aria-labelledby="related-heading" className="mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
            <h2 id="related-heading" className="text-xl font-bold text-ink">
              Other fixed-price services
            </h2>
            <Link
              href="/skills#services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent-text hover:underline"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Back to Skills & Services</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {relatedServices.map((rel) => (
              <Link
                key={rel.slug}
                href={`/services/${rel.slug}`}
                className="bg-paper-2 border border-rule rounded-card p-5 flex flex-col justify-between transition-colors duration-200 hover:bg-paper-3"
              >
                <div>
                  <span className="text-xs font-semibold text-accent-text">
                    From ${rel.startingPriceUsd} USD
                  </span>
                  <h3 className="text-base font-bold text-ink mt-1.5 mb-2">
                    {rel.name}
                  </h3>
                  <p className="text-xs text-ink-2 leading-relaxed mb-4">
                    {rel.cardSummary}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-text">
                  <span>View service</span>
                  <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
