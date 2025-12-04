
"use client";

import { useEffect, useState } from "react";
import styles from "./senhas.module.css";
import Link from "next/link";

export default function Page() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const loadPedidos = () => {
      try {
        const pedidosSalvos = JSON.parse(localStorage.getItem("pedidos") || "[]");
        // garante array e ordena do mais recente para o mais antigo
        const ordenados = Array.isArray(pedidosSalvos)
          ? pedidosSalvos.slice().sort((a, b) => {
              const ta = a.criadoEm ? new Date(a.criadoEm).getTime() : Number(a.id) || 0;
              const tb = b.criadoEm ? new Date(b.criadoEm).getTime() : Number(b.id) || 0;
              return tb - ta;
            })
          : [];
        setPedidos(ordenados);
      } catch (e) {
        console.error("Erro ao carregar pedidos:", e);
        setPedidos([]);
      }
    };

    // carga inicial
    loadPedidos();

    // atualiza quando outra aba/janela modifica localStorage
    const onStorage = (e) => {
      if (e.key === "pedidos") loadPedidos();
    };
    window.addEventListener("storage", onStorage);

    // fallback: mantém compatibilidade com atualizações no mesmo contexto
    const interval = setInterval(loadPedidos, 1000);

    return () => {
      window.removeEventListener("storage", onStorage);
      clearInterval(interval);
    };
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

              {/* mostra badge e status */}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div className={styles.badge}>{index + 1}</div>
                <div
                  title={`Status: ${pedido.status || "Pendente"}`}
                  style={{
                    color: "#fff",
                    fontWeight: 700,
                    padding: "4px 8px",
                    borderRadius: 6,
                    background:
                      (pedido.status || "").toLowerCase() === "finalizado"
                        ? "rgba(0,200,0,0.12)"
                        : (pedido.status || "").toLowerCase() === "pronto"
                        ? "rgba(0,150,255,0.12)"
                        : "rgba(255,165,0,0.08)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    fontSize: 12,
                    textTransform: "capitalize",
                  }}
                >
                  {pedido.status || "Pendente"}
                </div>
              </div>
            </div>

            {/* LISTA DE ITENS DO PEDIDO */}
            {(pedido.itens || []).map((item, i) => (
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
