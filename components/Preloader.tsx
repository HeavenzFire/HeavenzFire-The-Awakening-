import React from 'react';

const Preloader: React.FC = () => {
  const styles = `
    .preloader-container {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #0a0a1a;
      height: 100vh;
      width: 100vw;
    }
    .atom {
      position: relative;
      width: 100px;
      height: 100px;
    }
    .atom .line {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      height: 100%;
      border: 2px solid transparent;
      border-radius: 50%;
      border-top-color: #06b6d4;
      animation: rotate 2s linear infinite;
    }
    .atom .line:nth-child(1) {
      transform: rotateZ(120deg) rotateX(66deg) rotateY(0deg);
    }
    .atom .line:nth-child(2) {
      transform: rotateZ(240deg) rotateX(66deg) rotateY(0deg);
    }
    .atom .line:nth-child(3) {
      transform: rotateZ(360deg) rotateX(66deg) rotateY(0deg);
    }
    .atom .nucleus {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 10px;
      height: 10px;
      background: #e0e0e0;
      border-radius: 50%;
      box-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #06b6d4;
    }
    @keyframes rotate {
      100% {
        transform: rotateZ(360deg);
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="preloader-container">
        <div className="atom">
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
          <div className="nucleus"></div>
        </div>
      </div>
    </>
  );
};

export default Preloader;
