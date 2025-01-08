import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { LanguageSwitch } from './LanguageSwitch';

export function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="font-bold text-xl">CMMS</Link>
            
            <div className="hidden md:flex space-x-4">
              <Link to="/" className="px-3 py-2 rounded-md hover:bg-gray-100">
                Dashboard
              </Link>
              <Link to="/equipment" className="px-3 py-2 rounded-md hover:bg-gray-100">
                Equipment
              </Link>
              <Link to="/maintenance" className="px-3 py-2 rounded-md hover:bg-gray-100">
                Maintenance
              </Link>
              <Link to="/reports" className="px-3 py-2 rounded-md hover:bg-gray-100">
                Reports
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <LanguageSwitch />
            <Link to="/settings">
              <Button variant="ghost">Settings</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}