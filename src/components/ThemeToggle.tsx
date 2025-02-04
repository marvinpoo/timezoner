import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="theme-toggle">
      <button
        className={`theme-button ${theme === 'light' ? 'active' : ''}`}
        onClick={() => setTheme('light')}
        title="Light Mode"
      >
        <Sun size={18} />
      </button>
      <button
        className={`theme-button ${theme === 'dark' ? 'active' : ''}`}
        onClick={() => setTheme('dark')}
        title="Dark Mode"
      >
        <Moon size={18} />
      </button>
      <button
        className={`theme-button ${theme === 'system' ? 'active' : ''}`}
        onClick={() => setTheme('system')}
        title="System Theme"
      >
        <Monitor size={18} />
      </button>
    </div>
  );
};