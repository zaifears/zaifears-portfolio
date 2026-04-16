'use client';

import { useEffect, useRef, useState } from 'react';
import NumberInput from './NumberInput';
import { formatNumber } from '../lib/calculations';

function CopyButton({ value }: { value: number }) {
  const [isCopied, setIsCopied] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const textToCopy = formatNumber(value);

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        const tempInput = document.createElement('textarea');
        tempInput.value = textToCopy;
        tempInput.style.position = 'fixed';
        tempInput.style.left = '-9999px';
        document.body.appendChild(tempInput);
        tempInput.focus();
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
      }

      setIsCopied(true);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => setIsCopied(false), 2000);
    } catch {
      console.error('Failed to copy:', value);
    }
  };

  return (
    <button
      type='button'
      onClick={handleCopy}
      className={`relative flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all duration-300 ${
        isCopied
          ? 'border-green-400 bg-green-500/40 text-green-300'
          : 'border-[#4F8EF7] bg-[#4F8EF7]/20 text-[#B8D2FF] hover:bg-[#4F8EF7]/35 hover:text-[#E8F0FF]'
      }`}
      aria-label='Copy value'
      title={isCopied ? 'Copied!' : 'Copy to clipboard'}
    >
      <svg
        className={`absolute h-5 w-5 transition-all duration-300 ${
          isCopied ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        }`}
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        strokeWidth={2}
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z'
        />
      </svg>
      <svg
        className={`absolute h-5 w-5 transition-all duration-300 ${
          isCopied ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        }`}
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        strokeWidth={2}
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M5 13l4 4L19 7'
        />
      </svg>
    </button>
  );
}

export function SummaryInputRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className='grid items-center gap-3 rounded-lg border border-[#2A2A3A] bg-[#101019] p-3 sm:grid-cols-[1.2fr_1fr]'>
      <p className='text-sm text-[#C1C1D1]'>{label}</p>
      <NumberInput value={value} onChange={onChange} />
    </div>
  );
}

export function SummaryReadRow({ label, value }: { label: string; value: number }) {
  return (
    <div className='grid items-center gap-3 rounded-lg border border-[#2A2A3A] bg-[#101019] p-3 sm:grid-cols-[1.2fr_1fr]'>
      <p className='text-sm text-[#C1C1D1]'>{label}</p>
      <div className='rounded-md border border-[#333350]/40 bg-[#1C1C0A] px-3 py-2 text-right text-sm font-semibold text-[#C9A84C] [font-variant-numeric:tabular-nums]'>
        {formatNumber(value)}
      </div>
    </div>
  );
}

export function SummaryTotalRow({ label, value }: { label: string; value: number }) {
  return (
    <div className='flex items-center justify-between rounded-lg border border-[#705A10] bg-[#C9A84C]/20 p-3'>
      <div className='flex-1'>
        <p className='mb-1 text-xs uppercase tracking-wide text-[#D9BE73]'>{label}</p>
        <p className='text-xl font-bold text-[#F0D581] [font-variant-numeric:tabular-nums]'>
          {formatNumber(value)}
        </p>
      </div>
      <div className='ml-3 flex shrink-0 items-center'>
        <CopyButton value={value} />
      </div>
    </div>
  );
}

export function ResultCard({ label, value }: { label: string; value: number }) {
  return (
    <div className='flex flex-col rounded-xl border border-[#2A2A3A] bg-[#141422] p-4 shadow-[0_0_30px_-18px_rgba(79,142,247,0.8)]'>
      <div className='mb-2 flex items-start justify-between'>
        <p className='text-xs uppercase tracking-[0.12em] text-[#9FA1B4]'>{label}</p>
        <CopyButton value={value} />
      </div>
      <p className='text-2xl font-bold text-[#C8D8FF] [font-variant-numeric:tabular-nums]'>
        {formatNumber(value)}
      </p>
    </div>
  );
}
