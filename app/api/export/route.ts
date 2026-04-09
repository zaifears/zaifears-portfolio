import { NextResponse } from 'next/server';
import ExcelJS from 'exceljs';

type LineItem = {
  id: string;
  label: string;
  description?: string;
  amount: number;
};

type ExportPayload = {
  businessInfo: {
    name: string;
    address: string;
    email: string;
    calendarType?: 'gregorian' | 'hijri';
    zakatYear: string;
  };
  assets: LineItem[];
  liabilities: LineItem[];
};

const toNumber = (value: unknown): number => {
  const num = Number(value);
  return Number.isFinite(num) ? num : 0;
};

const safeFilePart = (value: string) =>
  value
    .trim()
    .replace(/[\\/:*?"<>|]+/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/ /g, '_')
    .slice(0, 80);

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
  try {
    const payload = (await req.json()) as ExportPayload;

    const businessInfo = payload.businessInfo ?? {
      name: '',
      address: '',
      email: '',
      calendarType: 'hijri',
      zakatYear: '',
    };

    const assets = Array.isArray(payload.assets)
      ? payload.assets.map((row) => ({
          label: String(row.label ?? ''),
          description: String(row.description ?? ''),
          amount: toNumber(row.amount),
        }))
      : [];

    const liabilities = Array.isArray(payload.liabilities)
      ? payload.liabilities.map((row) => ({
          label: String(row.label ?? ''),
          description: String(row.description ?? ''),
          amount: toNumber(row.amount),
        }))
      : [];

    const totalAssets = assets.reduce((sum, row) => sum + row.amount, 0);
    const totalDebt = liabilities.reduce((sum, row) => sum + row.amount, 0);
    const net = totalAssets - totalDebt;

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
      section: `Zakat Calculation for ${businessInfo.name || 'Company Name'}`,
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
      section: 'Business Information',
      heading: '',
      amount: '',
      description: '',
    });
    businessHeaderRow.eachCell((cell: ExcelJS.Cell) => {
      cell.style = stylePresets.header;
    });
    rowNum++;

    const rows = [
      { section: '', heading: 'Company Name', amount: businessInfo.name, description: '' },
      { section: '', heading: 'Address', amount: businessInfo.address, description: '' },
      { section: '', heading: 'Email', amount: businessInfo.email, description: '' },
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
      { rate: 2.6, description: '2.6% (Gregorian + Safe)' },
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

    const companyNamePart = safeFilePart(businessInfo.name || 'Company_Name');
    const yearPart = safeFilePart(businessInfo.zakatYear || 'Year');
    const fileName = `${companyNamePart}_Zakat_Calculation_${yearPart}.xlsx`;

    return new NextResponse(responseBody, {
      status: 200,
      headers: {
        'Content-Type':
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${fileName}"`,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown export error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
