'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './carrinho.module.css';

const CarrinhoPage = () => {
  const router = useRouter();
  const [metodoPagamento, setMetodoPagamento] = useState('');

  // Simulação de itens do carrinho - depois conectar com contexto/API
  const itensCarrinho = [
    { id: 1, nome: 'X-Burguer duplo prazer', quantidade: 1, preco: 25.90 },
    { id: 2, nome: 'Batata Frita Pequena', quantidade: 2, preco: 12.00 },
    { id: 3, nome: 'Gin Lemon Fresh', quantidade: 1, preco: 18.00 },
    { id: 4, nome: 'Mousse de Maracujá Cremoso', quantidade: 2, preco: 14.00 },
  ];

  const valorTotal = itensCarrinho.reduce(
    (total, item) => total + (item.preco * item.quantidade), 
    0
  );

  const handleFinalizarPedido = () => {
    if (!metodoPagamento) {
      alert('Por favor, selecione uma forma de pagamento');
      return;
    }
    
    // Aqui você implementaria a lógica de finalização
    console.log('Finalizando pedido com:', metodoPagamento);
    // router.push('/confirmacao');
  };

  const handleVoltarCardapio = () => {
    router.push('/cardapio');
  };

  return (
    <div className={styles.carrinhoContainer}>
      <header className={styles.carrinhoHeader}>
      <button className={styles.voltarBtn} onClick={handleVoltarCardapio}>
          ← Voltar
        </button>
      </header>

      <main className={styles.carrinhoMain}>
        <section className={styles.formasPagamento}>
          <h2 className={styles.titulo}>Formas de Pagamento:</h2>
          
          <div className={styles.botoesPagamento}>
            <button
              className={`${styles.botaoPagamento} ${
                metodoPagamento === 'cartao' ? styles.selecionado : ''
              }`}
              onClick={() => setMetodoPagamento('cartao')}
            >
              Cartão de débito ou crédito
            </button>
            
            <button
              className={`${styles.botaoPagamento} ${
                metodoPagamento === 'vale' ? styles.selecionado : ''
              }`}
              onClick={() => setMetodoPagamento('vale')}
            >
              Vale Refeição
            </button>
            
            <button
              className={`${styles.botaoPagamento} ${
                metodoPagamento === 'pix' ? styles.selecionado : ''
              }`}
              onClick={() => setMetodoPagamento('pix')}
            >
              PIX
            </button>
            
            <button
              className={`${styles.botaoPagamento} ${
                metodoPagamento === 'qrcode' ? styles.selecionado : ''
              }`}
              onClick={() => setMetodoPagamento('qrcode')}
            >
              QR Code
            </button>
            
            <button
              className={`${styles.botaoPagamento} ${
                metodoPagamento === 'dinheiro' ? styles.selecionado : ''
              }`}
              onClick={() => setMetodoPagamento('dinheiro')}
            >
              Dinheiro
            </button>
          </div>

          <button 
            className={styles.finalizarPedido}
            onClick={handleFinalizarPedido}
          >
            Finalizar Pedido
          </button>
        </section>

        <div className={styles.sidebarWrapper}>
          <div className={styles.imagenesColuna}>
            <div className={styles.imageBox}>
              <img 
                src="/images/albertos.png" 
                alt="Alberto's" 
                className={styles.mascote}
              />
            </div>
            <div className={styles.imageBox}>
              <img 
                src="/images/albertos.png" 
                alt="Alberto's" 
                className={styles.mascote}
              />
            </div>
            <div className={styles.imageBox}>
              <img 
                src="/images/albertos.png" 
                alt="Alberto's" 
                className={styles.mascote}
              />
            </div>
            <div className={styles.imageBox}>
              <img 
                src="/images/albertos.png" 
                alt="Alberto's" 
                className={styles.mascote}
              />
            </div>
            <div className={styles.imageBox}>
              <img 
                src="/images/albertos.png" 
                alt="Alberto's" 
                className={styles.mascote}
              />
            </div>
          </div>

          <aside className={styles.sidebarPedido}>
            <h2 className={styles.titulo}>Detalhes do Pedido:</h2>
            
            <ul className={styles.listaItens}>
              {itensCarrinho.map((item) => (
                <li key={item.id} className={styles.itemPedido}>
                  {item.quantidade}x {item.nome}
                </li>
              ))}
            </ul>

            <div className={styles.valorTotal}>
              <p>Valor Total:</p>
              <strong>R$ {valorTotal.toFixed(2).replace('.', ',')}</strong>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default CarrinhoPage;