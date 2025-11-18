import backendApi from '@/lib/axios';
import { useState } from 'react';
import { toast } from 'sonner';

type timeStatusType = 'WORKING' | 'BREAK' | 'FINISHED' | 'NOT_STARTED';

const useTimeRecord = () => {
  const [timeStatus, setTimeStatus] = useState<timeStatusType>('NOT_STARTED');

  const handleStartWork = async () => {
    try {
      const dummyStartData: TimeRecordBody = {
        reqHd: {
          userId: 1,
          workDate: '2023-10-10',
          startTime: '12:00:00',
          endTime: null,
        },
      };
      const resp = await backendApi.post('/start-work-session', dummyStartData);
      console.log('Response:', resp.data);
      setTimeStatus('WORKING');
    } catch (error) {
      console.error('Error starting work:', error);
      toast.error('Failed to start work. Please try again.');
    }
  };

  // TODO: Replace dummy data with actual time data when integrating fully
  const handleStartBreak = async (timeData: TimeRecordBody) => {
    try {
      const resp = await backendApi.post('/start-break', dummyStartData);
      console.log('Response:', resp.data);
      setTimeStatus('BREAK');
    } catch (error) {
      console.error('Error starting break:', error);
      toast.error('Failed to start break. Please try again.');
    }
  };

  // TODO: Replace dummy data with actual time data when integrating fully
  const handleEndBreak = async (timeData: TimeRecordBody) => {
    try {
      const resp = await backendApi.post('/end-break', timeData);
      console.log('Response:', resp.data);
      setTimeStatus('WORKING');
    } catch (error) {
      console.error('Error ending break:', error);
      toast.error('Failed to end break. Please try again.');
    }
  };

  // TODO: Replace dummy data with actual time data when integrating fully
  const handleEndWork = async (timeData: TimeRecordBody) => {
    try {
      const resp = await backendApi.post('/end-work-session', timeData);
      console.log('Response:', resp.data);
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
