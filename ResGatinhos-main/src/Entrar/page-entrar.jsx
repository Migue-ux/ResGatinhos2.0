import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaEye,
  FaEyeSlash,
  FaPaw,
  FaGoogle,
  FaFacebookF,
  FaGithub,
  FaMoon,
  FaSun,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import styles from "./page-entrar.module.css";

function playClickSound() {
  try {
    const audio = new Audio("/click.mp3");
    audio.volume = 0.1;
    audio.play().catch(() => {});
  } catch {}
}

export default function Login({ setUser }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState(localStorage.getItem("rememberEmail") || "");
  const [senha, setSenha] = useState("");
  const [showSenha, setShowSenha] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [rememberMe, setRememberMe] = useState(Boolean(localStorage.getItem("rememberEmail")));
  const [modeDark, setModeDark] = useState(false);
  const [modalEsqueci, setModalEsqueci] = useState(false);

  useEffect(() => {
    if (rememberMe && email) {
      localStorage.setItem("rememberEmail", email);
    } else {
      localStorage.removeItem("rememberEmail");
    }
  }, [rememberMe, email]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    setLoginSuccess(false);
    setLoading(true);
    playClickSound();

    await new Promise((r) => setTimeout(r, 1800));

    const users = JSON.parse(localStorage.getItem("usuarios")) || [];
    const userFound = users.find((u) => u.email === email && u.senha === senha);

    if (userFound) {
      setLoginSuccess(true);
      setUser(userFound);
      localStorage.setItem("userLogado", JSON.stringify(userFound));
      setTimeout(() => navigate("/"), 1500);
    } else {
      setLoginError("Email ou senha incorretos.");
    }

    setLoading(false);
  };

  const toggleMode = () => {
    setModeDark((prev) => !prev);
    playClickSound();
  };

  return (
    <motion.div
      className={`${styles.page} ${modeDark ? styles.dark : ""}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className={styles.bgPaws}></div>

      <button onClick={toggleMode} className={styles.modeToggle}>
        {modeDark ? <FaSun size={20} /> : <FaMoon size={20} />}
      </button>

      <motion.div
        className={styles.card}
        initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 12 }}
      >
        <h1 className={styles.title}>
           Login Resgatinhos
        </h1>
        <p className={styles.subtitle}>Seu espaço para amar e cuidar dos pets</p>

        <form onSubmit={handleLogin} className={styles.form}>
          <label>Email</label>
          <input
            type="email"
            placeholder="seuemail@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            autoFocus
          />

          <label>Senha</label>
          <div className={styles.passwordWrapper}>
            <input
              type={showSenha ? "text" : "password"}
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowSenha(!showSenha)}
              className={styles.showPasswordBtn}
              disabled={loading}
            >
              {showSenha ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className={styles.options}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                disabled={loading}
              />{" "}
              Lembrar-me
            </label>

            <button
              type="button"
              className={styles.forgotBtn}
              onClick={() => setModalEsqueci(true)}
              disabled={loading}
            >
              Esqueci minha senha
            </button>
          </div>

          <AnimatePresence>
            {loginError && (
              <motion.div
                className={styles.errorMessage}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <FaTimesCircle /> {loginError}
              </motion.div>
            )}
            {loginSuccess && (
              <motion.div
                className={styles.successMessage}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <FaCheckCircle /> Login bem-sucedido! Redirecionando...
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            type="submit"
            className={styles.loginBtn}
            disabled={loading}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? <div className={styles.loader}></div> : "Entrar"}
          </motion.button>

          <button
            type="button"
            className={styles.createAccountBtn}
            onClick={() => navigate("/criar-conta")}
            disabled={loading}
          >
            Criar uma conta
          </button>
        </form>
      </motion.div>

      <AnimatePresence>
        {modalEsqueci && (
          <motion.div
            className={styles.modalBackground}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalEsqueci(false)}
          >
            <motion.div
              className={styles.modalContent}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2>Recuperar senha</h2>
              <p>Entre em contato com nosso suporte para redefinir sua senha.</p>
              <button onClick={() => setModalEsqueci(false)}>Fechar</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
