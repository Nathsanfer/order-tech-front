'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './cardapio.module.css';
import { GiBasket, GiHamburger, GiFrenchFries, GiSodaCan, GiIceCreamCone } from "react-icons/gi";

export default function Cardapio() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('Lanches');
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categorias = [
    { id: 'lanches', nome: 'Lanches', icone: 'hamburger' },
    { id: 'complementos', nome: 'Complementos', icone: 'fries' },
    { id: 'bebidas', nome: 'Bebidas', icone: 'soda' },
    { id: 'sobremesas', nome: 'Sobremesas', icone: 'icecream' }
  ];

  const handleCarrinhoClick = () => {
    router.push('/carrinho');
  };

  useEffect(() => {
    const fetchWithFallback = async (urls) => {
      console.log('🔍 Iniciando busca de produtos...');
      for (const url of urls) {
        try {
          console.log(`📡 Tentando fetch em: ${url}`);
          const response = await fetch(url);
          console.log(`📊 Response status de ${url}:`, response.status, response.statusText);
          
          if (response.ok) {
            const data = await response.json();
            console.log('✅ DADOS RECEBIDOS:', data);
            console.log('📦 Tipo dos dados:', Array.isArray(data) ? 'Array' : typeof data);
            
            // Tenta diferentes estruturas de resposta
            let produtosArray = [];
            
            if (Array.isArray(data)) {
              // Se já é um array direto
              produtosArray = data;
            } else if (data && typeof data === 'object') {
              // Se é um objeto, tenta encontrar o array dentro dele
              console.log('🔎 Procurando array dentro do objeto...');
              console.log('🔑 Chaves do objeto:', Object.keys(data));
              
              // Tenta diferentes possíveis chaves
              if (data.items) produtosArray = data.items;
              else if (data.products) produtosArray = data.products;
              else if (data.menu) produtosArray = data.menu;
              else if (data.data) produtosArray = data.data;
              else if (data.results) produtosArray = data.results;
              // Se nenhuma chave conhecida, pega o primeiro array que encontrar
              else {
                for (const key in data) {
                  if (Array.isArray(data[key])) {
                    console.log(`✅ Array encontrado na chave: ${key}`);
                    produtosArray = data[key];
                    break;
                  }
                }
              }
            }
            
            console.log('📝 Quantidade de itens encontrados:', produtosArray.length);
            
            if (produtosArray.length > 0) {
              console.log('📋 Primeiro item como exemplo:', produtosArray[0]);
            }
            
            setProdutos(produtosArray);
            setLoading(false);
            return;
          }
        } catch (err) {
          console.error(`❌ Falha ao buscar de ${url}:`, err.message);
        }
      }
      console.error('⚠️ Nenhuma API respondeu com sucesso');
      setError('Não foi possível carregar os produtos de nenhuma API');
      setLoading(false);
    };

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

  // Debug logs
  console.log('🔎 Estado atual:');
  console.log('  📦 Total de produtos:', produtosArray.length);
  console.log('  🏷️ Categoria selecionada:', selectedCategory);
  console.log('  ✅ Produtos filtrados:', produtosFiltrados.length);
  console.log('  ⏳ Loading:', loading);
  console.log('  ❌ Error:', error);
  
  if (produtosArray.length > 0) {
    console.log('  📋 Exemplo de produto:', produtosArray[0]);
    console.log('  🏷️ Type do primeiro produto:', produtosArray[0].type || produtosArray[0].tipo);
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <h1>Order Tech</h1>
          <p>Faça seus pedidos</p>
        </div>
        <div 
          className={styles.carrinho}
          onClick={handleCarrinhoClick}
          style={{ cursor: 'pointer' }}
        >
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
                const imagemOriginal = produto.imageUrl || produto.imagem || '';
                // Garante que a imagem seja uma URL válida ou usa padrão
                const imagem = imagemOriginal && imagemOriginal.startsWith('/') 
                  ? imagemOriginal 
                  : '/images/lancheYummy.png';
                const id = produto.id_item || produto.id;
                const key = id || nome + preco;

                const handleClick = () => {
                  // Salva o produto completo no localStorage antes de navegar
                  const produtoParaSalvar = {
                    id,
                    nome,
                    descricao,
                    preco,
                    imagem
                  };
                  localStorage.setItem(`produto_${id}`, JSON.stringify(produtoParaSalvar));
                  router.push(`/cardapio/${id}`);
                };

                return (
                  <div 
                    key={key} 
                    className={styles.produtoCard}
                    onClick={handleClick}
                    style={{ cursor: 'pointer' }}
                  >
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