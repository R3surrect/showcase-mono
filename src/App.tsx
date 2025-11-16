import './global/styles/App.css';
import './global/styles/normalize.css';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import RootLayout from './components/layout/RootLayout/RootLayout.tsx';
import Analytics from './pages/Analytics/Analytics.tsx';
import Scheduler from './pages/Scheduler/Scheduler.tsx';
import Notes from './pages/Notes/Notes.tsx';
import Projects from './pages/Projects/Projects.tsx';
import Favorites from './pages/Favorites/Favorites.tsx';
import Templates from './pages/Templates/Templates.tsx';
import Preferences from './pages/Preferences/Preferences.tsx';

const App: React.FC = () => {
  return <Router>
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Navigate to='/analytics' replace />} />
        <Route path='analytics' element={<Analytics />} />
        <Route path='scheduler' element={<Scheduler />} />
        <Route path='notes' element={<Notes />} />
        <Route path='projects' element={<Projects />} />
        <Route path='favorites' element={<Favorites />} />
        <Route path='templates' element={<Templates />} />
        <Route path='preferences' element={<Preferences />} />
      </Route>
      <Route />
    </Routes>
  </Router>
}

export default App;
