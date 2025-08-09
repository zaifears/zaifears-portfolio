"use client";

import { useState, useEffect } from 'react';
import Pusher from 'pusher-js';

export default function LiveTextPage() {
  const [message, setMessage] = useState("> Waiting for new message from Telegram...");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    console.log('CLIENT Pusher env:', process.env.NEXT_PUBLIC_PUSHER_KEY, process.env.NEXT_PUBLIC_PUSHER_CLUSTER);

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
      forceTLS: true
    });

    pusher.connection.bind('connected', () => {
      console.log('Pusher connected, socket id:', pusher.connection.socket_id);
    });

    pusher.connection.bind('error', (err: any) => {
      console.error('Pusher connection error:', err);
    });

    const channel = pusher.subscribe('live-text-channel');

    channel.bind('new-message', function (data: { message: string }) {
      console.log('Received new-message event:', data);
      setMessage(data.message);
    });

    return () => {
      channel.unbind_all && channel.unbind_all();
      pusher.unsubscribe('live-text-channel');
      pusher.disconnect();
    };
  }, []);

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
