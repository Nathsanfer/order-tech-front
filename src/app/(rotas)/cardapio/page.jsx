'use client';

import React, { useEffect, useState } from 'react';
import styles from './cardapio.module.css';
import { GiBasket, GiHamburger, GiFrenchFries, GiSodaCan, GiIceCreamCone } from "react-icons/gi";

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
  const [selectedCategory, setSelectedCategory] = useState(categorias[0].nome);

  useEffect(() => {
    async function fetchWithFallback(urls) {
      setLoading(true);
      setError(null);
      let lastErr = null;
      for (const url of urls) {
        try {
          const res = await fetch(url);
          if (!res.ok) throw new Error(`Erro HTTP ${res.status}`);
          const data = await res.json();
          // garantir que recebemos um array
          if (Array.isArray(data)) {
            setProdutos(data);
            setUsedUrl(url);
            setLoading(false);
            return;
          }
          // algumas APIs retornam { items: [...] } ou { data: [...] }
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
          // resposta inesperada, continuar para próximo fallback
          lastErr = new Error(`Resposta inválida do servidor em ${url}`);
        } catch (e) {
          lastErr = e;
        }
      }
      setError(lastErr?.message || 'Erro ao buscar o menu');
      setLoading(false);
    }

    const candidateUrls = [
      'http://localhost:5001/menu',
      'http://localhost:4001/menu',
      'http://localhost:3001/menu'
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
    const t = type.toLowerCase();
    const c = categoriaNome.toLowerCase();
    if (c.includes('lanche')) return t.includes('lanche');
    if (c.includes('complement')) return t.includes('acompanh') || t.includes('acompanhamento') || t.includes('acompanhamentos');
    if (c.includes('bebida')) return t.includes('bebida') || t.includes('drink');
    if (c.includes('sobremesa')) return t.includes('sobremesa');
    return false;
  };

  const produtosArray = Array.isArray(produtos) ? produtos : [];
  const produtosFiltrados = produtosArray.filter((p) => typeMatchesCategory(p.type || p.tipo || '', selectedCategory));

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <h1>Order Tech</h1>
          <p>Faça seus pedidos</p>
        </div>
        <div className={styles.carrinho}>
          <GiBasket />
          <span className={styles.badgeCarrinho}>0</span>
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

          <div className={styles.produtosGrid}>
            {(produtosFiltrados.length > 0 ? produtosFiltrados : [])
              .map((produto) => {
                const nome = produto.name || produto.nome || 'Item';
                const descricao = produto.description || produto.descricao || '';
                const preco = produto.cost ?? produto.preco ?? 0;
                const imagem = produto.imageUrl || produto.imagem || '/lancheYummy.png';
                const key = produto.id_item || produto.id || produto.id_item || nome + preco;

                return (
                  <div key={key} className={styles.produtoCard}>
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
                    </div>
                  </div>
                );
              })}
          </div>
        </main>
      </div>
    </div>
  );
}
