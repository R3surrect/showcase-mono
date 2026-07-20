import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import '@/global/styles/App.css';
import '@/global/styles/normalize.css';
import { router } from '@/routes/index.ts';
import ToastProvider from './components/entities/Toast/Toast';

const queryClient = new QueryClient();
const App: React.FC = () => {

  return <QueryClientProvider client={queryClient}>
    <ToastProvider>
      <RouterProvider router={router} />
    </ToastProvider>
  </QueryClientProvider>
}

export default App;
