import { NextResponse } from 'next/server';
import Pusher from 'pusher';

// Initialize Pusher with server-side credentials
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

    console.log('--- TELEGRAM WEBHOOK BODY ---', JSON.stringify(body, null, 2));
    console.log('PUSHER ENV (server):', {
      appId: process.env.PUSHER_APP_ID,
      key: process.env.NEXT_PUBLIC_PUSHER_KEY,
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER
    });

    if (body.message && body.message.text) {
      const messageText = body.message.text;
      console.log('messageText:', messageText);

      const res = await pusher.trigger('live-text-channel', 'new-message', {
        message: messageText
      });
      console.log('pusher trigger response:', res);
    } else {
      console.warn('No message.text found in webhook payload');
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
