'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GoldSilverRow } from '../lib/types';
import { ZakatAction } from '../state';
import NumberInput from './NumberInput';
import CellInput from './CellInput';
import { formatNumber } from '../lib/calculations';

interface Props {
  rows: GoldSilverRow[];
  sheetTotal: number;
  dispatch: React.Dispatch<ZakatAction>;
}

export default function GoldSilverTab({ rows, sheetTotal, dispatch }: Props) {
  const [showInfo, setShowInfo] = useState(true);

  return (
    <div className='grid gap-4 xl:grid-cols-[2fr_1fr]'>
      <div className='overflow-x-auto rounded-xl border border-[#2A2A3A]'>
        <table className='min-w-275 border-collapse text-sm'>
          <thead className='bg-[#1E1E2E] text-[12px] uppercase tracking-[0.05em] text-[#B7B7C7]'>
            <tr>
              <th className='border border-[#2A2A3A] px-3 py-2 text-left'>SL No.</th>
              <th className='border border-[#2A2A3A] px-3 py-2 text-left'>Carete</th>
              <th className='border border-[#2A2A3A] px-3 py-2 text-left'>Description</th>
              <th className='border border-[#2A2A3A] px-3 py-2 text-left'>Qty (Vori/Tola)</th>
              <th className='border border-[#2A2A3A] px-3 py-2 text-left'>Price/Vori</th>
              <th className='border border-[#2A2A3A] px-3 py-2 text-left'>Qty (Gram)</th>
              <th className='border border-[#2A2A3A] px-3 py-2 text-left'>Price/Gram</th>
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
                    value={row.carette}
                    onChange={(value) =>
                      dispatch({
                        type: 'UPDATE_ROW',
                        sheet: 'goldSilver',
                        rowId: row.id,
                        field: 'carette',
                        value,
                      })
                    }
                  />
                </td>
                <td className='border border-[#2A2A3A] px-2 py-2'>
                  <CellInput
                    value={row.description}
                    onChange={(value) =>
                      dispatch({
                        type: 'UPDATE_ROW',
                        sheet: 'goldSilver',
                        rowId: row.id,
                        field: 'description',
                        value,
                      })
                    }
                  />
                </td>
                <td className='border border-[#2A2A3A] px-2 py-2'>
                  <NumberInput
                    value={row.qtyVori}
                    onChange={(value) =>
                      dispatch({
                        type: 'UPDATE_ROW',
                        sheet: 'goldSilver',
                        rowId: row.id,
                        field: 'qtyVori',
                        value,
                      })
                    }
                  />
                </td>
                <td className='border border-[#2A2A3A] px-2 py-2'>
                  <NumberInput
                    value={row.pricePerVori}
                    onChange={(value) =>
                      dispatch({
                        type: 'UPDATE_ROW',
                        sheet: 'goldSilver',
                        rowId: row.id,
                        field: 'pricePerVori',
                        value,
                      })
                    }
                  />
                </td>
                <td className='border border-[#2A2A3A] px-2 py-2'>
                  <NumberInput
                    value={row.qtyGram}
                    onChange={(value) =>
                      dispatch({
                        type: 'UPDATE_ROW',
                        sheet: 'goldSilver',
                        rowId: row.id,
                        field: 'qtyGram',
                        value,
                      })
                    }
                  />
                </td>
                <td className='border border-[#2A2A3A] px-2 py-2'>
                  <NumberInput
                    value={row.pricePerGram}
                    onChange={(value) =>
                      dispatch({
                        type: 'UPDATE_ROW',
                        sheet: 'goldSilver',
                        rowId: row.id,
                        field: 'pricePerGram',
                        value,
                      })
                    }
                  />
                </td>
                <td className='border border-[#2A2A3A] bg-[#1C1C0A] px-3 py-2 text-right font-semibold text-[#C9A84C] [font-variant-numeric:tabular-nums]'>
                  {formatNumber(row.total)}
                </td>
                <td className='border border-[#2A2A3A] px-3 py-2'>
                  <button
                    type='button'
                    onClick={() =>
                      dispatch({ type: 'DELETE_ROW', sheet: 'goldSilver', rowId: row.id })
                    }
                    className='text-lg leading-none text-[#FF6B6B] transition hover:text-[#FF8989]'
                    aria-label='Delete row'
                  >
                    ×
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={7} className='border border-[#2A2A3A] px-3 py-3 text-right font-semibold text-[#B7B7C7]'>
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

      <div className='space-y-3'>
        <button
          type='button'
          onClick={() => setShowInfo((prev) => !prev)}
          className='w-full rounded-xl border border-[#2A2A3A] bg-[#1A1A28] px-4 py-2 text-left text-sm hover:bg-[#202033]'
        >
          {showInfo ? 'Hide Instructions' : 'Show Instructions'}
        </button>
        {showInfo && (
          <div className='rounded-xl border border-[#2A2A3A] bg-[#101018] p-4 text-sm leading-relaxed text-[#A9A9BA]'>
            <p className='mb-2 font-medium text-[#D2D2E4]'>Original Instruction Notes</p>
            <p>
              1. Enter quantities and prices for each category of gold and silver. 2. Total is auto-computed as (Qty Vori x Price/Vori) + (Qty Gram x Price/Gram). 3. Add or delete rows as needed.
            </p>
          </div>
        )}
      </div>

      <button
        type='button'
        onClick={() => dispatch({ type: 'ADD_ROW', sheet: 'goldSilver' })}
        className='rounded-xl border border-[#C9A84C] bg-[#C9A84C]/10 px-4 py-2 text-sm font-semibold text-[#C9A84C] transition hover:bg-[#C9A84C]/20'
      >
        Add Row
      </button>
    </div>
  );
}
