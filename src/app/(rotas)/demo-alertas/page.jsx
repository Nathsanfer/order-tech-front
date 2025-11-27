'use client';

import { useState } from 'react';
import CustomAlert from '../../../components/CustomAlert';
import CustomConfirm from '../../../components/CustomConfirm';
import styles from './demo.module.css';

export default function DemoAlertas() {
  const [alert, setAlert] = useState(null);
  const [confirm, setConfirm] = useState(null);

  const showAlert = (message, type = 'success') => {
    setAlert({ message, type });
  };

  const closeAlert = () => {
    setAlert(null);
  };

  const showConfirm = (message, onConfirm) => {
    setConfirm({ message, onConfirm });
  };

  const closeConfirm = () => {
    setConfirm(null);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>🎨 Demonstração de Alertas Customizados</h1>
        <p>Teste todos os tipos de alertas e confirmações</p>
      </header>

      <main className={styles.main}>
        <section className={styles.section}>
          <h2>📢 CustomAlert - Alertas</h2>
          <div className={styles.buttonGrid}>
            <button 
              className={`${styles.btn} ${styles.success}`}
              onClick={() => showAlert('Operação realizada com sucesso! ✅', 'success')}
            >
              Alerta de Sucesso
            </button>

            <button 
              className={`${styles.btn} ${styles.error}`}
              onClick={() => showAlert('Ocorreu um erro!\nTente novamente mais tarde.', 'error')}
            >
              Alerta de Erro
            </button>

            <button 
              className={`${styles.btn} ${styles.warning}`}
              onClick={() => showAlert('Atenção!\n\nEsta ação requer confirmação.', 'warning')}
            >
              Alerta de Aviso
            </button>

            <button 
              className={`${styles.btn} ${styles.info}`}
              onClick={() => showAlert('✅ 2x Big Smash adicionado!\n\nTotal de itens no carrinho: 5', 'success')}
            >
              Produto Adicionado
            </button>
          </div>
        </section>

        <section className={styles.section}>
          <h2>❓ CustomConfirm - Confirmações</h2>
          <div className={styles.buttonGrid}>
            <button 
              className={`${styles.btn} ${styles.confirm}`}
              onClick={() => showConfirm(
                'Deseja realmente limpar todo o carrinho?',
                () => {
                  closeConfirm();
                  showAlert('Carrinho limpo com sucesso!', 'success');
                }
              )}
            >
              Limpar Carrinho
            </button>

            <button 
              className={`${styles.btn} ${styles.confirm}`}
              onClick={() => showConfirm(
                'Confirmar pedido no valor de R$ 45,00?',
                () => {
                  closeConfirm();
                  showAlert('Pedido finalizado com sucesso! 🎉\n\nSeu pedido está sendo preparado!', 'success');
                }
              )}
            >
              Finalizar Pedido
            </button>

            <button 
              className={`${styles.btn} ${styles.confirm}`}
              onClick={() => showConfirm(
                'Deseja realmente excluir este item?',
                () => {
                  closeConfirm();
                  showAlert('Item excluído com sucesso!', 'success');
                }
              )}
            >
              Excluir Item
            </button>

            <button 
              className={`${styles.btn} ${styles.confirm}`}
              onClick={() => showConfirm(
                'Esta ação não pode ser desfeita.\nDeseja continuar?',
                () => {
                  closeConfirm();
                  showAlert('Ação executada!', 'success');
                }
              )}
            >
              Ação Irreversível
            </button>
          </div>
        </section>

        <section className={styles.section}>
          <h2>📱 Teste de Responsividade</h2>
          <p className={styles.info}>
            Redimensione a janela do navegador para testar a responsividade dos alertas em diferentes tamanhos de tela.
          </p>
          <div className={styles.devices}>
            <div className={styles.device}>📱 Mobile: ≤480px</div>
            <div className={styles.device}>💻 Tablet: 481px - 1024px</div>
            <div className={styles.device}>🖥️ Desktop: &gt;1024px</div>
          </div>
        </section>
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
}
