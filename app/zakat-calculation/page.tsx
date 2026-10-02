'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import { QuickCalculator } from '../components/QuickCalculator';

type LineItem = {
  id: string;
  label: string;
  description: string;
  amount: number;
  amountStatus?: 'valid' | 'invalid' | null;
};

type ClientType = 'institution' | 'person';

type BusinessInfo = {
  name: string;
  address: string;
  email: string;
  calendarType: 'gregorian' | 'hijri';
  clientType: ClientType;
  zakatYear: string;
};

type ExportValidationIssue = {
  field: string;
  reason: string;
};

type ExportErrorPayload = {
  error?: string;
  debugCode?: string;
  invalidFields?: ExportValidationIssue[];
  details?: string;
};

const EXPORT_TIMEOUT_MS = 30_000;

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

const createClientDebugCode = (): string =>
  `ZE-CLIENT-${Date.now().toString(36).toUpperCase()}`;

const buildExportIssueDebugText = ({
  debugCode,
  httpStatus,
  errorPayload,
  fallbackError,
}: {
  debugCode: string;
  httpStatus: number | null;
  errorPayload?: ExportErrorPayload | null;
  fallbackError?: string;
}): string => {
  const lines = [
    `Debug code: ${debugCode}`,
    `Time: ${new Date().toISOString()}`,
    'Endpoint: POST /api/export',
    `HTTP status: ${httpStatus ?? 'N/A'}`,
  ];

  if (errorPayload?.error) {
    lines.push(`Server message: ${errorPayload.error}`);
  }

  if (Array.isArray(errorPayload?.invalidFields) && errorPayload.invalidFields.length > 0) {
    lines.push(
      `Invalid fields: ${errorPayload.invalidFields
        .map((entry) => `${entry.field} (${entry.reason})`)
        .join(', ')}`,
    );
  }

  if (errorPayload?.details) {
    lines.push(`Server details: ${errorPayload.details}`);
  }

  if (fallbackError) {
    lines.push(`Client error: ${fallbackError}`);
  }

  return lines.join('\n');
};

const getInvalidNumericIssues = (
  items: LineItem[],
  group: 'assets' | 'liabilities',
): ExportValidationIssue[] =>
  items.flatMap((row, index) =>
    row.amountStatus === 'invalid'
      ? [
          {
            field: `${group}[${index}].amount`,
            reason: `Invalid number format in row ${index + 1}${
              row.label.trim() ? ` (${row.label.trim()})` : ''
            }`,
          },
        ]
      : [],
  );

const defaultBusinessInfo: BusinessInfo = {
  name: '',
  address: '',
  email: '',
  calendarType: 'hijri',
  clientType: 'institution',
  zakatYear: '1446-47',
};

const createInstitutionAssets = (): LineItem[] => [
  { id: 'ia1', label: 'Investment in FDR', description: '', amount: 0, amountStatus: null },
  { id: 'ia2', label: 'Inventory', description: '', amount: 0, amountStatus: null },
  {
    id: 'ia3',
    label: 'Advance to Employee Against Expenses',
    description: '',
    amount: 0,
    amountStatus: null,
  },
  { id: 'ia4', label: 'Advance to Suppliers', description: '', amount: 0, amountStatus: null },
  { id: 'ia5', label: 'Accounts Receivable', description: '', amount: 0, amountStatus: null },
  { id: 'ia6', label: 'Inter Company Receivables', description: '', amount: 0, amountStatus: null },
  { id: 'ia7', label: 'Cash & Cash Equavalents', description: '', amount: 0, amountStatus: null },
];

const createInstitutionLiabilities = (): LineItem[] => [
  { id: 'il1', label: 'Accounts Payable', description: '', amount: 0, amountStatus: null },
  { id: 'il2', label: 'Short-Term Loans', description: '', amount: 0, amountStatus: null },
  { id: 'il3', label: 'Accrued Liabilities', description: '', amount: 0, amountStatus: null },
];

const createPersonAssets = (): LineItem[] => [
  { id: 'pa1', label: 'Gold in BDT', description: '', amount: 0, amountStatus: null },
  { id: 'pa2', label: 'Cash in Hand', description: '', amount: 0, amountStatus: null },
  {
    id: 'pa3',
    label: 'Foreign Currency (Amount in BDT)',
    description: '',
    amount: 0,
    amountStatus: null,
  },
  { id: 'pa4', label: 'Bank Balance', description: '', amount: 0, amountStatus: null },
  { id: 'pa5', label: 'Receivables', description: '', amount: 0, amountStatus: null },
];

const createPersonLiabilities = (): LineItem[] => [
  { id: 'pl1', label: 'Personal Bank Loan', description: '', amount: 0, amountStatus: null },
  { id: 'pl2', label: 'Business Loan', description: '', amount: 0, amountStatus: null },
  { id: 'pl3', label: 'Personal Loan', description: '', amount: 0, amountStatus: null },
];

interface NumberInputProps {
  value: number;
  status: 'valid' | 'invalid' | null;
  onChange: (value: number, status: 'valid' | 'invalid' | null) => void;
  ariaLabel?: string;
}

function NumberInput({ value, status, onChange, ariaLabel = 'Amount' }: NumberInputProps) {
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
        aria-label={ariaLabel}
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
        className={`h-9.5 w-full rounded-lg border bg-white dark:bg-zinc-900 px-3 pr-8 text-right text-sm font-mono text-zinc-900 dark:text-zinc-100 outline-none transition focus:ring-2 [font-variant-numeric:tabular-nums] ${
          status === 'invalid'
            ? 'border-rose-400 focus:border-rose-600 focus:ring-rose-500/20 dark:border-rose-700 dark:focus:border-rose-500'
            : 'border-zinc-300 dark:border-zinc-700 focus:border-emerald-600 focus:ring-emerald-600/15 dark:focus:border-emerald-500 dark:focus:ring-emerald-500/20'
        }`}
      />
      {status === 'valid' && (
        <span className='absolute right-2.5 flex h-4 w-4 items-center justify-center text-emerald-600 dark:text-emerald-400' title="Valid number">
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
        </span>
      )}
      {status === 'invalid' && (
        <span className='absolute right-2.5 flex h-4 w-4 items-center justify-center text-rose-600 dark:text-rose-400' title="Invalid format">
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
    <section className='rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 p-5 shadow-xs transition-colors'>
      <div className='mb-4 flex items-center justify-between'>
        <h2 className={`text-base sm:text-lg font-bold ${isDeductables ? 'text-rose-700 dark:text-rose-400' : 'text-emerald-700 dark:text-emerald-400'}`}>
          {title}
        </h2>
        <span className='text-xs font-mono font-medium px-2 py-0.5 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400'>
          {items.length} {items.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      {/* Ledger Column Headers for Desktop */}
      <div className='hidden md:grid md:grid-cols-[2.5rem_1.6fr_1.2fr_13rem_2.5rem] md:items-center md:gap-3 px-3.5 pb-2 text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 border-b border-zinc-100 dark:border-zinc-800/60'>
        <span className='text-center'>#</span>
        <span>Category / Heading</span>
        <span>Description (Optional)</span>
        <span className='text-right pr-3'>Amount (BDT)</span>
        <span className='text-center'>Action</span>
      </div>

      <div className='space-y-2.5 mt-2.5'>
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`group rounded-xl border p-3 md:p-2.5 transition-all duration-200 md:grid md:grid-cols-[2.5rem_1.6fr_1.2fr_13rem_2.5rem] md:items-center md:gap-3 flex flex-col gap-2.5 ${
              isDeductables
                ? 'border-rose-100 dark:border-rose-950/40 bg-rose-50/30 dark:bg-rose-950/15 hover:border-rose-200 dark:hover:border-rose-900/40'
                : 'border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/40 dark:bg-zinc-900/40 hover:border-zinc-300 dark:hover:border-zinc-700'
            }`}
          >
            {/* Index badge */}
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border text-xs font-bold font-mono transition-colors self-start md:self-auto ${
                isDeductables
                  ? 'border-rose-200 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400'
                  : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
              }`}
            >
              {index + 1}
            </div>

            {/* Heading input */}
            <div className='w-full min-w-0'>
              <label className='block md:hidden text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1'>Heading</label>
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
                className={`h-9.5 w-full rounded-lg border bg-white dark:bg-zinc-900 px-3 text-sm text-zinc-900 dark:text-zinc-100 outline-none transition focus:ring-2 ${
                  isDeductables
                    ? 'border-rose-200/80 dark:border-rose-900/60 focus:border-rose-600 focus:ring-rose-500/15 dark:focus:border-rose-500'
                    : 'border-zinc-300 dark:border-zinc-700 focus:border-emerald-600 focus:ring-emerald-600/15 dark:focus:border-emerald-500'
                }`}
              />
            </div>

            {/* Description input */}
            <div className='w-full min-w-0'>
              <label className='block md:hidden text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1'>Description</label>
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
                className={`h-9.5 w-full rounded-lg border bg-white dark:bg-zinc-900 px-3 text-sm text-zinc-900 dark:text-zinc-100 outline-none transition focus:ring-2 ${
                  isDeductables
                    ? 'border-rose-200/80 dark:border-rose-900/60 focus:border-rose-600 focus:ring-rose-500/15 dark:focus:border-rose-500'
                    : 'border-zinc-300 dark:border-zinc-700 focus:border-emerald-600 focus:ring-emerald-600/15 dark:focus:border-emerald-500'
                }`}
              />
            </div>

            {/* Amount input */}
            <div className='w-full min-w-0'>
              <label className='block md:hidden text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1'>Amount (BDT)</label>
              <NumberInput
                value={item.amount}
                status={item.amountStatus ?? null}
                ariaLabel={`Amount for ${item.label || `item ${index + 1}`}`}
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

            {/* Delete button */}
            <div className='flex justify-end md:justify-center'>
              <button
                type='button'
                onClick={() => setItems((prev) => prev.filter((row) => row.id !== item.id))}
                title='Remove item'
                aria-label={`Remove row ${index + 1}`}
                className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-transparent text-zinc-400 dark:text-zinc-500 hover:border-rose-200 dark:hover:border-rose-900/50 hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:text-rose-600 dark:hover:text-rose-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/30 transition-all active:scale-95'
              >
                <svg className='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={1.75}>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className='mt-3.5 flex justify-end'>
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
          className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-bold transition-all active:scale-95 ${
            isDeductables
              ? 'border-rose-200/80 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400 hover:bg-rose-100/60 dark:hover:bg-rose-900/40'
              : 'border-emerald-200/80 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100/60 dark:hover:bg-emerald-900/40'
          }`}
        >
          <svg className='h-3.5 w-3.5' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2.5}>
            <path strokeLinecap='round' strokeLinejoin='round' d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
          </svg>
          Add Item
        </button>
      </div>

      <div
        className={`mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-xl border p-4 transition-colors ${
          isDeductables
            ? 'border-rose-200/80 dark:border-rose-900/50 bg-rose-50/60 dark:bg-rose-950/30'
            : 'border-emerald-200/80 dark:border-emerald-900/50 bg-emerald-50/60 dark:bg-emerald-950/30'
        }`}
      >
        <p className={`text-xs font-bold uppercase tracking-wider ${isDeductables ? 'text-rose-800 dark:text-rose-300' : 'text-emerald-800 dark:text-emerald-300'}`}>
          {accent === 'gold' ? 'Total Zakatable Assets' : 'Total Zakatable Liabilities'}
        </p>
        <p
          className={`mt-1 sm:mt-0 text-xl md:text-2xl font-bold font-mono [font-variant-numeric:tabular-nums] ${
            isDeductables ? 'text-rose-700 dark:text-rose-400' : 'text-emerald-700 dark:text-emerald-400'
          }`}
        >
          {formatNumber(sumLineItems(items))}
        </p>
      </div>
    </section>
  );
}

export default function ZakatCalculationPage() {
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>(defaultBusinessInfo);
  const [institutionAssets, setInstitutionAssets] = useState<LineItem[]>(() =>
    createInstitutionAssets(),
  );
  const [institutionLiabilities, setInstitutionLiabilities] = useState<LineItem[]>(() =>
    createInstitutionLiabilities(),
  );
  const [personAssets, setPersonAssets] = useState<LineItem[]>(() => createPersonAssets());
  const [personLiabilities, setPersonLiabilities] = useState<LineItem[]>(() =>
    createPersonLiabilities(),
  );
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);
  const [exportIssueDebugText, setExportIssueDebugText] = useState<string | null>(null);

  const assets = businessInfo.clientType === 'person' ? personAssets : institutionAssets;
  const liabilities =
    businessInfo.clientType === 'person' ? personLiabilities : institutionLiabilities;
  const setAssets =
    businessInfo.clientType === 'person' ? setPersonAssets : setInstitutionAssets;
  const setLiabilities =
    businessInfo.clientType === 'person' ? setPersonLiabilities : setInstitutionLiabilities;

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
    setExportError(null);
    setExportIssueDebugText(null);

    const invalidNumericIssues = [
      ...getInvalidNumericIssues(assets, 'assets'),
      ...getInvalidNumericIssues(liabilities, 'liabilities'),
    ];

    if (invalidNumericIssues.length > 0) {
      const debugCode = createClientDebugCode();
      setExportError(
        'Some amount fields are invalid. Please correct them before exporting and share the debug details if needed.',
      );
      setExportIssueDebugText(
        buildExportIssueDebugText({
          debugCode,
          httpStatus: 400,
          errorPayload: {
            error: 'Client blocked export because invalid numeric rows were detected.',
            debugCode,
            invalidFields: invalidNumericIssues,
          },
        }),
      );
      return;
    }

    setIsExporting(true);
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => {
      controller.abort();
    }, EXPORT_TIMEOUT_MS);

    try {
      const response = await fetch('/api/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessInfo, assets, liabilities }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const errorPayload = (await response.json().catch(() => null)) as ExportErrorPayload | null;
        const debugCode =
          errorPayload?.debugCode ??
          response.headers.get('X-Debug-Code') ??
          createClientDebugCode();

        setExportError(
          'We could not export the Excel file this time. Please share the debug details below with support.',
        );
        setExportIssueDebugText(
          buildExportIssueDebugText({
            debugCode,
            httpStatus: response.status,
            errorPayload,
          }),
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
      setExportIssueDebugText(null);
    } catch (error) {
      const debugCode = createClientDebugCode();
      const message = error instanceof Error ? error.message : 'Unknown error';
      setExportError(
        error instanceof DOMException && error.name === 'AbortError'
          ? 'The export request timed out. Please share the debug details below with support.'
          : 'A connectivity/runtime issue occurred during export. Please share the debug details below with support.',
      );
      setExportIssueDebugText(
        buildExportIssueDebugText({
          debugCode,
          httpStatus: null,
          fallbackError: message,
        }),
      );
    } finally {
      window.clearTimeout(timeoutId);
      setIsExporting(false);
    }
  };

  return (
    <main className='w-full h-full min-h-screen bg-[#F8FAF9] dark:bg-[#0B0F0D] pb-20 text-zinc-900 dark:text-zinc-100 transition-colors'>
      <nav className='sticky top-0 z-40 border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white/85 dark:bg-[#0B0F0D]/85 backdrop-blur-md transition-colors'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='flex min-h-18 items-center justify-between gap-4 py-3'>
            <div className='flex items-center gap-4'>
              <a
                href='https://ifacbd.com'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Visit IFA Consultancy website'
                className='flex items-center gap-2 rounded-xl p-1 transition-opacity hover:opacity-90'
              >
                <div className='flex h-10 items-center rounded-lg bg-zinc-900/5 dark:bg-white/10 px-2'>
                  <Image
                    src='/ifac-logo.png'
                    alt='IFA Consultancy logo'
                    width={120}
                    height={40}
                    className='h-8 w-auto shrink-0 object-contain dark:brightness-110'
                    priority
                  />
                </div>
              </a>
              <div className='h-6 w-px bg-zinc-200 dark:bg-zinc-800 hidden sm:block' />
              <div className='flex items-baseline gap-2'>
                <h1 className='text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100'>
                  Zakat Calculator
                </h1>
                <span className='hidden sm:inline-flex rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-400'>
                  Audit Suite
                </span>
              </div>
            </div>

            <div className='flex items-center gap-3'>
              <QuickCalculator />
            </div>
          </div>
        </div>
      </nav>

      <div className='mx-auto max-w-7xl px-4 pb-8 pt-8 sm:px-6 lg:px-8'>
        {exportError && (
          <section className='mb-6 rounded-2xl border border-amber-300/80 dark:border-amber-700/60 bg-amber-50 dark:bg-amber-950/40 p-4 sm:p-5 shadow-xs'>
            <div className='flex items-start justify-between gap-3'>
              <div>
                <p className='mb-1 text-sm font-bold text-amber-900 dark:text-amber-200'>Export Issue</p>
                <p className='text-sm leading-relaxed text-amber-900/90 dark:text-amber-200/90'>{exportError}</p>
              </div>
              <button
                type='button'
                onClick={() => {
                  setExportError(null);
                  setExportIssueDebugText(null);
                }}
                className='rounded-lg border border-amber-400/60 dark:border-amber-700 px-2.5 py-1 text-xs font-semibold text-amber-900 dark:text-amber-200 hover:bg-amber-100 dark:hover:bg-amber-900/40 transition-colors'
              >
                Dismiss
              </button>
            </div>
            {exportIssueDebugText && (
              <div className='mt-3.5 rounded-xl border border-amber-200 dark:border-amber-800 bg-white/60 dark:bg-black/30 px-4 py-3'>
                <p className='text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300'>
                  Debug Details (Share With Support)
                </p>
                <pre className='mt-2 whitespace-pre-wrap break-all text-xs font-mono text-amber-950 dark:text-amber-200'>
                  {exportIssueDebugText}
                </pre>
              </div>
            )}
          </section>
        )}

        <section className='mb-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 p-5 sm:p-6 shadow-xs transition-colors'>
          <h2 className='mb-5 text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100'>
            Client Information
          </h2>
          <div className='grid gap-5 sm:grid-cols-2'>
            <div>
              <label className='mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400'>
                Client / Company Name
              </label>
              <input
                type='text'
                value={businessInfo.name}
                onChange={(event) =>
                  setBusinessInfo((prev) => ({ ...prev, name: event.target.value }))
                }
                placeholder='e.g., Al Amin Traders'
                className='h-10 w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3.5 text-sm text-zinc-900 dark:text-zinc-100 outline-none transition hover:border-zinc-400 dark:hover:border-zinc-600 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15 dark:focus:border-emerald-500'
              />
            </div>
            <div>
              <label className='mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400'>
                Email Address
              </label>
              <input
                type='email'
                value={businessInfo.email}
                onChange={(event) =>
                  setBusinessInfo((prev) => ({ ...prev, email: event.target.value }))
                }
                placeholder='e.g., hello@shahoriar.bd'
                className='h-10 w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3.5 text-sm text-zinc-900 dark:text-zinc-100 outline-none transition hover:border-zinc-400 dark:hover:border-zinc-600 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15 dark:focus:border-emerald-500'
              />
            </div>
            <div className='sm:col-span-2'>
              <label className='mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400'>
                Address (Optional)
              </label>
              <input
                type='text'
                value={businessInfo.address}
                onChange={(event) =>
                  setBusinessInfo((prev) => ({ ...prev, address: event.target.value }))
                }
                placeholder='Full address'
                className='h-10 w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3.5 text-sm text-zinc-900 dark:text-zinc-100 outline-none transition hover:border-zinc-400 dark:hover:border-zinc-600 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15 dark:focus:border-emerald-500'
              />
            </div>
            <div>
              <label className='mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400'>
                Calendar Type
              </label>
              <div className='flex h-10 gap-1 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100/80 dark:bg-zinc-800/60 p-1'>
                <button
                  type='button'
                  onClick={() =>
                    setBusinessInfo((prev) => ({
                      ...prev,
                      calendarType: 'hijri',
                      zakatYear: '1446-47',
                    }))
                  }
                  className={`flex-1 rounded-lg px-3 text-xs font-bold transition-all ${
                    businessInfo.calendarType === 'hijri'
                      ? 'bg-white dark:bg-zinc-900 text-emerald-700 dark:text-emerald-400 shadow-xs'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                  }`}
                >
                  Hijri (Lunar)
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
                  className={`flex-1 rounded-lg px-3 text-xs font-bold transition-all ${
                    businessInfo.calendarType === 'gregorian'
                      ? 'bg-white dark:bg-zinc-900 text-emerald-700 dark:text-emerald-400 shadow-xs'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                  }`}
                >
                  Gregorian (Solar)
                </button>
              </div>
            </div>
            <div>
              <label className='mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400'>
                Client Type
              </label>
              <div className='flex h-10 gap-1 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100/80 dark:bg-zinc-800/60 p-1'>
                <button
                  type='button'
                  onClick={() =>
                    setBusinessInfo((prev) => ({
                      ...prev,
                      clientType: 'institution',
                    }))
                  }
                  className={`flex-1 rounded-lg px-3 text-xs font-bold transition-all ${
                    businessInfo.clientType === 'institution'
                      ? 'bg-white dark:bg-zinc-900 text-emerald-700 dark:text-emerald-400 shadow-xs'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                  }`}
                >
                  Institution
                </button>
                <button
                  type='button'
                  onClick={() =>
                    setBusinessInfo((prev) => ({
                      ...prev,
                      clientType: 'person',
                    }))
                  }
                  className={`flex-1 rounded-lg px-3 text-xs font-bold transition-all ${
                    businessInfo.clientType === 'person'
                      ? 'bg-white dark:bg-zinc-900 text-emerald-700 dark:text-emerald-400 shadow-xs'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                  }`}
                >
                  Individual / Person
                </button>
              </div>
            </div>
            <div>
              <label className='mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400'>
                Zakat Year
              </label>
              <div className='flex h-10 items-center gap-2'>
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
                  className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/80 text-base font-bold text-zinc-700 dark:text-zinc-200 transition-all hover:bg-white dark:hover:bg-zinc-700 active:scale-95'
                  title="Previous Year"
                  aria-label="Previous Year"
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
                  className='h-10 flex-1 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 text-center text-sm font-bold font-mono text-zinc-900 dark:text-zinc-100 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15 dark:focus:border-emerald-500'
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
                  className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/80 text-base font-bold text-zinc-700 dark:text-zinc-200 transition-all hover:bg-white dark:hover:bg-zinc-700 active:scale-95'
                  title="Next Year"
                  aria-label="Next Year"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className='grid gap-6 grid-cols-1'>
          <LineItemEditor title='Assets (A)' items={assets} setItems={setAssets} accent='gold' />
          <LineItemEditor
            title='Deductables (B)'
            items={liabilities}
            setItems={setLiabilities}
            accent='red'
          />
        </div>

        <section className='mt-8 grid gap-4 lg:grid-cols-4'>
          <ResultCard label='Total Zakatable Assets' value={totals.totalAssets} color='gold' prefix='A.' />
          <ResultCard label='Total Zakatable Liabilities' value={totals.totalDebt} color='red' prefix='B.' />
          <div className='flex flex-col justify-between rounded-2xl border-2 border-emerald-500/40 dark:border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent dark:from-emerald-950/40 dark:via-emerald-900/20 dark:to-transparent p-5 sm:p-6 lg:col-span-2 shadow-sm'>
            <div className='mb-3 flex items-center justify-between gap-2'>
              <div className='flex items-center gap-2.5'>
                <span className='inline-flex h-6 items-center justify-center rounded-md bg-emerald-600 px-2 text-xs font-bold font-mono text-white shadow-xs'>
                  A − B
                </span>
                <p className='text-xs font-bold uppercase tracking-widest text-zinc-700 dark:text-zinc-300'>
                  Net Zakatable Asset
                </p>
              </div>
              <CopyValueButton value={totals.netZakatableAssets} label='Net Zakatable Asset' />
            </div>
            <p className='text-3xl sm:text-4xl lg:text-5xl font-black font-mono text-emerald-700 dark:text-emerald-400 [font-variant-numeric:tabular-nums] tracking-tight'>
              {formatNumber(totals.netZakatableAssets)}
            </p>
          </div>
        </section>

        <section className='mt-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 p-5 sm:p-6 shadow-xs transition-colors'>
          <div className='mb-5'>
            <h2 className='text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100'>
              Zakat Payable by Method
            </h2>
            <p className='text-xs text-zinc-500 dark:text-zinc-400 mt-0.5'>
              Standard calculation variants for Hijri lunar calendar, Gregorian solar year, and commercial rounding.
            </p>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
            {([
              { rate: '2.5', label: 'Lunar (Hijri Year)', desc: 'Standard 354-day lunar calendar' },
              { rate: '2.577', label: 'Solar (Gregorian Year)', desc: 'Adjusted for 365.25-day solar year' },
              { rate: '2.6', label: 'Commercial Rounding', desc: 'Standard accounting convention' },
            ] as const).map(({ rate, label, desc }) => {
              const value =
                rate === '2.5'
                  ? totals.zakat250
                  : rate === '2.577'
                    ? totals.zakat2577
                    : totals.zakat260;
              return (
                <div
                  key={rate}
                  className='flex flex-col justify-between rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/40 p-4 sm:p-5 text-left transition-colors hover:border-zinc-300 dark:hover:border-zinc-700'
                >
                  <div>
                    <div className='mb-2 flex items-center justify-between gap-2'>
                      <span className='inline-flex items-center rounded-md bg-zinc-200/60 dark:bg-zinc-800 px-2 py-0.5 text-[11px] font-semibold text-zinc-700 dark:text-zinc-300'>
                        {label}
                      </span>
                      <CopyValueButton value={value} label={`Calculated Zakat ${rate}%`} />
                    </div>
                    <p className='text-3xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight'>
                      {rate}%
                    </p>
                    <p className='text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 mb-3'>
                      {desc}
                    </p>
                  </div>
                  <div className='pt-3 border-t border-zinc-200/80 dark:border-zinc-800/80'>
                    <span className='block text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-0.5'>
                      Calculated Amount
                    </span>
                    <p className='text-xl sm:text-2xl font-bold font-mono [font-variant-numeric:tabular-nums] text-emerald-700 dark:text-emerald-400'>
                      {formatNumber(value)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <div className='mt-8 flex flex-col sm:flex-row items-center gap-4 border-t border-zinc-200 dark:border-zinc-800 pt-6'>
          <button
            type='button'
            onClick={handleExport}
            disabled={isExporting}
            className='flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-xl bg-emerald-600 px-7 py-3 text-sm font-bold text-white shadow-xs transition-all hover:bg-emerald-500 hover:shadow-md hover:-translate-y-px active:translate-y-0 active:scale-98 disabled:pointer-events-none disabled:opacity-60 disabled:transform-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50'
          >
            {isExporting ? (
              <>
                <svg className="h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Preparing Excel...</span>
              </>
            ) : (
              <>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Download Excel (.xlsx)</span>
              </>
            )}
          </button>
          <p className='text-xs text-zinc-500 dark:text-zinc-400 text-center sm:text-left flex-1'>
            Negative values are permitted for adjustments or minus headings. Generated sheet is formatted for official audit presentation.
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
  const isRed = color === 'red';

  return (
    <div
      className={`flex flex-col justify-between rounded-2xl border p-5 shadow-xs transition-colors ${
        isRed
          ? 'border-rose-200/80 dark:border-rose-900/50 bg-rose-50/50 dark:bg-rose-950/20'
          : 'border-emerald-200/80 dark:border-emerald-900/50 bg-emerald-50/50 dark:bg-emerald-950/20'
      }`}
    >
      <div className='mb-3 flex items-start justify-between gap-2'>
        <div className='flex items-center gap-2'>
          {prefix && (
            <span
              className={`inline-flex h-5 items-center justify-center rounded-md px-1.5 text-[11px] font-bold font-mono ${
                isRed
                  ? 'bg-rose-200/60 dark:bg-rose-900/60 text-rose-800 dark:text-rose-300'
                  : 'bg-emerald-200/60 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300'
              }`}
            >
              {prefix}
            </span>
          )}
          <p className='text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400'>
            {label}
          </p>
        </div>
        <CopyValueButton value={value} label={label} />
      </div>
      <p
        className={`text-2xl sm:text-3xl font-extrabold font-mono [font-variant-numeric:tabular-nums] ${
          isRed
            ? 'text-rose-700 dark:text-rose-400'
            : 'text-emerald-700 dark:text-emerald-400'
        }`}
      >
        {formatNumber(value)}
      </p>
    </div>
  );
}

function CopyValueButton({ value, label }: { value: number; label: string }) {
  const [isCopied, setIsCopied] = useState(false);
  const resetTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  const handleCopy = async () => {
    const valueToCopy = formatNumber(value);

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(valueToCopy);
      } else {
        const tempInput = document.createElement('textarea');
        tempInput.value = valueToCopy;
        tempInput.style.position = 'fixed';
        tempInput.style.left = '-9999px';
        document.body.appendChild(tempInput);
        tempInput.focus();
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
      }

      setIsCopied(true);
      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
      }
      resetTimerRef.current = window.setTimeout(() => setIsCopied(false), 1600);
    } catch (error) {
      console.error(`[zakat-calculation] Failed to copy ${label}:`, error);
    }
  };

  return (
    <button
      type='button'
      onClick={handleCopy}
      aria-label={`Copy ${label}`}
      title={isCopied ? 'Copied to clipboard' : `Copy ${label}`}
      className={`relative inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 ${
        isCopied
          ? 'border-emerald-500 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
          : 'border-zinc-200 dark:border-zinc-700/80 bg-white/80 dark:bg-zinc-800/80 text-zinc-500 dark:text-zinc-400 hover:border-emerald-500/60 hover:text-emerald-600 dark:hover:text-emerald-400'
      }`}
    >
      <svg
        className={`absolute h-4 w-4 transition-all duration-200 ${
          isCopied ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        }`}
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        strokeWidth={1.75}
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z'
        />
      </svg>
      <svg
        className={`absolute h-4 w-4 transition-all duration-200 text-emerald-600 dark:text-emerald-400 ${
          isCopied ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        }`}
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        strokeWidth={2.5}
      >
        <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
      </svg>
    </button>
  );
}

