const TimeRecordTable = () => {
  return (
    <div>
      <h3 className='text-lg font-medium mb-4'>Time Records</h3>
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
