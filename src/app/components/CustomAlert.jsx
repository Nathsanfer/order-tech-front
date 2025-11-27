'use client';

import React from 'react';
import Image from 'next/image';
import styles from './CustomAlert.module.css';

export default function CustomAlert({ message, type = 'success', onClose }) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.alertBox} onClick={(e) => e.stopPropagation()}>

        {/* Ícone de status */}
        <div className={`${styles.iconContainer} ${styles[type]}`}>
          {type === 'success' && (
            <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          )}
          {type === 'error' && (
            <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
          {type === 'warning' && (
            <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          )}
        </div>
        
        {/* Mensagem */}
        <div className={styles.messageContainer}>
          <p className={styles.message}>{message}</p>
        </div>
        
        {/* Botão */}
        <button className={styles.closeButton} onClick={onClose}>
          ENTENDI!
        </button>
      </div>
    </div>
  );
}
