import React, { useState } from 'react';
import styles from './SejaVoluntario.module.css';
import { Link } from 'react-router-dom';

function SejaVoluntario() {


    
    const FORMSPREE_URL = 'https://formspree.io/f/xjkazrwd';

    const [enviado, setEnviado] = useState(false);
    const [enviando, setEnviando] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEnviando(true);

        const form = e.target;
        const data = new FormData(form);

        try {
            const response = await fetch(
                FORMSPREE_URL,
                {
                    method: 'POST',
                    body: data,
                    headers: {
                        'Accept': 'application/json'
                    }
                }
            );

            if (response.ok) {
                setEnviado(true);
                form.reset();

                setTimeout(() => setEnviado(false), 4000);
            } else {
                alert("Ocorreu um erro ao enviar o formulário. Tente novamente.");
            }
        } catch (error) {
            alert("Erro de conexão. Verifique sua rede.");
        } finally {
            setEnviando(false);
        }
    };

     const playSound = () => {
    const audio = document.getElementById("meow-som");
    if (audio) audio.play();
  };

    return (
        <main>

            <div className={styles.heroSection}>
                <img src="/banner-voluntarios.png" alt="Cartaz Voluntários" className={styles.heroImg} />
            </div>

            <div className={styles.whyVolunteerSection}>
                <h2 className={styles.whyVolunteerTitle}>Por que ser voluntário?</h2>
                <p className={styles.whyVolunteerText}>
                    Ser voluntário no Resgatinhos é mais do que ajudar – é fazer parte de uma transformação real.
                    Cada minuto dedicado significa alimento, cuidados médicos e a chance de um lar para gatinhos que antes não tinham esperança.
                    <br />
                    <strong>Seu tempo pode mudar destinos.</strong>
                </p>
            </div>

            <div className={styles.servicesContainer}>
                <div className={styles.cardsGrid}>

                    <div className={styles.flipCard}>
                        <div className={styles.flipCardInner}>
                            <div className={styles.flipCardFront}>
                                <img src="https://img.icons8.com/?size=100&id=uQ1nuyyLK1WM&format=png&color=000000" alt="Ícone de Alimentação" className={styles.cardPngIcon} />
                                <p className={styles.cardTitle}>Alimentação e Cuidados</p>
                            </div>
                            <div className={styles.flipCardBack}>
                                <p className={styles.cardTitle}>Nutrição</p>
                                <p className={styles.cardBackText}>Ajude a garantir que nossos gatinhos tenham ração de qualidade e água fresca todos os dias.</p>
                            </div>
                        </div>
                    </div>


                    <div className={styles.flipCard}>
                        <div className={styles.flipCardInner}>
                            <div className={styles.flipCardFront}>
                                <img src="https://img.icons8.com/?size=100&id=jDTMXUGahtEq&format=png&color=000000" alt="Ícone de Lar Temporário" className={styles.cardPngIcon} />
                                <p className={styles.cardTitle}>Lar Temporário</p>
                            </div>
                            <div className={styles.flipCardBack}>
                                <p className={styles.cardTitle}>Acolhimento</p>
                                <p className={styles.cardBackText}>Ofereça um abrigo seguro e amoroso enquanto eles aguardam uma família definitiva.</p>
                            </div>
                        </div>
                    </div>


                    <div className={styles.flipCard}>
                        <div className={styles.flipCardInner}>
                            <div className={styles.flipCardFront}>
                                <img src="https://img.icons8.com/?size=100&id=vox5kPxooOLa&format=png&color=000000" alt="Ícone de Captador" className={styles.cardPngIcon} />
                                <p className={styles.cardTitle}>Captador(a) de Recursos</p>
                            </div>
                            <div className={styles.flipCardBack}>
                                <p className={styles.cardTitle}>Apoio Financeiro</p>
                                <p className={styles.cardBackText}>Ajude a organizar eventos e campanhas para arrecadar fundos para veterinários e remédios.</p>
                            </div>
                        </div>
                    </div>


                    <div className={styles.flipCard}>
                        <div className={styles.flipCardInner}>
                            <div className={styles.flipCardFront}>
                                <img src="https://img.icons8.com/?size=100&id=103407&format=png&color=000000" alt="Ícone de Divulgação" className={styles.cardPngIcon} />
                                <p className={styles.cardTitle}>Divulgação</p>
                            </div>
                            <div className={styles.flipCardBack}>
                                <p className={styles.cardTitle}>Marketing</p>
                                <p className={styles.cardBackText}>Use suas habilidades de comunicação para encontrar novos lares e divulgar nossa causa nas redes sociais.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className={styles.formSection}>
                <p>Se deseja se tornar um voluntário preencha o formulário de inscrição.</p>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <p className={styles.formTitle}>Formulário de Inscrição</p>
                    <p className={styles.message}>Junte-se a nós e ajude a salvar vidas felinas!</p>

                    <label>
                        <input className={styles.input} type="text" name="nome" placeholder=" " required />
                        <span>Nome completo</span>
                    </label>
                    <label>
                        <input className={styles.input} type="tel" name="telefone" placeholder=" " required />
                        <span>Telefone / WhatsApp</span>
                    </label>
                    <label>
                        <input className={styles.input} type="email" name="email" placeholder=" " required />
                        <span>E-mail</span>
                    </label>
                    <label>
                        <textarea className={`${styles.input} ${styles.textarea}`} name="disponibilidade" placeholder=" " required></textarea>
                        <span>Disponibilidade (dias e horários)</span>
                    </label>
                    <label>
                        <textarea className={`${styles.input} ${styles.textarea}`} name="area" placeholder=" " required></textarea>
                        <span>Área em que gostaria de ajudar</span>
                    </label>

                    <button type="submit" className={styles.submit} disabled={enviando}>
                        {enviando ? 'Enviando...' : 'Enviar Inscrição'}
                    </button>

                    {enviado && (
                        <p className={styles.successMessage}>
                            Formulário enviado com sucesso! Nossa equipe entrará em contato em breve.
                        </p>
                    )}
                </form>
            </div>


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

        </main>
    );
}

export default SejaVoluntario;