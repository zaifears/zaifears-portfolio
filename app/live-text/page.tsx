"use client"; // This component needs to be a client component to manage state

import { useState } from 'react';

// This is the new, interactive component for your Live Text page.
export default function LiveTextPage() {
  // State to hold the message. We'll update this in a later step.
  const [message, setMessage] = useState("> Waiting for new message from Telegram...");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    // We only copy the actual message, not the "> Waiting..." placeholder
    const textToCopy = message.startsWith('>') ? '' : message;
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <section>
      <h1 className="font-bold text-3xl md:text-4xl mb-8">Live Text</h1>
      
      {/* This is the terminal-like display area */}
      <div className="bg-black border border-neutral-800 rounded-lg p-6 font-mono text-green-400 min-h-[200px] relative">
        <p className={message.startsWith('>') ? "text-neutral-500" : ""}>
          {message}
        </p>
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 bg-gray-700 hover:bg-gray-600 text-white text-xs font-bold py-1 px-2 rounded disabled:opacity-50"
          disabled={message.startsWith('>')}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      <p className="text-sm text-neutral-500 mt-4">
        This page will automatically update with the latest message I send via a private Telegram bot.
      </p>
    </section>
  );
}
