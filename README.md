# ResGatinhos Blumenau: Um Lar Cheio de Amor

## Visão Geral do Projeto

**ResGatinhos Blumenau** é uma plataforma digital desenvolvida para ser o ponto de encontro entre gatinhos resgatados e seus futuros lares. Nosso objetivo principal é **incentivar a adoção responsável**, promover o **voluntariado** e facilitar as **doações/apadrinhamentos** para garantir o bem-estar e a saúde dos felinos em Blumenau e região.

Acreditamos que todo gatinho merece uma segunda chance. Este site atua como um portal transparente e acolhedor, simplificando o processo de encontrar um companheiro peludo e apoiar a causa animal.


<img width="200" height="200" alt="image" src="https://github.com/user-attachments/assets/aa1f1c31-e21e-4d44-b782-39021dad1d48" />


---

## Funcionalidades Principais

| Módulo | Funcionalidade Detalhada | Status |
| :--- | :--- | :--- |
| **Página Inicial** (`/`) | Apresentação do projeto, destaques dos gatinhos para adoção (slideshow) e estatísticas de sucesso (gatos adotados). | Completa |
| **Adoção** (`/adotar`) | Galeria completa dos gatos disponíveis, com **filtros avançados** (idade, sexo, temperamento) e pesquisa por nome. | Completa |
| **Voluntariado** (`/sejavoluntario`) | Cadastro para **Respadrinhos** com múltipla escolha de áreas de atuação: lar temporário, transporte, divulgação em redes sociais e feiras. | Completa |
| **Apoio e Ajuda** (`/comoajudar`) | Guia completo sobre formas de contribuição: doações financeiras (PIX/QR Code), doação de insumos (ração, areia) e apadrinhamento de custos veterinários. | Completa |
| **Autenticação** | Login (`/entrar`) e Cadastro (`/cadastrar`) de usuários (adotantes e voluntários) com validação de email. | Completa |
| **Conta do Usuário** (`/conta`) | **Dashboard** para o usuário acompanhar o status de suas solicitações (adoção/voluntariado) e editar dados cadastrais. | Completa |
| **Blog & Notícias** (`/blog`) | Seção para postar artigos sobre cuidados felinos, dicas de saúde e histórias emocionantes de resgate e adoção. | Completa |
| **Administração** (`/admin`) | Painel restrito para gestão de **usuários**, **gatos** (cadastro, edição, remoção), **solicitações** e **conteúdo do Blog/Eventos**. | Completa |
| **Eventos** (`/events`) | Divulgação de feiras de adoção e eventos de arrecadação de fundos com data, local e mapa de acesso. | Completa |

---

## Design & Layout

O design é **acolhedor** e **coeso**, utilizando uma paleta de cores inspirada na ternura e alegria felina (roxo, rosa e amarelo). O layout é totalmente **responsivo**, garantindo uma experiência de usuário impecável em qualquer dispositivo:

* **Tipografia:** Utilizamos a **Google Fonts** para garantir uma leitura agradável e personalidade ao projeto.
* **Elementos Gráficos:** Ícones customizados, fotos de alta qualidade dos gatinhos e detalhes visuais como patinhas.
* **Responsividade:** Implementado com **Flexbox** e **CSS Grid** para adaptação perfeita em **mobile**, **tablet** e **desktop**.

---

## Stack Tecnológico

Este projeto foi construído como uma Single Page Application (SPA) utilizando o ecossistema React.

### Frontend:
* **Framework:** **React.js** (Versão Atual)
* **Navegação:** **React Router DOM** para o gerenciamento de rotas.
* **Estilização:** **CSS3** Modularizado (garantindo escopo de componentes e evitando conflitos).
* **Ícones:** Biblioteca de ícones (ex: Font Awesome ou React Icons).

### Estrutura de Rotas (Baseada na Estrutura de Pastas)

A navegação é gerenciada pelo React Router DOM, mapeando cada componente de página:

| Rota | Componente | Descrição |
| :--- | :--- | :--- |
| `/` | `Home` | Landing page principal |
| `/entrar` | `Entrar` | Tela de Login |
| `/cadastrar` | `Cadastrar` | Tela de Registro de Novo Usuário |
| `/adotar` | `Adotar` | Galeria de gatos disponíveis |
| `/sejavoluntario` | `pages/SejaVoluntario` | Formulário para ser voluntário |
| `/comoajudar` | `pages/ComoAjudar` | Informações de apoio e doações |
| `/blog` | `Blog` | Lista de artigos |
| `/events` | `Events` | Lista de eventos |
| `/conta` | `Conta` | Perfil do usuário |
| `/admin` | `Admin` | Painel de administração (Protegido) |
| `/*` | `Erro` | Página 404 (Not Found) |

---

## Como Rodar o Projeto Localmente

Siga estas instruções para configurar e executar o projeto em sua máquina local.

### Pré-requisitos

Você precisa ter o **Node.js** e o **npm** (incluso no Node.js) instalados:

1.  **Instalar Node.js:**
    * Acesse: [https://nodejs.org/](https://nodejs.org/)
    * Baixe e instale a versão **LTS (Recomendada)**.
2.  **Verificação:** Abra o terminal e confirme as versões:
    ```bash
    node -v
    npm -v
    ```

### Passos de Instalação

1.  **Clonar o Repositório:**
    ```bash
    git clone [https://github.com/MaisaPereiraMarcal/ResGatinhos.git](https://github.com/MaisaPereiraMarcal/ResGatinhos.git)
    ```

2.  **Acessar a Pasta do Projeto:**
    ```bash
    cd ResGatinhos/ResGatinhos
    ```
    (Ajuste o caminho conforme sua estrutura local)

3.  **Instalar Dependências:**
    ```bash
    npm install
    ```

4.  **Iniciar o Servidor Local:**
    ```bash
    npm start
    ```
    O aplicativo será aberto automaticamente no seu navegador em: `http://localhost:3000`.

---

## Roadmap de Próximos Passos

O projeto está em constante evolução. Nossas próximas prioridades incluem:

* **Integração com API:** Conectar o frontend a um backend (Node.js/Firebase) para gestão dinâmica de dados (gatos, usuários, blog).
* **Sistema de Notificações:** Alertar usuários sobre mudanças de status em suas solicitações de adoção.
* **Otimização SEO:** Melhorar a indexação das páginas para que mais pessoas encontrem o projeto.
* **Testes Unitários:** Implementar testes (ex: Jest/Enzyme) para garantir a estabilidade do código.

---

## Créditos e Contribuições

Este é um projeto acadêmico desenvolvido com paixão e dedicação.

**Desenvolvido por:**
* Camila Medeiros
* Maisa Pereira
* Miguel Ferreira
* Samuel Soares

**Projeto acadêmico — Curso Técnico em Informática**
**Escola de Educação Básica "Osvaldo Cruz"**
**Rodeio - SC**
**2025**

---

> “Nós merecemos um lar cheio de amor.”
> — Equipe ResGatinhos Blumenau
