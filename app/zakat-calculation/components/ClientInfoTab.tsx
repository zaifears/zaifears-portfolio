'use client';

import CellInput from './CellInput';
import { ClientInfo } from '../lib/types';
import { ZakatAction } from '../state';

interface Props {
  clientInfo: ClientInfo;
  dispatch: React.Dispatch<ZakatAction>;
}

export default function ClientInfoTab({ clientInfo, dispatch }: Props) {
  return (
    <div className='grid gap-4 sm:grid-cols-2'>
      <div className='sm:col-span-2'>
        <label className='mb-2 block text-sm text-[#888899]'>Name</label>
        <CellInput
          value={clientInfo.name}
          onChange={(value) => dispatch({ type: 'UPDATE_CLIENT_INFO', field: 'name', value })}
        />
      </div>
      <div className='sm:col-span-2'>
        <label className='mb-2 block text-sm text-[#888899]'>Address</label>
        <CellInput
          value={clientInfo.address}
          onChange={(value) => dispatch({ type: 'UPDATE_CLIENT_INFO', field: 'address', value })}
        />
      </div>
      <div>
        <label className='mb-2 block text-sm text-[#888899]'>Email</label>
        <CellInput
          value={clientInfo.email}
          onChange={(value) => dispatch({ type: 'UPDATE_CLIENT_INFO', field: 'email', value })}
        />
      </div>
      <div>
        <label className='mb-2 block text-sm text-[#888899]'>Zakat Year</label>
        <CellInput
          value={clientInfo.zakatYear}
          onChange={(value) => dispatch({ type: 'UPDATE_CLIENT_INFO', field: 'zakatYear', value })}
        />
      </div>
    </div>
  );
}
