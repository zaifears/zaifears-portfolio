'use client';

import Image from 'next/image';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { QuickCalculator } from '../components/QuickCalculator';

import { detectBanglaInputMethod } from '../../lib/banglaInput';

type ZakatReportFormData = {
  timeline: string;
  year: string;
  type: string;
  date: string;
  month: string;
  client_name: string;
  jakatable_asset: string;
  jakat_rate: string;
  net_jakat: string;
  extra_info: string;
  optional_extra_info: string;
};

type GenerateZakatReportPayload = ZakatReportFormData & {
  include_optional_extra_info: boolean;
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
    type: 'Personal',
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
      className: 'text-emerald-700 dark:text-emerald-400',
    };
  }

  if (method === 'bijoy-ansi') {
    return {
      label: 'Input method: Bijoy ANSI (will auto-convert to Unicode)',
      className: 'text-amber-700 dark:text-amber-400',
    };
  }

  return {
    label: 'Input method: Neutral/English text',
    className: 'text-zinc-500 dark:text-zinc-400',
  };
};

const validateFormDataBeforeSubmit = (formData: ZakatReportFormData): string | null => {
  const requiredFields: Array<keyof ZakatReportFormData> = [
    'timeline',
    'year',
    'type',
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

  if (formData.type !== 'Personal' && formData.type !== 'Institution') {
    return 'Please select a valid Type.';
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
  const [includeOptionalExtraInfo, setIncludeOptionalExtraInfo] = useState(false);
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
      const payload: GenerateZakatReportPayload = {
        ...formData,
        timeline: formData.timeline.trim(),
        year: formData.year.trim(),
        type: formData.type.trim(),
        date: formData.date.trim(),
        month: formData.month.trim(),
        client_name: formData.client_name.trim(),
        jakatable_asset: formData.jakatable_asset.trim(),
        jakat_rate: formData.jakat_rate.trim(),
        net_jakat: formData.net_jakat.trim(),
        extra_info: formData.extra_info.trim(),
        optional_extra_info: includeOptionalExtraInfo ? formData.optional_extra_info.trim() : '',
        include_optional_extra_info: includeOptionalExtraInfo,
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
    <div className='min-h-screen bg-[#F8FAF9] dark:bg-[#0B0F0D] text-zinc-900 dark:text-zinc-100 transition-colors pb-16'>
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
                  Zakat Report Generator
                </h1>
                <span className='hidden sm:inline-flex rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-400'>
                  Docx Template
                </span>
              </div>
            </div>

            <div className='flex items-center gap-3'>
              <QuickCalculator />
            </div>
          </div>
        </div>
      </nav>

      <main className='px-4 py-8 sm:px-6 lg:px-8'>
        <div className='mx-auto max-w-4xl'>
          <section className='rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 shadow-xs transition-colors'>
            <div className='border-b border-zinc-100 dark:border-zinc-800/80 px-6 py-6 sm:px-8'>
              <h2 className='text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100'>
                Generate Professional Zakat Report
              </h2>
              <p className='mt-1 text-sm text-zinc-600 dark:text-zinc-400'>
                Populates the approved IFA Consultancy Word (.docx) document template with validated audit data.
              </p>
              <p className='mt-2.5 text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5'>
                <svg className='h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
                Bangla input is supported in both Avro Unicode and Bijoy ANSI (auto-converted to Unicode).
              </p>
            </div>

            <form onSubmit={handleSubmit} className='px-6 py-6 sm:px-8'>
              <fieldset disabled={isSubmitting} className='space-y-6 disabled:opacity-70'>
                <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
                  <div>
                    <label htmlFor='timeline' className='mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400'>
                      Timeline
                    </label>
                    <div className='flex h-10 items-center gap-2'>
                      <button
                        type='button'
                        onClick={() => adjustTimelineBy(-1)}
                        className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/80 text-base font-bold text-zinc-700 dark:text-zinc-200 transition-all hover:bg-white dark:hover:bg-zinc-700 active:scale-95'
                        aria-label='Decrease timeline by one year'
                      >
                        −
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
                        className='h-10 flex-1 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 text-center text-sm font-bold font-mono text-zinc-900 dark:text-zinc-100 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15 dark:focus:border-emerald-500'
                      />
                      <button
                        type='button'
                        onClick={() => adjustTimelineBy(1)}
                        className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/80 text-base font-bold text-zinc-700 dark:text-zinc-200 transition-all hover:bg-white dark:hover:bg-zinc-700 active:scale-95'
                        aria-label='Increase timeline by one year'
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div>
                    <label htmlFor='year' className='mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400'>
                      Year System
                    </label>
                    <select
                      id='year'
                      name='year'
                      value={formData.year}
                      onChange={handleYearSystemChange}
                      required
                      className='h-10 w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3.5 text-sm font-medium text-zinc-900 dark:text-zinc-100 outline-none transition hover:border-zinc-400 dark:hover:border-zinc-600 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15 dark:focus:border-emerald-500'
                    >
                      <option value='Hijri'>Hijri (Lunar)</option>
                      <option value='Gregorian'>Gregorian (Solar)</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor='type' className='mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400'>
                      Report Type
                    </label>
                    <select
                      id='type'
                      name='type'
                      value={formData.type}
                      onChange={(event) => {
                        const { name, value } = event.target;
                        setFormData((prev) => ({ ...prev, [name]: value }));
                      }}
                      required
                      className='h-10 w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3.5 text-sm font-medium text-zinc-900 dark:text-zinc-100 outline-none transition hover:border-zinc-400 dark:hover:border-zinc-600 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15 dark:focus:border-emerald-500'
                    >
                      <option value='Personal'>Personal / Individual</option>
                      <option value='Institution'>Institution / Corporate</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor='date' className='mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400'>
                      Report Date
                    </label>
                    <input
                      id='date'
                      name='date'
                      type='date'
                      value={formData.date}
                      onChange={handleFieldChange}
                      required
                      className='h-10 w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3.5 text-sm font-medium text-zinc-900 dark:text-zinc-100 outline-none transition hover:border-zinc-400 dark:hover:border-zinc-600 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15 dark:focus:border-emerald-500'
                    />
                  </div>

                  <div>
                    <label htmlFor='month' className='mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400'>
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
                      className='h-10 w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3.5 text-sm font-medium text-zinc-900 dark:text-zinc-100 outline-none transition hover:border-zinc-400 dark:hover:border-zinc-600 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15 dark:focus:border-emerald-500'
                    >
                      {monthsForSelectedYear.map((monthOption) => (
                        <option key={`${selectedYearSystem}-${monthOption}`} value={monthOption}>
                          {monthOption}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor='client_name' className='mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400'>
                      Client Name
                    </label>
                    <input
                      id='client_name'
                      name='client_name'
                      value={formData.client_name}
                      onChange={handleFieldChange}
                      required
                      className='h-10 w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3.5 text-sm text-zinc-900 dark:text-zinc-100 outline-none transition hover:border-zinc-400 dark:hover:border-zinc-600 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15 dark:focus:border-emerald-500'
                      placeholder='Client full name'
                    />
                    <p className={`mt-1 text-xs font-medium ${clientNameInputMethod.className}`}>
                      {clientNameInputMethod.label}
                    </p>
                  </div>

                  <div>
                    <label htmlFor='jakatable_asset' className='mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400'>
                      Jakatable Asset (BDT)
                    </label>
                    <input
                      id='jakatable_asset'
                      name='jakatable_asset'
                      value={formData.jakatable_asset}
                      onChange={handleFieldChange}
                      onFocus={() => clearNumericDefaultOnFocus('jakatable_asset')}
                      onBlur={() => formatNumericFieldOnBlur('jakatable_asset')}
                      required
                      className='h-10 w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3.5 text-sm font-mono text-zinc-900 dark:text-zinc-100 outline-none transition hover:border-zinc-400 dark:hover:border-zinc-600 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15 dark:focus:border-emerald-500 [font-variant-numeric:tabular-nums]'
                      placeholder='e.g. 1,250,000.00 BDT'
                    />
                    <div className='mt-1.5 flex items-center gap-1.5'>
                      <span
                        className={`inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                          jakatableAssetValidation.isValid
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : 'text-rose-600 dark:text-rose-400'
                        }`}
                        aria-hidden='true'
                      >
                        {jakatableAssetValidation.isValid ? (
                          <svg viewBox='0 0 20 20' fill='currentColor' className='h-4 w-4'>
                            <path
                              fillRule='evenodd'
                              d='M16.704 5.29a1 1 0 010 1.42l-7.2 7.2a1 1 0 01-1.415 0l-3-3a1 1 0 111.415-1.42l2.293 2.294 6.493-6.494a1 1 0 011.414 0z'
                              clipRule='evenodd'
                            />
                          </svg>
                        ) : (
                          <svg viewBox='0 0 20 20' fill='currentColor' className='h-4 w-4'>
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
                          jakatableAssetValidation.isValid
                            ? 'text-emerald-700 dark:text-emerald-400'
                            : 'text-rose-700 dark:text-rose-400'
                        }`}
                      >
                        {jakatableAssetValidation.helperText}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label htmlFor='jakat_rate' className='mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400'>
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
                      className='h-10 w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3.5 text-sm font-semibold text-zinc-900 dark:text-zinc-100 outline-none transition hover:border-zinc-400 dark:hover:border-zinc-600 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15 dark:focus:border-emerald-500'
                    >
                      <option value='2.5%'>2.5% (Hijri standard)</option>
                      <option value='2.577%'>2.577% (Gregorian adjusted)</option>
                      <option value='2.6%'>2.6% (Commercial standard)</option>
                    </select>
                  </div>

                  <div className='md:col-span-2'>
                    <label htmlFor='net_jakat' className='mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400'>
                      Net Jakat Payable (BDT)
                    </label>
                    <input
                      id='net_jakat'
                      name='net_jakat'
                      value={formData.net_jakat}
                      onChange={handleFieldChange}
                      onFocus={() => clearNumericDefaultOnFocus('net_jakat')}
                      onBlur={() => formatNumericFieldOnBlur('net_jakat')}
                      required
                      className='h-10 w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3.5 text-sm font-mono font-bold text-emerald-700 dark:text-emerald-400 outline-none transition hover:border-zinc-400 dark:hover:border-zinc-600 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15 dark:focus:border-emerald-500 [font-variant-numeric:tabular-nums]'
                      placeholder='e.g. 32,212.50 BDT'
                    />
                    <div className='mt-1.5 flex items-center gap-1.5'>
                      <span
                        className={`inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                          netJakatValidation.isValid
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : 'text-rose-600 dark:text-rose-400'
                        }`}
                        aria-hidden='true'
                      >
                        {netJakatValidation.isValid ? (
                          <svg viewBox='0 0 20 20' fill='currentColor' className='h-4 w-4'>
                            <path
                              fillRule='evenodd'
                              d='M16.704 5.29a1 1 0 010 1.42l-7.2 7.2a1 1 0 01-1.415 0l-3-3a1 1 0 111.415-1.42l2.293 2.294 6.493-6.494a1 1 0 011.414 0z'
                              clipRule='evenodd'
                            />
                          </svg>
                        ) : (
                          <svg viewBox='0 0 20 20' fill='currentColor' className='h-4 w-4'>
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
                          netJakatValidation.isValid
                            ? 'text-emerald-700 dark:text-emerald-400'
                            : 'text-rose-700 dark:text-rose-400'
                        }`}
                      >
                        {netJakatValidation.helperText}
                      </p>
                    </div>
                  </div>
                </div>

                <div className='grid grid-cols-1 gap-5'>
                  <div>
                    <label htmlFor='extra_info' className='mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400'>
                      Primary Notes & Remarks
                    </label>
                    <textarea
                      id='extra_info'
                      name='extra_info'
                      value={formData.extra_info}
                      onChange={handleFieldChange}
                      required
                      rows={4}
                      className='w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 outline-none transition hover:border-zinc-400 dark:hover:border-zinc-600 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15 dark:focus:border-emerald-500'
                      placeholder='Any primary notes to include in the report...'
                    />
                    <p className={`mt-1 text-xs font-medium ${extraInfoInputMethod.className}`}>
                      {extraInfoInputMethod.label}
                    </p>
                  </div>

                  <div className='rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-850/40 p-4 space-y-3'>
                    <label className='flex items-center gap-3 cursor-pointer select-none'>
                      <input
                        type='checkbox'
                        checked={includeOptionalExtraInfo}
                        onChange={(event) => {
                          setIncludeOptionalExtraInfo(event.target.checked);
                        }}
                        className='h-4 w-4 rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500/30'
                      />
                      <span className='text-sm font-bold text-zinc-800 dark:text-zinc-200'>
                        Include Optional Extra Information in DOCX (আরো উল্লেখ্য যে,)
                      </span>
                    </label>

                    {includeOptionalExtraInfo && (
                      <div className='pt-2'>
                        <textarea
                          id='optional_extra_info'
                          name='optional_extra_info'
                          value={formData.optional_extra_info}
                          onChange={handleFieldChange}
                          rows={3}
                          className='w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15 dark:focus:border-emerald-500'
                          placeholder='Additional optional notes (if any)...'
                        />
                        <p className={`mt-1 text-xs font-medium ${optionalExtraInfoInputMethod.className}`}>
                          {optionalExtraInfoInputMethod.label}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {errorMessage && (
                  <div className='rounded-2xl border border-amber-300/80 dark:border-amber-700/60 bg-amber-50 dark:bg-amber-950/40 p-4 sm:p-5 shadow-xs'>
                    <p className='text-sm font-bold text-amber-900 dark:text-amber-200 mb-1'>Generation Issue</p>
                    <p className='text-sm text-amber-900/90 dark:text-amber-200/90'>{errorMessage}</p>
                  </div>
                )}

                {issueDebugText && (
                  <div className='rounded-2xl border border-amber-200 dark:border-amber-800 bg-white/60 dark:bg-black/30 p-4'>
                    <p className='text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300'>
                      Debug Details (Share With Support)
                    </p>
                    <pre className='mt-2 whitespace-pre-wrap break-all text-xs font-mono text-amber-950 dark:text-amber-200'>
                      {issueDebugText}
                    </pre>
                  </div>
                )}

                {successMessage && (
                  <div className='rounded-2xl border border-emerald-300/80 dark:border-emerald-700/60 bg-emerald-50 dark:bg-emerald-950/40 p-4 sm:p-5 shadow-xs'>
                    <p className='text-sm font-bold text-emerald-900 dark:text-emerald-200 mb-1'>Success</p>
                    <p className='text-sm text-emerald-800 dark:text-emerald-300'>{successMessage}</p>
                  </div>
                )}

                <div className='flex flex-wrap items-center gap-3 pt-3 border-t border-zinc-100 dark:border-zinc-800'>
                  <button
                    type='submit'
                    disabled={isSubmitting}
                    className='inline-flex min-w-56 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-7 py-3 text-sm font-bold text-white shadow-xs transition-all hover:bg-emerald-500 hover:shadow-md hover:-translate-y-px active:translate-y-0 active:scale-98 disabled:pointer-events-none disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50'
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Generating Document...</span>
                      </>
                    ) : (
                      <>
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span>Generate DOCX Report</span>
                      </>
                    )}
                  </button>

                  <button
                    type='button'
                    onClick={() => {
                      setFormData(getDefaultFormData());
                      setTimelineStartBySystem({
                        Hijri: TIMELINE_DEFAULT_START.Hijri,
                        Gregorian: TIMELINE_DEFAULT_START.Gregorian,
                      });
                      setIncludeOptionalExtraInfo(false);
                      setErrorMessage(null);
                      setIssueDebugText(null);
                      setSuccessMessage(null);
                    }}
                    disabled={isSubmitting}
                    className='rounded-xl border border-zinc-300 dark:border-zinc-700 px-6 py-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300 transition hover:bg-zinc-100 dark:hover:bg-zinc-800 active:scale-98 disabled:opacity-60'
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

