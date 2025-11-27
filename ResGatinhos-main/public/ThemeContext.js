// src/context/ThemeContext.js
import React, { createContext, useState, useContext, useEffect } from "react";

// Função para pegar o tema inicial (localStorage ou preferência do SO)
const getInitialTheme = () => {
  const savedTheme = localStorage.getItem("app-theme");
  if (savedTheme) {
    return JSON.parse(savedTheme);
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

// 1. Criar o Contexto
const ThemeContext = createContext(null);

// 2. Criar o Provedor
export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(getInitialTheme);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem("app-theme", JSON.stringify(newMode)); // Salva a preferência
      return newMode;
    });
  };

  // O useEffect que estava no App.js agora vive aqui
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Criar o Hook customizado
export function useTheme() {
  return useContext(ThemeContext);
}