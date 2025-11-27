import React, { useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./page-quero-adotar.module.css";

export default function QueroAdotar() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const gatoSelecionado = params.get("gato");

  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    pais: "",
    estado: "",
    cidade: "",
    motivo: "",
    experiencia: "",
    renda: "",
  });

  const dadosLocalizacao = useMemo(
    () => ({
      Brasil: {
        Acre: ["Rio Branco", "Cruzeiro do Sul", "Sena Madureira"],
        Alagoas: ["Maceió", "Arapiraca", "Palmeira dos Índios"],
        Amapá: ["Macapá", "Santana", "Laranjal do Jari"],
        Amazonas: ["Manaus", "Parintins", "Itacoatiara"],
        Bahia: ["Salvador", "Feira de Santana", "Ilhéus"],
        Ceará: ["Fortaleza", "Juazeiro do Norte", "Sobral"],
        "Distrito Federal": ["Brasília", "Taguatinga", "Ceilândia"],
        "Espírito Santo": ["Vitória", "Vila Velha", "Serra"],
        Goiás: ["Goiânia", "Anápolis", "Aparecida de Goiânia"],
        Maranhão: ["São Luís", "Imperatriz", "Caxias"],
        "Mato Grosso": ["Cuiabá", "Várzea Grande", "Rondonópolis"],
        "Mato Grosso do Sul": ["Campo Grande", "Dourados", "Três Lagoas"],
        "Minas Gerais": ["Belo Horizonte", "Uberlândia", "Juiz de Fora"],
        Pará: ["Belém", "Santarém", "Ananindeua"],
        Paraíba: ["João Pessoa", "Campina Grande", "Patos"],
        Paraná: ["Curitiba", "Londrina", "Maringá"],
        Pernambuco: ["Recife", "Olinda", "Caruaru"],
        Piauí: ["Teresina", "Parnaíba", "Picos"],
        "Rio de Janeiro": ["Rio de Janeiro", "Niterói", "Campos dos Goytacazes"],
        "Rio Grande do Norte": ["Natal", "Mossoró", "Parnamirim"],
        "Rio Grande do Sul": ["Porto Alegre", "Caxias do Sul", "Pelotas"],
        Rondônia: ["Porto Velho", "Ji-Paraná", "Ariquemes"],
        Roraima: ["Boa Vista", "Pacaraima", "Rorainópolis"],
        "Santa Catarina": ["Florianópolis", "Blumenau", "Joinville", "Rodeio"],
        "São Paulo": ["São Paulo", "Campinas", "Santos", "Ribeirão Preto"],
        Sergipe: ["Aracaju", "Nossa Senhora do Socorro", "Lagarto"],
        Tocantins: ["Palmas", "Araguaína", "Gurupi"],
      },
    }),
    []
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePaisChange = (e) => {
    setForm({ ...form, pais: e.target.value, estado: "", cidade: "" });
  };

  const handleEstadoChange = (e) => {
    setForm({ ...form, estado: e.target.value, cidade: "" });
  };

  const handleReset = () => {
    setForm({
      nome: "",
      email: "",
      telefone: "",
      pais: "",
      estado: "",
      cidade: "",
      motivo: "",
      experiencia: "",
      renda: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nome || !form.email || !form.telefone) {
      alert(" Preencha todos os campos obrigatórios!");
      return;
    }
    alert(" Formulário enviado com sucesso!");
    handleReset();
  };

  return (
    <div className={styles.paginaAdotar}>
      {}
      <header className={styles.topo}>
        <h1>Quero Adotar</h1>
        <p>Dê uma nova chance a um gatinho! Preencha o formulário abaixo </p>
        
      </header>

      {}
      <main className={styles.container}>
        <div className={styles.card}>
          <form className={styles.formulario} onSubmit={handleSubmit}>
            <h2>Formulário de Adoção</h2>

            {gatoSelecionado && (
              <div className={styles.infoGatoSelecionado}>
                <p>
                  Você está adotando: <strong>{gatoSelecionado}</strong>
                </p>
              </div>
            )}

            <label>Nome completo</label>
            <input
              name="nome"
              value={form.nome}
              onChange={handleChange}
              placeholder="Seu nome"
              required
            />

            <label>E-mail</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="exemplo@email.com"
              required
            />

            <label>Telefone</label>
            <input
              type="tel"
              name="telefone"
              value={form.telefone}
              onChange={handleChange}
              placeholder="(xx) xxxxx-xxxx"
              required
            />

            <label>País</label>
            <select name="pais" value={form.pais} onChange={handlePaisChange} required>
              <option value="">Selecione um país</option>
              {Object.keys(dadosLocalizacao).map((pais) => (
                <option key={pais} value={pais}>
                  {pais}
                </option>
              ))}
            </select>

            {form.pais && (
              <>
                <label>Estado</label>
                <select
                  name="estado"
                  value={form.estado}
                  onChange={handleEstadoChange}
                  required
                >
                  <option value="">Selecione um estado</option>
                  {Object.keys(dadosLocalizacao[form.pais]).map((estado) => (
                    <option key={estado} value={estado}>
                      {estado}
                    </option>
                  ))}
                </select>
              </>
            )}

            {form.estado && (
              <>
                <label>Cidade</label>
                <select
                  name="cidade"
                  value={form.cidade}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecione uma cidade</option>
                  {dadosLocalizacao[form.pais][form.estado].map((cidade) => (
                    <option key={cidade} value={cidade}>
                      {cidade}
                    </option>
                  ))}
                </select>
              </>
            )}

            <label>Por que deseja adotar?</label>
            <textarea
              name="motivo"
              rows="4"
              value={form.motivo}
              onChange={handleChange}
              maxLength={200}
              placeholder="Conte um pouco..."
              required
            />
            <p className={styles.contador}>{form.motivo.length} / 200 caracteres</p>

            <label>Você já teve animais antes?</label>
            <select
              name="experiencia"
              value={form.experiencia}
              onChange={handleChange}
              required
            >
              <option value="">Selecione</option>
              <option value="sim">Sim</option>
              <option value="nao">Não</option>
            </select>

            <label>Renda mensal</label>
            <input
              type="number"
              name="renda"
              value={form.renda}
              onChange={handleChange}
              placeholder="R$ 4100"
            />

            <div className={styles.botoes}>
              <button type="submit">Enviar Solicitação</button>
              <button
                type="button"
                onClick={handleReset}
                className={styles.botaoReset}
              >
                Limpar
              </button>
            </div>
          </form>
        </div>
      </main>
          <header>
              <button onClick={() => navigate("/")} className={styles.voltarBtn}>
                 <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/></svg>
              </button>
        </header>
     
    </div>
  );
}
