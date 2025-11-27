// Editor.jsx

import React, { useState } from "react";
import styles from "./Editor.module.css";
import blogApi from "./blogApi";
import { useNavigate } from "react-router-dom";

export default function Editor() {
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  // Função para navegar de volta para a lista do blog sem salvar
  const handleCancel = () => {
    // Redireciona o usuário para /blog
    navigate("/blog");
  };

  async function handleSubmit(e) {
    e.preventDefault();
    
    // Verificação mínima para campos vazios
    if (!title.trim() || !content.trim()) {
        alert("O título e o conteúdo não podem estar vazios.");
        return;
    }

    try {
      await blogApi.createPost({
        title,
        content,
        categories: categories.split(",").map(c => c.trim()),
        author: "Admin", // Você pode buscar o nome do autor aqui usando useAuth()
        date: new Date().toLocaleDateString(),
        comments: []
      });

      alert("Post publicado com sucesso!");
      navigate("/blog"); // Redireciona para a lista após publicar
    } catch (err) {
      console.error("Erro ao publicar:", err);
      alert("Erro ao publicar. Verifique o console.");
    }
  }

  return (
    <div className={styles.editorWrap}>
      
      {/* Container para o cabeçalho e botões */}
      <div className={styles.editorHeader}>
       
        <button 
            className={styles.cancelBtn} 
            onClick={handleCancel}
        >
            Cancelar
        </button>
      </div>

      <input
        className={styles.titleInput}
        placeholder="Título do post..."
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <input
        className={styles.categoryInput}
        placeholder="Categorias (separadas por vírgula)"
        value={categories}
        onChange={e => setCategories(e.target.value)}
      />

      <textarea
        className={styles.editor}
        placeholder="Digite o texto aqui..."
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      
      {/* 1. Botão "Publicar" dentro de um formulário ou junto ao botão de voltar */}
      <div className={styles.actionButtons}>
        <button 
            className={styles.publishBtn} 
            onClick={handleSubmit}
        >
          Publicar Post
        </button>
      </div>
    </div>
  );
}