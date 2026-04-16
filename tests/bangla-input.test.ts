import assert from 'node:assert/strict';
import test from 'node:test';

import { detectBanglaInputMethod, normalizeUserText } from '../lib/banglaInput';
import { autoConvertBijoyAnsiToUnicode } from '../lib/banglaServer';

test('detects Unicode Bangla input', () => {
  assert.equal(detectBanglaInputMethod('আমার বাংলা'), 'unicode');
});

test('detects Bijoy ANSI input', () => {
  assert.equal(detectBanglaInputMethod('Avgvi †mvbvi evsjv'), 'bijoy-ansi');
});

test('detects neutral input', () => {
  assert.equal(detectBanglaInputMethod('Client Name 123'), 'neutral');
});

test('normalizes line breaks and trims outer whitespace', () => {
  const input = '  first line\r\nsecond line\rthird line  ';
  assert.equal(normalizeUserText(input), 'first line\nsecond line\nthird line');
});

test('converts Bijoy ANSI to Unicode Bangla', () => {
  const converted = autoConvertBijoyAnsiToUnicode('Avgvi †mvbvi evsjv, Avwg †Zvgvq fv‡jvevwm|');
  assert.equal(converted, 'আমার সোনার বাংলা, আমি তোমায় ভালোবাসি।');
});

test('keeps Unicode Bangla unchanged', () => {
  const unicodeText = 'আমি বাংলায় লিখি';
  assert.equal(autoConvertBijoyAnsiToUnicode(unicodeText), unicodeText);
});
