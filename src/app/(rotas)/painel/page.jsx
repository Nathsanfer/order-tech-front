"use client";

import { useEffect, useState } from "react";
import styles from "./painel.module.css";
import Link from "next/link";

export default function Page() {
  const [pedidos, setPedidos] = useState([]);

  
  useEffect(() => {
    // Atualiza os pedidos do localStorage a cada 1s
    const interval = setInterval(() => {
      const pedidosSalvos = JSON.parse(localStorage.getItem("pedidos") || "[]");
      setPedidos(pedidosSalvos);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <h1>Order Tech</h1>
          <p>Painel da Cozinha</p>
        </div>
        <div className={styles.headerButtons}>
          <Link href="/senhas" className={styles.senhasBtn}>
            Senhas
          </Link>
        </div>
      </header>

      <div className={styles.cardsWrapper}>
        {pedidos.length === 0 && (
          <p style={{ color: "#fff", textAlign: "center", fontSize: 20 }}>
            Nenhum pedido no momento...
          </p>
        )}

        {pedidos.map((pedido, index) => (
          <div key={pedido.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Senha {pedido.senha}</h2>
              <div className={styles.badge}>{index + 1}</div>
            </div>

            {/* LISTA DE ITENS DO PEDIDO */}
            {pedido.itens.map((item, i) => (
              <div key={i} className={styles.itemGroup}>
                <p className={styles.itemTitle}>
                  {item.quantidade}x {item.nome}
                </p>

                <label className={styles.label}>Observações:</label>
                <input
                  className={styles.input}
                  value={item.observacoes || "Nenhuma"}
                  readOnly
                />
              </div>
            ))}

            <button className={styles.finalizadoBtn}>Finalizado!</button>
          </div>
        ))}
      </div>

      <div className={styles.patternBottom}></div>
    </main>
  );
}
