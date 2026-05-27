import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import LovePage from './pages/LovePage';
import MapPage from './pages/MapPage';
import QuizPage from './pages/QuizPage';
import WheelPage from './pages/WheelPage';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/mappa" element={<MapPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/ti-amo" element={<LovePage />} />
          <Route path="/la-ruota" element={<WheelPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;

