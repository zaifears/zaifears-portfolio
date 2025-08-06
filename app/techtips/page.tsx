"use client";

import { useState } from 'react';
import Image from 'next/image';

// Data for the apps and commands, now including a logo property
const apps = [
  { name: 'Audacity', logo: 'audacity.png', description: 'A free, open-source, and cross-platform audio software for multi-track recording and editing.', link: 'https://www.audacityteam.org/download/windows/' },
  { name: 'Everything', logo: 'everything.png', description: 'A fast file search tool for Windows that can instantly locate files and folders by name.', link: 'https://www.voidtools.com/downloads/' },
  { name: 'f.lux', logo: 'flux.png', description: 'Adjusts your computer\'s display to the time of day, warm at night and like sunlight during the day.', link: 'https://justgetflux.com/dlwin.html' },
  { name: 'File Converter', logo: 'fileconverter.png', description: 'A simple tool that allows you to convert and compress files using the right-click context menu in Windows Explorer.', link: 'https://file-converter.io/download.html' },
  { name: 'KDE Connect', logo: 'kdeconnect.png', description: 'A project that enables all your devices to communicate with each other to share files and notifications.', link: 'https://kdeconnect.kde.org/download.html' },
  { name: 'LocalSend', logo: 'localsend.png', description: 'An open-source app for sharing files and messages with nearby devices using your local Wi-Fi network.', link: 'https://localsend.org/download' },
  { name: 'Mozilla Firefox', logo: 'firefox.png', description: 'A free and open-source web browser developed by the Mozilla Foundation.', link: 'https://www.firefox.com/en-GB/browsers/desktop/windows/' },
  { name: 'PotPlayer', logo: 'potplayer.png', description: 'A comprehensive freeware video and audio player, with support for a large number of formats.', link: 'https://potplayer.tv/' },
  { name: 'PowerToys', logo: 'powertoys.png', description: 'A set of utilities for power users to tune and streamline their Windows experience for greater productivity.', link: 'https://learn.microsoft.com/en-us/windows/powertoys/install' },
  { name: 'qBittorrent', logo: 'qbittorent.png', description: 'A free and reliable P2P BitTorrent client with a nice Qt user interface.', link: 'https://www.qbittorrent.org/download' },
  { name: 'WinRAR', logo: 'winrar.png', description: 'A powerful archive manager. It can backup your data and reduce the size of email attachments.', link: 'https://www.win-rar.com/download.html?&L=0' },
  { name: 'Zoom', logo: 'zoom.png', description: 'A popular video conferencing software that allows you to host and join online meetings, webinars, and more.', link: 'https://zoom.us/download' },
  { name: 'OpenCut', logo: 'opencut.png', description: 'Still in development, Open source version of Capcut.', link: 'https://opencut.app/' },
  { name: 'AYA', logo: 'aya.png', description: 'A desktop application for easily controlling android devices, which can be considered as a GUI wrapper for ADB.', link: 'https://aya.liriliri.io/' },
  { name: 'OpenBangla Keyboard', logo: 'openbangla.png', description: 'Alternative of Avro in Linux.', link: 'https://github.com/OpenBangla/OpenBangla-Keyboard' },
  { name: 'OpenRGB', logo: 'openrgb.png', description: 'Control all your RGB devices from a single app.', link: 'https://openrgb.org/' },
];

const powershellCommands = [
  { name: 'Chris Titus Tech\'s Windows Utility', command: 'irm "https://christitus.com/win" | iex', description: 'A comprehensive utility to install programs, tweak settings, and optimize Windows.' },
  { name: 'IDM Activation Tool', command: 'iex(irm is.gd/idm_reset)', description: 'A script to manage the trial period of Internet Download Manager.' },
  { name: 'Microsoft Office Download', command: 'irm https://officetool.plus | iex', description: 'A tool to easily download and install various versions of Microsoft Office.' },
  { name: 'Windows Activation', command: 'irm https://get.activated.win | iex', description: 'A script for activating various versions of Windows.' },
];

const browserExtensions = [
    { name: 'AdNauseam', logo: 'adnauseam.png', description: 'Clicks every ad on the pages you visit, making your data useless for trackers.', link: 'https://adnauseam.io/' },
    { name: 'Allow Right Click', logo: 'rightclick.png', description: 'Re-enables the right-click menu on websites that block it.', link: 'https://webextension.org/listing/allow-right-click.html' },
    { name: 'Enhancer for Youtube', logo: 'enhancer.png', description: 'Provides dozens of features to improve your YouTube experience, like volume control, playback speed, and more.', link: 'https://www.mrfdev.com/enhancer-for-youtube' },
    { name: 'Facebook Container', logo: 'container.png', description: 'Prevents Facebook from tracking your activity on other websites.', link: 'https://github.com/mozilla/contain-facebook' },
    { name: 'FastForward', logo: 'fastforward.png', description: 'Skips annoying link shorteners and intermediary pages.', link: 'https://fastforward.team/' },
    { name: 'G App Launcher', logo: 'gapp.png', description: 'Provides a quick launcher for Google apps and services.', link: 'https://apps.jeurissen.co/g-app-launcher' },
    { name: 'Save Image as Type', logo: 'saveimage.png', description: 'Adds a context menu item to save images in a specific format (JPG, PNG, or WebP).', link: 'https://github.com/d7omdev/Save-Image-as-Type' },
    { name: 'Search by Image', logo: 'searchbyimage.png', description: 'A powerful reverse image search tool with support for multiple search engines.', link: 'https://github.com/dessant/search-by-image' },
    { name: 'SponsorBlock for YouTube', logo: 'sponsorblock.png', description: 'Skips sponsored segments in YouTube videos.', link: 'https://sponsor.ajay.app/' },
    { name: 'To Google Translate', logo: 'googletranslate.png', description: 'A convenient way to translate selected text using Google Translate.', link: 'https://addons.mozilla.org/en-US/firefox/addon/to-google-translate/', linkChrome: 'https://chromewebstore.google.com/detail/google-translate/aapbdbdomjkkjkaonfhkkikfgjllcleb?hl=en' },
    { name: 'uBlock Origin', logo: 'ublock.png', description: 'A must-have. An efficient, wide-spectrum content blocker that is easy on CPU and memory.', link: 'https://github.com/gorhill/uBlock#ublock-origin' },
];

const interestingWebsites = [
    { name: 'Repomix', logo: 'repomix.png', description: 'A powerful tool that packs your entire repository into a single, AI-friendly file. Perfect for when you need to feed your codebase to Large Language Models (LLMs).', link: 'https://repomix.com/' },
    { name: 'Humanize AI Text', logo: 'humanizer.png', description: 'A simple one-click tool to make AI-generated text sound more human.', link: 'https://humanize-ai.click/' },
    { name: 'Pricepoka', logo: 'pricepoka.png', description: 'PricePoka compares prices across top Bangladeshi retailers so you never overpay again.', link: 'https://www.pricepoka.com/' },
    { name: 'iLovePDF', logo: 'ilovepdf.png', description: 'A free and easy to use online tool to merge, split, compress, and convert PDF files.', link: 'https://www.ilovepdf.com/' },
];

const uBlockRules = `no-csp-reports: * true
no-large-media: behind-the-scene false
behind-the-scene * * noop
behind-the-scene * 1p-script noop
behind-the-scene * 3p noop
behind-the-scene * 3p-frame noop
behind-the-scene * 3p-script noop
behind-the-scene * image noop
behind-the-scene * inline-script noop`;

// Reusable component for the copyable command block
const CommandBlock = ({ content, isCodeBlock = false }: { content: string, isCodeBlock?: boolean }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-300 relative">
      {isCodeBlock ? (
        <pre className="whitespace-pre-wrap break-words">{content}</pre>
      ) : (
        <span><span className="text-green-400">powershell -c &quot;</span>{content}<span className="text-green-400">&quot;</span></span>
      )}
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white text-xs font-bold py-1 px-2 rounded"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
};

export default function TechTipsPage() {
  const [activeTab, setActiveTab] = useState('apps');

  return (
    <section>
      <h1 className="font-bold text-3xl md:text-4xl text-center mb-12">Tech Tips & Utilities</h1>

      {/* Tab Buttons */}
      <div className="flex flex-wrap justify-center mb-12 bg-neutral-900 rounded-full p-1 max-w-max mx-auto">
        <button onClick={() => setActiveTab('apps')} className={`px-5 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${activeTab === 'apps' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}>
          Apps
        </button>
        <button onClick={() => setActiveTab('powershell')} className={`px-5 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${activeTab === 'powershell' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}>
          Powershell
        </button>
        <button onClick={() => setActiveTab('browserExtensions')} className={`px-5 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${activeTab === 'browserExtensions' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}>
          Browser Extensions
        </button>
        <button onClick={() => setActiveTab('interestingWebsites')} className={`px-5 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${activeTab === 'interestingWebsites' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}>
          Interesting Websites
        </button>
      </div>

      {/* Content Area */}
      <div className="max-w-4xl mx-auto">
        {activeTab === 'apps' && (
          <div className="space-y-6">
            {apps.map((app) => (
              <div key={app.name} className="bg-neutral-900 p-6 rounded-lg border border-neutral-800 flex flex-col md:flex-row items-center gap-6">
                <div className="flex-grow">
                    <h2 className="text-xl font-bold mb-2">{app.name}</h2>
                    <p className="text-neutral-400 mb-4">{app.description}</p>
                    <a href={app.link} target="_blank" rel="noopener noreferrer" className="inline-block text-blue-400 hover:underline">Download Here</a>
                </div>
                <div className="flex-shrink-0 w-20 h-20">
                    <Image src={`/techtips/${app.logo}`} alt={`${app.name} logo`} width={80} height={80} className="rounded-lg object-contain"/>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'powershell' && (
          <div className="space-y-8">
            {powershellCommands.map((item) => (
              <div key={item.name} className="bg-neutral-900 p-6 rounded-lg border border-neutral-800">
                <h2 className="text-xl font-bold mb-2">{item.name}</h2>
                <p className="text-neutral-400 mb-4">{item.description}</p>
                <CommandBlock content={item.command} />
              </div>
            ))}
          </div>
        )}

        {activeTab === 'browserExtensions' && (
          <div className="space-y-6">
            {browserExtensions.map((ext) => (
              <div key={ext.name} className="bg-neutral-900 p-6 rounded-lg border border-neutral-800 flex flex-col md:flex-row items-center gap-6">
                <div className="flex-grow">
                    <h2 className="text-xl font-bold mb-2">{ext.name}</h2>
                    <p className="text-neutral-400 mb-4">{ext.description}</p>
                    <a href={ext.link} target="_blank" rel="noopener noreferrer" className="inline-block text-blue-400 hover:underline">Get Extension</a>
                    {ext.linkChrome && (
                    <a href={ext.linkChrome} target="_blank" rel="noopener noreferrer" className="inline-block text-blue-400 hover:underline ml-4">(Chrome)</a>
                    )}
                    {ext.name === 'uBlock Origin' && (
                        <div className="mt-6">
                            <h3 className="text-lg font-bold mb-2">My Filter List</h3>
                            <a href="/uBlock origin Filters.txt" download="uBlock origin Filters.txt" className="text-blue-400 hover:underline">
                                Download it
                            </a>
                            <h3 className="text-lg font-bold mt-4 mb-2">My Rules</h3>
                            <CommandBlock content={uBlockRules} isCodeBlock={true} />
                        </div>
                    )}
                </div>
                 <div className="flex-shrink-0 w-20 h-20">
                    <Image src={`/techtips/${ext.logo}`} alt={`${ext.name} logo`} width={80} height={80} className="rounded-lg object-contain"/>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'interestingWebsites' && (
          <div className="space-y-6">
            {interestingWebsites.map((tool) => (
              <div key={tool.name} className="bg-neutral-900 p-6 rounded-lg border border-neutral-800 flex flex-col md:flex-row items-center gap-6">
                <div className="flex-grow">
                    <h2 className="text-xl font-bold mb-2">{tool.name}</h2>
                    <p className="text-neutral-400 mb-4">{tool.description}</p>
                    <a href={tool.link} target="_blank" rel="noopener noreferrer" className="inline-block text-blue-400 hover:underline">Visit Website</a>
                </div>
                <div className="flex-shrink-0 w-20 h-20">
                    <Image src={`/techtips/${tool.logo}`} alt={`${tool.name} logo`} width={80} height={80} className="rounded-lg object-contain"/>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
