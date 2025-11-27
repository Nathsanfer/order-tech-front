'use client';

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import styles from './[id].module.css';

export default function DetalheProduto() {
  const params = useParams();
  const router = useRouter();
  const [produto, setProduto] = useState(null);
  const [quantidade, setQuantidade] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduto = async () => {
      // Primeiro tenta buscar do localStorage
      const produtoLocalStorage = localStorage.getItem(`produto_${params.id}`);
      if (produtoLocalStorage) {
        try {
          const produtoSalvo = JSON.parse(produtoLocalStorage);
          setProduto(produtoSalvo);
          setLoading(false);
          console.log('✅ Produto carregado do localStorage:', produtoSalvo);
          return;
        } catch (err) {
          console.error('Erro ao parsear produto do localStorage:', err);
        }
      }

      // Se não encontrou no localStorage, tenta buscar da API
      try {
        const candidateUrls = [
          'http://localhost:5001/menu',
          'http://localhost:4001/menu',
          'http://localhost:3001/menu'
        ];

        for (const url of candidateUrls) {
          try {
            console.log(`📡 Tentando buscar de: ${url}`);
            const response = await fetch(url);
            if (response.ok) {
              const data = await response.json();
              const produtos = Array.isArray(data) ? data : [];
              console.log(`✅ ${produtos.length} produtos recebidos de ${url}`);
              
              // Busca o produto pelo ID
              const produtoEncontrado = produtos.find(p => 
                String(p.id_item || p.id) === String(params.id)
              );

              if (produtoEncontrado) {
                console.log('✅ Produto encontrado:', produtoEncontrado);
                
                // Processa a imagem da mesma forma que no cardápio
                const imagemOriginal = produtoEncontrado.imageUrl || produtoEncontrado.imagem || '';
                let imagemFinal = '/images/lancheYummy.png';
                
                if (imagemOriginal) {
                  // Remove /public se existir
                  const imagemLimpa = imagemOriginal.replace('/public', '');
                  // Se a imagem não começa com http, adiciona a URL base da API
                  if (!imagemLimpa.startsWith('http')) {
                    const baseUrl = url.replace('/menu', '');
                    imagemFinal = `${baseUrl}${imagemLimpa}`;
                  } else {
                    imagemFinal = imagemLimpa;
                  }
                }
                
                console.log('🖼️ URL da imagem processada:', imagemFinal);
                
                // Normaliza os dados para o formato esperado
                const produtoNormalizado = {
                  id: produtoEncontrado.id_item || produtoEncontrado.id,
                  nome: produtoEncontrado.name || produtoEncontrado.nome,
                  descricao: produtoEncontrado.description || produtoEncontrado.descricao || '',
                  preco: produtoEncontrado.cost ?? produtoEncontrado.preco ?? 0,
                  imagem: imagemFinal
                };
                
                setProduto(produtoNormalizado);
                setLoading(false);
                return;
              } else {
                console.log(`⚠️ Produto com ID ${params.id} não encontrado na lista`);
              }
            }
          } catch (err) {
            console.error(`❌ Falha ao buscar de ${url}:`, err.message);
          }
        }
        
        // Se nenhuma URL funcionou
        console.error('⚠️ Produto não encontrado em nenhuma API');
        setLoading(false);
      } catch (error) {
        console.error('❌ Erro ao buscar produto:', error);
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProduto();
    }
  }, [params.id]);

  const handleVoltarCardapio = () => {
    router.push('/cardapio');
  };

  const handleDiminuirQuantidade = () => {
    if (quantidade > 1) {
      setQuantidade(quantidade - 1);
    }
  };

  const handleAumentarQuantidade = () => {
    setQuantidade(quantidade + 1);
  };

  const handleAdicionarCarrinho = () => {
    if (!produto) return;
    
    // Adicionar ao carrinho
    const carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');
    const itemExistente = carrinho.find(item => item.id === produto.id);
    
    if (itemExistente) {
      itemExistente.quantidade += quantidade;
    } else {
      carrinho.push({
        ...produto,
        quantidade
      });
    }
    
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    
    // Dispara evento para atualizar o contador do carrinho
    window.dispatchEvent(new Event('carrinhoAtualizado'));
    
    // Mensagem de sucesso mais amigável
    const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);
    alert(`✅ ${quantidade}x ${produto.nome} adicionado ao carrinho!\n\nTotal de itens no carrinho: ${totalItens}`);
    
    // Resetar quantidade para 1
    setQuantidade(1);
    
    // Opcional: redirecionar ou manter na página
    // router.push('/cardapio');
  };

  if (loading) {
    return <div className={styles.loading}>Carregando...</div>;
  }

  if (!produto) {
    return <div className={styles.loading}>Produto não encontrado</div>;
  }

  // Usa a imagem do produto diretamente
  const imagemProduto = produto.imagem || '/images/lancheYummy.png';

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        {/* Botão Voltar */}
        <button className={styles.voltarBtn} onClick={handleVoltarCardapio}>
          ← Voltar
        </button>

        {/* Área de Imagens */}
        <div className={styles.imageArea}>
          {/* Logo Alberto */}
          <div className={styles.logoAlberto}>
            <Image
              src="/images/alberto.png"
              alt="Logo Alberto"
              width={2500}
              height={2500}
              className={styles.albertoImg}
            />
          </div>

          {/* Imagem do Produto */}
          <div className={styles.produtoImage}>
            <img
              src={imagemProduto}
              alt={produto.nome}
              className={styles.produtoImg}
            />
          </div>
        </div>

        {/* Imagem Decorativa Albertos */}
        <div className={styles.albertosArea}>
          <Image
            src="/images/albertos.png"
            alt="Decoração"
            width={250}
            height={200}
            className={styles.albertosImg}
          />
          <Image
            src="/images/albertos.png"
            alt="Decoração"
            width={250}
            height={200}
            className={styles.albertosImg}
          />
          <Image
            src="/images/albertos.png"
            alt="Decoração"
            width={250}
            height={200}
            className={styles.albertosImg}
          />
          <Image
            src="/images/albertos.png"
            alt="Decoração"
            width={250}
            height={200}
            className={styles.albertosImg}
          />
          <Image
            src="/images/albertos.png"
            alt="Decoração"
            width={250}
            height={200}
            className={styles.albertosImg}
          />
          <Image
            src="/images/albertos.png"
            alt="Decoração"
            width={250}
            height={200}
            className={styles.albertosImg}
          />
          <Image
            src="/images/albertos.png"
            alt="Decoração"
            width={250}
            height={200}
            className={styles.albertosImg}
          />
          <Image
            src="/images/albertos.png"
            alt="Decoração"
            width={250}
            height={200}
            className={styles.albertosImg}
          />
          
        </div>

      </div>

      {/* Sidebar Direita */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarContent}>
          <h2 className={styles.sidebarTitle}>Detalhes do Produto:</h2>
          
          <div className={styles.produtoInfo}>
            <h3 className={styles.produtoNome}>{produto.nome}</h3>
            
            <p className={styles.produtoDescricao}>{produto.descricao}</p>
            
            <div className={styles.produtoPreco}>
              R$ {produto.preco.toFixed(2).replace('.', ',')}
            </div>

            {/* Controle de Quantidade e Botão Adicionar */}
            <div className={styles.quantidadeControl}>
              <div className={styles.quantidadeWrapper}>
                <button 
                  className={styles.quantidadeBtn}
                  onClick={handleDiminuirQuantidade}
                  disabled={quantidade <= 1}
                >
                  -
                </button>
                <span className={styles.quantidadeValor}>{quantidade}</span>
                <button 
                  className={styles.quantidadeBtn}
                  onClick={handleAumentarQuantidade}
                >
                  +
                </button>
              </div>

              {/* Botão Adicionar ao Carrinho */}
              <button 
                className={styles.adicionarBtn}
                onClick={handleAdicionarCarrinho}
              >
                Adicionar ao Carrinho
              </button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
