const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Conexão com o banco
const db = new sqlite3.Database("./banco.sqlite", (err) => {
  if (err) console.log(err);
  else console.log("Banco conectado!");
});

// Criação da tabela se não existir
db.run(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    email TEXT UNIQUE,
    senha TEXT
  )
`);

// Cadastro
app.post("/cadastrar", (req, res) => {
  const { nome, email, senha } = req.body;
  db.run(
    "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)",
    [nome, email, senha],
    function (err) {
      if (err) return res.status(400).json({ error: "Email já cadastrado" });
      res.json({ id: this.lastID, nome, email });
    }
  );
});

// Login
app.post("/login", (req, res) => {
  const { email, senha } = req.body;
  db.get(
    "SELECT * FROM usuarios WHERE email = ? AND senha = ?",
    [email, senha],
    (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(400).json({ error: "Email ou senha incorretos" });
      res.json(row);
    }
  );
});

// Servidor rodando
app.listen(3001, () => console.log("✅ Servidor rodando na porta 3001"));
