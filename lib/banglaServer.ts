import bnAnsiToUnicode from 'bn-ansi-to-unicode';

import { detectBanglaInputMethod } from './banglaInput';

export const autoConvertBijoyAnsiToUnicode = (value: string): string => {
  if (!value) {
    return value;
  }

  const method = detectBanglaInputMethod(value);
  if (method !== 'bijoy-ansi') {
    return value;
  }

  try {
    const converted = bnAnsiToUnicode(value);
    return detectBanglaInputMethod(converted) === 'unicode' ? converted : value;
  } catch (error) {
    console.error('[generate-zakat-report] ANSI to Unicode conversion failed:', error);
    return value;
  }
};
