'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import styles from '../cardapio.module.css';
import { addToCart } from '../../../../lib/cart';

export default function ProdutoDetalhe() {
  const params = useParams();
  const router = useRouter();
  const { id } = params || {};

  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    async function fetchWithFallback(id) {
      setLoading(true);
      setError(null);
      let lastErr = null;

      const candidateUrls = [
        `/api/menu/${id}`,
        `/menu/${id}`,
        `http://localhost:5001/menu/${id}`,
        `http://127.0.0.1:5001/menu/${id}`,
        `http://localhost:5001/api/menu/${id}`,
        `http://127.0.0.1:5001/api/menu/${id}`,
      ];

      for (const url of candidateUrls) {
        try {
          const res = await fetch(url);
          if (!res.ok) throw new Error(`Erro HTTP ${res.status}`);
          const data = await res.json();
          // se retornou objeto do produto
          if (data && (data.id || data._id || data.name || data.nome)) {
            setProduto(data);
            setLoading(false);
            return;
          }
          // se veio um array, pegar primeiro
          if (Array.isArray(data) && data.length) {
            const found = data.find((p) => String(p.id) === String(id) || String(p.id_item) === String(id) || String(p._id) === String(id));
            if (found) {
              setProduto(found);
              setLoading(false);
              return;
            }
          }
        } catch (e) {
          // eslint-disable-next-line no-console
          console.warn('[ProdutoDetalhe] fetch failed for', url, e?.message || e);
          lastErr = e;
        }
      }

      // fallback: buscar lista global e filtrar
      try {
        const listUrls = ['/api/menu', '/menu', 'http://localhost:5001/menu', 'http://127.0.0.1:5001/menu'];
        for (const u of listUrls) {
          try {
            const r = await fetch(u);
            if (!r.ok) continue;
            const list = await r.json();
            if (Array.isArray(list)) {
              const found = list.find((p) => String(p.id) === String(id) || String(p.id_item) === String(id) || String(p._id) === String(id));
              if (found) {
                setProduto(found);
                setLoading(false);
                return;
              }
            }
          } catch (e) {
            lastErr = e;
          }
        }
      } catch (e) {
        lastErr = e;
      }

      setError(lastErr?.message || 'Produto não encontrado');
      setLoading(false);
    }

    fetchWithFallback(id);
  }, [id]);

  if (loading) return <div className={styles.container}><p>Carregando...</p></div>;
  if (error) return <div className={styles.container}><p style={{ color: 'red' }}>Erro: {error}</p></div>;
  if (!produto) return <div className={styles.container}><p>Produto não encontrado.</p></div>;

  const nome = produto.name || produto.nome || 'Item';
  const descricao = produto.description || produto.descricao || '';
  const preco = produto.cost ?? produto.preco ?? 0;
  const imagem = produto.imageUrl || produto.imagem || '/lancheYummy.png';

  return (
    <div className={styles.container}>
      <button onClick={() => router.back()} className={styles.categoriaBtn} style={{ margin: 16 }}>Voltar</button>
      <div style={{ display: 'flex', gap: 24, padding: 16 }}>
        <img src={imagem} alt={nome} style={{ width: 240, height: 180, objectFit: 'cover' }} />
        <div>
          <h1>{nome}</h1>
          <p>{descricao}</p>
          <p style={{ fontWeight: '700' }}>R$ {Number(preco).toFixed(2).replace('.', ',')}</p>
          <div style={{ marginTop: 12 }}>
            <button
              className={styles.addBtn}
              onClick={() => {
                addToCart(produto, 1);
                try { window.dispatchEvent(new Event('storage')); } catch(e){}
              }}
            >
              + Adicionar ao carrinho
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
