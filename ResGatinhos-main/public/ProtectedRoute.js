// src/components/ProtectedRoute.js
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute() {
  const { user } = useAuth(); // Pega o usuário do nosso contexto

  if (!user) {
    // Se não há usuário, redireciona para a página de login
    return <Navigate to="/login" replace />;
  }

  // Se há usuário, renderiza o componente da rota (ex: <Conta />)
  // O <Outlet /> representa o componente que está sendo protegido
  return <Outlet />; 
}

export default ProtectedRoute;