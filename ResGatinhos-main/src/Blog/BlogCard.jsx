import React, { useRef } from "react";
import styles from "./BlogCard.module.css";
import { useNavigate } from "react-router-dom";

export default function BlogCard({ post }) {
  const card = useRef();
  const navigate = useNavigate();

  function onMove(e) {
    const rect = card.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    card.current.style.transform = `
      rotateY(${x / 22}deg)
      rotateX(${y / -22}deg)
    `;
  }

  function onLeave() {
    card.current.style.transform = "rotateY(0) rotateX(0)";
  }

  return (
    <div
      className={styles.card}
      ref={card}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={() => navigate(`/blog/${post.id}`)}
    >
      <h2 className={styles.title}>{post.title}</h2>
      <p className={styles.preview}>{post.preview}</p>
    </div>
  );
}
