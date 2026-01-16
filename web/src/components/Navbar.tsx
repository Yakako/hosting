import React, { useState } from 'react';
import { Camera, Home, BarChart3, Menu, X } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, setCurrentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-slate-900 border-b border-blue-800 shadow-lg">
      <div className="container mx-auto px-4 xl:px-8">
        <div className="flex items-center justify-between h-16 xl:h-20">
          <div className="flex items-center gap-2 xl:gap-3">
            <Camera className="w-8 h-8 xl:w-10 xl:h-10 text-blue-400" />
            <span className="text-xl xl:text-2xl font-bold text-white">Car Brand System</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-1 xl:gap-2">
            <button
              onClick={() => setCurrentPage('home')}
              className={`flex items-center gap-2 px-6 xl:px-8 py-2 xl:py-3 rounded-lg xl:rounded-xl font-semibold transition-all text-sm xl:text-base ${
                currentPage === 'home'
                  ? 'bg-blue-600 text-white'
                  : 'text-blue-200 hover:bg-slate-800'
              }`}
            >
              <Home className="w-4 h-4 xl:w-5 xl:h-5" />
              Home
            </button>
            <button
              onClick={() => setCurrentPage('prediction')}
              className={`flex items-center gap-2 px-6 xl:px-8 py-2 xl:py-3 rounded-lg xl:rounded-xl font-semibold transition-all text-sm xl:text-base ${
                currentPage === 'prediction'
                  ? 'bg-blue-600 text-white'
                  : 'text-blue-200 hover:bg-slate-800'
              }`}
            >
              <Camera className="w-4 h-4 xl:w-5 xl:h-5" />
              Prediction
            </button>
            <button
              onClick={() => setCurrentPage('analytics')}
              className={`flex items-center gap-2 px-6 xl:px-8 py-2 xl:py-3 rounded-lg xl:rounded-xl font-semibold transition-all text-sm xl:text-base ${
                currentPage === 'analytics'
                  ? 'bg-blue-600 text-white'
                  : 'text-blue-200 hover:bg-slate-800'
              }`}
            >
              <BarChart3 className="w-4 h-4 xl:w-5 xl:h-5" />
              Analytics
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white hover:text-blue-400 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6 xl:w-7 xl:h-7" /> : <Menu className="w-6 h-6 xl:w-7 xl:h-7" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-blue-800 mt-2 pt-4 pb-2">
            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  setCurrentPage('home');
                  setIsMenuOpen(false);
                }}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all text-left ${
                  currentPage === 'home'
                    ? 'bg-blue-600 text-white'
                    : 'text-blue-200 hover:bg-slate-800'
                }`}
              >
                <Home className="w-4 h-4" />
                Home
              </button>
              <button
                onClick={() => {
                  setCurrentPage('prediction');
                  setIsMenuOpen(false);
                }}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all text-left ${
                  currentPage === 'prediction'
                    ? 'bg-blue-600 text-white'
                    : 'text-blue-200 hover:bg-slate-800'
                }`}
              >
                <Camera className="w-4 h-4" />
                Prediction
              </button>
              <button
                onClick={() => {
                  setCurrentPage('analytics');
                  setIsMenuOpen(false);
                }}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all text-left ${
                  currentPage === 'analytics'
                    ? 'bg-blue-600 text-white'
                    : 'text-blue-200 hover:bg-slate-800'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                Analytics
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;