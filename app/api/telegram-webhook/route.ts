import { NextResponse } from 'next/server';
import Pusher from 'pusher';

// Initialize Pusher with your server-side credentials from Vercel
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
  useTLS: true
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (body.message) {
      const messageText = body.message.text;
      console.log("Received from Telegram, sending to Pusher:", messageText);

      // Trigger an event on the 'live-text-channel'
      // The frontend will be listening for the 'new-message' event
      await pusher.trigger('live-text-channel', 'new-message', {
        message: messageText
      });
    }

    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ status: 'error', message: 'Internal Server Error' }, { status: 500 });
  }
}
