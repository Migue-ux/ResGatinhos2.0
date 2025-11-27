import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import styles from "./page-match.module.css";

// ==================== DADOS ======================
const CATS = [
  { id: 1, nome: "Luna", idadeMonths: 24, genero: "Fêmea", descricao: "Dócil e carinhosa, adora um colo e ronronar bastante.", imagem: "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?q=80&w=800&auto=format&fit=crop" },
  { id: 2, nome: "Tom", idadeMonths: 18, genero: "Macho", descricao: "Cheio de energia e muito brincalhão, ótimo com crianças.", imagem: "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?q=80&w=800&auto=format&fit=crop" },
  { id: 3, nome: "Mia", idadeMonths: 36, genero: "Fêmea", descricao: "Calma e observadora, ama cochilar perto da janela.", imagem: "https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg?q=80&w=800&auto=format&fit=crop" },
  { id: 4, nome: "Nino", idadeMonths: 5, genero: "Macho", descricao: "Filhote curioso e esperto, perfeito para quem quer companhia!", imagem: "https://images.pexels.com/photos/384555/pexels-photo-384555.jpeg?q=80&w=800&auto=format&fit=crop" },
  { id: 5, nome: "Mel", idadeMonths: 48, genero: "Fêmea", descricao: "Carinhosa e sociável com outros gatos, já castrada e vacinada.", imagem: "https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?q=80&w=800&auto=format&fit=crop" },
  { id: 6, nome: "Bento", idadeMonths: 12, genero: "Macho", descricao: "Aventureiro e muito esperto! Ama explorar e subir em tudo.", imagem: "https://images.pexels.com/photos/730896/pexels-photo-730896.jpeg?q=80&w=800&auto=format&fit=crop" },
  { id: 7, nome: "Pipoca", idadeMonths: 8, genero: "Fêmea", descricao: "Brincalhona e curiosa — adora bolinhas e caixas.", imagem: "https://images.pexels.com/photos/2071873/pexels-photo-2071873.jpeg?q=80&w=800&auto=format&fit=crop" },
  { id: 8, nome: "Zeus", idadeMonths: 60, genero: "Macho", descricao: "Sério e elegante — vive dormindo no sofá.", imagem: "https://images.pexels.com/photos/1543793/pexels-photo-1543793.jpeg?q=80&w=800&auto=format&fit=crop" },
  { id: 9, nome: "Loki", idadeMonths: 20, genero: "Macho", descricao: "Travesso e muito esperto, adora brincar de esconde-esconde.", imagem: "https://images.pexels.com/photos/2173872/pexels-photo-2173872.jpeg?q=80&w=800&auto=format&fit=crop" },
  { id: 10, nome: "Bella", idadeMonths: 30, genero: "Fêmea", descricao: "Gentil e dócil, adora carinho e estar perto da família.", imagem: "https://images.pexels.com/photos/1828875/pexels-photo-1828875.jpeg?q=80&w=800&auto=format&fit=crop" },
  { id: 11, nome: "Charlie", idadeMonths: 14, genero: "Macho", descricao: "Curioso e brincalhão, ótimo para quem adora gatos ativos.", imagem: "https://images.pexels.com/photos/3687957/pexels-photo-3687957.jpeg?q=80&w=800&auto=format&fit=crop" },
  { id: 12, nome: "Nina", idadeMonths: 40, genero: "Fêmea", descricao: "Carinhosa e paciente, gosta de cochilar e observar o movimento da casa.", imagem: "https://images.pexels.com/photos/320014/pexels-photo-320014.jpeg?q=80&w=800&auto=format&fit=crop" },
  { id: 13, nome: "Simba", idadeMonths: 22, genero: "Macho", descricao: "Aventureiro e corajoso, sempre explorando novos cantos.", imagem: "https://images.pexels.com/photos/1314550/pexels-photo-1314550.jpeg?q=80&w=800&auto=format&fit=crop" },
  { id: 14, nome: "Lily", idadeMonths: 18, genero: "Fêmea", descricao: "Doce e tranquila, ama se aconchegar no colo.", imagem: "https://images.pexels.com/photos/20787/pexels-photo.jpg?q=80&w=800&auto=format&fit=crop" },
  { id: 15, nome: "Oscar", idadeMonths: 36, genero: "Macho", descricao: "Elegante e calmo, gosta de janelas ensolaradas e sons suaves.", imagem: "https://images.pexels.com/photos/1056251/pexels-photo-1056251.jpeg?q=80&w=800&auto=format&fit=crop" },
  { id: 16, nome: "Molly", idadeMonths: 10, genero: "Fêmea", descricao: "Filhote carinhosa e brincalhona, cheia de energia.", imagem: "https://images.pexels.com/photos/1741205/pexels-photo-1741205.jpeg?q=80&w=800&auto=format&fit=crop" },
  { id: 17, nome: "Leo", idadeMonths: 50, genero: "Macho", descricao: "Calmo e protetor, gosta de observar tudo com atenção.", imagem: "https://images.pexels.com/photos/416160/pexels-photo-416160.jpeg?q=80&w=800&auto=format&fit=crop" },
  { id: 18, nome: "Chloe", idadeMonths: 28, genero: "Fêmea", descricao: "Amigável e sociável, se dá bem com outros animais.", imagem: "https://images.pexels.com/photos/2558605/pexels-photo-2558605.jpeg?q=80&w=800&auto=format&fit=crop" },
  { id: 19, nome: "Max", idadeMonths: 16, genero: "Macho", descricao: "Divertido e curioso, gosta de perseguir brinquedos e sombras.", imagem: "https://images.pexels.com/photos/208984/pexels-photo-208984.jpeg?q=80&w=800&auto=format&fit=crop" },
  { id: 20, nome: "Daisy", idadeMonths: 24, genero: "Fêmea", descricao: "Carinhosa e meiga, adora receber atenção e carinho.", imagem: "https://images.pexels.com/photos/923360/pexels-photo-923360.jpeg?q=80&w=800&auto=format&fit=crop" }
];

function formatAge(months) {
  if (months < 12) return `${months} meses`;
  const yrs = Math.floor(months / 12);
  const rem = months % 12;
  return rem === 0 ? `${yrs} ano${yrs > 1 ? "s" : ""}` : `${yrs} ano(s) ${rem} meses`;
}

// ==================== CARD VISUAL ======================
function MatchCard({ cat }) {
  return (
    <div className={styles.matchCard}>
      <img src={cat.imagem} className={styles.matchCardImage} alt={cat.nome} />
      <div className={styles.matchCardBody}>
        <h3 className={styles.gatoNome}>{cat.nome}</h3>
        <span className={styles.idade}>{formatAge(cat.idadeMonths)}</span>
        <p className={styles.gatoDesc}>{cat.descricao}</p>
      </div>
    </div>
  );
}

// ==================== CARD COM ANIMAÇÃO ======================
function MotionCard({ cat, index, isTop, onSwipeAnimation, registerControl }) {
  const controls = useAnimation();
  const cardRef = useRef(null);
  const [likeOpacity, setLikeOpacity] = useState(0);
  const [nopeOpacity, setNopeOpacity] = useState(0);

  if (registerControl) registerControl(index, controls);

  // tilt 3D conforme mouse
  const handleMouseMove = (e) => {
    if (!isTop || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    cardRef.current.style.transform = `rotateY(${x * 0.05}deg) rotateX(${-y * 0.05}deg)`;
  };
  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
  };

  return (
    <motion.div
      ref={cardRef}
      animate={controls}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.8}
      onDrag={(e, info) => {
        const deltaX = info.offset.x;
        setLikeOpacity(deltaX > 0 ? Math.min(deltaX / 150, 1) : 0);
        setNopeOpacity(deltaX < 0 ? Math.min(-deltaX / 150, 1) : 0);
      }}
      onDragEnd={(e, info) => {
        if (info.offset.x > 150) onSwipeAnimation(index, "right");
        else if (info.offset.x < -150) onSwipeAnimation(index, "left");
      }}
      className={styles.tinderCardWrap}
      style={{ zIndex: index }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <MatchCard cat={cat} />
      {/* LIKE / NOPE */}
      <motion.div
        className={`${styles.likeBadge}`}
        style={{ opacity: likeOpacity }}
        initial={{ scale: 0 }}
        animate={{ scale: likeOpacity }}
      >
        LIKE
      </motion.div>
      <motion.div
        className={`${styles.nopeBadge}`}
        style={{ opacity: nopeOpacity }}
        initial={{ scale: 0 }}
        animate={{ scale: nopeOpacity }}
      >
        NOPE
      </motion.div>
    </motion.div>
  );
}

// ==================== PÁGINA ======================
export default function PageMatch() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(CATS.length - 1);
  const [favorites, setFavorites] = useState([]);
  const cardControls = useRef({});
  const likeSound = useRef(new Audio("/sounds/like.mp3"));
  const nopeSound = useRef(new Audio("/sounds/nope.mp3"));
  const confettiRef = useRef(null);

  const registerControl = (index, control) => {
    cardControls.current[index] = control;
  };

  const swipeWithAnimation = (index, direction) => {
    const ctrl = cardControls.current[index];
    if (!ctrl) return;

    ctrl.start({
      x: direction === "right" ? 600 : -600,
      opacity: 0,
      rotate: direction === "right" ? 15 : -15,
      transition: { duration: 0.3 },
    });

    const cat = CATS[index];

    if (direction === "right") {
      setFavorites(prev => [cat, ...prev]);
      likeSound.current.play();
      triggerConfetti();
    } else {
      nopeSound.current.play();
    }

    setCurrentIndex(prev => prev - 1);
  };

  const triggerConfetti = () => {
    if (!confettiRef.current) return;
    confettiRef.current.classList.add(styles.confetti);
    setTimeout(() => confettiRef.current.classList.remove(styles.confetti), 1500);
  };

  const handleAdotar = (cat) => {
    navigate(`/quero-adotar?gato=${encodeURIComponent(cat.nome)}`);
  };

  return (
    <div className={styles.pageMatch}>
      {/* Partículas flutuantes */}
      <div className={styles.particles}>
        {Array.from({ length: 40 }).map((_, i) => (
          <span
            key={i}
            style={{
              left: Math.random() * 100 + "vw",
              animationDelay: Math.random() * 6 + "s",
              animationDuration: 10 + Math.random() * 10 + "s",
            }}
          />
        ))}
      </div>

      {/* Confetti */}
      <div ref={confettiRef} className={styles.confettiContainer}></div>

      <header className={styles.topo}>
        <h1>Encontre seu Match!</h1>
        <p>Arraste para os lados ou use os botões.</p>
      </header>

      <div className={styles.swipeContainer}>
        {CATS.map((cat, index) => (
          <MotionCard
            key={cat.id}
            cat={cat}
            index={index}
            isTop={index === currentIndex}
            onSwipeAnimation={swipeWithAnimation}
            registerControl={registerControl}
          />
        ))}

        {currentIndex < 0 && (
          <div className={styles.matchEndContainer}>
            <h2>Acabaram os gatinhos!</h2>
            <p>Seus favoritos:</p>

            {favorites.length ? (
              <div className={styles.favoritesList}>
                {favorites.map((cat) => (
                  <div key={cat.id} className={styles.favItem}>
                    <img src={cat.imagem} alt={cat.nome} />
                    <span>{cat.nome}</span>
                    <button
                      onClick={() => handleAdotar(cat)}
                      className={styles.favButton}
                    >
                      Adotar
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p>Você não deu match em ninguém ainda.</p>
            )}

            <button
              className={styles.btnVoltar}
              onClick={() => navigate("/adotar")}
            >
              Ver todos os gatos
            </button>
          </div>
        )}
      </div>

      {currentIndex >= 0 && (
        <div className={styles.swipeButtons}>
          <button
            className={`${styles.btnAction} ${styles.btnNope}`}
            onClick={() => swipeWithAnimation(currentIndex, "left")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#fdb81d"><path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg>
          </button>
          <button
            className={`${styles.btnAction} ${styles.btnLike}`}
            onClick={() => swipeWithAnimation(currentIndex, "right")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#fdb81d"><path d="m480-121-41-37q-105.77-97.12-174.88-167.56Q195-396 154-451.5T96.5-552Q80-597 80-643q0-90.15 60.5-150.58Q201-854 290-854q57 0 105.5 27t84.5 78q42-54 89-79.5T670-854q89 0 149.5 60.42Q880-733.15 880-643q0 46-16.5 91T806-451.5Q765-396 695.88-325.56 626.77-255.12 521-158l-41 37Zm0-79q101.24-93 166.62-159.5Q712-426 750.5-476t54-89.14q15.5-39.13 15.5-77.72 0-66.14-42-108.64T670.22-794q-51.52 0-95.37 31.5T504-674h-49q-26-56-69.85-88-43.85-32-95.37-32Q224-794 182-751.5t-42 108.82q0 38.68 15.5 78.18 15.5 39.5 54 90T314-358q66 66 166 158Zm0-297Z"/></svg>
          </button>
        </div>
      )}
    </div>
  );
}
