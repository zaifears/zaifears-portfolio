'use client';

import NumberInput from './NumberInput';
import { formatNumber } from '../lib/calculations';

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
    <div className='rounded-lg border border-[#705A10] bg-[#C9A84C]/20 p-3'>
      <p className='mb-1 text-xs uppercase tracking-wide text-[#D9BE73]'>{label}</p>
      <p className='text-xl font-bold text-[#F0D581] [font-variant-numeric:tabular-nums]'>
        {formatNumber(value)}
      </p>
    </div>
  );
}

export function ResultCard({ label, value }: { label: string; value: number }) {
  return (
    <div className='rounded-xl border border-[#2A2A3A] bg-[#141422] p-4 shadow-[0_0_30px_-18px_rgba(79,142,247,0.8)]'>
      <p className='mb-2 text-xs uppercase tracking-[0.12em] text-[#9FA1B4]'>{label}</p>
      <p className='text-2xl font-bold text-[#C8D8FF] [font-variant-numeric:tabular-nums]'>
        {formatNumber(value)}
      </p>
    </div>
  );
}
