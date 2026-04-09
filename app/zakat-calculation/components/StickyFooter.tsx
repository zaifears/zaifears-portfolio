'use client';

import { formatNumber } from '../lib/calculations';

interface Props {
  netZakatableAssets: number;
  onExport: () => Promise<void>;
}

export default function StickyFooter({ netZakatableAssets, onExport }: Props) {
  return (
    <div className='fixed inset-x-0 bottom-0 z-50 border-t border-[#2A2A3A] bg-[#11111A]/95 px-4 py-3 backdrop-blur sm:px-6 lg:px-10'>
      <div className='mx-auto flex max-w-350 items-center justify-between gap-4'>
        <div>
          <p className='text-xs uppercase tracking-[0.12em] text-[#888899]'>Net Zakatable Assets</p>
          <p className='text-lg font-semibold text-[#E6C86A] [font-variant-numeric:tabular-nums]'>
            {formatNumber(netZakatableAssets)}
          </p>
        </div>
        <button
          type='button'
          onClick={onExport}
          className='rounded-xl border border-[#C9A84C] bg-[#C9A84C] px-4 py-2 text-sm font-bold text-[#121212] transition hover:brightness-105'
        >
          Download Excel
        </button>
      </div>
    </div>
  );
}
