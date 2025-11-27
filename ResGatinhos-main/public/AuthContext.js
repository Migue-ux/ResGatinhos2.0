// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 1. Criar o Contexto
const AuthContext = createContext(null);

// 2. Criar o Provedor (o componente que vai "segurar" o estado)
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // Começa como null (deslogado)
  const navigate = useNavigate();

  // Efeito para verificar se o usuário já está salvo no localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("app-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Função de Login
  const login = (userData) => {
    // Simulando seu login (que estava em CriarConta/Login)
    const newUser = { nome: userData.nome, email: userData.email }; 
    localStorage.setItem("app-user", JSON.stringify(newUser)); // Salva no localStorage
    setUser(newUser);
    navigate("/conta"); // Redireciona para a conta
  };

  // Função de Logout (a que estava no App.js)
  const logout = () => {
    localStorage.removeItem("app-user"); // Remove do localStorage
    setUser(null);
    navigate("/"); // Redireciona para home
  };
  
  // Função para atualizar usuário (ex: em Configurações)
  const updateUser = (newUserData) => {
     setUser(newUserData);
     localStorage.setItem("app-user", JSON.stringify(newUserData));
  };

  return (
    <AuthContext.Provider value={{ user, setUser: updateUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 3. Criar o Hook customizado (para ser fácil de usar)
export function useAuth() {
  return useContext(AuthContext);
}