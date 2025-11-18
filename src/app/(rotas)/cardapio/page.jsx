'use client';

import styles from './cardapio.module.css';
import { BsBasket3 } from "react-icons/bs";
import { GiHamburger, GiFrenchFries, GiSodaCan, GiIceCreamCone } from "react-icons/gi";

export default function Cardapio() {
  const categorias = [
    { id: 'lanches', nome: 'Lanches', icone: 'hamburger' },
    { id: 'complementos', nome: 'Complementos', icone: 'fries' },
    { id: 'bebidas', nome: 'Bebidas', icone: 'soda' },
    { id: 'sobremesas', nome: 'Sobremesas', icone: 'icecream' }
  ];

  const produtos = [
    {
      id: 1,
      nome: 'X-Burguer duplo prozer',
      descricao: 'Um delicioso Rburguer com cheddar e bacon...',
      preco: 21.90,
      imagem: '/burger.png',
      categoria: 'lanches'
    },
    {
      id: 2,
      nome: 'X-Burguer duplo prozer',
      descricao: 'Um delicioso Rburguer com cheddar e bacon...',
      preco: 21.90,
      imagem: '/burger.png',
      categoria: 'lanches'
    },
    {
      id: 3,
      nome: 'X-Burguer duplo prozer',
      descricao: 'Um delicioso Rburguer com cheddar e bacon...',
      preco: 21.90,
      imagem: '/burger.png',
      categoria: 'lanches'
    },
    {
      id: 4,
      nome: 'X-Burguer duplo prozer',
      descricao: 'Um delicioso Rburguer com cheddar e bacon...',
      preco: 21.90,
      imagem: '/burger.png',
      categoria: 'lanches'
    }
  ];

  const getIconeCategoria = (icone) => {
    switch(icone) {
      case 'hamburger': return <GiHamburger />;
      case 'fries': return <GiFrenchFries />;
      case 'soda': return <GiSodaCan />;
      case 'icecream': return <GiIceCreamCone />;
      default: return null;
    }
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <h1>Order Tech</h1>
          <p>Faça seus pedidos</p>
        </div>
        <div className={styles.carrinho}>
          <BsBasket3 />
          <span className={styles.badgeCarrinho}>5</span>
        </div>
      </header>

      <div className={styles.mainContent}>
        {/* Sidebar de categorias */}
        <aside className={styles.sidebar}>
          {categorias.map((categoria) => (
            <button key={categoria.id} className={styles.categoriaBtn}>
              <div className={styles.categoriaIcon}>
                {getIconeCategoria(categoria.icone)}
              </div>
              <span>{categoria.nome}</span>
            </button>
          ))}
        </aside>

        {/* Conteúdo principal */}
        <main className={styles.content}>
          <h2 className={styles.tituloCategoria}>Lanches</h2>
          
          <div className={styles.produtosGrid}>
            {produtos.map((produto) => (
              <div key={produto.id} className={styles.produtoCard}>
                <img 
                  src={produto.imagem} 
                  alt={produto.nome}
                  className={styles.produtoImagem}
                />
                <h3 className={styles.produtoNome}>{produto.nome}</h3>
                <p className={styles.produtoDescricao}>{produto.descricao}</p>
                <p className={styles.produtoPreco}>
                  R$ {produto.preco.toFixed(2).replace('.', ',')}
                </p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
