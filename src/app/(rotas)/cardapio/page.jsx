'use client';

import styles from './cardapio.module.css';
import { GiBasket, GiHamburger, GiFrenchFries, GiSodaCan, GiIceCreamCone } from "react-icons/gi";

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
      imagem: '/lancheYummy.png',
      categoria: 'lanches'
    },
    {
      id: 2,
      nome: 'X-Burguer duplo prozer',
      descricao: 'Um delicioso Rburguer com cheddar e bacon...',
      preco: 21.90,
      imagem: '/lancheYummy.png',
      categoria: 'lanches'
    },
    {
      id: 3,
      nome: 'X-Burguer duplo prozer',
      descricao: 'Um delicioso Rburguer com cheddar e bacon...',
      preco: 21.90,
      imagem: '/lancheYummy.png',
      categoria: 'lanches'
    },
    {
      id: 4,
      nome: 'X-Burguer duplo prozer',
      descricao: 'Um delicioso Rburguer com cheddar e bacon...',
      preco: 21.90,
      imagem: '/lancheYummy.png',
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
      <header className={styles.header}>
        <div className={styles.logo}>
          <h1>Order Tech</h1>
          <p>Faça seus pedidos</p>
        </div>
        <div className={styles.carrinho}>
          <GiBasket />
          <span className={styles.badgeCarrinho}>5</span>
        </div>
      </header>

      <div className={styles.mainContent}>
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

        <main className={styles.content}>
          <img src="/images/alberto.png" alt="Hambúrguer Logo" className={styles.marcaDagua} />
          <h2 className={styles.tituloCategoria}>Lanches</h2>
          
          <div className={styles.produtosGrid}>
            {produtos.map((produto) => (
              <div key={produto.id} className={styles.produtoCard}>
                <img 
                  src={produto.imagem} 
                  alt={produto.nome}
                  className={styles.produtoImagem}
                />
                <div className={styles.produtoInfo}>
                  <h3 className={styles.produtoNome}>{produto.nome}</h3>
                  <p className={styles.produtoDescricao}>{produto.descricao}</p>
                  <p className={styles.produtoPreco}>
                    R$ {produto.preco.toFixed(2).replace('.', ',')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
