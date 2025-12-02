import CustomModal from '@/components/CustomModal';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { FaSquare, FaPlay, FaPause } from 'react-icons/fa';
import TimeRecordTable from './TimeRecordTable';
import useTimeRecord from '@/hooks/useTimeRecord';
import { useGlobalContext } from '@/context/GlobalContext';

const TimeRecordPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [workTime, setWorkTime] = useState('00:00');

  const {
    timeStatus,
    handleStartWork,
    handleStartBreak,
    handleEndBreak,
    handleEndWork,
    handleGetAllTodayRecords,
  } = useTimeRecord();
  const {
    getBreakTimeFormatted,
    getWorkingTimeFormatted,
    minutesWorking,
    userId,
  } = useGlobalContext();

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    const workString = getWorkingTimeFormatted();
    setWorkTime(workString);
  }, [minutesWorking, getWorkingTimeFormatted]);

  useEffect(() => {
    if (userId) {
      handleGetAllTodayRecords();
    }
  }, [userId, handleGetAllTodayRecords]);

  return (
    <div className=' max-w-sm mx-auto'>
      <div>
        <h2 className='text-2xl font-bold mb-4 text-center'>Time Record</h2>
      </div>
      <div className='grid grid-cols-3 grid-rows-9 gap-4 h-64 pt-8'>
        <div className='col-start-1 col-end-2 row-start-5 row-end-9 w-full h-full rounded-full'>
          <button
            onClick={handleEndBreak}
            disabled={timeStatus !== 'BREAK'}
            className='time-record-button w-28 h-28  border border-white rounded-full flex justify-center items-center shadow-blue-300 shadow-md cursor-pointer'
          >
            <FaSquare size={30} />
          </button>
          <span className='flex justify-center mt-2'>Stop Break</span>
        </div>
        <div className='col-start-2 col-end-3 row-start-1 row-end-5 w-full h-full rounded-full relative'>
          <div className='flex justify-center pb-2 absolute top-0 -translate-y-8 left-2/4 transform -translate-x-1/2'>
            <span className=' text-xl'>{workTime}</span>
          </div>
          <button
            onClick={handleStartWork}
            disabled={
              timeStatus === 'NOT_STARTED' || timeStatus === 'FINISHED'
                ? false
                : true
            }
            className='time-record-button w-28 h-28  border border-white rounded-full flex justify-center items-center shadow-blue-300 shadow-md cursor-pointer'
          >
            <FaPlay size={30} />
          </button>
          <span className='flex justify-center mt-2'>Start Work</span>
        </div>
        <div className='col-start-3 col-end-4 row-start-5 row-end-9 w-full h-full rounded-full relative '>
          <div className='flex justify-center pb-2 absolute top-0 -translate-y-8 left-2/4 transform -translate-x-1/2'>
            <span className=' text-xl'>{getBreakTimeFormatted()}</span>
          </div>
          <button
            onClick={handleStartBreak}
            disabled={timeStatus !== 'WORKING'}
            className='time-record-button w-28 h-28  border border-white rounded-full flex justify-center items-center shadow-blue-300 shadow-md cursor-pointer'
          >
            <FaPause size={30} />
          </button>
          <span className='flex justify-center mt-2'>Break Time</span>
        </div>
      </div>
      <div className='flex justify-center'>
        <Button
          disabled={timeStatus === 'NOT_STARTED' || timeStatus === 'FINISHED'}
          onClick={handleOpenModal}
          variant={'destructive'}
          className='w-full mt-12 max-w-62'
        >
          End working time
        </Button>
      </div>
      <CustomModal
        titleComponent={
          <h4 className=' font-bold text-lg'>End Working Time</h4>
        }
        isModalOpen={isModalOpen}
        onClose={handleCloseModal}
        onAccept={() => {
          handleEndWork();
          handleCloseModal();
        }}
      >
        <p>Are you sure you want to end your working time?</p>
      </CustomModal>

      <div className='mt-10'>
        <TimeRecordTable />
      </div>
    </div>
  );
};

export default TimeRecordPage;
