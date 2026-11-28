import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  SERVICES,
  SITE_BASE_URL,
  buildFaqJsonLd,
  buildServiceBreadcrumbJsonLd,
  buildServiceJsonLd,
  getPrimaryOrderCta,
  getServiceBySlug,
} from '../lib/services';

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

describe('Freelance services catalog (SEO, GEO & Fiverr compliance)', () => {
  it('defines all 8 unique services with clean kebab-case slugs', () => {
    assert.equal(SERVICES.length, 8);
    const slugs = new Set(SERVICES.map((s) => s.slug));
    assert.equal(slugs.size, SERVICES.length);

    for (const service of SERVICES) {
      assert.match(service.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
      assert.equal(getServiceBySlug(service.slug)?.slug, service.slug);
    }
  });

  it('enforces Fiverr gig title format ("I will ..." under 65 chars)', () => {
    for (const service of SERVICES) {
      assert.ok(
        service.fiverrTitle.startsWith('I will '),
        `${service.slug}: fiverrTitle must start with "I will "`
      );
      assert.ok(
        service.fiverrTitle.length < 65,
        `${service.slug}: fiverrTitle (${service.fiverrTitle.length} chars) must be under 65 chars`
      );
    }
  });

  it('enforces 40–60 word GEO direct-answer summary with USD price and turnaround', () => {
    for (const service of SERVICES) {
      const words = countWords(service.geoSummary);
      assert.ok(
        words >= 40 && words <= 60,
        `${service.slug}: geoSummary has ${words} words (expected 40–60)`
      );
      assert.ok(
        service.geoSummary.includes(`$${service.startingPriceUsd}`),
        `${service.slug}: geoSummary must state starting price $${service.startingPriceUsd}`
      );
      assert.match(
        service.geoSummary,
        /USD/i,
        `${service.slug}: geoSummary must mention USD`
      );
      assert.match(
        service.geoSummary,
        /hour|day/i,
        `${service.slug}: geoSummary must mention delivery turnaround`
      );
    }
  });

  it('has 3 pricing tiers (Basic, Standard, Premium) with ascending prices and scope caps', () => {
    for (const service of SERVICES) {
      assert.equal(service.tiers.length, 3);
      assert.deepEqual(
        service.tiers.map((t) => t.name),
        ['Basic', 'Standard', 'Premium']
      );
      const [basic, standard, premium] = service.tiers;
      assert.equal(basic.priceUsd, service.startingPriceUsd);
      assert.equal(premium.priceUsd, service.maxPriceUsd);
      assert.ok(basic.priceUsd < standard.priceUsd && standard.priceUsd < premium.priceUsd);

      for (const tier of service.tiers) {
        assert.ok(tier.scopeCap.trim().length > 0, `${service.slug} ${tier.name} missing scopeCap`);
        assert.ok(tier.deliverables.length >= 3, `${service.slug} ${tier.name} needs >= 3 deliverables`);
      }
    }
  });

  it('includes 4–5 FAQs with explicit temporary-access / no-password-storage assurance', () => {
    for (const service of SERVICES) {
      assert.ok(
        service.faqs.length >= 4 && service.faqs.length <= 5,
        `${service.slug}: expected 4–5 FAQs, got ${service.faqs.length}`
      );
      const combinedAnswers = service.faqs.map((f) => f.answer).join(' ').toLowerCase();
      assert.ok(
        combinedAnswers.includes('password') &&
          (combinedAnswers.includes('temporary') || combinedAnswers.includes('screen-share')),
        `${service.slug}: FAQs must explicitly state no stored passwords and temporary access / screen-share`
      );
    }
  });

  it('generates valid Service, FAQPage, and BreadcrumbList JSON-LD schemas', () => {
    for (const service of SERVICES) {
      const serviceSchema = buildServiceJsonLd(service);
      assert.equal(serviceSchema['@type'], 'Service');
      assert.equal(serviceSchema.url, `${SITE_BASE_URL}/services/${service.slug}`);
      assert.equal(serviceSchema.offers.priceCurrency, 'USD');
      assert.equal(serviceSchema.offers.lowPrice, String(service.startingPriceUsd));
      assert.equal(serviceSchema.offers.highPrice, String(service.maxPriceUsd));
      assert.equal(serviceSchema.offers.offers.length, 3);

      const faqSchema = buildFaqJsonLd(service);
      assert.equal(faqSchema['@type'], 'FAQPage');
      assert.equal(faqSchema.mainEntity.length, service.faqs.length);

      const breadcrumbSchema = buildServiceBreadcrumbJsonLd(service);
      assert.equal(breadcrumbSchema['@type'], 'BreadcrumbList');
      assert.equal(breadcrumbSchema.itemListElement.length, 4);
    }
  });

  it('switches primary CTA automatically when fiverrUrl is set', () => {
    const sample = SERVICES[0];
    const fallbackCta = getPrimaryOrderCta({ ...sample, fiverrUrl: null });
    assert.equal(fallbackCta.isFiverr, false);
    assert.equal(fallbackCta.href, 'https://cal.com/zaifears');

    const fiverrCta = getPrimaryOrderCta({
      ...sample,
      fiverrUrl: 'https://www.fiverr.com/zaifears/fix-email',
    });
    assert.equal(fiverrCta.isFiverr, true);
    assert.equal(fiverrCta.label, 'Order on Fiverr');
    assert.equal(fiverrCta.href, 'https://www.fiverr.com/zaifears/fix-email');
  });
});
