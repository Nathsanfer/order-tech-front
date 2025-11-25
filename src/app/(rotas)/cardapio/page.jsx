'use client';

import React, { useEffect, useState } from 'react';
import styles from './cardapio.module.css';
import Link from 'next/link';
import { GiBasket, GiHamburger, GiFrenchFries, GiSodaCan, GiIceCreamCone } from "react-icons/gi";
import { addToCart, getCartCount } from '../../../lib/cart';
import { useRouter } from 'next/navigation';

export default function Cardapio() {
  const categorias = [
    { id: 'lanches', nome: 'Lanches', icone: 'hamburger' },
    { id: 'complementos', nome: 'Complementos', icone: 'fries' },
    { id: 'bebidas', nome: 'Bebidas', icone: 'soda' },
    { id: 'sobremesas', nome: 'Sobremesas', icone: 'icecream' }
  ];

  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usedUrl, setUsedUrl] = useState(null);
  const [attemptedLogs, setAttemptedLogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(categorias[0].nome);
  const [cartCount, setCartCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    // sincronizar badge do carrinho com localStorage
    try {
      setCartCount(getCartCount());
      const onStorage = () => setCartCount(getCartCount());
      window.addEventListener('storage', onStorage);
      return () => window.removeEventListener('storage', onStorage);
    } catch (e) {
      // ignore
    }
    async function fetchWithFallback(urls) {
      setLoading(true);
      setError(null);
      let lastErr = null;
      for (const url of urls) {
        // record attempt
        setAttemptedLogs((s) => [...s, `Tentativa: ${url}`]);
        try {
          // eslint-disable-next-line no-console
          console.log('[Cardapio] tentando', url);
          const res = await fetch(url);
          if (!res.ok) throw new Error(`Erro HTTP ${res.status}`);
          const data = await res.json();
          if (Array.isArray(data)) {
            setProdutos(data);
            setUsedUrl(url);
            setAttemptedLogs((s) => [...s, `Sucesso: ${url}`]);
            setLoading(false);
            return;
          }
          if (data && Array.isArray(data.items)) {
            setProdutos(data.items);
            setUsedUrl(url);
            setLoading(false);
            return;
          }
          if (data && Array.isArray(data.data)) {
            setProdutos(data.data);
            setUsedUrl(url);
            setLoading(false);
            return;
          }
          lastErr = new Error(`Resposta inválida do servidor em ${url}`);
        } catch (e) {
          // log each failure to help diagnose which endpoint fails and why
          // eslint-disable-next-line no-console
          console.warn('[Cardapio] fetch failed for', url, e?.message || e);
          setAttemptedLogs((s) => [...s, `Falha: ${url} -> ${e?.message || e}`]);
          lastErr = e;
        }
      }
      // eslint-disable-next-line no-console
      console.error('[Cardapio] nenhuma URL funcionou:', lastErr?.message || lastErr);
      setAttemptedLogs((s) => [...s, `Nenhuma URL funcionou: ${lastErr?.message || lastErr}`]);
      setError(lastErr?.message || 'Erro ao buscar o menu');
      setLoading(false);
    }

    const candidateUrls = [
      // priorizar backend local 5001 (confirmado) e depois outros fallbacks
      'http://localhost:5001/menu',
      'http://127.0.0.1:5001/menu',
      'http://localhost:5001/api/menu',
      'http://127.0.0.1:5001/api/menu',
      '/api/menu',
      '/menu',
      'http://localhost:4001/api/menu',
      'http://localhost:4001/menu',
      'http://localhost:3001/api/menu'
    ];

    fetchWithFallback(candidateUrls);
  }, []);

  const getIconeCategoria = (icone) => {
    switch(icone) {
      case 'hamburger': return <GiHamburger />;
      case 'fries': return <GiFrenchFries />;
      case 'soda': return <GiSodaCan />;
      case 'icecream': return <GiIceCreamCone />;
      default: return null;
    }
  };

  const typeMatchesCategory = (type, categoriaNome) => {
    if (!type) return false;
    const t = type.toString().toLowerCase();
    const c = categoriaNome.toLowerCase();
    if (c.includes('lanche')) return t.includes('lanche') || t.includes('burger') || t.includes('hamburg');
    if (c.includes('complement')) return t.includes('acompanh') || t.includes('complement');
    if (c.includes('bebida')) return t.includes('bebida') || t.includes('drink') || t.includes('soda');
    if (c.includes('sobremesa')) return t.includes('sobremesa');
    return false;
  };

  const produtosArray = Array.isArray(produtos) ? produtos : [];
  const produtosFiltrados = produtosArray.filter((p) => {
    const candidato = p.type || p.tipo || p.categoria || p.category || p.name || p.nome || '';
    return typeMatchesCategory(candidato, selectedCategory);
  });

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <h1>Order Tech</h1>
          <p>Faça seus pedidos</p>
        </div>
        <div className={styles.carrinho} onClick={() => router.push('/carrinho')} role="button">
          <GiBasket />
          <span className={styles.badgeCarrinho}>{cartCount}</span>
        </div>
      </header>

      <div className={styles.mainContent}>
        <aside className={styles.sidebar}>
          {categorias.map((categoria) => (
            <button
              key={categoria.id}
              className={styles.categoriaBtn}
              onClick={() => setSelectedCategory(categoria.nome)}
            >
              <div className={styles.categoriaIcon}>
                {getIconeCategoria(categoria.icone)}
              </div>
              <span>{categoria.nome}</span>
            </button>
          ))}
        </aside>

        <main className={styles.content}>
          <img src="/images/alberto.png" alt="Hambúrguer Logo" className={styles.marcaDagua} />
          <h2 className={styles.tituloCategoria}>{selectedCategory}</h2>

          {loading && <p>Carregando itens...</p>}
          {error && <p style={{ color: 'red' }}>Erro: {error}</p>}
          {usedUrl && <p style={{ color: 'green' }}>Usado: {usedUrl}</p>}
          {attemptedLogs.length > 0 && (
            <div style={{ marginTop: 8, maxHeight: 120, overflow: 'auto', background: '#fff8e1', padding: 8, borderRadius: 6 }}>
              <strong>Logs:</strong>
              <ul style={{ margin: '6px 0', paddingLeft: 16 }}>
                {attemptedLogs.map((l, i) => <li key={i} style={{ fontSize: 12 }}>{l}</li>)}
              </ul>
            </div>
          )}

          <div className={styles.produtosGrid}>
            {(produtosFiltrados.length > 0 ? produtosFiltrados : [])
              .map((produto) => {
                const nome = produto.name || produto.nome || 'Item';
                const descricao = produto.description || produto.descricao || '';
                const preco = produto.cost ?? produto.preco ?? 0;
                const imagem = produto.imageUrl || produto.imagem || '/lancheYummy.png';
                const key = produto.id_item || produto.id || produto._id || `${nome}-${preco}`;

                return (
                  <Link key={key} href={`/cardapio/${produto.id || produto.id_item || produto._id || nome}`} className={styles.produtoCard}>
                    <img
                      src={imagem}
                      alt={nome}
                      className={styles.produtoImagem}
                    />
                    <div className={styles.produtoInfo}>
                      <h3 className={styles.produtoNome}>{nome}</h3>
                      <p className={styles.produtoDescricao}>{descricao}</p>
                      <p className={styles.produtoPreco}>
                        R$ {Number(preco).toFixed(2).replace('.', ',')}
                      </p>
                      <button
                        className={styles.addBtn}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          addToCart(produto, 1);
                          setCartCount(getCartCount());
                        }}
                      >
                        + Carrinho
                      </button>
                    </div>
                  </Link>
                );
              })}
          </div>
        </main>
      </div>
    </div>
  );
}
