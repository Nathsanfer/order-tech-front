'use client';

import React from 'react';
import Image from 'next/image';
import styles from './CustomConfirm.module.css';

export default function CustomConfirm({ message, onConfirm, onCancel }) {
  return (
    <div className={styles.overlay} onClick={onCancel}>
      <div className={styles.confirmBox} onClick={(e) => e.stopPropagation()}>
        {/* Alberto mascote */}
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
        <h3 className={styles.title}>Confirmação</h3>
        
        {/* Mensagem */}
        <div className={styles.messageContainer}>
          <p className={styles.message}>{message}</p>
        </div>
        
        {/* Botões */}
        <div className={styles.buttons}>
          <button className={styles.cancelButton} onClick={onCancel}>
            CANCELAR
          </button>
          <button className={styles.confirmButton} onClick={onConfirm}>
            CONFIRMAR
          </button>
        </div>
      </div>
    </div>
  );
}
