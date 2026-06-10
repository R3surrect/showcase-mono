import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import '@/global/styles/App.css';
import '@/global/styles/normalize.css';
import { router } from '@/routes/index.ts';
// import useAuthStore from './store/useAuthStore';

const queryClient = new QueryClient();

const App: React.FC = () => {
  // useAuthStore(store => store.checkAuth)();
  
  return <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
}

export default App;
