// blogApi.js

const API_URL = "http://localhost:3001";

async function getPosts() {
  const res = await fetch(`${API_URL}/posts`);
  
  if (!res.ok) throw new Error("Erro ao buscar posts: " + res.statusText);
  return res.json();
}

async function getPost(id) {
  
  const res = await fetch(`${API_URL}/posts/${id}?_embed=comments`);
  if (!res.ok) throw new Error("Post não encontrado ou erro de rede.");
  return res.json();
}

async function createPost(post) {
  const res = await fetch(`${API_URL}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post)
  });

  if (!res.ok) throw new Error("Erro ao criar post: " + res.statusText);
  return res.json();
}

async function addComment(postId, comment) {
  
  const res = await fetch(`${API_URL}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    //
    body: JSON.stringify({ postId, ...comment }) 
  });

  if (!res.ok) throw new Error("Erro ao enviar comentário: " + res.statusText);
  return res.json();
}

export default {
  getPosts,
  getPost,
  createPost,
  addComment
};