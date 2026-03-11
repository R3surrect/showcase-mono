import './global/styles/App.css';
import './global/styles/normalize.css';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';

import RootLayout from './components/layout/RootLayout/RootLayout.tsx';
import Analytics from './pages/Analytics/Analytics.tsx';
import Scheduler from './pages/Scheduler/Scheduler.tsx';
import Notes from './pages/Notes/Notes.tsx';
import Projects from './pages/Projects/Projects.tsx';
import Favorites from './pages/Favorites/Favorites.tsx';
import Templates from './pages/Templates/Templates.tsx';
import Preferences from './pages/Preferences/Preferences.tsx';

// import useTaskStore from './store/useTaskStore.ts';
import useAuthStore from './store/useAuthStore.ts';
import ProtectedRoute from './components/shared/ProtectedRoute.tsx';
import useTaskStore from './store/useTaskStore.ts';
import AuthLayout from './pages/Auth/AuthLayout.tsx';
import Login from './pages/Auth/Login/Login.tsx';
import Register from './pages/Auth/Register/Register.tsx';

const App: React.FC = () => {

  const checkAuth = useAuthStore(state => state.checkAuth);
  const authStatus = useAuthStore(state => state.authStatus);
  const loadTasks = useTaskStore(state => state.loadTasks);

  useEffect(() => {
    if (authStatus === 'unknown')
      checkAuth();
    if (authStatus === 'authenticated')
      loadTasks();
  }, [authStatus, checkAuth, loadTasks])

  return <Router>
    <Routes>
      <Route path="login" element={
        <AuthLayout>
          <Login />
        </AuthLayout>
      } />
      <Route path="register" element={
        <AuthLayout>
          <Register />
        </AuthLayout>
      } />

      <Route path="/" element={
        <ProtectedRoute>
          <RootLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to='/analytics' replace />} />
        <Route path='analytics' element={<Analytics />} />
        <Route path='scheduler' element={<Scheduler />} />
        <Route path='notes' element={<Notes />} />
        <Route path='projects' element={<Projects />} />
        <Route path='favorites' element={<Favorites />} />
        <Route path='templates' element={<Templates />} />
        <Route path='preferences' element={<Preferences />} />
      </Route>
    </Routes>
  </Router>
}

export default App;
