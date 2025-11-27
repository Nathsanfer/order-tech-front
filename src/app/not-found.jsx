import React from 'react';
import styles from "./not-found.module.css";

const NotFound = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img src="/albertotristinho.png" alt="Imagem de erro 404" className={styles.image} />
        <h1 className={styles.title}>404</h1>
        <p className={styles.message}>Não foi possível encontrar a página :/</p>
        <a href="/" className={styles.link}>Voltar para o início</a>
      </div>
    </div>
  );
};

export default NotFound;