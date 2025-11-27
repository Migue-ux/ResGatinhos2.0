import React, { useCallback, useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import styles from "./page-home.module.css";
import { Link, useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";


export default function PageHome({ user, setUser }) {

 const particlesInit = useCallback(async (engine) => {
  await loadSlim(engine);
}, []);


// Canais
 const canais = [
  {
    nome: "Canal ResGatinhos • Ao vivo",
    noticia:
      " Campanha de adoção neste fim de semana! |  Castração gratuita disponível |  Dicas para deixar seu gato mais confiante |  Como ajudar ONGs locais",
    imagem: "/gato-irado.jpg",
  },
  {
    nome: "Canal 805",
    noticia:
      " Novos abrigos abrem em várias cidades |  Cuide da saúde do seu pet no inverno |  Cães heróis salvam vidas em enchentes!",
    imagem: "/cao-feliz.jpg",
  },
  {
    nome: "Canal Natureza Viva",
    noticia:
      " Onças-pintadas voltam a habitar áreas protegidas |  Projeto Amazônia Verde ganha força |  Chuvas trazem vida às florestas!",
    imagem: "/natureza.mp4",
  },
  {
    nome: "Canal 32 News",
    noticia:
      " Últimas notícias: aumento nas adoções! |  Campanha de microchipagem gratuita |  Histórias de resgates emocionantes",
    imagem: "/noticias.mp4",
  },
  {
    nome: "Catflix",
    noticia:
      " Maratona de vídeos de gatos fofos |  Compilações engraçadas o dia todo |  Exclusivo: bastidores do ResGatinhos!",
    imagem: "/catflix.mp4",
  },
  {
    nome: "DogTime",
    noticia:
      " Treinos divertidos com seu gato |  gatos atletas competem em agility |  Dicas para energia e saúde felina",
    imagem: "/dog-praia.jpg",
  },
  {
    nome: "Canal Clima Animal",
    noticia:
      " Previsão do tempo: sol com chances de lambidas! |  Cuidados com pets na chuva |  Mantendo o aquecimento dos bichanos no frio",
    imagem: "/clima.mp4",
  },
  {
    nome: "TV Aventura",
    noticia:
      " Explorando a natureza com pets |  Trilhas e aventuras |  Cuide do planeta com o ResGatinhos!",
    imagem: "/aventura.mp4",
  },
  {
    nome: "Canal Relax",
    noticia:
      " Sons relaxantes para pets dormirem tranquilos |  Sessão ‘Dorminhoco Feliz’ começa agora |  Gatos zen ",
    imagem: "/relax.mp4",
  },
  {
    nome: "Canal Vintage Pets",
    noticia:
      " Recordar é viver: os resgates mais antigos |  Memórias do abrigo em 2010 |  Homenagem aos primeiros voluntários",
    imagem: "/vintage.jpg",
  },
];


  const [canalAtual, setCanalAtual] = useState(0);

  const trocarCanal = (direcao) => {
    setCanalAtual((atual) =>
      direcao === "proximo"
        ? (atual + 1) % canais.length
        : (atual - 1 + canais.length) % canais.length
    );
  };




//depoimentos
 const depoimentos = [
    { img: "/luna.jpeg", texto: "“A Luna mudou minha vida. Hoje, ela é a alegria da casa!”", nome: "Marina, adotante" },
    { img: "/tom.jpg", texto: "“O Tom me escolheu na feira de adoção. Desde então, somos inseparáveis.”", nome: "Pedro, adotante" },
    { img: "/mimi.jpeg", texto: "“A Mimi chegou assustada, mas hoje é a dona do sofá!”", nome: "Ana, adotante" },
    { img: "/zeca.webp", texto: "“O Zeca transformou minha rotina. Agora, a casa tem vida!”", nome: "João, adotante" },
    { img: "/nina.jpg", texto: "“Adotar a Nina foi o melhor presente que já me dei.”", nome: "Carla, adotante" },
    { img: "/felix.jpg", texto: "“O Felix me ensina todos os dias o que é amor de verdade.”", nome: "Lucas, adotante" },
    { img: "/mel.jpg", texto: "“A Mel trouxe paz e alegria pra minha família. Não tem preço.”", nome: "Sofia, adotante" },
    { img: "/tigrinho.jpg", texto: "“O Tigrinho era tímido, mas virou o rei da casa.”", nome: "Bruno, adotante" },
    { img: "/lili.jpg", texto: "“A Lili me faz rir todos os dias. É puro amor em forma de gato.”", nome: "Rafaela, adotante" },
    { img: "/thor.jpg", texto: "“O Thor chegou pequeno, mas preencheu um espaço enorme no meu coração.”", nome: "Diego, adotante" },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % Math.ceil(depoimentos.length / 3));
    }, 5000); // troca a cada 5 segundos
    return () => clearInterval(interval);
  }, [depoimentos.length]);

  const start = index * 3;
  const visibleDepoimentos = depoimentos.slice(start, start + 3);


useEffect(() => {
  const counters = document.querySelectorAll(`.${styles.indicador} h3[data-value]`);
  counters.forEach(counter => {
    let start = 0;
    const end = parseInt(counter.getAttribute("data-value"));
    const duration = 2000;
    const increment = end / (duration / 16);

    const updateCounter = () => {
      start += increment;
      if (start < end) {
        counter.textContent = "+" + Math.floor(start);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = "+" + end;
      }
    };
    updateCounter();
  });
}, []);



  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const sectionRef = useRef(null);

  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50 });

  // Animação de scroll da seção de vídeo
  useEffect(() => {
    const section = sectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            section.classList.add(styles.visible);
            observer.unobserve(section);
          }
        });
      },
      { threshold: 0.2 }
    );
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);


  
  // Fecha dropdown se clicar fora
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  

  const imagens = ["/banner1.jpg", "/banner2.jpg", "/banner3.jpg"];

  // ===== CONFIGURAÇÃO DO CARROSSEL ===== 
  const settings = { dots: true,
     infinite: true, 
     autoplay: true,
      speed: 700,
       autoplaySpeed: 3500, 
      slidesToShow: 1,
       slidesToScroll: 1,
       arrows: false,
       pauseOnHover: true,
       adaptiveHeight: true,
     };

  // Animações de scroll para outros elementos
useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.visible);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  // pega todos os elementos de forma segura (sem querySelector)
  const classes = [
    styles.textoHero,
    styles.imgHero,
    styles.quemSomos,
    styles.cardGato
  ];

  classes.forEach((cls) => {
    const els = document.getElementsByClassName(cls);
    Array.from(els).forEach((el) => observer.observe(el));
  });

  return () => observer.disconnect();
}, []);


  const gatinhos = [
    { nome: "Luna", imagem: "/gato1.jpg", descricao: "Doce, tranquila e adora um carinho no colo." },
    { nome: "Tom", imagem: "/gato2.jpg", descricao: "Brincalhão e curioso — impossível não se encantar." },
    { nome: "Mimi", imagem: "/gato3.jpg", descricao: "Calma e observadora, perfeita para lares tranquilos." },
    { nome: "Zeca", imagem: "/gato4.jpg", descricao: "Ativo e carinhoso, vai te seguir por toda parte." },
  ];

  const playSound = () => {
    const audio = document.getElementById("meow-som");
    if (audio) audio.play();
  };

  return (
    <div className={styles.home}>
      {/* ===== NAVBAR ===== */}
      <header className={styles.navbar}>
        <div className={styles.logo}>
          <img src="/logotipo2.png" alt="Logo Resgatinhos Blumenal" />
           <h1>ResGatinhos Blumenau</h1> 
        </div>

        <nav className={styles.navlinks}>
          <Link to="/voluntario">Seja Voluntário</Link>
          <Link to="/como-ajudar">Como Ajudar</Link>
          <Link to="/adotar">Adote</Link>
          <Link to="/contato">Contato</Link>




         {user ? (
  <div className={styles.perfilContainer}>
    <img
      src={user.foto || "/default-avatar.png"}
      alt="Perfil"
      className={styles.fotoPerfil}
      onClick={() => setShowDropdown(!showDropdown)}
    />
              {showDropdown && (
                <div className={styles.dropdownMenu}>
                  <p style={{ color: "#dba511" }}>Bem-vindo, {user.nome}</p>
                  <Link to="/Conta" className={styles.dropdownItem}>Meu Perfil</Link>
                  <Link to="/configuracoes" className={styles.dropdownItem}>Configurações</Link>
                  <button onClick={() => setUser(null)}   className={styles.dropdownSair}>Sair</button>
                  
                </div>
              )}
            </div>
          ) : (
            <div className={styles.authButtons}>
              <button onClick={() => navigate("/login")} className={styles.btnEntrar}>Entrar</button>
              <button onClick={() => navigate("/criar-conta")} className={styles.btnCriarConta}>Criar Conta</button>
            </div>
          )}
        </nav>
      </header>

      {/* ===== MAIN ===== */}
      <main className={styles.mainContent}>
        {/* ===== CARROSSEL ===== */} 
        <section className={styles.bannerSection}> 
          <Slider {...settings}> 
            <div className={styles.bannerItem}> 
              <img src="/banner1.jpg" alt="Banner 1 - Adoção de Gatos" title="Adote um novo amigo" />
               </div>
                <div className={styles.bannerItem}>
                   <img src="/banner2.jpg" alt="Banner 2 - Resgate de Gatos" title="Apoie o Resgate" />
                    </div> 
                    <div className={styles.bannerItem}> 
                      <img src="/banner3.jpg" alt="Banner 3 - Voluntariado" title="Seja um voluntário" /> </div>
                       </Slider> 
                       </section>

        {/* ===== HERO ===== */}
        <section className={styles.hero}>
          <div className={styles.textoHero}>
            <h2>Transforme uma vida.<br />Adote um gatinho.</h2>
            <p>Cada gatinho resgatado carrega uma história de superação. Adote e ganhe um amigo para a vida toda.</p>
            <Link to="/adotar" className={styles.btnHero}>Quero Adotar</Link>
          </div>
          <div className={styles.imgHero}>
            <img src="/gato1.jpg" alt="Gato feliz" />
          </div>
        </section>

 {/* ===== INDICADORES ===== */}
<section className={styles.indicadores}>
  <div className={styles.indicador}>
    <div className={styles.patinhas}></div>
    <h3>+200</h3>
    <p>Gatos adotados</p>
  </div>

  <div className={styles.indicador}>
    <div className={styles.patinhas}></div>
    <h3>+30</h3>
    <p>Voluntários ativos</p>
  </div>

  <div className={styles.indicador}>
    <div className={styles.patinhas}></div>
    <h3>Desde 2019</h3>
    <p>Transformando vidas</p>
  </div>
</section>








        {/* ===== VÍDEO ===== */}
        <section ref={sectionRef} className={styles.videoSecao}>
          
          <h2 className={styles.h2_subtl}>Assista nossa história</h2>
          <div className={styles.videoCard}>
            <video
              ref={videoRef}
              controls
              muted
              poster="/tbmr.png"
              className={styles.video}
            >
              <source src="/gato.mp4" type="video/mp4" />
              Seu navegador não suporta o vídeo.
            </video>
            <div className={styles.videoOverlay}></div>
          </div>
        </section>

      {/* ===== MAPA FUTURISTA ===== */}
 <section className={styles.mapaFuturista}>
     <Particles
  id="tsparticles"
  init={particlesInit}
  className={styles.particles}
  options={{
    fullScreen: { enable: false },
    background: { color: "transparent" },
    fpsLimit: 60,
    particles: {
      number: { value: 35 },
      shape: {
        type: "image",
        image: [
          {
            src: "https://static.vecteezy.com/system/resources/thumbnails/009/303/117/small/cat-paw-clipart-design-illustration-free-png.png", // patinha
            width: 32,
            height: 32,
          },
          {
            src: "https://png.pngtree.com/png-clipart/20250607/original/pngtree-adorable-white-cat-face-illustration-png-image_21135343.png", 
            width: 32,
            height: 32,
          },
          {
            src: "https://images.vexels.com/media/users/3/182540/isolated/preview/4e4dea1edbd0bb51b2fabf78f4b63b7e-curso-de-gato-bonito-jogando-gatinho.png", 
            width: 32,
            height: 32,
          },
          {
            src: "https://cdn-icons-png.flaticon.com/512/833/833472.png", // coração
            width: 28,
            height: 28,
          },
        ],
      },
      color: { value: ["#ffb6c1", "#a3cfff", "#fff7b0", "#d4a5ff"] },
      opacity: { value: 0.9 },
      size: { value: { min: 18, max: 28 } },
      move: {
        enable: true,
        speed: 1.2,
        direction: "none",
        outModes: { default: "out" },
        random: true,
        straight: false,
      },
      rotate: {
        value: { min: 0, max: 360 },
        direction: "random",
        animation: { enable: true, speed: 2 },
      },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "bubble" },
        onClick: { enable: true, mode: "repulse" },
      },
      modes: {
        bubble: { distance: 120, size: 40, duration: 1, opacity: 0.8 },
        repulse: { distance: 150, duration: 0.4 },
      },
    },
    detectRetina: true,
  }}
/>



      <motion.div
        className={styles.mapaGlass}
        whileHover={{
          rotateY: 12,
          rotateX: -6,
          scale: 1.08,
          z: 40,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
      >
        <h2 className={styles.titulo}>Onde Estamos?</h2>
        <p className={styles.descricao}>
          Explore nossa localização no espaço digital — com profundidade e energia futurista.
        </p>

        <motion.div
          className={styles.mapaFrame}
          whileHover={{
            rotateY: -6,
            rotateX: 4,
            scale: 1.05,
          }}
          transition={{ duration: 0.6 }}
        >
          <iframe
            title="Mapa do Abrigo"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3561.2020564696854!2d-49.0902536!3d-26.8016942!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94dee114d4bde35b%3A0xf835e4209ea4be1b!2sCEPREAD!5e0!3m2!1spt-BR!2sbr!4v1761064306882!5m2!1spt-BR!2sbr"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </motion.div>
      </motion.div>
    </section>
  


{/* ===== MISSÃO / VISÃO / VALORES ===== */}
<section className={styles.mvvSection}>
  <h2 > Nosso Propósito</h2>
  <div className={styles.mvvCards}>
    <div className={styles.mvvCard}>
      <img src="/icon-pata.png" alt="Missão" />
      <h3>Missão</h3>
      <p className={styles.mvvCard_p}>Resgatar, cuidar e encontrar lares cheios de amor para gatos em situação de abandono.</p>
    </div>
    <div className={styles.mvvCard}>
      <img src="/icon-coracao.png" alt="Visão" />
      <h3>Visão</h3>
      <p className={styles.mvvCard_p}>Um mundo onde cada gato tenha um lar seguro, amoroso e respeitoso.</p>
    </div>
    <div className={styles.mvvCard}>
      <img src="/icon-amor.png" alt="Valores" />
      <h3>Valores</h3>
      <p className={styles.mvvCard_p}>Empatia, responsabilidade e transparência em cada resgate e adoção.</p>
    </div>
  </div>
</section>








{/* ===== QUEM SOMOS ===== */} 
<section className={styles.quemSomos}> <div className={styles.textoQuemSomos}> 
    <h1 className={styles.h2_tl}>Quem Somos?</h1>  <h2>Projeto ResGatinhos</h2>
    <p> Somos um grupo apaixonado por felinos, dedicado ao resgate,
         cuidado e adoção responsável de gatinhos em situação de abandono.
          Nosso objetivo é transformar histórias de dor em finais felizes, unindo 
          cada bichano a um novo lar cheio de amor.  </p>
           </div> <div className={styles.cardGatoAnimado}>
             <img src="/gato-animado.gif" alt="Gatinho brincando" title="Gatinho resgatado feliz" /> 
             </div> 
             </section> 

             {/* ===== GATINHOS ===== */}
             <h2 className={styles.h2_subtl}>Conheça alguns de nossos gatinhos</h2>
        <div className={styles.gridGatos}>
          {gatinhos.map((gato, i) => (
            <div key={i} className={styles.cardGato}>
              <div className={styles.cardInner}>
                <div className={styles.cardFront}>
                  <img src={gato.imagem} alt={gato.nome} />
                  <h3>{gato.nome}</h3>
                </div>
                <div className={styles.cardBack}>
                  <p>{gato.descricao}</p>
                  <Link to="/adotar" className={styles.btnAdotar}>Adotar</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>





{/* ===== TV ULTRA REALISTA ===== */}
<div className={styles.tvContainer}>
  {/* Tela da TV */}
  <div className={styles.tvScreen}>
    <div className={styles.tvTicker}>
      <span>{canais[canalAtual].noticia}</span>
    </div>
    <div className={styles.tvContent}>
      {canais[canalAtual].imagem.endsWith(".mp4") ? (
        <video
          src={canais[canalAtual].imagem}
          autoPlay
          loop
          muted
          playsInline
          className={styles.tvVideo}
        />
      ) : (
        <img
          src={canais[canalAtual].imagem}
          alt={canais[canalAtual].nome}
          className={styles.tvImage}
        />
      )}
    </div>
  </div>

  {/* Botões laterais */}
  <div className={styles.tvButtons}>
    <div className={styles.btn} onClick={() => trocarCanal("anterior")}></div>
    <div className={styles.btn} onClick={() => trocarCanal("proximo")}></div>
  </div>

  {/* Antena */}
  <div className={styles.tvAntenna}></div>

  {/* Luz de power */}
  <div className={styles.tvPower}></div>

  {/* Rodapé */}
  <div className={styles.tvFooter}>
    <span>{canais[canalAtual].nome}</span>
  </div>
</div>

  








{/* ===== NOTÍCIAS E DICAS ===== */}
<section className={styles.newsSection}>
  <h2> Notícias & Dicas do Mundo Pet</h2>

  <div className={styles.newsGrid}>
    <article className={styles.newsCard}>
      <img src="/vacina.jpg" alt="Vacinação Pet" />
      <div className={styles.newsContent}>
        <h3>Campanha de Vacinação Gratuita</h3>
        <p>Confira as datas da nova campanha de vacinação para cães e gatos no seu bairro.</p>
        <a href="https://www.instagram.com/resgatinhosblumenau/" className={styles.newsLink}>Ler mais →</a>
      </div>
    </article>

    <article className={styles.newsCard}>
      <img src="/alimentacao.jpg" alt="Alimentação saudável" />
      <div className={styles.newsContent}>
        <h3>Como montar uma dieta saudável pro seu pet</h3>
        <p>Veterinários explicam como equilibrar ração e petiscos sem prejudicar a saúde do bichinho.</p>
        <a href="https://www.instagram.com/resgatinhosblumenau/" className={styles.newsLink}>Ler mais →</a>
      </div>
    </article>

    <article className={styles.newsCard}>
      <img src="/adocao.jpeg" alt="Feira de adoção" />
      <div className={styles.newsContent}>
        <h3>Feira de Adoção neste Domingo!</h3>
        <p>Venha conhecer gatinhos e cãezinhos em busca de um lar cheio de amor. </p>
        <a href="https://www.instagram.com/resgatinhosblumenau/" className={styles.newsLink}>Ler mais →</a>
      </div>
    </article>
  </div>
</section>




<section className={styles.depoSection}>
      <h2>Histórias que Derretem o Coração </h2>

      <div className={styles.carousel}>
        {visibleDepoimentos.map((d, i) => (
          <div className={styles.depoCard} key={i}>
            <img src={d.img} alt={d.nome} />
            <p>{d.texto}</p>
            <span>— {d.nome}</span>
          </div>
        ))}
      </div>

      <div className={styles.dots}>
        {Array.from({ length: Math.ceil(depoimentos.length / 3) }).map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`${styles.dot} ${index === i ? styles.active : ""}`}
          />
        ))}
      </div>
    </section>



<div className={styles.cardContainer}>

  {/*  Faça Parte da Mudança */}
  <div className={styles.card}>
    {/* Coração com patinha */}
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <path fill="#333" d="M32 58s-1-.4-1-1c-6-6-11-11-16-16C7 37 4 32 4 26a14 14 0 0126-8 14 14 0 0126 8c0 6-3 11-11 15-5 3-10 8-16 15z"/>
      <circle cx="22" cy="22" r="3" fill="#333"/>
      <circle cx="42" cy="22" r="3" fill="#333"/>
      <circle cx="32" cy="18" r="2.5" fill="#333"/>
      <circle cx="27" cy="27" r="2.5" fill="#333"/>
    </svg>
    <div className={styles.card__content}>
      <p className={styles.card__title}>Faça Parte da Mudança</p>
      <p className={styles.card__description}>
        Adotar é mudar uma vida — e ganhar um amigo fiel.
      </p>
    </div>
  </div>

  {/*  Como Ajudar */}
  <div className={styles.card}>
    {/* Mão segurando coração */}
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 10h4v2h-4v4h-2v-4H7v-2h4V8h2v4z"/>
    </svg>
    <div className={styles.card__content}>
      <p className={styles.card__title}>Como Ajudar</p>
      <p className={styles.card__description}>
        Doe ração, remédios ou tempo. Toda ajuda conta!
      </p>
    </div>
  </div>

  {/* 💌 Transparência */}
  <div className={styles.card}>
    {/* Documento com check */}
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="8" width="40" height="48" rx="4" fill="#333"/>
      <path fill="none" stroke="#fff" strokeWidth="3" d="M22 32l8 8 12-12"/>
    </svg>
    <div className={styles.card__content}>
      <p className={styles.card__title}>Transparência</p>
      <p className={styles.card__description}>
        Doações com clareza e respeito sempre.
      </p>
    </div>
  </div>

  {/* Seja Voluntário */}
  <div className={styles.card}>
    {/* Pessoa com gato */}
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="16" r="8" fill="#333"/>
      <path fill="#333" d="M16 56v-8a12 12 0 0112-12h8a12 12 0 0112 12v8H16z"/>
      <path fill="#333" d="M45 30c2-2 4-2 6 0s2 4 0 6-4 2-6 0-2-4 0-6z"/>
    </svg>
    <div className={styles.card__content}>
      <p className={styles.card__title}>Seja Voluntário</p>
      <p className={styles.card__description}>
        Ajude nos resgates, feiras e redes. Faça parte!
      </p>
    </div>
  </div>

</div>

{/* ===== DOAÇÃO ===== */}
<section className={styles.doacao}>
  <h2>Ajude a Salvar Vidas </h2>
  <p>Com sua doação, garantimos ração, cuidados e muito amor aos gatinhos.</p>
  <div className={styles.doacaoBox}>
    <img src="/qrcode-pix.png" alt="QR Code PIX" />
    <div>
      <p><strong>Chave PIX:</strong> contato@resgatinhosblumenau.com.br</p>
      <p>Ou doe via <a href="#">PicPay</a> / <a href="#">PayPal</a></p>
    </div>
  </div>
</section>



     {/* ===== FOOTER ===== */}
<footer className={styles.rodape}>
  <div className={styles.containerRodape}>
    {/* Coluna 1 — Sobre
    <div className={styles.coluna}>
      <h3>Sobre o ResGatinhos</h3>
      <p>
        Somos uma ONG dedicada a resgatar, cuidar e encontrar lares amorosos para gatinhos
        abandonados. Acreditamos que cada adoção é um novo começo cheio de amor e esperança.
      </p>
    </div> */}

    {/* Coluna 2 — Contato */}
    <div className={styles.coluna}>
      <h3>Contato</h3>
      <p> contato@resgatinhosblumenau.com.br</p>
      <p> (47) 99909-9909</p>
      <p> Rodeio, SC — Brasil</p>
    </div>

    {/* Coluna 3 — Links úteis */}
    <div className={styles.coluna}>
      <h3>Links úteis</h3>
      <ul>
        <li><Link to="/quero-adotar">Quero Adotar</Link></li>
        <li><Link to="/como-ajudar">Doe Agora</Link></li>
        <li><Link to="/voluntario">Seja Voluntário</Link></li>
        <li><Link to="/match">Match</Link></li>
        <li><Link to="/blog">Blog</Link></li>
        
      </ul>
    </div>

    {/* Coluna 4 — Newsletter */}
    <div className={styles.colunaNewsletter}>
      <h3>Fique por dentro </h3>
      <p>Receba novidades sobre adoções, eventos e dicas para cuidar do seu pet:</p>
      <form
  className={styles.formNewsletter}
  action="https://formspree.io/f/xblpvqnj" 
  method="POST"
>
  <input
    type="email"
    name="email"
    placeholder="Digite seu e-mail"
    required
  />
  <button type="submit">Assinar</button>
</form>

    </div>
  </div>

  {/* Frase + Gato */}
  <div className={styles.fraseArea}>
    <p className={styles.frase}>“Amor se adota. Cada lar transforma uma vida.”</p>
    <img
      src="/gato-rodape.png"
      alt="Gatinho rodapé"
      onClick={playSound}
      className={styles.gato}
    />
    <audio id="meow-som">
      <source src="/meow.mp3" type="audio/mpeg" />
    </audio>
  </div>

  {/* Redes sociais */}
  <div className={styles.socialSection}>
    <h3 className={styles.socialTitle}>
      <span className={styles.paws}>Siga-nos</span>
      <span className={styles.paws}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"/></svg></span>
    </h3>
    <div className={styles.socialIcons}>
      <a href="https://instagram.com/resgatinhos" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-instagram"></i>
      </a>
      <a href="https://facebook.com/resgatinhos" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-facebook-f"></i>
      </a>
      <a href="https://tiktok.com/@resgatinhos" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-tiktok"></i>
      </a>
      <a href="https://youtube.com/@resgatinhos" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-youtube"></i>
      </a>
    </div>
  </div>

  {/* Direitos */}
  <div className={styles.copy}>
    <p>© 2025 <strong>ResGatinhos</strong> — Todos os direitos reservados </p>
  </div>
</footer>

    </div>
  );
}
