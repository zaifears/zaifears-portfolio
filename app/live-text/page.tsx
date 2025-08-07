"use client";

import { useState, useEffect } from 'react';
import Pusher from 'pusher-js';

export default function LiveTextPage() {
  const [message, setMessage] = useState("> Waiting for new message from Telegram...");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Initialize Pusher with your PUBLIC keys from Vercel
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });

    // Subscribe to the same channel as the backend
    const channel = pusher.subscribe('live-text-channel');

    // Listen for the 'new-message' event and update the state
    channel.bind('new-message', function(data: { message: string }) {
      setMessage(data.message);
    });

    // Unsubscribe when the component unmounts to prevent memory leaks
    return () => {
      pusher.unsubscribe('live-text-channel');
    };
  }, []); // The empty array ensures this effect runs only once

  const handleCopy = () => {
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
