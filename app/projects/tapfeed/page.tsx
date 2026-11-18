import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";

const baseUrl = "https://shahoriar.bd";
const repositoryUrl = "https://github.com/zaifears/TapFeed";
const cloneUrl = "https://github.com/zaifears/TapFeed.git";
const releaseUrl = "https://github.com/zaifears/tapfeed/releases/latest";
const issuesUrl = `${repositoryUrl}/issues`;

const screenshots = {
  feed: "https://i.ibb.co.com/rKn0GZ12/feed-tapfeed.png",
  login: "https://i.ibb.co.com/bMzFcWrq/login-tapfeed.png",
  downloads: "https://i.ibb.co.com/8nr97KYb/download-tapfeed.png",
};

const features = [
  {
    title: "Live view in HD or SD",
    text: "Watch live camera video in HD or SD with sound, full screen, and one-click screenshots powered by embedded mpv, or open the stream in an external player.",
  },
  {
    title: "Motorized pan and tilt",
    text: "Directional arrow buttons and saved preset positions appear automatically when connected to a Tapo camera with a pan and tilt motor.",
  },
  {
    title: "SD card calendar",
    text: "Days with microSD card recordings are marked on a monthly calendar. Pick any date to inspect and filter motion or continuous clips.",
  },
  {
    title: "Direct .ts downloads",
    text: "Clips are saved directly as loss-free .ts video one at a time with live progress, cancel, in-app playback, and folder reveal controls.",
  },
  {
    title: "Plain-language problems",
    text: "Every connection or playback error states what happened in plain words and lists step-by-step fixes to try.",
  },
  {
    title: "Windows Credential Manager",
    text: "Camera Account and Tapo app passwords stay inside Windows Credential Manager, and only when you explicitly tick Remember on this PC.",
  },
  {
    title: "Update notice",
    text: "A small startup prompt lets you know when a new version is out on GitHub (sending zero camera details), and you can turn it off in Settings.",
  },
  {
    title: "Your language in one JSON file",
    text: "All interface text comes from a single JSON file per language. Drop a translated file into the language folder and restart with no coding needed.",
  },
];

interface SupportedModel {
  name: string;
  resolution: string;
}

interface CameraCategory {
  title: string;
  description: string;
  models: SupportedModel[];
}

const supportedCameraCategories: CameraCategory[] = [
  {
    title: "Indoor pan and tilt (360°)",
    description: "Motorized pan and tilt rotation, saved positions, and local RTSP live view",
    models: [
      { name: "Tapo C200", resolution: "1080p FHD" },
      { name: "Tapo C210", resolution: "2K 3MP" },
      { name: "Tapo C211", resolution: "2K 3MP" },
      { name: "Tapo C212", resolution: "2K 3MP" },
      { name: "Tapo C220", resolution: "2K 4MP QHD" },
      { name: "Tapo C225", resolution: "2K Starlight" },
      { name: "Tapo TC70", resolution: "1080p FHD" },
      { name: "Tapo TC71", resolution: "2K 3MP" },
      { name: "Tapo TC72", resolution: "2K QHD" },
      { name: "Tapo TC73", resolution: "2K QHD" },
    ],
  },
  {
    title: "Indoor fixed and compact",
    description: "Compact wall-mount, desktop, and magnetic base cameras",
    models: [
      { name: "Tapo C100", resolution: "1080p FHD" },
      { name: "Tapo C110", resolution: "2K 3MP" },
      { name: "Tapo C111", resolution: "2K 3MP" },
      { name: "Tapo C120", resolution: "2K QHD IP66" },
      { name: "Tapo C125", resolution: "2K QHD AI" },
      { name: "Tapo TC60", resolution: "1080p Fixed" },
    ],
  },
  {
    title: "Outdoor bullet and ColorPro",
    description: "Weatherproof IP66 bullet cameras with color and starlight night vision",
    models: [
      { name: "Tapo C310", resolution: "2K 3MP" },
      { name: "Tapo C320WS", resolution: "2K 4MP Color" },
      { name: "Tapo C325WB", resolution: "2K ColorPro" },
      { name: "Tapo TC65", resolution: "3MP Outdoor" },
    ],
  },
  {
    title: "Outdoor pan and tilt PTZ (360°)",
    description: "Weatherproof 360° panoramic outdoor cameras with motorized pan and tilt controls",
    models: [
      { name: "Tapo C500", resolution: "1080p IP65" },
      { name: "Tapo C510W", resolution: "2K 3MP Color" },
      { name: "Tapo C520WS", resolution: "2K 4MP Starlight" },
      { name: "Tapo TC40", resolution: "1080p PTZ" },
      { name: "Tapo TC41", resolution: "2K PTZ" },
    ],
  },
  {
    title: "Floodlight and cellular",
    description: "Smart floodlight security and LTE cellular outdoor models",
    models: [
      { name: "Tapo C720", resolution: "2K Floodlight" },
      { name: "Tapo C501GW", resolution: "4G LTE PTZ" },
    ],
  },
];

export const metadata: Metadata = {
  title: "TapFeed (Tapo-Viewer): Free Tapo App for PC & Windows 11/10",
  description:
    "Looking for a Tapo app for PC? TapFeed (formerly Tapo-Viewer) is a free Windows 11 and 10 desktop app for TP-Link Tapo cameras with live HD view, PTZ control, and microSD downloads.",
  keywords: [
    "tapo app for pc",
    "tapo-viewer",
    "tapo windows app",
    "tapo app for pc free download",
    "tapo app for windows",
    "tapo viewer",
    "tapo camera pc app",
    "tapo desktop app",
    "tapo pc app",
    "tapo web viewer",
    "does tapo have a desktop app",
    "download tapo camera app for windows 11 free",
    "tapo app pc",
    "tapo app windows",
    "tapo app windows 11",
    "TapFeed",
    "TapFeed.exe",
    "TapFeed download",
    "Tapo camera viewer for Windows",
    "Tapo app for desktop",
    "Tapo app for laptop",
    "Tapo camera software for Windows",
    "Tapo MicroSD recording download",
    "Tapo PTZ control Windows PC",
    "TP-Link Tapo Windows app",
    "Tapo C200 Windows app",
    "Tapo C310 PC viewer",
    "Tapo C500 desktop app",
    "Tapo C520WS PC app",
    "Tapo C210 Windows 11",
  ],
  alternates: { canonical: `${baseUrl}/projects/tapfeed` },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: `${baseUrl}/projects/tapfeed`,
    title: "TapFeed (Tapo-Viewer): Free Tapo App for PC & Windows 11/10",
    description:
      "Free Tapo app for PC and Windows 11/10: live HD and SD camera view, microSD card recording calendar, direct .ts downloads, and pan and tilt controls.",
    images: [
      {
        url: "/projects/tapfeed/opengraph-image?v=2",
        width: 1200,
        height: 630,
        alt: "TapFeed (Tapo-Viewer): Free Tapo Camera App for PC and Windows 11/10",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TapFeed (Tapo-Viewer): Free Tapo App for PC & Windows 11/10",
    description:
      "Free Tapo app for PC and Windows 11/10: live HD and SD camera view, microSD card recording calendar, direct .ts downloads, and pan and tilt controls.",
    images: ["/projects/tapfeed/opengraph-image?v=2"],
  },
};

const tapfeedFaqs = [
  {
    question: "Does Tapo have a desktop app for PC and Windows 11?",
    answer:
      "TP-Link does not release an official Tapo desktop app for Windows 10 or Windows 11, and there is no built-in Tapo web viewer inside the camera firmware. TapFeed (formerly Tapo-Viewer) fills that gap as a free, open-source Tapo app for PC that streams live HD or SD video, controls motorized pan and tilt cameras, and downloads microSD recordings directly over your local Wi-Fi or Ethernet network.",
  },
  {
    question: "How do I download the Tapo camera app for Windows 11 or 10 for free?",
    answer:
      "Download the portable TapFeed.exe file (62 MB) from the official GitHub Releases page. TapFeed is completely free under the MIT License, requires no installer or Tapo Care subscription, and starts in about 3 seconds on Windows 10 and Windows 11 (64-bit).",
  },
  {
    question: "Is there a Tapo web viewer or PC viewer that downloads microSD card recordings?",
    answer:
      "RTSP players like VLC can only show a live video stream and cannot browse or download recordings stored on the camera's microSD card. TapFeed acts as a complete Tapo PC viewer with an interactive monthly calendar that marks every day with saved footage and downloads clips directly to your computer as loss-free .ts video files.",
  },
  {
    question: "How do I watch my Tapo camera on PC without an Android emulator like BlueStacks?",
    answer:
      "Enable your Camera Account inside the Tapo mobile app (Camera Settings, Advanced Settings, Camera Account), note your camera's local IP address under Device Info, and open TapFeed.exe on your Windows PC. Enter the camera IP, Camera Account username and password, and optional Tapo app password to view live video and control pan and tilt without running an Android emulator.",
  },
];

export default function TapFeedPage() {
  return (
    <div className="min-h-screen text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "TapFeed",
            alternateName: [
              "Tapo-Viewer",
              "Tapo Viewer",
              "TapFeed.exe",
              "Tapo-Viewer.exe",
              "Tapo App for PC",
              "Tapo Windows App",
            ],
            url: `${baseUrl}/projects/tapfeed`,
            applicationCategory: "MultimediaApplication",
            operatingSystem: "Windows 10, Windows 11 (64-bit)",
            softwareVersion: "2.0.0",
            fileSize: "62MB",
            datePublished: "2026-09-10",
            dateModified: "2026-11-17",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            author: {
              "@type": "Person",
              "@id": `${baseUrl}/#person`,
              name: "Md Al Shahoriar Hossain",
              url: baseUrl,
            },
            codeRepository: repositoryUrl,
            license: `${repositoryUrl}/blob/main/LICENSE`,
            downloadUrl: releaseUrl,
            image: `${baseUrl}/projects/tapfeed/TapFeed.png`,
            screenshot: [
              screenshots.feed,
              screenshots.login,
              screenshots.downloads,
            ],
            featureList: features.map((feature) => feature.title),
            requirements:
              "Windows 10/11 64-bit, local Wi-Fi or LAN connection, compatible TP-Link Tapo camera",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
              {
                "@type": "ListItem",
                position: 2,
                name: "Projects",
                item: `${baseUrl}/projects`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "TapFeed",
                item: `${baseUrl}/projects/tapfeed`,
              },
            ],
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: tapfeedFaqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />

      <div className="mx-auto max-w-6xl space-y-20 sm:space-y-28 pb-16">
        {/* 1. Hero (Stage posture) */}
        <section className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12 pt-2">
          <div className="flex flex-col items-start gap-6">
            <div className="flex items-center gap-4">
              <Image
                src="/projects/tapfeed/TapFeed.png"
                alt="TapFeed logo: a white Tapo-style pan and tilt camera on a blue circle"
                width={72}
                height={72}
                className="h-16 w-16 shrink-0 rounded-full"
              />
              <div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl leading-none text-ink">
                  TapFeed
                </h1>
                <p className="mt-1.5 text-sm text-muted">
                  Tapo App for PC, previously named <strong className="font-semibold text-ink">Tapo-Viewer</strong>
                </p>
              </div>
            </div>

            <p className="text-lg sm:text-xl leading-relaxed text-ink-2">
              Free Tapo desktop app for Windows 11 and 10 to watch live HD streams, turn pan and tilt cameras, and save microSD recordings to your PC.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={releaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary whitespace-nowrap"
              >
                <FontAwesomeIcon icon={faDownload} className="h-4 w-4" aria-hidden="true" />
                <span>Download TapFeed.exe</span>
              </a>
              <a
                href={repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-quiet whitespace-nowrap"
              >
                <span>View on GitHub</span>
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>

            <p className="text-sm text-muted">
              Free and open source under the MIT License for Windows 10 and 11. Updated <time dateTime="2026-11-17">November 2026</time>.
            </p>
          </div>

          <figure className="panel overflow-hidden p-2 sm:p-3">
            <Image
              src={screenshots.feed}
              alt="TapFeed camera screen: Tapo live view, a month calendar marking days with SD card recordings, and the list of that day's recordings"
              width={1366}
              height={768}
              priority
              fetchPriority="high"
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="h-auto w-full rounded-control"
            />
            <figcaption className="px-3 pt-3 pb-1 text-sm text-muted">
              Camera screen: live HD or SD view, month calendar marking days with SD card recordings, pan and tilt controls, and that day&apos;s clips.
            </figcaption>
          </figure>
        </section>

        {/* 2. Figures + Direct Summary Band */}
        <section className="rounded-panel border border-rule bg-paper-2 p-6 sm:p-10">
          <div className="grid grid-cols-1 gap-8 pb-8 border-b border-rule md:grid-cols-3">
            <div>
              <p className="text-4xl sm:text-5xl font-bold tabular-nums text-ink">62&nbsp;MB</p>
              <p className="mt-2 text-sm text-ink-2">
                Single portable <code className="font-mono text-ink">TapFeed.exe</code> download, down from 264&nbsp;MB in Tapo-Viewer 1.x.
              </p>
            </div>
            <div className="md:border-l md:border-rule md:pl-8">
              <p className="text-4xl sm:text-5xl font-bold tabular-nums text-ink">3&nbsp;s</p>
              <p className="mt-2 text-sm text-ink-2">
                Typical startup time on Windows 10 and 11, down from 24 to 47 seconds, with zero 610&nbsp;MB temp unpack.
              </p>
            </div>
            <div className="md:border-l md:border-rule md:pl-8">
              <p className="text-4xl sm:text-5xl font-bold tabular-nums text-ink">27+</p>
              <p className="mt-2 text-sm text-ink-2">
                Verified mains-powered TP-Link Tapo indoor, outdoor bullet, and 360° pan and tilt cameras.
              </p>
            </div>
          </div>

          <div className="pt-8 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] items-start">
            <h2 className="text-2xl sm:text-3xl font-semibold text-ink">
              Does TP-Link Tapo have a desktop app for PC?
            </h2>
            <div className="space-y-3 text-base leading-relaxed text-ink-2">
              <p>
                TP-Link does not release an official <strong className="font-semibold text-ink">Tapo app for PC</strong> or a built-in <strong className="font-semibold text-ink">Tapo web viewer</strong> for Windows 11 and Windows 10. <strong className="font-semibold text-ink">TapFeed</strong> (previously named <strong className="font-semibold text-ink">Tapo-Viewer</strong>) is a free, open-source <strong className="font-semibold text-ink">Tapo camera PC app</strong> built with Rust, Tauri 2, embedded <code className="font-mono text-ink">libmpv</code> video playback, and <code className="font-mono text-ink">PyTapo</code> (v3.4.31). It streams live HD or SD video with sound and screenshots, lists recordings on the camera&apos;s microSD card by day, downloads clips as <code className="font-mono text-ink">.ts</code> files to your computer, and turns motorized pan and tilt cameras over your home network with no Tapo Care subscription or Android emulator.
              </p>
              <p>
                On first start, TapFeed automatically copies your existing Tapo-Viewer settings, saved passwords from Windows Credential Manager, and language files, keeping your downloaded recordings where they are. Versions up to 1.1.3 are named <code className="font-mono text-ink">Tapo-Viewer.exe</code>; v2.0 and newer ship as <code className="font-mono text-ink">TapFeed.exe</code>.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Showcase: Sign in and Downloads screens */}
        <section className="space-y-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-semibold text-ink">
              Sign in once, test your IP, and queue downloads
            </h2>
            <p className="mt-3 text-base sm:text-lg text-ink-2">
              Double-click <code className="font-mono text-ink">TapFeed.exe</code> with nothing to install. Every screen is built for local network speed and plain-language feedback.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] items-start">
            <figure className="panel overflow-hidden p-2 sm:p-3">
              <Image
                src={screenshots.login}
                alt="TapFeed sign-in screen: camera IP address with a Test button, Camera Account username and password, optional Tapo app password"
                width={1366}
                height={768}
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="h-auto w-full rounded-control"
              />
              <figcaption className="px-3 pt-3 pb-1 text-sm text-ink-2">
                <strong className="font-semibold text-ink">Sign-in screen:</strong> enter the camera IP and select Test to verify live video and control ports before connecting with your Camera Account and optional Tapo app password.
              </figcaption>
            </figure>

            <figure className="panel overflow-hidden p-2 sm:p-3">
              <Image
                src={screenshots.downloads}
                alt="TapFeed downloads screen: saved Tapo recordings with progress, play and show in folder"
                width={1366}
                height={768}
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="h-auto w-full rounded-control"
              />
              <figcaption className="px-3 pt-3 pb-1 text-sm text-ink-2">
                <strong className="font-semibold text-ink">Downloads screen:</strong> saved <code className="font-mono text-ink">.ts</code> recordings queue one at a time with live percentage progress, cancel, play, and show in folder controls.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* 4. Rows (Definition List): 8 Core Features */}
        <section className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] items-start">
          <div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-ink">
              What TapFeed does on your PC
            </h2>
            <p className="mt-3 text-base text-ink-2">
              Every control talks directly to your camera over local Wi-Fi or Ethernet, without routing video through third-party servers.
            </p>
          </div>

          <dl className="divide-y divide-rule border-t border-b border-rule">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="py-5 grid grid-cols-1 gap-2 sm:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] sm:gap-6"
              >
                <dt className="text-base font-semibold text-ink">
                  {feature.title}
                </dt>
                <dd className="text-sm sm:text-base leading-relaxed text-ink-2">
                  {feature.text}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* 5. Table: Before You Connect (Two Logins) */}
        <section className="space-y-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-semibold text-ink">
              Before you connect: two Tapo logins
            </h2>
            <p className="mt-3 text-base text-ink-2">
              Tapo cameras use two separate credentials. TapFeed may need both depending on your camera model and firmware.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm sm:text-base border-t border-b border-rule">
              <caption className="sr-only">
                Comparison between Tapo Camera Account and Tapo app password credentials
              </caption>
              <thead>
                <tr className="border-b border-rule text-muted">
                  <th scope="col" className="py-3.5 pr-4 font-medium">Credential</th>
                  <th scope="col" className="py-3.5 px-4 font-medium">What it is</th>
                  <th scope="col" className="py-3.5 px-4 font-medium">Where to find it</th>
                  <th scope="col" className="py-3.5 pl-4 font-medium">Used for</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rule">
                <tr>
                  <th scope="row" className="py-4 pr-4 font-semibold text-ink">
                    Camera Account
                  </th>
                  <td className="py-4 px-4 text-ink-2">
                    A local username and password created inside the camera&apos;s settings
                  </td>
                  <td className="py-4 px-4 text-ink-2">
                    Tapo app, camera, Settings, Advanced settings, Camera Account
                  </td>
                  <td className="py-4 pl-4 font-medium text-ink">
                    Live video (RTSP stream)
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="py-4 pr-4 font-semibold text-ink">
                    Tapo app password
                  </th>
                  <td className="py-4 px-4 text-ink-2">
                    The password you use to sign in to the Tapo mobile app
                  </td>
                  <td className="py-4 px-4 text-ink-2">
                    Your TP-Link ID account
                  </td>
                  <td className="py-4 pl-4 font-medium text-ink">
                    Listing and downloading SD card recordings on some cameras
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-sm leading-relaxed text-ink-2">
            The camera&apos;s IP address is in the Tapo app under <strong className="font-semibold text-ink">Device info</strong>. Use <strong className="font-semibold text-ink">Test</strong> beside the IP field to check it before signing in. Battery cameras usually have no live video (RTSP) support; see{" "}
            <a
              href="https://www.tp-link.com/us/support/faq/4465/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-accent-text underline underline-offset-4"
            >
              TP-Link&apos;s official RTSP compatibility list
            </a>
            .
          </p>
        </section>

        {/* 6. Table on Tinted Band: How TapFeed Compares */}
        <section className="rounded-panel border border-rule bg-paper-2 p-6 sm:p-10 space-y-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-semibold text-ink">
              How TapFeed compares on Windows
            </h2>
            <p className="mt-3 text-base text-ink-2">
              Watch live feeds and archive microSD clips without heavy Android emulators, cloud subscriptions, or climbing a ladder to pull the memory card.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm sm:text-base border-t border-b border-rule">
              <caption className="sr-only">
                Comparison of TapFeed against Tapo-Viewer 1.x, Official Tapo Mobile App, Android Emulators, and manual SD card removal
              </caption>
              <thead>
                <tr className="border-b border-rule text-muted">
                  <th scope="col" className="py-3.5 pr-4 font-medium">Method</th>
                  <th scope="col" className="py-3.5 px-4 font-medium">PC live view and PTZ</th>
                  <th scope="col" className="py-3.5 px-4 font-medium">SD card downloads</th>
                  <th scope="col" className="py-3.5 px-4 font-medium">Cost</th>
                  <th scope="col" className="py-3.5 pl-4 font-medium">Footprint</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rule tabular-nums">
                <tr>
                  <th scope="row" className="py-4 pr-4 font-semibold text-accent-text">
                    TapFeed 2.0 (Windows)
                  </th>
                  <td className="py-4 px-4 text-ink">
                    Built-in HD and SD mpv with pan and tilt
                  </td>
                  <td className="py-4 px-4 text-ink">
                    Direct .ts over Wi-Fi, no card pull
                  </td>
                  <td className="py-4 px-4 text-ink">
                    Free and open source (MIT)
                  </td>
                  <td className="py-4 pl-4 text-ink">
                    62&nbsp;MB download, opens in ~3&nbsp;s
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="py-4 pr-4 font-semibold text-ink">
                    Tapo-Viewer 1.x (Legacy)
                  </th>
                  <td className="py-4 px-4 text-ink-2">
                    External player or Tkinter window
                  </td>
                  <td className="py-4 px-4 text-ink-2">
                    Over Wi-Fi
                  </td>
                  <td className="py-4 px-4 text-ink-2">
                    Free and open source (MIT)
                  </td>
                  <td className="py-4 pl-4 text-ink-2">
                    264&nbsp;MB download, 24 to 47&nbsp;s start
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="py-4 pr-4 font-semibold text-ink">
                    Official Tapo mobile app
                  </th>
                  <td className="py-4 px-4 text-ink-2">
                    Phone or tablet screen only
                  </td>
                  <td className="py-4 px-4 text-ink-2">
                    Manual clip saves to phone
                  </td>
                  <td className="py-4 px-4 text-ink-2">
                    Free or Tapo Care ($3.49/mo)
                  </td>
                  <td className="py-4 pl-4 text-ink-2">
                    Drains phone battery
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="py-4 pr-4 font-semibold text-ink">
                    Android emulator (BlueStacks)
                  </th>
                  <td className="py-4 px-4 text-ink-2">
                    Emulated mobile window
                  </td>
                  <td className="py-4 px-4 text-ink-2">
                    Shared emulator folders
                  </td>
                  <td className="py-4 px-4 text-ink-2">
                    Free with ads
                  </td>
                  <td className="py-4 pl-4 text-ink-2">
                    2 to 4&nbsp;GB RAM, high CPU load
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="py-4 pr-4 font-semibold text-ink">
                    Pulling SD card manually
                  </th>
                  <td className="py-4 px-4 text-ink-2">
                    No live video feed
                  </td>
                  <td className="py-4 px-4 text-ink-2">
                    Physical card reader required
                  </td>
                  <td className="py-4 px-4 text-ink-2">
                    Card reader hardware
                  </td>
                  <td className="py-4 pl-4 text-ink-2">
                    Must dismount camera
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 7. Index: Supported TP-Link Tapo Cameras (No card-in-card) */}
        <section className="space-y-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl sm:text-4xl font-semibold text-ink">
              Supported TP-Link Tapo cameras
            </h2>
            <p className="mt-3 text-base text-ink-2">
              TapFeed connects to any mains-powered TP-Link Tapo camera with a local Camera Account and RTSP live video. Pan and tilt controls appear automatically on models with a motor, such as the C200, C210, C225, and C500.
            </p>
          </div>

          <div className="divide-y divide-rule border-t border-b border-rule">
            {supportedCameraCategories.map((cat) => (
              <div
                key={cat.title}
                className="py-6 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-8 items-start"
              >
                <div>
                  <h3 className="text-lg font-semibold text-ink">{cat.title}</h3>
                  <p className="mt-1 text-sm text-muted">{cat.description}</p>
                </div>

                <ul className="flex flex-wrap gap-2">
                  {cat.models.map((m) => (
                    <li
                      key={m.name}
                      className="rounded-full bg-paper-2 border border-rule px-3.5 py-1.5 text-sm"
                    >
                      <span className="font-semibold text-ink">{m.name}</span>{" "}
                      <span className="text-muted">({m.resolution})</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 8. Split: Build from Source & Add Your Language */}
        <section className="grid grid-cols-1 gap-8 lg:grid-cols-2 items-stretch">
          <div className="panel p-6 sm:p-8 flex flex-col justify-between gap-6">
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-semibold text-ink">
                Build from source on Windows
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-ink-2">
                Needs Rust (MSVC), Visual Studio 2022 C++ Build Tools, Python 3.10+ with{" "}
                <code className="font-mono text-ink">pip install -r requirements.txt pyinstaller</code>, and a 64-bit{" "}
                <code className="font-mono text-ink">libmpv-2.dll</code> in{" "}
                <code className="font-mono text-ink">vendor/libmpv/</code>.
              </p>
              <pre
                role="region"
                aria-label="Build from source commands"
                tabIndex={0}
                className="overflow-x-auto rounded-control border border-rule bg-paper-3 p-4 text-xs sm:text-sm font-mono leading-relaxed text-ink"
              >
                <code>{`git clone ${cloneUrl}\ncd TapFeed\nbuild_desktop.bat`}</code>
              </pre>
            </div>
            <p className="text-sm text-muted">
              Output: <code className="font-mono text-ink">dist\TapFeed.exe</code>. To update PyTapo, run{" "}
              <code className="font-mono text-ink">.venv\Scripts\pip install -U pytapo</code>, then run{" "}
              <code className="font-mono text-ink">build_desktop.bat</code> again.
            </p>
          </div>

          <div className="panel p-6 sm:p-8 flex flex-col justify-between gap-6">
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-semibold text-ink">
                Translate into your language
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-ink-2">
                New languages are very welcome. Each language is one JSON file, so no coding is needed:
              </p>
              <ol className="space-y-2.5 text-sm sm:text-base text-ink-2 list-decimal list-inside">
                <li>
                  Copy <code className="font-mono text-ink">desktop/ui/locales/en.json</code> to your language code, for example <code className="font-mono text-ink">bn.json</code>.
                </li>
                <li>
                  Translate the text values while keeping the keys and anything in <code className="font-mono text-ink">{"{braces}"}</code>.
                </li>
                <li>
                  Add your language entry to <code className="font-mono text-ink">desktop/ui/locales/index.json</code> and open a pull request on GitHub.
                </li>
              </ol>
            </div>
            <p className="text-sm text-muted">
              To try a translation without building, open <strong className="font-semibold text-ink">Settings, Open language folder</strong> in the app, copy <code className="font-mono text-ink">_template.json</code> to your language code, translate it, and restart.
            </p>
          </div>
        </section>

        {/* 9. FAQ: Common Searches for Tapo App for PC & Windows 11 */}
        <section className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] items-start">
          <div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-ink">
              Tapo PC app questions and answers
            </h2>
            <p className="mt-3 text-base text-ink-2">
              Direct answers for Windows 11 and Windows 10 users setting up a TP-Link Tapo desktop viewer.
            </p>
          </div>

          <dl className="divide-y divide-rule border-t border-b border-rule">
            {tapfeedFaqs.map((faq) => (
              <div key={faq.question} className="py-6 space-y-2">
                <dt className="text-lg font-semibold text-ink">
                  {faq.question}
                </dt>
                <dd className="text-sm sm:text-base leading-relaxed text-ink-2">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* 10. Colophon / Closing Band */}
        <section className="panel p-6 sm:p-10 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold text-ink">
            Credits and support
          </h2>
          <p className="max-w-3xl text-base leading-relaxed text-ink-2">
            Camera connection by{" "}
            <a
              href="https://github.com/JurajNyiri/pytapo"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-accent-text underline underline-offset-4"
            >
              pytapo
            </a>{" "}
            from Juraj Nyíri. Video by{" "}
            <a
              href="https://mpv.io"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-accent-text underline underline-offset-4"
            >
              mpv
            </a>
            . Made by{" "}
            <a
              href="https://github.com/zaifears"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-accent-text underline underline-offset-4"
            >
              Shahoriar Hossain
            </a>{" "}
            under the MIT License. TapFeed is not affiliated with TP-Link; Tapo is a trademark of TP-Link.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link href="/thanks" className="btn-primary whitespace-nowrap">
              <span>Buy me a coffee</span>
            </Link>
            <a
              href={issuesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-quiet whitespace-nowrap"
            >
              <span>Report a bug on GitHub</span>
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
