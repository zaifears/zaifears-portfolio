export interface ServiceTier {
  name: 'Basic' | 'Standard' | 'Premium';
  priceUsd: number;
  deliveryDays: string;
  scopeCap: string;
  summary: string;
  deliverables: string[];
  highlighted?: boolean;
}

export interface ServiceComparisonRow {
  item: string;
  withMe: string;
  typicalAlternative: string;
}

export interface ServiceStep {
  step: string;
  title: string;
  detail: string;
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceItem {
  slug: string;
  /** Short service name for cards and breadcrumbs */
  name: string;
  /** Primary SEO page title (H1 & <title>) */
  headline: string;
  /** Fiverr-ready gig title: starts with "I will ", under 65 characters */
  fiverrTitle: string;
  /** Category label (sentence case, no uppercase) */
  category: string;
  /** Starting USD price (matches Basic tier) */
  startingPriceUsd: number;
  /** Highest USD price (matches Premium tier) */
  maxPriceUsd: number;
  /** Short turnaround label, e.g. "24 hours" or "2 days" */
  turnaround: string;
  /** 1-line summary for the /skills tab card */
  cardSummary: string;
  /** 40–60 word plain-text GEO direct answer block placed right under H1 */
  geoSummary: string;
  /** SEO meta description */
  metaDescription: string;
  /** Primary target keywords */
  keywords: string[];
  /** Optional direct Fiverr gig URL. Leave null until gig is published; CTA falls back to Cal.com booking. */
  fiverrUrl: string | null;
  /** Optional PeoplePerHour Offer URL */
  pphUrl: string | null;
  tiers: [ServiceTier, ServiceTier, ServiceTier];
  whatYouGet: string[];
  whatINeed: string[];
  notIncluded: string[];
  howItWorks: [ServiceStep, ServiceStep, ServiceStep];
  comparisonTitle: string;
  comparisonAlternativeLabel: string;
  comparisonRows: ServiceComparisonRow[];
  verificationProof: string;
  faqs: ServiceFaq[];
}

export const SITE_BASE_URL = 'https://shahoriar.bd';
export const SUPPORTKORI_URL = 'https://www.supportkori.com/zaifears';
export const CAL_COM_URL = 'https://cal.com/zaifears';

/**
 * Paste your live Fiverr gig URLs here once published.
 * When a URL is set for a slug, the primary CTA button on that service page
 * automatically switches to "Order on Fiverr" pointing directly to the gig.
 */
export const FIVERR_GIG_URLS: Partial<Record<string, string>> = {
  // 'fix-email-deliverability': 'https://www.fiverr.com/zaifears/...',
  // 'migrate-nextjs-to-vps': 'https://www.fiverr.com/zaifears/...',
  // 'self-host-immich-vps': 'https://www.fiverr.com/zaifears/...',
  // 'google-business-profile-seo': 'https://www.fiverr.com/zaifears/...',
  // 'personal-branding-website-seo-geo': 'https://www.fiverr.com/zaifears/...',
  // 'website-speed-core-web-vitals': 'https://www.fiverr.com/zaifears/...',
  // 'uptime-monitoring-alerts': 'https://www.fiverr.com/zaifears/...',
  // 'lead-form-google-sheets-autoreply': 'https://www.fiverr.com/zaifears/...',
};

export const SERVICES: ServiceItem[] = [
  {
    slug: 'fix-email-deliverability',
    name: 'Email Deliverability (SPF, DKIM, DMARC)',
    headline: 'Fix SPF, DKIM, and DMARC Email Deliverability',
    fiverrTitle: 'I will fix SPF, DKIM, and DMARC email deliverability',
    category: 'Infrastructure & email',
    startingPriceUsd: 10,
    maxPriceUsd: 50,
    turnaround: '24 hours',
    cardSummary:
      'Stop business emails from landing in spam with verified SPF, DKIM, and DMARC DNS records.',
    geoSummary:
      'I fix SPF, DKIM, and DMARC DNS records for small businesses, agencies, and founders whose domain emails land in Gmail or Outlook spam. Starting at $10 USD with 24-hour delivery, I audit your DNS zone, configure authentication records cleanly, and verify every check with a live deliverability report.',
    metaDescription:
      'Fix SPF, DKIM, and DMARC email deliverability for your domain starting at $10 USD with 24-hour turnaround. Stop business emails from landing in spam.',
    keywords: [
      'fix email deliverability',
      'SPF DKIM DMARC setup',
      'stop emails going to spam',
      'DNS email authentication',
    ],
    fiverrUrl: FIVERR_GIG_URLS['fix-email-deliverability'] ?? null,
    pphUrl: null,
    tiers: [
      {
        name: 'Basic',
        priceUsd: 10,
        deliveryDays: '24 hours',
        scopeCap: '1 domain, 1 email provider',
        summary: 'Fast DNS authentication micro-fix for a single domain.',
        deliverables: [
          'Audit existing SPF, DKIM, and DMARC records',
          'Fix or publish valid SPF and DMARC TXT records',
          'Verify propagation via MXToolbox and mail-tester',
        ],
      },
      {
        name: 'Standard',
        priceUsd: 25,
        deliveryDays: '24 hours',
        scopeCap: '1 domain, up to 3 sending tools',
        summary: 'Complete authentication setup across workspace and marketing senders.',
        highlighted: true,
        deliverables: [
          'Full SPF flattening/cleanup within the 10-DNS-lookup limit',
          'DKIM key generation and signing for up to 3 senders',
          'DMARC policy rollout with reporting address configured',
          'Before-and-after deliverability score report',
        ],
      },
      {
        name: 'Premium',
        priceUsd: 50,
        deliveryDays: '2 days',
        scopeCap: '1 domain + full documentation + 7-day support',
        summary: 'End-to-end deliverability hardening with ongoing monitoring handoff.',
        deliverables: [
          'Everything in Standard for all active sending services',
          'Custom tracking domain and BIMI readiness check',
          'Written DNS documentation for your team',
          '7 days of post-delivery inbox placement support',
        ],
      },
    ],
    whatYouGet: [
      'Clean SPF record that stays under the strict 10-lookup DNS limit',
      'Active DKIM cryptographic signing for Google Workspace, Microsoft 365, Zoho, or Brevo',
      'Valid DMARC policy with aggregate report routing so you see spoofing attempts',
      'Before-and-after MXToolbox and inbox verification screenshots',
    ],
    whatINeed: [
      'Domain name and list of services sending mail on your behalf',
      'Temporary delegate access to your DNS host (Cloudflare, Namecheap, GoDaddy) or a 15-minute screen-share',
      'One test email address to confirm final inbox placement',
    ],
    notIncluded: [
      'Warming up brand-new cold-outreach domains or bulk spam campaigns',
      'Removing domains from paid third-party blacklists that require legal review',
      'Migrating existing mailbox history between providers',
    ],
    howItWorks: [
      {
        step: 'Step 1',
        title: 'DNS audit',
        detail: 'I inspect your current TXT, MX, and CNAME records and identify every failing check.',
      },
      {
        step: 'Step 2',
        title: 'Clean configuration',
        detail: 'We apply exact SPF, DKIM, and DMARC records via temporary DNS access or screen-share.',
      },
      {
        step: 'Step 3',
        title: 'Live verification',
        detail: 'I run live header tests and hand over a green before-and-after deliverability report.',
      },
    ],
    comparisonTitle: 'Fixed micro-gig vs. agency retainer',
    comparisonAlternativeLabel: 'Typical IT agency or SaaS',
    comparisonRows: [
      {
        item: 'SPF, DKIM, and DMARC setup',
        withMe: '$10 to $25 one-time',
        typicalAlternative: '$150 to $300 agency minimum',
      },
      {
        item: 'Turnaround time',
        withMe: 'Within 24 hours',
        typicalAlternative: '3 to 7 business days',
      },
      {
        item: 'Monthly lock-in',
        withMe: 'None, you own every record',
        typicalAlternative: '$49+/month managed DMARC SaaS',
      },
    ],
    verificationProof:
      'Every order finishes with a live MXToolbox and email header authentication pass screenshot showing SPF, DKIM, and DMARC passing.',
    faqs: [
      {
        question: 'How do you handle my DNS login and password security?',
        answer:
          'I never store passwords. You can grant temporary delegate access (such as Cloudflare member access) and revoke it immediately after delivery, or we can apply the DNS records together over a short screen-share.',
      },
      {
        question: 'How fast will my emails stop going to spam?',
        answer:
          'DNS changes propagate within 15 minutes to 4 hours. Most clients see clean authentication headers the same day, while sender reputation improves over the next several sends.',
      },
      {
        question: 'Which DNS hosts and email providers are supported?',
        answer:
          'Cloudflare, Namecheap, GoDaddy, Route 53, Hostinger, and cPanel DNS are all supported, alongside Google Workspace, Microsoft 365, Zoho Mail, Resend, Brevo, and Mailchimp.',
      },
      {
        question: 'What is covered if my domain has multiple sending tools?',
        answer:
          'Basic covers 1 domain and 1 email provider. Standard covers up to 3 sending tools on 1 domain and resolves SPF lookup limit errors.',
      },
    ],
  },
  {
    slug: 'migrate-nextjs-to-vps',
    name: 'Migrate Next.js to VPS',
    headline: 'Migrate Your Next.js App to a Self-Hosted VPS',
    fiverrTitle: 'I will migrate your Next.js app to a self-hosted VPS',
    category: 'VPS & deployment',
    startingPriceUsd: 15,
    maxPriceUsd: 65,
    turnaround: '24 to 48 hours',
    cardSummary:
      'Move your Next.js app off expensive PaaS tiers onto an Ubuntu VPS with Caddy HTTPS and systemd.',
    geoSummary:
      'I migrate Next.js applications from Vercel or Netlify onto your own Ubuntu VPS (Oracle Cloud, Hetzner, or DigitalOcean) for founders and solo developers looking to cut monthly hosting bills. Starting at $15 USD with 24 to 48 hour delivery, I configure standalone builds, Caddy automatic HTTPS, and systemd auto-restart.',
    metaDescription:
      'Migrate your Next.js app to an Ubuntu VPS with Caddy HTTPS, Cloudflare caching, and systemd starting at $15 USD. Cut hosting costs in 24 to 48 hours.',
    keywords: [
      'migrate Next.js to VPS',
      'self host Next.js Ubuntu',
      'Next.js Caddy systemd setup',
      'move off Vercel to VPS',
    ],
    fiverrUrl: FIVERR_GIG_URLS['migrate-nextjs-to-vps'] ?? null,
    pphUrl: null,
    tiers: [
      {
        name: 'Basic',
        priceUsd: 15,
        deliveryDays: '24 hours',
        scopeCap: '1 VPS readiness & reverse-proxy check',
        summary: 'Server hardening, Caddy HTTPS, and Node/pnpm runtime setup.',
        deliverables: [
          'Configure Ubuntu firewall (UFW) and Node.js + pnpm runtime',
          'Set up Caddy reverse proxy with automatic SSL certificate',
          'Verify domain routing to your VPS port',
        ],
      },
      {
        name: 'Standard',
        priceUsd: 35,
        deliveryDays: '2 days',
        scopeCap: '1 Next.js app, 1 domain',
        summary: 'Full standalone Next.js migration with systemd process management.',
        highlighted: true,
        deliverables: [
          'Configure Next.js standalone production build',
          'Create systemd service with automatic restart on crash or reboot',
          'Set up Caddy HTTPS and Cloudflare proxy/cache rules',
          'Live production smoke check on your domain',
        ],
      },
      {
        name: 'Premium',
        priceUsd: 65,
        deliveryDays: '3 days',
        scopeCap: '1 Next.js app + deploy script + 7-day support',
        summary: 'Production migration with zero-downtime release script and handoff docs.',
        deliverables: [
          'Everything in Standard with rollback-capable release directories',
          'One-command deployment script with health checks',
          'Clear Markdown runbook for future updates and rollbacks',
          '7 days of post-migration support',
        ],
      },
    ],
    whatYouGet: [
      'Production-ready Next.js standalone server running cleanly under systemd',
      'Automatic Let’s Encrypt HTTPS certificates managed by Caddy',
      'UFW firewall rules exposing only SSH, HTTP, and HTTPS',
      'Optional Cloudflare edge-caching rules for static assets',
    ],
    whatINeed: [
      'Ubuntu 22.04 or 24.04 VPS IP address and temporary SSH key access',
      'Read access to your Git repository (or a release archive) and required environment variable names',
      'Temporary DNS access to point your domain A/AAAA record to the VPS',
    ],
    notIncluded: [
      'Rewriting broken application code or upgrading major Next.js versions',
      'Managed database administration or multi-region Kubernetes clusters',
      'Ongoing monthly server patching after the 7-day support window',
    ],
    howItWorks: [
      {
        step: 'Step 1',
        title: 'Server preparation',
        detail: 'I secure the Ubuntu VPS, install the required Node runtime, and configure Caddy HTTPS.',
      },
      {
        step: 'Step 2',
        title: 'Build and wire',
        detail: 'Your Next.js app is deployed as a systemd service with your environment variables loaded safely.',
      },
      {
        step: 'Step 3',
        title: 'DNS switch and test',
        detail: 'We point your domain over, confirm HTTPS and fast page loads, and remove my temporary SSH key.',
      },
    ],
    comparisonTitle: 'Self-hosted VPS migration vs. managed PaaS',
    comparisonAlternativeLabel: 'Managed PaaS or DevOps agency',
    comparisonRows: [
      {
        item: 'Migration setup cost',
        withMe: '$15 to $65 one-time',
        typicalAlternative: '$300 to $800 DevOps contractor',
      },
      {
        item: 'Monthly hosting bill',
        withMe: '$0 to $6/month on your VPS',
        typicalAlternative: '$20+/seat/month + bandwidth overages',
      },
      {
        item: 'Delivery time',
        withMe: '24 to 48 hours',
        typicalAlternative: '1 to 2 weeks',
      },
    ],
    verificationProof:
      'Before handoff, you receive a live HTTPS verification check, systemd active status output, and a confirmed reboot-persistence test.',
    faqs: [
      {
        question: 'Will you keep my SSH keys or environment secrets?',
        answer:
          'Never. I do not store passwords or secrets. You add my temporary public SSH key for the migration, paste your own .env values directly or over screen-share, and delete my key from authorized_keys at handoff.',
      },
      {
        question: 'Which VPS providers work best for Next.js?',
        answer:
          'Oracle Cloud Always Free, Hetzner Cloud, DigitalOcean, Vultr, and Linode running Ubuntu 22.04 or 24.04 all work cleanly.',
      },
      {
        question: 'Can this run on a small 1 GB RAM VPS?',
        answer:
          'Yes. For 1 GB RAM servers, I configure local builds or swap-safe standalone deployment so the server never runs out of memory during updates.',
      },
      {
        question: 'How long will my site be offline during the switch?',
        answer:
          'Typically zero to two minutes. I stage and verify the app on the VPS first, then switch your DNS record once the server responds cleanly.',
      },
    ],
  },
  {
    slug: 'self-host-immich-vps',
    name: 'Self-Host Immich on VPS',
    headline: 'Self-Host Immich Photo Server on Your VPS',
    fiverrTitle: 'I will self-host Immich photo server on your VPS',
    category: 'VPS & self-hosting',
    startingPriceUsd: 15,
    maxPriceUsd: 55,
    turnaround: '24 hours',
    cardSummary:
      'Replace monthly cloud photo storage fees with a private Docker Immich server and HTTPS domain.',
    geoSummary:
      'I install and configure self-hosted Immich on your Ubuntu VPS or home Linux server for individuals and families replacing Google Photos subscriptions. Starting at $15 USD with 24-hour delivery, I set up Docker Compose, PostgreSQL, automatic HTTPS reverse proxy, and mobile app sync so your photos stay private.',
    metaDescription:
      'Self-host Immich photo backup server on your Ubuntu VPS with Docker Compose and HTTPS starting at $15 USD. Delivered in 24 hours.',
    keywords: [
      'self host Immich VPS',
      'Immich Docker setup service',
      'Google Photos self hosted alternative',
      'Immich reverse proxy HTTPS',
    ],
    fiverrUrl: FIVERR_GIG_URLS['self-host-immich-vps'] ?? null,
    pphUrl: null,
    tiers: [
      {
        name: 'Basic',
        priceUsd: 15,
        deliveryDays: '24 hours',
        scopeCap: '1 Docker Immich instance',
        summary: 'Clean Docker Compose installation on your Linux server.',
        deliverables: [
          'Install Docker Engine and Docker Compose plugin',
          'Deploy official Immich stack with persistent photo storage volume',
          'Verify web dashboard login and upload test',
        ],
      },
      {
        name: 'Standard',
        priceUsd: 30,
        deliveryDays: '24 hours',
        scopeCap: '1 Immich instance + custom domain HTTPS',
        summary: 'Full private cloud photo setup ready for iOS and Android sync.',
        highlighted: true,
        deliverables: [
          'Everything in Basic plus Caddy or Nginx automatic HTTPS',
          'Custom subdomain routing (e.g., photos.yourdomain.com)',
          'Firewall lockdown and upload size limits tuned for large videos',
          'Mobile app connection walkthrough',
        ],
      },
      {
        name: 'Premium',
        priceUsd: 55,
        deliveryDays: '2 days',
        scopeCap: '1 Immich instance + automated DB backups + 7-day support',
        summary: 'Production family setup with scheduled backups and upgrade guide.',
        deliverables: [
          'Everything in Standard plus scheduled PostgreSQL backup script',
          'External storage mount or S3-compatible backup wiring',
          'Safe Immich version-upgrade checklist',
          '7 days of post-setup support',
        ],
      },
    ],
    whatYouGet: [
      'Official Docker Compose Immich stack pinned cleanly for predictable updates',
      'HTTPS domain access with large-file upload support for 4K videos',
      'Verified photo upload and thumbnail generation test',
      'Simple handoff guide for connecting iOS and Android Immich apps',
    ],
    whatINeed: [
      'Ubuntu or Debian VPS / home server with at least 4 GB RAM recommended (2 GB minimum without ML)',
      'Temporary SSH key access or a screen-sharing session',
      'Optional domain name if you want HTTPS access on a custom subdomain',
    ],
    notIncluded: [
      'Cost of the VPS, domain registration, or external cloud storage',
      'Migrating terabytes of Google Takeout archives over slow connections',
      'Hardware troubleshooting on residential routers with CGNAT (Tailscale/Cloudflare Tunnel can be used instead)',
    ],
    howItWorks: [
      {
        step: 'Step 1',
        title: 'Docker and storage setup',
        detail: 'I install Docker, mount your storage directory, and prepare the Immich environment file.',
      },
      {
        step: 'Step 2',
        title: 'HTTPS and firewall',
        detail: 'I configure automatic SSL on your subdomain and restrict open ports to only what is needed.',
      },
      {
        step: 'Step 3',
        title: 'Sync test and handoff',
        detail: 'We upload a test photo, confirm mobile app login, and remove my temporary server access.',
      },
    ],
    comparisonTitle: 'Self-hosted Immich vs. cloud photo plans',
    comparisonAlternativeLabel: 'Cloud storage subscriptions',
    comparisonRows: [
      {
        item: 'One-time setup',
        withMe: '$15 to $55 once',
        typicalAlternative: 'Recurring annual fee forever',
      },
      {
        item: 'Data ownership',
        withMe: '100% private on your server',
        typicalAlternative: 'Stored on third-party servers',
      },
      {
        item: 'Turnaround time',
        withMe: 'Within 24 hours',
        typicalAlternative: 'Days of trial-and-error DIY',
      },
    ],
    verificationProof:
      'Handoff includes a live HTTPS web login check, a successful test photo upload, and healthy Docker container status output.',
    faqs: [
      {
        question: 'Can you see my private photos after setup?',
        answer:
          'No. I never store passwords or SSH keys. You create your own admin account during handoff and remove my temporary SSH key before uploading your personal library.',
      },
      {
        question: 'What server specs does Immich need?',
        answer:
          'Ubuntu 22.04/24.04 or Debian 12 with 2+ CPU cores and 4 GB RAM is ideal for machine learning search. Smaller 2 GB servers work if we disable heavy ML workers.',
      },
      {
        question: 'What if my home server is behind CGNAT without a public IP?',
        answer:
          'We can expose your Immich instance securely over Tailscale (private VPN) or Cloudflare Tunnel without opening router ports.',
      },
      {
        question: 'How do I update Immich later without breaking it?',
        answer:
          'Standard and Premium setups use clean Docker Compose files, and Premium includes an exact step-by-step backup-then-upgrade checklist.',
      },
    ],
  },
  {
    slug: 'google-business-profile-seo',
    name: 'Google Business Profile & Local SEO',
    headline: 'Google Business Profile and Local SEO Cleanup',
    fiverrTitle: 'I will optimize your Google Business Profile and local SEO',
    category: 'Local SEO',
    startingPriceUsd: 15,
    maxPriceUsd: 50,
    turnaround: '24 to 48 hours',
    cardSummary:
      'Fix GBP categories, service areas, hours, UTM links, and LocalBusiness schema so local customers find you.',
    geoSummary:
      'I optimize Google Business Profiles and website LocalBusiness schema for local shops, clinics, and service businesses trying to rank higher on Google Maps. Starting at $15 USD with 24 to 48 hour delivery, I fix categories, service areas, business hours, and UTM tracking links, backed by a before-and-after checklist.',
    metaDescription:
      'Google Business Profile and local SEO cleanup starting at $15 USD. Fix categories, service areas, UTM links, and LocalBusiness schema in 24 to 48 hours.',
    keywords: [
      'Google Business Profile optimization',
      'local SEO cleanup',
      'Google Maps ranking fix',
      'LocalBusiness schema markup',
    ],
    fiverrUrl: FIVERR_GIG_URLS['google-business-profile-seo'] ?? null,
    pphUrl: null,
    tiers: [
      {
        name: 'Basic',
        priceUsd: 15,
        deliveryDays: '24 hours',
        scopeCap: '1 Google Business Profile location',
        summary: 'Fast profile audit and core field cleanup for 1 location.',
        deliverables: [
          'Audit primary and secondary GBP categories',
          'Fix business hours, service areas, and NAP consistency',
          'Add UTM tracking parameters to website and booking links',
          '1-page before-and-after checklist of updated fields',
        ],
      },
      {
        name: 'Standard',
        priceUsd: 25,
        deliveryDays: '2 days',
        scopeCap: '1 GBP location + 1 website homepage',
        summary: 'Full GBP optimization paired with website LocalBusiness JSON-LD.',
        highlighted: true,
        deliverables: [
          'Everything in Basic plus optimized business description and services list',
          'Q&A seed entries and photo naming/alt guidance',
          'Custom LocalBusiness JSON-LD schema ready for your website',
          '1-page before-and-after audit checklist',
        ],
      },
      {
        name: 'Premium',
        priceUsd: 50,
        deliveryDays: '3 days',
        scopeCap: '1 GBP location + website schema install + 7-day support',
        summary: 'Complete local SEO cleanup installed live with follow-up support.',
        deliverables: [
          'Everything in Standard installed directly on your website',
          'Rich Results Test validation with zero schema errors',
          'Google Search Console local indexing check',
          '7 days of post-delivery support for GBP verification questions',
        ],
      },
    ],
    whatYouGet: [
      'Accurate primary and secondary categories aligned with buyer search intent',
      'Consistent Name, Address, and Phone (NAP) formatting across GBP and your site',
      'UTM-tagged website links so Google Analytics tracks Maps clicks accurately',
      'A 1-page before-and-after checklist documenting every field updated',
    ],
    whatINeed: [
      'Your verified Google Business Profile link and website URL',
      'Temporary Manager invite on Google Business Profile (never your Google password)',
      'Your official business hours, service areas, and top 5 services',
    ],
    notIncluded: [
      'Reinstating suspended Google Business Profiles or bypassing video verification',
      'Posting fake reviews or buying directory spam backlinks',
      'Ongoing monthly GBP social posting after delivery',
    ],
    howItWorks: [
      {
        step: 'Step 1',
        title: 'Profile and NAP audit',
        detail: 'I review your live Google Maps listing, categories, links, and website schema gaps.',
      },
      {
        step: 'Step 2',
        title: 'Structured cleanup',
        detail: 'I update categories, hours, service areas, UTM links, and prepare LocalBusiness JSON-LD.',
      },
      {
        step: 'Step 3',
        title: 'Checklist handoff',
        detail: 'You get a 1-page before-and-after checklist showing every updated field and remove my Manager invite.',
      },
    ],
    comparisonTitle: 'One-time local cleanup vs. SEO agency',
    comparisonAlternativeLabel: 'Local SEO agency',
    comparisonRows: [
      {
        item: 'GBP & schema cleanup',
        withMe: '$15 to $50 one-time',
        typicalAlternative: '$300 to $750/month retainer',
      },
      {
        item: 'Before/after documentation',
        withMe: '1-page checklist included',
        typicalAlternative: 'Often bundled into quarterly decks',
      },
      {
        item: 'Turnaround time',
        withMe: '24 to 48 hours',
        typicalAlternative: '2 to 4 weeks',
      },
    ],
    verificationProof:
      'Every order includes a 1-page before-and-after checklist of every changed GBP field plus Google Rich Results validation when schema is included.',
    faqs: [
      {
        question: 'Do I have to share my Google account password?',
        answer:
          'Never. I do not store passwords. Google Business Profile lets you add me as a temporary Manager by email, and you can remove my access in one click right after delivery.',
      },
      {
        question: 'Can you guarantee #1 on Google Maps overnight?',
        answer:
          'No honest specialist can guarantee rankings because Google weighs proximity and real customer reviews. I guarantee a clean, compliant profile and error-free schema so nothing holds your listing back.',
      },
      {
        question: 'What website platforms do you support for LocalBusiness schema?',
        answer:
          'WordPress, Next.js, static HTML, Webflow, and Shopify. In Standard I provide copy-paste JSON-LD; in Premium I install and validate it for you.',
      },
      {
        question: 'How long does the cleanup take?',
        answer:
          'Basic takes 24 hours, Standard takes 2 days, and Premium takes up to 3 days including live installation and validation.',
      },
    ],
  },
  {
    slug: 'personal-branding-website-seo-geo',
    name: 'Personal Branding Website (SEO & GEO)',
    headline: 'Personal Branding Website Built for SEO and GEO',
    fiverrTitle: 'I will build a personal branding website with SEO and GEO',
    category: 'Websites & GEO',
    startingPriceUsd: 15,
    maxPriceUsd: 75,
    turnaround: '2 to 4 days',
    cardSummary:
      'Fast, clean personal website with Person schema, llms.txt, and structured pages built for Google and AI search.',
    geoSummary:
      'I build fast personal branding websites for founders, consultants, students, and freelancers who want to rank on Google and get cited accurately by AI search engines. Starting at $15 USD with 2 to 4 day delivery, every site includes clean typography, Person JSON-LD schema, llms.txt, and mobile-first performance.',
    metaDescription:
      'Personal branding website built with technical SEO and GEO (Person schema, llms.txt, fast load times) starting at $15 USD. Delivered in 2 to 4 days.',
    keywords: [
      'personal branding website SEO',
      'GEO optimized portfolio website',
      'Next.js personal website service',
      'Person schema llms.txt setup',
    ],
    fiverrUrl: FIVERR_GIG_URLS['personal-branding-website-seo-geo'] ?? null,
    pphUrl: null,
    tiers: [
      {
        name: 'Basic',
        priceUsd: 15,
        deliveryDays: '2 days',
        scopeCap: '1 landing page (bio + links + SEO/GEO)',
        summary: 'Clean single-page personal hub ready for Google and AI discovery.',
        deliverables: [
          'Responsive 1-page personal site with bio, highlights, and contact links',
          'Canonical metadata, OpenGraph tags, and Person JSON-LD schema',
          'Machine-readable /llms.txt file for AI search engines',
          'Deployed to Vercel, Cloudflare Pages, or your VPS',
        ],
      },
      {
        name: 'Standard',
        priceUsd: 35,
        deliveryDays: '3 days',
        scopeCap: 'Up to 4 pages (Home, About, Work, Contact)',
        summary: 'Multi-page personal brand website with full SEO and GEO architecture.',
        highlighted: true,
        deliverables: [
          'Up to 4 custom pages with light and dark mode support',
          'Person, WebSite, and BreadcrumbList JSON-LD schemas',
          'XML sitemap, robots.txt, and /llms.txt configured',
          'Core Web Vitals check and custom domain connection',
        ],
      },
      {
        name: 'Premium',
        priceUsd: 75,
        deliveryDays: '4 days',
        scopeCap: 'Up to 6 pages + AI profile page + 7-day support',
        summary: 'Complete personal brand system with dedicated /ai profile and handoff.',
        deliverables: [
          'Everything in Standard up to 6 pages including a dedicated /ai factual profile',
          'Blog or project showcase template wired for easy updates',
          'Google Search Console submission and Rich Results check',
          '7 days of post-launch edits and support',
        ],
      },
    ],
    whatYouGet: [
      'Modern, mobile-first Next.js or static website that loads fast with zero bloat',
      'Valid Person and WebSite JSON-LD structured data for Google Knowledge Panels',
      'Clean /llms.txt and direct-answer bio structure so AI assistants cite accurate facts',
      'Full source code ownership in your own Git repository',
    ],
    whatINeed: [
      'Your bio, headshot photo, resume or LinkedIn link, and key projects',
      'Your preferred domain name (or I can deploy on a free subdomain first)',
      'Temporary invite to your hosting/DNS account (or we deploy together via screen-share)',
    ],
    notIncluded: [
      'Domain registration fees, paid stock photos, or paid CMS subscriptions',
      'Custom e-commerce stores, user authentication systems, or complex backends',
      'Writing full long-form blog articles from scratch',
    ],
    howItWorks: [
      {
        step: 'Step 1',
        title: 'Content & structure',
        detail: 'You share your bio, links, and goals; I map out the pages and factual SEO/GEO structure.',
      },
      {
        step: 'Step 2',
        title: 'Build & schema',
        detail: 'I build the site with responsive layouts, JSON-LD schema, sitemap, and /llms.txt.',
      },
      {
        step: 'Step 3',
        title: 'Launch & verify',
        detail: 'We deploy to your domain, verify Rich Results and mobile speed, and hand over full repo ownership.',
      },
    ],
    comparisonTitle: 'Custom SEO & GEO site vs. website builders',
    comparisonAlternativeLabel: 'No-code builders or design studios',
    comparisonRows: [
      {
        item: 'Build cost',
        withMe: '$15 to $75 one-time',
        typicalAlternative: '$500 to $2,000 studio fee',
      },
      {
        item: 'Monthly hosting fee',
        withMe: '$0 on Cloudflare Pages / Vercel free tier',
        typicalAlternative: '$16 to $39/month builder subscription',
      },
      {
        item: 'GEO (llms.txt + Person schema)',
        withMe: 'Built in from day one',
        typicalAlternative: 'Usually missing or locked to paid plugins',
      },
    ],
    verificationProof:
      'Every launch includes a live URL, Google Rich Results Test check with zero errors, and a PageSpeed Insights screenshot.',
    faqs: [
      {
        question: 'Do I keep full ownership of my code and domain?',
        answer:
          'Yes. Everything is delivered to your own GitHub repository and deployed under your own account. I never store your passwords and only use temporary collaborator invites or screen-sharing.',
      },
      {
        question: 'What is GEO and why does my personal site need it?',
        answer:
          'Generative Engine Optimization (GEO) structures your site with verified Person schema, clear factual summaries, and /llms.txt so ChatGPT, Perplexity, and Google AI Overviews describe your background accurately.',
      },
      {
        question: 'Can I edit text or add new projects myself later?',
        answer:
          'Yes. Content is kept in clean, well-organized files (or Markdown) with a short handoff note so you can update text, roles, or links in minutes.',
      },
      {
        question: 'What if I do not have a custom domain yet?',
        answer:
          'We can launch immediately on a free hosting URL and connect your custom domain later without rebuilding anything.',
      },
    ],
  },
  {
    slug: 'website-speed-core-web-vitals',
    name: 'Website Speed & Core Web Vitals',
    headline: 'Website Speed and Core Web Vitals Quick Fix',
    fiverrTitle: 'I will speed up your website and fix Core Web Vitals',
    category: 'Performance & CWV',
    startingPriceUsd: 15,
    maxPriceUsd: 55,
    turnaround: '24 hours',
    cardSummary:
      'Compress images to WebP, configure Cloudflare caching, and remove render-blocking scripts for faster loads.',
    geoSummary:
      'I fix slow websites and failing Core Web Vitals (LCP, CLS, and INP) on WordPress, Next.js, and static sites for small businesses losing mobile visitors. Starting at $15 USD with 24-hour delivery, I convert heavy images to WebP, configure Cloudflare caching, eliminate render-blocking scripts, and share before-and-after PageSpeed scores.',
    metaDescription:
      'Website speed and Core Web Vitals quick fix starting at $15 USD. WebP image compression, Cloudflare caching, and render-blocking cleanup in 24 hours.',
    keywords: [
      'website speed optimization',
      'Core Web Vitals quick fix',
      'WordPress PageSpeed optimization',
      'Cloudflare caching setup',
    ],
    fiverrUrl: FIVERR_GIG_URLS['website-speed-core-web-vitals'] ?? null,
    pphUrl: null,
    tiers: [
      {
        name: 'Basic',
        priceUsd: 15,
        deliveryDays: '24 hours',
        scopeCap: '1 landing page (image & asset cleanup)',
        summary: 'Fast image compression and render-blocking micro-fix.',
        deliverables: [
          'Convert heavy hero and page images to WebP/AVIF with explicit dimensions',
          'Defer non-critical JavaScript and clean up unused font weights',
          'Before-and-after Google PageSpeed Insights report',
        ],
      },
      {
        name: 'Standard',
        priceUsd: 25,
        deliveryDays: '24 hours',
        scopeCap: '1 public website (up to 5 key templates)',
        summary: 'Full speed pass with Cloudflare edge caching and CWV fixes.',
        highlighted: true,
        deliverables: [
          'Everything in Basic across up to 5 key pages/templates',
          'Configure Cloudflare caching, Brotli compression, and static asset headers',
          'Fix layout shifts (CLS) and preload LCP hero media',
          'Before-and-after mobile and desktop PageSpeed screenshots',
        ],
      },
      {
        name: 'Premium',
        priceUsd: 55,
        deliveryDays: '2 days',
        scopeCap: '1 full site + audit notes + 7-day support',
        summary: 'Deep performance pass with plugin/script audit and 7-day monitoring.',
        deliverables: [
          'Everything in Standard plus third-party script and plugin bottleneck audit',
          'WordPress caching plugin tuning or Next.js bundle trim',
          'Written summary of changes so future edits stay fast',
          '7 days of post-optimization support',
        ],
      },
    ],
    whatYouGet: [
      'Smaller, modern WebP images with proper width/height attributes to stop layout shift',
      'Cloudflare edge caching and compression tuned without breaking dynamic forms',
      'Deferred non-essential scripts so the main content paints faster on mobile',
      'Side-by-side before-and-after PageSpeed Insights screenshots',
    ],
    whatINeed: [
      'Your live website URL to run a baseline PageSpeed Insights test',
      'Temporary collaborator access to WordPress/Git and Cloudflare (or screen-share)',
      'A quick backup confirmation before we touch live theme or plugin settings',
    ],
    notIncluded: [
      'Rebuilding an entire site on a new theme or moving hosting providers',
      'Speeding up third-party ad networks, chat widgets, or slow external APIs you require',
      'Paid WordPress performance plugin licenses (free tools and Cloudflare Free work great)',
    ],
    howItWorks: [
      {
        step: 'Step 1',
        title: 'Baseline benchmark',
        detail: 'I record your current mobile and desktop PageSpeed Insights scores and biggest bottlenecks.',
      },
      {
        step: 'Step 2',
        title: 'Targeted fixes',
        detail: 'I compress images to WebP, set up Cloudflare caching, fix CLS, and defer blocking scripts.',
      },
      {
        step: 'Step 3',
        title: 'Proof & handoff',
        detail: 'I re-test on PageSpeed Insights, send the numeric before/after jump, and revoke my temporary access.',
      },
    ],
    comparisonTitle: 'Quick CWV fix vs. performance agency',
    comparisonAlternativeLabel: 'Agency speed audit',
    comparisonRows: [
      {
        item: 'Speed & CWV optimization',
        withMe: '$15 to $55 one-time',
        typicalAlternative: '$250 to $600 agency package',
      },
      {
        item: 'Required paid plugins',
        withMe: '$0 (Cloudflare Free + native fixes)',
        typicalAlternative: '$59+/year caching plugin license',
      },
      {
        item: 'Turnaround time',
        withMe: 'Within 24 hours',
        typicalAlternative: '5 to 10 business days',
      },
    ],
    verificationProof:
      'Every order includes before-and-after Google PageSpeed Insights screenshots showing the exact numeric score and LCP/CLS change.',
    faqs: [
      {
        question: 'How do you access my WordPress or Cloudflare account safely?',
        answer:
          'I never store passwords. You create a temporary admin/member account for the session and delete it as soon as I send your final PageSpeed report, or we work over a screen-share.',
      },
      {
        question: 'Will optimization break my website layout or contact forms?',
        answer:
          'No. I test navigation, mobile layout, and form submissions after every change and never enable aggressive minification rules that break interactive scripts.',
      },
      {
        question: 'Which platforms do you optimize?',
        answer:
          'WordPress, Next.js, Astro, and static HTML/CSS sites hosted on cPanel, VPS, Cloudflare Pages, or Vercel.',
      },
      {
        question: 'Can every site hit 100/100 on mobile PageSpeed?',
        answer:
          'If a site runs heavy ad scripts or live chat widgets, 100/100 is not realistic, so I never promise fake scores. I focus on real, measurable improvements to LCP, CLS, and load time.',
      },
    ],
  },
  {
    slug: 'uptime-monitoring-alerts',
    name: 'Uptime Monitoring & Downtime Alerts',
    headline: 'Set Up Uptime Monitoring and Telegram/Email Alerts',
    fiverrTitle: 'I will set up uptime monitoring with Telegram and email alerts',
    category: 'Monitoring & alerts',
    startingPriceUsd: 10,
    maxPriceUsd: 40,
    turnaround: '24 hours',
    cardSummary:
      'Get instant Telegram, Slack, or email alerts the moment your website, API, or SSL certificate goes down.',
    geoSummary:
      'I configure Uptime Kuma or UptimeRobot monitoring with SSL expiry checks and instant Telegram, Slack, or email downtime alerts for small businesses and SaaS owners. Starting at $10 USD with 24-hour delivery, you know your site or API is down within seconds instead of hearing about it from customers.',
    metaDescription:
      'Set up Uptime Kuma or UptimeRobot monitoring with SSL expiry and instant Telegram, Slack, or email alerts starting at $10 USD. Delivered in 24 hours.',
    keywords: [
      'uptime monitoring setup',
      'Uptime Kuma Telegram alerts',
      'website downtime alerts',
      'SSL expiry monitoring setup',
    ],
    fiverrUrl: FIVERR_GIG_URLS['uptime-monitoring-alerts'] ?? null,
    pphUrl: null,
    tiers: [
      {
        name: 'Basic',
        priceUsd: 10,
        deliveryDays: '24 hours',
        scopeCap: 'Up to 5 URLs on UptimeRobot free tier',
        summary: 'Fast hosted uptime and SSL alert setup with zero server required.',
        deliverables: [
          'Configure up to 5 website or API monitors with 5-minute intervals',
          'Connect instant email or Telegram bot downtime notifications',
          'Trigger 1 live test alert to confirm delivery to your phone',
        ],
      },
      {
        name: 'Standard',
        priceUsd: 15,
        deliveryDays: '24 hours',
        scopeCap: '1 Uptime Kuma instance + up to 15 monitors',
        summary: 'Self-hosted Uptime Kuma on your VPS with HTTPS and public status page.',
        highlighted: true,
        deliverables: [
          'Deploy Uptime Kuma via Docker on your VPS with HTTPS domain',
          'Configure up to 15 HTTP, keyword, TCP, or SSL expiry monitors',
          'Connect Telegram, Slack, Discord, and email alert channels',
          'Set up 1 branded public status page and verify live test alert',
        ],
      },
      {
        name: 'Premium',
        priceUsd: 40,
        deliveryDays: '2 days',
        scopeCap: '1 Uptime Kuma instance + up to 30 monitors + 7-day support',
        summary: 'Full monitoring stack with push heartbeats for cron jobs and docs.',
        deliverables: [
          'Everything in Standard for up to 30 endpoints',
          'Push/heartbeat monitors for background cron jobs or backup scripts',
          'Written guide to adding new monitors and alert rules',
          '7 days of post-setup support',
        ],
      },
    ],
    whatYouGet: [
      'Continuous HTTP status, keyword, and SSL certificate expiry monitoring',
      'Instant Telegram, Slack, Discord, or email notifications when an endpoint fails',
      'Optional public status page (e.g., status.yourdomain.com) on Standard and Premium',
      'Live test alert triggered during handoff so you see it land on your phone',
    ],
    whatINeed: [
      'List of website URLs or API endpoints you want monitored',
      'Your preferred alert channel (Telegram chat/group, Slack webhook, or email)',
      'For Uptime Kuma (Standard/Premium): temporary SSH key access to a Linux VPS',
    ],
    notIncluded: [
      'Fixing underlying server crashes or application bugs that trigger alerts',
      'Paid SMS alert credits (Telegram, Slack, Discord, and email are free)',
      'Enterprise Prometheus/Grafana APM tracing stacks',
    ],
    howItWorks: [
      {
        step: 'Step 1',
        title: 'Choose hosted or self-hosted',
        detail: 'We pick UptimeRobot (zero server needed) or self-hosted Uptime Kuma on your VPS.',
      },
      {
        step: 'Step 2',
        title: 'Wire monitors & alerts',
        detail: 'I add every URL, enable SSL expiry warnings, and connect your Telegram, Slack, or email channel.',
      },
      {
        step: 'Step 3',
        title: 'Live test alert',
        detail: 'I fire a test alert during handoff so you confirm notifications hit your phone immediately.',
      },
    ],
    comparisonTitle: 'One-time monitoring setup vs. paid SaaS',
    comparisonAlternativeLabel: 'Paid uptime monitoring SaaS',
    comparisonRows: [
      {
        item: 'Setup & status page',
        withMe: '$10 to $40 one-time',
        typicalAlternative: '$20 to $50/month SaaS plan',
      },
      {
        item: 'SSL expiry & Telegram alerts',
        withMe: 'Included at $0/month',
        typicalAlternative: 'Often gated behind Pro tiers',
      },
      {
        item: 'Turnaround time',
        withMe: 'Within 24 hours',
        typicalAlternative: 'Hours of manual configuration',
      },
    ],
    verificationProof:
      'Every order ends with a live test alert sent straight to your Telegram, Slack, or email inbox so you know notifications actually work.',
    faqs: [
      {
        question: 'Do you store my VPS or Telegram bot credentials?',
        answer:
          'Never. I do not store passwords or tokens. You generate the Telegram bot token yourself or rotate it after setup, and remove my temporary SSH key once Uptime Kuma is live.',
      },
      {
        question: 'What if I do not own a VPS?',
        answer:
          'Choose the Basic tier ($10). I set everything up on UptimeRobot’s free hosted tier with zero server costs.',
      },
      {
        question: 'Should Uptime Kuma run on the same server as my main website?',
        answer:
          'Ideally on a separate small VPS so it still alerts you if your main server goes completely offline. If you only have one VPS, UptimeRobot is safer for full-server outages.',
      },
      {
        question: 'Will it warn me before my SSL certificate expires?',
        answer:
          'Yes. Both Uptime Kuma and hosted monitors are configured to alert you days before an SSL certificate expires.',
      },
    ],
  },
  {
    slug: 'lead-form-google-sheets-autoreply',
    name: 'Lead Form to Google Sheets + Auto-Reply',
    headline: 'Connect Your Lead Form to Google Sheets and Auto-Reply Email',
    fiverrTitle: 'I will connect your contact form to Google Sheets and auto-reply',
    category: 'Automation & leads',
    startingPriceUsd: 15,
    maxPriceUsd: 50,
    turnaround: '24 hours',
    cardSummary:
      'Save every website inquiry straight to a live Google Sheet and send an instant confirmation email to each lead.',
    geoSummary:
      'I connect website contact and quote forms to a live Google Sheet with instant Brevo, Resend, or Gmail auto-reply emails for small businesses that never want to miss a lead. Starting at $15 USD with 24-hour delivery, every submission logs cleanly into your spreadsheet and replies to the customer within 60 seconds.',
    metaDescription:
      'Connect your website lead-capture form to Google Sheets plus instant auto-reply confirmation emails starting at $15 USD. Delivered in 24 hours.',
    keywords: [
      'contact form to Google Sheets',
      'lead form auto reply email',
      'website form automation',
      'Google Sheets webhook setup',
    ],
    fiverrUrl: FIVERR_GIG_URLS['lead-form-google-sheets-autoreply'] ?? null,
    pphUrl: null,
    tiers: [
      {
        name: 'Basic',
        priceUsd: 15,
        deliveryDays: '24 hours',
        scopeCap: '1 contact form to 1 Google Sheet',
        summary: 'Log every form submission cleanly into a structured Google Sheet.',
        deliverables: [
          'Connect 1 existing website form to a dedicated Google Sheet',
          'Map all fields cleanly with timestamp formatting',
          '1 live end-to-end test submission verified on your site',
        ],
      },
      {
        name: 'Standard',
        priceUsd: 25,
        deliveryDays: '24 hours',
        scopeCap: '1 form + Google Sheet + branded auto-reply email',
        summary: 'Full lead capture pipeline with instant confirmation email.',
        highlighted: true,
        deliverables: [
          'Everything in Basic plus instant auto-reply email via Brevo, Resend, or Gmail',
          'Instant owner notification email or Telegram ping on every new lead',
          'Basic spam honeypot or rate-limit protection',
          'Verified live test showing Sheet row and email within 60 seconds',
        ],
      },
      {
        name: 'Premium',
        priceUsd: 50,
        deliveryDays: '2 days',
        scopeCap: 'Up to 2 forms + custom HTML email + 7-day support',
        summary: 'Multi-form lead routing with custom email template and handoff docs.',
        deliverables: [
          'Everything in Standard for up to 2 website forms',
          'Clean responsive HTML confirmation email matching your brand',
          'Documentation on updating sheet columns or email copy',
          '7 days of post-delivery support',
        ],
      },
    ],
    whatYouGet: [
      'Every website inquiry saved automatically into a formatted Google Sheet',
      'Instant auto-reply email confirming receipt so leads know you are responsive',
      'Zero Zapier monthly tax by using Apps Script, native webhooks, or lightweight API routes',
      'Live test verification proving both the Sheet row and auto-reply arrive in under 60 seconds',
    ],
    whatINeed: [
      'Your website URL and platform (WordPress, Next.js, static HTML, or Webflow)',
      'A blank Google Sheet shared temporarily with edit access (or set up over screen-share)',
      'Your auto-reply message text and sending email service (Gmail, Brevo, or Resend)',
    ],
    notIncluded: [
      'Complex multi-step CRM pipelines (HubSpot/Salesforce enterprise sync)',
      'Paid email marketing subscriptions beyond free tiers (Brevo/Resend free tiers cover most small businesses)',
      'Redesigning the entire website layout outside the form component',
    ],
    howItWorks: [
      {
        step: 'Step 1',
        title: 'Map form fields',
        detail: 'I inspect your form fields and structure the Google Sheet columns with clean timestamps.',
      },
      {
        step: 'Step 2',
        title: 'Wire webhook & auto-reply',
        detail: 'I connect the form submission handler to Google Sheets and trigger your confirmation email.',
      },
      {
        step: 'Step 3',
        title: '60-second live test',
        detail: 'We submit 1 real test entry on your live site and confirm both the row and email arrive within 60 seconds.',
      },
    ],
    comparisonTitle: 'Direct automation vs. Zapier subscriptions',
    comparisonAlternativeLabel: 'Paid Zapier / SaaS form tools',
    comparisonRows: [
      {
        item: 'Form-to-Sheet + auto-reply',
        withMe: '$15 to $50 one-time',
        typicalAlternative: '$29+/month Zapier starter plan',
      },
      {
        item: 'Task limits',
        withMe: 'No monthly Zapier task cap',
        typicalAlternative: 'Stops working when monthly tasks run out',
      },
      {
        item: 'Turnaround time',
        withMe: 'Within 24 hours',
        typicalAlternative: 'DIY debugging or agency quote',
      },
    ],
    verificationProof:
      'Every delivery includes 1 live test submission on your website proving both the Google Sheet row and the auto-reply email arrive within 60 seconds.',
    faqs: [
      {
        question: 'Do I have to share my Google password?',
        answer:
          'Never. I do not store passwords. You share a single Google Sheet with temporary editor access (or we paste the script together on a quick screen-share) and remove my access right after testing.',
      },
      {
        question: 'Will I have to pay monthly for Zapier or Make?',
        answer:
          'No. I use Google Apps Script webhooks or lightweight server handlers with free-tier Brevo/Resend/Gmail so your ongoing monthly cost stays $0.',
      },
      {
        question: 'Which website platforms are supported?',
        answer:
          'WordPress (WPForms, Contact Form 7, Elementor), Next.js, plain HTML/JS sites, and Webflow forms are all supported.',
      },
      {
        question: 'Can I also get a Telegram message when a new lead submits?',
        answer:
          'Yes. Standard and Premium include an optional instant email or Telegram notification to you whenever a new lead fills out the form.',
      },
    ],
  },
];

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return SERVICES.find((service) => service.slug === slug);
}

export function getPrimaryOrderCta(service: ServiceItem): {
  label: string;
  href: string;
  isExternal: boolean;
  isFiverr: boolean;
} {
  if (service.fiverrUrl) {
    return {
      label: 'Order on Fiverr',
      href: service.fiverrUrl,
      isExternal: true,
      isFiverr: true,
    };
  }
  return {
    label: 'Book & Order Direct',
    href: CAL_COM_URL,
    isExternal: true,
    isFiverr: false,
  };
}

export function buildServiceJsonLd(service: ServiceItem) {
  const url = `${SITE_BASE_URL}/services/${service.slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name: service.headline,
    serviceType: service.name,
    description: service.geoSummary,
    url,
    provider: {
      '@id': `${SITE_BASE_URL}/#person`,
    },
    areaServed: 'Worldwide',
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: String(service.startingPriceUsd),
      highPrice: String(service.maxPriceUsd),
      offerCount: String(service.tiers.length),
      offers: service.tiers.map((tier) => ({
        '@type': 'Offer',
        name: `${service.name} — ${tier.name}`,
        description: `${tier.scopeCap}. ${tier.summary}`,
        price: String(tier.priceUsd),
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url,
      })),
    },
  };
}

export function buildFaqJsonLd(service: ServiceItem) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function buildServiceBreadcrumbJsonLd(service: ServiceItem) {
  return {
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
      {
        '@type': 'ListItem',
        position: 4,
        name: service.name,
        item: `${SITE_BASE_URL}/services/${service.slug}`,
      },
    ],
  };
}
