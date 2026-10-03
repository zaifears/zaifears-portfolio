import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Download,
  ExternalLink,
  FolderDown,
  HardDrive,
  MonitorPlay,
  Play,
  ShieldCheck,
  Terminal,
  Video,
  Wifi,
} from "lucide-react";

const baseUrl = "https://shahoriar.bd";
const repositoryUrl = "https://github.com/zaifears/tapo-viewer";
const releaseUrl = `${repositoryUrl}/releases/latest`;

const features = [
  {
    icon: <MonitorPlay className="h-5 w-5" />,
    title: "Direct RTSP live stream",
    text: "Launch a live feed in mpv.net, PotPlayer, VLC, or FFplay with hardware acceleration and no command-prompt popups.",
  },
  {
    icon: <CalendarDays className="h-5 w-5" />,
    title: "Recording calendar",
    text: "A custom calendar marks dates with recordings stored on the camera’s MicroSD card.",
  },
  {
    icon: <Video className="h-5 w-5" />,
    title: "Batch motion timeline",
    text: "Browse a smooth scrolling list of motion-triggered and continuous-recording events.",
  },
  {
    icon: <Download className="h-5 w-5" />,
    title: "Automatic MP4 conversion",
    text: "Downloaded clips are remuxed to standard MP4 with AAC audio; a TS fallback is available when FFmpeg is not installed.",
  },
  {
    icon: <FolderDown className="h-5 w-5" />,
    title: "Download manager & save locations",
    text: "A persistent bottom bar shows progress and cancellation controls, while recordings can be saved to any drive, external disk, or network-share folder.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Privacy by default",
    text: "The app communicates directly with the camera over home Wi‑Fi/LAN, and credentials are not saved unless the save option is explicitly selected.",
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
    description: "Full motorized pan/tilt rotation, motion tracking, and two-way audio",
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
    description: "Weatherproof 360° panoramic outdoor cameras with motion following",
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
    category: "Camera Compatibility",
    question: "Which TP-Link Tapo camera models are supported by Tapo-Viewer?",
    answer:
      "Tapo-Viewer works with virtually every TP-Link Tapo camera that supports local Camera Accounts (RTSP/ONVIF). This includes 27+ models: Tapo C200, C210, C211, C212, C220, C225, TC70, TC71, TC72, TC73 (Indoor Pan/Tilt); Tapo C100, C110, C111, C120, C125, TC60 (Indoor Fixed); Tapo C310, C320WS, C325WB, TC65 (Outdoor Bullet); Tapo C500, C510W, C520WS, TC40, TC41 (Outdoor PTZ); and Tapo C720, C501GW. Any Tapo camera with local camera account support in the official mobile app will connect seamlessly.",
  },
  {
    category: "Indoor Models",
    question: "Does Tapo-Viewer work with Tapo C200 and Tapo C210 on Windows?",
    answer:
      "Yes, Tapo C200 and C210 are 100% compatible and extensively tested. You can stream live 1080p (C200) and 2K 3MP (C210) RTSP feeds directly to Windows players (VLC, mpv.net, PotPlayer) with low latency. You can also view MicroSD recording dates on the visual calendar and download motion events without a cloud subscription.",
  },
  {
    category: "Outdoor Models",
    question: "Can I monitor Tapo C310, C320WS, and outdoor bullet cameras on PC?",
    answer:
      "Yes. Tapo C310, C320WS, C325WB ColorPro, and TC65 outdoor bullet cameras connect via Wi-Fi or Ethernet cable. Tapo-Viewer allows streaming both High-Definition (stream1 2K/3MP) and standard definition (stream2 360p) RTSP feeds, as well as downloading weatherproof MicroSD security clips directly to your Windows drive.",
  },
  {
    category: "PTZ Models",
    question: "Is Tapo C500 and C520WS 360° outdoor PTZ supported?",
    answer:
      "Yes. Tapo C500, C510W, C520WS, and TC40/TC41 outdoor pan/tilt cameras are completely compatible for live RTSP streaming and MicroSD card recording downloads over your home network.",
  },
  {
    category: "Compatibility",
    question: "Are battery-powered Tapo cameras like Tapo C420, C400, or C425 supported?",
    answer:
      "No. Wire-free battery-powered Tapo cameras (such as Tapo C400, C420, C425, and battery doorbells) operate in an aggressive low-power sleep mode to conserve battery. They do not maintain active RTSP/ONVIF streams or allow local Camera Account connections. Tapo-Viewer requires mains-powered (plugged-in) Tapo cameras.",
  },
  {
    category: "Desktop App",
    question: "Is there an official Tapo desktop app for Windows laptops and PCs?",
    answer:
      "TP-Link does not offer an official standalone Windows PC desktop software for Tapo cameras. Tapo-Viewer bridges this gap: it is an independent, native 64-bit Windows 10/11 application that connects locally to your cameras without requiring resource-heavy Android emulators like BlueStacks.",
  },
  {
    category: "Setup Guide",
    question: "How do I create a Camera Account in the Tapo mobile app?",
    answer:
      "Open the official TP-Link Tapo mobile app, tap your camera to open its live feed, tap the gear icon (Device Settings) in the upper right, navigate to Advanced Settings > Camera Account, and create a local username and password. Enter those credentials and your camera's local IP address into Tapo-Viewer to connect.",
  },
  {
    category: "Download & Install",
    question: "Where can I download the standalone Tapo-Viewer EXE?",
    answer:
      "Download the pre-compiled Tapo-Viewer.exe (v1.1.1, ~262MB) directly from the GitHub Releases page. It is a portable executable bundled with Python runtime, PyTapo, UI assets, and dependencies—no installation or terminal setup required.",
  },
  {
    category: "MicroSD Downloads",
    question: "Can Tapo-Viewer download recordings without removing the MicroSD card?",
    answer:
      "Yes. Tapo-Viewer queries the camera's internal MicroSD card over Wi-Fi, displays recorded dates on an interactive calendar, lists motion detection timestamps, and downloads clips directly to your computer. When FFmpeg is installed on your PC, clips are automatically remuxed to standard MP4 with AAC audio.",
  },
  {
    category: "Pricing & Plans",
    question: "Do I need a paid Tapo Care cloud subscription to use Tapo-Viewer?",
    answer:
      "No. Tapo-Viewer communicates directly with your camera over your local home Wi-Fi or LAN network. It bypasses TP-Link cloud servers entirely, allowing you to watch live feeds and download recordings from your local MicroSD card for free.",
  },
  {
    category: "Privacy & Security",
    question: "Does Tapo-Viewer work offline, and does it send footage to third parties?",
    answer:
      "Tapo-Viewer is 100% local and privacy-first. All video streams and downloads transfer directly between your camera's local IP address and your PC over your local network. No video data or credentials are ever transmitted to third-party cloud servers or telemetry trackers.",
  },
  {
    category: "Multi-Camera",
    question: "Can I monitor multiple Tapo cameras simultaneously on PC?",
    answer:
      "Yes. You can open multiple live stream windows in lightweight desktop media players (such as mpv.net, VLC, or PotPlayer) arranged side-by-side or across multi-monitor setups for a dedicated home or office security monitoring station.",
  },
];

export const metadata: Metadata = {
  title: "Tapo Desktop App for Windows — Tapo-Viewer",
  description:
    "Tapo-Viewer is a Windows 10/11 desktop app for Tapo cameras: watch local live feeds, browse MicroSD recordings, and download clips. Standalone EXE available.",
  keywords: [
    "Tapo desktop app",
    "Tapo app for desktop",
    "Tapo app for laptop",
    "Tapo camera software for Windows",
    "Tapo EXE download",
    "Tapo Viewer download",
    "Tapo camera viewer for PC",
    "Tapo MicroSD recording download",
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
  alternates: { canonical: `${baseUrl}/projects/tapo-viewer` },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: `${baseUrl}/projects/tapo-viewer`,
    title: "Tapo Desktop App for Windows — Tapo-Viewer",
    description: "Watch local live Tapo camera feeds and download MicroSD recordings on Windows 10/11.",
    images: [
      {
        url: "/projects/tapo-viewer/tapo-viewer_logo.png",
        width: 1024,
        height: 1024,
        alt: "Tapo-Viewer logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tapo Desktop App for Windows — Tapo-Viewer",
    description: "Watch local live Tapo camera feeds and download MicroSD recordings on Windows 10/11.",
    images: ["/projects/tapo-viewer/tapo-viewer_logo.png"],
  },
};

export default function TapoViewerPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-gray-900 dark:bg-black dark:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Tapo-Viewer",
            url: `${baseUrl}/projects/tapo-viewer`,
            applicationCategory: "MultimediaApplication",
            operatingSystem: "Windows 10, Windows 11 (64-bit)",
            softwareVersion: "1.1.1",
            fileSize: "262MB",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            author: { "@type": "Person", name: "Shahoriar Hossain", url: baseUrl },
            codeRepository: repositoryUrl,
            license: `${repositoryUrl}/blob/main/LICENSE`,
            downloadUrl: releaseUrl,
            image: `${baseUrl}/projects/tapo-viewer/tapo-viewer_logo.png`,
            screenshot: [
              `${baseUrl}/images/Homepage.png`,
              `${baseUrl}/images/Login.png`,
            ],
            featureList: features.map((feature) => feature.title),
            requirements: "Windows 10/11 64-bit, local Wi-Fi or LAN connection, compatible TP-Link Tapo camera",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How to watch Tapo camera live feed and download recordings on Windows PC",
            description: "Step-by-step guide to streaming live Tapo camera feeds via RTSP and downloading MicroSD recordings directly to a Windows 10 or 11 computer using Tapo-Viewer.",
            totalTime: "PT3M",
            step: [
              {
                "@type": "HowToStep",
                position: 1,
                name: "Create a Camera Account in Tapo App",
                text: "Open the official TP-Link Tapo mobile app, go to Camera Settings > Advanced Settings > Camera Account, and configure a local username and password.",
              },
              {
                "@type": "HowToStep",
                position: 2,
                name: "Launch Tapo-Viewer on Windows",
                text: "Run Tapo-Viewer.exe on Windows 10 or 11. Enter your camera's local IP address and the Camera Account credentials.",
              },
              {
                "@type": "HowToStep",
                position: 3,
                name: "Watch Live RTSP Feed or Browse Calendar",
                text: "Click Live Stream to launch the feed in VLC, mpv.net, or PotPlayer, or click any highlighted date on the calendar to load recorded motion events.",
              },
              {
                "@type": "HowToStep",
                position: 4,
                name: "Download Recordings to PC",
                text: "Select single or batch motion clips and click Download. Tapo-Viewer downloads the footage directly over local Wi-Fi and automatically remuxes to MP4.",
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
              { "@type": "ListItem", position: 2, name: "Projects", item: `${baseUrl}/projects` },
              { "@type": "ListItem", position: 3, name: "Tapo-Viewer", item: `${baseUrl}/projects/tapo-viewer` },
            ],
          }),
        }}
      />

      <div className="pointer-events-none fixed inset-0 z-0 md:left-64" aria-hidden="true">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-cyan-500/15 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-7 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
        <Link
          href="/projects"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-cyan-600 dark:text-gray-400 dark:hover:text-cyan-400"
        >
          <ArrowLeft className="h-4 w-4" />
          All projects
        </Link>

        <section className="grid items-center gap-9 lg:grid-cols-[1.05fr_.95fr] lg:gap-12">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-700 dark:border-cyan-900 dark:bg-cyan-950/50 dark:text-cyan-300">
              <Wifi className="h-3.5 w-3.5" />
              Windows · Local camera viewer
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <Image
                src="/projects/tapo-viewer/tapo-viewer_logo.png"
                alt="Tapo-Viewer logo"
                width={80}
                height={80}
                priority
                className="h-14 w-14 shrink-0 rounded-2xl shadow-lg shadow-cyan-950/20 sm:h-16 sm:w-16"
              />
              <h1 className="shrink-0 whitespace-nowrap text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Tapo-Viewer
              </h1>
            </div>
            <p className="mt-4 text-sm font-semibold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
              Desktop app for Tapo cameras on Windows
            </p>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-300">
              A modern Windows desktop app for playing live Tapo camera feeds and downloading recorded clips directly from a camera’s MicroSD card.
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              Looking for a Tapo app for a laptop or Windows PC? Tapo-Viewer connects to compatible cameras over home Wi‑Fi or LAN, keeping the workflow local rather than sending footage to third-party servers.
            </p>

            {/* Citable Answer Capsule for LLM & Instant User Clarity */}
            <div className="mt-5 rounded-2xl border border-cyan-500/30 bg-cyan-500/5 p-4 sm:p-5 text-sm leading-relaxed text-gray-700 dark:text-gray-200">
              <strong className="block text-cyan-700 dark:text-cyan-300 font-semibold mb-1">
                Direct Solution:
              </strong>
              <p>
                <strong>Tapo-Viewer</strong> is a free, standalone Windows 10/11 desktop application for TP-Link Tapo security cameras. It enables local RTSP live video streaming in 1080p/2K, MicroSD card recording playback, and batch MP4 clip downloads over home Wi-Fi — with zero cloud subscriptions (no Tapo Care required), no Android emulators (BlueStacks), and without having to remove the physical SD card from the camera.
              </p>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={releaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-cyan-700"
              >
                <Download className="h-4 w-4" />
                Download standalone .exe
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <a
                href={repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition-colors hover:border-cyan-300 hover:text-cyan-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200 dark:hover:border-cyan-800 dark:hover:text-cyan-300"
              >
                View source on GitHub
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 shadow-xl shadow-cyan-950/10 dark:border-gray-800 dark:bg-gray-950">
            <Image
              src="/images/Homepage.png"
              alt="Tapo-Viewer dashboard showing a recording calendar, timeline, live feed controls, and download manager"
              width={1366}
              height={768}
              priority
              className="h-auto w-full"
            />
          </div>
        </section>

        <section className="mt-16 rounded-2xl border border-gray-200 bg-gray-50/80 p-5 dark:border-gray-800 dark:bg-gray-900/50 sm:p-7">
          <div className="grid gap-5 md:grid-cols-3">
            <div className="flex gap-3">
              <Play className="mt-0.5 h-5 w-5 shrink-0 text-cyan-600 dark:text-cyan-400" />
              <div><h2 className="font-semibold">Watch live</h2><p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Open a live 1080p RTSP feed in your preferred desktop player.</p></div>
            </div>
            <div className="flex gap-3">
              <HardDrive className="mt-0.5 h-5 w-5 shrink-0 text-cyan-600 dark:text-cyan-400" />
              <div><h2 className="font-semibold">Browse MicroSD recordings</h2><p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Find recording dates and motion events without relying on Tapo Care storage.</p></div>
            </div>
            <div className="flex gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-cyan-600 dark:text-cyan-400" />
              <div><h2 className="font-semibold">Stay local</h2><p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Camera communication happens over the local network, without third-party servers.</p></div>
            </div>
          </div>
        </section>

        {/* Problem vs Alternative Comparison Matrix for Search Intent */}
        <section className="mt-16">
          <div className="max-w-2xl mb-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">Why Use Tapo-Viewer</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">How It Compares to Other Methods</h2>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900/60 shadow-sm">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="border-b border-gray-200 bg-gray-50/80 dark:border-gray-800 dark:bg-gray-950/60 text-gray-500 dark:text-gray-400">
                <tr>
                  <th className="p-3 sm:p-4 font-semibold">Solution</th>
                  <th className="p-3 sm:p-4 font-semibold">PC Live Stream</th>
                  <th className="p-3 sm:p-4 font-semibold">MicroSD Downloads</th>
                  <th className="p-3 sm:p-4 font-semibold">Monthly Cost</th>
                  <th className="p-3 sm:p-4 font-semibold">Resource Overhead</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60">
                <tr className="bg-cyan-50/40 dark:bg-cyan-950/20 font-medium">
                  <td className="p-3 sm:p-4 text-cyan-700 dark:text-cyan-300 font-bold">Tapo-Viewer (Windows)</td>
                  <td className="p-3 sm:p-4 text-emerald-600 dark:text-emerald-400">✓ Native 1080p/2K RTSP</td>
                  <td className="p-3 sm:p-4 text-emerald-600 dark:text-emerald-400">✓ Over Wi-Fi (No SD pull)</td>
                  <td className="p-3 sm:p-4 text-emerald-600 dark:text-emerald-400">Free / Open Source</td>
                  <td className="p-3 sm:p-4">Minimal (~45MB RAM)</td>
                </tr>
                <tr>
                  <td className="p-3 sm:p-4 font-semibold">Official Tapo Mobile App</td>
                  <td className="p-3 sm:p-4 text-amber-600">Mobile-only (Phone screen)</td>
                  <td className="p-3 sm:p-4 text-amber-600">Slow manual phone saves</td>
                  <td className="p-3 sm:p-4">Free / Tapo Care ($3.49/mo)</td>
                  <td className="p-3 sm:p-4">Phone battery dependent</td>
                </tr>
                <tr>
                  <td className="p-3 sm:p-4 font-semibold">Android Emulators (BlueStacks)</td>
                  <td className="p-3 sm:p-4">✓ Emulated Android window</td>
                  <td className="p-3 sm:p-4 text-rose-500">Complex shared folders</td>
                  <td className="p-3 sm:p-4">Free (with ads)</td>
                  <td className="p-3 sm:p-4 text-rose-500">Heavy (2-4GB RAM, high CPU)</td>
                </tr>
                <tr>
                  <td className="p-3 sm:p-4 font-semibold">Pulling SD Card Manually</td>
                  <td className="p-3 sm:p-4 text-rose-500">✗ No live feed</td>
                  <td className="p-3 sm:p-4">✓ Physical card reader</td>
                  <td className="p-3 sm:p-4">Hardware reader cost</td>
                  <td className="p-3 sm:p-4 text-rose-500">Physical dismount of camera</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-16">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">Built for the desktop</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">Everything documented in the app</h2>
          </div>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <article key={feature.title} className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900/60">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">{feature.icon}</div>
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{feature.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16 grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-gray-950">
            <Image
              src="/images/Login.png"
              alt="Tapo-Viewer onboarding screen for camera credentials, MicroSD access, and preferred media player"
              width={1366}
              height={768}
              className="h-auto w-full"
            />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">Connection setup</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">A focused onboarding flow</h2>
            <p className="mt-4 leading-relaxed text-gray-600 dark:text-gray-400">
              Enter camera credentials, choose whether cloud-password authentication is needed for MicroSD downloads, and select the media player to use for live streams. The interface is designed for standard 1366×768 laptop displays and high-DPI monitors, with F11 fullscreen support.
            </p>
          </div>
        </section>

        {/* Full Comprehensive Supported Camera Models Section */}
        <section className="mt-16">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-700 dark:border-cyan-900 dark:bg-cyan-950/50 dark:text-cyan-300 mb-3">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
              27+ Camera Models Verified
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Every Supported TP-Link Tapo Camera
            </h2>
            <p className="mt-2 text-base text-gray-600 dark:text-gray-400 leading-relaxed">
              Tapo-Viewer connects directly to any TP-Link Tapo camera equipped with a local Camera Account (RTSP/ONVIF). Whether you have an indoor pan/tilt model, a 2K QHD outdoor bullet, or a 360° PTZ camera, your device is fully compatible.
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
              <strong>Have another Tapo model?</strong> As long as your camera supports creating a <em>Camera Account</em> in the official Tapo mobile app (Advanced Settings &gt; Camera Account), Tapo-Viewer will stream live video and pull MicroSD recordings directly.
            </span>
          </div>
        </section>

        {/* Developer Setup Section */}
        <section className="mt-16">
          <div className="rounded-2xl border border-gray-200 bg-gray-950 p-6 sm:p-8 text-gray-100 dark:border-gray-800">
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400">Developer Setup</p>
            <h2 className="mt-2 text-2xl font-bold text-white">Run from source (Windows 10/11 · Python 3.10+)</h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-400 max-w-3xl">Clone the repository, then double-click <code className="rounded bg-white/10 px-1.5 py-0.5 text-gray-200 font-mono">run.bat</code>. On the first run it creates a virtual environment, installs requirements, and launches the app.</p>
            <pre className="mt-5 overflow-x-auto rounded-xl border border-white/10 bg-black/40 p-4 text-xs font-mono leading-relaxed text-cyan-100"><code>{`git clone https://github.com/zaifears/tapo-viewer.git\ncd tapo-viewer\n# Double-click run.bat`}</code></pre>
            <div className="mt-5 flex items-start gap-2 text-sm text-gray-400"><Terminal className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" /><span>FFmpeg is optional but recommended for automatic MP4 remuxing with AAC audio.</span></div>
          </div>
        </section>

        <section className="mt-16">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-700 dark:border-cyan-900 dark:bg-cyan-950/50 dark:text-cyan-300 mb-3">
              <ShieldCheck className="h-3.5 w-3.5 text-cyan-500" />
              Frequently Asked Questions
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Tapo-Viewer & Camera Compatibility FAQ
            </h2>
            <p className="mt-2 text-base text-gray-600 dark:text-gray-400 leading-relaxed">
              Find answers regarding supported Tapo camera models, Windows setup, local RTSP streaming, and MicroSD card video downloads.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {faqItems.map((item) => (
              <article
                key={item.question}
                className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 dark:border-gray-800 dark:bg-gray-900/60 shadow-sm transition-all hover:border-cyan-200 dark:hover:border-cyan-900/60"
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

        <section className="mt-16 rounded-2xl border border-cyan-200 bg-cyan-50/70 p-6 dark:border-cyan-900 dark:bg-cyan-950/25 sm:p-8">
          <h2 className="text-xl font-bold">Powered by PyTapo</h2>
          <p className="mt-3 max-w-4xl leading-relaxed text-gray-700 dark:text-gray-300">
            Tapo-Viewer relies on the open-source PyTapo library, which enables local camera authentication, recording-date and motion-event queries from the internal MicroSD card, and direct media downloads at Wi‑Fi speed without an active internet connection.
          </p>
          <a href="https://github.com/JurajNyiri/pytapo" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-700 hover:underline dark:text-cyan-300">
            Explore PyTapo <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </section>
      </div>
    </main>
  );
}
