import React, { useState } from 'react';
import styles from './ComoAjudar.module.css';
import { Link } from 'react-router-dom';

const BANNER_IMAGE = '/banner-ajuda.png';
const CAT_EATING_IMAGE = 'https://animais.culturamix.com/blog/wp-content/uploads/2020/11/Gato-se-Alimentando.jpg';
const APADRINHAMENTO_IMAGE = 'https://cdn0.peritoanimal.com.br/pt/posts/5/8/0/os_gatos_reconhecem_as_pessoas_24085_600.jpg';
const LAR_TEMPORARIO_IMAGE = 'https://img.freepik.com/fotos-premium/mulher-segurando-gato-brincando-em-casa-com-amor-por-gatos-o-sorriso-brilha-em-seu-vinculo-com-seu-gato-fofo-de-estimacao-a-relacao-entre-pessoas-e-gatos-donos-de-gatos-gatos-domesticos-gatos-gordos_24883-5022.jpg';
const DIVULGACAO_IMAGE = 'https://i2-prod.mirror.co.uk/incoming/article11890336.ece/ALTERNATES/s615b/Screen-Shot-2018-01-21-at-122505JPG.jpg';
const PARCERIA_IMAGE = 'https://blog-static.petlove.com.br/wp-content/uploads/2022/05/meu-gato-no-vet-Petlove.jpg';

const helpCards = [
  {
    headline: "Apadrinhe um amigo de quatro patas!",
    description: "Escolha um gatinho para ajudar mensalmente. Você pode contribuir com vacinas, alimentação ou cuidados veterinários - e ainda acompanhar de perto o progresso do seu afilhado.",
    imageSrc: APADRINHAMENTO_IMAGE,
    bgColor: "purple",
  },
  {
    headline: "Ofereça abrigo, ofereça esperança.",
    description: "Seja um lar temporário e acolha um animal até que ele encontre sua família definitiva. Ideal para quem ama animais, mas não pode adotar em definitivo.",
    imageSrc: LAR_TEMPORARIO_IMAGE,
    bgColor: "yellow",
  },
  {
    headline: "Use suas redes para espalhar amor.",
    description: "Compartilhe as fotos dos animais disponíveis, as campanhas e eventos do projeto. Quanto mais gente souber, mais chances de adoção!",
    imageSrc: DIVULGACAO_IMAGE,
    bgColor: "yellow",
  },
  {
    headline: "Juntos, negócios e corações transformam o mundo.",
    description: "Pet shops, clínicas veterinárias e comércios locais podem colaborar com doações, descontos e apoio a campanhas.",
    imageSrc: PARCERIA_IMAGE,
    bgColor: "purple",
  },
];

function ComoAjudar() {

   const playSound = () => {
    const audio = document.getElementById("meow-som");
    if (audio) audio.play();
  };

  const donationItems = [
    {
      name: "Ração",
      desc: "Seca, úmida, patês e sachês.",
      src: "https://cdn-icons-png.flaticon.com/512/1145/1145697.png"
    },
    {
      name: "Areia e Higiene",
      desc: "Areia higiênica e caixas novas.",
      src: "https://img.icons8.com/?size=100&id=ZKAK_hw7x9Dv&format=png&color=000000"
    },
    {
      name: "Farmácia",
      desc: "Medicamentos, vitaminas, vermífugos.",
      src: "https://cdn-icons-png.flaticon.com/512/528/528302.png"
    },
    {
      name: "Limpeza",
      desc: "Sabão, água sanitária e desinfetantes.",
      src: "https://img.icons8.com/?size=100&id=qPLRjLU77DtL&format=png&color=000000"
    },
    {
      name: "Conforto",
      desc: "Cobertores, toalhas e caminhas.",
      src: "https://cdn-icons-png.flaticon.com/512/11361/11361052.png"
    },
    {
      name: "Transporte",
      desc: "Caixas de transporte e comedouros.",
      src: "https://img.icons8.com/?size=100&id=w09NL61Lg27t&format=png&color=000000"
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.bannerSection}>
        <img
          src={BANNER_IMAGE}
          alt="Sua Ajuda Salva Vidas! Contribua com o cuidado e a adoção dos nossos animais."
          className={styles.bannerImage}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://placehold.co/1200x400/C0A7D8/FFFFFF?text=Banner+Ajuda';
          }}
        />
      </div>

      <div className={styles.contentWrapper}>
        <h2 className={styles.mainTitle}>Formas de Ajudar</h2>

        <section className={styles.donationSection}>
          <h3 className={styles.sectionTitle}>Mimos e Itens Essenciais</h3>
          <div className={styles.sectionContent}>
            <div className={styles.itemList}>
              <p className={styles.sectionDescription}>
                Nossos gatinhos precisam de itens para crescerem fortes e saudáveis.
                Sua doação de itens faz uma diferença enorme no dia a dia do abrigo.
              </p>

              <div className={styles.creativeGrid}>
                {donationItems.map((item, index) => (
                  <div key={index} className={styles.creativeItem}>
                    <img src={item.src} alt={item.name} className={styles.itemIconImage} />
                    <div className={styles.itemText}>
                      <h4 className={styles.listTitle}>{item.name}</h4>
                      <p className={styles.itemDesc}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/contato" className={`${styles.contactButton} ${styles.primaryBtn}`}>
                Combinar Entrega de Itens
              </Link>
            </div>

            <div className={styles.itemImageContainer}>
              <img
                src={CAT_EATING_IMAGE}
                alt="Gatinho comendo ração"
                className={styles.itemImage}
              />
            </div>
          </div>
        </section>

        <section className={styles.cardsSection}>
          {helpCards.map((card, index) => (
            <div key={index} className={`${styles.helpCard} ${styles[`card-${card.bgColor}`]}`}>
              <div className={styles.cardContent}>
                <div className={styles.cardImageContainer}>
                  <img
                    src={card.imageSrc}
                    alt={`Imagem de ${card.headline}`}
                    className={styles.cardImage}
                  />
                </div>
                <div className={styles.cardText}>
                  <h4 className={styles.cardHeadline}>{card.headline}</h4>
                  <p className={styles.cardDescription}>{card.description}</p>
                </div>
              </div>
            </div>
          ))}
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
    </div>
  );
}

export default ComoAjudar;
