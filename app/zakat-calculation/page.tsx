'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';

type LineItem = {
  id: string;
  label: string;
  description: string;
  amount: number;
  amountStatus?: 'valid' | 'invalid' | null;
};

type ClientType = 'institution' | 'person';
type CalcOperator = '+' | '-' | '*' | '/' | '%';
type CalcHistoryItem = {
  id: string;
  expression: string;
  result: string;
  timestamp: string;
};

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

const calcSymbol = (operator: CalcOperator) => {
  if (operator === '*') {
    return 'x';
  }
  if (operator === '/') {
    return '/';
  }
  return operator;
};

const formatCalcValue = (value: number) => {
  if (!Number.isFinite(value)) {
    return 'Error';
  }
  const normalized = Math.round((value + Number.EPSILON) * 100000000) / 100000000;
  return Number.isInteger(normalized) ? String(normalized) : String(normalized);
};

function QuickCalculator() {
  const [isOpen, setIsOpen] = useState(false);
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<CalcOperator | null>(null);
  const [awaitingSecond, setAwaitingSecond] = useState(false);
  const [history, setHistory] = useState<CalcHistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const keypadRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const firstActionRef = useRef<HTMLButtonElement | null>(null);
  const copyResetTimerRef = useRef<number | null>(null);
  const historyStorageKey = 'zakatQuickCalculatorHistoryV1';
  const actionsRef = useRef<{
    inputDigit: (digit: string) => void;
    inputDot: () => void;
    handleOperator: (op: CalcOperator) => void;
    handleEquals: () => void;
    handleBackspace: () => void;
    clearAll: () => void;
    toggleHistory: () => void;
  }>({
    inputDigit: () => undefined,
    inputDot: () => undefined,
    handleOperator: () => undefined,
    handleEquals: () => undefined,
    handleBackspace: () => undefined,
    clearAll: () => undefined,
    toggleHistory: () => undefined,
  });

  const moveKeypadFocus = (direction: 'left' | 'right' | 'up' | 'down') => {
    if (!keypadRef.current) {
      return;
    }

    const buttons = Array.from(
      keypadRef.current.querySelectorAll<HTMLButtonElement>('button[data-calc-nav="true"]'),
    );

    if (buttons.length === 0) {
      return;
    }

    const active = document.activeElement as HTMLButtonElement | null;
    const currentIndex = buttons.findIndex((button) => button === active);

    if (currentIndex === -1) {
      buttons[0]?.focus();
      return;
    }

    const columns = 4;
    let nextIndex = currentIndex;

    if (direction === 'left') {
      nextIndex = Math.max(0, currentIndex - 1);
    }
    if (direction === 'right') {
      nextIndex = Math.min(buttons.length - 1, currentIndex + 1);
    }
    if (direction === 'up') {
      nextIndex = Math.max(0, currentIndex - columns);
    }
    if (direction === 'down') {
      nextIndex = Math.min(buttons.length - 1, currentIndex + columns);
    }

    buttons[nextIndex]?.focus();
  };

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    try {
      const raw = window.localStorage.getItem(historyStorageKey);
      if (!raw) {
        return;
      }
      const parsed = JSON.parse(raw) as CalcHistoryItem[];
      if (Array.isArray(parsed)) {
        setHistory(parsed.slice(0, 20));
      }
    } catch {
      // Ignore malformed localStorage payloads.
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    try {
      window.localStorage.setItem(historyStorageKey, JSON.stringify(history));
    } catch {
      // Ignore storage quota/private mode failures.
    }
  }, [history]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const closeOnOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (containerRef.current && target && !containerRef.current.contains(target)) {
        setIsOpen(false);
      }
    };

    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setIsOpen(false);
        return;
      }

      const isCalculatorFocused =
        !!containerRef.current && containerRef.current.contains(document.activeElement);

      if (!isCalculatorFocused) {
        return;
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        moveKeypadFocus('left');
        return;
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        moveKeypadFocus('right');
        return;
      }
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        moveKeypadFocus('up');
        return;
      }
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        moveKeypadFocus('down');
        return;
      }

      if (/^\d$/.test(event.key)) {
        event.preventDefault();
        actionsRef.current.inputDigit(event.key);
        return;
      }

      if (/^Numpad\d$/.test(event.code)) {
        event.preventDefault();
        actionsRef.current.inputDigit(event.code.slice(-1));
        return;
      }

      if (event.key === '.' || event.code === 'NumpadDecimal') {
        event.preventDefault();
        actionsRef.current.inputDot();
        return;
      }

      if (event.key === '+' || event.code === 'NumpadAdd') {
        event.preventDefault();
        actionsRef.current.handleOperator('+');
        return;
      }

      if (event.key === '-' || event.code === 'NumpadSubtract') {
        event.preventDefault();
        actionsRef.current.handleOperator('-');
        return;
      }

      if (event.key === '*' || event.code === 'NumpadMultiply') {
        event.preventDefault();
        actionsRef.current.handleOperator('*');
        return;
      }

      if (event.key === '/' || event.code === 'NumpadDivide') {
        event.preventDefault();
        actionsRef.current.handleOperator('/');
        return;
      }

      if (event.key === '%') {
        event.preventDefault();
        actionsRef.current.handleOperator('%');
        return;
      }

      if (
        event.key === '=' ||
        event.key === 'Enter' ||
        event.code === 'NumpadEnter'
      ) {
        event.preventDefault();
        actionsRef.current.handleEquals();
        return;
      }

      if (event.key === 'Backspace') {
        event.preventDefault();
        actionsRef.current.handleBackspace();
        return;
      }

      if (event.key === 'Delete' || event.key === 'c' || event.key === 'C') {
        event.preventDefault();
        actionsRef.current.clearAll();
        return;
      }

      if (event.key === 'h' || event.key === 'H') {
        event.preventDefault();
        actionsRef.current.toggleHistory();
      }
    };

    document.addEventListener('mousedown', closeOnOutside);
    document.addEventListener('touchstart', closeOnOutside);
    document.addEventListener('keydown', handleGlobalKeyDown);
    firstActionRef.current?.focus();

    return () => {
      document.removeEventListener('mousedown', closeOnOutside);
      document.removeEventListener('touchstart', closeOnOutside);
      document.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setShowHistory(false);
      triggerRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (copyResetTimerRef.current !== null) {
        window.clearTimeout(copyResetTimerRef.current);
      }
    };
  }, []);

  const compute = (left: number, right: number, op: CalcOperator) => {
    if (op === '+') {
      return left + right;
    }
    if (op === '-') {
      return left - right;
    }
    if (op === '*') {
      return left * right;
    }
    if (op === '/') {
      if (right === 0) {
        return null;
      }
      return left / right;
    }
    if (right === 0) {
      return null;
    }
    return left % right;
  };

  const clearAll = () => {
    setDisplay('0');
    setFirstOperand(null);
    setOperator(null);
    setAwaitingSecond(false);
  };

  const inputDigit = (digit: string) => {
    if (display === 'Error') {
      setDisplay(digit);
      setAwaitingSecond(false);
      return;
    }

    if (awaitingSecond) {
      setDisplay(digit);
      setAwaitingSecond(false);
      return;
    }

    setDisplay((prev) => (prev === '0' ? digit : `${prev}${digit}`));
  };

  const inputDot = () => {
    if (display === 'Error') {
      setDisplay('0.');
      setAwaitingSecond(false);
      return;
    }
    if (awaitingSecond) {
      setDisplay('0.');
      setAwaitingSecond(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay((prev) => `${prev}.`);
    }
  };

  const handleOperator = (nextOperator: CalcOperator) => {
    const inputValue = Number(display);
    if (!Number.isFinite(inputValue)) {
      return;
    }

    if (firstOperand === null) {
      setFirstOperand(inputValue);
      setOperator(nextOperator);
      setAwaitingSecond(true);
      return;
    }

    if (operator && !awaitingSecond) {
      const result = compute(firstOperand, inputValue, operator);
      if (result === null) {
        setDisplay('Error');
        setFirstOperand(null);
        setOperator(null);
        setAwaitingSecond(false);
        return;
      }
      setDisplay(formatCalcValue(result));
      setFirstOperand(result);
    }

    setOperator(nextOperator);
    setAwaitingSecond(true);
  };

  const handleEquals = () => {
    if (firstOperand === null || operator === null) {
      return;
    }
    const secondOperand = Number(display);
    if (!Number.isFinite(secondOperand)) {
      return;
    }

    const result = compute(firstOperand, secondOperand, operator);
    if (result === null) {
      setDisplay('Error');
      setFirstOperand(null);
      setOperator(null);
      setAwaitingSecond(false);
      return;
    }

    const expression = `${formatCalcValue(firstOperand)} ${calcSymbol(operator)} ${formatCalcValue(secondOperand)}`;
    const resultText = formatCalcValue(result);

    setHistory((prev) => [
      {
        id: createId(),
        expression,
        result: resultText,
        timestamp: new Date().toLocaleString(),
      },
      ...prev,
    ].slice(0, 20));

    setDisplay(resultText);
    setFirstOperand(null);
    setOperator(null);
    setAwaitingSecond(false);
  };

  const handleBackspace = () => {
    if (display === 'Error') {
      setDisplay('0');
      return;
    }
    if (awaitingSecond) {
      setDisplay('0');
      setAwaitingSecond(false);
      return;
    }
    setDisplay((prev) => (prev.length <= 1 ? '0' : prev.slice(0, -1)));
  };

  const handleCopyResult = async () => {
    const valueToCopy = display;

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

      setCopied(true);
      if (copyResetTimerRef.current !== null) {
        window.clearTimeout(copyResetTimerRef.current);
      }
      copyResetTimerRef.current = window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  };

  useEffect(() => {
    actionsRef.current = {
      inputDigit,
      inputDot,
      handleOperator,
      handleEquals,
      handleBackspace,
      clearAll,
      toggleHistory: () => setShowHistory((prev) => !prev),
    };
  });

  const calcButtonBase =
    'rounded-md border border-[#D4D9D7] bg-white px-2.5 py-2 text-sm font-semibold text-[#1F2937] transition hover:bg-[#F8FAF9]';

  return (
    <div ref={containerRef} className='relative w-full sm:w-auto'>
      <button
        ref={triggerRef}
        type='button'
        onClick={() => setIsOpen((prev) => !prev)}
        aria-controls='quick-calculator-panel'
        aria-label='Toggle basic calculator'
        className='flex w-full items-center justify-between gap-3 rounded-xl border border-[#D4D9D7] bg-white px-3 py-2 shadow-sm transition hover:border-[#A2A2B2] sm:min-w-44 sm:w-auto'
      >
        <span className='text-left'>
          <span className='block text-[10px] font-bold uppercase tracking-[0.12em] text-[#636467]'>Basic Calculator</span>
          <span className='block text-sm font-extrabold text-[#1F2937] [font-variant-numeric:tabular-nums]'>{display}</span>
        </span>
        <svg className='h-4 w-4 text-[#636467]' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
          <path strokeLinecap='round' strokeLinejoin='round' d='M19 9l-7 7-7-7' />
        </svg>
      </button>

      {isOpen && (
        <div
          id='quick-calculator-panel'
          role='dialog'
          aria-label='Basic calculator'
          className='absolute left-1/2 z-50 mt-2 w-[min(92vw,20rem)] -translate-x-1/2 rounded-2xl border border-[#D4D9D7] bg-white p-3 shadow-xl sm:left-auto sm:right-0 sm:w-80 sm:translate-x-0'
        >
          <div className='mb-3 rounded-lg bg-[#111827] px-3 py-2'>
            <div className='mb-1 flex items-center justify-between gap-2'>
              <p className='text-[11px] font-medium text-[#9CA3AF]'>
                {firstOperand !== null && operator ? `${formatCalcValue(firstOperand)} ${calcSymbol(operator)}` : 'Quick calculation'}
              </p>
              <button
                type='button'
                onClick={handleCopyResult}
                className='rounded border border-[#374151] bg-[#1F2937] px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#D1D5DB] transition hover:bg-[#374151]'
              >
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <p className='text-right text-2xl font-bold text-white [font-variant-numeric:tabular-nums]'>
              {display}
            </p>
          </div>

          <div ref={keypadRef} className='grid grid-cols-4 gap-2'>
            <button ref={firstActionRef} data-calc-nav='true' type='button' className={`${calcButtonBase} text-[#B42318]`} onClick={clearAll}>C</button>
            <button data-calc-nav='true' type='button' className={calcButtonBase} onClick={handleBackspace}>Back</button>
            <button data-calc-nav='true' type='button' className={calcButtonBase} onClick={() => handleOperator('%')}>%</button>
            <button data-calc-nav='true' type='button' className={calcButtonBase} onClick={() => handleOperator('/')}>/</button>

            <button data-calc-nav='true' type='button' className={calcButtonBase} onClick={() => inputDigit('7')}>7</button>
            <button data-calc-nav='true' type='button' className={calcButtonBase} onClick={() => inputDigit('8')}>8</button>
            <button data-calc-nav='true' type='button' className={calcButtonBase} onClick={() => inputDigit('9')}>9</button>
            <button data-calc-nav='true' type='button' className={calcButtonBase} onClick={() => handleOperator('*')}>x</button>

            <button data-calc-nav='true' type='button' className={calcButtonBase} onClick={() => inputDigit('4')}>4</button>
            <button data-calc-nav='true' type='button' className={calcButtonBase} onClick={() => inputDigit('5')}>5</button>
            <button data-calc-nav='true' type='button' className={calcButtonBase} onClick={() => inputDigit('6')}>6</button>
            <button data-calc-nav='true' type='button' className={calcButtonBase} onClick={() => handleOperator('-')}>-</button>

            <button data-calc-nav='true' type='button' className={calcButtonBase} onClick={() => inputDigit('1')}>1</button>
            <button data-calc-nav='true' type='button' className={calcButtonBase} onClick={() => inputDigit('2')}>2</button>
            <button data-calc-nav='true' type='button' className={calcButtonBase} onClick={() => inputDigit('3')}>3</button>
            <button data-calc-nav='true' type='button' className={calcButtonBase} onClick={() => handleOperator('+')}>+</button>

            <button data-calc-nav='true' type='button' className={`${calcButtonBase} col-span-2`} onClick={() => inputDigit('0')}>0</button>
            <button data-calc-nav='true' type='button' className={calcButtonBase} onClick={inputDot}>.</button>
            <button data-calc-nav='true' type='button' className='rounded-md border border-[#068C44] bg-[#068C44] px-2.5 py-2 text-sm font-semibold text-white transition hover:bg-[#057A3C]' onClick={handleEquals}>=</button>
          </div>

          <div className='mt-3'>
            <button
              type='button'
              onClick={() => setShowHistory((prev) => !prev)}
              className='w-full rounded-md border border-[#D4D9D7] bg-[#F8FAF9] px-3 py-2 text-xs font-semibold uppercase tracking-widest text-[#4B5563] transition hover:bg-[#EEF4F1]'
            >
              History
            </button>
            {showHistory && (
              <div className='mt-2 max-h-40 space-y-2 overflow-y-auto rounded-md border border-[#E5E7EB] bg-[#FCFDFC] p-2'>
                {history.length === 0 ? (
                  <p className='text-xs text-[#6B7280]'>No saved history yet.</p>
                ) : (
                  history.map((item) => (
                    <div key={item.id} className='rounded-md border border-[#EEF2F0] bg-white px-2 py-1.5'>
                      <p className='text-xs font-semibold text-[#1F2937]'>
                        {item.expression} = {item.result}
                      </p>
                      <p className='text-[11px] text-[#6B7280]'>{item.timestamp}</p>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
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
            className={`group flex flex-col gap-2 rounded-lg border p-3 lg:flex-row lg:items-center lg:gap-3 transition duration-200 hover:shadow-sm ${
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
              className={`h-9 w-full min-w-0 rounded-md border bg-white px-3 py-1.5 text-sm text-[#1F2937] outline-none focus:ring-2 sm:flex-[1.6] transition-colors ${
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
              className={`h-9 w-full shrink-0 sm:w-32 md:w-40 lg:w-48 min-w-0 rounded-md border bg-white px-3 py-1.5 text-sm text-[#1F2937] outline-none focus:ring-2 transition-colors ${
                isDeductables
                  ? 'border-[#F2B8B5]/60 focus:border-[#B42318] focus:ring-[#B42318]/25 hover:border-[#F2B8B5]'
                  : 'border-[#C9CFCC]/60 focus:border-[#068C44] focus:ring-[#068C44]/30 hover:border-[#C9CFCC]'
              }`}
            />
            <div className='flex w-full items-center gap-2 sm:w-56 md:w-64 lg:w-72'>
              <div className='min-w-0 flex-1'>
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
              <button
                type='button'
                onClick={() => setItems((prev) => prev.filter((row) => row.id !== item.id))}
                title="Remove item"
                className={`ml-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-md border text-sm outline-none transition-colors ${
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
          {accent === 'gold' ? 'Total Zakatable Assets' : 'Total Zakatable Liabilities'}
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
    <main className='w-full h-full min-h-screen bg-[#F4F6F5] pb-16 text-[#1F2937]'>
      <nav className='sticky top-0 z-40 border-b border-[#D4D9D7] bg-white/95 backdrop-blur'>
        <div className='mx-auto max-w-350 px-4 sm:px-6 lg:px-10'>
          <div className='grid min-h-20 grid-cols-[1fr_auto_1fr] items-center gap-2 py-2'>
            <div />
            <div className='flex items-center justify-center gap-5'>
              <a
                href='https://ifacbd.com'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Visit IFA Consultancy website'
              >
                <Image
                  src='/ifac-logo.png'
                  alt='IFA Consultancy logo'
                  width={140}
                  height={48}
                  className='h-10 w-auto shrink-0 object-contain'
                  priority
                />
              </a>
              <div className='text-center'>
                <p className='text-[10px] font-bold uppercase tracking-[0.14em] text-[#636467]'>
                  Internal Zakat Calculation
                </p>
                <h1 className='text-lg font-extrabold tracking-tight text-[#1F2937]'>
                  Zakat <span className='text-[#068C44]'>Calculator</span>
                </h1>
              </div>
            </div>
            <div className='flex justify-end'>
              <QuickCalculator />
            </div>
          </div>
        </div>
      </nav>

      <div className='mx-auto max-w-350 px-4 pb-8 pt-8 sm:px-6 lg:px-10'>
        {exportError && (
          <section className='mb-6 rounded-xl border border-amber-300 bg-amber-50 p-4'>
            <div className='flex items-start justify-between gap-3'>
              <div>
                <p className='mb-1 text-sm font-semibold text-amber-900'>Export Issue</p>
                <p className='text-sm leading-relaxed text-amber-900'>{exportError}</p>
              </div>
              <button
                type='button'
                onClick={() => {
                  setExportError(null);
                  setExportIssueDebugText(null);
                }}
                className='rounded-md border border-amber-400/60 px-2 py-1 text-xs text-amber-900 hover:bg-amber-100'
              >
                Dismiss
              </button>
            </div>
            {exportIssueDebugText && (
              <div className='mt-3 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3'>
                <p className='text-xs font-semibold uppercase tracking-[0.08em] text-amber-900'>
                  Debug Details (Share With Support)
                </p>
                <pre className='mt-2 whitespace-pre-wrap break-all text-xs text-amber-900'>
                  {exportIssueDebugText}
                </pre>
              </div>
            )}
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
              <div className='flex h-9.5 gap-2'>
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
                Client Type
              </label>
              <div className='flex h-11 gap-2'>
                <button
                  type='button'
                  onClick={() =>
                    setBusinessInfo((prev) => ({
                      ...prev,
                      clientType: 'institution',
                    }))
                  }
                  className={`flex-1 rounded-md px-3 text-sm font-semibold transition-all ${
                    businessInfo.clientType === 'institution'
                      ? 'border border-[#068C44] bg-[#068C44]/10 text-[#068C44] shadow-sm shadow-[#068C44]/5'
                      : 'border border-[#C9CFCC] bg-[#F9FAF9] text-[#4B5563] hover:border-[#A2A2B2] hover:bg-white'
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
                  className={`flex-1 rounded-md px-3 text-sm font-semibold transition-all ${
                    businessInfo.clientType === 'person'
                      ? 'border border-[#068C44] bg-[#068C44]/10 text-[#068C44] shadow-sm shadow-[#068C44]/5'
                      : 'border border-[#C9CFCC] bg-[#F9FAF9] text-[#4B5563] hover:border-[#A2A2B2] hover:bg-white'
                  }`}
                >
                  Person
                </button>
              </div>
            </div>
            <div>
              <label className='mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-[#636467]'>
                Zakat Year
              </label>
              <div className='flex h-9.5 items-center gap-2'>
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

        <div className='grid gap-6 grid-cols-1'>
          <LineItemEditor title='Assets (A)' items={assets} setItems={setAssets} accent='gold' />
          <LineItemEditor
            title='Deductables (B)'
            items={liabilities}
            setItems={setLiabilities}
            accent='red'
          />
        </div>

        <section className='mt-6 grid gap-4 lg:grid-cols-4'>
          <ResultCard label='Total Zakatable Assets' value={totals.totalAssets} color='gold' prefix='A.' />
          <ResultCard label='Total Zakatable Liabilities' value={totals.totalDebt} color='red' prefix='B.' />
          <div className='flex flex-col justify-center rounded-2xl border border-[#068C44]/30 bg-linear-to-r from-[#068C44]/10 to-[#068C44]/5 p-5 lg:col-span-2 shadow-sm'>
            <div className='mb-2 flex items-center justify-between gap-2'>
              <div className='flex items-center gap-3'>
                <span className='flex h-6 items-center justify-center rounded-sm bg-[#068C44] px-2 text-xs font-bold text-white'>
                  A - B
                </span>
                <p className='text-xs font-bold uppercase tracking-[0.15em] text-[#636467]'>
                  Net Zakatable Asset
                </p>
              </div>
              <CopyValueButton value={totals.netZakatableAssets} label='Net Zakatable Asset' />
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
                  <div className='mb-1.5 flex items-center justify-between gap-2'>
                    <p className='flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#636467]'>
                      Zakat Rate
                    </p>
                    <CopyValueButton value={value} label={`Calculated Zakat ${rate}%`} />
                  </div>
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
      <div className='mb-2 flex items-start justify-between gap-2'>
        <p className='flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] sm:text-xs'>
          {prefix && (
            <span className={`inline-flex h-5 items-center justify-center rounded px-1.5 ${color === 'gold' ? 'bg-[#068C44]/10' : color === 'red' ? 'bg-[#B42318]/10' : ''}`}>
              {prefix}
            </span>
          )}
          <span className='opacity-80'>{label}</span>
        </p>
        <CopyValueButton value={value} label={label} />
      </div>
      <p className={`text-2xl sm:text-3xl font-extrabold [font-variant-numeric:tabular-nums] ${color === 'red' ? 'text-[#B42318]' : 'text-[#068C44]'}`}>
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
      title={isCopied ? 'Copied!' : `Copy ${label}`}
      className={`relative z-10 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 ${
        isCopied
          ? 'border-[#16A34A] bg-[#16A34A]/20 text-[#16A34A]'
          : 'border-[#068C44]/40 bg-[#068C44]/10 text-[#068C44] hover:bg-[#068C44]/20'
      }`}
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
        strokeWidth={2.5}
      >
        <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
      </svg>
    </button>
  );
}
