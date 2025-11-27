import React from "react";
import styles from "./AdminDashboard.module.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <motion.h1
        className={styles.title}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        Painel Administrativo
      </motion.h1>

      {/* CARDS */}
      <div className={styles.cards}>
        {[
          { label: "Gatos Cadastrados", value: 45 },
          { label: "Adoções Pendentes", value: 7 },
          { label: "Voluntários", value: 18 },
          { label: "Doações (R$)", value: "1.240,00" },
        ].map((item, i) => (
          <motion.div
            key={i}
            className={styles.card}
            whileHover={{ scale: 1.05, rotateX: 8, rotateY: 8 }}
            transition={{ type: "spring", stiffness: 150 }}
          >
            <h2>{item.label}</h2>
            <p>{item.value}</p>
          </motion.div>
        ))}
      </div>

      <h2 className={styles.subtitle}>Últimas Solicitações</h2>

      {/* TABELA */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Gato</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Ana Souza</td>
              <td>Mingau</td>
              <td>
                <span className={`${styles.tag} ${styles.pending}`}>Pendente</span>
              </td>
              <td className={styles.actions}>
                <button className={`${styles.btn} ${styles.approve}`}>Aprovar</button>
                <button className={`${styles.btn} ${styles.reject}`}>Recusar</button>
              </td>
            </tr>

            <tr>
              <td>Lucas Andrade</td>
              <td>Frajola</td>
              <td>
                <span className={`${styles.tag} ${styles.approved}`}>Aprovado</span>
              </td>
              <td className={styles.actions}>
                <button className={`${styles.btn} ${styles.disabled}`}>✔</button>
              </td>
            </tr>

            <tr>
              <td>Julia Silva</td>
              <td>Luna</td>
              <td>
                <span className={`${styles.tag} ${styles.pending}`}>Pendente</span>
              </td>
              <td className={styles.actions}>
                <button className={`${styles.btn} ${styles.approve}`}>Aprovar</button>
                <button className={`${styles.btn} ${styles.reject}`}>Recusar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* BOTÕES DE AÇÃO */}
      <div className={styles.actionArea}>
        <button className={styles.actionBtn} onClick={() => navigate("/admin")}>
          Cadastrar Novo Gato
        </button>

        <button className={styles.actionBtn} onClick={() => navigate("/Sejavoluntario")}>
          Ver Voluntários
        </button>

        <button className={styles.actionBtn} onClick={() => navigate("/adotar")}>
          Gerenciar Doações
        </button>
      </div>
    </div>
  );
}
