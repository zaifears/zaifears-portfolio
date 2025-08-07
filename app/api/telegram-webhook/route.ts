import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Log the message content from Telegram to your Vercel logs
    if (body.message) {
      const messageText = body.message.text;
      console.log("Received message from Telegram:", messageText);
    }

    // Respond to Telegram to confirm receipt
    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ status: 'error', message: 'Internal Server Error' }, { status: 500 });
  }
}