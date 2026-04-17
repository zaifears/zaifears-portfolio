import fs from 'fs';
import path from 'path';

import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import { NextResponse } from 'next/server';

import { normalizeUserText } from '../../../lib/banglaInput';
import { autoConvertBijoyAnsiToUnicode } from '../../../lib/banglaServer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const REQUIRED_FIELDS = [
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
  'optional_extra_info',
] as const;

const OPTIONAL_FIELDS = ['optional_extra_info'] as const;
const OPTIONAL_EXTRA_INFO_FLAG = 'include_optional_extra_info';
const OPTIONAL_EXTRA_INFO_LABEL_TAG = 'আরো উল্লেখ্য যে,';
const OPTIONAL_EXTRA_INFO_LABEL_TEXT = 'আরো উল্লেখ্য যে,';
const TYPE_FIELD = 'type';
const TYPE_PERSONAL_VALUE = 'Personal';
const TYPE_INSTITUTION_VALUE = 'Institution';
const TYPE_PERSONAL_TEMPLATE_TEXT = 'যার';
const TYPE_INSTITUTION_TEMPLATE_TEXT = 'যাদের';

const TIMELINE_PATTERN = /^(\d{4})\s*-\s*(\d{2,4})$/;
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const JAKAT_RATE_PATTERN = /^\d{1,2}(?:\.\d{1,3})?%$/;
const MAX_FIELD_LENGTH = 5000;
const MAX_REQUEST_BYTES = 64 * 1024;
const TEMPLATE_PATH = path.join(
  process.cwd(),
  'public/template/Zakat_Report_Professional.docx',
);
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
  "Dhu al-Qi\'dah",
  'Dhu al-Hijjah',
] as const;
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

let templateBufferCache: Buffer | null = null;
let templateReadErrorLogged = false;

const generateDebugCode = (): string =>
  `ZR-${Date.now().toString(36).toUpperCase()}-${Math.random()
    .toString(36)
    .slice(2, 8)
    .toUpperCase()}`;

type TemplateField = (typeof REQUIRED_FIELDS)[number];
type ValidationField = TemplateField | typeof OPTIONAL_EXTRA_INFO_FLAG;
type ZakatReportPayload = Record<TemplateField, string>;
type ZakatReportTemplateData = ZakatReportPayload & {
  [OPTIONAL_EXTRA_INFO_LABEL_TAG]: string;
};

type ValidationResult =
  | {
      isValid: true;
      data: ZakatReportPayload;
      includeOptionalExtraInfo: boolean;
    }
  | {
      isValid: false;
      missingFields: TemplateField[];
      invalidFields: ValidationField[];
    };

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isFieldOptional = (field: TemplateField): boolean =>
  OPTIONAL_FIELDS.includes(field as (typeof OPTIONAL_FIELDS)[number]);

const parseIncludeOptionalExtraInfo = (value: unknown): boolean | null => {
  if (typeof value === 'boolean') {
    return value;
  }

  if (typeof value !== 'string') {
    return null;
  }

  const normalized = value.trim().toLowerCase();
  if (normalized === 'true') {
    return true;
  }

  if (normalized === 'false' || normalized.length === 0) {
    return false;
  }

  return null;
};

const parseReportType = (value: string): string | null => {
  const normalized = value.trim().toLowerCase();

  if (normalized === TYPE_PERSONAL_VALUE.toLowerCase()) {
    return TYPE_PERSONAL_VALUE;
  }

  if (normalized === TYPE_INSTITUTION_VALUE.toLowerCase()) {
    return TYPE_INSTITUTION_VALUE;
  }

  return null;
};

const isValidTimeline = (timeline: string, yearSystem: string): boolean => {
  const match = timeline.match(TIMELINE_PATTERN);
  if (!match) {
    return false;
  }

  const startYear = Number(match[1]);
  const endYear = Number(match[2]);

  if (!Number.isFinite(startYear) || !Number.isFinite(endYear)) {
    return false;
  }

  if (yearSystem === 'Gregorian') {
    return endYear === startYear + 1 || endYear === (startYear + 1) % 100;
  }

  if (yearSystem === 'Hijri') {
    return endYear === startYear + 1;
  }

  return false;
};

const isValidDateString = (dateValue: string): boolean => {
  if (!ISO_DATE_PATTERN.test(dateValue)) {
    return false;
  }

  const parsed = new Date(`${dateValue}T00:00:00.000Z`);
  if (Number.isNaN(parsed.getTime())) {
    return false;
  }

  return parsed.toISOString().slice(0, 10) === dateValue;
};

const isValidMonthForYearSystem = (month: string, yearSystem: string): boolean => {
  if (yearSystem === 'Hijri') {
    return HIJRI_MONTHS.includes(month as (typeof HIJRI_MONTHS)[number]);
  }

  if (yearSystem === 'Gregorian') {
    return GREGORIAN_MONTHS.includes(month as (typeof GREGORIAN_MONTHS)[number]);
  }

  return false;
};

const getTemplateBuffer = async (): Promise<Buffer> => {
  if (templateBufferCache) {
    return templateBufferCache;
  }

  try {
    templateBufferCache = await fs.promises.readFile(TEMPLATE_PATH);
    templateReadErrorLogged = false;
    return templateBufferCache;
  } catch (error) {
    if (!templateReadErrorLogged) {
      templateReadErrorLogged = true;
      console.error('[generate-zakat-report] Failed to load DOCX template:', error);
    }
    throw error;
  }
};

const validatePayload = (
  payload: unknown,
): ValidationResult => {
  if (!isRecord(payload)) {
    return {
      isValid: false,
      missingFields: [...REQUIRED_FIELDS],
      invalidFields: [],
    };
  }

  const missingFields: TemplateField[] = [];
  const invalidFields: ValidationField[] = [];
  const data = {} as ZakatReportPayload;

  for (const field of REQUIRED_FIELDS) {
    const value = payload[field];
    if (typeof value !== 'string') {
      missingFields.push(field);
      continue;
    }

    const normalized = autoConvertBijoyAnsiToUnicode(normalizeUserText(value));
    if (!isFieldOptional(field) && normalized.length === 0) {
      missingFields.push(field);
      continue;
    }

    if (normalized.length > MAX_FIELD_LENGTH) {
      invalidFields.push(field);
      continue;
    }

    data[field] = normalized;
  }

  if (!missingFields.includes('year')) {
    if (data.year !== 'Hijri' && data.year !== 'Gregorian') {
      invalidFields.push('year');
    }
  }

  if (!missingFields.includes(TYPE_FIELD)) {
    const parsedReportType = parseReportType(data.type);
    if (!parsedReportType) {
      invalidFields.push(TYPE_FIELD);
    } else {
      data.type = parsedReportType;
    }
  }

  if (!missingFields.includes('date') && !isValidDateString(data.date)) {
    invalidFields.push('date');
  }

  if (
    !missingFields.includes('timeline') &&
    !missingFields.includes('year') &&
    !isValidTimeline(data.timeline, data.year)
  ) {
    invalidFields.push('timeline');
  }

  if (
    !missingFields.includes('month') &&
    !missingFields.includes('year') &&
    !isValidMonthForYearSystem(data.month, data.year)
  ) {
    invalidFields.push('month');
  }

  if (!missingFields.includes('jakat_rate') && !JAKAT_RATE_PATTERN.test(data.jakat_rate)) {
    invalidFields.push('jakat_rate');
  }

  let includeOptionalExtraInfo = false;
  if (payload[OPTIONAL_EXTRA_INFO_FLAG] === undefined) {
    includeOptionalExtraInfo = data.optional_extra_info.trim().length > 0;
  } else {
    const parsedIncludeOptionalExtraInfo = parseIncludeOptionalExtraInfo(
      payload[OPTIONAL_EXTRA_INFO_FLAG],
    );

    if (parsedIncludeOptionalExtraInfo === null) {
      invalidFields.push(OPTIONAL_EXTRA_INFO_FLAG);
    } else {
      includeOptionalExtraInfo = parsedIncludeOptionalExtraInfo;
    }
  }

  if (missingFields.length > 0 || invalidFields.length > 0) {
    return { isValid: false, missingFields, invalidFields };
  }

  return { isValid: true, data, includeOptionalExtraInfo };
};

const logTemplateError = (error: unknown, debugCode?: string) => {
  if (debugCode) {
    console.error('[generate-zakat-report] Debug code:', debugCode);
  }

  if (error instanceof Error) {
    console.error('[generate-zakat-report] DOCX generation failed:', error.message);
  } else {
    console.error('[generate-zakat-report] DOCX generation failed with non-error value:', error);
  }

  if (
    typeof error === 'object' &&
    error !== null &&
    'properties' in error &&
    typeof (error as { properties?: unknown }).properties === 'object'
  ) {
    console.error(
      '[generate-zakat-report] DOCX error details:',
      JSON.stringify((error as { properties?: unknown }).properties),
    );
  }
};

const sanitizeFileNameSegment = (value: string, fallback: string): string => {
  const sanitized = value
    .replace(/[\\/:*?"<>|\u0000-\u001F]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  return sanitized.length > 0 ? sanitized : fallback;
};

const sanitizeAsciiFileNameSegment = (value: string, fallback: string): string => {
  const unicodeSafe = sanitizeFileNameSegment(value, fallback);
  const asciiSafe = unicodeSafe
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\x20-\x7E]/g, '')
    .trim();

  return asciiSafe.length > 0 ? asciiSafe : fallback;
};

export async function POST(request: Request) {
  let payload: unknown;

  const contentLengthHeader = request.headers.get('content-length');
  const contentLength = contentLengthHeader ? Number(contentLengthHeader) : null;
  if (contentLength !== null && Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BYTES) {
    const debugCode = generateDebugCode();
    console.error('[generate-zakat-report] Payload too large:', {
      debugCode,
      contentLength,
      maxAllowedBytes: MAX_REQUEST_BYTES,
    });

    return NextResponse.json(
      { error: 'Payload too large.', debugCode },
      {
        status: 413,
        headers: {
          'X-Debug-Code': debugCode,
        },
      },
    );
  }

  try {
    payload = await request.json();
  } catch (error) {
    const debugCode = generateDebugCode();
    console.error('[generate-zakat-report] Invalid JSON payload:', {
      debugCode,
      error,
    });

    return NextResponse.json(
      { error: 'Invalid JSON payload.', debugCode },
      {
        status: 400,
        headers: {
          'X-Debug-Code': debugCode,
        },
      },
    );
  }

  const validation = validatePayload(payload);
  if (!validation.isValid) {
    const debugCode = generateDebugCode();
    console.error('[generate-zakat-report] Invalid payload:', {
      debugCode,
      missingFields: validation.missingFields,
      invalidFields: validation.invalidFields,
    });

    return NextResponse.json(
      {
        error: 'Missing or invalid required fields.',
        debugCode,
        missingFields: validation.missingFields,
        invalidFields: validation.invalidFields,
      },
      {
        status: 400,
        headers: {
          'X-Debug-Code': debugCode,
        },
      },
    );
  }

  try {
    const templateBuffer = await getTemplateBuffer();
    const zip = new PizZip(templateBuffer);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    const renderData: ZakatReportTemplateData = {
      ...validation.data,
      type:
        validation.data.type === TYPE_INSTITUTION_VALUE
          ? TYPE_INSTITUTION_TEMPLATE_TEXT
          : TYPE_PERSONAL_TEMPLATE_TEXT,
      optional_extra_info: validation.includeOptionalExtraInfo
        ? validation.data.optional_extra_info
        : '',
      [OPTIONAL_EXTRA_INFO_LABEL_TAG]: validation.includeOptionalExtraInfo
        ? OPTIONAL_EXTRA_INFO_LABEL_TEXT
        : '',
    };

    doc.render(renderData);

    const generatedDocument = doc.getZip().generate({
      type: 'nodebuffer',
      compression: 'DEFLATE',
    });
    const responseBody = new Uint8Array(generatedDocument);
    const safeYear = sanitizeFileNameSegment(validation.data.year, 'Year');
    const safeClientName = sanitizeFileNameSegment(
      validation.data.client_name,
      'Client Name',
    );
    const unicodeFileName = `Zakat Calculation Report_${safeYear}_${safeClientName}.docx`;
    const asciiFileName = `Zakat Calculation Report_${sanitizeAsciiFileNameSegment(
      validation.data.year,
      'Year',
    )}_${sanitizeAsciiFileNameSegment(validation.data.client_name, 'Client Name')}.docx`;
    const encodedFileName = encodeURIComponent(unicodeFileName);

    return new NextResponse(responseBody, {
      status: 200,
      headers: {
        'Content-Type':
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Cache-Control': 'private, no-store, max-age=0',
        'X-Content-Type-Options': 'nosniff',
        // Keep ASCII in filename= for broad HTTP compatibility, while filename*= preserves full UTF-8.
        'Content-Disposition': `attachment; filename="${asciiFileName}"; filename*=UTF-8''${encodedFileName}`,
      },
    });
  } catch (error) {
    const debugCode = generateDebugCode();
    logTemplateError(error, debugCode);

    return NextResponse.json(
      { error: 'Failed to generate Zakat report document.', debugCode },
      {
        status: 500,
        headers: {
          'X-Debug-Code': debugCode,
        },
      },
    );
  }
}