import styles from "./senhas.module.css";

export default function Page() {
  return (
    <div className={styles.container}>
      
      {/* Topo com padrão */}
      <div className={styles.patternTop}></div>

      <div className={styles.content}>
        <div className={styles.column}>
          <h2>Em preparo</h2>

          <button className={styles.box}>#12233</button>
          <button className={styles.box}>#12234</button>
          <button className={styles.box}>#12235</button>
          <button className={styles.box}>#12236</button>
        </div>

        <div className={styles.centerImage}></div>

        <div className={styles.column}>
          <h2>Finalizado</h2>

          <button className={styles.box}>#12233</button>
          <button className={styles.box}>#12234</button>
          <button className={styles.box}>#12235</button>
          <button className={styles.box}>#12236</button>
        </div>
      </div>

      {/* Rodapé com padrão */}
      <div className={styles.patternBottom}></div>

    </div>
  );
}
