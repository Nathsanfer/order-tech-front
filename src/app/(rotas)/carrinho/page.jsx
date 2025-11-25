 'use client';

import React, { useEffect, useState } from 'react';
import styles from '../cardapio/cardapio.module.css';
import { getCart, removeFromCart, updateQty, clearCart } from '../../../lib/cart';
import { useRouter } from 'next/navigation';

export default function CarrinhoPage() {
  const [cart, setCart] = useState([]);
  const router = useRouter();

  useEffect(() => {
    setCart(getCart());
  }, []);

  function handleRemove(id) {
    const next = removeFromCart(id);
    setCart(next);
    // dispatch storage event
    try { window.dispatchEvent(new Event('storage')); } catch(e){}
  }

  function handleQty(id, qty) {
    const next = updateQty(id, qty);
    setCart(next);
    try { window.dispatchEvent(new Event('storage')); } catch(e){}
  }

  if (!cart || cart.length === 0) return (
    <div className={styles.container} style={{ padding: 24 }}>
      <h2>Seu carrinho está vazio</h2>
      <button className={styles.categoriaBtn} onClick={() => router.push('/cardapio')}>Voltar ao cardápio</button>
    </div>
  );

  const total = cart.reduce((s,p) => s + (p.price * (p.qty||1)), 0);

  return (
    <div className={styles.container} style={{ padding: 24 }}>
      <h2>Meu Carrinho</h2>
      <div style={{ display: 'grid', gap: 12 }}>
        {cart.map((item) => (
          <div key={item.id} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <img src={item.image} alt={item.name} style={{ width: 80, height: 80, objectFit: 'cover' }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700 }}>{item.name}</div>
              <div>R$ {Number(item.price).toFixed(2).replace('.', ',')}</div>
              <div style={{ marginTop: 8 }}>
                <button onClick={() => handleQty(item.id, (item.qty||1) - 1)}>-</button>
                <span style={{ margin: '0 8px' }}>{item.qty}</span>
                <button onClick={() => handleQty(item.id, (item.qty||1) + 1)}>+</button>
              </div>
            </div>
            <div>
              <button onClick={() => handleRemove(item.id)} style={{ background: 'transparent', border: '1px solid #ddd', padding: '6px 10px', borderRadius: 6 }}>Remover</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 18, fontWeight: 700 }}>Total: R$ {Number(total).toFixed(2).replace('.', ',')}</div>
      <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
        <button className={styles.addBtn} onClick={() => { clearCart(); setCart([]); try { window.dispatchEvent(new Event('storage')); } catch(e){} }}>Limpar carrinho</button>
        <button className={styles.categoriaBtn} onClick={() => router.push('/cardapio')}>Continuar comprando</button>
      </div>
    </div>
  );
}
