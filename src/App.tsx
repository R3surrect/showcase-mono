import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import '@/global/styles/App.css';
import '@/global/styles/normalize.css';

import useAuthStore from '@/store/useAuthStore.ts';
import { router } from '@/router';

const App: React.FC = () => {

  const checkAuth = useAuthStore(state => state.checkAuth);
  const authStatus = useAuthStore(state => state.authData.authStatus);

  useEffect(() => {
    if (authStatus === 'unknown')
      checkAuth();
    if (authStatus === 'authenticated') {
      import('@/store/useTaskStore.ts').then(module =>
        module.default.getState().loadTasks()
      )
    }

  }, [authStatus, checkAuth]);

  return <RouterProvider router={router} />
}

export default App;
