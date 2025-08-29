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
        className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white text-xs font-bold py-1 px-2 rounded transition-colors"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
};

export default function TechTipsPage() {
  const [activeTab, setActiveTab] = useState('apps');

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Tech Tips & Utilities</h1>
          <p className="text-gray-400 text-lg">A curated list of my favorite apps, scripts, and tools to enhance your digital experience.</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center mb-12 bg-gray-900/50 backdrop-blur-sm rounded-2xl p-2 max-w-fit mx-auto border border-gray-800">
          <button 
            onClick={() => setActiveTab('apps')} 
            className={`flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${
              activeTab === 'apps' 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25' 
                : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
            }`}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
            </svg>
            Apps
          </button>
          <button 
            onClick={() => setActiveTab('powershell')} 
            className={`flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${
              activeTab === 'powershell' 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25' 
                : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
            }`}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 3a1 1 0 000 2h6a1 1 0 100-2H5zm0 4a1 1 0 100 2h3a1 1 0 100-2H5z" clipRule="evenodd"/>
            </svg>
            Powershell
          </button>
          <button 
            onClick={() => setActiveTab('browserExtensions')} 
            className={`flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${
              activeTab === 'browserExtensions' 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25' 
                : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
            }`}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd"/>
            </svg>
            Browser Extensions
          </button>
          <button 
            onClick={() => setActiveTab('websites')} 
            className={`flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${
              activeTab === 'websites' 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25' 
                : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
            }`}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd"/>
            </svg>
            Websites
          </button>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeTab === 'apps' && apps.map((app) => (
            <div key={app.name} className="group bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 hover:bg-gray-800/50 hover:border-gray-700/50 transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-2xl">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gray-800 rounded-xl p-2 group-hover:bg-gray-700 transition-colors duration-300">
                    <Image 
                      src={`/techtips/${app.logo}`} 
                      alt={`${app.name} logo`} 
                      width={48} 
                      height={48} 
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors duration-300">{app.name}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{app.description}</p>
                  <a 
                    href={app.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-semibold transition-colors duration-300"
                  >
                    Visit Link
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}

          {activeTab === 'powershell' && (
            <>
              {/* Instructions for PowerShell */}
              <div className="col-span-full bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 mb-6">
                <h2 className="text-2xl font-bold mb-4 text-blue-400">How to Use PowerShell Commands</h2>
                <p className="text-gray-400 mb-4">
                  To execute these commands, follow these simple steps:
                </p>
                <ol className="list-decimal list-inside text-gray-300 space-y-2">
                  <li>Press the <code className="bg-gray-800 px-1 rounded">Windows key</code> or click the <code className="bg-gray-800 px-1 rounded">Start</code> button.</li>
                  <li>Type <code className="bg-gray-800 px-1 rounded">powershell</code> in the search bar.</li>
                  <li>Right-click on <code className="bg-gray-800 px-1 rounded">Windows PowerShell</code> and select <code className="bg-gray-800 px-1 rounded">Run as administrator</code>.</li>
                  <li>In the PowerShell window, copy the command you want to run from below and paste it by right-clicking or pressing <code className="bg-gray-800 px-1 rounded">Ctrl + V</code>.</li>
                  <li>Press <code className="bg-gray-800 px-1 rounded">Enter</code> to execute the command.</li>
                </ol>
                <p className="text-yellow-400 mt-4 text-sm">
                  <strong className="font-bold">Important:</strong> Always understand what a command does before running it, especially when running as an administrator.
                </p>
              </div>

              {/* Existing PowerShell Commands */}
              {powershellCommands.map((item) => (
                <div key={item.name} className="group bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 hover:bg-gray-800/50 hover:border-gray-700/50 transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-2xl col-span-full">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-blue-600/20 rounded-xl flex items-center justify-center group-hover:bg-blue-600/30 transition-colors duration-300">
                        <svg className="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 3a1 1 0 000 2h6a1 1 0 100-2H5zm0 4a1 1 0 100 2h3a1 1 0 100-2H5z" clipRule="evenodd"/>
                        </svg>
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors duration-300">{item.name}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed mb-4">{item.description}</p>
                      <CommandBlock content={item.command} />
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}

          {activeTab === 'browserExtensions' && browserExtensions.map((ext) => (
            <div key={ext.name} className="group bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 hover:bg-gray-800/50 hover:border-gray-700/50 transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-2xl">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gray-800 rounded-xl p-2 group-hover:bg-gray-700 transition-colors duration-300">
                    <Image 
                      src={`/techtips/${ext.logo}`} 
                      alt={`${ext.name} logo`} 
                      width={48} 
                      height={48} 
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors duration-300">{ext.name}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{ext.description}</p>
                  <div className="flex flex-wrap gap-2">
                    <a 
                      href={ext.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-semibold transition-colors duration-300"
                    >
                      Visit Link
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                      </svg>
                    </a>
                    {ext.linkChrome && (
                      <a 
                        href={ext.linkChrome} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 text-sm font-semibold transition-colors duration-300"
                      >
                        Chrome
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                        </svg>
                      </a>
                    )}
                  </div>
                  {ext.name === 'uBlock Origin' && (
                    <div className="mt-6 pt-4 border-t border-gray-800">
                      <h4 className="text-lg font-bold mb-2 text-yellow-400">My Filter List</h4>
                      <a 
                        href="/uBlock origin Filters.txt" 
                        download="uBlock origin Filters.txt" 
                        className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-semibold mb-4 transition-colors duration-300"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                        </svg>
                        Download Filter List
                      </a>
                      <h4 className="text-lg font-bold mb-2 text-yellow-400">My Rules</h4>
                      <CommandBlock content={uBlockRules} isCodeBlock={true} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {activeTab === 'websites' && interestingWebsites.map((tool) => (
            <div key={tool.name} className="group bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 hover:bg-gray-800/50 hover:border-gray-700/50 transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-2xl">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gray-800 rounded-xl p-2 group-hover:bg-gray-700 transition-colors duration-300">
                    <Image 
                      src={`/techtips/${tool.logo}`} 
                      alt={`${tool.name} logo`} 
                      width={48} 
                      height={48} 
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors duration-300">{tool.name}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{tool.description}</p>
                  <a 
                    href={tool.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-semibold transition-colors duration-300"
                  >
                    Visit Link
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}