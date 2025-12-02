import backendApi from '@/lib/axios';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import dayjs from 'dayjs';
import { useGlobalContext } from '@/context/GlobalContext';

type timeStatusType = 'WORKING' | 'BREAK' | 'FINISHED' | 'NOT_STARTED';

const useTimeRecord = () => {
  const {
    handleSetMinutesOnBreak,
    handleSetMinutesWorking,
    minutesWorking,
    userId,
  } = useGlobalContext();
  const [timeStatus, setTimeStatus] = useState<timeStatusType>('NOT_STARTED');
  const workTimeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const breakTimeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup function
  const clearTimers = () => {
    if (workTimeTimerRef.current) {
      clearTimeout(workTimeTimerRef.current);
      workTimeTimerRef.current = null;
    }
    if (breakTimeTimerRef.current) {
      clearTimeout(breakTimeTimerRef.current);
      breakTimeTimerRef.current = null;
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearTimers();
    };
  }, []);

  const handleStartWork = async () => {
    try {
      const startWorkBody: TimeRecordBody = {
        reqHd: {
          userId: 1,
          workDate: dayjs().format('YYYY-MM-DD'),
          startTime: dayjs().format('HH:mm:ss'),
          endTime: null,
        },
      };
      await backendApi.post('/start-work-session', startWorkBody);
      clearTimers();

      workTimeTimerRef.current = setInterval(() => {
        console.log(minutesWorking);
        handleSetMinutesWorking((prev: number) => {
          return prev + 1;
        });
      }, 60000); // Increment every minute

      setTimeStatus('WORKING');
      toast.success('Work session started!');
    } catch (error) {
      console.error('Error starting work:', error);
      toast.error('Failed to start work. Please try again.');
    }
  };

  const handleStartBreak = async () => {
    try {
      const startBreakBody: TimeRecordBody = {
        reqHd: {
          userId: 1,
          workDate: dayjs().format('YYYY-MM-DD'),
          startTime: dayjs().format('HH:mm:ss'),
          endTime: null,
        },
      };
      await backendApi.post('/start-break', startBreakBody);
      clearTimers();

      breakTimeTimerRef.current = setInterval(() => {
        handleSetMinutesOnBreak((prev: number) => prev + 1);
      }, 60000); // Increment every minute
      toast.success('Break started!');
      setTimeStatus('BREAK');
    } catch (error) {
      console.error('Error starting break:', error);
      toast.error('Failed to start break. Please try again.');
    }
  };

  const handleEndBreak = async () => {
    try {
      if (userId === null) {
        throw new Error('User ID is null');
      }
      const endBreakBody: TimeRecordBody = {
        reqHd: {
          userId: userId,
          workDate: dayjs().format('YYYY-MM-DD'),
          startTime: dayjs().format('HH:mm:ss'),
          endTime: null,
        },
      };

      await backendApi.post('/end-break', endBreakBody);
      clearTimers();

      workTimeTimerRef.current = setInterval(() => {
        handleSetMinutesWorking((prev: number) => prev + 1);
      }, 60000); // Increment every minute

      toast.success('Break ended!');
      setTimeStatus('WORKING');
    } catch (error) {
      console.error('Error ending break:', error);
      toast.error('Failed to end break. Please try again.');
    }
  };

  const handleEndWork = async () => {
    try {
      const endWorkBody: TimeRecordBody = {
        reqHd: {
          userId: 1,
          workDate: dayjs().format('YYYY-MM-DD'),
          startTime: dayjs().format('HH:mm:ss'),
          endTime: dayjs().format('HH:mm:ss'),
        },
      };
      await backendApi.post('/end-work-session', endWorkBody);
      clearTimers();
      toast.success('Work session ended!');
      setTimeStatus('FINISHED');
    } catch (error) {
      console.error('Error ending work:', error);
      toast.error('Failed to end work. Please try again.');
    }
  };

  const handleGetAllTodayRecords = async () => {
    try {
      const resp = await backendApi.post('/get-today-sessions', {
        params: {
          reqHd: {
            userId: userId,
          },
        },
      });
      console.log('Today records:', resp.data);
    } catch (error) {
      console.error('Error fetching today records:', error);
      toast.error('Failed to fetch today records. Please try again.');
    }
  };

  return {
    timeStatus,
    handleStartWork,
    handleStartBreak,
    handleEndBreak,
    handleEndWork,
    handleGetAllTodayRecords,
  };
};

interface TimeRecordBody {
  reqHd: {
    userId: number;
    workDate: string;
    startTime: string;
    endTime: string | null;
  };
}

export default useTimeRecord;
