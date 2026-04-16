'use client';

import Image from 'next/image';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';

import { detectBanglaInputMethod } from '../../lib/banglaInput';

type CalcOperator = '+' | '-' | '*' | '/';

function QuickCalculator() {
  const [isOpen, setIsOpen] = useState(false);
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<CalcOperator | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (panelRef.current && !panelRef.current.contains(target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const clearAll = () => {
    setDisplay('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const inputDigit = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplay(digit);
      setWaitingForSecondOperand(false);
      return;
    }

    setDisplay((prev) => (prev === '0' ? digit : `${prev}${digit}`));
  };

  const inputDot = () => {
    if (waitingForSecondOperand) {
      setDisplay('0.');
      setWaitingForSecondOperand(false);
      return;
    }

    if (!display.includes('.')) {
      setDisplay((prev) => `${prev}.`);
    }
  };

  const calculate = (left: number, right: number, op: CalcOperator) => {
    if (op === '+') {
      return left + right;
    }
    if (op === '-') {
      return left - right;
    }
    if (op === '*') {
      return left * right;
    }

    if (right === 0) {
      return null;
    }

    return left / right;
  };

  const selectOperator = (nextOperator: CalcOperator) => {
    const inputValue = Number(display);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
      setOperator(nextOperator);
      setWaitingForSecondOperand(true);
      return;
    }

    if (operator && !waitingForSecondOperand) {
      const result = calculate(firstOperand, inputValue, operator);
      if (result === null) {
        setDisplay('Error');
        setFirstOperand(null);
        setOperator(null);
        setWaitingForSecondOperand(false);
        return;
      }

      const resultText = String(Number(result.toFixed(8)));
      setDisplay(resultText);
      setFirstOperand(result);
    }

    setOperator(nextOperator);
    setWaitingForSecondOperand(true);
  };

  const handleEquals = () => {
    if (firstOperand === null || operator === null) {
      return;
    }

    const inputValue = Number(display);
    const result = calculate(firstOperand, inputValue, operator);

    if (result === null) {
      setDisplay('Error');
    } else {
      setDisplay(String(Number(result.toFixed(8))));
    }

    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const handleBackspace = () => {
    setDisplay((prev) => (prev.length > 1 ? prev.slice(0, -1) : '0'));
  };

  const keypadButtonClass =
    'rounded-md border border-[#D4D9D7] bg-white px-2 py-2 text-sm font-semibold text-[#1F2937] transition hover:bg-[#F7FAF9]';

  return (
    <div ref={panelRef} className='relative'>
      <button
        type='button'
        onClick={() => setIsOpen((prev) => !prev)}
        className='flex min-w-40 items-center justify-between gap-2 rounded-xl border border-[#D4D9D7] bg-white px-3 py-2 shadow-sm transition hover:border-[#A2A2B2]'
        aria-label='Toggle basic calculator'
      >
        <span className='text-left'>
          <span className='block text-[10px] font-bold uppercase tracking-[0.12em] text-[#636467]'>
            Calculator
          </span>
          <span className='block text-sm font-extrabold text-[#1F2937]'>{display}</span>
        </span>
        <span className='text-[#636467]'>v</span>
      </button>

      {isOpen && (
        <div className='absolute right-0 z-50 mt-2 w-72 rounded-2xl border border-[#D4D9D7] bg-white p-3 shadow-xl'>
          <div className='mb-3 rounded-lg bg-[#111827] px-3 py-2'>
            <p className='text-right text-2xl font-bold text-white'>{display}</p>
          </div>

          <div className='grid grid-cols-4 gap-2'>
            <button type='button' className={`${keypadButtonClass} text-[#B42318]`} onClick={clearAll}>C</button>
            <button type='button' className={keypadButtonClass} onClick={handleBackspace}>Back</button>
            <button type='button' className={keypadButtonClass} onClick={() => selectOperator('/')}>/</button>
            <button type='button' className={keypadButtonClass} onClick={() => selectOperator('*')}>x</button>

            <button type='button' className={keypadButtonClass} onClick={() => inputDigit('7')}>7</button>
            <button type='button' className={keypadButtonClass} onClick={() => inputDigit('8')}>8</button>
            <button type='button' className={keypadButtonClass} onClick={() => inputDigit('9')}>9</button>
            <button type='button' className={keypadButtonClass} onClick={() => selectOperator('-')}>-</button>

            <button type='button' className={keypadButtonClass} onClick={() => inputDigit('4')}>4</button>
            <button type='button' className={keypadButtonClass} onClick={() => inputDigit('5')}>5</button>
            <button type='button' className={keypadButtonClass} onClick={() => inputDigit('6')}>6</button>
            <button type='button' className={keypadButtonClass} onClick={() => selectOperator('+')}>+</button>

            <button type='button' className={keypadButtonClass} onClick={() => inputDigit('1')}>1</button>
            <button type='button' className={keypadButtonClass} onClick={() => inputDigit('2')}>2</button>
            <button type='button' className={keypadButtonClass} onClick={() => inputDigit('3')}>3</button>
            <button
              type='button'
              className='row-span-2 rounded-md border border-[#068C44] bg-[#068C44] px-2 py-2 text-sm font-semibold text-white transition hover:bg-[#057A3C]'
              onClick={handleEquals}
            >
              =
            </button>

            <button type='button' className={`${keypadButtonClass} col-span-2`} onClick={() => inputDigit('0')}>0</button>
            <button type='button' className={keypadButtonClass} onClick={inputDot}>.</button>
          </div>
        </div>
      )}
    </div>
  );
}

type ZakatReportFormData = {
  timeline: string;
  year: string;
  date: string;
  month: string;
  client_name: string;
  jakatable_asset: string;
  jakat_rate: string;
  net_jakat: string;
  extra_info: string;
  optional_extra_info: string;
};

type GenerateReportErrorPayload = {
  error?: string;
  debugCode?: string;
  missingFields?: string[];
  invalidFields?: string[];
};

type NumericFieldValidation = {
  isValid: boolean;
  helperText: string;
};

type YearSystem = 'Hijri' | 'Gregorian';

const TIMELINE_MIN_START: Record<YearSystem, number> = {
  Hijri: 1445,
  Gregorian: 2024,
};

const TIMELINE_DEFAULT_START: Record<YearSystem, number> = {
  Hijri: 1445,
  Gregorian: 2024,
};

const GREGORIAN_MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

const HIJRI_MONTHS = [
  'Muharram',
  'Safar',
  "Rabi' al-Awwal",
  "Rabi' al-Thani",
  'Jumada al-Awwal',
  'Jumada al-Thani',
  'Rajab',
  "Sha'ban",
  'Ramadan',
  'Shawwal',
  "Dhu al-Qi'dah",
  'Dhu al-Hijjah',
] as const;

const TIMELINE_PATTERN = /^(\d{4})\s*-\s*(\d{2,4})$/;
const SUBMIT_TIMEOUT_MS = 30_000;

const getMonthsForSystem = (yearSystem: YearSystem) =>
  yearSystem === 'Hijri' ? HIJRI_MONTHS : GREGORIAN_MONTHS;

const formatTimelineRange = (startYear: number, yearSystem: YearSystem) => {
  if (yearSystem === 'Gregorian') {
    const nextYearShort = String((startYear + 1) % 100).padStart(2, '0');
    return `${startYear}-${nextYearShort}`;
  }

  return `${startYear}-${startYear + 1}`;
};

const parseTimelineStart = (timeline: string, yearSystem: YearSystem): number | null => {
  const match = timeline.match(/^(\d{4})\s*-\s*(\d{2,4})$/);
  if (!match) {
    return null;
  }

  const startYear = Number(match[1]);
  const endYear = Number(match[2]);

  if (!Number.isFinite(startYear) || !Number.isFinite(endYear)) {
    return null;
  }

  if (yearSystem === 'Gregorian') {
    if (endYear !== (startYear + 1) % 100 && endYear !== startYear + 1) {
      return null;
    }
  } else if (endYear !== startYear + 1) {
    return null;
  }

  return startYear;
};

const toInputDateValue = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getDefaultFormData = (): ZakatReportFormData => {
  const now = new Date();

  return {
    timeline: formatTimelineRange(TIMELINE_DEFAULT_START.Hijri, 'Hijri'),
    year: 'Hijri',
    date: toInputDateValue(now),
    month: HIJRI_MONTHS[0],
    client_name: '',
    jakatable_asset: '0.00',
    jakat_rate: '2.577%',
    net_jakat: '0.00',
    extra_info: '',
    optional_extra_info: '',
  };
};

const parseDownloadFileName = (contentDisposition: string | null): string => {
  if (!contentDisposition) {
    return 'Zakat_Report.docx';
  }

  const utf8Match = contentDisposition.match(/filename\*=UTF-8''([^;]+)/i);
  if (utf8Match?.[1]) {
    return decodeURIComponent(utf8Match[1]);
  }

  const fallbackMatch = contentDisposition.match(/filename="?([^";]+)"?/i);
  if (fallbackMatch?.[1]) {
    return fallbackMatch[1];
  }

  return 'Zakat_Report.docx';
};

const normalizeNumericInput = (value: string): string =>
  value
    .trim()
    .replace(/^৳/u, '')
    .replace(/bdt$/iu, '')
    .replace(/,/g, '')
    .replace(/\s+/g, '');

const parseNumericInput = (rawValue: string): number | null => {
  const normalized = normalizeNumericInput(rawValue);
  if (!/^[+-]?\d+(?:\.\d+)?$/.test(normalized)) {
    return null;
  }

  const numericValue = Number(normalized);
  return Number.isFinite(numericValue) ? numericValue : null;
};

const formatNumericForDisplay = (value: number): string =>
  new Intl.NumberFormat('en-BD', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

const validateNumericField = (rawValue: string): NumericFieldValidation => {
  if (rawValue.trim().length === 0) {
    return {
      isValid: false,
      helperText: 'Please enter a number. Commas are allowed.',
    };
  }

  const numericValue = parseNumericInput(rawValue);
  if (numericValue === null) {
    return {
      isValid: false,
      helperText: 'Invalid number format. Example: 1,250,000.00',
    };
  }

  return {
    isValid: true,
    helperText: 'Valid number detected. Commas are supported.',
  };
};

const createClientDebugCode = (): string =>
  `ZR-CLIENT-${Date.now().toString(36).toUpperCase()}`;

const buildIssueDebugText = ({
  debugCode,
  httpStatus,
  errorPayload,
  fallbackError,
}: {
  debugCode: string;
  httpStatus: number | null;
  errorPayload?: GenerateReportErrorPayload | null;
  fallbackError?: string;
}): string => {
  const lines = [
    `Debug code: ${debugCode}`,
    `Time: ${new Date().toISOString()}`,
    `Endpoint: POST /api/generate-zakat-report`,
    `HTTP status: ${httpStatus ?? 'N/A'}`,
  ];

  if (errorPayload?.error) {
    lines.push(`Server message: ${errorPayload.error}`);
  }

  if (errorPayload?.missingFields && errorPayload.missingFields.length > 0) {
    lines.push(`Missing fields: ${errorPayload.missingFields.join(', ')}`);
  }

  if (errorPayload?.invalidFields && errorPayload.invalidFields.length > 0) {
    lines.push(`Invalid fields: ${errorPayload.invalidFields.join(', ')}`);
  }

  if (fallbackError) {
    lines.push(`Client error: ${fallbackError}`);
  }

  return lines.join('\n');
};

const getInputMethodDisplay = (value: string): { label: string; className: string } => {
  const method = detectBanglaInputMethod(value);

  if (method === 'unicode') {
    return {
      label: 'Input method: Unicode (Avro/Unicode compatible)',
      className: 'text-emerald-700',
    };
  }

  if (method === 'bijoy-ansi') {
    return {
      label: 'Input method: Bijoy ANSI (will auto-convert to Unicode)',
      className: 'text-amber-700',
    };
  }

  return {
    label: 'Input method: Neutral/English text',
    className: 'text-slate-500',
  };
};

const validateFormDataBeforeSubmit = (formData: ZakatReportFormData): string | null => {
  const requiredFields: Array<keyof ZakatReportFormData> = [
    'timeline',
    'year',
    'date',
    'month',
    'client_name',
    'jakatable_asset',
    'jakat_rate',
    'net_jakat',
    'extra_info',
  ];

  for (const field of requiredFields) {
    if (formData[field].trim().length === 0) {
      return 'Please fill in all required fields before generating the report.';
    }
  }

  const timelineMatch = formData.timeline.trim().match(TIMELINE_PATTERN);
  if (!timelineMatch) {
    return 'Timeline format is invalid. Please use format like 1445-1446.';
  }

  const startYear = Number(timelineMatch[1]);
  const endYear = Number(timelineMatch[2]);
  const isGregorian = formData.year === 'Gregorian';
  const expectedEndForGregorian = (startYear + 1) % 100;
  const isValidTimeline = isGregorian
    ? endYear === startYear + 1 || endYear === expectedEndForGregorian
    : endYear === startYear + 1;

  if (!isValidTimeline) {
    return 'Timeline and year system do not match. Please adjust the timeline.';
  }

  const monthsForYearSystem = getMonthsForSystem(formData.year as YearSystem);
  if (!monthsForYearSystem.some((monthValue) => monthValue === formData.month)) {
    return 'Selected month is invalid for the current year system.';
  }

  const jakatableAssetValidation = validateNumericField(formData.jakatable_asset);
  if (!jakatableAssetValidation.isValid) {
    return 'Jakatable Asset is invalid. Please enter a valid number (commas are allowed).';
  }

  const netJakatValidation = validateNumericField(formData.net_jakat);
  if (!netJakatValidation.isValid) {
    return 'Net Jakat is invalid. Please enter a valid number (commas are allowed).';
  }

  return null;
};

export default function ZakatReportPage() {
  const [formData, setFormData] = useState<ZakatReportFormData>(() => getDefaultFormData());
  const [timelineStartBySystem, setTimelineStartBySystem] = useState<Record<YearSystem, number>>(
    {
      Hijri: TIMELINE_DEFAULT_START.Hijri,
      Gregorian: TIMELINE_DEFAULT_START.Gregorian,
    },
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [issueDebugText, setIssueDebugText] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string>('');

  const downloadLinkRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    return () => {
      if (downloadUrl) {
        URL.revokeObjectURL(downloadUrl);
      }
    };
  }, [downloadUrl]);

  const handleFieldChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formatNumericFieldOnBlur = (field: 'jakatable_asset' | 'net_jakat') => {
    setFormData((prev) => {
      const currentValue = prev[field];
      if (currentValue.trim().length === 0) {
        return {
          ...prev,
          [field]: '0.00',
        };
      }

      const parsedValue = parseNumericInput(currentValue);
      if (parsedValue === null) {
        return prev;
      }

      return {
        ...prev,
        [field]: formatNumericForDisplay(parsedValue),
      };
    });
  };

  const clearNumericDefaultOnFocus = (field: 'jakatable_asset' | 'net_jakat') => {
    setFormData((prev) => {
      if (prev[field] !== '0.00') {
        return prev;
      }

      return {
        ...prev,
        [field]: '',
      };
    });
  };

  const handleYearSystemChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedYearSystem = event.target.value as YearSystem;
    const availableMonths = getMonthsForSystem(selectedYearSystem);

    setFormData((prev) => {
      const minStart = TIMELINE_MIN_START[selectedYearSystem];
      const savedStart = timelineStartBySystem[selectedYearSystem];
      const nextStart = Math.max(minStart, savedStart);
      const hasCurrentMonth = availableMonths.some((monthValue) => monthValue === prev.month);

      return {
        ...prev,
        year: selectedYearSystem,
        timeline: formatTimelineRange(nextStart, selectedYearSystem),
        month: hasCurrentMonth ? prev.month : availableMonths[0],
      };
    });
  };

  const adjustTimelineBy = (step: number) => {
    setFormData((prev) => {
      const selectedYearSystem = (prev.year === 'Gregorian' ? 'Gregorian' : 'Hijri') as YearSystem;
      const minStart = TIMELINE_MIN_START[selectedYearSystem];
      const currentStart =
        parseTimelineStart(prev.timeline, selectedYearSystem) ??
        timelineStartBySystem[selectedYearSystem];
      const nextStart = Math.max(minStart, currentStart + step);

      setTimelineStartBySystem((current) => ({
        ...current,
        [selectedYearSystem]: nextStart,
      }));

      return {
        ...prev,
        timeline: formatTimelineRange(nextStart, selectedYearSystem),
      };
    });
  };

  const normalizeTimelineForCurrentSystem = () => {
    setFormData((prev) => {
      const selectedYearSystem = (prev.year === 'Gregorian' ? 'Gregorian' : 'Hijri') as YearSystem;
      const minStart = TIMELINE_MIN_START[selectedYearSystem];
      const parsedStart = parseTimelineStart(prev.timeline, selectedYearSystem);
      const fallbackStart = timelineStartBySystem[selectedYearSystem];
      const normalizedStart = Math.max(minStart, parsedStart ?? fallbackStart);

      setTimelineStartBySystem((current) => ({
        ...current,
        [selectedYearSystem]: normalizedStart,
      }));

      return {
        ...prev,
        timeline: formatTimelineRange(normalizedStart, selectedYearSystem),
      };
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const formValidationError = validateFormDataBeforeSubmit(formData);
    if (formValidationError) {
      setErrorMessage(formValidationError);
      setIssueDebugText(null);
      setSuccessMessage(null);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);
    setIssueDebugText(null);
    setSuccessMessage(null);

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => {
      controller.abort();
    }, SUBMIT_TIMEOUT_MS);

    try {
      const payload: ZakatReportFormData = {
        ...formData,
        timeline: formData.timeline.trim(),
        year: formData.year.trim(),
        date: formData.date.trim(),
        month: formData.month.trim(),
        client_name: formData.client_name.trim(),
        jakatable_asset: formData.jakatable_asset.trim(),
        jakat_rate: formData.jakat_rate.trim(),
        net_jakat: formData.net_jakat.trim(),
        extra_info: formData.extra_info.trim(),
        optional_extra_info: formData.optional_extra_info.trim(),
      };

      const response = await fetch('/api/generate-zakat-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      if (!response.ok) {
        const errorPayload = (await response.json().catch(() => null)) as GenerateReportErrorPayload | null;
        const debugCode =
          errorPayload?.debugCode ??
          response.headers.get('X-Debug-Code') ??
          createClientDebugCode();

        setErrorMessage(
          'We could not generate the report this time. Please share the debug details below with the support team.',
        );
        setIssueDebugText(
          buildIssueDebugText({
            debugCode,
            httpStatus: response.status,
            errorPayload,
          }),
        );
        return;
      }

      const blob = await response.blob();
      if (blob.size === 0) {
        throw new Error('Generated document is empty.');
      }

      const nextDownloadUrl = URL.createObjectURL(blob);
      const fileName = parseDownloadFileName(
        response.headers.get('Content-Disposition'),
      );

      if (downloadUrl) {
        URL.revokeObjectURL(downloadUrl);
      }
      setDownloadUrl(nextDownloadUrl);

      const link = downloadLinkRef.current;
      if (!link) {
        throw new Error('Download link could not be initialized.');
      }

      link.href = nextDownloadUrl;
      link.download = fileName;
      link.click();

      setIssueDebugText(null);
      setSuccessMessage('Document generated successfully. Your download should begin now.');
    } catch (error) {
      console.error('[zakat-report] Failed to generate report:', error);
      const debugCode = createClientDebugCode();
      const fallbackErrorMessage =
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred while generating the report.';

      setErrorMessage(
        error instanceof DOMException && error.name === 'AbortError'
          ? 'The request timed out. Please share the debug details below with the support team.'
          : 'A connectivity/runtime issue occurred. Please share the debug details below with the support team.',
      );
      setIssueDebugText(
        buildIssueDebugText({
          debugCode,
          httpStatus: null,
          fallbackError: fallbackErrorMessage,
        }),
      );
    } finally {
      window.clearTimeout(timeoutId);
      setIsSubmitting(false);
    }
  };

  const selectedYearSystem: YearSystem = formData.year === 'Gregorian' ? 'Gregorian' : 'Hijri';
  const monthsForSelectedYear = getMonthsForSystem(selectedYearSystem);
  const clientNameInputMethod = getInputMethodDisplay(formData.client_name);
  const extraInfoInputMethod = getInputMethodDisplay(formData.extra_info);
  const optionalExtraInfoInputMethod = getInputMethodDisplay(formData.optional_extra_info);
  const jakatableAssetValidation = validateNumericField(formData.jakatable_asset);
  const netJakatValidation = validateNumericField(formData.net_jakat);

  return (
    <div className='min-h-screen bg-linear-to-br from-slate-50 via-white to-emerald-50/60'>
      <nav className='sticky top-0 z-40 border-b border-[#D4D9D7] bg-white/95 backdrop-blur'>
        <div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
          <div className='grid min-h-20 grid-cols-[1fr_auto_1fr] items-center gap-2 py-2'>
            <div />
            <div className='flex items-center justify-center gap-4'>
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
                  Internal Zakat Report
                </p>
                <h1 className='text-lg font-extrabold tracking-tight text-[#1F2937]'>
                  Report <span className='text-[#068C44]'>Generator</span>
                </h1>
              </div>
            </div>
            <div className='flex justify-end'>
              <QuickCalculator />
            </div>
          </div>
        </div>
      </nav>

      <main className='px-4 py-10 sm:px-6 lg:px-8'>
        <div className='mx-auto max-w-4xl'>
        <section className='rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50'>
          <div className='border-b border-slate-200 px-6 py-6 sm:px-8'>
            <p className='text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700'>
              Zakat Documentation Suite
            </p>
            <h1 className='mt-2 text-2xl font-bold text-slate-900 sm:text-3xl'>
              Zakat Report Generator
            </h1>
            <p className='mt-3 max-w-2xl text-sm text-slate-600 sm:text-base'>
              Fill in the details below to generate a professional DOCX report using your
              approved template.
            </p>
            <p className='mt-2 text-xs text-slate-500'>
              Bangla input is supported in both Avro Unicode and Bijoy ANSI. ANSI text is
              converted to Unicode automatically.
            </p>
          </div>

          <form onSubmit={handleSubmit} className='px-6 py-6 sm:px-8'>
            <fieldset disabled={isSubmitting} className='space-y-6 disabled:opacity-70'>
              <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
                <div>
                  <label htmlFor='timeline' className='mb-2 block text-sm font-semibold text-slate-700'>
                    Timeline
                  </label>
                  <div className='flex items-center gap-2'>
                    <button
                      type='button'
                      onClick={() => adjustTimelineBy(-1)}
                      className='inline-flex h-10.5 w-10.5 items-center justify-center rounded-lg border border-slate-300 bg-white text-lg font-bold text-slate-700 shadow-sm transition hover:bg-slate-100'
                      aria-label='Decrease timeline by one year'
                    >
                      -
                    </button>
                    <input
                      id='timeline'
                      name='timeline'
                      value={formData.timeline}
                      onChange={(event) =>
                        setFormData((prev) => ({
                          ...prev,
                          timeline: event.target.value,
                        }))
                      }
                      onBlur={normalizeTimelineForCurrentSystem}
                      required
                      className='w-full rounded-lg border border-slate-300 px-3 py-2.5 text-center text-sm font-semibold text-slate-900 shadow-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100'
                    />
                    <button
                      type='button'
                      onClick={() => adjustTimelineBy(1)}
                      className='inline-flex h-10.5 w-10.5 items-center justify-center rounded-lg border border-slate-300 bg-white text-lg font-bold text-slate-700 shadow-sm transition hover:bg-slate-100'
                      aria-label='Increase timeline by one year'
                    >
                      +
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor='year' className='mb-2 block text-sm font-semibold text-slate-700'>
                    Year
                  </label>
                  <select
                    id='year'
                    name='year'
                    value={formData.year}
                    onChange={handleYearSystemChange}
                    required
                    className='w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100'
                  >
                    <option value='Hijri'>Hijri</option>
                    <option value='Gregorian'>Gregorian</option>
                  </select>
                </div>

                <div>
                  <label htmlFor='date' className='mb-2 block text-sm font-semibold text-slate-700'>
                    Report Date
                  </label>
                  <input
                    id='date'
                    name='date'
                    type='date'
                    value={formData.date}
                    onChange={handleFieldChange}
                    required
                    className='w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100'
                  />
                </div>

                <div>
                  <label htmlFor='month' className='mb-2 block text-sm font-semibold text-slate-700'>
                    Month
                  </label>
                  <select
                    id='month'
                    name='month'
                    value={formData.month}
                    onChange={(event) => {
                      const { name, value } = event.target;
                      setFormData((prev) => ({ ...prev, [name]: value }));
                    }}
                    required
                    className='w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100'
                  >
                    {monthsForSelectedYear.map((monthOption) => (
                      <option key={`${selectedYearSystem}-${monthOption}`} value={monthOption}>
                        {monthOption}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor='client_name' className='mb-2 block text-sm font-semibold text-slate-700'>
                    Client Name
                  </label>
                  <input
                    id='client_name'
                    name='client_name'
                    value={formData.client_name}
                    onChange={handleFieldChange}
                    required
                    className='w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100'
                    placeholder='Client full name'
                  />
                  <p className={`mt-1 text-xs ${clientNameInputMethod.className}`}>
                    {clientNameInputMethod.label}
                  </p>
                </div>

                <div>
                  <label htmlFor='jakatable_asset' className='mb-2 block text-sm font-semibold text-slate-700'>
                    Jakatable Asset
                  </label>
                  <input
                    id='jakatable_asset'
                    name='jakatable_asset'
                    value={formData.jakatable_asset}
                    onChange={handleFieldChange}
                    onFocus={() => clearNumericDefaultOnFocus('jakatable_asset')}
                    onBlur={() => formatNumericFieldOnBlur('jakatable_asset')}
                    required
                    className='w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100'
                    placeholder='e.g. 1,250,000.00 BDT'
                  />
                  <div className='mt-1 flex items-center gap-2'>
                    <span
                      className={`inline-flex h-5 w-5 items-center justify-center rounded-full border ${
                        jakatableAssetValidation.isValid
                          ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                          : 'border-rose-200 bg-rose-50 text-rose-700'
                      }`}
                      aria-hidden='true'
                    >
                      {jakatableAssetValidation.isValid ? (
                        <svg viewBox='0 0 20 20' fill='currentColor' className='h-3.5 w-3.5'>
                          <path
                            fillRule='evenodd'
                            d='M16.704 5.29a1 1 0 010 1.42l-7.2 7.2a1 1 0 01-1.415 0l-3-3a1 1 0 111.415-1.42l2.293 2.294 6.493-6.494a1 1 0 011.414 0z'
                            clipRule='evenodd'
                          />
                        </svg>
                      ) : (
                        <svg viewBox='0 0 20 20' fill='currentColor' className='h-3.5 w-3.5'>
                          <path
                            fillRule='evenodd'
                            d='M5.293 5.293a1 1 0 011.414 0L10 8.586l3.293-3.293a1 1 0 111.414 1.414L11.414 10l3.293 3.293a1 1 0 01-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 10 5.293 6.707a1 1 0 010-1.414z'
                            clipRule='evenodd'
                          />
                        </svg>
                      )}
                    </span>
                    <p
                      className={`text-xs ${
                        jakatableAssetValidation.isValid ? 'text-emerald-700' : 'text-rose-700'
                      }`}
                    >
                      {jakatableAssetValidation.helperText}
                    </p>
                  </div>
                </div>

                <div>
                  <label htmlFor='jakat_rate' className='mb-2 block text-sm font-semibold text-slate-700'>
                    Jakat Rate
                  </label>
                  <select
                    id='jakat_rate'
                    name='jakat_rate'
                    value={formData.jakat_rate}
                    onChange={(event) => {
                      const { name, value } = event.target;
                      setFormData((prev) => ({ ...prev, [name]: value }));
                    }}
                    required
                    className='w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100'
                  >
                    <option value='2.5%'>2.5%</option>
                    <option value='2.577%'>2.577%</option>
                    <option value='2.6%'>2.6%</option>
                  </select>
                </div>

                <div>
                  <label htmlFor='net_jakat' className='mb-2 block text-sm font-semibold text-slate-700'>
                    Net Jakat
                  </label>
                  <input
                    id='net_jakat'
                    name='net_jakat'
                    value={formData.net_jakat}
                    onChange={handleFieldChange}
                    onFocus={() => clearNumericDefaultOnFocus('net_jakat')}
                    onBlur={() => formatNumericFieldOnBlur('net_jakat')}
                    required
                    className='w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100'
                    placeholder='e.g. 32,212.50 BDT'
                  />
                  <div className='mt-1 flex items-center gap-2'>
                    <span
                      className={`inline-flex h-5 w-5 items-center justify-center rounded-full border ${
                        netJakatValidation.isValid
                          ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                          : 'border-rose-200 bg-rose-50 text-rose-700'
                      }`}
                      aria-hidden='true'
                    >
                      {netJakatValidation.isValid ? (
                        <svg viewBox='0 0 20 20' fill='currentColor' className='h-3.5 w-3.5'>
                          <path
                            fillRule='evenodd'
                            d='M16.704 5.29a1 1 0 010 1.42l-7.2 7.2a1 1 0 01-1.415 0l-3-3a1 1 0 111.415-1.42l2.293 2.294 6.493-6.494a1 1 0 011.414 0z'
                            clipRule='evenodd'
                          />
                        </svg>
                      ) : (
                        <svg viewBox='0 0 20 20' fill='currentColor' className='h-3.5 w-3.5'>
                          <path
                            fillRule='evenodd'
                            d='M5.293 5.293a1 1 0 011.414 0L10 8.586l3.293-3.293a1 1 0 111.414 1.414L11.414 10l3.293 3.293a1 1 0 01-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 10 5.293 6.707a1 1 0 010-1.414z'
                            clipRule='evenodd'
                          />
                        </svg>
                      )}
                    </span>
                    <p
                      className={`text-xs ${
                        netJakatValidation.isValid ? 'text-emerald-700' : 'text-rose-700'
                      }`}
                    >
                      {netJakatValidation.helperText}
                    </p>
                  </div>
                </div>
              </div>

              <div className='grid grid-cols-1 gap-5'>
                <div>
                  <label htmlFor='extra_info' className='mb-2 block text-sm font-semibold text-slate-700'>
                    Extra Information
                  </label>
                  <textarea
                    id='extra_info'
                    name='extra_info'
                    value={formData.extra_info}
                    onChange={handleFieldChange}
                    required
                    rows={4}
                    className='w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100'
                    placeholder='Any primary notes to include in the report...'
                  />
                  <p className={`mt-1 text-xs ${extraInfoInputMethod.className}`}>
                    {extraInfoInputMethod.label}
                  </p>
                </div>

                <div>
                  <label htmlFor='optional_extra_info' className='mb-2 block text-sm font-semibold text-slate-700'>
                    Optional Extra Information
                  </label>
                  <textarea
                    id='optional_extra_info'
                    name='optional_extra_info'
                    value={formData.optional_extra_info}
                    onChange={handleFieldChange}
                    rows={3}
                    className='w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100'
                    placeholder='Additional optional notes (if any)...'
                  />
                  <p className={`mt-1 text-xs ${optionalExtraInfoInputMethod.className}`}>
                    {optionalExtraInfoInputMethod.label}
                  </p>
                </div>
              </div>

              {errorMessage && (
                <p className='rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900'>
                  {errorMessage}
                </p>
              )}

              {issueDebugText && (
                <div className='rounded-lg border border-amber-300 bg-amber-50 px-4 py-3'>
                  <p className='text-xs font-semibold uppercase tracking-[0.08em] text-amber-900'>
                    Debug Details (Share With Support)
                  </p>
                  <pre className='mt-2 whitespace-pre-wrap break-all text-xs text-amber-900'>
                    {issueDebugText}
                  </pre>
                </div>
              )}

              {successMessage && (
                <p className='rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700'>
                  {successMessage}
                </p>
              )}

              <div className='flex flex-wrap items-center gap-3 pt-2'>
                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='inline-flex min-w-56 items-center justify-center rounded-lg bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-emerald-400'
                >
                  {isSubmitting ? 'Generating Document...' : 'Generate DOCX Report'}
                </button>

                <button
                  type='button'
                  onClick={() => {
                    setFormData(getDefaultFormData());
                    setTimelineStartBySystem({
                      Hijri: TIMELINE_DEFAULT_START.Hijri,
                      Gregorian: TIMELINE_DEFAULT_START.Gregorian,
                    });
                    setErrorMessage(null);
                    setIssueDebugText(null);
                    setSuccessMessage(null);
                  }}
                  disabled={isSubmitting}
                  className='rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60'
                >
                  Reset
                </button>
              </div>
            </fieldset>

            <a
              ref={downloadLinkRef}
              href='#'
              className='hidden'
              aria-hidden='true'
              tabIndex={-1}
            >
              Download generated Zakat report
            </a>
          </form>
        </section>
        </div>
      </main>
    </div>
  );
}
