import TimeRecordPage from '@/features/TimeRecord/TimeRecordPage';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Index,
  beforeLoad: async () => {
    const token = window.localStorage.getItem('token-appcenter');
    if (!token) {
      throw redirect({
        to: '/login',
      });
    }
    return null;
  },
});

function Index() {
  return (
    <div className='p-2'>
      <TimeRecordPage />
    </div>
  );
}
