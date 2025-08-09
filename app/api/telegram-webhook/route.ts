import { NextResponse } from 'next/server';  
import Pusher from 'pusher';  
import { kv } from '@vercel/kv';  
  
// Initialize Pusher with server-side credentials  
const pusher = new Pusher({  
  appId: process.env.PUSHER_APP_ID!,  
  key: process.env.NEXT_PUBLIC_PUSHER_KEY!,  
  secret: process.env.PUSHER_SECRET!,  
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,  
  useTLS: true  
});  
  
// The key for our message list in the KV store  
const MESSAGE_HISTORY_KEY = 'live_text_history';  
  
export async function POST(request: Request) {  
  try {  
    const body = await request.json();  
  
    if (body.message && body.message.text) {  
      const messageText = body.message.text;  
  
      // Add the new message to the list in Vercel KV  
      await kv.lpush(MESSAGE_HISTORY_KEY, messageText);  
  
      // Keep only the last 3 messages  
      await kv.ltrim(MESSAGE_HISTORY_KEY, 0, 2);  
  
      // Trigger the new message event via Pusher  
      await pusher.trigger('live-text-channel', 'new-message', {  
        message: messageText  
      });  
    }  
  
    return NextResponse.json({ status: 'ok' });  
  } catch (error) {  
    console.error('Error processing request:', error);  
    return NextResponse.json(  
      { status: 'error', message: 'Internal Server Error' },  
      { status: 500 }  
    );  
  }  
}  
  
// Updated GET endpoint with better error handling  
export async function GET() {  
  try {  
    // Check if KV is available  
    if (!kv) {  
      console.log('KV not available, returning empty array');  
      return NextResponse.json([]);  
    }  
  
    // Fetch the list of messages from Vercel KV  
    const messageHistory = await kv.lrange(MESSAGE_HISTORY_KEY, 0, 2);  
      
    // Ensure we always return an array  
    const messages = Array.isArray(messageHistory) ? messageHistory : [];  
      
    return NextResponse.json(messages);  
  } catch (error) {  
    console.error('Error fetching history from KV:', error);  
      
    // Return empty array instead of error to prevent breaking the UI  
    return NextResponse.json([]);  
  }  
}  