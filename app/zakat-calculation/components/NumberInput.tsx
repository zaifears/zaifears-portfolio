'use client';

import { useEffect, useState } from 'react';
import { formatNumber, parseNumericInput } from '../lib/calculations';

interface NumberInputProps {
  value: number;
  onChange: (nextValue: number) => void;
  placeholder?: string;
  disabled?: boolean;
}

export default function NumberInput({
  value,
  onChange,
  placeholder,
  disabled,
}: NumberInputProps) {
  const [focused, setFocused] = useState(false);
  const [draft, setDraft] = useState('');

  useEffect(() => {
    if (!focused) {
      setDraft(formatNumber(value));
    }
  }, [focused, value]);

  return (
    <input
      type='text'
      inputMode='decimal'
      value={draft}
      placeholder={placeholder}
      disabled={disabled}
      onFocus={() => {
        setFocused(true);
        setDraft(String(value || ''));
      }}
      onBlur={() => {
        setFocused(false);
        setDraft(formatNumber(value));
      }}
      onChange={(event) => {
        const nextText = event.target.value;
        setDraft(nextText);
        onChange(parseNumericInput(nextText));
      }}
      className={`w-full rounded-md border bg-[#1A1A28] px-3 py-2 text-right text-sm text-[#F0F0F0] outline-none transition [font-variant-numeric:tabular-nums] ${
        disabled
          ? 'cursor-not-allowed border-[#333350]/40 bg-[#1C1C0A] text-[#C9A84C]'
          : 'border-[#333350] focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/40'
      }`}
    />
  );
}
