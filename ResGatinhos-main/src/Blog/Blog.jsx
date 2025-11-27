// Blog.jsx

import React, { useEffect, useState } from "react";
import styles from "./Blog.module.css";
import blogApi from "./blogApi";
import { useNavigate } from "react-router-dom";
// Importa o hook de autenticação
import { useAuth } from "../Auth/AuthContext"; 

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
 
  const { user, isLoggedIn } = useAuth();

  
  const isAdmin = isLoggedIn && user && user.role === 'admin'; 
  
  
 
  const handleCreatePost = () => {
      navigate('/blog/editor');
  };

  useEffect(() => {
    const fetchPosts = async () => {
        try {
            setIsLoading(true);
            const data = await blogApi.getPosts();
            setPosts(data);
        } catch (error) {
            console.error("Erro ao carregar lista de posts:", error);
        } finally {
            setIsLoading(false);
        }
    };
    fetchPosts();
  }, []);

  if (isLoading) return <h1>Carregando posts...</h1>;

  const handleNavigate = (postId) => {
    navigate(`/blog/post/${postId}`); 
  };

  return (
    <div className={styles.blogContainer}>
      
      <div className={styles.header}>
        <h1>Blog ResGatinhos</h1>
        
        {/* 2. BOTÃO VISÍVEL APENAS PARA ADMINS */}
        {isAdmin && (
            <button 
                className={styles.createButton} 
                onClick={handleCreatePost}
            >
                 Novo Post
            </button>
        )}
      </div>
      
      {posts.length === 0 && !isLoading && (
        <p>Nenhum post disponível no momento.</p>
      )}

      <div className={styles.postsGrid}>
        {posts.map(post => (
          <div
            key={post.id}
            className={styles.postCard}
            onClick={() => handleNavigate(post.id)}
          >
            <h2>{post.title}</h2>
            <p>{post.excerpt || (post.content && post.content.substring(0, 150) + '...')}</p> 

            <div className={styles.tags}>
              {post.categories && post.categories.map((c, i) => (
                <span key={i} className={styles.tag}>{c}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}