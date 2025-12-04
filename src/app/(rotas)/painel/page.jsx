import styles from "./painel.module.css";
import Link from "next/link";

export default function Page() {
  const pedidos = [
    { id: 12233 },
    { id: 12234 },
    { id: 12235 },
    { id: 12236 },
  ];

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <h1>Order Tech</h1>
          <p>Painel da Cozinha</p>
        </div>
        <div className={styles.headerButtons}>
          <Link href="/senhas" className={styles.senhasBtn}>Senhas</Link>
        </div>
      </header>

      <div className={styles.cardsWrapper}>
        {pedidos.map((pedido, index) => (
          <div key={pedido.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>#{pedido.id}</h2>
              <div className={styles.badge}>{index + 1}</div>
            </div>

            <div className={styles.itemGroup}>
              <p className={styles.itemTitle}>2x Big Smash</p>
              <label className={styles.label}>Observações:</label>
              <input className={styles.input} value="Sem Cebola, Sem Picles" readOnly />
            </div>

            <div className={styles.itemGroup}>
              <p className={styles.itemTitle}>1x Grande Batata com cheddar e bacon</p>
              <label className={styles.label}>Observações:</label>
              <input className={styles.input} value="Null" readOnly />
            </div>

            <div className={styles.itemGroup}>
              <p className={styles.itemTitle}>2x Churros</p>
              <label className={styles.label}>Observações:</label>
              <input className={styles.input} value="Null" readOnly />
            </div>

            <button className={styles.finalizadoBtn}>Finalizado!</button>
          </div>
        ))}
      </div>

      <div className={styles.patternBottom}></div>
    </main>
  );
}
