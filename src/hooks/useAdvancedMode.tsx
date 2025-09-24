import { useState, useEffect } from 'react';

export function useAdvancedMode() {
  const [isAdvanced, setIsAdvanced] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('fynetic-advanced-mode');
    if (saved) {
      setIsAdvanced(JSON.parse(saved));
    }
  }, []);

  const toggleMode = () => {
    const newMode = !isAdvanced;
    setIsAdvanced(newMode);
    localStorage.setItem('fynetic-advanced-mode', JSON.stringify(newMode));
  };

  return { isAdvanced, toggleMode };
}