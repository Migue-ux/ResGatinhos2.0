

import React from "react";
import styles from "./Comment.module.css";

export default function Comment({ comment }) {
  
  const avatarSeed = comment.author ? comment.author.split(' ')[0] : 'anonimo';
  
  return (
    <div className={styles.comment}>
      <img 
        src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${avatarSeed}`} 
        alt={`Avatar de ${comment.author}`} 
      />

      <div className={styles.commentBody}>
        <strong>{comment.author}</strong>
        {/* Exibe a data do comentário */}
        <span className={styles.commentDate}> • {comment.date}</span> 
        <p>{comment.text}</p>
      </div>
    </div>
  );
}