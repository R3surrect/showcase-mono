import { RouterProvider } from 'react-router-dom';

import '@/global/styles/App.css';
import '@/global/styles/normalize.css';

import { router } from '@/routes/index.ts';

const App: React.FC = () => {
  return <RouterProvider router={router} />
}

export default App;
