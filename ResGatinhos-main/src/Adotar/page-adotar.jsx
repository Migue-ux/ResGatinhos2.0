
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./page-adotar.module.css";

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


const MaleIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden>
    <circle cx="9" cy="9" r="5" fill="#2E93EC" /> {/* azul */}
    <path
      d="M21 3v4h-4"
      
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

const FemaleIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden>
    <circle cx="12" cy="7" r="5" fill="#e62796ff" /> {/* rosa */}
    <path
      d="M12 12v8"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <path
      d="M9 20h6"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

const CalendarIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden>
    <rect x="3" y="5" width="18" height="16" rx="2" ry="2" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 3v4M8 3v4M3 11h18" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);


const GatoCard = React.memo(function GatoCard({ gato, onAdotar }) {
  const imgRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!imgRef.current) return;
    if ("IntersectionObserver" in window) {
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisible(true);
              obs.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "300px" }
      );
      obs.observe(imgRef.current);
      return () => obs.disconnect();
    } else {
      // fallback
      setVisible(true);
    }
  }, []);

  // srcset com tentativa de WebP (unsplash serve WebP com &fm=webp)
  const base = gato.imagem;
  const srcSet = `${base}&fm=webp&w=400 400w, ${base}&fm=webp&w=800 800w, ${base}&fm=webp&w=1200 1200w`;
  const fallback = `${base}&w=800`;

  return (
    <article className={styles.cardGato}>
      <div className={styles.cardMedia} ref={imgRef} aria-hidden>
        {!visible && <div className={styles.mediaPlaceholder} />}
        {visible && (
          <picture>
            <source srcSet={srcSet} type="image/webp" />
            <img
              src={fallback}
              srcSet={`${base}&w=400 400w, ${base}&w=800 800w, ${base}&w=1200 1200w`}
              sizes="(max-width: 600px) 100vw, 300px"
              alt={gato.nome}
              className={`${styles.imagemGato} ${loaded ? styles.imgVisible : styles.imgHidden}`}
              onLoad={() => setLoaded(true)}
              decoding="async"
              loading="lazy"
              width="1200"
              height="800"
            />
          </picture>
        )}
      </div>

      <div className={styles.cardBody}>
        <div className={styles.cardHeader}>
          <h3 className={styles.gatoNome}>{gato.nome}</h3>
          <div className={styles.gatoMeta}>
            <span className={styles.idade}><CalendarIcon className={styles.iconCalendar} /> {formatAge(gato.idadeMonths)}</span>
            <span className={styles.genero}>{gato.genero === "Macho" ? <MaleIcon className={styles.iconGenderMale} /> : <FemaleIcon className={styles.iconGenderFemale} />}</span>
          </div>
        </div>

        <p className={styles.gatoDesc}>{gato.descricao}</p>

        <div className={styles.cardFooter}>
          <button className={styles.botaoAdotar} onClick={() => onAdotar(gato)}>
            Quero Adotar
          </button>
        </div>
      </div>
    </article>
  );
});
GatoCard.displayName = "GatoCard";


export default function Adotar() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [openFilters, setOpenFilters] = useState(false);
  const [genderFilter, setGenderFilter] = useState("");
  const [ageFilter, setAgeFilter] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const handleAdotar = useCallback(
    (gato) => {
      navigate(`/quero-adotar?gato=${encodeURIComponent(gato.nome)}`);
    },
    [navigate]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = CATS.filter((g) => {
      const matchName = g.nome.toLowerCase().includes(q);
      const matchGender = genderFilter ? g.genero === genderFilter : true;
      const matchAge =
        !ageFilter ||
        (ageFilter === "filhote" && g.idadeMonths < 12) ||
        (ageFilter === "1-2" && g.idadeMonths >= 12 && g.idadeMonths <= 24) ||
        (ageFilter === "3+" && g.idadeMonths >= 36);
      return matchName && matchGender && matchAge;
    });

    if (sortBy === "nome-asc") list.sort((a, b) => a.nome.localeCompare(b.nome));
    else if (sortBy === "idade-asc") list.sort((a, b) => a.idadeMonths - b.idadeMonths);
    else if (sortBy === "idade-desc") list.sort((a, b) => b.idadeMonths - a.idadeMonths);

    return list;
  }, [query, genderFilter, ageFilter, sortBy]);

  return (
    <div className={styles.paginaAdotar}>
      <header className={styles.topo}>
        <div className={styles.topoInner}>
          <div>
            <h1>Quero Adotar</h1>
            <p >Dê uma nova chance a um gatinho!</p>

          </div>

          <div className={styles.actionsRow}>
            <div className={styles.searchWrap}>
              <svg className={styles.iconSearch} viewBox="0 0 24 24" aria-hidden>
                <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <circle cx="10.5" cy="10.5" r="5.5" stroke="currentColor" strokeWidth="1.6" fill="none" />
              </svg>
              <input className={styles.inputBusca} placeholder="Buscar por nome..." value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>

            <button className={styles.btnFiltro} onClick={() => setOpenFilters((s) => !s)} aria-expanded={openFilters}>
              <svg viewBox="0 0 24 24" aria-hidden><path d="M3 5h18M7 12h10M10 19h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
              Filtros
            </button>
          </div>
        </div>

        <div className={`${styles.panelFiltros} ${openFilters ? styles.open : ""}`}>
          <div className={styles.filtrosInner}>
            <div className={styles.filtroCol}>
              <label className={styles.label}>Gênero</label>
              <div className={styles.generoBtns}>
                <button className={`${styles.chip} ${genderFilter === "" ? styles.activeChip : ""}`} onClick={() => setGenderFilter("")}>Todos</button>
                <button className={`${styles.chip} ${genderFilter === "Macho" ? styles.activeChip : ""}`} onClick={() => setGenderFilter("Macho")}><MaleIcon className={styles.iconMiniMale} /> </button>
                <button className={`${styles.chip} ${genderFilter === "Fêmea" ? styles.activeChip : ""}`} onClick={() => setGenderFilter("Fêmea")}><FemaleIcon className={styles.iconMiniFemale} /> </button>
              </div>
            </div>

      

            {/* === FILTRO: IDADE === */}
            <div className={styles.filtroCol}>
              <label className={styles.label} htmlFor="filtroIdade">Idade</label>

              <div className={styles.selectWrap}>
                <select
                  id="filtroIdade"
                  className={styles.selectFiltro}
                  value={ageFilter}
                  onChange={(e) => setAgeFilter(e.target.value)}
                >
                  <option value="">Todas</option>
                  <option value="filhote">Filhote (&lt;1 ano)</option>
                  <option value="1-2">1 — 2 anos</option>
                  <option value="3+">3 anos ou mais</option>
                </select>
              </div>
            </div>

            {/* === FILTRO: ORDENAR === */}
            <div className={styles.filtroCol}>
              <label className={styles.label} htmlFor="filtroOrdenar">Ordenar</label>

              <div className={styles.selectWrap}>
                <select
                  id="filtroOrdenar"
                  className={styles.selectFiltro}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="relevance">Mais relevantes</option>
                  <option value="nome-asc">Nome A → Z</option>
                  <option value="idade-asc">Idade: jovem → velho</option>
                  <option value="idade-desc">Idade: velho → jovem</option>
                </select>
              </div>
            </div>


            <div className={styles.actionsFiltros}>
              <button className={styles.btnClear} onClick={() => { setGenderFilter(""); setAgeFilter(""); setQuery(""); setSortBy("relevance"); }}>Limpar</button>
              <button className={styles.btnApply} onClick={() => setOpenFilters(false)}>Aplicar</button>
            </div>
          </div>
        </div>
      </header>

      <main className={styles.container}>
        <section className={styles.gridGatos}>
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <article key={i} className={`${styles.cardGato} ${styles.skeleton}`}>
                  <div className={styles.skelThumb} />
                  <div className={styles.skelBody}>
                    <div className={styles.skelLineShort} />
                    <div className={styles.skelLine} />
                    <div className={styles.skelLine} />
                    <div className={styles.skelButton} />
                  </div>
                </article>
              ))
            : filtered.length > 0
            ? filtered.map((g) => <GatoCard key={g.id} gato={g} onAdotar={handleAdotar} />)
            : <div className={styles.naoEncontrado}>Nenhum gatinho encontrado — tente outros filtros.</div>}
        </section>
      </main>

              // Dentro do return de Adotar(), no .topoInner, por exemplo:
        <button onClick={() => navigate('/match')} className={styles.btnModoMatch}>
          Modo "Match"
        </button>
        
      <button onClick={() => navigate("/")} className={styles.voltarBtn} title="Voltar para Home">
        <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20" fill="#fff"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" /></svg>
      </button>

     
    </div>
  );
}
