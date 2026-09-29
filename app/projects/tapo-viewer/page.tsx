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

const supportedDevices = [
  { title: "Indoor", models: "Tapo C100, C110, C200, C210, C220, C225, TC70" },
  { title: "Outdoor", models: "Tapo C310, C320WS, C325WB, C500, C510W, C520WS" },
  { title: "Other models", models: "Any current-firmware Tapo camera with local camera-account support." },
];

const faqItems = [
  {
    question: "Is there a Tapo desktop app for Windows laptops and PCs?",
    answer:
      "Tapo-Viewer is a Windows desktop app for compatible TP-Link Tapo cameras. It runs on 64-bit Windows 10 and Windows 11 and lets users launch live camera feeds in a desktop media player and browse recordings stored on a camera MicroSD card.",
  },
  {
    question: "Where can I download the Tapo-Viewer EXE?",
    answer:
      "The standalone Tapo-Viewer.exe and ZIP archive are available from the project’s latest GitHub Release. The executable includes its dependencies and UI assets, so Python and terminal commands are not required to run it.",
  },
  {
    question: "Can Tapo-Viewer download Tapo camera recordings?",
    answer:
      "Yes. Tapo-Viewer uses an interactive recording calendar and a motion-event timeline to browse compatible camera MicroSD recordings, then downloads motion events and continuous recordings to the computer. It remuxes clips to MP4 with AAC audio when FFmpeg is available.",
  },
  {
    question: "Does Tapo-Viewer send camera footage to third-party servers?",
    answer:
      "No. The app communicates directly with the camera over home Wi-Fi or LAN. Credentials are not saved unless the user explicitly selects the save option.",
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
            operatingSystem: "Windows 10 and Windows 11",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            author: { "@type": "Person", name: "Shahoriar Hossain", url: baseUrl },
            codeRepository: repositoryUrl,
            license: `${repositoryUrl}/blob/main/LICENSE`,
            downloadUrl: releaseUrl,
            image: `${baseUrl}/projects/tapo-viewer/tapo-viewer_logo.png`,
            featureList: features.map((feature) => feature.title),
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
              src="https://i.ibb.co.com/SwnsYxYN/dashboard.png"
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
              src="https://i.ibb.co.com/GyvfC3W/login.png"
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

        <section className="mt-16 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900/60">
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">Supported devices</p>
            <h2 className="mt-2 text-2xl font-bold">Tapo cameras with local accounts</h2>
            <div className="mt-5 space-y-4">
              {supportedDevices.map((group) => (
                <div key={group.title} className="border-l-2 border-cyan-500 pl-4">
                  <h3 className="font-semibold">{group.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{group.models}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm text-gray-500 dark:text-gray-400">Compatible cameras support local RTSP and ONVIF accounts.</p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-gray-950 p-6 text-gray-100 dark:border-gray-800">
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400">Run from source</p>
            <h2 className="mt-2 text-2xl font-bold text-white">Windows 10/11 · Python 3.10+</h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-400">Clone the repository, then double-click <code className="rounded bg-white/10 px-1.5 py-0.5 text-gray-200">run.bat</code>. On the first run it creates a virtual environment, installs requirements, and launches the app.</p>
            <pre className="mt-5 overflow-x-auto rounded-xl border border-white/10 bg-black/30 p-4 text-xs leading-relaxed text-cyan-100"><code>{`git clone https://github.com/zaifears/tapo-viewer.git\ncd tapo-viewer\n# Double-click run.bat`}</code></pre>
            <div className="mt-5 flex items-start gap-2 text-sm text-gray-400"><Terminal className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" /><span>FFmpeg is optional but recommended for automatic MP4 remuxing.</span></div>
          </div>
        </section>

        <section className="mt-16">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">Tapo-Viewer FAQ</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">Tapo desktop app and EXE download questions</h2>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {faqItems.map((item) => (
              <article key={item.question} className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900/60">
                <h3 className="font-semibold leading-snug">{item.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{item.answer}</p>
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
