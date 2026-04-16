'use client';

import { useEffect, useRef, useState } from 'react';
import { ZakatState } from '../lib/types';
import { ZakatAction } from '../state';
import { formatNumber } from '../lib/calculations';
import { ResultCard, SummaryInputRow, SummaryReadRow, SummaryTotalRow } from './SummaryPrimitives';

function CopyButton({ value }: { value: number }) {
  const [isCopied, setIsCopied] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const textToCopy = formatNumber(value);

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        const tempInput = document.createElement('textarea');
        tempInput.value = textToCopy;
        tempInput.style.position = 'fixed';
        tempInput.style.left = '-9999px';
        document.body.appendChild(tempInput);
        tempInput.focus();
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
      }

      setIsCopied(true);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => setIsCopied(false), 2000);
    } catch {
      console.error('Failed to copy:', value);
    }
  };

  return (
    <button
      type='button'
      onClick={handleCopy}
      className={`relative flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all duration-300 ${
        isCopied
          ? 'border-green-400 bg-green-500/40 text-green-300'
          : 'border-[#4F8EF7] bg-[#4F8EF7]/20 text-[#B8D2FF] hover:bg-[#4F8EF7]/35 hover:text-[#E8F0FF]'
      }`}
      aria-label='Copy value'
      title={isCopied ? 'Copied!' : 'Copy to clipboard'}
    >
      <svg
        className={`absolute h-5 w-5 transition-all duration-300 ${
          isCopied ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        }`}
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        strokeWidth={2}
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z'
        />
      </svg>
      <svg
        className={`absolute h-5 w-5 transition-all duration-300 ${
          isCopied ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        }`}
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        strokeWidth={2}
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M5 13l4 4L19 7'
        />
      </svg>
    </button>
  );
}

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
            <div className='flex items-center justify-between rounded-lg border border-[#7C1F1F]/40 bg-[#FF6B6B]/20 p-3'>
              <div className='flex-1'>
                <p className='mb-1 text-xs uppercase tracking-wide text-[#FFB5B5]'>B. Total Debt</p>
                <p className='text-xl font-bold text-[#FFD6D6] [font-variant-numeric:tabular-nums]'>
                  {formatNumber(totalDebt)}
                </p>
              </div>
              <div className='ml-3 flex shrink-0 items-center'>
                <CopyButton value={totalDebt} />
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className='grid gap-4 lg:grid-cols-4'>
        <div className='flex items-center justify-between rounded-2xl border border-[#2A2A3A] bg-linear-to-r from-[#C9A84C]/20 to-[#4F8EF7]/20 p-5 lg:col-span-4'>
          <div className='flex-1'>
            <p className='mb-1 text-xs uppercase tracking-[0.13em] text-[#CFCFDF]'>A - B Net Zakatable Assets</p>
            <p className='text-4xl font-bold text-[#E6C86A] [font-variant-numeric:tabular-nums]'>
              {formatNumber(netZakatableAssets)}
            </p>
          </div>
          <div className='ml-3 flex shrink-0 items-center'>
            <CopyButton value={netZakatableAssets} />
          </div>
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
