import Layout from '@/components/layout/Layout';
import { Toaster } from '@/components/ui/sonner';
import { GlobalContextProvider } from '@/context/GlobalContext';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import '../App.css';

const RootLayout = () => (
  <GlobalContextProvider>
    <Layout>
      <Outlet />
      <TanStackRouterDevtools />
      <Toaster />
    </Layout>
  </GlobalContextProvider>
);

export const Route = createRootRoute({ component: RootLayout });
