export interface ClientInfo {
  name: string;
  address: string;
  email: string;
  calendarType?: 'gregorian' | 'hijri';
  zakatYear: string;
}

export interface GoldSilverRow {
  id: string;
  sl: number;
  carette: string;
  description: string;
  qtyVori: number;
  pricePerVori: number;
  qtyGram: number;
  pricePerGram: number;
  total: number;
}

export interface CashBankRow {
  id: string;
  sl: number;
  description: string;
  totalValue: number;
  isSectionHeader?: boolean;
}

export interface OtherAssetRow {
  id: string;
  sl: number;
  description: string;
  total: number;
}

export interface DebtRow {
  id: string;
  sl: number;
  description: string;
  total: number;
}

export interface SummaryAssets {
  investmentInFDR: number;
  inventory: number;
  advanceToEmployee: number;
  advanceToSuppliers: number;
  accountsReceivable: number;
  interCompanyReceivables: number;
  cashAndEquivalents: number;
  goldSilverTotal: number;
  otherAssetsTotal: number;
}

export interface SummaryLiabilities {
  accountsPayable: number;
  shortTermLoans: number;
  accruedLiabilities: number;
  debtsTotal: number;
}

export interface ZakatState {
  clientInfo: ClientInfo;
  goldSilver: GoldSilverRow[];
  cashBank: CashBankRow[];
  otherAssets: OtherAssetRow[];
  debts: DebtRow[];
  summaryAssets: SummaryAssets;
  summaryLiabilities: SummaryLiabilities;
}

export type SheetKey = 'goldSilver' | 'cashBank' | 'otherAssets' | 'debts';

export type TabKey =
  | 'client'
  | 'gold-silver'
  | 'cash-bank'
  | 'other-assets'
  | 'debts'
  | 'summary';
