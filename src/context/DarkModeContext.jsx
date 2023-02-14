import { createContext, useContext, useEffect, useState } from 'react';

const DarkModeContext = createContext();
function updateDarkMode(darkMode) {
  if (darkMode) {
    document.documentElement.classList.add('dark');
    localStorage.theme = 'dark';
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.theme = 'light';
  }
}

export function DarkModeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  // 다크모드 여부 및 스타일링을 토글링 할 수 있는 함수
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    updateDarkMode(!darkMode);
  };

  useEffect(() => {
    const isDarkMode = localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(isDarkMode); // 내부 상태 업데이트
    updateDarkMode(isDarkMode); // html에 dark 클래스를 넣을 것인지 여부 업데이트
  }, []);
  return <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>{children}</DarkModeContext.Provider>;
}

// 커스텀 훅
export const useDarkMode = () => useContext(DarkModeContext);
