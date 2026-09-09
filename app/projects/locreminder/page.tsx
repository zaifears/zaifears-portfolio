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
} from 'lucide-react';

const baseUrl = 'https://shahoriar.bd';
const apkUrl = 'https://github.com/zaifears/locreminder/releases/latest';
const repoUrl = 'https://github.com/zaifears/locreminder';
const fdroidUrl = 'https://gitlab.com/fdroid/fdroiddata/-/merge_requests/46299';

export const metadata: Metadata = {
  title: 'LocReminder',
  description:
    'LocReminder is a location-based alarm for Android, which helps you wake up at the right place. Built with Flutter and Kotlin, 100% free and open-source, no accounts, no tracking, no server.',
  alternates: {
    canonical: `${baseUrl}/projects/locreminder`,
  },
  openGraph: {
    type: 'website',
    url: `${baseUrl}/projects/locreminder`,
    title: 'LocReminder — Location-Based Alarm for Android',
    description:
      'LocReminder is a location-based alarm for Android, which helps you wake up at the right place.',
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
    icon: <Search className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
    title: 'Search your destination',
    description:
      'Type a place name, paste GPS coordinates, or drag the map under the pin. Works online or with cached offline maps.',
  },
  {
    step: '2',
    icon: <Compass className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
    title: 'Choose wake radius',
    description:
      'Set how early you want to be alerted — anywhere from 100 m to 3 km out — giving you ample time to gather your belongings.',
  },
  {
    step: '3',
    icon: <Bell className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
    title: 'Put your phone away & rest',
    description:
      'Sleep on the bus or train. When you arrive, LocReminder rings a real looping alarm with vibration and a full-screen alert over your lock screen.',
  },
];

const features: { icon: React.ReactNode; title: string; text: string }[] = [
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    title: 'A real alarm, not a notification',
    text: 'Loops on the alarm audio stream so it rings even when your phone is on silent, with a full-screen alert over your lock screen.',
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    title: 'Runs on OpenStreetMap & works offline',
    text: 'No Google Maps key, no Google account, and no tracking. Map tiles cache for 30 days and coordinate search works with zero internet signal.',
  },
  {
    icon: <BatteryCharging className="w-5 h-5" />,
    title: 'Easy on the battery',
    text: 'Dynamic polling interval adapts to how fast and how far you are travelling. Background checks do not run on days without active alarms.',
  },
  {
    icon: <Moon className="w-5 h-5" />,
    title: 'Light and dark themes',
    text: 'Material 3 throughout, with map tiles rendered with appropriate contrast at night instead of a blinding white rectangle.',
  },
  {
    icon: <Lock className="w-5 h-5" />,
    title: 'No accounts, no tracking',
    text: 'No analytics, no ads, no server. Your saved destinations and your location never leave your device.',
  },
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    title: 'Signed and scanned',
    text: 'Every release is checked by around 70 antivirus engines on VirusTotal and signed before publication.',
  },
];

const techStack = ['Flutter', 'Dart', 'Kotlin', 'OpenStreetMap', 'Gradle', 'GitHub Actions'];

const badges = ['Android 6.0+', 'MIT licensed', 'No ads, no tracking', 'Free & Open Source', 'Offline map caching'];

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
            operatingSystem: 'Android',
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

      {/* Animated gradient background */}
      <div className="fixed inset-0 md:left-64 z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/20 dark:bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob will-change-transform" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000 will-change-transform" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
        <Link
          href="/projects"
          className="group inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Projects
        </Link>

        {/* Hero */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left mb-8">
          <div className="w-24 h-24 shrink-0 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm">
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
            <h1 className="text-3xl md:text-4xl font-bold mb-2">LocReminder</h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 font-medium mb-2 max-w-2xl">
              LocReminder is a location-based alarm for Android, which helps you wake up at the right place.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Sleep on the bus. Remember the errand. It goes off when you arrive.
            </p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-2">
              {badges.map((b) => (
                <span
                  key={b}
                  className="text-xs font-medium bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-3 mb-14">
          <a
            href={apkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-md shadow-blue-500/20"
          >
            <Download className="w-4 h-4" />
            Download APK
          </a>
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors"
          >
            <Github className="w-4 h-4" />
            Source code
          </a>
          <Link
            href="/projects/locreminder/policy"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors"
          >
            <FileText className="w-4 h-4" />
            Privacy policy
          </Link>
        </div>

        {/* How to use */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-6">How to use it</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {howToSteps.map((s) => (
              <div
                key={s.step}
                className="bg-gray-50 dark:bg-gray-900/50 dark:backdrop-blur-sm border border-gray-200 dark:border-gray-800/50 rounded-2xl p-6 flex flex-col"
              >
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
            ))}
          </div>
        </section>

        {/* Story */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-4">Why I built it</h2>
          <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
            <p>
              I kept missing my stop on long bus rides in Dhaka. A normal alarm cannot help with
              that, since you never really know when you will get there — traffic, jams, and delays make
              arrival times impossible to predict. Instead of resting, you spend the whole journey
              glancing out the window.
            </p>
            <p>
              LocReminder fixes it by flipping the alarm concept around: you drop a pin on where you are
              going, pick how close counts as arrived, and put your phone away. When you get
              there, it rings a real alarm — not a quiet notification — with looping audio that cuts
              through silent mode, vibration, and a full-screen alert over your lock screen.
            </p>
            <p>
              It works entirely on stock Android location APIs and OpenStreetMap, with automatic offline
              map caching so you can navigate and search even when internet connectivity drops.
              There is no account, no server, and no analytics. What you save on the app stays on your phone.
            </p>
          </div>
        </section>

        {/* Screenshots */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-6">Screenshots</h2>
          <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
            {['1', '2', '3'].map((n) => (
              <div
                key={n}
                className="relative w-48 shrink-0 aspect-9/19.5 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800"
              >
                <Image
                  src={`/projects/locreminder/screenshots/${n}.jpg`}
                  alt={`LocReminder screenshot ${n}`}
                  fill
                  className="object-cover"
                  sizes="192px"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-6">What it does</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-gray-50 dark:bg-gray-900/50 dark:backdrop-blur-sm border border-gray-200 dark:border-gray-800/50 rounded-2xl p-5"
              >
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-2">
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

        {/* Tech stack */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-6">Built with</h2>
          <div className="flex flex-wrap gap-2">
            {techStack.map((t) => (
              <span
                key={t}
                className="text-sm font-medium bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-lg"
              >
                {t}
              </span>
            ))}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 leading-relaxed">
            The alarm itself is native Kotlin running as a foreground service, so it keeps working
            even if the Flutter engine is not running. Flutter handles the search, the map
            and the settings screens.
          </p>
        </section>

        {/* Footer note */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 text-sm text-gray-500 dark:text-gray-400">
          <p>
            Available on{' '}
            <a
              href={apkUrl}
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
            in progress.{' '}
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
        </div>
      </div>
    </div>
  );
}
