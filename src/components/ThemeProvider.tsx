// components/ThemeProvider.tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Get saved theme or default to light
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    setThemeState(initialTheme);
    applyTheme(initialTheme);
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  const toggleTheme = () => {
    const newTheme: Theme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {mounted && children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.setAttribute('data-theme', theme);
  root.setAttribute('mode', theme);

  // Update CSS variables based on theme
  if (theme === 'dark') {
    root.style.setProperty('--bg-primary', '#1D1D1B');
    root.style.setProperty('--bg-secondary', '#2B2B2B');
    root.style.setProperty('--text-primary', '#F8F8F6');
    root.style.setProperty('--text-secondary', '#6B7280');
    root.style.setProperty('--accent', '#4F46E5');
  } else {
    root.style.setProperty('--bg-primary', '#F8F8F6');
    root.style.setProperty('--bg-secondary', '#FFFFFF');
    root.style.setProperty('--text-primary', '#2B2B2B');
    root.style.setProperty('--text-secondary', '#6B7280');
    root.style.setProperty('--accent', '#4F46E5');
  }
}
