import crypto from 'crypto';

export interface SupportKoriWebhookData {
  itemTitle?: string;
  buyerName?: string;
  buyerEmail?: string;
  amount?: number;
  currency?: string;
  originalAmount?: number;
  originalCurrency?: string;
  orderId?: string;
  message?: string;
}

export interface SupportKoriWebhookPayload {
  id: string;
  event: string;
  creator?: string;
  createdAt?: string;
  attempt?: number;
  livemode?: boolean;
  data?: SupportKoriWebhookData;
}

const EVENT_LABELS: Record<string, string> = {
  'support.created': 'New Support Tip',
  'sale.created': 'New Product Sale',
  'course.enrolled': 'New Course Enrollment',
  'membership.joined': 'New Membership',
};

/**
 * Verifies the X-SupportKori-Signature header (`sha256=<hex>`) against the exact raw body.
 */
export function verifySupportKoriSignature(
  rawBody: string,
  headerSignature: string | null | undefined,
  secret: string
): boolean {
  if (!headerSignature || !secret) return false;

  const expected =
    'sha256=' +
    crypto.createHmac('sha256', secret).update(rawBody, 'utf8').digest('hex');

  const sigBuf = Buffer.from(headerSignature, 'utf8');
  const expectedBuf = Buffer.from(expected, 'utf8');

  if (sigBuf.length !== expectedBuf.length) return false;
  return crypto.timingSafeEqual(sigBuf, expectedBuf);
}

export function escapeTelegramHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function formatSupportKoriTelegramMessage(
  payload: SupportKoriWebhookPayload
): string {
  const isTest = payload.livemode === false;
  const title = EVENT_LABELS[payload.event] ?? payload.event ?? 'SupportKori Event';
  const d = payload.data ?? {};

  const lines: string[] = [];

  lines.push(
    isTest
      ? `<b>[TEST] SupportKori: ${escapeTelegramHtml(title)}</b>`
      : `<b>SupportKori: ${escapeTelegramHtml(title)}</b>`
  );

  if (d.buyerName) {
    lines.push(`<b>From:</b> ${escapeTelegramHtml(d.buyerName)}`);
  }

  if (d.buyerEmail) {
    lines.push(`<b>Email:</b> ${escapeTelegramHtml(d.buyerEmail)}`);
  }

  if (typeof d.amount === 'number') {
    const currency = d.currency || 'BDT';
    const bdtText = currency === 'BDT' ? `৳${d.amount} BDT` : `${d.amount} ${currency}`;
    if (
      typeof d.originalAmount === 'number' &&
      d.originalCurrency &&
      d.originalCurrency !== currency
    ) {
      lines.push(
        `<b>Amount:</b> ${escapeTelegramHtml(bdtText)} (paid ${escapeTelegramHtml(
          `${d.originalAmount} ${d.originalCurrency}`
        )})`
      );
    } else {
      lines.push(`<b>Amount:</b> ${escapeTelegramHtml(bdtText)}`);
    }
  }

  if (d.itemTitle) {
    lines.push(`<b>Item:</b> ${escapeTelegramHtml(d.itemTitle)}`);
  }

  if (d.message) {
    lines.push(`<b>Note:</b> ${escapeTelegramHtml(d.message)}`);
  }

  if (d.orderId) {
    lines.push(`<b>Order ID:</b> <code>${escapeTelegramHtml(d.orderId)}</code>`);
  }

  if (payload.createdAt) {
    lines.push(`<b>Time:</b> ${escapeTelegramHtml(payload.createdAt)}`);
  }

  return lines.join('\n');
}
