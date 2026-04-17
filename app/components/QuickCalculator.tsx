'use client';

import { useEffect, useRef, useState } from 'react';

type CalcOperator = '+' | '-' | '*' | '/' | '%';

type CalcHistoryItem = {
  id: string;
  expression: string;
  result: string;
  timestamp: string;
};

const MAX_CALC_HISTORY_ITEMS = 20;
const MAX_CALC_DIGITS = 16;
const HISTORY_STORAGE_KEY = 'zakatQuickCalculatorHistoryV1';

const createId = () =>
  typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);

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

const isCalcHistoryItem = (value: unknown): value is CalcHistoryItem => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const candidate = value as Partial<CalcHistoryItem>;
  return (
    typeof candidate.id === 'string' &&
    typeof candidate.expression === 'string' &&
    typeof candidate.result === 'string' &&
    typeof candidate.timestamp === 'string'
  );
};

const normalizeStoredCalcHistory = (value: unknown): CalcHistoryItem[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((entry): entry is CalcHistoryItem => isCalcHistoryItem(entry))
    .slice(0, MAX_CALC_HISTORY_ITEMS);
};

const countCalcDigits = (value: string): number => (value.match(/\d/g) ?? []).length;

export function QuickCalculator() {
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
      const raw = window.localStorage.getItem(HISTORY_STORAGE_KEY);
      if (!raw) {
        return;
      }
      const parsed = JSON.parse(raw) as unknown;
      setHistory(normalizeStoredCalcHistory(parsed));
    } catch {
      // Ignore malformed localStorage payloads.
    }
  }, []);

  useEffect(() => {
    if (!triggerRef.current) {
      return;
    }

    triggerRef.current.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }, [isOpen]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    try {
      window.localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
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

      if (event.ctrlKey || event.metaKey || event.altKey) {
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

      if (event.key === '=' || event.key === 'Enter' || event.code === 'NumpadEnter') {
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

    setDisplay((prev) => {
      const nextValue = prev === '0' ? digit : `${prev}${digit}`;
      if (countCalcDigits(nextValue) > MAX_CALC_DIGITS) {
        return prev;
      }
      return nextValue;
    });
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
    ].slice(0, MAX_CALC_HISTORY_ITEMS));

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
        aria-haspopup='dialog'
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
