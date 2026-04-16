import { ZakatReportData } from '../types';

interface ReportPreviewProps {
  data: ZakatReportData;
  onExport?: (format: 'json' | 'docx') => void;
}

export default function ReportPreview({ data, onExport }: ReportPreviewProps) {
  return (
    <div className='space-y-6'>
      {/* Client Information Card */}
      <div className='bg-gray-800 rounded-lg p-6'>
        <h3 className='text-lg font-bold text-cyan-400 mb-4'>Client Information</h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm'>
          <div>
            <p className='text-gray-400'>Client Name</p>
            <p className='text-white font-semibold'>{data.clientInfo.name}</p>
          </div>
          <div>
            <p className='text-gray-400'>Email</p>
            <p className='text-white font-semibold'>{data.clientInfo.email}</p>
          </div>
          <div className='md:col-span-2'>
            <p className='text-gray-400'>Address</p>
            <p className='text-white font-semibold'>{data.clientInfo.address}</p>
          </div>
          {data.clientInfo.phone && (
            <div>
              <p className='text-gray-400'>Phone</p>
              <p className='text-white font-semibold'>{data.clientInfo.phone}</p>
            </div>
          )}
          <div>
            <p className='text-gray-400'>Type</p>
            <p className='text-white font-semibold'>
              {data.clientInfo.clientType === 'institution' ? 'Institution' : 'Individual'}
            </p>
          </div>
        </div>
      </div>

      {/* Summary Card */}
      <div className='bg-gray-800 rounded-lg p-6'>
        <h3 className='text-lg font-bold text-cyan-400 mb-4'>Summary</h3>
        <div className='space-y-3'>
          <div className='flex justify-between'>
            <span className='text-gray-400'>Total Assets</span>
            <span className='text-white font-semibold'>
              ৳{data.assets.total.toLocaleString('en-BD', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className='flex justify-between'>
            <span className='text-gray-400'>Total Liabilities</span>
            <span className='text-white font-semibold'>
              ৳{data.liabilities.total.toLocaleString('en-BD', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className='border-t border-gray-700 pt-3 flex justify-between'>
            <span className='text-gray-400'>Net Assets</span>
            <span className='text-cyan-400 font-semibold'>
              ৳{data.calculation.netAssets.toLocaleString('en-BD', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className='flex justify-between'>
            <span className='text-gray-400'>Nisab Threshold</span>
            <span className='text-white font-semibold'>
              ৳{data.calculation.nisabThreshold.toLocaleString('en-BD', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className='flex justify-between'>
            <span className='text-gray-400'>Liable for Zakat</span>
            <span className={data.calculation.isLiableForZakat ? 'text-green-400 font-semibold' : 'text-red-400 font-semibold'}>
              {data.calculation.isLiableForZakat ? 'Yes' : 'No'}
            </span>
          </div>
          <div className='border-t border-gray-700 pt-3 flex justify-between'>
            <span className='text-lg font-bold text-cyan-400'>Zakat Due</span>
            <span className='text-xl font-bold text-green-400'>
              ৳{data.calculation.zakatDue.toLocaleString('en-BD', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div>

      {/* Assets Breakdown */}
      <div className='bg-gray-800 rounded-lg p-6'>
        <h3 className='text-lg font-bold text-cyan-400 mb-4'>Assets Breakdown</h3>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
          {Object.entries(data.assets).map(([key, value]) => key !== 'total' && (
            <div key={key} className='bg-gray-700 rounded p-3'>
              <p className='text-gray-400 text-sm'>{key.charAt(0).toUpperCase() + key.slice(1)}</p>
              <p className='text-cyan-400 font-semibold'>
                ৳{value.toLocaleString('en-BD', { minimumFractionDigits: 2 })}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Liabilities Breakdown */}
      <div className='bg-gray-800 rounded-lg p-6'>
        <h3 className='text-lg font-bold text-cyan-400 mb-4'>Liabilities Breakdown</h3>
        <div className='space-y-2'>
          <div className='flex justify-between'>
            <span className='text-gray-400'>Short-term Debts</span>
            <span className='text-white font-semibold'>
              ৳{data.liabilities.shortTermDebts.toLocaleString('en-BD', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className='flex justify-between'>
            <span className='text-gray-400'>Long-term Debts</span>
            <span className='text-white font-semibold'>
              ৳{data.liabilities.longTermDebts.toLocaleString('en-BD', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
