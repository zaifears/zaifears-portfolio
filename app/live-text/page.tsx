"use client";

import { useState, useEffect } from 'react';
import Pusher from 'pusher-js';

export default function LiveTextPage() {
  const [messages, setMessages] = useState<string[]>([]);
  const [copiedStates, setCopiedStates] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    // Fetch initial history when the component mounts
    const fetchHistory = async () => {
      try {
        const response = await fetch('/api/telegram-webhook');
        const history = await response.json();
        setMessages(history);
      } catch (error) {
        console.error('Failed to fetch history:', error);
      }
    };

    fetchHistory();

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
        cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
        forceTLS: true,
    });

    const channel = pusher.subscribe('live-text-channel');

    // Listen for new messages and update the list
    channel.bind('new-message', function (data: { message: string }) {
      setMessages(prevMessages => {
        const newMessages = [data.message, ...prevMessages];
        // Keep only the last 3 messages
        return newMessages.slice(0, 3);
      });
    });

    return () => {
      channel.unbind_all();
      pusher.unsubscribe('live-text-channel');
      pusher.disconnect();
    };
  }, []);

  const handleCopy = (message: string, index: number) => {
    if (message && !message.startsWith('>')) {
      navigator.clipboard.writeText(message).then(() => {
        setCopiedStates({ ...copiedStates, [index]: true });
        setTimeout(() => {
          setCopiedStates(prev => ({ ...prev, [index]: false }));
        }, 2000);
      });
    }
  };

  return (
    <section>
      <h1 className="font-bold text-3xl md:text-4xl mb-8">Live Text</h1>

      <div className="bg-black border border-neutral-800 rounded-lg p-6 font-mono text-green-400 min-h-[200px] space-y-4">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div key={index} className="relative flex justify-between items-start">
              <p className={msg.startsWith('>') ? "text-neutral-500" : ""}>
                {msg}
              </p>
              <button
                onClick={() => handleCopy(msg, index)}
                className="bg-gray-700 hover:bg-gray-600 text-white text-xs font-bold py-1 px-2 rounded disabled:opacity-50 flex-shrink-0 ml-4"
                disabled={msg.startsWith('>')}
              >
                {copiedStates[index] ? 'Copied!' : 'Copy'}
              </button>
            </div>
          ))
        ) : (
          <p className="text-neutral-500">{"> Waiting for new message from Telegram..."}</p>
        )}
      </div>

      <p className="text-sm text-neutral-500 mt-4">
        This page will automatically update with the latest message I send via a private Telegram bot. It now remembers the last 3 messages.
      </p>
    </section>
  );
}