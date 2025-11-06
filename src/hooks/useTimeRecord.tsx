import backendApi from '@/lib/axios';
import { useState } from 'react';
import { toast } from 'sonner';

type timeStatusType = 'WORKING' | 'BREAK' | 'FINISHED' | 'NOT_STARTED';

const useTimeRecord = () => {
  const [timeStatus, setTimeStatus] = useState<timeStatusType>('NOT_STARTED');

  const handleStartWork = (timeData: TimeRecordBody) => {
    try {
      //   const resp = await backendApi.post('/start-work-session', timeData);
      setTimeStatus('WORKING');
    } catch (error) {
      console.error('Error starting work:', error);
      toast.error('Failed to start work. Please try again.');
    }
  };

  const handleStartBreak = (timeData: TimeRecordBody) => {
    try {
      //   const resp = backendApi.post('/start-break', timeData);
      setTimeStatus('BREAK');
    } catch (error) {
      console.error('Error starting break:', error);
      toast.error('Failed to start break. Please try again.');
    }
  };

  const handleEndBreak = (timeData: TimeRecordBody) => {
    try {
      //   const resp = backendApi.post('/end-break', timeData);
      setTimeStatus('WORKING');
    } catch (error) {
      console.error('Error ending break:', error);
      toast.error('Failed to end break. Please try again.');
    }
  };

  const handleEndWork = (timeData: TimeRecordBody) => {
    try {
      //   const resp = backendApi.post('/end-work-session', timeData);
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
