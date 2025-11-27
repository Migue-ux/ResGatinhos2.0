import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./page-conta.module.css";
import { FaUserCircle, FaEnvelope, FaCog, FaSignOutAlt } from "react-icons/fa";

export default function Conta({ user, onLogout }) {
  const [darkMode, setDarkMode] = useState(false);
  const [dataCriacao, setDataCriacao] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // gera a data de forma dinâmica no formato DD/MM/AAAA
    const hoje = new Date();
    const dia = String(hoje.getDate()).padStart(2, "0");
    const mes = String(hoje.getMonth() + 1).padStart(2, "0");
    const ano = hoje.getFullYear();
    setDataCriacao(`${dia}/${mes}/${ano}`);
  }, []);

  const toggleMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark");
  };

  const handleConfig = () => {
    navigate("/configuracoes");
  };

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <div className={`${styles.page} ${darkMode ? "dark" : ""}`}>
      <div className={styles.bgPaws}></div>
      {/* <button className={styles.modeToggle} onClick={toggleMode}>
        ☀️ / 🌙
      </button> */}

      <div className={styles.card}>
        <h1 className={styles.title}>
          <FaUserCircle /> Minha Conta
        </h1>
        <p className={styles.subtitle}>Bem-vindo(a), {user?.nome || "Usuário"}!</p>

        <div className={styles.form}>
          <div>
            <label>Nome:</label>
            <input type="text" value={user?.nome || "Miguel"} disabled />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" value={user?.email || "1@1"} disabled />
          </div>
          <div>
            <label>Data de criação:</label>
            <input type="text" value={user?.dataCriacao || dataCriacao} disabled />
          </div>

          <button className={styles.loginBtn} onClick={handleConfig}>
            <FaCog /> Configurações
          </button>

          <button className={styles.createAccountBtn} onClick={handleLogout}>
            <FaSignOutAlt /> Sair
          </button>
        </div>
      </div>
    </div>
  );
}
