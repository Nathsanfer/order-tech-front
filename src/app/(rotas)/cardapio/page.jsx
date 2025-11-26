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
    }

    const candidateUrls = [
      '/api/menu',
      'http://localhost:4001/api/menu',
      'http://localhost:4001/menu',
      'http://localhost:5001/api/menu',
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
