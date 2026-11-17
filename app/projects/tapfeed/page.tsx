import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  AlertCircle,
  BellRing,
  CalendarDays,
  CheckCircle2,
  Compass,
  Download,
  ExternalLink,
  Globe,
  HardDrive,
  KeyRound,
  MonitorPlay,
  Play,
  ShieldCheck,
  Terminal,
  Wifi,
} from "lucide-react";

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
    icon: <MonitorPlay className="h-5 w-5" aria-hidden="true" />,
    title: "Live view (HD or SD)",
    text: "Watch live camera streams in HD or SD with sound, full screen, and one-click screenshots powered by embedded mpv—plus optional external player handoff.",
  },
  {
    icon: <Compass className="h-5 w-5" aria-hidden="true" />,
    title: "Motorized pan and tilt",
    text: "Directional arrow buttons and saved preset positions appear automatically when connected to a Tapo camera with a pan/tilt motor.",
  },
  {
    icon: <CalendarDays className="h-5 w-5" aria-hidden="true" />,
    title: "Recordings calendar",
    text: "Days with MicroSD card recordings are marked on a monthly calendar; pick any date to inspect and filter motion or continuous clips.",
  },
  {
    icon: <Download className="h-5 w-5" aria-hidden="true" />,
    title: "Direct .ts downloads",
    text: "Clips are saved directly as loss-free .ts recordings one at a time with live progress, cancel, in-app playback, and 'Show in folder' controls.",
  },
  {
    icon: <AlertCircle className="h-5 w-5" aria-hidden="true" />,
    title: "Plain-language problems",
    text: "Every connection or playback issue explains what happened in plain words and lists step-by-step fixes to try, without cryptic terminal tracebacks.",
  },
  {
    icon: <KeyRound className="h-5 w-5" aria-hidden="true" />,
    title: "Windows Credential Manager",
    text: "Camera Account and Tapo app passwords stay securely inside Windows Credential Manager—and only when you explicitly tick 'Remember on this PC'.",
  },
  {
    icon: <BellRing className="h-5 w-5" aria-hidden="true" />,
    title: "Optional update notice",
    text: "A lightweight startup check notifies you when a newer release is available on GitHub (sending zero camera details), and can be turned off anytime.",
  },
  {
    icon: <Globe className="h-5 w-5" aria-hidden="true" />,
    title: "Your language (1-file JSON)",
    text: "All interface text loads from a single JSON file per language. Drop a translated file into the language folder and restart—no coding or rebuild required.",
  },
];

interface SupportedModel {
  name: string;
  resolution: string;
  highlight?: string;
}

interface CameraCategory {
  title: string;
  description: string;
  models: SupportedModel[];
}

const supportedCameraCategories: CameraCategory[] = [
  {
    title: "Indoor Pan & Tilt Series (360°)",
    description: "Full motorized pan/tilt rotation, saved positions, and local RTSP live view",
    models: [
      { name: "Tapo C200", resolution: "1080p FHD", highlight: "Popular" },
      { name: "Tapo C210", resolution: "2K 3MP Ultra HD", highlight: "Verified" },
      { name: "Tapo C211", resolution: "2K 3MP (Black Edition)", highlight: "Verified" },
      { name: "Tapo C212", resolution: "2K 3MP Pan/Tilt", highlight: "Verified" },
      { name: "Tapo C220", resolution: "2K 4MP QHD AI", highlight: "Verified" },
      { name: "Tapo C225", resolution: "2K QHD Starlight AI", highlight: "Physical Shutter" },
      { name: "Tapo TC70", resolution: "1080p FHD Pan/Tilt", highlight: "Verified" },
      { name: "Tapo TC71", resolution: "2K 3MP Pan/Tilt", highlight: "Verified" },
      { name: "Tapo TC72", resolution: "2K Pan/Tilt", highlight: "Verified" },
      { name: "Tapo TC73", resolution: "2K QHD Pan/Tilt", highlight: "Verified" },
    ],
  },
  {
    title: "Indoor Fixed & Compact Series",
    description: "Compact wall-mount, desktop, and magnetic base cameras",
    models: [
      { name: "Tapo C100", resolution: "1080p FHD Compact", highlight: "Popular" },
      { name: "Tapo C110", resolution: "2K 3MP Ultra HD", highlight: "Verified" },
      { name: "Tapo C111", resolution: "2K 3MP Compact", highlight: "Verified" },
      { name: "Tapo C120", resolution: "2K QHD (IP66 Indoor/Outdoor)", highlight: "Magnetic Base" },
      { name: "Tapo C125", resolution: "2K QHD AI Smart", highlight: "Physical Shutter" },
      { name: "Tapo TC60", resolution: "1080p Fixed Lens", highlight: "Verified" },
    ],
  },
  {
    title: "Outdoor Bullet & ColorPro Series",
    description: "Weatherproof IP66 bullet cameras with color and starlight night vision",
    models: [
      { name: "Tapo C310", resolution: "2K 3MP Outdoor Security", highlight: "Top Outdoor" },
      { name: "Tapo C320WS", resolution: "2K QHD 4MP Full-Color", highlight: "Verified" },
      { name: "Tapo C325WB", resolution: "2K ColorPro Low-Light", highlight: "ColorPro Tech" },
      { name: "Tapo TC65", resolution: "3MP Outdoor Bullet", highlight: "Verified" },
    ],
  },
  {
    title: "Outdoor Pan & Tilt PTZ Series (360°)",
    description: "Weatherproof 360° panoramic outdoor cameras with motorized pan/tilt controls",
    models: [
      { name: "Tapo C500", resolution: "1080p Outdoor 360° (IP65)", highlight: "Popular PTZ" },
      { name: "Tapo C510W", resolution: "2K 3MP Full-Color 360°", highlight: "Verified" },
      { name: "Tapo C520WS", resolution: "2K QHD 4MP Starlight PTZ", highlight: "Starlight Sensor" },
      { name: "Tapo TC40", resolution: "1080p Outdoor Pan/Tilt", highlight: "Verified" },
      { name: "Tapo TC41", resolution: "2K Outdoor Pan/Tilt", highlight: "Verified" },
    ],
  },
  {
    title: "Floodlight & Specialized Cameras",
    description: "Smart floodlight security and cellular-enabled models",
    models: [
      { name: "Tapo C720", resolution: "2K QHD Floodlight Camera", highlight: "Smart Floodlight" },
      { name: "Tapo C501GW", resolution: "3G/4G LTE Outdoor Pan/Tilt", highlight: "Cellular LTE" },
    ],
  },
];

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqItems: FAQItem[] = [
  {
    category: "Brand & Upgrade",
    question: "What happened to Tapo-Viewer, and will I lose my saved settings?",
    answer:
      "Tapo-Viewer is now called TapFeed. On first start, TapFeed automatically copies your existing Tapo-Viewer settings, saved passwords (from Windows Credential Manager), and language files, and keeps your downloaded recordings right where they are. Versions up to 1.1.3 are named Tapo-Viewer.exe; v2.0+ ships as TapFeed.exe.",
  },
  {
    category: "Performance Upgrade",
    question: "How much faster and smaller is TapFeed compared to Tapo-Viewer 1.x?",
    answer:
      "Measured on the same PC, TapFeed is a 62 MB download instead of 264 MB (~76% smaller), opens in about 3 seconds instead of 24 to 47 seconds, and no longer unpacks 610 MB into your Windows temp folder on every startup.",
  },
  {
    category: "Camera Compatibility",
    question: "Which TP-Link Tapo camera models are supported by TapFeed?",
    answer:
      "TapFeed works with virtually every mains-powered TP-Link Tapo camera that offers a Camera Account and RTSP live video. This includes 27+ models: Indoor (C100, C110, C111, C120, C125, C200, C210, C211, C212, C220, C225, TC60, TC70, TC71, TC72, TC73), Outdoor (C310, C320WS, C325WB, C500, C501GW, C510W, C520WS, C720, TC40, TC41, TC65). Pan and tilt controls appear automatically on models with a motor (such as C200, C210, C225, and C500).",
  },
  {
    category: "Two-Login System",
    question: "Why does TapFeed ask for both a Camera Account and an optional Tapo app password?",
    answer:
      "TP-Link Tapo cameras use two separate logins: (1) the Camera Account (created in Tapo app > Camera > Settings > Advanced settings > Camera Account) is used for live video, and (2) your Tapo app password (your TP-Link ID) is required by some cameras to list and download microSD recordings. If they differ, tick 'My Tapo app password is different' on the sign-in screen.",
  },
  {
    category: "Indoor & PTZ Models",
    question: "Does TapFeed support live view and pan/tilt on Tapo C200, C210, and C500?",
    answer:
      "Yes. TapFeed streams live HD or SD video directly inside the app window using hardware-accelerated mpv, with sound, fullscreen, and screenshot capture. On motorized models like Tapo C200, C210, C220, C225, C500, and C520WS, arrow buttons and saved PTZ positions appear automatically.",
  },
  {
    category: "Outdoor Models",
    question: "Can I monitor Tapo C310, C320WS, and outdoor bullet cameras on a Windows PC?",
    answer:
      "Yes. Tapo C310, C320WS, C325WB ColorPro, and TC65 outdoor bullet cameras connect over home Wi-Fi or Ethernet. TapFeed lets you switch between HD (stream1) and SD (stream2) live video and download microSD recordings directly to your Windows drive.",
  },
  {
    category: "Battery Cameras",
    question: "Are battery-powered Tapo cameras like Tapo C420, C400, or C425 supported?",
    answer:
      "No. Battery-powered Tapo cameras (such as Tapo C400, C420, C425, and battery doorbells) operate in low-power sleep mode and usually have no live video (RTSP) support. TapFeed requires mains-powered (plugged-in) Tapo cameras.",
  },
  {
    category: "Desktop App",
    question: "Is TapFeed free, and is there an official Tapo desktop app for Windows?",
    answer:
      "Yes, TapFeed is 100% free and open source under the MIT License. TP-Link does not provide an official standalone Windows PC application for Tapo cameras; TapFeed fills this gap natively on Windows 10 and 11 without requiring Android emulators like BlueStacks.",
  },
  {
    category: "MicroSD Downloads",
    question: "Can I download Tapo SD card recordings to my PC?",
    answer:
      "Yes. Pick a day marked on the SD card calendar and select Download. Recordings are saved one at a time as .ts video files with progress and cancel controls, which VLC, mpv, and most desktop media players open directly.",
  },
  {
    category: "Pricing & Plans",
    question: "Do I need Tapo Care or an active internet connection?",
    answer:
      "No. TapFeed reads the camera's own microSD card and streams live video directly over your home network, with zero cloud subscription required.",
  },
  {
    category: "Privacy & Security",
    question: "Is my camera password safe?",
    answer:
      "Passwords go only to your camera over your own network. If you tick Remember, they are kept in Windows Credential Manager—never in a plain text file. The only internet request is the optional update check to GitHub, which sends no camera details.",
  },
  {
    category: "Localization",
    question: "How can I translate TapFeed into my own language?",
    answer:
      "Each language is a single JSON file, so no coding is needed. To try a translation without building from source, open Settings > Open language folder in the app, copy _template.json to your language code (for example bn.json), translate the text (keeping keys and {braces}), and restart.",
  },
];

export const metadata: Metadata = {
  title: "TapFeed (Tapo-Viewer) — Tapo Camera Desktop App for Windows",
  description:
    "TapFeed (formerly Tapo-Viewer) is a free Windows 10/11 app for TP-Link Tapo cameras: live HD/SD view, SD card recording downloads, and pan and tilt.",
  keywords: [
    "TapFeed",
    "TapFeed.exe",
    "TapFeed download",
    "Tapo-Viewer",
    "Tapo Viewer download",
    "Tapo camera viewer for Windows",
    "Tapo desktop app",
    "Tapo app for desktop",
    "Tapo app for laptop",
    "Tapo camera software for Windows",
    "Tapo EXE download",
    "Tapo camera viewer for PC",
    "Tapo MicroSD recording download",
    "Tapo PTZ control Windows PC",
    "TP-Link Tapo Windows app",
    "Tapo C200 Windows app",
    "Tapo C310 PC viewer",
    "Tapo C500 desktop app",
    "Tapo C520WS PC app",
    "Tapo C210 Windows 11",
    "Tapo C100 RTSP PC",
    "Tapo C110 desktop",
    "Tapo C220 PC download",
    "Tapo C225 Windows",
    "Tapo C320WS desktop viewer",
    "Tapo C325WB PC app",
    "Tapo C120 PC app",
    "Tapo C125 desktop",
    "Tapo TC70 Windows",
    "Tapo TC65 PC viewer",
  ],
  alternates: { canonical: `${baseUrl}/projects/tapfeed` },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: `${baseUrl}/projects/tapfeed`,
    title: "TapFeed (formerly Tapo-Viewer) — Tapo Camera Viewer for Windows",
    description:
      "Tapo camera viewer for Windows: live HD/SD view, SD card recordings calendar, .ts downloads, and pan and tilt. 62 MB portable app, opens in ~3s.",
    images: [
      {
        url: "/projects/tapfeed/TapFeed.png",
        width: 1000,
        height: 1000,
        alt: "TapFeed logo: a white Tapo-style pan and tilt camera on a blue circle",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TapFeed (formerly Tapo-Viewer) — Tapo Camera Viewer for Windows",
    description:
      "Tapo camera viewer for Windows: live HD/SD view, SD card recordings calendar, .ts downloads, and pan and tilt.",
    images: ["/projects/tapfeed/TapFeed.png"],
  },
};

export default function TapFeedPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-white text-gray-900 dark:bg-black dark:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "TapFeed",
            alternateName: ["Tapo-Viewer", "TapFeed.exe", "Tapo-Viewer.exe"],
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
            "@type": "FAQPage",
            mainEntity: faqItems.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
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

      <div
        className="pointer-events-none fixed inset-0 z-0 md:left-64"
        aria-hidden="true"
      >
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-cyan-500/15 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-3 pt-1 pb-8 sm:px-5 sm:pt-2 sm:pb-10 lg:px-6 lg:pb-12">
        {/* Hero Section */}
        <section className="grid items-start gap-8 lg:grid-cols-[1.05fr_.95fr] lg:gap-10">
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1.5 text-xs font-semibold text-cyan-700 dark:border-cyan-900 dark:bg-cyan-950/50 dark:text-cyan-300">
                <Wifi className="h-3.5 w-3.5" aria-hidden="true" />
                Windows 10/11 · Local camera viewer
              </span>
              <span className="inline-flex items-center rounded-full border border-gray-200 bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300">
                v2.0 · Rust + Tauri 2 · Updated <time dateTime="2026-11-17">Nov 2026</time>
              </span>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              <Image
                src="/projects/tapfeed/TapFeed.png"
                alt="TapFeed logo: a white Tapo-style pan and tilt camera on a blue circle"
                width={80}
                height={80}
                className="h-14 w-14 shrink-0 rounded-2xl shadow-lg shadow-cyan-950/20 sm:h-16 sm:w-16"
              />
              <div>
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                  TapFeed
                </h1>
                <p className="mt-1 text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                  Previously named <strong>Tapo-Viewer</strong> (auto-migrates your saved settings &amp; passwords)
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm font-semibold text-cyan-600 dark:text-cyan-400">
              Tapo camera viewer for Windows: live view, SD card recordings, downloads, and pan and tilt.
            </p>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-300">
              TapFeed (previously named Tapo-Viewer) is a free, open-source Windows app for TP-Link Tapo security cameras. It shows the live video, lists the recordings on the camera&apos;s microSD card by day, downloads them to your PC, and turns pan and tilt cameras. It talks to the camera directly on your home network, with no cloud subscription.
            </p>

            {/* Citable Answer Capsule for LLM & Instant User Clarity */}
            <div className="mt-5 rounded-2xl border border-cyan-500/30 bg-cyan-500/5 p-4 sm:p-5 text-sm leading-relaxed text-gray-700 dark:text-gray-200 space-y-2">
              <strong className="block text-cyan-700 dark:text-cyan-300 font-semibold">
                Lighter &amp; Faster than Tapo-Viewer 1.x (Measured on the Same PC):
              </strong>
              <p>
                Built with <strong>Rust</strong>, <strong>Tauri 2</strong>, embedded <strong>mpv</strong>, and <strong>PyTapo v3.4.31</strong>, <strong>TapFeed.exe</strong> is a <strong>62 MB download instead of 264 MB</strong>, opens in <strong>about 3 seconds instead of 24 to 47 seconds</strong>, and no longer unpacks 610 MB into the temp folder on every start. On first launch, TapFeed automatically copies your existing Tapo-Viewer settings, saved passwords, and language files.
              </p>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={releaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-cyan-700"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Download TapFeed.exe (62 MB)
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
              <a
                href={repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition-colors hover:border-cyan-300 hover:text-cyan-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200 dark:hover:border-cyan-800 dark:hover:text-cyan-300"
              >
                View source on GitHub
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
            <p className="mt-2.5 text-xs text-gray-500 dark:text-gray-400">
              1. Get <code>TapFeed.exe</code> from Releases (versions up to 1.1.3 are named <code>Tapo-Viewer.exe</code>). 2. Double-click it—nothing to install.
            </p>
          </div>

          <figure className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 shadow-xl shadow-cyan-950/10 dark:border-gray-800 dark:bg-gray-950">
            <Image
              src={screenshots.feed}
              alt="TapFeed camera screen: Tapo live view, a month calendar marking days with SD card recordings, and the list of that day's recordings"
              width={1366}
              height={768}
              priority
              fetchPriority="high"
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="h-auto w-full"
            />
            <figcaption className="border-t border-gray-200 bg-white/90 px-4 py-2.5 text-xs text-gray-500 dark:border-gray-800 dark:bg-gray-900/90 dark:text-gray-400">
              <strong>Camera screen:</strong> Tapo live view, month calendar marking days with SD card recordings, and that day&apos;s recordings.
            </figcaption>
          </figure>
        </section>

        {/* Core Value Pillars */}
        <section aria-label="Key capabilities" className="mt-16 rounded-2xl border border-gray-200 bg-gray-50/80 p-5 dark:border-gray-800 dark:bg-gray-900/50 sm:p-7">
          <div className="grid gap-5 md:grid-cols-3">
            <div className="flex gap-3">
              <Play className="mt-0.5 h-5 w-5 shrink-0 text-cyan-600 dark:text-cyan-400" aria-hidden="true" />
              <div>
                <h2 className="text-base font-semibold">Built-in live view &amp; PTZ</h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Watch live HD or SD video with sound, fullscreen, screenshots, and motorized pan/tilt right inside the app.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <HardDrive className="mt-0.5 h-5 w-5 shrink-0 text-cyan-600 dark:text-cyan-400" aria-hidden="true" />
              <div>
                <h2 className="text-base font-semibold">MicroSD calendar &amp; downloads</h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Pick any marked day on the calendar to play or save clips as <code>.ts</code> files without Tapo Care cloud fees.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-cyan-600 dark:text-cyan-400" aria-hidden="true" />
              <div>
                <h2 className="text-base font-semibold">100% local camera traffic</h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Talks directly to your camera over your home network. Passwords stay in Windows Credential Manager only if you ask.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Screens Showcase (Sign in, Camera, Downloads) */}
        <section className="mt-16">
          <div className="max-w-2xl mb-7">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Inside TapFeed: Sign In, Live Camera &amp; Downloads
            </h2>
            <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
              Double-click the portable executable—nothing to install. Every screen is designed for clarity, keyboard accessibility, and instant local diagnostics.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <figure className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900/60 flex flex-col justify-between">
              <div className="overflow-hidden bg-gray-100 dark:bg-gray-950">
                <Image
                  src={screenshots.login}
                  alt="TapFeed sign-in screen: camera IP address with a Test button, Camera Account username and password, optional Tapo app password"
                  width={1366}
                  height={768}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="h-auto w-full"
                />
              </div>
              <figcaption className="p-4 sm:p-5 border-t border-gray-200 dark:border-gray-800">
                <h3 className="font-semibold text-base text-gray-900 dark:text-white">
                  1. Sign in with instant IP connection test
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Enter your camera&apos;s IP address and click <strong>Test</strong> to verify live video and control ports before signing in with your Camera Account and optional Tapo app password.
                </p>
              </figcaption>
            </figure>

            <figure className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900/60 flex flex-col justify-between">
              <div className="overflow-hidden bg-gray-100 dark:bg-gray-950">
                <Image
                  src={screenshots.downloads}
                  alt="TapFeed downloads screen: saved Tapo recordings with progress, play and show in folder"
                  width={1366}
                  height={768}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="h-auto w-full"
                />
              </div>
              <figcaption className="p-4 sm:p-5 border-t border-gray-200 dark:border-gray-800">
                <h3 className="font-semibold text-base text-gray-900 dark:text-white">
                  2. Downloads queue with progress &amp; direct playback
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Recordings are saved as <code>.ts</code> video files one at a time, with progress tracking, cancel, play, and show in folder.
                </p>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Features Grid */}
        <section className="mt-16">
          <div className="max-w-2xl">
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              Features built for daily reliability
            </h2>
          </div>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900/60"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
                  {feature.icon}
                </div>
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {feature.text}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Before You Connect: Two-Login Architecture Table (From README) */}
        <section className="mt-16">
          <div className="max-w-3xl mb-6">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Before You Connect: Understanding Tapo&apos;s Two Logins
            </h2>
            <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
              Tapo cameras use two separate logins. TapFeed may need both depending on your camera&apos;s firmware.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900/60 shadow-sm">
            <table className="w-full text-left text-xs sm:text-sm">
              <caption className="sr-only">
                Comparison between Tapo Camera Account and Tapo app password credentials
              </caption>
              <thead className="border-b border-gray-200 bg-gray-50/80 dark:border-gray-800 dark:bg-gray-950/60 text-gray-500 dark:text-gray-400">
                <tr>
                  <th scope="col" className="p-3 sm:p-4 font-semibold">Aspect</th>
                  <th scope="col" className="p-3 sm:p-4 font-semibold text-cyan-700 dark:text-cyan-300">Camera Account</th>
                  <th scope="col" className="p-3 sm:p-4 font-semibold text-blue-700 dark:text-blue-300">Tapo App Password</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60">
                <tr>
                  <th scope="row" className="p-3 sm:p-4 font-semibold text-gray-900 dark:text-white">What</th>
                  <td className="p-3 sm:p-4 text-gray-700 dark:text-gray-300">A username and password made inside the camera&apos;s settings</td>
                  <td className="p-3 sm:p-4 text-gray-700 dark:text-gray-300">The password you use to sign in to the official Tapo mobile app</td>
                </tr>
                <tr>
                  <th scope="row" className="p-3 sm:p-4 font-semibold text-gray-900 dark:text-white">Where</th>
                  <td className="p-3 sm:p-4 text-gray-700 dark:text-gray-300">Tapo app &rarr; Camera &rarr; Settings &rarr; Advanced settings &rarr; Camera Account</td>
                  <td className="p-3 sm:p-4 text-gray-700 dark:text-gray-300">Your TP-Link ID account</td>
                </tr>
                <tr>
                  <th scope="row" className="p-3 sm:p-4 font-semibold text-gray-900 dark:text-white">Used for</th>
                  <td className="p-3 sm:p-4 text-emerald-700 dark:text-emerald-400 font-medium">Live video (RTSP stream)</td>
                  <td className="p-3 sm:p-4 text-emerald-700 dark:text-emerald-400 font-medium">Listing and downloading MicroSD recordings on some cameras</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50/70 p-4 text-xs sm:text-sm text-gray-600 dark:border-gray-800 dark:bg-gray-900/40 dark:text-gray-300 space-y-2">
            <p>
              <strong>Finding your camera IP:</strong> The camera&apos;s IP address is in the Tapo app under <strong>Device info</strong>. Use <strong>Test</strong> beside the IP field in TapFeed to check connectivity before signing in. If your Tapo app password differs from your Camera Account password, tick <strong>My Tapo app password is different</strong>.
            </p>
            <p>
              <strong>Note on battery cameras:</strong> Battery-powered cameras usually have no live video (RTSP) support. See{" "}
              <a
                href="https://www.tp-link.com/us/support/faq/4465/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-cyan-600 hover:underline dark:text-cyan-400"
              >
                TP-Link&apos;s official RTSP compatibility list
              </a>
              .
            </p>
          </div>
        </section>

        {/* Problem vs Alternative Comparison Matrix for Search Intent */}
        <section className="mt-16">
          <div className="max-w-2xl mb-6">
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              How TapFeed Compares to Other Methods
            </h2>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900/60 shadow-sm">
            <table className="w-full text-left text-xs sm:text-sm">
              <caption className="sr-only">
                Comparison of TapFeed against Official Tapo Mobile App, Android Emulators, and manual SD card removal
              </caption>
              <thead className="border-b border-gray-200 bg-gray-50/80 dark:border-gray-800 dark:bg-gray-950/60 text-gray-500 dark:text-gray-400">
                <tr>
                  <th scope="col" className="p-3 sm:p-4 font-semibold">Solution</th>
                  <th scope="col" className="p-3 sm:p-4 font-semibold">PC Live Stream &amp; PTZ</th>
                  <th scope="col" className="p-3 sm:p-4 font-semibold">MicroSD Downloads</th>
                  <th scope="col" className="p-3 sm:p-4 font-semibold">Monthly Cost</th>
                  <th scope="col" className="p-3 sm:p-4 font-semibold">Resource Overhead</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60">
                <tr className="bg-cyan-50/40 dark:bg-cyan-950/20 font-medium">
                  <th scope="row" className="p-3 sm:p-4 text-cyan-700 dark:text-cyan-300 font-bold">
                    TapFeed 2.0 (Windows 10/11)
                  </th>
                  <td className="p-3 sm:p-4 text-emerald-600 dark:text-emerald-400">
                    ✓ Built-in HD/SD mpv + Pan/Tilt
                  </td>
                  <td className="p-3 sm:p-4 text-emerald-600 dark:text-emerald-400">
                    ✓ Direct .ts over Wi-Fi (No SD pull)
                  </td>
                  <td className="p-3 sm:p-4 text-emerald-600 dark:text-emerald-400">
                    Free / Open Source (MIT)
                  </td>
                  <td className="p-3 sm:p-4">62 MB · Opens in ~3s (Rust + Tauri 2)</td>
                </tr>
                <tr>
                  <th scope="row" className="p-3 sm:p-4 font-semibold">
                    Tapo-Viewer 1.x (Legacy Python)
                  </th>
                  <td className="p-3 sm:p-4">External player / Tkinter</td>
                  <td className="p-3 sm:p-4">✓ Over Wi-Fi</td>
                  <td className="p-3 sm:p-4">Free / Open Source (MIT)</td>
                  <td className="p-3 sm:p-4 text-amber-600">264 MB · 24–47s start (610 MB temp unpack)</td>
                </tr>
                <tr>
                  <th scope="row" className="p-3 sm:p-4 font-semibold">
                    Official Tapo Mobile App
                  </th>
                  <td className="p-3 sm:p-4 text-amber-600">Mobile-only (Phone screen)</td>
                  <td className="p-3 sm:p-4 text-amber-600">Slow manual phone saves</td>
                  <td className="p-3 sm:p-4">Free / Tapo Care ($3.49/mo)</td>
                  <td className="p-3 sm:p-4">Phone battery dependent</td>
                </tr>
                <tr>
                  <th scope="row" className="p-3 sm:p-4 font-semibold">
                    Android Emulators (BlueStacks)
                  </th>
                  <td className="p-3 sm:p-4">✓ Emulated Android window</td>
                  <td className="p-3 sm:p-4 text-rose-500">Complex shared folders</td>
                  <td className="p-3 sm:p-4">Free (with ads)</td>
                  <td className="p-3 sm:p-4 text-rose-500">Heavy (2–4GB RAM, high CPU)</td>
                </tr>
                <tr>
                  <th scope="row" className="p-3 sm:p-4 font-semibold">
                    Pulling SD Card Manually
                  </th>
                  <td className="p-3 sm:p-4 text-rose-500">✗ No live feed</td>
                  <td className="p-3 sm:p-4">✓ Physical card reader</td>
                  <td className="p-3 sm:p-4">Hardware reader cost</td>
                  <td className="p-3 sm:p-4 text-rose-500">Physical dismount of camera</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Full Comprehensive Supported Camera Models Section */}
        <section className="mt-16">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700 dark:border-cyan-900 dark:bg-cyan-950/50 dark:text-cyan-300 mb-3">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" />
              27+ Camera Models Verified
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Every Supported TP-Link Tapo Camera
            </h2>
            <p className="mt-2 text-base text-gray-600 dark:text-gray-400 leading-relaxed">
              TapFeed connects directly to any mains-powered TP-Link Tapo camera equipped with a local Camera Account (RTSP/ONVIF). Whether you have an indoor pan/tilt model, a 2K QHD outdoor bullet, or a 360° PTZ camera, your device is fully compatible.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {supportedCameraCategories.map((cat) => (
              <div
                key={cat.title}
                className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 dark:border-gray-800 dark:bg-gray-900/60 shadow-sm"
              >
                <div className="border-b border-gray-100 dark:border-gray-800/80 pb-3 mb-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {cat.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {cat.models.map((m) => (
                    <div
                      key={m.name}
                      className="flex items-center justify-between p-2.5 rounded-xl border border-gray-100 dark:border-gray-800/60 bg-gray-50/70 dark:bg-gray-950/40"
                    >
                      <div>
                        <span className="block font-semibold text-sm text-gray-900 dark:text-white">
                          {m.name}
                        </span>
                        <span className="block text-[11px] text-gray-500 dark:text-gray-400">
                          {m.resolution}
                        </span>
                      </div>
                      <span className="shrink-0 text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
                        {m.highlight || "Verified"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 rounded-xl border border-cyan-200 dark:border-cyan-900/40 bg-cyan-50/50 dark:bg-cyan-950/20 text-xs sm:text-sm text-gray-600 dark:text-gray-300 flex items-center justify-between flex-wrap gap-2">
            <span>
              <strong>Have another Tapo model?</strong> As long as your camera supports creating a <em>Camera Account</em> in the official Tapo mobile app (Advanced Settings &gt; Camera Account), TapFeed will stream live video and download MicroSD recordings directly.
            </span>
          </div>
        </section>

        {/* Build from Source & Languages Section */}
        <section className="mt-16 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-gray-950 p-6 sm:p-8 text-gray-100 dark:border-gray-800 flex flex-col justify-between">
            <div>
              <p className="text-xs font-semibold text-cyan-400">Build from source</p>
              <h2 className="mt-2 text-2xl font-bold text-white">
                Rust + Tauri 2 + PyTapo (Windows 10/11)
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-400">
                Needs Rust (MSVC), Visual Studio 2022 C++ Build Tools, Python 3.10+ with{" "}
                <code className="rounded bg-white/10 px-1.5 py-0.5 text-gray-200 font-mono">
                  pip install -r requirements.txt pyinstaller
                </code>
                , and a 64-bit{" "}
                <code className="rounded bg-white/10 px-1.5 py-0.5 text-gray-200 font-mono">
                  libmpv-2.dll
                </code>{" "}
                in <code className="rounded bg-white/10 px-1.5 py-0.5 text-gray-200 font-mono">vendor/libmpv/</code>.
              </p>
              <pre
                role="region"
                aria-label="Build from source commands"
                tabIndex={0}
                className="mt-5 overflow-x-auto rounded-xl border border-white/10 bg-black/40 p-4 text-xs font-mono leading-relaxed text-cyan-100"
              >
                <code>{`git clone ${cloneUrl}\ncd TapFeed\nbuild_desktop.bat`}</code>
              </pre>
            </div>
            <div className="mt-5 flex items-start gap-2 text-xs sm:text-sm text-gray-400">
              <Terminal className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" aria-hidden="true" />
              <span>
                Output: <code className="rounded bg-white/10 px-1.5 py-0.5 text-gray-200 font-mono">dist\TapFeed.exe</code>. To update PyTapo, run{" "}
                <code className="rounded bg-white/10 px-1.5 py-0.5 text-gray-200 font-mono">
                  .venv\Scripts\pip install -U pytapo
                </code>
                , then run <code className="rounded bg-white/10 px-1.5 py-0.5 text-gray-200 font-mono">build_desktop.bat</code> again.
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 dark:border-gray-800 dark:bg-gray-900/60 flex flex-col justify-between">
            <div>
              <p className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                Community Localization
              </p>
              <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                Add Your Language (No Coding Needed)
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                Every piece of text in TapFeed comes from a single JSON file per language, making community translations effortless:
              </p>
              <ol className="mt-4 space-y-2.5 text-xs sm:text-sm text-gray-700 dark:text-gray-300 list-decimal list-inside">
                <li>
                  Copy{" "}
                  <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 font-mono">
                    desktop/ui/locales/en.json
                  </code>{" "}
                  to your language code (for example{" "}
                  <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 font-mono">
                    bn.json
                  </code>
                  ).
                </li>
                <li>
                  Translate the text values while keeping the keys and any{" "}
                  <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 font-mono">
                    {"{braces}"}
                  </code>{" "}
                  placeholders intact.
                </li>
                <li>
                  Add your language entry to{" "}
                  <code className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 font-mono">
                    desktop/ui/locales/index.json
                  </code>{" "}
                  and open a pull request on GitHub.
                </li>
              </ol>
            </div>
            <p className="mt-5 rounded-xl border border-gray-100 bg-gray-50 p-3.5 text-xs text-gray-600 dark:border-gray-800 dark:bg-gray-950/50 dark:text-gray-400">
              <strong>Try without building:</strong> Open <strong>Settings &rarr; Open language folder</strong> inside TapFeed, copy <code>_template.json</code> to your language code, translate it, and restart the app.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mt-16">
          <div className="max-w-3xl mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              TapFeed (Tapo-Viewer) &amp; Camera Compatibility FAQ
            </h2>
            <p className="mt-2 text-base text-gray-600 dark:text-gray-400 leading-relaxed">
              Answers regarding the Tapo-Viewer to TapFeed upgrade, supported TP-Link Tapo camera models, two-login authentication, pan &amp; tilt, and MicroSD card recording downloads.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {faqItems.map((item) => (
              <article
                key={item.question}
                className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 dark:border-gray-800 dark:bg-gray-900/60 shadow-sm transition hover:border-cyan-200 dark:hover:border-cyan-900/60"
              >
                <div>
                  <div className="mb-2.5">
                    <span className="inline-block rounded-md bg-cyan-50 px-2.5 py-0.5 text-[11px] font-semibold text-cyan-700 dark:bg-cyan-950/60 dark:text-cyan-300 border border-cyan-200/60 dark:border-cyan-900/40">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="font-semibold text-base leading-snug text-gray-900 dark:text-white">
                    {item.question}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                    {item.answer}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Credits & Support Section */}
        <section className="mt-16 rounded-2xl border border-cyan-200 bg-cyan-50/70 p-6 dark:border-cyan-900 dark:bg-cyan-950/25 sm:p-8">
          <h2 className="text-xl font-bold">Powered by PyTapo &amp; mpv</h2>
          <p className="mt-3 max-w-4xl leading-relaxed text-gray-700 dark:text-gray-300">
            Camera connection is powered by{" "}
            <a
              href="https://github.com/JurajNyiri/pytapo"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-cyan-700 hover:underline dark:text-cyan-300"
            >
              PyTapo
            </a>{" "}
            from Juraj Nyíri, and hardware-accelerated video playback is powered by{" "}
            <a
              href="https://mpv.io"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-cyan-700 hover:underline dark:text-cyan-300"
            >
              mpv
            </a>
            . Made by{" "}
            <a
              href="https://github.com/zaifears"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-cyan-700 hover:underline dark:text-cyan-300"
            >
              Shahoriar Hossain
            </a>{" "}
            under the MIT License. TapFeed is not affiliated with TP-Link; Tapo is a trademark of TP-Link.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm font-semibold">
            <Link
              href="/thanks"
              className="inline-flex items-center gap-1.5 text-cyan-700 hover:underline dark:text-cyan-300"
            >
              Loved the project? Buy me a coffee! &rarr;
            </Link>
            <a
              href={issuesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-gray-600 hover:underline dark:text-gray-400"
            >
              Report a bug on GitHub <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
