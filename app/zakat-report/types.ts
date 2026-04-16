export type ReportFormat = 'pdf' | 'docx' | 'json';

export type ZakatReportData = {
  clientInfo: {
    name: string;
    email: string;
    address: string;
    phone?: string;
    clientType: 'institution' | 'person';
  };
  zakatYear: string;
  calendarType: 'gregorian' | 'hijri';
  assets: {
    cash: number;
    bank: number;
    gold: number;
    silver: number;
    business: number;
    other: number;
    total: number;
  };
  liabilities: {
    shortTermDebts: number;
    longTermDebts: number;
    total: number;
  };
  calculation: {
    netAssets: number;
    nisabThreshold: number;
    zakatDue: number;
    zakatRate: number; // percentage
    isLiableForZakat: boolean;
  };
  generatedDate: string;
  generatedBy?: string;
};

export type ReportHistoryItem = {
  id: string;
  clientName: string;
  generateDate: string;
  zakatYear: string;
  zakatDue: number;
  format: ReportFormat;
};
