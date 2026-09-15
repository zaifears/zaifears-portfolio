"use client";

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';

interface TechItem {
  name: string;
  logo: string;
  description: string;
  link: string;
  primaryLabel?: string;
  github?: string;
  secondaryLink?: string;
  secondaryLabel?: string;
}

interface PowerShellItem {
  name: string;
  command: string;
  description: string;
}

const apps: TechItem[] = [
  {
    name: '7-Zip',
    logo: '7zip.webp',
    description: 'High-compression open-source file archiver supporting 7z, ZIP, RAR, TAR, and GZ formats.',
    link: 'https://7-zip.org/',
    primaryLabel: 'Website',
    github: 'https://github.com/mcmilk/7-Zip-zstd',
  },
  {
    name: 'AB Download Manager',
    logo: 'abdownloadmanager.webp',
    description: 'Modern open-source download accelerator with multi-threading, browser extensions, and speed limiter.',
    link: 'https://abdownloadmanager.com/',
    primaryLabel: 'Website',
    github: 'https://github.com/amir1376/ab-download-manager',
  },
  {
    name: 'Audacity',
    logo: 'audacity.webp',
    description: 'Free, open-source multi-track audio editor and recording studio for Windows, Mac, and Linux.',
    link: 'https://www.audacityteam.org/',
    primaryLabel: 'Website',
    github: 'https://github.com/audacity/audacity',
  },
  {
    name: 'Avro Keyboard',
    logo: 'avro.webp',
    description: 'The standard Bengali typing software with phonetic transliteration, layouts, and spell checker.',
    link: 'https://www.omicronlab.com/avro-keyboard.html',
    primaryLabel: 'Website',
    github: 'https://github.com/omicronlab/avro-keyboard',
  },
  {
    name: 'Brave Browser',
    logo: 'brave.webp',
    description: 'Privacy-focused Chromium web browser with built-in ad, tracker, and fingerprinting shields.',
    link: 'https://brave.com/',
    primaryLabel: 'Website',
    github: 'https://github.com/brave/brave-browser',
  },
  {
    name: 'OpenCut',
    logo: 'opencut.webp',
    description: 'Open-source web and desktop video editor designed as an extensible, AI-ready CapCut alternative.',
    link: 'https://opencut.app/',
    primaryLabel: 'Website',
    github: 'https://github.com/opencut-app/opencut',
  },
  {
    name: 'Concat',
    logo: 'concat.webp',
    description: 'Open-source, offline-first CapCut replacement with a Rust engine, timeline, and auto-captioning.',
    link: 'https://github.com/jub0t/Concat',
    primaryLabel: 'Website',
    github: 'https://github.com/jub0t/Concat',
  },
  {
    name: 'Everything',
    logo: 'everything.webp',
    description: 'Lightning-fast Windows search utility that locates files and folders by name in milliseconds.',
    link: 'https://www.voidtools.com/',
    primaryLabel: 'Website',
  },
  {
    name: 'LightBulb',
    logo: 'lightbulb.webp',
    description: 'Reduces eye strain by automatically adjusting display gamma and color temperature based on sun position.',
    link: 'https://github.com/Tyrrrz/LightBulb',
    primaryLabel: 'GitHub',
    github: 'https://github.com/Tyrrrz/LightBulb',
  },
  {
    name: 'File Converter',
    logo: 'fileconverter.webp',
    description: 'Right-click context menu utility to convert and compress audio, video, image, and document files.',
    link: 'https://file-converter.io/',
    primaryLabel: 'Website',
    github: 'https://github.com/Tichau/FileConverter',
  },
  {
    name: 'LocalSend',
    logo: 'localsend.webp',
    description: 'Secure, cross-platform file and message sharing with nearby devices over local Wi-Fi.',
    link: 'https://localsend.org/',
    primaryLabel: 'Website',
    github: 'https://github.com/localsend/localsend',
  },
  {
    name: 'MicYou',
    logo: 'micyou.webp',
    description: 'Turns your smartphone into a wireless PC microphone over Wi-Fi with ultra-low latency.',
    link: 'https://github.com/LanRhyme/MicYou',
    primaryLabel: 'GitHub',
    github: 'https://github.com/LanRhyme/MicYou',
  },
  {
    name: 'mpv.net',
    logo: 'mpvnet.webp',
    description: 'Modern Windows media player based on mpv with an intuitive UI and powerful scripting options.',
    link: 'https://github.com/mpvnet-player/mpv.net',
    primaryLabel: 'Website',
    github: 'https://github.com/mpvnet-player/mpv.net',
  },
  {
    name: 'OBS Studio',
    logo: 'obs.webp',
    description: 'Free, open-source software for video recording and live streaming with hardware acceleration.',
    link: 'https://obsproject.com/',
    primaryLabel: 'Website',
    github: 'https://github.com/obsproject/obs-studio',
  },
  {
    name: 'PowerToys',
    logo: 'powertoys.webp',
    description: 'Microsoft power-user utilities including FancyZones, Text Extractor, Awake, and PowerToys Run.',
    link: 'https://learn.microsoft.com/en-us/windows/powertoys/',
    primaryLabel: 'Website',
    github: 'https://github.com/microsoft/PowerToys',
  },
  {
    name: 'qBittorrent',
    logo: 'qbittorent.webp',
    description: 'Ad-free, open-source BitTorrent client with integrated search engine and bandwidth scheduling.',
    link: 'https://www.qbittorrent.org/',
    primaryLabel: 'Website',
    github: 'https://github.com/qbittorrent/qBittorrent',
  },
  {
    name: 'RustDesk',
    logo: 'rustdesk.webp',
    description: 'Open-source remote desktop alternative to TeamViewer and AnyDesk with self-hosting support.',
    link: 'https://rustdesk.com/',
    primaryLabel: 'Website',
    github: 'https://github.com/rustdesk/rustdesk',
  },
];

const androidApps: TechItem[] = [
  {
    name: 'Aegis Authenticator',
    logo: 'aegis.webp',
    description: 'Secure, encrypted 2FA/TOTP authenticator with biometric unlock and automated local backups.',
    link: 'https://getaegis.app/',
    primaryLabel: 'Website',
    github: 'https://github.com/beemdevelopment/Aegis',
  },
  {
    name: 'Cashew',
    logo: 'cashew.webp',
    description: 'Clean, private personal budgeting and expense tracker with custom categories and insights.',
    link: 'https://cashewapp.web.app/',
    primaryLabel: 'Website',
    github: 'https://github.com/jameskokoska/Cashew',
  },
  {
    name: 'microG',
    logo: 'microg.webp',
    description: 'Free and open-source re-implementation of Google Play Services components for de-Googled devices.',
    link: 'https://microg.org/',
    primaryLabel: 'Website',
    github: 'https://github.com/microg/GmsCore',
  },
  {
    name: 'NewPipe',
    logo: 'newpipe.webp',
    description: 'Lightweight YouTube client without proprietary Google APIs, ads, or account requirements.',
    link: 'https://newpipe.net/',
    primaryLabel: 'Website',
    github: 'https://github.com/TeamNewPipe/NewPipe',
  },
  {
    name: 'Paperless Mobile',
    logo: 'paperless.webp',
    description: 'Mobile companion client for Paperless-ngx self-hosted document indexing and management.',
    link: 'https://github.com/astubenbord/paperless-mobile',
    primaryLabel: 'App Page',
    github: 'https://github.com/astubenbord/paperless-mobile',
  },
  {
    name: 'PCAPdroid',
    logo: 'pcapdroid.webp',
    description: 'Privacy-friendly network traffic monitor and packet capture tool that inspects app connections without root.',
    link: 'https://pcapdroid.org/',
    primaryLabel: 'Website',
    github: 'https://github.com/emanuele-f/PCAPdroid',
  },
  {
    name: 'F-Droid',
    logo: 'fdroid.webp',
    description: 'Installable catalog of Free and Open Source Software (FOSS) applications for Android.',
    link: 'https://f-droid.org/',
    primaryLabel: 'Website',
    github: 'https://github.com/f-droid/fdroidclient',
  },
  {
    name: 'Firefox Android',
    logo: 'firefox.webp',
    description: 'Open-source mobile browser with enhanced tracking protection and full mobile add-on support.',
    link: 'https://www.mozilla.org/firefox/android/',
    primaryLabel: 'Website',
    github: 'https://github.com/mozilla-mobile/firefox-android',
  },
  {
    name: 'Immich',
    logo: 'immich.webp',
    description: 'Self-hosted photo and video backup solution with facial recognition, albums, and map view.',
    link: 'https://immich.app/',
    primaryLabel: 'Website',
    github: 'https://github.com/immich-app/immich',
  },
  {
    name: 'KDE Connect',
    logo: 'kdeconnect.webp',
    description: 'Seamlessly links Android devices with PC for clipboard sharing, notifications, and media control.',
    link: 'https://kdeconnect.kde.org/',
    primaryLabel: 'Website',
    github: 'https://github.com/KDE/kdeconnect-android',
  },
  {
    name: 'Komi Store',
    logo: 'komistore.webp',
    description: 'Modern FOSS application discovery client and auto-updater for GitHub and direct APK releases.',
    link: 'https://github.com/komi-store/komi-store',
    primaryLabel: 'GitHub',
    github: 'https://github.com/komi-store/komi-store',
  },
  {
    name: 'LocalSend',
    logo: 'localsend.webp',
    description: 'Local network file sharing across mobile and desktop without internet connection or servers.',
    link: 'https://localsend.org/',
    primaryLabel: 'Website',
    github: 'https://github.com/localsend/localsend',
  },
  {
    name: 'LocReminder',
    logo: 'locreminder.webp',
    description: 'Location-based reminders app triggering alerts when entering or leaving specific geofences.',
    link: '/projects/locreminder',
    primaryLabel: 'Project Page',
    github: 'https://github.com/Zaifears/LocReminder',
  },
  {
    name: 'StockSimBD',
    logo: 'stocksimbd.webp',
    description: 'Dhaka Stock Exchange (DSE) paper trading simulator with live market analytics and portfolio tracking.',
    link: 'https://stocksimulator.tech',
    primaryLabel: 'Live App',
    github: 'https://github.com/Zaifears/StockSimulatorBD',
  },
  {
    name: 'VLC',
    logo: 'vlc.webp',
    description: 'Versatile media player supporting all video/audio formats, network streams, and subtitle tracks.',
    link: 'https://www.videolan.org/vlc/',
    primaryLabel: 'Website',
    github: 'https://github.com/videolan/vlc',
  },
  {
    name: 'MicYou',
    logo: 'micyou.webp',
    description: 'Wireless PC microphone client turning an Android smartphone into a low-latency audio input.',
    link: 'https://github.com/LanRhyme/MicYou',
    primaryLabel: 'GitHub',
    github: 'https://github.com/LanRhyme/MicYou',
  },
  {
    name: 'Morphe Manager',
    logo: 'morphe.webp',
    description: 'Patcher manager for Android apps supporting custom modules, integrations, and app enhancements.',
    link: 'https://morphe.software/',
    primaryLabel: 'Website',
    github: 'https://github.com/MorpheApp/morphe-manager',
  },
];

const browserExtensions: TechItem[] = [
  {
    name: 'Allow Right Click',
    logo: 'allow-right-click.webp',
    description: 'Re-enables right-click context menu, text selection, and copy-paste on sites that disable them.',
    link: 'https://chromewebstore.google.com/detail/allow-right-click/hnafhkjheookmokbkpnfpmemlppjdgoi',
    primaryLabel: 'Chrome Store',
  },
  {
    name: 'FastStream Video Player',
    logo: 'fast-stream.webp',
    description: 'Video streaming optimizer with instant seeking, custom keyboard shortcuts, and volume boost.',
    link: 'https://chromewebstore.google.com/detail/faststream-video-player/kkeakohpadmbldjaiggikmnldlfkdfog',
    primaryLabel: 'Chrome Store',
    secondaryLink: 'https://addons.mozilla.org/en-US/firefox/addon/faststream/',
    secondaryLabel: 'Firefox Add-on',
  },
  {
    name: 'OpenScreenShot',
    logo: 'openscreenshot.webp',
    description: 'Open-source full page screen capture utility to record and export full scrolling web pages.',
    link: 'https://chromewebstore.google.com/detail/full-page-screenshot-open/hdabbojjccojlapnfjpdppcpfcnhgmdp',
    primaryLabel: 'Chrome Store',
    secondaryLink: 'https://openscreenshot.app/',
    secondaryLabel: 'Website',
    github: 'https://github.com/PGHQdev/OpenScreenShot',
  },
  {
    name: 'Save image as type',
    logo: 'saveimage.webp',
    description: 'Context menu extension to save images directly in your chosen format (JPG, PNG, or WebP).',
    link: 'https://chromewebstore.google.com/detail/save-image-as-type-v2/pmmiflmbmncomecklllfjplelelcdflf',
    primaryLabel: 'Chrome Store',
  },
  {
    name: 'Search by Image',
    logo: 'searchbyimage.webp',
    description: 'Reverse image search tool querying Google, Bing, Yandex, TinEye, and Baidu simultaneously.',
    link: 'https://chromewebstore.google.com/detail/search-by-image/cnojnbdhbh',
    primaryLabel: 'Chrome Store',
    github: 'https://github.com/dessant/search-by-image',
  },
  {
    name: 'SponsorBlock',
    logo: 'sponsorblock.webp',
    description: 'Crowdsourced extension that automatically skips sponsored segments and intros in YouTube videos.',
    link: 'https://chromewebstore.google.com/detail/sponsorblock-for-youtube/mnjggcdmjocbbbhaepdhchncahnbgone',
    primaryLabel: 'Chrome Store',
    github: 'https://github.com/ajayyy/SponsorBlock',
  },
  {
    name: 'Tabulazer',
    logo: 'tabulazer.webp',
    description: 'Converts and extracts HTML tables from any web page directly into Markdown, CSV, and spreadsheets.',
    link: 'https://chromewebstore.google.com/detail/tabulazer-table-filter-an/ikfbkffbgkdghhnjfoomdkeifljlepah',
    primaryLabel: 'Chrome Store',
    github: 'https://github.com/Darkseal/tabulazer',
  },
  {
    name: 'Enhancer for YouTube',
    logo: 'enhancer.webp',
    description: 'Comprehensive YouTube booster with custom playback speeds, audio boost, and cinema mode.',
    link: 'https://chromewebstore.google.com/detail/enhancer-for-youtube/ponfpcnoihfmfllpaingbgdagcgmijgd',
    primaryLabel: 'Chrome Store',
    secondaryLink: 'https://www.mrfdev.com/enhancer-for-youtube',
    secondaryLabel: 'Website',
  },
  {
    name: 'uBlock Origin',
    logo: 'ublock.webp',
    description: 'Ultra-efficient, wide-spectrum content blocker and tracker blocker with minimal memory usage.',
    link: 'https://chromewebstore.google.com/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm',
    primaryLabel: 'Chrome Store',
    github: 'https://github.com/gorhill/uBlock',
  },
];

const powershellCommands: PowerShellItem[] = [
  {
    name: "Chris Titus Tech's Windows Utility",
    command: 'irm "https://christitus.com/win" | iex',
    description: 'Comprehensive utility to install essential software, tweak system configurations, and debloat Windows.',
  },
  {
    name: 'Microsoft Office Deployment Tool',
    command: 'irm https://officetool.plus | iex',
    description: 'Lightweight script to download, configure, and install genuine Microsoft Office deployment packages.',
  },
  {
    name: 'Windows Activation (MAS)',
    command: 'irm https://get.activated.win | iex',
    description: 'Microsoft Activation Scripts (MAS) open-source tool for permanent HWID and Ohook Windows activation.',
  },
];

const tabs = [
  {
    id: 'apps',
    label: 'Apps',
    count: apps.length,
    icon: (
      <svg className="w-4 h-4 shrink-0" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
      </svg>
    ),
  },
  {
    id: 'android',
    label: 'Android',
    count: androidApps.length,
    icon: (
      <svg className="w-4 h-4 shrink-0" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.551 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.4126 13.8533 8.1 12 8.1s-3.5902.3126-5.1367.8507L4.841 5.4467a.4161.4161 0 00-.5677-.1521.4157.4157 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3433-4.1021-2.689-7.5743-6.1185-9.4396" />
      </svg>
    ),
  },
  {
    id: 'browserExtensions',
    label: 'Extensions',
    count: browserExtensions.length,
    icon: (
      <svg className="w-4 h-4 shrink-0" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    id: 'powershell',
    label: 'PowerShell',
    count: powershellCommands.length,
    icon: (
      <svg className="w-4 h-4 shrink-0" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 3a1 1 0 000 2h6a1 1 0 100-2H5zm0 4a1 1 0 100 2h3a1 1 0 100-2H5z" clipRule="evenodd" />
      </svg>
    ),
  },
];

const ExternalIcon = () => (
  <svg className="w-3.5 h-3.5 shrink-0" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

const GitHubIcon = () => (
  <svg className="w-3.5 h-3.5 shrink-0" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const CardItem = ({ item }: { item: TechItem }) => {
  const hasDualAction = Boolean(item.github || item.secondaryLink);

  return (
    <article className="group flex flex-col justify-between rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-4 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-md">
      <div>
        <div className="flex items-start gap-3 mb-2.5">
          <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800/80 p-1.5 flex items-center justify-center shrink-0 border border-gray-200/50 dark:border-gray-700/50 group-hover:scale-105 transition-transform">
            <Image
              src={`/techtips/${item.logo}`}
              alt=""
              width={36}
              height={36}
              className="w-full h-full object-contain rounded-md"
            />
          </div>
          <div className="grow min-w-0">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {item.name}
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mt-1 line-clamp-2">
              {item.description}
            </p>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-gray-100 dark:border-gray-800/80 flex items-center gap-2">
        <a
          href={item.link}
          target={item.link.startsWith('http') ? '_blank' : undefined}
          rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
          aria-label={`Visit ${item.name}`}
          className={`inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/40 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
            hasDualAction ? 'flex-1' : 'w-full'
          }`}
        >
          <span>{item.primaryLabel || 'Visit'}</span>
          <ExternalIcon />
        </a>

        {item.github && (
          <a
            href={item.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${item.name} on GitHub`}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <GitHubIcon />
            <span>GitHub</span>
          </a>
        )}

        {!item.github && item.secondaryLink && (
          <a
            href={item.secondaryLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${item.name} ${item.secondaryLabel || 'link'}`}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <span>{item.secondaryLabel || 'Mirror'}</span>
            <ExternalIcon />
          </a>
        )}
      </div>
    </article>
  );
};

const CommandBlock = ({
  content,
  label,
}: {
  content: string;
  label?: string;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(content)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {});
  };

  return (
    <div className="relative rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-900 p-4 font-mono text-sm text-gray-200">
      <div className="pr-20 break-all text-xs sm:text-sm">
        <span className="text-blue-400 select-none font-semibold">&gt; </span>
        <span className="text-gray-100">{content}</span>
      </div>
      <button
        onClick={handleCopy}
        aria-label={label ? `Copy ${label} command` : 'Copy command to clipboard'}
        className="absolute top-2.5 right-2.5 min-h-[32px] min-w-[60px] flex items-center justify-center rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-200 hover:text-white text-xs font-semibold px-2.5 py-1 border border-gray-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
};

export default function TechTipsPage() {
  const [activeTab, setActiveTab] = useState('apps');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const validTabs = ['apps', 'android', 'browserExtensions', 'powershell'];
      if (validTabs.includes(hash)) {
        setActiveTab(hash);
      } else if (!window.location.hash) {
        setActiveTab('apps');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSearchQuery('');
    window.history.replaceState(null, '', `#${tab}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = -1;
    if (e.key === 'ArrowRight') {
      nextIndex = (index + 1) % tabs.length;
    } else if (e.key === 'ArrowLeft') {
      nextIndex = (index - 1 + tabs.length) % tabs.length;
    } else if (e.key === 'Home') {
      nextIndex = 0;
    } else if (e.key === 'End') {
      nextIndex = tabs.length - 1;
    }

    if (nextIndex !== -1) {
      e.preventDefault();
      const targetTab = tabs[nextIndex].id;
      handleTabChange(targetTab);
      const btn = document.getElementById(`tab-${targetTab}`);
      btn?.focus();
    }
  };

  const filteredApps = useMemo(() => {
    if (!searchQuery.trim()) return apps;
    const q = searchQuery.toLowerCase();
    return apps.filter(
      (a) => a.name.toLowerCase().includes(q) || a.description.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const filteredAndroid = useMemo(() => {
    if (!searchQuery.trim()) return androidApps;
    const q = searchQuery.toLowerCase();
    return androidApps.filter(
      (a) => a.name.toLowerCase().includes(q) || a.description.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const filteredExtensions = useMemo(() => {
    if (!searchQuery.trim()) return browserExtensions;
    const q = searchQuery.toLowerCase();
    return browserExtensions.filter(
      (e) => e.name.toLowerCase().includes(q) || e.description.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const filteredPowerShell = useMemo(() => {
    if (!searchQuery.trim()) return powershellCommands;
    const q = searchQuery.toLowerCase();
    return powershellCommands.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.command.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white">
      <div className="relative z-10 max-w-5xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <header className="mb-8 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-2.5">
            Tech Tips &amp; Utilities
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base max-w-2xl leading-relaxed">
            Curated software, privacy tools, Android utilities, browser extensions, and setup commands.
          </p>
        </header>

        {/* Tab & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
          <div
            role="tablist"
            aria-label="Tech categories"
            className="flex items-center overflow-x-auto no-scrollbar bg-gray-100 dark:bg-gray-900/60 rounded-xl p-1 gap-1 border border-gray-200 dark:border-gray-800"
          >
            {tabs.map((tab, idx) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  id={`tab-${tab.id}`}
                  aria-controls={`panel-${tab.id}`}
                  aria-selected={isSelected}
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => handleTabChange(tab.id)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-sm font-semibold'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200/60 dark:hover:bg-gray-800/60'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                  <span
                    className={`ml-0.5 text-[11px] px-1.5 py-0.2 rounded-full font-mono ${
                      isSelected
                        ? 'bg-blue-700/60 text-blue-100'
                        : 'bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Filter */}
          <div className="relative shrink-0 sm:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Quick search..."
              aria-label="Quick search utilities"
              className="w-full text-xs sm:text-sm px-3 py-2 pl-8 rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <svg
              className="w-4 h-4 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Apps Panel */}
        <div
          role="tabpanel"
          id="panel-apps"
          aria-labelledby="tab-apps"
          hidden={activeTab !== 'apps'}
          tabIndex={0}
          className="focus-visible:outline-none"
        >
          {activeTab === 'apps' && (
            filteredApps.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {filteredApps.map((app) => (
                  <CardItem key={app.name} item={app} />
                ))}
              </div>
            ) : (
              <p className="text-center py-12 text-sm text-gray-500 dark:text-gray-400">
                No apps matching &ldquo;{searchQuery}&rdquo;.
              </p>
            )
          )}
        </div>

        {/* Android Panel */}
        <div
          role="tabpanel"
          id="panel-android"
          aria-labelledby="tab-android"
          hidden={activeTab !== 'android'}
          tabIndex={0}
          className="focus-visible:outline-none"
        >
          {activeTab === 'android' && (
            filteredAndroid.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {filteredAndroid.map((app) => (
                  <CardItem key={app.name} item={app} />
                ))}
              </div>
            ) : (
              <p className="text-center py-12 text-sm text-gray-500 dark:text-gray-400">
                No Android apps matching &ldquo;{searchQuery}&rdquo;.
              </p>
            )
          )}
        </div>

        {/* Browser Extensions Panel */}
        <div
          role="tabpanel"
          id="panel-browserExtensions"
          aria-labelledby="tab-browserExtensions"
          hidden={activeTab !== 'browserExtensions'}
          tabIndex={0}
          className="focus-visible:outline-none"
        >
          {activeTab === 'browserExtensions' && (
            filteredExtensions.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {filteredExtensions.map((ext) => (
                  <CardItem key={ext.name} item={ext} />
                ))}
              </div>
            ) : (
              <p className="text-center py-12 text-sm text-gray-500 dark:text-gray-400">
                No extensions matching &ldquo;{searchQuery}&rdquo;.
              </p>
            )
          )}
        </div>

        {/* PowerShell Panel */}
        <div
          role="tabpanel"
          id="panel-powershell"
          aria-labelledby="tab-powershell"
          hidden={activeTab !== 'powershell'}
          tabIndex={0}
          className="focus-visible:outline-none"
        >
          {activeTab === 'powershell' && (
            <div className="space-y-4">
              <section className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-4 sm:p-5">
                <h2 className="text-base sm:text-lg font-bold mb-2 text-gray-900 dark:text-white">
                  How to Run PowerShell Commands
                </h2>
                <ol className="list-decimal list-inside text-gray-600 dark:text-gray-300 space-y-1.5 text-xs sm:text-sm leading-relaxed">
                  <li>Press the <kbd className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded font-mono text-xs border border-gray-200 dark:border-gray-700">Win</kbd> key and type <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded font-mono text-xs text-blue-600 dark:text-blue-400">powershell</code>.</li>
                  <li>Right-click and select <strong>Run as administrator</strong>.</li>
                  <li>Click <strong>Copy</strong> on any command below and paste it into PowerShell with <kbd className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded font-mono text-xs border border-gray-200 dark:border-gray-700">Ctrl + V</kbd> or right-click.</li>
                  <li>Press <kbd className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded font-mono text-xs border border-gray-200 dark:border-gray-700">Enter</kbd> to execute.</li>
                </ol>
              </section>

              {filteredPowerShell.length > 0 ? (
                <div className="space-y-3">
                  {filteredPowerShell.map((item) => (
                    <article
                      key={item.name}
                      className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-4 transition-all hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-sm"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                          <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 3a1 1 0 000 2h6a1 1 0 100-2H5zm0 4a1 1 0 100 2h3a1 1 0 100-2H5z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="grow min-w-0">
                          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                            {item.name}
                          </h3>
                          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mt-0.5">
                            {item.description}
                          </p>
                        </div>
                      </div>
                      <CommandBlock content={item.command} label={item.name} />
                    </article>
                  ))}
                </div>
              ) : (
                <p className="text-center py-12 text-sm text-gray-500 dark:text-gray-400">
                  No PowerShell commands matching &ldquo;{searchQuery}&rdquo;.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}