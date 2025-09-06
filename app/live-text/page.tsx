"use client";  
  
import { useState, useEffect } from 'react';  
import Pusher from 'pusher-js';  
  
export default function LiveTextPage() {  
  const [messages, setMessages] = useState<string[]>([]);  
  const [copiedStates, setCopiedStates] = useState<{ [key: number]: boolean }>({});  
  const [isLoading, setIsLoading] = useState(true);  
  const [error, setError] = useState<string | null>(null);  
  
  useEffect(() => {  
    const fetchHistory = async () => {  
      setIsLoading(true);  
      setError(null);  
        
      try {  
        const response = await fetch('/api/telegram-webhook', {  
          method: 'GET',  
          headers: {  
            'Content-Type': 'application/json',  
          },  
        });  
          
        if (!response.ok) {  
          throw new Error(`HTTP error! status: ${response.status}`);  
        }  
          
        const history = await response.json();  
          
        if (Array.isArray(history)) {  
          setMessages(history);  
        } else {  
          console.log('History is not an array:', history);  
          setMessages([]);  
        }  
      } catch (error) {  
        console.error('Failed to fetch history:', error);  
        setError('Failed to load messages. Using live updates only.');  
        setMessages([]); 
      } finally {  
        setIsLoading(false);  
      }  
    };  
  
    fetchHistory();  
  
    let pusher: Pusher | null = null;  
    let channel: any = null;  
  
    try {  
      pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {  
        cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,  
        forceTLS: true,  
      });  
  
      channel = pusher.subscribe('live-text-channel');  
  
      channel.bind('new-message', function (data: { message: string }) {  
        setMessages(prevMessages => {  
          const currentMessages = Array.isArray(prevMessages) ? prevMessages : [];  
          const newMessages = [data.message, ...currentMessages];  
          return newMessages.slice(0, 3);  
        });  
      });  
    } catch (pusherError) {  
      console.error('Pusher initialization error:', pusherError);  
    }  
  
    return () => {  
      if (channel) {  
        channel.unbind_all();  
      }  
      if (pusher) {  
        pusher.unsubscribe('live-text-channel');  
        pusher.disconnect();  
      }  
    };  
  }, []);  
  
  const handleCopy = async (message: string, index: number) => {  
    if (message && !message.startsWith('>')) {  
      try {  
        await navigator.clipboard.writeText(message);  
        setCopiedStates({ ...copiedStates, [index]: true });  
        setTimeout(() => {  
          setCopiedStates(prev => ({ ...prev, [index]: false }));  
        }, 2000);  
      } catch (err) {  
        console.error('Failed to copy text:', err);  
        const textArea = document.createElement('textarea');  
        textArea.value = message;  
        document.body.appendChild(textArea);  
        textArea.select();  
        try {  
          document.execCommand('copy');  
          setCopiedStates({ ...copiedStates, [index]: true });  
          setTimeout(() => {  
            setCopiedStates(prev => ({ ...prev, [index]: false }));  
          }, 2000);  
        } catch (fallbackErr) {  
          console.error('Fallback copy failed:', fallbackErr);  
        }  
        document.body.removeChild(textArea);  
      }  
    }  
  };  
  
  if (isLoading) {  
    return (  
      <section>  
        <h1 className="font-bold text-3xl md:text-4xl mb-8">Live Text</h1>  
        <div className="flex flex-col items-center justify-center min-h-[200px] text-center">  
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>  
          <p className="text-gray-600 dark:text-neutral-400">Loading messages...</p>  
        </div>  
      </section>  
    );  
  }  
  
  return (  
    <section>  
      <h1 className="font-bold text-3xl md:text-4xl mb-8">Live Text</h1>  
  
      {error && (  
        <div className="bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-800 rounded-lg p-4 mb-6">  
          <p className="text-yellow-800 dark:text-yellow-400 text-sm">⚠️ {error}</p>  
        </div>  
      )}  
  
      <div className="bg-gray-900 dark:bg-black border border-gray-700 dark:border-neutral-800 rounded-lg p-6 font-mono text-green-400 min-h-[200px] space-y-4">  
        {messages.length > 0 ? (  
          messages.map((msg, index) => (  
            <div key={index} className="relative flex justify-between items-start">  
              <p className={msg.startsWith('>') ? "text-gray-500" : ""}>  
                {msg}  
              </p>  
              <button  
                onClick={() => handleCopy(msg, index)}  
                className="bg-gray-700 hover:bg-gray-600 text-white text-xs font-bold py-1 px-2 rounded disabled:opacity-50 flex-shrink-0 ml-4 transition-colors"  
                disabled={msg.startsWith('>')}  
              >  
                {copiedStates[index] ? 'Copied!' : 'Copy'}  
              </button>  
            </div>  
          ))  
        ) : (  
          <p className="text-gray-500">{"> Waiting for new message from Telegram..."}</p>  
        )}  
      </div>  
  
      <p className="text-sm text-gray-600 dark:text-neutral-500 mt-4">  
        This page will automatically update with the latest message I send via a private Telegram bot. It now remembers the last 3 messages.  
      </p>  
    </section>  
  );  
}