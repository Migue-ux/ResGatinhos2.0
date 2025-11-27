import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./page-config.module.css";
import { FaSave, FaLock, FaUserEdit, FaArrowLeft } from "react-icons/fa";

export default function ConfiguracoesConta({ user, setUser, darkMode, toggleDarkMode }) {
  const [nome, setNome] = useState(user?.nome || "");
  const [email, setEmail] = useState(user?.email || "");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (darkMode) document.body.classList.add("dark");
    else document.body.classList.remove("dark");
  }, [darkMode]);

  const handleSalvar = (e) => {
    e.preventDefault();
    // Atualiza o "banco" (state global)
    setUser((prev) => ({
      ...prev,
      nome,
      email,
      senha: senha || prev.senha,
    }));

    setMensagem({ tipo: "sucesso", texto: "Alterações salvas com sucesso!" });
    setTimeout(() => setMensagem(null), 3000);
  };

  const handleVoltar = () => {
    navigate("/conta");
  };

  return (
    <div className={`${styles.page} ${darkMode ? "dark" : ""}`}>
      <div className={styles.bgPaws}></div>

      {/* <button classname={styles.modetoggle} onclick={toggledarkmode}>
        ☀️ / 🌙
      </button> */}

      

      <div className={styles.card}>
        <h1 className={styles.title}>
          Configurações
        </h1>
        <p className={styles.subtitle}>Atualize suas informações abaixo </p>

        <form className={styles.form} onSubmit={handleSalvar}>
          <div>
            <label>Nome:</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.passwordWrapper}>
            <label>Nova Senha:</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••••"
            />
            <FaLock className={styles.showPasswordBtn} />
          </div>

          <button className={styles.loginBtn}>
            <FaSave /> Salvar Alterações
          </button>

          {mensagem && (
            <div
              className={
                mensagem.tipo === "sucesso"
                  ? styles.successMessage
                  : styles.errorMessage
              }
            >
              {mensagem.texto}
            </div>
          )}
          <button className={styles.createAccountBtn } onClick={handleVoltar}>
        <FaArrowLeft /> Voltar
      </button>
        </form>
      </div>
    </div>
  );
}
