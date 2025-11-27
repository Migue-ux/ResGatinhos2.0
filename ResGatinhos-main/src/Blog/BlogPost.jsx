// BlogPost.jsx - Versão Final

import React, { useEffect, useState } from "react";
import styles from "./BlogPost.module.css";
import blogApi from "./blogApi";
import { useParams, Link } from "react-router-dom";

// Importa o hook do Contexto de Autenticação
import { useAuth } from "../Auth/AuthContext"; 
// Caminho para o componente Comment (Ajuste se o caminho for diferente, ex: "../../components/Comment/Comment")
import Comment from "./Comment"; 

export default function BlogPost() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [comment, setComment] = useState("");
    const [shouldRefresh, setShouldRefresh] = useState(0); 
    const [isLoading, setIsLoading] = useState(true);
    
    // OBTENDO DADOS DO AUTOR USANDO O CONTEXTO
    const { user, isLoggedIn } = useAuth(); 
    
    // === MUDANÇA PRINCIPAL AQUI ===
    // Se o usuário estiver logado, usa user.nome. Se não estiver, usa string vazia ('').
    const currentAuthorName = user ? user.nome : ''; 

    
    const fetchPost = async () => {
        try {
            setIsLoading(true);
            const data = await blogApi.getPost(id);
            setPost(data);
        } catch (error) {
            console.error("Erro ao buscar post:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchPost();
        }
    }, [id, shouldRefresh]);

    if (isLoading) return <h1>Carregando...</h1>;
    if (!post) return <h1>Post não encontrado.</h1>;

    async function sendComment() {
        if (!isLoggedIn) {
            alert("Você precisa estar logado para comentar.");
            return;
        }
        
        if (comment.trim() === "") {
            alert("O comentário não pode ser vazio.");
            return;
        }

        try {
            const newCommentData = {
                // Usa o nome real do autor
                author: currentAuthorName, 
                text: comment,
                date: new Date().toLocaleString('pt-BR')
            };
            
            await blogApi.addComment(post.id, newCommentData);
            
            setComment("");
            setShouldRefresh(prev => prev + 1); 

            alert("Comentário enviado! Lista atualizada.");
            
        } catch (error) {
            console.error("Erro ao enviar comentário:", error);
            alert("Erro ao enviar comentário. Verifique o console.");
        }
    }

    return (
        <div className={styles.postWrap}>
            <h1>{post.title}</h1>
            <p className={styles.date}>{post.date}</p>
            
            {/* Renderização do conteúdo HTML */}
            <div 
                className={styles.content} 
                dangerouslySetInnerHTML={{ __html: post.content }} 
            />

            <h3>Comentários ({post.comments ? post.comments.length : 0})</h3> 

            <div className={styles.commentList}>
                {post.comments && post.comments.length > 0 ? (
                    post.comments.map((c) => (
                        <Comment key={c.id || Math.random()} comment={c} /> 
                    ))
                ) : (
                    <p>Seja o primeiro a deixar um comentário!</p>
                )}
            </div>

            <div className={styles.commentSection}>
                {/* === MUDANÇA NA APRESENTAÇÃO DO NOME === */}
                <h4>
                    {isLoggedIn 
                        ? `Comentar como: ${currentAuthorName}` 
                        : "Faça Login para Comentar"}
                </h4>
                
                <textarea
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    // Placeholder dinâmico
                    placeholder={isLoggedIn ? `Escreva seu comentário, ${currentAuthorName}...` : "Você precisa estar logado para comentar."}
                    rows="4"
                    disabled={!isLoggedIn} 
                />

                <button 
                    onClick={sendComment} 
                    disabled={!isLoggedIn || comment.trim() === ""}
                >
                    {isLoggedIn ? "Enviar Comentário" : "Fazer Login para Comentar"}
                </button>
                
                {!isLoggedIn && (
                    <p className={styles.loginPrompt}>Você precisa <Link to="/login">entrar</Link> ou <Link to="/criar-conta">cadastrar-se</Link> para interagir.</p>
                )}
            </div>
        </div>
    );
}