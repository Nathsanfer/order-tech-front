// ...existing code...
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaCreditCard, FaTicketAlt, FaQrcode, FaMoneyBillWave } from 'react-icons/fa';
import { FaPix } from 'react-icons/fa6';
import CustomAlert from '../../components/CustomAlert';
import CustomConfirm from '../../components/CustomConfirm';
import styles from './carrinho.module.css';


const CarrinhoPage = () => {
  const router = useRouter();
  const [metodoPagamento, setMetodoPagamento] = useState('');
  const [itensCarrinho, setItensCarrinho] = useState([]);
  const [alert, setAlert] = useState(null);
  const [confirm, setConfirm] = useState(null);

  const showAlert = (message, type = 'success', redirectToHome = false) => {
    setAlert({ message, type, redirectToHome });
  };

  const closeAlert = () => {
    const shouldRedirect = alert?.redirectToHome;
    setAlert(null);
    if (shouldRedirect) {
      router.push('/home');
    }
  };

  const showConfirm = (message, onConfirm) => {
    setConfirm({ message, onConfirm });
  };

  const closeConfirm = () => {
    setConfirm(null);
  };

  // Carrega os itens do carrinho do localStorage
  useEffect(() => {
    const carrinhoSalvo = localStorage.getItem('carrinho');
    if (carrinhoSalvo) {
      try {
        const itens = JSON.parse(carrinhoSalvo);
        setItensCarrinho(itens);
      } catch (error) {
        console.error('Erro ao carregar carrinho:', error);
        setItensCarrinho([]);
      }
    }
  }, []);

  const valorTotal = itensCarrinho.reduce(
    (total, item) => total + (item.preco * item.quantidade), 
    0
  );

  const atualizarCarrinho = (novosItens) => {
    setItensCarrinho(novosItens);
    localStorage.setItem('carrinho', JSON.stringify(novosItens));
  };

  const handleRemoverItem = (itemId) => {
    const novosItens = itensCarrinho.filter(item => item.id !== itemId);
    atualizarCarrinho(novosItens);
  };

  const handleAlterarQuantidade = (itemId, novaQuantidade) => {
    if (novaQuantidade < 1) {
      handleRemoverItem(itemId);
      return;
    }
    
    const novosItens = itensCarrinho.map(item => 
      item.id === itemId ? { ...item, quantidade: novaQuantidade } : item
    );
    atualizarCarrinho(novosItens);
  };

  const handleLimparCarrinho = () => {
    if (itensCarrinho.length === 0) return;
    
    showConfirm('Deseja realmente limpar todo o carrinho?', () => {
      atualizarCarrinho([]);
      showAlert('Carrinho limpo com sucesso!', 'success');
      closeConfirm();
    });
  };

  const handleFinalizarPedido = () => {
    if (itensCarrinho.length === 0) {
      showAlert('Seu carrinho está vazio!\nAdicione produtos antes de finalizar.', 'warning');
      return;
    }

    if (!metodoPagamento) {
      showAlert('Por favor, selecione uma forma de pagamento', 'warning');
      return;
    }

    // Gera nova senha incremental
    let ultimaSenha = Number(localStorage.getItem('ultimaSenha') || 0) + 1;
    localStorage.setItem('ultimaSenha', ultimaSenha);

    const senha = String(ultimaSenha).padStart(3, '0');

    // Preparar mensagem de confirmação com valor total formatado
    const valorFormatado = valorTotal.toFixed(2).replace('.', ',');

    showConfirm(
      `Confirmar pedido no valor de R$ ${valorFormatado}?`,
      () => {
        // Salva o pedido em localStorage na chave "pedidos" para o painel da cozinha
        try {
          const pedidosAtuais = JSON.parse(localStorage.getItem('pedidos') || '[]');

          // Mapear itens para o formato esperado pelo painel (nome, quantidade, observacoes)
          const itensParaPedido = itensCarrinho.map(item => ({
            nome: item.nome,
            quantidade: item.quantidade,
            observacoes: item.observacoes || ''
          }));

          const novoPedido = {
            id: String(Date.now()),
            senha,
            itens: itensParaPedido,
            metodoPagamento,
            valorTotal,
            criadoEm: new Date().toISOString()
          };

          pedidosAtuais.push(novoPedido);
          localStorage.setItem('pedidos', JSON.stringify(pedidosAtuais));
        } catch (e) {
          console.error('Erro ao salvar pedido em localStorage:', e);
        }

        // Limpar carrinho após salvar o pedido
        atualizarCarrinho([]);
        closeConfirm();

        // Mostrar senha para o cliente e redirecionar para home
        showAlert(
          `Pedido finalizado com sucesso! 🎉\nSua senha é: ${senha}`,
          'success',
          true
        );
      }
    );
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
          <h2 className={styles.tituloPagamento}>Formas de Pagamento</h2>
          <p className={styles.subtituloPagamento}>Escolha como deseja pagar seu pedido</p>
          
          <div className={styles.botoesPagamento}>
            <button
              className={`${styles.botaoPagamento} ${
                metodoPagamento === 'cartao' ? styles.selecionado : ''
              }`}
              onClick={() => setMetodoPagamento('cartao')}
            >
              <FaCreditCard className={styles.iconePagamento} />
              <div className={styles.textoPagamento}>
                <span className={styles.tituloOpcao}>Cartão</span>
                <span className={styles.descricaoOpcao}>Débito ou Crédito</span>
              </div>
            </button>
            
            <button
              className={`${styles.botaoPagamento} ${
                metodoPagamento === 'vale' ? styles.selecionado : ''
              }`}
              onClick={() => setMetodoPagamento('vale')}
            >
              <FaTicketAlt className={styles.iconePagamento} />
              <div className={styles.textoPagamento}>
                <span className={styles.tituloOpcao}>Vale Refeição</span>
                <span className={styles.descricaoOpcao}>Sodexo, Alelo, VR</span>
              </div>
            </button>
            
            <button
              className={`${styles.botaoPagamento} ${
                metodoPagamento === 'pix' ? styles.selecionado : ''
              }`}
              onClick={() => setMetodoPagamento('pix')}
            >
              <FaPix className={styles.iconePagamento} />
              <div className={styles.textoPagamento}>
                <span className={styles.tituloOpcao}>PIX</span>
                <span className={styles.descricaoOpcao}>Pagamento instantâneo</span>
              </div>
            </button>
            
            <button
              className={`${styles.botaoPagamento} ${
                metodoPagamento === 'qrcode' ? styles.selecionado : ''
              }`}
              onClick={() => setMetodoPagamento('qrcode')}
            >
              <FaQrcode className={styles.iconePagamento} />
              <div className={styles.textoPagamento}>
                <span className={styles.tituloOpcao}>QR Code</span>
                <span className={styles.descricaoOpcao}>Escaneie e pague</span>
              </div>
            </button>
            
            <button
              className={`${styles.botaoPagamento} ${
                metodoPagamento === 'dinheiro' ? styles.selecionado : ''
              }`}
              onClick={() => setMetodoPagamento('dinheiro')}
            >
              <FaMoneyBillWave className={styles.iconePagamento} />
              <div className={styles.textoPagamento}>
                <span className={styles.tituloOpcao}>Dinheiro</span>
                <span className={styles.descricaoOpcao}>Pagamento em espécie</span>
              </div>
            </button>
          </div>

          <button 
            className={styles.finalizarPedido}
            onClick={handleFinalizarPedido}
            disabled={!metodoPagamento || itensCarrinho.length === 0}
          >
            {metodoPagamento ? '✓ Finalizar Pedido' : 'Selecione uma Forma de Pagamento'}
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
            
            {itensCarrinho.length === 0 ? (
              <p className={styles.carrinhoVazio}>
                Seu carrinho está vazio. Adicione produtos do cardápio!
              </p>
            ) : (
              <>
                <ul className={styles.listaItens}>
                  {itensCarrinho.map((item) => (
                    <li key={item.id} className={styles.itemPedido}>
                      <div className={styles.itemInfo}>
                        <span className={styles.itemNome}>{item.nome}</span>
                        {item.observacoes && (
                          <span className={styles.itemObservacoes}>
                            📝 {item.observacoes}
                          </span>
                        )}
                        <span className={styles.itemPreco}>
                          R$ {(item.preco * item.quantidade).toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                      <div className={styles.itemControles}>
                        <button 
                          className={styles.btnQuantidade}
                          onClick={() => handleAlterarQuantidade(item.id, item.quantidade - 1)}
                        >
                          -
                        </button>
                        <span className={styles.quantidade}>{item.quantidade}</span>
                        <button 
                          className={styles.btnQuantidade}
                          onClick={() => handleAlterarQuantidade(item.id, item.quantidade + 1)}
                        >
                          +
                        </button>
                        <button 
                          className={styles.btnRemover}
                          onClick={() => handleRemoverItem(item.id)}
                          title="Remover item"
                        >
                          🗑️
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className={styles.valorTotal}>
                  <p>Valor Total:</p>
                  <strong>R$ {valorTotal.toFixed(2).replace('.', ',')}</strong>
                </div>

                {itensCarrinho.length > 0 && (
                  <button 
                    className={styles.btnLimparCarrinho}
                    onClick={handleLimparCarrinho}
                  >
                    Limpar Carrinho
                  </button>
                )}
              </>
            )}
          </aside>
        </div>
      </main>

      {alert && (
        <CustomAlert 
          message={alert.message} 
          type={alert.type} 
          onClose={closeAlert} 
        />
      )}

      {confirm && (
        <CustomConfirm 
          message={confirm.message} 
          onConfirm={confirm.onConfirm}
          onCancel={closeConfirm}
        />
      )}
    </div>
  );
};

export default CarrinhoPage;