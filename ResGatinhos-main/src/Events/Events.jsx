// src/Events/Events.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// IMPORTAÇÕES CORRETAS:
import EventModal from "./EventModal.jsx";
import styles from "./events.module.css";

import { motion, AnimatePresence } from "framer-motion";

const API = process.env.REACT_APP_EVENTS_API || "/api/events";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  async function fetchEvents() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API);
      if (!res.ok) throw new Error("Falha ao buscar eventos");

      const data = await res.json();
      data.sort((a, b) => new Date(a.date) - new Date(b.date));

      setEvents(data);
    } catch (err) {
      setError(err.message || "Erro");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  function handleNewEvent(created) {
    setEvents(prev => {
      const arr = [...prev, created];
      arr.sort((a, b) => new Date(a.date) - new Date(b.date));
      return arr;
    });
    setOpenModal(false);
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm("Remover esse evento?");
    if (!confirmDelete) return;

    const previous = [...events];
    setEvents(events.filter(e => e.id !== id));

    try {
      const res = await fetch(`${API}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erro ao deletar");
    } catch (err) {
      alert("Erro ao deletar no servidor. Voltando ao estado anterior.");
      setEvents(previous);
    }
  }

  return (
    <div className={styles.eventsContainer}>
      <div className={styles.eventsHeader}>
        <h1>Eventos</h1>
        <div className={styles.headerActions}>
          <button
            className={`${styles.btn} ${styles.ghost}`}
            onClick={() => fetchEvents()}
          >
            Atualizar
          </button>

          <button className={styles.btn} onClick={() => setOpenModal(true)}>
            + Criar evento
          </button>
        </div>
      </div>

      {loading && <p className={styles.muted}>Carregando eventos...</p>}
      {error && <p className={`${styles.muted} ${styles.error}`}>Erro: {error}</p>}

      <AnimatePresence mode="popLayout">
        <motion.div
          layout
          className={styles.eventsGrid}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {events.map(ev => (
            <motion.article
              layout
              key={ev.id}
              className={styles.eventCard}
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -8, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div className={styles.eventMedia}>
                <div className={styles.placeholder}>📅</div>
              </div>

              <div className={styles.eventBody}>
                <div className={styles.eventHeader}>
                  <h3>{ev.title}</h3>
                  <span className={styles.date}>
                    {new Date(ev.date).toLocaleDateString()}
                  </span>
                </div>

                <p className={styles.desc}>{ev.description}</p>

                <div className={styles.eventActions}>
                  <Link
                    to={`/events/${ev.id}`}
                    className={`${styles.btn} ${styles.ghost} ${styles.small}`}
                  >
                    Detalhes
                  </Link>

                  <button
                    className={`${styles.btn} ${styles.small}`}
                    onClick={() => window.alert("Inscrição simulada :)")}
                  >
                    Quero participar
                  </button>

                  <button
                    className={`${styles.btn} ${styles.small} ${styles.danger}`}
                    onClick={() => handleDelete(ev.id)}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </AnimatePresence>

      <EventModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onCreate={handleNewEvent}
        apiUrl={API}
      />
    </div>
  );
}
