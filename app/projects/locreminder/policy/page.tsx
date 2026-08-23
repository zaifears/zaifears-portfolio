import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const baseUrl = 'https://shahoriar.bd';

export const metadata: Metadata = {
  title: 'LocReminder Privacy Policy',
  description:
    'Privacy policy for the LocReminder Android app: what data it stores, why each permission is needed, and why none of it ever leaves your phone.',
  alternates: {
    canonical: `${baseUrl}/projects/locreminder/policy`,
  },
};

const storedData: { item: string; why: string }[] = [
  { item: 'Saved destinations (name, coordinates, radius)', why: 'To know when to wake you' },
  { item: 'Your alarm sound choice', why: 'To play the sound you picked' },
  { item: 'Theme preference', why: 'To remember light or dark mode' },
];

const permissions: { name: string; why: string }[] = [
  {
    name: 'Location (fine and coarse)',
    why: 'To measure the distance between you and your saved destination',
  },
  {
    name: 'Background location',
    why: 'So the alarm keeps working while the app is closed and your screen is off',
  },
  {
    name: 'Foreground service, location and media playback',
    why: 'Keeps the watcher running and the alarm sound playing without being killed',
  },
  { name: 'Notifications', why: 'To show the alarm and the "watching" status' },
  { name: 'Full screen intent', why: 'To show the alarm over your lock screen' },
  { name: 'Wake lock', why: 'Keeps the phone awake long enough to ring' },
  { name: 'Vibrate', why: 'Vibrates along with the alarm' },
  { name: 'Receive boot completed', why: 'Restores your alarms after the phone restarts' },
  {
    name: 'Ignore battery optimizations',
    why: 'Asks to be exempt from battery limits so alarms are not delayed',
  },
  { name: 'Internet', why: 'To download map tiles and search for places' },
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
          <p className="text-gray-500 dark:text-gray-400">Last updated 15 August 2026</p>
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
              Everything below is stored only on your device, inside the app&apos;s private
              storage, and is deleted the moment you uninstall it.
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
              LocReminder uses your location solely to work out how far you are from a
              destination you have saved, and to ring an alarm when you arrive.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              <li>Your location is processed on your device and is never sent anywhere.</li>
              <li>
                It is not stored. Each position is compared against your saved destinations and
                then discarded.
              </li>
              <li>
                Background access is needed because the whole point of the alarm is to work while
                the app is closed and the screen is off.
              </li>
              <li>Location access stops entirely once you have no active alarms.</li>
            </ul>
          </Card>

          <Card>
            <CardHeading>Network connections</CardHeading>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              The app talks to exactly one third party:{' '}
              <a
                href="https://osmfoundation.org/wiki/Privacy_Policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                OpenStreetMap
              </a>{' '}
              (<code className="text-xs bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">tile.openstreetmap.org</code>,{' '}
              <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">nominatim.openstreetmap.org</code>),
              to download map tiles and to search for places by name. Those requests reveal your
              IP address and the map area or search term to the OpenStreetMap Foundation, the
              same as with any map app.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Map tiles are only requested for areas you actually look at, and a search is only
              sent when you type one. Your saved destinations are never sent. There is no other
              network connection, and no LocReminder server.
            </p>
          </Card>

          <Card>
            <CardHeading>Permissions and why each is needed</CardHeading>
            <div className="divide-y divide-gray-200 dark:divide-gray-800">
              {permissions.map((p) => (
                <div key={p.name} className="py-3 flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
                  <p className="font-medium text-gray-900 dark:text-white sm:w-2/5 shrink-0">
                    {p.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{p.why}</p>
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
              Any change to this policy will appear on this page, and the history of it is public
              in the project&apos;s{' '}
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
