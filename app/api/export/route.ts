import { NextResponse } from 'next/server';
import ExcelJS from 'exceljs';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type LineItem = {
  id: string;
  label: string;
  description?: string;
  amount: number;
  amountStatus?: 'valid' | 'invalid' | null;
};

type ExportPayload = {
  businessInfo: {
    name: string;
    address: string;
    email: string;
    calendarType?: 'gregorian' | 'hijri';
    clientType?: 'institution' | 'person';
    zakatYear: string;
  };
  assets: LineItem[];
  liabilities: LineItem[];
};

type ValidationIssue = {
  field: string;
  reason: string;
};

type NormalizedLineItem = {
  label: string;
  description: string;
  amount: number;
};

type ValidationResult =
  | {
      isValid: true;
      data: {
        businessInfo: ExportPayload['businessInfo'];
        assets: NormalizedLineItem[];
        liabilities: NormalizedLineItem[];
      };
    }
  | {
      isValid: false;
      issues: ValidationIssue[];
    };

const MAX_REQUEST_BYTES = 64 * 1024;
const MAX_TEXT_LENGTH = 500;
const MAX_LINE_ITEMS = 100;
const ALLOWED_CALENDAR_TYPES = ['gregorian', 'hijri'] as const;
const ALLOWED_CLIENT_TYPES = ['institution', 'person'] as const;

const generateDebugCode = (): string =>
  `ZE-${Date.now().toString(36).toUpperCase()}-${Math.random()
    .toString(36)
    .slice(2, 8)
    .toUpperCase()}`;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const validateAndNormalizeText = (
  value: unknown,
  field: string,
  issues: ValidationIssue[],
  options?: { allowEmpty?: boolean; maxLength?: number },
): string => {
  const allowEmpty = options?.allowEmpty ?? true;
  const maxLength = options?.maxLength ?? MAX_TEXT_LENGTH;

  if (typeof value !== 'string') {
    issues.push({ field, reason: 'must be a string' });
    return '';
  }

  const normalized = value.trim();
  if (!allowEmpty && normalized.length === 0) {
    issues.push({ field, reason: 'is required' });
    return '';
  }

  if (normalized.length > maxLength) {
    issues.push({ field, reason: `must be at most ${maxLength} characters` });
    return '';
  }

  return normalized;
};

const validateLineItem = (
  row: unknown,
  index: number,
  group: 'assets' | 'liabilities',
  issues: ValidationIssue[],
): NormalizedLineItem | null => {
  if (!isRecord(row)) {
    issues.push({
      field: `${group}[${index}]`,
      reason: 'must be an object',
    });
    return null;
  }

  if (row.amountStatus === 'invalid') {
    issues.push({
      field: `${group}[${index}].amount`,
      reason: 'is invalid',
    });
  }

  const label = validateAndNormalizeText(
    row.label,
    `${group}[${index}].label`,
    issues,
    { allowEmpty: true },
  );
  const description = validateAndNormalizeText(
    row.description ?? '',
    `${group}[${index}].description`,
    issues,
    { allowEmpty: true },
  );

  if (typeof row.amount !== 'number' || !Number.isFinite(row.amount)) {
    issues.push({
      field: `${group}[${index}].amount`,
      reason: 'must be a finite number',
    });
    return null;
  }

  return {
    label,
    description,
    amount: row.amount,
  };
};

const validatePayload = (payload: unknown): ValidationResult => {
  const issues: ValidationIssue[] = [];

  if (!isRecord(payload)) {
    return {
      isValid: false,
      issues: [{ field: 'payload', reason: 'must be a JSON object' }],
    };
  }

  if (!isRecord(payload.businessInfo)) {
    issues.push({ field: 'businessInfo', reason: 'must be an object' });
  }

  if (!Array.isArray(payload.assets)) {
    issues.push({ field: 'assets', reason: 'must be an array' });
  }

  if (!Array.isArray(payload.liabilities)) {
    issues.push({ field: 'liabilities', reason: 'must be an array' });
  }

  if (issues.length > 0) {
    return { isValid: false, issues };
  }

  const businessInfoRecord = payload.businessInfo as Record<string, unknown>;
  const assetsInput = payload.assets as unknown[];
  const liabilitiesInput = payload.liabilities as unknown[];

  if (assetsInput.length > MAX_LINE_ITEMS) {
    issues.push({
      field: 'assets',
      reason: `must contain at most ${MAX_LINE_ITEMS} rows`,
    });
  }

  if (liabilitiesInput.length > MAX_LINE_ITEMS) {
    issues.push({
      field: 'liabilities',
      reason: `must contain at most ${MAX_LINE_ITEMS} rows`,
    });
  }

  const name = validateAndNormalizeText(
    businessInfoRecord.name,
    'businessInfo.name',
    issues,
    { allowEmpty: true },
  );
  const address = validateAndNormalizeText(
    businessInfoRecord.address,
    'businessInfo.address',
    issues,
    { allowEmpty: true },
  );
  const email = validateAndNormalizeText(
    businessInfoRecord.email,
    'businessInfo.email',
    issues,
    { allowEmpty: true },
  );
  const zakatYear = validateAndNormalizeText(
    businessInfoRecord.zakatYear,
    'businessInfo.zakatYear',
    issues,
    { allowEmpty: true },
  );

  const calendarTypeRaw = businessInfoRecord.calendarType;
  const calendarType =
    typeof calendarTypeRaw === 'string' ? calendarTypeRaw.toLowerCase() : 'hijri';
  if (!ALLOWED_CALENDAR_TYPES.includes(calendarType as (typeof ALLOWED_CALENDAR_TYPES)[number])) {
    issues.push({
      field: 'businessInfo.calendarType',
      reason: 'must be gregorian or hijri',
    });
  }

  const clientTypeRaw = businessInfoRecord.clientType;
  const clientType =
    typeof clientTypeRaw === 'string' ? clientTypeRaw.toLowerCase() : 'institution';
  if (!ALLOWED_CLIENT_TYPES.includes(clientType as (typeof ALLOWED_CLIENT_TYPES)[number])) {
    issues.push({
      field: 'businessInfo.clientType',
      reason: 'must be institution or person',
    });
  }

  const assets: NormalizedLineItem[] = [];
  const liabilities: NormalizedLineItem[] = [];

  assetsInput.forEach((row, index) => {
    const parsed = validateLineItem(row, index, 'assets', issues);
    if (parsed) {
      assets.push(parsed);
    }
  });

  liabilitiesInput.forEach((row, index) => {
    const parsed = validateLineItem(row, index, 'liabilities', issues);
    if (parsed) {
      liabilities.push(parsed);
    }
  });

  if (issues.length > 0) {
    return { isValid: false, issues };
  }

  return {
    isValid: true,
    data: {
      businessInfo: {
        name,
        address,
        email,
        zakatYear,
        calendarType: calendarType as ExportPayload['businessInfo']['calendarType'],
        clientType: clientType as ExportPayload['businessInfo']['clientType'],
      },
      assets,
      liabilities,
    },
  };
};

const sanitizeFileNameSegment = (value: string, fallback: string): string => {
  const normalized = value
    .replace(/[\\/:*?"<>|\u0000-\u001F]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  return normalized.length > 0 ? normalized : fallback;
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

const stylePresets = {
  title: {
    font: {
      name: 'Aptos Display',
      bold: true,
      size: 18,
      color: { argb: 'FF068C44' },
    },
    alignment: { horizontal: 'center', vertical: 'middle', wrapText: true },
  } satisfies Partial<ExcelJS.Style>,
  header: {
    font: {
      name: 'Aptos Display',
      bold: true,
      size: 13,
      color: { argb: 'FFFFFFFF' },
    },
    fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF068C44' } },
    alignment: { horizontal: 'left', vertical: 'middle', wrapText: true },
    border: { bottom: { style: 'thin', color: { argb: 'FF636467' } } },
  } satisfies Partial<ExcelJS.Style>,
  subheader: {
    font: {
      name: 'Aptos Display',
      bold: true,
      size: 11,
      color: { argb: 'FFFFFFFF' },
    },
    fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF636467' } },
    alignment: { horizontal: 'left', vertical: 'middle' },
    border: { bottom: { style: 'thin', color: { argb: 'FF636467' } } },
  } satisfies Partial<ExcelJS.Style>,
  data: {
    font: { name: 'Aptos Display', size: 10, color: { argb: 'FF1F2937' } },
    alignment: { horizontal: 'left', vertical: 'middle' },
    border: { bottom: { style: 'thin', color: { argb: 'FFD1D5DB' } } },
  } satisfies Partial<ExcelJS.Style>,
  amount: {
    font: { name: 'Aptos Display', size: 10, color: { argb: 'FF1F2937' } },
    alignment: { horizontal: 'right', vertical: 'middle' },
    border: { bottom: { style: 'thin', color: { argb: 'FFD1D5DB' } } },
    numFmt: '#,##0.00',
  } satisfies Partial<ExcelJS.Style>,
  total: {
    font: {
      name: 'Aptos Display',
      bold: true,
      size: 11,
      color: { argb: 'FF068C44' },
    },
    fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE6F4EC' } },
    alignment: { horizontal: 'left', vertical: 'middle' },
    border: {
      top: { style: 'medium', color: { argb: 'FF068C44' } },
      bottom: { style: 'medium', color: { argb: 'FF068C44' } },
    },
    numFmt: '#,##0.00',
  } satisfies Partial<ExcelJS.Style>,
  result: {
    font: {
      name: 'Aptos Display',
      bold: true,
      size: 11,
      color: { argb: 'FF1F2937' },
    },
    fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF3F4F6' } },
    alignment: { horizontal: 'left', vertical: 'middle' },
    border: {
      top: { style: 'thin', color: { argb: 'FF636467' } },
      bottom: { style: 'thin', color: { argb: 'FF636467' } },
    },
    numFmt: '#,##0.00',
  } satisfies Partial<ExcelJS.Style>,
};

export async function POST(req: Request) {
  const contentLengthHeader = req.headers.get('content-length');
  const contentLength = contentLengthHeader ? Number(contentLengthHeader) : null;

  if (contentLength !== null && Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BYTES) {
    const debugCode = generateDebugCode();
    return NextResponse.json(
      {
        error: 'Payload too large.',
        debugCode,
      },
      {
        status: 413,
        headers: {
          'X-Debug-Code': debugCode,
        },
      },
    );
  }

  let payload: unknown;

  try {
    payload = await req.json();
  } catch {
    const debugCode = generateDebugCode();
    return NextResponse.json(
      {
        error: 'Invalid JSON payload.',
        debugCode,
      },
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
    return NextResponse.json(
      {
        error: 'Invalid export payload.',
        debugCode,
        invalidFields: validation.issues,
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
    const { businessInfo, assets, liabilities } = validation.data;

    const totalAssets = assets.reduce((sum, row) => sum + row.amount, 0);
    const totalDebt = liabilities.reduce((sum, row) => sum + row.amount, 0);
    const net = totalAssets - totalDebt;
    const clientTypeLabel = businessInfo.clientType === 'person' ? 'Individual' : 'Institution';
    const nameLabel = businessInfo.clientType === 'person' ? 'Individual Name' : 'Institution Name';
    const nameFallback = businessInfo.clientType === 'person' ? 'Individual Name' : 'Company Name';
    const displayName = businessInfo.name.trim() || nameFallback;

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Zakat Summary', {
      pageSetup: {
        orientation: 'portrait',
        fitToPage: true,
        fitToHeight: 1,
        fitToWidth: 1,
        margins: {
          left: 0.7,
          right: 0.7,
          top: 0.75,
          bottom: 0.75,
          header: 0.3,
          footer: 0.3,
        },
      },
    });

    // Merge A1:D1 for the title and leave A1 empty? Wait, it says "first row with the name A1-D1 should be merged". Let's do that.
    // Set column widths
    worksheet.columns = [
      { key: 'section', width: 15, style: { font: { name: 'Aptos Display' } } },
      { key: 'heading', width: 28, style: { font: { name: 'Aptos Display' } } },
      { key: 'amount', width: 18, numFmt: '#,##0.00', style: { font: { name: 'Aptos Display' } } },
      { key: 'description', width: 34, style: { font: { name: 'Aptos Display' } } },
      { key: 'spacer1', width: 10, style: { font: { name: 'Aptos Display' } } },
    ];

    let rowNum = 1;
    const titleRow = worksheet.addRow({
      section: `Zakat Calculation for ${displayName}`,
      heading: '',
      amount: '',
      description: '',
      spacer1: '',
    });
    const titleCell = titleRow.getCell('section');
    worksheet.mergeCells(`A${rowNum}:D${rowNum}`);
    titleCell.style = stylePresets.title;
    titleRow.height = 30;
    rowNum++;

    // Add blank row
    worksheet.addRow({});
    rowNum++;

    // Business Information Section
    const businessHeaderRow = worksheet.addRow({
      section: 'Client Information',
      heading: '',
      amount: '',
      description: '',
    });
    businessHeaderRow.eachCell((cell: ExcelJS.Cell) => {
      cell.style = stylePresets.header;
    });
    rowNum++;

    const rows = [
      { section: '', heading: nameLabel, amount: businessInfo.name, description: '' },
      { section: '', heading: 'Address', amount: businessInfo.address, description: '' },
      { section: '', heading: 'Email', amount: businessInfo.email, description: '' },
      { section: '', heading: 'Client Type', amount: clientTypeLabel, description: '' },
      {
        section: '',
        heading: 'Zakat Year',
        amount: `${businessInfo.zakatYear} (${businessInfo.calendarType === 'gregorian' ? 'Gregorian' : 'Hijri'})`,
        description: '',
      },
    ];

    for (const row of rows) {
      const addedRow = worksheet.addRow(row);
      addedRow.getCell('heading').style = stylePresets.data;
      addedRow.getCell('amount').style = stylePresets.data;
      addedRow.getCell('description').style = stylePresets.data;
      rowNum++;
    }

    // Blank row
    worksheet.addRow({});
    rowNum++;

    // Assets Section
    const assetsHeaderRow = worksheet.addRow({
      section: 'Assets',
      heading: 'Heading',
      amount: 'Amount',
      description: 'Description',
    });
    assetsHeaderRow.eachCell((cell: ExcelJS.Cell) => {
      cell.style = stylePresets.subheader;
    });
    rowNum++;

    const assetStartRow = rowNum;
    for (const asset of assets) {
      const addedRow = worksheet.addRow({
        section: '',
        heading: asset.label,
        amount: asset.amount,
        description: asset.description ?? '',
      });
      addedRow.getCell('heading').style = stylePresets.data;
      addedRow.getCell('amount').style = stylePresets.amount;
      addedRow.getCell('description').style = stylePresets.data;
      addedRow.getCell('amount').numFmt = '#,##0.00';
      rowNum++;
    }

    // Total Assets (with formula)
    const totalAssetsRow = worksheet.addRow({
      section: 'A',
      heading: 'Total Zakatable Assets',
      amount: null,
    });
    totalAssetsRow.eachCell((cell: ExcelJS.Cell) => {
      cell.style = stylePresets.total;
    });
    const totalAssetsCell = totalAssetsRow.getCell('amount');
    totalAssetsCell.style = { ...stylePresets.total, font: { name: 'Aptos Display', bold: true, size: 11, color: { argb: 'FF068C44' } } };
    if (assets.length > 0) {
      totalAssetsCell.value = {
        formula: `SUM(C${assetStartRow}:C${rowNum - 1})`,
        result: totalAssets,
      };
    } else {
      totalAssetsCell.value = totalAssets;
    }
    totalAssetsCell.numFmt = '#,##0.00';
    const totalAssetsRowNum = rowNum;
    rowNum++;

    // Blank row
    worksheet.addRow({});
    rowNum++;

    // Liabilities Section
    const liabilitiesHeaderRow = worksheet.addRow({
      section: 'Deductables',
      heading: 'Heading',
      amount: 'Amount',
      description: 'Description',
    });
    liabilitiesHeaderRow.eachCell((cell: ExcelJS.Cell) => {
      cell.style = stylePresets.subheader;
    });
    rowNum++;

    const liabilityStartRow = rowNum;
    for (const liability of liabilities) {
      const addedRow = worksheet.addRow({
        section: '',
        heading: liability.label,
        amount: liability.amount,
        description: liability.description ?? '',
      });
      addedRow.getCell('heading').style = stylePresets.data;
      addedRow.getCell('amount').style = stylePresets.amount;
      addedRow.getCell('description').style = stylePresets.data;
      addedRow.getCell('amount').numFmt = '#,##0.00';
      rowNum++;
    }

    // Total Debt (with formula)
    const totalDebtRow = worksheet.addRow({
      section: 'B',
      heading: 'Total Deducatbles',
      amount: null,
    });
    totalDebtRow.eachCell((cell: ExcelJS.Cell) => {
      cell.style = stylePresets.total;
    });
    const totalDebtCell = totalDebtRow.getCell('amount');
    totalDebtCell.style = { ...stylePresets.total, font: { name: 'Aptos Display', bold: true, size: 11, color: { argb: 'FF068C44' } } };
    if (liabilities.length > 0) {
      totalDebtCell.value = {
        formula: `SUM(C${liabilityStartRow}:C${rowNum - 1})`,
        result: totalDebt,
      };
    } else {
      totalDebtCell.value = totalDebt;
    }
    totalDebtCell.numFmt = '#,##0.00';
    const totalDebtRowNum = rowNum;
    rowNum++;

    // Blank row
    worksheet.addRow({});
    rowNum++;

    // Net and Zakat Results (with formulas)
    const netRow = worksheet.addRow({
      section: 'A - B',
      heading: 'Net Zakatable Asset',
      amount: null,
    });
    netRow.eachCell((cell: ExcelJS.Cell) => {
      cell.style = stylePresets.result;
    });
    const netCell = netRow.getCell('amount');
    netCell.style = { ...stylePresets.result, font: { name: 'Aptos Display', bold: true, size: 11, color: { argb: 'FF1F2937' } } };
    netCell.value = {
      formula: `C${totalAssetsRowNum}-C${totalDebtRowNum}`,
      result: net,
    };
    netCell.numFmt = '#,##0.00';
    rowNum++;

    const netRowNum = rowNum - 1;

    const zakatRates = [
      { rate: 2.5, description: '2.5% (Hijri)' },
      { rate: 2.577, description: '2.577% (Gregorian)' },
      { rate: 2.6, description: '2.6% (Mufti Taqi Uthmani)' },
    ];

    zakatRates.forEach(({ rate, description }) => {
      const zakatRow = worksheet.addRow({
        section: 'Zakat Rate',
        heading: description,
        amount: null,
      });
      zakatRow.eachCell((cell: ExcelJS.Cell) => {
        cell.style = stylePresets.total;
      });
      const zakatCell = zakatRow.getCell('amount');
      zakatCell.style = { ...stylePresets.total, font: { name: 'Aptos Display', bold: true, size: 11, color: { argb: 'FF068C44' } } };
      zakatCell.value = {
        formula: `C${netRowNum}*${rate / 100}`,
        result: net * (rate / 100),
      };
      zakatCell.numFmt = '#,##0.00';
      rowNum++;
    });

    // Add footer with generation date
    worksheet.addRow({});
    rowNum++;
    const footerRow = worksheet.addRow({
      section: '',
      heading: `Generated on ${new Date().toLocaleString()}`,
      amount: '',
    });
    footerRow.eachCell((cell: ExcelJS.Cell) => {
      cell.font = {
        name: 'Aptos Display',
        italic: true,
        size: 9,
        color: { argb: 'FF636467' },
      };
    });

    // Generate buffer
    const buffer = await workbook.xlsx.writeBuffer();
    const responseBody =
      buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer as ArrayBuffer);

    const safeClientName = sanitizeFileNameSegment(
      businessInfo.name || nameFallback,
      nameFallback,
    );
    const safeYear = sanitizeFileNameSegment(businessInfo.zakatYear || 'Year', 'Year');
    const unicodeFileName = `${safeClientName}_Zakat_Calculation_${safeYear}.xlsx`;
    const asciiFileName = `${sanitizeAsciiFileNameSegment(
      businessInfo.name || nameFallback,
      nameFallback,
    )}_Zakat_Calculation_${sanitizeAsciiFileNameSegment(
      businessInfo.zakatYear || 'Year',
      'Year',
    )}.xlsx`;
    const encodedFileName = encodeURIComponent(unicodeFileName);

    return new NextResponse(responseBody, {
      status: 200,
      headers: {
        'Content-Type':
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Cache-Control': 'private, no-store, max-age=0',
        'X-Content-Type-Options': 'nosniff',
        'Content-Disposition': `attachment; filename="${asciiFileName}"; filename*=UTF-8''${encodedFileName}`,
      },
    });
  } catch (error) {
    const debugCode = generateDebugCode();
    const message = error instanceof Error ? error.message : 'Unknown export error';
    console.error('[export] Failed to generate Excel file:', {
      debugCode,
      message,
    });

    return NextResponse.json(
      {
        error: 'Failed to generate export file.',
        debugCode,
        details: message,
      },
      {
        status: 500,
        headers: {
          'X-Debug-Code': debugCode,
        },
      },
    );
  }
}
