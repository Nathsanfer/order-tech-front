'use client';

import React from 'react';
import Image from 'next/image';
import styles from './CustomAlert.module.css';

export default function CustomAlert({ message, type = 'success', onClose }) {
  const titleMap = {
    success: 'Sucesso',
    error: 'Erro',
    warning: 'Atenção'
  };

  const title = titleMap[type] || 'Aviso';

  // debug: help verify component mounts and props
  if (typeof window !== 'undefined') {
    // avoid server-side logs
    // eslint-disable-next-line no-console
    console.log('[CustomAlert] render', { message, type });
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.alertBox} onClick={(e) => e.stopPropagation()}>

        {/* Alberto mascote similar ao CustomConfirm */}
        <div className={styles.albertoContainer}>
          <Image
            src="/images/albertopng.png"
            alt="Alberto"
            width={120}
            height={120}
            className={styles.albertoImg}
          />
        </div>

        {/* Título */}
        <h3 className={styles.title}>{title}</h3>

        {/* Mensagem */}
        <div className={styles.messageContainer}>
          <p className={styles.message}>{message}</p>
        </div>

        {/* Botões - visual parecido com CustomConfirm but single action */}
        <div className={styles.buttons}>
          <button className={styles.confirmButton} onClick={onClose}>
            ENTENDI
          </button>
        </div>
      </div>
    </div>
  );
}
