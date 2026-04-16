import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { ZakatReportData } from './types';

const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('en-BD', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-BD', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

export const generateZakatReportDocx = async (
  reportData: ZakatReportData,
  templateBuffer: ArrayBuffer
): Promise<Blob> => {
  try {
    const zip = new PizZip(templateBuffer);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    const templateData = {
      clientName: reportData.clientInfo.name,
      clientEmail: reportData.clientInfo.email,
      clientAddress: reportData.clientInfo.address,
      clientPhone: reportData.clientInfo.phone || 'N/A',
      clientType: reportData.clientInfo.clientType === 'institution' ? 'Institution' : 'Individual',
      zakatYear: reportData.zakatYear,
      calendarType: reportData.calendarType === 'gregorian' ? 'Gregorian' : 'Hijri',
      generatedDate: formatDate(new Date(reportData.generatedDate)),
      generatedBy: reportData.generatedBy || 'IFA Consultancy',
      
      // Assets
      cashAmount: formatNumber(reportData.assets.cash),
      bankAmount: formatNumber(reportData.assets.bank),
      goldAmount: formatNumber(reportData.assets.gold),
      silverAmount: formatNumber(reportData.assets.silver),
      businessAmount: formatNumber(reportData.assets.business),
      otherAmount: formatNumber(reportData.assets.other),
      totalAssets: formatNumber(reportData.assets.total),
      
      // Liabilities
      shortTermDebts: formatNumber(reportData.liabilities.shortTermDebts),
      longTermDebts: formatNumber(reportData.liabilities.longTermDebts),
      totalLiabilities: formatNumber(reportData.liabilities.total),
      
      // Calculation
      netAssets: formatNumber(reportData.calculation.netAssets),
      nisabThreshold: formatNumber(reportData.calculation.nisabThreshold),
      zakatDue: formatNumber(reportData.calculation.zakatDue),
      zakatRate: `${reportData.calculation.zakatRate}%`,
      isLiableForZakat: reportData.calculation.isLiableForZakat ? 'Yes' : 'No',
    };

    doc.setData(templateData);
    doc.render();

    const output = doc.getZip().generate({
      type: 'blob',
      mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    });

    return output;
  } catch (error) {
    console.error('Error generating DOCX report:', error);
    throw new Error('Failed to generate Word document');
  }
};

export const generateZakatReportJSON = (reportData: ZakatReportData): string => {
  return JSON.stringify(reportData, null, 2);
};

export const downloadFile = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const generateFilename = (clientName: string, format: string): string => {
  const sanitizedName = clientName.replace(/[^a-z0-9_-]/gi, '_').toLowerCase();
  const timestamp = new Date().toISOString().slice(0, 10);
  return `zakat_report_${sanitizedName}_${timestamp}.${format}`;
};
