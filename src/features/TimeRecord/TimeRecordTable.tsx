import { Button } from '@/components/ui/button';

const TimeRecordTable = () => {
  return (
    <div>
      <div className='flex justify-between items-start flex-col mb-4'>
        <h3 className='text-lg font-bold mb-2'>Time Records</h3>
        <div className='flex gap-4 items-center'>
          <div>
            <p>
              From: <span>01/01/2023</span>
            </p>
            <hr />
            <p>
              To: <span>01/31/2023</span>
            </p>
          </div>
          <div>
            <Button variant='outline'>Change Date Range</Button>
          </div>
        </div>
      </div>
      <table className='w-full table-auto border-collapse border border-gray-300'>
        <thead>
          <tr>
            <th className='border border-gray-300 px-4 py-2 text-left'>Day</th>
            <th className='border border-gray-300 px-4 py-2 text-left'>
              Work Time
            </th>
            <th className='border border-gray-300 px-4 py-2 text-left'>
              Break Time
            </th>
            <th className='border border-gray-300 px-4 py-2 text-left'>
              Total Hours
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='border border-gray-300 px-4 py-2'>2023-10-01</td>
            <td className='border border-gray-300 px-4 py-2'>9:30</td>
            <td className='border border-gray-300 px-4 py-2'>2:00</td>
            <td className='border border-gray-300 px-4 py-2'>7:30</td>
          </tr>
          <tr>
            <td className='border border-gray-300 px-4 py-2'>Total</td>
            <td className='border border-gray-300 px-4 py-2'>9:30</td>
            <td className='border border-gray-300 px-4 py-2'>2:00</td>
            <td className='border border-gray-300 px-4 py-2'>7:30</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TimeRecordTable;
