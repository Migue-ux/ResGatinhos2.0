import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import SejaVoluntario from './pages/SejaVoluntario';
import ComoAjudar from './pages/ComoAjudar';
import Adote from './pages/Adote';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Conta from './pages/Conta';
function App() {

  return (
    <BrowserRouter>

      <Header />

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<SejaVoluntario />} />
        <Route path="/como-ajudar" element={<ComoAjudar />} />
        <Route path="/adote" element={<Adote />} />
        <Route path="/entrar" element={<Login />} />
        <Route path="/cadastrar" element={<Cadastro />} />
        <Route path="/conta" element={<Conta />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;