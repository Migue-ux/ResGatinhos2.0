import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./eventModal.module.css"; // AGORA É MODULE

export default function EventModal({ open, onClose, onCreate, apiUrl }) {
  const [form, setForm] = useState({ title: "", date: "", description: "" });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.title || !form.date)
      return alert("Título e data são obrigatórios.");

    setLoading(true);
    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Erro no servidor");

      const created = await res.json();
      onCreate(created);

      setForm({ title: "", date: "", description: "" });
    } catch (err) {
      alert("Erro ao criar evento: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={styles.modal}
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={e => e.stopPropagation()}
          >
            <h3 className={styles.title}>Criar Evento</h3>

            <form onSubmit={handleSubmit} className={styles.form}>
              <input
                name="title"
                placeholder="Título"
                value={form.title}
                onChange={handleChange}
                className={styles.input}
              />

              <input
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                className={styles.input}
              />

              <textarea
                name="description"
                placeholder="Descrição (opcional)"
                value={form.description}
                onChange={handleChange}
                className={styles.textarea}
              />

              <div className={styles.actions}>
                <button
                  type="button"
                  className={`${styles.btn} ${styles.ghost}`}
                  onClick={onClose}
                  disabled={loading}
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className={styles.btn}
                  disabled={loading}
                >
                  {loading ? "Salvando..." : "Salvar"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
