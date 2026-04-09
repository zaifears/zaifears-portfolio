import { ZakatState } from './types';

export const defaultState: ZakatState = {
  clientInfo: {
    name: 'Write Company Name here',
    address: 'Write Address here',
    email: 'Write Email here',
    calendarType: 'hijri',
    zakatYear: '1446-47',
  },
  goldSilver: [],
  cashBank: [],
  otherAssets: [],
  debts: [],
  summaryAssets: {
    investmentInFDR: 0,
    inventory: 0,
    advanceToEmployee: 0,
    advanceToSuppliers: 0,
    accountsReceivable: 0,
    interCompanyReceivables: 0,
    cashAndEquivalents: 0,
    goldSilverTotal: 0,
    otherAssetsTotal: 0,
  },
  summaryLiabilities: {
    accountsPayable: 0,
    shortTermLoans: 0,
    accruedLiabilities: 0,
    debtsTotal: 0,
  },
};
