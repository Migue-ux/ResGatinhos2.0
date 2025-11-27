import React, { useState, useEffect, useRef} from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaPaw, FaUserPlus, FaEye, FaEyeSlash } from "react-icons/fa";
import styles from "./page-cadastrar.module.css";

export default function CriarConta() {
  

  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [bio, setBio] = useState("");
  const [foto, setFoto] = useState(null);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [termos, setTermos] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState({ tipo: "", texto: "" });

  // cria bolhas aleatórias no fundo
  useEffect(() => {
    const bubblesContainer = document.querySelector(`.${styles.bubbles}`);
    for (let i = 0; i < 15; i++) {
      const span = document.createElement("span");
      span.style.left = `${Math.random() * 100}%`;
      span.style.width = span.style.height = `${Math.random() * 20 + 10}px`;
      span.style.animationDuration = `${8 + Math.random() * 4}s`;
      bubblesContainer.appendChild(span);
    }
  }, []);
const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click(); // abre o seletor de arquivo
  };

  const handleFoto = (e) => {
    const file = e.target.files[0];
    if (file) setFoto(URL.createObjectURL(file));
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (!nome || !email || !senha || !confirmarSenha) {
      setMensagem({ tipo: "erro", texto: "Preencha todos os campos obrigatórios " });
      return;
    }

    if (senha !== confirmarSenha) {
      setMensagem({ tipo: "erro", texto: "As senhas não coincidem " });
      return;
    }

    if (!termos) {
      setMensagem({ tipo: "erro", texto: "Você precisa aceitar os termos de uso " });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("usuarios")) || [];
      const jaExiste = users.some((u) => u.email === email);

      if (jaExiste) {
        setMensagem({ tipo: "erro", texto: "Esse e-mail já está cadastrado " });
        setLoading(false);
        return;
      }

      const defaultFoto = `https://api.dicebear.com/9.x/avataaars/svg?seed=${nome}`;
      const novoUsuario = { nome, email, senha, bio, foto: foto || defaultFoto };

      users.push(novoUsuario);
      localStorage.setItem("usuarios", JSON.stringify(users));

      setMensagem({ tipo: "sucesso", texto: "Conta criada com sucesso! " });
      setLoading(false);
      setTimeout(() => navigate("/"), 2000);
    }, 1500);
  };

  return (
    <motion.div className={styles.page} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className={styles.bubbles}></div>

      <motion.div
        className={styles.card}
        initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 12 }}
      >
        <h1 className={styles.title}>
          {/* <FaPaw color="#ff6392" />  */}Criar Conta
        </h1>
        <p className={styles.subtitle}>
          Junte-se à nossa comunidade  <strong>ResGatinhos</strong> e espalhe amor pelos bichinhos! 
        </p>

        <form onSubmit={handleRegister} className={styles.form}>
          <label>Nome completo</label>
          <motion.input
            type="text"
            placeholder="Digite seu nome completo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            whileFocus={{ scale: 1.02 }}
          />
          

<div className={styles.addFileBtn}>
  <label>Foto de perfil</label>

  <input
    ref={fileInputRef}
    type="file"
    accept="image/*"
    onChange={handleFoto}
    style={{ display: "none" }}
  />

  <button type="button" onClick={handleButtonClick}>
    <svg
      aria-hidden="true"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeWidth="2"
        stroke="#ffffff"
        d="M13.5 3H12H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H11M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V11.8125"
        strokeLinejoin="round"
        strokeLinecap="round"
      ></path>
      <path
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeWidth="2"
        stroke="#ffffff"
        d="M17 15V18M17 21V18M17 18H14M17 18H20"
      ></path>
    </svg>
    Escolher Foto
  </button>

  {foto && <img src={foto} alt="Preview" className={styles.previewImg} />}
</div>

  


          <label>E-mail</label>
          <motion.input
            type="email"
            placeholder="seuemail@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            whileFocus={{ scale: 1.02 }}
          />

          <label>Senha</label>
          <div className={styles.inputSenha}>
            <motion.input
              type={mostrarSenha ? "text" : "password"}
              placeholder="Crie uma senha forte"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              whileFocus={{ scale: 1.02 }}
            />
            <button
              type="button"
              onClick={() => setMostrarSenha(!mostrarSenha)}
              className={styles.showPasswordBtn}
            >
              {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <label>Confirmar senha</label>
          <motion.input
            type="password"
            placeholder="Repita sua senha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            whileFocus={{ scale: 1.02 }}
          />

          <label>Bio</label>
          <motion.textarea
            placeholder="Fale um pouco sobre você e seu amor pelos pets "
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            whileFocus={{ scale: 1.02 }}
          />

          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={termos}
              onChange={(e) => setTermos(e.target.checked)}
            />
            <span>
              Concordo com os <b>Termos de Uso</b> e a <b>Política de Privacidade</b> 
            </span>
          </label>

          <AnimatePresence>
            {mensagem.texto && (
              <motion.p
                key={mensagem.texto}
                className={mensagem.tipo === "erro" ? styles.erro : styles.sucesso}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {mensagem.texto}
              </motion.p>
            )}
          </AnimatePresence>

          <motion.button
            type="submit"
            className={styles.registerBtn}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
          >
            {loading ? (
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
               <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M482-160q-134 0-228-93t-94-227v-7l-64 64-56-56 160-160 160 160-56 56-64-64v7q0 100 70.5 170T482-240q26 0 51-6t49-18l60 60q-38 22-78 33t-82 11Zm278-161L600-481l56-56 64 64v-7q0-100-70.5-170T478-720q-26 0-51 6t-49 18l-60-60q38-22 78-33t82-11q134 0 228 93t94 227v7l64-64 56 56-160 160Z"/></svg>
              </motion.div>
            ) : (
              <>
                <FaUserPlus /> Criar Conta
              </>
            )}
          </motion.button>

          <button type="button" className={styles.backBtn} onClick={() => navigate("/login")}>
            Voltar ao login
          </button>
        </form>
        <header>
                      <button onClick={() => navigate("/")} className={styles.voltarBtn}>
                         <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/></svg>
                      </button>
                </header>
      </motion.div>
    </motion.div>
    
  );
}
