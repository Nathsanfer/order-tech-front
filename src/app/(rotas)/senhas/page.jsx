"use client";

import { useEffect, useState } from "react";
import styles from "./senhas.module.css";
import Image from "next/image";

export default function SenhasPage() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const loadPedidos = () => {
      try {
        const pedidosSalvos = JSON.parse(localStorage.getItem("pedidos") || "[]");
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

    loadPedidos();

    const onStorage = (e) => {
      if (e.key === "pedidos") loadPedidos();
    };
    window.addEventListener("storage", onStorage);

    const interval = setInterval(loadPedidos, 1000);

    return () => {
      window.removeEventListener("storage", onStorage);
      clearInterval(interval);
    };
  }, []);

  // Separa pedidos em preparo e finalizados
  const emPreparo = pedidos.filter(p => !p.status || p.status.toLowerCase() !== "finalizado");
  const finalizados = pedidos.filter(p => p.status && p.status.toLowerCase() === "finalizado");

  return (
    <main className={styles.container}>
      {/* Padrão Superior */}
      <div className={styles.patternTop}></div>

      {/* Conteúdo Central */}
      <div className={styles.content}>
        {/* Coluna Em Preparo */}
        <div className={styles.column}>
          <h2>Em preparo</h2>
          {emPreparo.length === 0 ? (
            <div className={styles.box}>Nenhum pedido</div>
          ) : (
            emPreparo.slice(0, 4).map((pedido) => (
              <div key={pedido.id} className={styles.box}>
                #{pedido.senha}
              </div>
            ))
          )}
        </div>

        {/* Imagem Central */}
        <div className={styles.centerImage}>
          <Image
            src="/images/albertopng.png"
            alt="Alberto Mascote"
            width={400}
            height={475}
            priority
          />
        </div>

        {/* Coluna Finalizado */}
        <div className={styles.column}>
          <h2>Finalizado</h2>
          {finalizados.length === 0 ? (
            <div className={styles.box}>Nenhum pedido</div>
          ) : (
            finalizados.slice(0, 4).map((pedido) => (
              <div key={pedido.id} className={styles.box}>
                #{pedido.senha}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Padrão Inferior */}
      <div className={styles.patternBottom}></div>
    </main>
  );
}
