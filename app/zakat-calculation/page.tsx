'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

type LineItem = {
  id: string;
  label: string;
  description: string;
  amount: number;
  amountStatus?: 'valid' | 'invalid' | null;
};

type BusinessInfo = {
  name: string;
  address: string;
  email: string;
  calendarType: 'gregorian' | 'hijri';
  zakatYear: string;
};

type SummaryState = {
  businessInfo: BusinessInfo;
  assets: LineItem[];
  liabilities: LineItem[];
};

const numFmt = new Intl.NumberFormat('en-BD', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const createId = () =>
  typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);

const formatNumber = (value: number) => numFmt.format(Number.isFinite(value) ? value : 0);

const parseNumericInputDetailed = (
  value: string,
): { amount: number; status: 'valid' | 'invalid' | null } => {
  const trimmed = value.trim();
  if (!trimmed) {
    return { amount: 0, status: null };
  }

  const normalized = trimmed.replace(/,/g, '').replace(/\s+/g, '');
  if (!/^-?\d*\.?\d*$/.test(normalized) || normalized === '-' || normalized === '.') {
    return { amount: 0, status: 'invalid' };
  }

  const parsed = Number(normalized);
  if (!Number.isFinite(parsed)) {
    return { amount: 0, status: 'invalid' };
  }

  return { amount: parsed, status: 'valid' };
};

const sumLineItems = (items: LineItem[]) =>
  items.reduce((sum, row) => sum + (Number.isFinite(row.amount) ? row.amount : 0), 0);

const formatYearRange = (startYear: number) =>
  `${startYear}-${String((startYear + 1) % 100).padStart(2, '0')}`;

const parseYearStart = (value: string) => {
  const matched = value.match(/^(\d{4})\s*-\s*\d{2,4}$/);
  if (!matched) {
    return null;
  }
  const parsed = Number(matched[1]);
  return Number.isFinite(parsed) ? parsed : null;
};

const extractFilename = (contentDisposition: string | null) => {
  if (!contentDisposition) {
    return null;
  }
  const utf8Match = contentDisposition.match(/filename\*=UTF-8''([^;]+)/i);
  if (utf8Match?.[1]) {
    return decodeURIComponent(utf8Match[1]);
  }
  const simpleMatch = contentDisposition.match(/filename="?([^";]+)"?/i);
  return simpleMatch?.[1] ?? null;
};

const defaultState: SummaryState = {
  businessInfo: {
    name: '',
    address: '',
    email: '',
    calendarType: 'hijri',
    zakatYear: '1446-47',
  },
  assets: [
    { id: 'a1', label: 'Investment in FDR', description: '', amount: 0, amountStatus: null },
    { id: 'a2', label: 'Inventory', description: '', amount: 0, amountStatus: null },
    {
      id: 'a3',
      label: 'Advance to Employee Against Expenses',
      description: '',
      amount: 0,
      amountStatus: null,
    },
    { id: 'a4', label: 'Advance to Suppliers', description: '', amount: 0, amountStatus: null },
    { id: 'a5', label: 'Accounts Receivable', description: '', amount: 0, amountStatus: null },
    { id: 'a6', label: 'Inter Company Receivables', description: '', amount: 0, amountStatus: null },
    { id: 'a7', label: 'Cash & Cash Equavalents', description: '', amount: 0, amountStatus: null },
  ],
  liabilities: [
    { id: 'd1', label: 'Accounts Payable', description: '', amount: 0, amountStatus: null },
    { id: 'd2', label: 'Short-Term Loans', description: '', amount: 0, amountStatus: null },
    { id: 'd3', label: 'Accrued Liabilities', description: '', amount: 0, amountStatus: null },
  ],
};

interface NumberInputProps {
  value: number;
  status: 'valid' | 'invalid' | null;
  onChange: (value: number, status: 'valid' | 'invalid' | null) => void;
}

function NumberInput({ value, status, onChange }: NumberInputProps) {
  const [focused, setFocused] = useState(false);
  const [draft, setDraft] = useState('');

  useEffect(() => {
    if (!focused) {
      setDraft(formatNumber(value));
    }
  }, [focused, value]);

  return (
    <div className='relative w-full flex items-center'>
      <input
        type='text'
        inputMode='decimal'
        value={draft}
        onFocus={() => {
          setFocused(true);
          setDraft(value === 0 ? '' : String(Number.isFinite(value) ? value : ''));
        }}
        onBlur={() => {
          setFocused(false);
          setDraft(formatNumber(value));
        }}
        onChange={(event) => {
          setDraft(event.target.value);
          const parsed = parseNumericInputDetailed(event.target.value);
          onChange(parsed.amount, parsed.status);
        }}
        onPaste={(event) => {
          const pastedText = event.clipboardData.getData('text');
          event.preventDefault();
          setDraft(pastedText);
          const parsed = parseNumericInputDetailed(pastedText);
          onChange(parsed.amount, parsed.status);
        }}
        className={`w-full rounded-md border bg-white px-3 py-2 pr-8 text-right text-sm text-[#1F2937] outline-none transition focus:ring-2 [font-variant-numeric:tabular-nums] ${
          status === 'invalid'
            ? 'border-[#F87171] focus:border-[#DC2626] focus:ring-[#DC2626]/20'
            : 'border-[#C9CFCC] focus:border-[#068C44] focus:ring-[#068C44]/30'
        }`}
      />
      {status === 'valid' && (
        <span className='absolute right-2.5 flex h-4 w-4 items-center justify-center text-[#16A34A]' title="Valid number">
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
        </span>
      )}
      {status === 'invalid' && (
        <span className='absolute right-2.5 flex h-4 w-4 items-center justify-center text-[#DC2626]' title="Invalid format">
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        </span>
      )}
    </div>
  );
}

interface LineItemEditorProps {
  title: string;
  items: LineItem[];
  setItems: React.Dispatch<React.SetStateAction<LineItem[]>>;
  accent: 'gold' | 'red';
}

function LineItemEditor({ title, items, setItems, accent }: LineItemEditorProps) {
  const isDeductables = accent === 'red';

  return (
    <section className='rounded-xl border border-[#D4D9D7] bg-white p-4'>
      <div className='mb-4'>
        <h2 className={`text-lg font-semibold ${isDeductables ? 'text-[#B42318]' : 'text-[#068C44]'}`}>
          {title}
        </h2>
      </div>

      <div className='space-y-3'>
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`group flex flex-col gap-2 rounded-lg border p-3 sm:flex-row sm:items-center sm:gap-3 transition duration-200 hover:shadow-sm ${
              isDeductables
                ? 'border-[#F8D3D0] bg-[#FFF8F8] hover:border-[#F2B8B5]'
                : 'border-[#E5E7EB] bg-[#F9FAF9] hover:border-[#D1D5DB]'
            }`}
          >
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md border bg-white px-3 py-2 text-sm font-semibold transition-colors ${
                isDeductables
                  ? 'border-[#F2B8B5] text-[#B42318] group-hover:border-[#B42318]/40'
                  : 'border-[#D1D5DB] text-[#636467] group-hover:border-[#A2A2B2]'
              }`}
            >
              {index + 1}
            </div>
            <input
              type='text'
              value={item.label}
              onChange={(event) =>
                setItems((prev) =>
                  prev.map((row) =>
                    row.id === item.id ? { ...row, label: event.target.value } : row,
                  ),
                )
              }
              placeholder='Heading'
              className={`h-9 flex-1 min-w-0 rounded-md border bg-white px-3 py-1.5 text-sm text-[#1F2937] outline-none focus:ring-2 transition-colors ${
                isDeductables
                  ? 'border-[#F2B8B5]/60 focus:border-[#B42318] focus:ring-[#B42318]/25 hover:border-[#F2B8B5]'
                  : 'border-[#C9CFCC]/60 focus:border-[#068C44] focus:ring-[#068C44]/30 hover:border-[#C9CFCC]'
              }`}
            />
            <input
              type='text'
              value={item.description}
              onChange={(event) =>
                setItems((prev) =>
                  prev.map((row) =>
                    row.id === item.id ? { ...row, description: event.target.value } : row,
                  ),
                )
              }
              placeholder='Description (optional)'
              className={`h-9 w-full shrink-0 sm:w-40 md:w-52 lg:w-64 min-w-0 rounded-md border bg-white px-3 py-1.5 text-sm text-[#1F2937] outline-none focus:ring-2 transition-colors ${
                isDeductables
                  ? 'border-[#F2B8B5]/60 focus:border-[#B42318] focus:ring-[#B42318]/25 hover:border-[#F2B8B5]'
                  : 'border-[#C9CFCC]/60 focus:border-[#068C44] focus:ring-[#068C44]/30 hover:border-[#C9CFCC]'
              }`}
            />
            <div className="w-full shrink-0 sm:w-56 md:w-64 lg:w-72">
              <NumberInput
                value={item.amount}
                status={item.amountStatus ?? null}
                onChange={(value, status) =>
                  setItems((prev) =>
                    prev.map((row) =>
                      row.id === item.id
                        ? { ...row, amount: value, amountStatus: status }
                        : row,
                    ),
                  )
                }
              />
            </div>
            <button
              type='button'
              onClick={() => setItems((prev) => prev.filter((row) => row.id !== item.id))}
              title="Remove item"
              className={`ml-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-md border text-sm outline-none transition-colors ${
                isDeductables 
                  ? 'border-transparent text-[#B91C1C]/60 hover:bg-[#FEE2E2] hover:text-[#B91C1C] focus:bg-[#FEE2E2] focus:text-[#B91C1C]' 
                  : 'border-transparent text-[#6B7280] hover:bg-[#FEE2E2] hover:text-[#B91C1C] focus:bg-[#FEE2E2] focus:text-[#B91C1C]'
              }`}
            >
              <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <div className='mt-4 flex justify-end'>
        <button
          type='button'
          onClick={() =>
            setItems((prev) => [
              ...prev,
              {
                id: createId(),
                label: '',
                description: '',
                amount: 0,
                amountStatus: null,
              },
            ])
          }
          className={`flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-semibold transition-all ${
            isDeductables
              ? 'border-transparent bg-[#FFF8F8] text-[#B91C1C] hover:border-[#F2B8B5] hover:bg-[#FEE2E2]'
              : 'border-transparent bg-[#F9FAF9] text-[#068C44] hover:border-[#C9CFCC] hover:bg-[#E8F3EE]'
          }`}
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Item
        </button>
      </div>

      <div
        className={`mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-lg border p-4 transition-colors ${
          accent === 'gold'
            ? 'border-[#068C44]/20 bg-[#068C44]/5'
            : 'border-[#F2B8B5]/50 bg-[#FEF2F2]'
        }`}
      >
        <p className={`text-xs font-bold uppercase tracking-widest ${isDeductables ? 'text-[#B42318]' : 'text-[#4B5563]'}`}>
          {accent === 'gold' ? 'Total Zakatable Assets' : 'Total Deductables'}
        </p>
        <p
          className={`mt-1 sm:mt-0 text-xl md:text-2xl font-bold [font-variant-numeric:tabular-nums] ${
            isDeductables ? 'text-[#B42318]' : 'text-[#1F2937]'
          }`}
        >
          {formatNumber(sumLineItems(items))}
        </p>
      </div>
    </section>
  );
}

export default function ZakatCalculationPage() {
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>(defaultState.businessInfo);
  const [assets, setAssets] = useState<LineItem[]>(defaultState.assets);
  const [liabilities, setLiabilities] = useState<LineItem[]>(defaultState.liabilities);
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);

  const totals = useMemo(() => {
    const totalAssets = sumLineItems(assets);
    const totalDebt = sumLineItems(liabilities);
    const netZakatableAssets = totalAssets - totalDebt;

    return {
      totalAssets,
      totalDebt,
      netZakatableAssets,
      zakat250: netZakatableAssets * 0.025,
      zakat2577: netZakatableAssets * 0.02577,
      zakat260: netZakatableAssets * 0.026,
    };
  }, [assets, liabilities]);

  const handleExport = async () => {
    setIsExporting(true);
    setExportError(null);

    try {
      const response = await fetch('/api/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessInfo, assets, liabilities }),
      });

      if (!response.ok) {
        const details = await response.text().catch(() => '');
        setExportError(
          `Export failed (${response.status} ${response.statusText})${
            details ? `: ${details}` : ''
          }`,
        );
        return;
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download =
        extractFilename(response.headers.get('Content-Disposition')) || 'Zakat_Summary.xlsx';
      anchor.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      setExportError(`Export failed before completion: ${message}`);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <main className='min-h-screen bg-[#F4F6F5] pb-16 text-[#1F2937]'>
      <div className='mx-auto max-w-350 px-4 pb-8 pt-8 sm:px-6 lg:px-10'>
        <section className='mb-8 rounded-2xl border border-[#D4D9D7] bg-linear-to-b from-[#FFFFFF] to-[#F7FAF8] p-6 sm:p-8 shadow-sm relative overflow-hidden'>
          <div className='absolute right-0 top-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-[#068C44]/5 blur-3xl'></div>
          <div className='relative z-10'>
            <div className='mb-5 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6'>
              <Image
                src='/ifac-logo.png'
                alt='IFA Consultancy logo'
                width={180}
                height={64}
                className='h-12 w-auto object-contain object-left shrink-0'
                priority
              />
              <div className='hidden sm:block h-10 w-px bg-[#E5E7EB]'></div>
              <div>
                <h1 className='text-2xl font-bold tracking-tight text-[#1F2937] sm:text-3xl'>
                  Zakat <span className='text-[#068C44]'>Calculator</span>
                </h1>
                <p className='mt-1 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-[#636467]'>
                  <span className='h-1.5 w-1.5 rounded-full bg-[#068C44]'></span>
                  INTERNAL FINANCIAL TOOL
                </p>
              </div>
            </div>
            <p className='mt-5 max-w-2xl text-[15px] leading-relaxed text-[#4B5563]'>
              Concise one-page flow. Rename headings, add/remove rows, and use negative values where required. Ensure all fields are filled accurately before exporting.
            </p>
            <div className='mt-6 inline-flex max-w-full items-start sm:items-center gap-3 rounded-lg border border-[#F59E0B]/30 bg-[#FFFBEB]/80 p-3 sm:px-4'>
              <svg className="h-5 w-5 shrink-0 text-[#D97706] mt-0.5 sm:mt-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className='text-sm font-medium text-[#92400E] leading-snug'>
                <strong className='font-bold'>CAUTION:</strong> Internal use only. Do not distribute this calculator link for personal use.
              </p>
            </div>
          </div>
        </section>

        {exportError && (
          <section className='mb-6 rounded-xl border border-[#B91C1C]/40 bg-[#FEE2E2] p-4'>
            <div className='flex items-start justify-between gap-3'>
              <div>
                <p className='mb-1 text-sm font-semibold text-[#991B1B]'>Export Error</p>
                <p className='text-sm leading-relaxed text-[#B91C1C]'>{exportError}</p>
              </div>
              <button
                type='button'
                onClick={() => setExportError(null)}
                className='rounded-md border border-[#B91C1C]/40 px-2 py-1 text-xs text-[#991B1B] hover:bg-[#FCA5A5]/20'
              >
                Dismiss
              </button>
            </div>
          </section>
        )}

        <section className='mb-6 rounded-2xl border border-[#D4D9D7] bg-[#FFFFFF] p-4 sm:p-6 shadow-sm'>
          <h2 className='mb-5 text-lg font-semibold text-[#068C44]'>Client Information</h2>
          <div className='grid gap-5 sm:grid-cols-2'>
            <div>
              <label className='mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-[#636467]'>
                Client / Company Name
              </label>
              <input
                type='text'
                value={businessInfo.name}
                onChange={(event) =>
                  setBusinessInfo((prev) => ({ ...prev, name: event.target.value }))
                }
                placeholder='e.g., Al Amin Traders'
                className='w-full rounded-md border border-[#C9CFCC] bg-white px-3 py-2 text-sm text-[#1F2937] outline-none transition hover:border-[#A2A2B2] focus:border-[#068C44] focus:ring-2 focus:ring-[#068C44]/30'
              />
            </div>
            <div>
              <label className='mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-[#636467]'>
                Email Address
              </label>
              <input
                type='email'
                value={businessInfo.email}
                onChange={(event) =>
                  setBusinessInfo((prev) => ({ ...prev, email: event.target.value }))
                }
                placeholder='e.g., info@alamintraders.com'
                className='w-full rounded-md border border-[#C9CFCC] bg-white px-3 py-2 text-sm text-[#1F2937] outline-none transition hover:border-[#A2A2B2] focus:border-[#068C44] focus:ring-2 focus:ring-[#068C44]/30'
              />
            </div>
            <div className='sm:col-span-2'>
              <label className='mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-[#636467]'>
                Address (Optional)
              </label>
              <input
                type='text'
                value={businessInfo.address}
                onChange={(event) =>
                  setBusinessInfo((prev) => ({ ...prev, address: event.target.value }))
                }
                placeholder='Full address'
                className='w-full rounded-md border border-[#C9CFCC] bg-white px-3 py-2 text-sm text-[#1F2937] outline-none transition hover:border-[#A2A2B2] focus:border-[#068C44] focus:ring-2 focus:ring-[#068C44]/30'
              />
            </div>
            <div>
              <label className='mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-[#636467]'>
                Calendar Type
              </label>
              <div className='flex gap-2 h-9.5'>
                <button
                  type='button'
                  onClick={() =>
                    setBusinessInfo((prev) => ({
                      ...prev,
                      calendarType: 'hijri',
                      zakatYear: '1446-47',
                    }))
                  }
                  className={`flex-1 rounded-md px-3 text-sm font-semibold transition-all ${
                    businessInfo.calendarType === 'hijri'
                      ? 'border border-[#068C44] bg-[#068C44]/10 text-[#068C44] shadow-sm shadow-[#068C44]/5'
                      : 'border border-[#C9CFCC] bg-[#F9FAF9] text-[#4B5563] hover:border-[#A2A2B2] hover:bg-white'
                  }`}
                >
                  Hijri
                </button>
                <button
                  type='button'
                  onClick={() =>
                    setBusinessInfo((prev) => ({
                      ...prev,
                      calendarType: 'gregorian',
                      zakatYear: '2025-26',
                    }))
                  }
                  className={`flex-1 rounded-md px-3 text-sm font-semibold transition-all ${
                    businessInfo.calendarType === 'gregorian'
                      ? 'border border-[#068C44] bg-[#068C44]/10 text-[#068C44] shadow-sm shadow-[#068C44]/5'
                      : 'border border-[#C9CFCC] bg-[#F9FAF9] text-[#4B5563] hover:border-[#A2A2B2] hover:bg-white'
                  }`}
                >
                  Gregorian
                </button>
              </div>
            </div>
            <div>
              <label className='mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-[#636467]'>
                Zakat Year
              </label>
              <div className='flex items-center gap-2 h-9.5'>
                <button
                  type='button'
                  onClick={() => {
                    const base =
                      parseYearStart(businessInfo.zakatYear) ??
                      (businessInfo.calendarType === 'gregorian' ? 2025 : 1446);
                    const next = base - 1;
                    setBusinessInfo((prev) => ({
                      ...prev,
                      zakatYear: formatYearRange(next),
                    }));
                  }}
                  className='flex h-full w-10 shrink-0 items-center justify-center rounded-md border border-[#C9CFCC] bg-[#F9FAF9] text-base font-semibold text-[#4B5563] transition-colors hover:border-[#A2A2B2] hover:bg-white'
                  title="Previous Year"
                >
                  −
                </button>
                <input
                  type='text'
                  value={businessInfo.zakatYear}
                  onChange={(event) =>
                    setBusinessInfo((prev) => ({ ...prev, zakatYear: event.target.value }))
                  }
                  placeholder='Year'
                  className='h-full flex-1 rounded-md border border-[#C9CFCC] bg-white px-3 text-center text-sm font-semibold text-[#1F2937] outline-none transition hover:border-[#A2A2B2] focus:border-[#068C44] focus:ring-2 focus:ring-[#068C44]/30'
                />
                <button
                  type='button'
                  onClick={() => {
                    const base =
                      parseYearStart(businessInfo.zakatYear) ??
                      (businessInfo.calendarType === 'gregorian' ? 2025 : 1446);
                    const next = base + 1;
                    setBusinessInfo((prev) => ({
                      ...prev,
                      zakatYear: formatYearRange(next),
                    }));
                  }}
                  className='flex h-full w-10 shrink-0 items-center justify-center rounded-md border border-[#C9CFCC] bg-[#F9FAF9] text-base font-semibold text-[#4B5563] transition-colors hover:border-[#A2A2B2] hover:bg-white'
                  title="Next Year"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className='grid gap-6 xl:grid-cols-2'>
          <LineItemEditor title='Assets' items={assets} setItems={setAssets} accent='gold' />
          <LineItemEditor
            title='Deductables'
            items={liabilities}
            setItems={setLiabilities}
            accent='red'
          />
        </div>

        <section className='mt-6 grid gap-4 lg:grid-cols-4'>
          <ResultCard label='Total Zakatable Assets' value={totals.totalAssets} color='gold' prefix='A.' />
          <ResultCard label='Total Deductables' value={totals.totalDebt} color='red' prefix='B.' />
          <div className='flex flex-col justify-center rounded-2xl border border-[#068C44]/30 bg-linear-to-r from-[#068C44]/10 to-[#068C44]/5 p-5 lg:col-span-2 shadow-sm'>
            <div className='flex items-center gap-3 mb-2'>
              <span className='flex h-6 items-center justify-center rounded-sm bg-[#068C44] px-2 text-xs font-bold text-white'>
                A - B
              </span>
              <p className='text-xs font-bold uppercase tracking-[0.15em] text-[#636467]'>
                Net Zakatable Asset
              </p>
            </div>
            <p className='text-3xl sm:text-4xl font-extrabold text-[#068C44] [font-variant-numeric:tabular-nums]'>
              {formatNumber(totals.netZakatableAssets)}
            </p>
          </div>
        </section>

        <section className='mt-6 rounded-2xl border border-[#D4D9D7] bg-white p-4 sm:p-6 shadow-sm'>
          <h2 className='mb-5 text-lg font-semibold text-[#068C44]'>Zakat Calculation Rates</h2>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
            {(['2.5', '2.577', '2.6'] as const).map((rate) => {
              const value = rate === '2.5' ? totals.zakat250 : rate === '2.577' ? totals.zakat2577 : totals.zakat260;
              return (
                <div
                  key={rate}
                  className='flex flex-col justify-center rounded-2xl border-2 border-[#E5E7EB] bg-white p-5 text-left'
                >
                  <p className='mb-1.5 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#636467]'>
                    Zakat Rate
                  </p>
                  <p className='mb-3 text-3xl font-black text-[#4B5563]'>
                    {rate}%
                  </p>
                  <p className='text-xl font-bold [font-variant-numeric:tabular-nums] text-[#1F2937]'>
                    {formatNumber(value)}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <div className='mt-8 flex flex-col sm:flex-row items-center gap-4 border-t border-[#D4D9D7] pt-6'>
          <button
            type='button'
            onClick={handleExport}
            disabled={isExporting}
            className='flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#068C44] px-6 py-3.5 text-[15px] font-bold text-white shadow-sm transition-all hover:bg-[#057A3C] hover:shadow-md hover:-translate-y-px disabled:pointer-events-none disabled:opacity-60 disabled:transform-none'
          >
            {isExporting ? (
              <>
                <svg className="h-5 w-5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Preparing Excel...
              </>
            ) : (
              <>
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Excel (.xlsx)
              </>
            )}
          </button>
          <p className='text-sm italic text-[#636467] text-center sm:text-left flex-1'>
            Notice: Negative values are allowed for adjustment/minus headings.
          </p>
        </div>
      </div>
    </main>
  );
}

function ResultCard({
  prefix,
  label,
  value,
  color,
}: {
  prefix?: string;
  label: string;
  value: number;
  color: 'gold' | 'red' | 'blue';
}) {
  const tone =
    color === 'gold'
      ? 'border-[#068C44]/20 bg-[#068C44]/5 text-[#068C44]'
      : color === 'red'
        ? 'border-[#F2B8B5]/50 bg-[#FEF2F2] text-[#B42318]'
        : 'border-[#068C44]/20 bg-[#068C44]/5 text-[#068C44]';

  return (
    <div className={`flex flex-col justify-center rounded-xl border p-4 shadow-sm transition-colors ${tone}`}>
      <p className='mb-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] sm:text-xs'>
        {prefix && (
          <span className={`inline-flex h-5 items-center justify-center rounded px-1.5 ${color === 'gold' ? 'bg-[#068C44]/10' : color === 'red' ? 'bg-[#B42318]/10' : ''}`}>
            {prefix}
          </span>
        )}
        <span className='opacity-80'>{label}</span>
      </p>
      <p className={`text-2xl sm:text-3xl font-extrabold [font-variant-numeric:tabular-nums] ${color === 'red' ? 'text-[#B42318]' : 'text-[#068C44]'}`}>
        {formatNumber(value)}
      </p>
    </div>
  );
}
