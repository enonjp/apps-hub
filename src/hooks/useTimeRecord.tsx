import backendApi from '@/lib/axios';
import { useState } from 'react';
import { toast } from 'sonner';
import dayjs from 'dayjs';

type timeStatusType = 'WORKING' | 'BREAK' | 'FINISHED' | 'NOT_STARTED';

const useTimeRecord = () => {
  const [timeStatus, setTimeStatus] = useState<timeStatusType>('NOT_STARTED');

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
      setTimeStatus('WORKING');
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
      setTimeStatus('BREAK');
    } catch (error) {
      console.error('Error starting break:', error);
      toast.error('Failed to start break. Please try again.');
    }
  };

  const handleEndBreak = async () => {
    try {
      const endBreakBody: TimeRecordBody = {
        reqHd: {
          userId: 1,
          workDate: dayjs().format('YYYY-MM-DD'),
          startTime: dayjs().format('HH:mm:ss'),
          endTime: null,
        },
      };

      await backendApi.post('/end-break', endBreakBody);
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
      setTimeStatus('FINISHED');
    } catch (error) {
      console.error('Error ending work:', error);
      toast.error('Failed to end work. Please try again.');
    }
  };

  return {
    timeStatus,
    handleStartWork,
    handleStartBreak,
    handleEndBreak,
    handleEndWork,
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
