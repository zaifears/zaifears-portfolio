import { GoldSilverRow, ZakatState } from './types';

const numFmt = new Intl.NumberFormat('en-BD');

export const formatNumber = (value: number) =>
  numFmt.format(Number.isFinite(value) ? value : 0);

export const parseNumericInput = (value: string): number => {
  const cleaned = value.replace(/,/g, '').replace(/[^0-9.-]/g, '');
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : 0;
};

export const computeGoldSilverRowTotal = (row: GoldSilverRow) =>
  row.qtyVori * row.pricePerVori + row.qtyGram * row.pricePerGram;

export const computeDerivedValues = (state: ZakatState) => {
  const goldSilverRows = state.goldSilver.map((row) => ({
    ...row,
    total: computeGoldSilverRowTotal(row),
  }));

  const goldSilverSheetTotal = goldSilverRows.reduce((sum, row) => sum + row.total, 0);
  const cashBankSheetTotal = state.cashBank.reduce((sum, row) => sum + row.totalValue, 0);
  const investmentInFDR = state.cashBank.reduce(
    (sum, row) =>
      row.description.toUpperCase().includes('FDR') ? sum + row.totalValue : sum,
    0,
  );
  const otherAssetsSheetTotal = state.otherAssets.reduce((sum, row) => sum + row.total, 0);
  const debtsSheetTotal = state.debts.reduce((sum, row) => sum + row.total, 0);

  const totalZakatableAssets =
    state.summaryAssets.investmentInFDR +
    state.summaryAssets.inventory +
    state.summaryAssets.advanceToEmployee +
    state.summaryAssets.advanceToSuppliers +
    state.summaryAssets.accountsReceivable +
    state.summaryAssets.interCompanyReceivables +
    state.summaryAssets.cashAndEquivalents +
    state.summaryAssets.goldSilverTotal +
    state.summaryAssets.otherAssetsTotal;

  const totalDebt =
    state.summaryLiabilities.accountsPayable +
    state.summaryLiabilities.shortTermLoans +
    state.summaryLiabilities.accruedLiabilities +
    state.summaryLiabilities.debtsTotal;

  const netZakatableAssets = totalZakatableAssets - totalDebt;

  return {
    goldSilverRows,
    goldSilverSheetTotal,
    cashBankSheetTotal,
    investmentInFDR,
    otherAssetsSheetTotal,
    debtsSheetTotal,
    totalZakatableAssets,
    totalDebt,
    netZakatableAssets,
    zakat250: netZakatableAssets * 0.025,
    zakat2577: netZakatableAssets * 0.02577,
    zakat260: netZakatableAssets * 0.026,
  };
};
