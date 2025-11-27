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
      try {
        // Simulando busca de dados - substitua pela sua API real
        const response = await fetch(`/api/menu/${params.id}`);
        if (response.ok) {
          const data = await response.json();
          setProduto(data);
        } else {
          // Dados de exemplo caso a API não exista ainda
          setProduto({
            id: params.id,
            nome: 'X-Burguer duplo prazer',
            descricao: 'Um delicioso X-Burguer com cheddar e bacon lorem ipsum dolor sit amet. Consectetur adipiscing elit. Phasellus consectetur mattis enim non pharetra.',
            preco: 21.90,
            imagem: '/lancheYummy.png'
          });
        }
      } catch (error) {
        // Dados de exemplo em caso de erro
        setProduto({
          id: params.id,
          nome: 'X-Burguer duplo prazer',
          descricao: 'Um delicioso X-Burguer com cheddar e bacon lorem ipsum dolor sit amet. Consectetur adipiscing elit. Phasellus consectetur mattis enim non pharetra.',
          preco: 21.90,
          imagem: '/lancheYummy.png'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProduto();
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
    // Adicionar ao carrinho (implementar localStorage ou context)
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
    alert(`${quantidade}x ${produto.nome} adicionado ao carrinho!`);
    router.push('/cardapio');
  };

  if (loading) {
    return <div className={styles.loading}>Carregando...</div>;
  }

  if (!produto) {
    return <div className={styles.loading}>Produto não encontrado</div>;
  }

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
            <Image
              src={produto.imagem}
              alt={produto.nome}
              width={1100}
              height={1100}
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
