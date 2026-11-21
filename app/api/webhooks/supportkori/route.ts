import { NextRequest, NextResponse } from 'next/server';
import {
  formatSupportKoriTelegramMessage,
  type SupportKoriWebhookPayload,
  verifySupportKoriSignature,
} from '@/lib/supportkoriWebhook';

export const runtime = 'nodejs';

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: 'supportkori-webhook',
    configured: Boolean(process.env.SUPPORTKORI_WEBHOOK_SECRET),
    telegramReady: Boolean(
      process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID
    ),
  });
}

export async function POST(request: NextRequest) {
  const secret = process.env.SUPPORTKORI_WEBHOOK_SECRET;
  if (!secret) {
    console.error('[supportkori-webhook] SUPPORTKORI_WEBHOOK_SECRET is not set');
    return NextResponse.json(
      { ok: false, error: 'Webhook secret not configured' },
      { status: 500 }
    );
  }

  const rawBody = await request.text();
  const signature = request.headers.get('x-supportkori-signature');
  const deliveryId = request.headers.get('x-supportkori-delivery') || undefined;
  const headerEvent = request.headers.get('x-supportkori-event') || undefined;

  if (!verifySupportKoriSignature(rawBody, signature, secret)) {
    return NextResponse.json(
      { ok: false, error: 'Invalid webhook signature' },
      { status: 401 }
    );
  }

  let payload: SupportKoriWebhookPayload;
  try {
    payload = JSON.parse(rawBody) as SupportKoriWebhookPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Invalid JSON payload' },
      { status: 400 }
    );
  }

  const eventName = payload.event || headerEvent || 'unknown';
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  let telegramSent = false;

  if (botToken && chatId) {
    const text = formatSupportKoriTelegramMessage({
      ...payload,
      event: eventName,
    });

    try {
      const tgRes = await fetch(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text,
            parse_mode: 'HTML',
            disable_web_page_preview: true,
          }),
          signal: AbortSignal.timeout(4000),
        }
      );

      if (!tgRes.ok) {
        const errText = await tgRes.text().catch(() => '');
        console.error(
          `[supportkori-webhook] Telegram API error (${tgRes.status}): ${errText}`
        );
      } else {
        telegramSent = true;
      }
    } catch (error) {
      console.error('[supportkori-webhook] Failed to reach Telegram API:', error);
    }
  } else {
    console.warn(
      '[supportkori-webhook] Verified event received, but TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is missing.'
    );
  }

  return NextResponse.json({
    ok: true,
    deliveryId: deliveryId ?? payload.id ?? null,
    event: eventName,
    livemode: payload.livemode ?? true,
    telegramSent,
  });
}
