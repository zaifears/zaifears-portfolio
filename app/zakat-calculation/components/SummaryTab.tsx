'use client';

import { ZakatState } from '../lib/types';
import { ZakatAction } from '../state';
import { formatNumber } from '../lib/calculations';
import { ResultCard, SummaryInputRow, SummaryReadRow, SummaryTotalRow } from './SummaryPrimitives';

interface Props {
  state: ZakatState;
  totalZakatableAssets: number;
  totalDebt: number;
  netZakatableAssets: number;
  zakat250: number;
  zakat2577: number;
  zakat260: number;
  dispatch: React.Dispatch<ZakatAction>;
  onExport: () => Promise<void>;
}

export default function SummaryTab({
  state,
  totalZakatableAssets,
  totalDebt,
  netZakatableAssets,
  zakat250,
  zakat2577,
  zakat260,
  dispatch,
  onExport,
}: Props) {
  return (
    <div className='space-y-8'>
      <div className='grid gap-6 xl:grid-cols-2'>
        <section className='rounded-xl border border-[#2A2A3A] bg-[#11111A] p-4'>
          <h2 className='mb-4 text-lg font-semibold text-[#E7E7F7]'>Assets</h2>
          <div className='space-y-3'>
            <SummaryInputRow
              label='Investment in FDR'
              value={state.summaryAssets.investmentInFDR}
              onChange={(value) =>
                dispatch({ type: 'UPDATE_SUMMARY_ASSETS', field: 'investmentInFDR', value })
              }
            />
            <SummaryInputRow
              label='Inventory'
              value={state.summaryAssets.inventory}
              onChange={(value) =>
                dispatch({ type: 'UPDATE_SUMMARY_ASSETS', field: 'inventory', value })
              }
            />
            <SummaryInputRow
              label='Advance to Employee Against Expenses'
              value={state.summaryAssets.advanceToEmployee}
              onChange={(value) =>
                dispatch({ type: 'UPDATE_SUMMARY_ASSETS', field: 'advanceToEmployee', value })
              }
            />
            <SummaryInputRow
              label='Advance to Suppliers'
              value={state.summaryAssets.advanceToSuppliers}
              onChange={(value) =>
                dispatch({ type: 'UPDATE_SUMMARY_ASSETS', field: 'advanceToSuppliers', value })
              }
            />
            <SummaryInputRow
              label='Accounts Receivable'
              value={state.summaryAssets.accountsReceivable}
              onChange={(value) =>
                dispatch({ type: 'UPDATE_SUMMARY_ASSETS', field: 'accountsReceivable', value })
              }
            />
            <SummaryInputRow
              label='Inter Company Receivables'
              value={state.summaryAssets.interCompanyReceivables}
              onChange={(value) =>
                dispatch({
                  type: 'UPDATE_SUMMARY_ASSETS',
                  field: 'interCompanyReceivables',
                  value,
                })
              }
            />
            <SummaryInputRow
              label='Cash & Cash Equivalents'
              value={state.summaryAssets.cashAndEquivalents}
              onChange={(value) =>
                dispatch({ type: 'UPDATE_SUMMARY_ASSETS', field: 'cashAndEquivalents', value })
              }
            />
            <SummaryReadRow label='Gold & Silver Total' value={state.summaryAssets.goldSilverTotal} />
            <SummaryReadRow label='Other Assets Total' value={state.summaryAssets.otherAssetsTotal} />
            <SummaryTotalRow label='A. Total Zakatable Assets' value={totalZakatableAssets} />
          </div>
        </section>

        <section className='rounded-xl border border-[#2A2A3A] bg-[#11111A] p-4'>
          <h2 className='mb-4 text-lg font-semibold text-[#E7E7F7]'>Liabilities</h2>
          <div className='space-y-3'>
            <SummaryInputRow
              label='Accounts Payable'
              value={state.summaryLiabilities.accountsPayable}
              onChange={(value) =>
                dispatch({
                  type: 'UPDATE_SUMMARY_LIABILITIES',
                  field: 'accountsPayable',
                  value,
                })
              }
            />
            <SummaryInputRow
              label='Short-Term Loans'
              value={state.summaryLiabilities.shortTermLoans}
              onChange={(value) =>
                dispatch({
                  type: 'UPDATE_SUMMARY_LIABILITIES',
                  field: 'shortTermLoans',
                  value,
                })
              }
            />
            <SummaryInputRow
              label='Accrued Liabilities'
              value={state.summaryLiabilities.accruedLiabilities}
              onChange={(value) =>
                dispatch({
                  type: 'UPDATE_SUMMARY_LIABILITIES',
                  field: 'accruedLiabilities',
                  value,
                })
              }
            />
            <SummaryReadRow label='Debts (from Debts tab)' value={state.summaryLiabilities.debtsTotal} />
            <div className='rounded-lg border border-[#7C1F1F]/40 bg-[#FF6B6B]/20 p-3'>
              <p className='mb-1 text-xs uppercase tracking-wide text-[#FFB5B5]'>B. Total Debt</p>
              <p className='text-xl font-bold text-[#FFD6D6] [font-variant-numeric:tabular-nums]'>
                {formatNumber(totalDebt)}
              </p>
            </div>
          </div>
        </section>
      </div>

      <section className='grid gap-4 lg:grid-cols-4'>
        <div className='rounded-2xl border border-[#2A2A3A] bg-linear-to-r from-[#C9A84C]/20 to-[#4F8EF7]/20 p-5 lg:col-span-4'>
          <p className='mb-1 text-xs uppercase tracking-[0.13em] text-[#CFCFDF]'>A - B Net Zakatable Assets</p>
          <p className='text-4xl font-bold text-[#E6C86A] [font-variant-numeric:tabular-nums]'>
            {formatNumber(netZakatableAssets)}
          </p>
        </div>
        <ResultCard label='Zakat @ 2.50%' value={zakat250} />
        <ResultCard label='Zakat @ 2.577%' value={zakat2577} />
        <ResultCard label='Zakat @ 2.60%' value={zakat260} />
      </section>

      <p className='text-sm italic text-[#A2A2B2]'>
        Just for illustrative purposes. You may disburse any amount you wish. The sooner the full amount of zakat is disbursed the better.
      </p>

      <button
        type='button'
        onClick={onExport}
        className='rounded-xl border border-[#4F8EF7] bg-[#4F8EF7]/20 px-4 py-2 text-sm font-semibold text-[#B8D2FF] transition hover:bg-[#4F8EF7]/35'
      >
        Download Excel
      </button>
    </div>
  );
}
