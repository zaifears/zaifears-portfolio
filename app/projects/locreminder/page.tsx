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
  Smartphone,
  RefreshCw,
  CalendarOff,
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
    title: 'Search for where you are going',
    description:
      'Type a place name, paste coordinates, or drag the map under the pin. Works online or with cached offline maps. No account needed.',
  },
  {
    step: '2',
    icon: <Compass className="w-5 h-5 text-blue-600 dark:text-blue-400" aria-hidden="true" />,
    title: 'Choose wake radius',
    description:
      'Anywhere from 100 m to 3 km out. A bigger radius gives you more time to gather your things before arrival.',
  },
  {
    step: '3',
    icon: <Bell className="w-5 h-5 text-blue-600 dark:text-blue-400" aria-hidden="true" />,
    title: 'Put your phone away',
    description:
      'When you arrive, the alarm rings — looping sound that plays even on silent, vibration, and a full-screen alert over your lock screen.',
  },
];

const useCases = [
  {
    emoji: '😴',
    title: 'Long bus or train rides',
    text: 'Actually sleep and rest instead of half-watching for your stop the entire journey.',
  },
  {
    emoji: '🌏',
    title: 'An unfamiliar city',
    text: 'You do not know what your stop looks like, so let the phone know for you.',
  },
  {
    emoji: '📚',
    title: 'Commuters',
    text: 'Read, work, or listen to something without keeping one anxious eye on the route.',
  },
  {
    emoji: '🚗',
    title: 'Passengers on road trips',
    text: 'Get woken before the highway turn-off instead of 20 km past it.',
  },
  {
    emoji: '📦',
    title: 'Pickups and errands',
    text: 'A nudge when you are near the shop, the post office, or a friend’s place.',
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

const architectureLayers = [
  {
    icon: <Compass className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />,
    title: 'Foreground Location Watcher',
    text: 'Holds an Android foreground service to stay out of the idle state that defers background tasks. Ignores imprecise fixes so coarse cell tower triangulation cannot ring the alarm kilometres early.',
  },
  {
    icon: <BatteryCharging className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />,
    title: 'Adaptive Polling Interval',
    text: 'Derived continuously rather than tabulated: interval is calculated from remaining distance and travel speed (10s on final approach, 15 minutes when 200 km out). On Android 12+, requests cheaper location tiers when far away.',
  },
  {
    icon: <CalendarOff className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />,
    title: 'Zero-Overhead Days Off',
    text: 'On days when armed alarms are set for other days of the week, the location watcher requests zero GPS fixes, leaving the battery untouched until your active scheduled days.',
  },
  {
    icon: <Bell className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />,
    title: 'Native Kotlin Alarm Service',
    text: 'Loops USAGE_ALARM audio, vibration, wake lock, and full-screen activity over the lock screen. Operates autonomously without needing the Flutter UI engine in memory and auto-stops after 10 minutes.',
  },
  {
    icon: <RefreshCw className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />,
    title: 'Watchdog & Boot Recovery',
    text: 'An inexact allow-while-idle alarm restarts the watcher if aggressive vendor power managers kill it, while a boot receiver restores all alarms after device restarts or app updates.',
  },
  {
    icon: <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />,
    title: 'Offline Map Caching & Search',
    text: 'Tiles are cached locally on device for a month, streets around an alarm are saved the moment you set it, and coordinates can be typed directly into search with zero internet connection.',
  },
];

const securityTrustPoints = [
  {
    icon: <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />,
    title: 'Scanned by VirusTotal',
    text: 'Every release gets checked by around 70 antivirus engines before it is published, ensuring clean, verifiable builds.',
  },
  {
    icon: <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />,
    title: 'Signed and verifiable checksums',
    text: 'Each release carries LocReminder’s cryptographic signature with published SHA-256 hashes so you can verify download integrity.',
  },
  {
    icon: <Github className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />,
    title: 'Open source, all of it (MIT)',
    text: 'Every line is public and MIT licensed. Nothing is hidden, and you can build the app yourself directly from source.',
  },
  {
    icon: <Lock className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />,
    title: 'No tracking, no accounts, no server',
    text: 'No analytics, no ads, no sign-up. There is nowhere for your locations to go, so they never leave your phone.',
  },
  {
    icon: <Smartphone className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />,
    title: 'No Google Play Services required',
    text: 'Runs natively on de-Googled devices, LineageOS, Huawei, and Honor phones. Map data comes from OpenStreetMap.',
  },
];

const badges = [
  'Android 6.0+',
  '100% FOSS · MIT',
  'No ads · No tracking',
  '70+ Antivirus Scanned',
  'OpenStreetMap Offline',
];

const techStack = [
  'Flutter 3 · Dart 3',
  'Native Kotlin Engine',
  'Material 3',
  'OpenStreetMap (flutter_map)',
  'Nominatim Geocoding',
  'Platform LocationManager',
  'SharedPreferences',
  'Gradle 9 · R8 Shrinking',
  'GitHub Actions CI/CD',
];

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
            </div>
            <p className="text-lg text-blue-600 dark:text-blue-400 font-semibold mb-2">
              Reminds you at the right place
            </p>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 max-w-2xl leading-relaxed">
              Sleep on the bus. Remember the errand. Drop a pin on your destination and put your phone away — it goes off when you arrive.
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
            <span>Download APK (Universal)</span>
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
                Do this before your first real journey
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Open <strong>Menu &rarr; Alarm reliability</strong> and tap <strong>Run alarm test</strong>. It rings the alarm after 15 seconds, so you can lock your phone and confirm it gets through. Much better to find out at home than on a train!
              </p>
            </div>
          </div>
        </section>

        {/* Why it exists / Use Cases */}
        <section className="mb-14">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Why it exists
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
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
              You know roughly where you are going, but not exactly when you will get there. Traffic, delays and unfamiliar routes make arrival times impossible to predict, so a normal clock alarm is useless. Instead, passengers spend journeys constantly glancing out the window, unable to properly rest or focus.
            </p>
            <p>
              LocReminder fixes that: drop a pin on your destination, choose how close you want to get, and put your phone away. When you arrive, it rings a real alarm with looping audio, vibration, and a full-screen alert over your lock screen.
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

        {/* Architecture & How it works under the hood */}
        <section className="mb-14">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            How it works under the hood
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {architectureLayers.map((layer) => (
              <div
                key={layer.title}
                className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-5"
              >
                <div className="flex items-center gap-2.5 mb-2">
                  {layer.icon}
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                    {layer.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {layer.text}
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
            The detection and alarm mechanisms are powered by native Kotlin holding an Android foreground service with wake-lock support. This guarantees that when arrival is detected, the alarm rings even if the Flutter UI engine is not running in memory. Flutter powers the responsive Material 3 map, location search, and user configuration.
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
