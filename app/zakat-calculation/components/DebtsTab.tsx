'use client';

import { motion } from 'framer-motion';
import { DebtRow } from '../lib/types';
import { ZakatAction } from '../state';
import CellInput from './CellInput';
import NumberInput from './NumberInput';
import { formatNumber } from '../lib/calculations';

interface Props {
  rows: DebtRow[];
  sheetTotal: number;
  dispatch: React.Dispatch<ZakatAction>;
}

export default function DebtsTab({ rows, sheetTotal, dispatch }: Props) {
  return (
    <div className='space-y-4'>
      <div className='overflow-x-auto rounded-xl border border-[#2A2A3A]'>
        <table className='min-w-190 border-collapse text-sm'>
          <thead className='bg-[#1E1E2E] text-[12px] uppercase tracking-[0.05em] text-[#B7B7C7]'>
            <tr>
              <th className='border border-[#2A2A3A] px-3 py-2 text-left'>SL No.</th>
              <th className='border border-[#2A2A3A] px-3 py-2 text-left'>Description</th>
              <th className='border border-[#2A2A3A] px-3 py-2 text-left'>Total</th>
              <th className='border border-[#2A2A3A] px-3 py-2 text-left'>Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <motion.tr
                key={row.id}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className='hover:bg-[#1A1A2A]'
              >
                <td className='border border-[#2A2A3A] px-3 py-2'>{row.sl}</td>
                <td className='border border-[#2A2A3A] px-2 py-2'>
                  <CellInput
                    value={row.description}
                    onChange={(value) =>
                      dispatch({
                        type: 'UPDATE_ROW',
                        sheet: 'debts',
                        rowId: row.id,
                        field: 'description',
                        value,
                      })
                    }
                  />
                </td>
                <td className='border border-[#2A2A3A] px-2 py-2'>
                  <NumberInput
                    value={row.total}
                    onChange={(value) =>
                      dispatch({
                        type: 'UPDATE_ROW',
                        sheet: 'debts',
                        rowId: row.id,
                        field: 'total',
                        value,
                      })
                    }
                  />
                </td>
                <td className='border border-[#2A2A3A] px-3 py-2'>
                  <button
                    type='button'
                    onClick={() => dispatch({ type: 'DELETE_ROW', sheet: 'debts', rowId: row.id })}
                    className='text-lg leading-none text-[#FF6B6B] transition hover:text-[#FF8989]'
                  >
                    ×
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2} className='border border-[#2A2A3A] px-3 py-3 text-right font-semibold text-[#B7B7C7]'>
                Total
              </td>
              <td className='border border-[#2A2A3A] bg-[#1C1C0A] px-3 py-3 text-right font-bold text-[#C9A84C] [font-variant-numeric:tabular-nums]'>
                {formatNumber(sheetTotal)}
              </td>
              <td className='border border-[#2A2A3A] px-3 py-3' />
            </tr>
          </tfoot>
        </table>
      </div>

      <button
        type='button'
        onClick={() => dispatch({ type: 'ADD_ROW', sheet: 'debts' })}
        className='rounded-xl border border-[#C9A84C] bg-[#C9A84C]/10 px-4 py-2 text-sm font-semibold text-[#C9A84C] transition hover:bg-[#C9A84C]/20'
      >
        Add Row
      </button>
    </div>
  );
}
