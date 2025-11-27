// src/Auth/AuthContext.jsx
import React, { createContext, useContext } from 'react';

// 1. Cria o Contexto
const AuthContext = createContext(null);

// 2. Cria o Hook customizado para consumir o Contexto
export function useAuth() {
  // Se você chamar useAuth fora do AuthProvider, ele retornará null
  return useContext(AuthContext); 
}

// 3. Componente Provedor (Envolve suas rotas no App.jsx)
export function AuthProvider({ children, user, setUser, handleLogout }) {
  // Define o valor a ser compartilhado
  const authValue = {
    user, 
    isLoggedIn: !!user,
    setUser,
    logout: handleLogout,
  };

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
}