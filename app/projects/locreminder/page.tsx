import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  Download,
  Github,
  ShieldCheck,
  Lock,
  MapPin,
  BatteryCharging,
  Moon,
  FileText,
  Search,
  Bell,
  Compass,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Smartphone,
  HelpCircle,
} from 'lucide-react';
import ScreenshotsGallery from './ScreenshotsGallery';

const baseUrl = 'https://shahoriar.bd';
const apkUrl = 'https://github.com/zaifears/locreminder/releases/latest/download/app-release.apk';
const releasesUrl = 'https://github.com/zaifears/locreminder/releases/latest';
const repoUrl = 'https://github.com/zaifears/locreminder';
const uptodownUrl = 'https://locreminder.en.uptodown.com/android';
const fdroidUrl = 'https://gitlab.com/fdroid/fdroiddata/-/merge_requests/46299';

export const metadata: Metadata = {
  title: 'LocReminder — Location-Based Alarm for Android',
  description:
    'LocReminder reminds you at the right place. Sleep on the bus, remember the errand, and wake up when you arrive. Free, open-source, no ads, no tracking.',
  alternates: {
    canonical: `${baseUrl}/projects/locreminder`,
  },
  openGraph: {
    type: 'website',
    url: `${baseUrl}/projects/locreminder`,
    title: 'LocReminder — Location-Based Alarm for Android',
    description:
      'LocReminder is a location-based alarm for Android, which helps you wake up at the right place. 100% Free & Open Source.',
    images: [
      {
        url: '/projects/locreminder/icon.png',
        width: 512,
        height: 512,
        alt: 'LocReminder app icon',
      },
    ],
  },
};

const howToSteps = [
  {
    step: '1',
    icon: <Search className="w-5 h-5 text-blue-600 dark:text-blue-400" aria-hidden="true" />,
    title: 'Search your destination',
    description:
      'Type a place name, paste GPS coordinates, or drag the map under the pin. Works online or with cached offline maps. No account required.',
  },
  {
    step: '2',
    icon: <Compass className="w-5 h-5 text-blue-600 dark:text-blue-400" aria-hidden="true" />,
    title: 'Choose wake radius',
    description:
      'Set how early you want to be alerted — anywhere from 100 m to 3 km out — giving you ample time to gather your belongings.',
  },
  {
    step: '3',
    icon: <Bell className="w-5 h-5 text-blue-600 dark:text-blue-400" aria-hidden="true" />,
    title: 'Put your phone away & rest',
    description:
      'Sleep on the bus or train. When you arrive, LocReminder rings a real looping alarm with vibration and a full-screen alert over your lock screen.',
  },
];

const useCases = [
  {
    emoji: '😴',
    title: 'Long bus or train rides',
    text: 'Actually sleep and recover instead of spending the whole journey half-watching for your stop.',
  },
  {
    emoji: '🌏',
    title: 'Unfamiliar cities & transit',
    text: "When you don't know what your landmark or bus stop looks like, let your phone alert you automatically.",
  },
  {
    emoji: '📚',
    title: 'Commuters & readers',
    text: 'Read, work, or listen to podcasts without constantly glancing out the window at traffic.',
  },
];

const features = [
  {
    icon: <Bell className="w-5 h-5" aria-hidden="true" />,
    title: 'A real alarm, not a notification',
    text: 'Loops on the alarm audio stream so it rings even when your phone is on silent, with vibration and a full-screen alert over your lock screen.',
  },
  {
    icon: <MapPin className="w-5 h-5" aria-hidden="true" />,
    title: 'OpenStreetMap with offline caching',
    text: 'No Google Maps API key, no Google account, and zero tracking. Map tiles stay cached for 30 days and coordinate search works with zero signal.',
  },
  {
    icon: <BatteryCharging className="w-5 h-5" aria-hidden="true" />,
    title: 'Dynamic, battery-aware polling',
    text: 'Polling interval dynamically calculates based on travel speed and distance remaining. Background checks never run on days with no active alarms.',
  },
  {
    icon: <Moon className="w-5 h-5" aria-hidden="true" />,
    title: 'Material 3 light & dark themes',
    text: 'Polished Material 3 design throughout. Map tiles render with dark-mode contrast at night to avoid blinding glare.',
  },
  {
    icon: <Lock className="w-5 h-5" aria-hidden="true" />,
    title: 'No accounts, zero telemetry',
    text: 'No analytics, no ads, no cloud servers. Your destinations, coordinates, and alarms remain private on your device.',
  },
  {
    icon: <ShieldCheck className="w-5 h-5" aria-hidden="true" />,
    title: 'Signed, verified & scanned',
    text: 'Every release is scanned by ~70 antivirus engines on VirusTotal and cryptographically signed with published SHA-256 checksums.',
  },
];

const securityTrustPoints = [
  {
    icon: <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />,
    title: 'Scanned by VirusTotal',
    text: 'Every APK release is checked by around 70 commercial antivirus engines before publication.',
  },
  {
    icon: <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />,
    title: 'Signed and verifiable checksums',
    text: 'Each release carries LocReminder’s cryptographic signature with public SHA-256 hashes to verify file integrity.',
  },
  {
    icon: <Github className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />,
    title: '100% Free and Open Source (FOSS)',
    text: 'Licensed under MIT. Every line of Dart and Kotlin is publicly inspectable and reproducible.',
  },
  {
    icon: <Lock className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />,
    title: 'No tracking, no accounts, no server',
    text: 'No signup, no advertising SDKs, and nowhere for location data to go — it never leaves your phone.',
  },
  {
    icon: <Smartphone className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />,
    title: 'Works without Google Play Services',
    text: 'Runs natively on de-Googled devices, LineageOS, Huawei, and Honor phones using OpenStreetMap.',
  },
];

const badges = [
  'Latest: v1.9.6',
  'Android 6.0+',
  '100% FOSS · MIT',
  'No ads · No tracking',
  '70+ Antivirus Scanned',
  'OpenStreetMap Offline',
];

const techStack = ['Flutter 3.x', 'Dart', 'Kotlin 2.0', 'OpenStreetMap', 'Foreground Service', 'Gradle', 'GitHub Actions'];

export default function LocReminderPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'LocReminder',
            url: `${baseUrl}/projects/locreminder`,
            applicationCategory: 'TravelApplication',
            operatingSystem: 'Android 6.0+',
            softwareVersion: '1.9.6',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            description:
              'LocReminder is a location-based alarm for Android, which helps you wake up at the right place.',
            author: {
              '@type': 'Person',
              '@id': `${baseUrl}/#person`,
              name: 'Md Al Shahoriar Hossain',
              url: baseUrl,
            },
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
              { '@type': 'ListItem', position: 2, name: 'Projects', item: `${baseUrl}/projects` },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'LocReminder',
                item: `${baseUrl}/projects/locreminder`,
              },
            ],
          }),
        }}
      />

      {/* Subtle ambient background blob */}
      <div className="fixed inset-0 md:left-64 z-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/20 dark:bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob will-change-transform" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000 will-change-transform" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8 md:py-12">
        <nav className="mb-8">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
            <span>Back to Projects</span>
          </Link>
        </nav>

        {/* Hero */}
        <header className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left mb-8">
          <div className="w-24 h-24 shrink-0 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm bg-gray-100 dark:bg-gray-900">
            <Image
              src="/projects/locreminder/icon.png"
              alt="LocReminder app icon"
              width={96}
              height={96}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <div>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                LocReminder
              </h1>
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/50">
                v1.9.6
              </span>
            </div>
            <p className="text-lg text-blue-600 dark:text-blue-400 font-semibold mb-2">
              Reminds you at the right place
            </p>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 max-w-2xl leading-relaxed">
              Sleep on the bus. Remember the errand. It goes off when you arrive.
            </p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-2">
              {badges.map((b) => (
                <span
                  key={b}
                  className="text-xs font-medium bg-gray-100 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/60 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
        </header>

        {/* Download & Actions Bar */}
        <div className="flex flex-wrap items-center gap-3 mb-12">
          <a
            href={apkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-md shadow-blue-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <Download className="w-4 h-4" aria-hidden="true" />
            <span>Download APK (53 MB)</span>
            <span className="sr-only">(opens in new tab)</span>
          </a>

          <a
            href={releasesUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 text-sm"
          >
            <span>All Builds (arm64 16MB)</span>
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="sr-only">(opens in new tab)</span>
          </a>

          <a
            href={uptodownUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 text-sm"
          >
            <span>Uptodown</span>
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="sr-only">(opens in new tab)</span>
          </a>

          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 text-sm"
          >
            <Github className="w-4 h-4" aria-hidden="true" />
            <span>Source Code</span>
            <span className="sr-only">(opens in new tab)</span>
          </a>

          <Link
            href="/projects/locreminder/policy"
            className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 text-sm"
          >
            <FileText className="w-4 h-4" aria-hidden="true" />
            <span>Privacy Policy</span>
          </Link>
        </div>

        {/* Screenshots Section */}
        <section className="mb-14">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              App Screenshots
            </h2>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Swipe or scroll to preview
            </span>
          </div>
          <ScreenshotsGallery />
        </section>

        {/* How to use */}
        <section className="mb-14">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            How to use it
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {howToSteps.map((s) => (
              <div
                key={s.step}
                className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                      {s.step}
                    </span>
                    {s.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{s.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {s.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* First Journey Reliability Callout */}
          <div className="mt-5 p-4 sm:p-5 rounded-xl bg-blue-50/80 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 text-sm leading-relaxed flex items-start gap-3.5">
            <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="font-semibold text-gray-900 dark:text-white mb-1">
                Tip before your first journey
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Open <strong>Menu &rarr; Alarm reliability</strong> and tap <strong>Run alarm test</strong>. It rings the alarm after 15 seconds so you can lock your screen and confirm audio override gets through. Much better to verify at home than on a train!
              </p>
            </div>
          </div>
        </section>

        {/* Why it exists / Use Cases */}
        <section className="mb-14">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Why it exists
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {useCases.map((u) => (
              <div
                key={u.title}
                className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-5"
              >
                <div className="text-2xl mb-2">{u.emoji}</div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1 text-sm sm:text-base">
                  {u.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {u.text}
                </p>
              </div>
            ))}
          </div>
          <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-3 text-sm sm:text-base">
            <p>
              You know roughly where you are going, but not exactly when you will get there. In congested transit systems like Dhaka, traffic jams and delays make arrival times unpredictable, rendering standard clock alarms useless.
            </p>
            <p>
              LocReminder flips the alarm paradigm: you drop a pin on your destination, set your wake radius, and put your phone away. When you arrive, it rings a real looping alarm with vibration and a full-screen alert over your lock screen.
            </p>
          </div>
        </section>

        {/* Features / What it does */}
        <section className="mb-14">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            What it does
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-5"
              >
                <div className="flex items-center gap-2.5 text-blue-600 dark:text-blue-400 mb-2">
                  {f.icon}
                  <h3 className="font-semibold text-gray-900 dark:text-white">{f.title}</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {f.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Safe to Install / Trust Highlights */}
        <section className="mb-14">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Safe to install
          </h2>
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 divide-y divide-gray-100 dark:divide-gray-800/80">
            {securityTrustPoints.map((item) => (
              <div key={item.title} className="p-4 sm:p-5 flex items-start gap-3.5">
                {item.icon}
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-0.5 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* What's New in v1.9.6 */}
        <section className="mb-14">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            What&apos;s new in v1.9.6
          </h2>
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-6 text-sm text-gray-700 dark:text-gray-300 leading-relaxed space-y-3">
            <p>
              <strong>Illustrated Onboarding:</strong> Introduces an illustrated welcome guide explaining how LocReminder works on first launch.
            </p>
            <p>
              <strong>Hardened Map Engine:</strong> Eliminates map CDN rate limits during rapid zooming with debounced tile requests, faster offline tile recovery, and refined landscape search layouts.
            </p>
            <p>
              <strong>TalkBack Accessibility:</strong> Adds comprehensive screen reader support for all map controls, virtualizes the alarm destination list, and improves touch targets.
            </p>
          </div>
        </section>

        {/* Tech stack */}
        <section className="mb-14">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Built with
          </h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {techStack.map((t) => (
              <span
                key={t}
                className="text-xs sm:text-sm font-medium bg-gray-100 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/60 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-lg"
              >
                {t}
              </span>
            ))}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            The alarm itself is native Kotlin running as a foreground service with wake-lock support, ensuring it reliably triggers even when the Flutter UI engine is not running in memory. Flutter powers the responsive map, search autocomplete, and settings views.
          </p>
        </section>

        {/* Footer note */}
        <footer className="border-t border-gray-200 dark:border-gray-800 pt-8 text-sm text-gray-500 dark:text-gray-400">
          <p className="leading-relaxed">
            Available on{' '}
            <a
              href={releasesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              GitHub Releases
            </a>
            , with an{' '}
            <a
              href={fdroidUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              F-Droid submission
            </a>{' '}
            in progress. Found a bug or want to suggest a feature?{' '}
            <a
              href={`${repoUrl}/issues`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Report an issue
            </a>{' '}
            or read the{' '}
            <Link
              href="/projects/locreminder/policy"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              privacy policy
            </Link>
            .
          </p>
        </footer>
      </div>
    </div>
  );
}
