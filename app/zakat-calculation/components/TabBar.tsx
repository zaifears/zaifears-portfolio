'use client';

import { TabKey } from '../lib/types';

interface TabBarProps {
  activeTab: TabKey;
  setActiveTab: (tab: TabKey) => void;
}

const tabs: { key: TabKey; label: string }[] = [
  { key: 'client', label: 'Client Info' },
  { key: 'gold-silver', label: 'Gold & Silver' },
  { key: 'cash-bank', label: 'Cash & Bank Deposits' },
  { key: 'other-assets', label: 'Other Business Assets' },
  { key: 'debts', label: 'Debts' },
  { key: 'summary', label: 'Summary' },
];

export default function TabBar({ activeTab, setActiveTab }: TabBarProps) {
  return (
    <div className='mb-8 flex flex-wrap gap-2 rounded-2xl border border-[#2A2A3A] bg-[#12121A] p-2'>
      {tabs.map((tab) => {
        const active = activeTab === tab.key;
        return (
          <button
            key={tab.key}
            type='button'
            onClick={() => setActiveTab(tab.key)}
            className={`rounded-xl px-4 py-2 text-sm transition ${
              active
                ? 'bg-[#C9A84C] font-semibold text-[#0A0A0F]'
                : 'text-[#888899] hover:bg-[#1A1A2A] hover:text-[#F0F0F0]'
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
