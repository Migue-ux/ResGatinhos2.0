// mock-server.js
// Uso: node mock-server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(cors());
app.use(bodyParser.json());

let events = [
  { id: "1", title: "Feira de Adoção - Praça Central", date: "2025-12-10", description: "Traga a família!" },
  { id: "2", title: "Campanha de Ração", date: "2025-12-21", description: "Doações de ração e material." },
];

// GET /api/events
app.get("/api/events", (req, res) => {
  res.json(events);
});

// GET /api/events/:id
app.get("/api/events/:id", (req, res) => {
  const ev = events.find(e => e.id === req.params.id);
  if (!ev) return res.status(404).json({ error: "Not found" });
  res.json(ev);
});

// POST /api/events
app.post("/api/events", (req, res) => {
  const { title, date, description } = req.body;
  if (!title || !date) return res.status(400).json({ error: "Missing title or date" });
  const newEv = { id: String(Date.now()), title, date, description };
  events.push(newEv);
  res.status(201).json(newEv);
});

// DELETE /api/events/:id
app.delete("/api/events/:id", (req, res) => {
  const id = req.params.id;
  const idx = events.findIndex(e => e.id === id);
  if (idx === -1) return res.status(404).json({ error: "Not found" });
  events.splice(idx, 1);
  res.json({ ok: true });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Mock server running on http://localhost:${PORT}`));
