import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faArrowUpRightFromSquare,
  faClock,
  faShieldHalved,
} from '@fortawesome/free-solid-svg-icons';
import {
  CAL_COM_URL,
  SERVICES,
  SUPPORTKORI_URL,
  type ServiceItem,
} from '@/lib/services';

interface ServicesCatalogGridProps {
  services?: ServiceItem[];
  showIntroHeader?: boolean;
}

export default function ServicesCatalogGrid({
  services = SERVICES,
  showIntroHeader = true,
}: ServicesCatalogGridProps) {
  return (
    <div className="max-w-6xl mx-auto">
      {showIntroHeader && (
        <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-ink mb-3">
              Fixed-price technical services
            </h2>
            <p className="text-ink-2 leading-relaxed">
              Focused micro-gigs for small businesses, founders, and personal brands.
              Every service has a dedicated scope page, transparent USD tiers, and
              clear turnaround times with zero stored passwords.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={CAL_COM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus active:scale-[0.98]"
            >
              <span>Book a quick call</span>
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
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service) => (
          <article
            key={service.slug}
            className="flex flex-col justify-between bg-paper-2 border border-rule rounded-card p-6 md:p-7 transition-colors duration-200 hover:bg-paper-3"
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-accent-soft text-accent-text text-xs font-medium">
                  {service.category}
                </span>
                <span className="text-sm font-semibold text-ink">
                  From ${service.startingPriceUsd} USD
                </span>
              </div>

              <h3 className="text-xl font-bold text-ink mb-2">
                <Link
                  href={`/services/${service.slug}`}
                  className="hover:text-accent-text transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus rounded-control"
                >
                  {service.headline}
                </Link>
              </h3>

              <p className="text-ink-2 text-sm leading-relaxed mb-5">
                {service.cardSummary}
              </p>
            </div>

            <div className="pt-4 border-t border-rule flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-muted">
                <FontAwesomeIcon
                  icon={faClock}
                  className="w-3.5 h-3.5 text-accent-text"
                  aria-hidden="true"
                />
                <span>{service.turnaround}</span>
              </div>

              <Link
                href={`/services/${service.slug}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-ink text-sm font-semibold whitespace-nowrap motion-safe:transition-transform motion-safe:duration-200 motion-safe:hover:-translate-y-0.5 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus active:scale-[0.98]"
              >
                <span>View pricing & scope</span>
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10 bg-paper-2 border border-rule rounded-panel p-6 md:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-11 h-11 rounded-control bg-accent-soft text-accent-text flex items-center justify-center shrink-0">
            <FontAwesomeIcon icon={faShieldHalved} className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-ink mb-1">
              Temporary access only, never stored passwords
            </h3>
            <p className="text-sm text-ink-2 leading-relaxed max-w-2xl">
              Every service uses revocable delegate invites, temporary SSH keys, or
              live screen-sharing. You revoke access the moment your verified handoff
              report is delivered.
            </p>
          </div>
        </div>

        <Link href="/services" className="btn-quiet text-sm shrink-0 self-start sm:self-center">
          <span>All service pages</span>
          <FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
