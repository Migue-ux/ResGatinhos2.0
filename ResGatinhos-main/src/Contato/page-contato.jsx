import React, { useState } from "react";
import styles from "./page-contato.module.css";
import { useNavigate } from "react-router-dom";


export default function Contato() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: "",
    email: "",
    mensagem: "",
  });

  const [faqAberto, setFaqAberto] = useState(null);
  const [politicaAberta, setPoliticaAberta] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleReset = () =>
    setForm({
      nome: "",
      email: "",
      mensagem: "",
    });
const numeroWhats = process.env.REACT_APP_WHATSAPP_NUMBER || "554799339038"; // 55 = Brasil, 47 = DDD
const mensagem = encodeURIComponent(
  "Olá! Gostaria de mais informações sobre a adoção de gatinhos pelo ResGatinhos."
);
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Mensagem enviada com sucesso! ");
    handleReset();
  };

  const faqs = [
    {
      pergunta: "Como posso adotar um gatinho?",
      resposta: "Você pode navegar até a página de adoção, escolher um gato e preencher o formulário de adoção."
    },
    {
      pergunta: "Quanto custa adotar?",
      resposta: "A adoção é gratuita, mas é necessário cumprir os requisitos do formulário de adoção."
    },
    {
      pergunta: "Como funciona a entrega do gato?",
      resposta: "Após a aprovação do formulário, entraremos em contato para agendar a entrega segura do gato."
    }
  ];

  const politicas = [
    {
      titulo: "Política de Privacidade",
      conteudo: "Seus dados são confidenciais e usados apenas para fins de adoção."
    },
    {
      titulo: "Termos de Uso",
      conteudo: "Ao adotar, você concorda em cuidar do animal com responsabilidade."
    },
    {
      titulo: "Contato",
      conteudo: "contato@resgatinhos.com | +55 47 9933-9038"
    }
  ];

  return (
    <div className={styles.paginaContato}>
      <header className={styles.topo}>
        <h1>Contato</h1>
        <p> <strong>Estamos aqui para te ouvir!</strong> <br /> Entre em contato ou veja nossas perguntas frequentes.</p>
      </header>

      <main className={styles.container}>
        {/* Formulário de contato */}
        <div className={styles.card}>
          <h2>Fale Conosco</h2>
          <form className={styles.formulario} onSubmit={handleSubmit}>
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              placeholder="Seu nome"
              required
            />

            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="exemplo@email.com"
              required
            />

            <label htmlFor="mensagem">Mensagem</label>
            <textarea
              id="mensagem"
              name="mensagem"
              value={form.mensagem}
              onChange={handleChange}
              placeholder="Escreva sua mensagem..."
              rows="5"
              maxLength={500}
              required
            />
            <p className={styles.contador}>{form.mensagem.length} / 500 caracteres</p>

            <div className={styles.botoes}>
              <button type="submit">Enviar</button>
              <button type="button" onClick={handleReset} className={styles.botaoReset}>
                Limpar
              </button>
            </div>
          </form>
        </div>

        {/* FAQ Accordion */}
        <div className={styles.card}>
          <h2>Perguntas Frequentes (FAQ)</h2>
          {faqs.map((item, index) => (
            <div key={index} className={styles.accordionItem}>
              <div
                className={styles.accordionHeader}
                onClick={() => setFaqAberto(faqAberto === index ? null : index)}
              >
                {item.pergunta}
                <span>{faqAberto === index ? "▲" : "▼"}</span>
              </div>
              {faqAberto === index && <div className={styles.accordionContent}>{item.resposta}</div>}
            </div>
          ))}
        </div>

        {/* Políticas Accordion */}
        <div className={styles.card}>
          <h2>Políticas e Informações</h2>
          {politicas.map((item, index) => (
            <div key={index} className={styles.accordionItem}>
              <div
                className={styles.accordionHeader}
                onClick={() => setPoliticaAberta(politicaAberta === index ? null : index)}
              >
                {item.titulo}
                <span>{politicaAberta === index ? "▲" : "▼"}</span>
              </div>
              {politicaAberta === index && <div className={styles.accordionContent}>{item.conteudo}</div>}
            </div>
          ))}
        </div>
      </main>

      <a
        href={`https://wa.me/${numeroWhats}?text=${mensagem}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className={styles.botaoWhats}>
         <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="m40-40 78-268q-19-41-28.5-84T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80q-45 0-88-9.5T308-118L40-40Zm118-118 128-38q14-4 28.5-3t27.5 7q32 16 67 24t71 8q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 36 8 71t24 67q7 13 7.5 27.5T196-286l-38 128Zm282-162h80v-120h120v-80H520v-120h-80v120H320v80h120v120Zm39-159Z"/></svg>
        </button>
      </a>

            <header>
                        <button onClick={() => navigate("/")} className={styles.voltarBtn}>
                           <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/></svg>
                        </button>
                  </header>


      <footer className={styles.rodape}>
        © 2025 ResGatinhos — Amor que transforma vidas
      </footer>
    </div>
  );
}
