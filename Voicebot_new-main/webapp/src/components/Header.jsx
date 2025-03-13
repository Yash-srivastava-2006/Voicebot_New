import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const Header = ({ children }) => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 text-black dark:text-white p-4 flex justify-between items-center border-b dark:border-gray-700">
      {/* Left-aligned content */}
      <div className="flex items-center gap-2">
        <h1 className="text-xl">Clinical Voicebot</h1>
      </div>

      {/* Right-aligned content */}
      <div className="flex items-center gap-2">
        {/* Theme toggle button */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Additional children or buttons */}
        {children}
      </div>
    </header>
  );
};