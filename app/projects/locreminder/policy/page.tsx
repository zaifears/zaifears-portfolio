import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const baseUrl = 'https://shahoriar.bd';

export const metadata: Metadata = {
  title: 'LocReminder Privacy Policy',
  description:
    'Privacy policy for LocReminder — a location-based alarm for Android, which helps you wake up at the right place. Learn what data is stored on-device, why permissions are needed, and why none of it ever leaves your phone.',
  alternates: {
    canonical: `${baseUrl}/projects/locreminder/policy`,
  },
};

const storedData: { item: string; why: string }[] = [
  { item: 'Saved destinations (name, coordinates, radius)', why: 'To know when to wake you' },
  { item: 'Your alarm sound choice', why: 'To play the sound you picked' },
  { item: 'Theme preference', why: 'To remember light or dark mode' },
];

const permissions: { name: string; code: string; why: string }[] = [
  {
    name: 'Location',
    code: 'ACCESS_FINE_LOCATION / ACCESS_COARSE_LOCATION',
    why: 'Measure distance to your destination',
  },
  {
    name: 'Background location',
    code: 'ACCESS_BACKGROUND_LOCATION',
    why: 'Let the alarm work while the app is closed',
  },
  {
    name: 'Foreground service',
    code: 'FOREGROUND_SERVICE + _LOCATION + _MEDIA_PLAYBACK',
    why: 'Keep watching, and play the alarm, without being killed',
  },
  {
    name: 'Notifications',
    code: 'POST_NOTIFICATIONS',
    why: 'Show the alarm and the "watching" status',
  },
  {
    name: 'Full screen intent',
    code: 'USE_FULL_SCREEN_INTENT',
    why: 'Show the alarm over your lock screen',
  },
  {
    name: 'Wake lock',
    code: 'WAKE_LOCK',
    why: 'Stay awake long enough to ring',
  },
  {
    name: 'Vibrate',
    code: 'VIBRATE',
    why: 'Vibrate with the alarm',
  },
  {
    name: 'Receive boot completed',
    code: 'RECEIVE_BOOT_COMPLETED',
    why: 'Restore your alarms after a restart',
  },
  {
    name: 'Battery optimizations',
    code: 'REQUEST_IGNORE_BATTERY_OPTIMIZATIONS',
    why: 'Ask to be exempt so alarms are not delayed',
  },
  {
    name: 'Internet',
    code: 'INTERNET',
    why: 'Download map tiles and search for places',
  },
];

function Card({ children }: { children: React.ReactNode }) {
  return (
    <section className="bg-gray-50 dark:bg-gray-900/50 dark:backdrop-blur-sm border border-gray-200 dark:border-gray-800/50 rounded-2xl p-6 md:p-8">
      {children}
    </section>
  );
}

function CardHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-lg font-bold mb-4 text-blue-600 dark:text-blue-400">{children}</h2>
  );
}

export default function LocReminderPolicyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Link
          href="/projects/locreminder"
          className="group inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to LocReminder
        </Link>

        <div className="mb-12">
          <p className="text-blue-600 dark:text-blue-400 font-mono text-sm mb-2 tracking-widest uppercase">
            LocReminder
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Privacy Policy</h1>
          <p className="text-gray-700 dark:text-gray-300 font-medium mb-1">
            LocReminder is a location-based alarm for Android, which helps you wake up at the right place.
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Last updated 9 September 2026</p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeading>The short version</CardHeading>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              LocReminder has no account system, no analytics, no advertising and no server of
              its own. Your destinations and your location never leave your phone, because there
              is nowhere for them to go.
            </p>
          </Card>

          <Card>
            <CardHeading>What the app stores</CardHeading>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Everything below is stored <strong className="text-gray-900 dark:text-white">only on your device</strong>, inside the app&apos;s private
              storage, and is deleted the moment you uninstall it:
            </p>
            <div className="divide-y divide-gray-200 dark:divide-gray-800">
              {storedData.map((row) => (
                <div key={row.item} className="py-3 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                  <p className="font-medium text-gray-900 dark:text-white sm:w-1/2">{row.item}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{row.why}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <CardHeading>Location</CardHeading>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              LocReminder uses your location <strong className="text-gray-900 dark:text-white">solely</strong> to work out how far you are from a
              destination you have saved, and to ring an alarm when you arrive.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              <li>Your location is processed on your device and is <strong className="text-gray-900 dark:text-white">never transmitted</strong> anywhere.</li>
              <li>
                It is <strong className="text-gray-900 dark:text-white">not stored</strong> — each position is compared against your saved destinations and
                then discarded.
              </li>
              <li>
                Background location access is required because the alarm&apos;s entire purpose is to work while
                the app is closed and your screen is off.
              </li>
              <li>Location access stops entirely once you have no active alarms.</li>
            </ul>
          </Card>

          <Card>
            <CardHeading>Network connections</CardHeading>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              <strong className="text-gray-900 dark:text-white">The alarm makes none.</strong> Working out that you have
              arrived uses GPS, which is a receive-only radio, and the comparison happens on your phone.
              It rings with no connection at all.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Two parts of the app do use the network, and only while you are using them. Both are free OpenStreetMap-based services run by other people:
            </p>

            <div className="space-y-3 mb-4">
              <div className="p-4 rounded-xl bg-white/70 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/60">
                <p className="font-semibold text-gray-900 dark:text-white mb-1 text-sm">
                  <a
                    href="https://osmfoundation.org/wiki/Privacy_Policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    OpenStreetMap Foundation
                  </a>{' '}
                  <span className="font-mono text-xs text-gray-500 dark:text-gray-400 font-normal">
                    (tile.openstreetmap.org, nominatim.openstreetmap.org)
                  </span>
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Map images, converting a coordinate you have picked into an address, and place search when Photon is unavailable or finds nothing. See the{' '}
                  <a
                    href="https://osmfoundation.org/wiki/Privacy_Policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    OpenStreetMap privacy policy
                  </a>
                  .
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/70 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/60">
                <p className="font-semibold text-gray-900 dark:text-white mb-1 text-sm">
                  <a
                    href="https://github.com/komoot/photon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Photon
                  </a>{' '}
                  <span className="font-mono text-xs text-gray-500 dark:text-gray-400 font-normal">
                    (photon.komoot.io)
                  </span>
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Place search as you type. Photon is free software (Apache 2.0) and its public instance is provided by Komoot. See the{' '}
                  <a
                    href="https://github.com/komoot/photon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Photon project
                  </a>
                  .
                </p>
              </div>
            </div>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm mb-3">
              As with any map application, these requests necessarily reveal your IP address to whoever runs the service, along with the map area you are looking at or the words you typed. When you search, the app also sends the approximate centre of the map you are looking at, so that nearby places rank above distant ones with similar names.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm mb-4">
              Be clear about what that last part means: the map opens centred on you, so if you search without panning first, the coordinate sent as the search bias is roughly where you are. It is sent as a hint for ranking, not stored, and it moves wherever you move the map.
            </p>

            <div className="border-t border-gray-200 dark:border-gray-800 pt-4 space-y-3">
              <p className="font-semibold text-gray-900 dark:text-white text-sm">
                What is <span className="underline">not</span> sent, to either of them or anywhere else:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                <li>Your saved destinations</li>
                <li>Your GPS position itself, at any point, to anybody</li>
                <li>Anything at all once a search is over</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                Map images are only requested for areas you actually look at, and are then kept on your phone for a month so the same ones are not fetched again. A search is only sent while you are typing one. Typing coordinates directly sends nothing at all.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm font-medium">
                There is no LocReminder server, and no other network connection is made.
              </p>
            </div>
          </Card>

          <Card>
            <CardHeading>Permissions and why each is needed</CardHeading>
            <div className="divide-y divide-gray-200 dark:divide-gray-800">
              {permissions.map((p) => (
                <div key={p.code} className="py-3 flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
                  <div className="sm:w-1/2 shrink-0">
                    <p className="font-medium text-gray-900 dark:text-white">{p.name}</p>
                    <code className="text-xs text-blue-600 dark:text-blue-400 font-mono">
                      {p.code}
                    </code>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 sm:w-1/2">{p.why}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <CardHeading>Children</CardHeading>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              LocReminder collects no personal data from anyone, including children.
            </p>
          </Card>

          <Card>
            <CardHeading>Changes to this policy</CardHeading>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Any change to this policy will appear in this file and on this page, which is public in the
              project&apos;s{' '}
              <a
                href="https://github.com/zaifears/locreminder/commits/main/PRIVACY.md"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Git history
              </a>
              .
            </p>
          </Card>

          <Card>
            <CardHeading>License and attribution</CardHeading>
            <div className="space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
              <p>
                <span className="font-medium text-gray-900 dark:text-white">Source code:</span>{' '}
                <a
                  href="https://github.com/zaifears/locreminder/blob/main/LICENSE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  MIT
                </a>
                , free to use, modify and distribute, commercially or otherwise.
              </p>
              <p>
                <span className="font-medium text-gray-900 dark:text-white">
                  Logo, app icon and the name &quot;LocReminder&quot;:
                </span>{' '}
                all rights reserved.
              </p>
              <p>
                <span className="font-medium text-gray-900 dark:text-white">Map data and search:</span>{' '}
                &copy;{' '}
                <a
                  href="https://www.openstreetmap.org/copyright"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  OpenStreetMap
                </a>{' '}
                contributors, under the Open Database License.
              </p>
              <p>
                <span className="font-medium text-gray-900 dark:text-white">Search service:</span>{' '}
                <a
                  href="https://github.com/komoot/photon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Photon
                </a>{' '}
                (Apache 2.0), public instance hosted by{' '}
                <a
                  href="https://www.komoot.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Komoot
                </a>
                .
              </p>
            </div>
          </Card>

          <Card>
            <CardHeading>Contact</CardHeading>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Md Al Shahoriar Hossain
              <br />
              <a
                href="mailto:shahoriar.connect@gmail.com"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                shahoriar.connect@gmail.com
              </a>
              <br />
              <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">
                shahoriar.bd
              </Link>
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
