import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import {
  escapeTelegramHtml,
  formatSupportKoriTelegramMessage,
  verifySupportKoriSignature,
} from '../lib/supportkoriWebhook';

describe('SupportKori webhook verification', () => {
  const secret = 'sk_test_signing_secret_12345';
  const rawBody = JSON.stringify({
    id: '703365aa-8c9e-4a84-9999-abcdef123456',
    event: 'support.created',
    creator: 'zaifears',
    createdAt: '2026-11-21T11:20:00Z',
    attempt: 1,
    livemode: true,
    data: {
      itemTitle: 'Coffee',
      buyerName: 'Rahim',
      amount: 150,
      currency: 'BDT',
      originalAmount: 150,
      originalCurrency: 'BDT',
      orderId: 'BwL0yR1W99',
    },
  });

  const validSig =
    'sha256=' +
    crypto.createHmac('sha256', secret).update(rawBody, 'utf8').digest('hex');

  it('accepts a valid HMAC-SHA256 signature on the exact raw body', () => {
    assert.equal(verifySupportKoriSignature(rawBody, validSig, secret), true);
  });

  it('rejects a tampered body or wrong secret', () => {
    assert.equal(verifySupportKoriSignature(rawBody + ' ', validSig, secret), false);
    assert.equal(verifySupportKoriSignature(rawBody, validSig, 'wrong_secret'), false);
  });

  it('rejects missing or malformed signatures without throwing', () => {
    assert.equal(verifySupportKoriSignature(rawBody, null, secret), false);
    assert.equal(verifySupportKoriSignature(rawBody, 'sha256=short', secret), false);
    assert.equal(verifySupportKoriSignature(rawBody, '', secret), false);
  });
});

describe('SupportKori Telegram alert formatting', () => {
  it('formats a live tip with USD original currency cleanly and escapes HTML', () => {
    const msg = formatSupportKoriTelegramMessage({
      id: 'deliv_1',
      event: 'support.created',
      livemode: true,
      createdAt: '2026-11-21T11:20:00Z',
      data: {
        buyerName: 'A <Script> & Co',
        amount: 600,
        currency: 'BDT',
        originalAmount: 5,
        originalCurrency: 'USD',
        itemTitle: 'Coffee x 3',
        orderId: 'ORD-123',
      },
    });

    assert.match(msg, /SupportKori: New Support Tip/);
    assert.match(msg, /A &lt;Script&gt; &amp; Co/);
    assert.match(msg, /৳600 BDT \(paid 5 USD\)/);
    assert.match(msg, /ORD-123/);
    assert.doesNotMatch(msg, /\[TEST\]/);
  });

  it('marks test events clearly when livemode is false', () => {
    const msg = formatSupportKoriTelegramMessage({
      id: 'deliv_test',
      event: 'sale.created',
      livemode: false,
      data: {
        buyerName: 'Test User',
        buyerEmail: 'test@example.com',
        amount: 500,
        currency: 'BDT',
      },
    });

    assert.match(msg, /\[TEST\] SupportKori: New Product Sale/);
    assert.match(msg, /test@example\.com/);
    assert.equal(escapeTelegramHtml('<b>&</b>'), '&lt;b&gt;&amp;&lt;/b&gt;');
  });
});
