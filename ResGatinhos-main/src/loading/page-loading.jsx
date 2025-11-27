import React from "react";
import styled, { keyframes } from "styled-components";

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="cat-container">
        <div className="cat">
          <div className="ear ear--left" />
          <div className="ear ear--right" />
          <div className="face">
            <div className="eye eye--left" />
            <div className="eye eye--right" />
            <div className="nose" />
            <div className="whiskers whiskers--left" />
            <div className="whiskers whiskers--right" />
          </div>
          <div className="body" />
          <div className="tail" />
        </div>
        {/* <div className="yarn" /> */}
      </div>

      <p>Carregando os gatinhos...</p>
    </StyledWrapper>
  );
};

// ==== ANIMAÇÕES ====

const pawMove = keyframes`
  0%, 100% { background-position: 0 0; }
  50% { background-position: 50px 50px; }
`;

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const tailMove = keyframes`
  0%, 100% { transform: rotate(10deg); }
  50% { transform: rotate(-10deg); }
`;

// ==== ESTILO PRINCIPAL ====

const StyledWrapper = styled.div`
  height: 100vh;
  background: #fff9f9c7;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  font-family: "Poppins", sans-serif;
  position: relative;

  /* Padrão de patinhas no fundo */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: url("https://png.pngtree.com/png-vector/20250606/ourlarge/pngtree-adorable-white-cat-face-illustration-png-image_16478037.png");
    background-repeat: repeat;
    background-size: 60px;
    opacity: 0.05;
    animation: ${pawMove} 8s linear infinite;
  }

  .cat-container {
    position: relative;
    width: 160px;
    height: 160px;
    animation: ${bounce} 1.8s ease-in-out infinite;
  }

  .cat {
    position: absolute;
    bottom: 10px;
    left: 40px;
    width: 80px;
    height: 80px;
  }

  .ear {
    width: 20px;
    height: 20px;
    background: #f1c8c8;
    border-radius: 4px;
    position: absolute;
    top: -10px;
    transform: rotate(45deg);
  }

  .ear--left {
    left: 10px;
  }
  .ear--right {
    right: 10px;
  }

  .face {
    width: 80px;
    height: 70px;
    background: #ffdcdc;
    border-radius: 50% 50% 45% 45%;
    position: relative;
    z-index: 2;
  }

  .eye {
    width: 10px;
    height: 10px;
    background: #333;
    border-radius: 50%;
    position: absolute;
    top: 28px;
  }

  .eye--left {
    left: 20px;
  }

  .eye--right {
    right: 20px;
  }

  .nose {
    width: 10px;
    height: 6px;
    background: pink;
    border-radius: 50%;
    position: absolute;
    top: 42px;
    left: 35px;
  }

  .whiskers {
    width: 25px;
    height: 2px;
    background: #555;
    position: absolute;
    top: 45px;
  }

  .whiskers--left {
    left: -20px;
  }

  .whiskers--right {
    right: -20px;
  }

  .body {
    width: 60px;
    height: 50px;
    background: #ffdcdc;
    border-radius: 50% 50% 30% 30%;
    position: absolute;
    bottom: 0;
    left: 10px;
  }

  .tail {
    position: absolute;
    width: 50px;
    height: 10px;
    background: #ffdcdc;
    border-radius: 50px;
    bottom: 10px;
    right: -35px;
    transform-origin: left center;
    animation: ${tailMove} 1.5s ease-in-out infinite;
  }

  .yarn {
    width: 50px;
    height: 50px;
    border: 4px solid #b48efc;
    border-radius: 50%;
    position: absolute;
    bottom: 0;
    right: 10px;
    animation: ${spin} 2s linear infinite;
  }

  p {
    margin-top: 40px;
    font-size: 1.2rem;
    color: #b48efc;
    font-weight: 600;
    letter-spacing: 1px;
    text-shadow: 0 0 5px rgba(180, 142, 252, 0.3);
  }
`;

export default Loader;
