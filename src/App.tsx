import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useI18nStore } from './lib/i18n';
import { Navbar } from './components/Navbar';
import { Dashboard } from './pages/Dashboard';
import { Equipment } from './pages/Equipment';
import { Maintenance } from './pages/Maintenance';
import { Reports } from './pages/Reports';
import { Settings } from './pages/Settings';

function App() {
  const { language } = useI18nStore();

  return (
    <Router>
      <div className={`min-h-screen bg-gray-100 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/equipment" element={<Equipment />} />
            <Route path="/maintenance" element={<Maintenance />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}