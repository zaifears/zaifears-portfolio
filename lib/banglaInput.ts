export type BanglaInputMethod = 'unicode' | 'bijoy-ansi' | 'neutral';

const BANGLA_UNICODE_PATTERN = /[\u0980-\u09FF]/;
const BIJOY_LEGACY_PATTERN = /[\u00A1-\u00FF†‡ˆ‰Š‹Œ‘’“”•–—˜™›œ]/;

export const detectBanglaInputMethod = (value: string): BanglaInputMethod => {
  if (!value) {
    return 'neutral';
  }

  if (BANGLA_UNICODE_PATTERN.test(value)) {
    return 'unicode';
  }

  if (BIJOY_LEGACY_PATTERN.test(value)) {
    return 'bijoy-ansi';
  }

  return 'neutral';
};

export const normalizeUserText = (value: string): string => value.replace(/\r\n?/g, '\n').trim();
