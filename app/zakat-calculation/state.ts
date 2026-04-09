import { ClientInfo, SheetKey, SummaryAssets, SummaryLiabilities, ZakatState } from './lib/types';

export type ZakatAction =
  | { type: 'HYDRATE_STATE'; payload: ZakatState }
  | { type: 'UPDATE_CLIENT_INFO'; field: keyof ClientInfo; value: string }
  | { type: 'ADD_ROW'; sheet: SheetKey }
  | {
      type: 'UPDATE_ROW';
      sheet: SheetKey;
      rowId: string;
      field: string;
      value: string | number;
    }
  | { type: 'DELETE_ROW'; sheet: SheetKey; rowId: string }
  | { type: 'UPDATE_SUMMARY_ASSETS'; field: keyof SummaryAssets; value: number }
  | {
      type: 'UPDATE_SUMMARY_LIABILITIES';
      field: keyof SummaryLiabilities;
      value: number;
    };

const withRecomputedSl = <T extends { sl: number }>(rows: T[]) =>
  rows.map((row, index) => ({ ...row, sl: index + 1 }));

const createId = () =>
  typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);

export const zakatReducer = (state: ZakatState, action: ZakatAction): ZakatState => {
  switch (action.type) {
    case 'HYDRATE_STATE':
      return action.payload;

    case 'UPDATE_CLIENT_INFO':
      return {
        ...state,
        clientInfo: {
          ...state.clientInfo,
          [action.field]: action.value,
        },
      };

    case 'ADD_ROW': {
      if (action.sheet === 'goldSilver') {
        return {
          ...state,
          goldSilver: withRecomputedSl([
            ...state.goldSilver,
            {
              id: createId(),
              sl: state.goldSilver.length + 1,
              carette: '',
              description: '',
              qtyVori: 0,
              pricePerVori: 0,
              qtyGram: 0,
              pricePerGram: 0,
              total: 0,
            },
          ]),
        };
      }

      if (action.sheet === 'cashBank') {
        return {
          ...state,
          cashBank: withRecomputedSl([
            ...state.cashBank,
            {
              id: createId(),
              sl: state.cashBank.length + 1,
              description: '',
              totalValue: 0,
            },
          ]),
        };
      }

      if (action.sheet === 'otherAssets') {
        return {
          ...state,
          otherAssets: withRecomputedSl([
            ...state.otherAssets,
            { id: createId(), sl: state.otherAssets.length + 1, description: '', total: 0 },
          ]),
        };
      }

      if (action.sheet === 'debts') {
        return {
          ...state,
          debts: withRecomputedSl([
            ...state.debts,
            { id: createId(), sl: state.debts.length + 1, description: '', total: 0 },
          ]),
        };
      }

      return state;
    }

    case 'UPDATE_ROW': {
      if (action.sheet === 'goldSilver') {
        return {
          ...state,
          goldSilver: state.goldSilver.map((row) =>
            row.id === action.rowId ? { ...row, [action.field]: action.value } : row,
          ),
        };
      }

      if (action.sheet === 'cashBank') {
        return {
          ...state,
          cashBank: state.cashBank.map((row) =>
            row.id === action.rowId ? { ...row, [action.field]: action.value } : row,
          ),
        };
      }

      if (action.sheet === 'otherAssets') {
        return {
          ...state,
          otherAssets: state.otherAssets.map((row) =>
            row.id === action.rowId ? { ...row, [action.field]: action.value } : row,
          ),
        };
      }

      if (action.sheet === 'debts') {
        return {
          ...state,
          debts: state.debts.map((row) =>
            row.id === action.rowId ? { ...row, [action.field]: action.value } : row,
          ),
        };
      }

      return state;
    }

    case 'DELETE_ROW': {
      if (action.sheet === 'goldSilver') {
        return {
          ...state,
          goldSilver: withRecomputedSl(state.goldSilver.filter((row) => row.id !== action.rowId)),
        };
      }

      if (action.sheet === 'cashBank') {
        return {
          ...state,
          cashBank: withRecomputedSl(state.cashBank.filter((row) => row.id !== action.rowId)),
        };
      }

      if (action.sheet === 'otherAssets') {
        return {
          ...state,
          otherAssets: withRecomputedSl(state.otherAssets.filter((row) => row.id !== action.rowId)),
        };
      }

      if (action.sheet === 'debts') {
        return {
          ...state,
          debts: withRecomputedSl(state.debts.filter((row) => row.id !== action.rowId)),
        };
      }

      return state;
    }

    case 'UPDATE_SUMMARY_ASSETS':
      return {
        ...state,
        summaryAssets: { ...state.summaryAssets, [action.field]: action.value },
      };

    case 'UPDATE_SUMMARY_LIABILITIES':
      return {
        ...state,
        summaryLiabilities: { ...state.summaryLiabilities, [action.field]: action.value },
      };

    default:
      return state;
  }
};
