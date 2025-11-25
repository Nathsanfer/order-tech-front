"use client";

import React, { useEffect, useState } from "react";
import styles from "./carrinho.module.css";
import { getCart, removeFromCart, updateQty, clearCart, addToCart } from "../../../lib/cart";
import { useRouter } from "next/navigation";

export default function CarrinhoPage() {
  const [cart, setCart] = useState([]);
  const [anim, setAnim] = useState([]);
  const router = useRouter();

  useEffect(() => {
    setCart(getCart());
  }, []);

  function markAnim(id) {
    setAnim((s) => Array.from(new Set([...s, id])));
    setTimeout(() => setAnim((s) => s.filter((x) => x !== id)), 420);
  }

  function handleRemove(id) {
    const next = removeFromCart(id);
    setCart(next);
    markAnim(id);
    try {
      window.dispatchEvent(new Event("storage"));
    } catch (e) {}
  }

  function handleQty(id, qty) {
    if (qty < 1) return;
    const next = updateQty(id, qty);
    setCart(next);
    markAnim(id);
    try {
      window.dispatchEvent(new Event("storage"));
    } catch (e) {}
  }

  // exemplo simples de sobremesas — você pode trocar por dados reais do backend
  const desserts = [
    { id: 's-1', name: 'Pudim de Leite', price: 6.5, image: '/images/lancheYummy.png' },
    { id: 's-2', name: 'Brownie com Sorvete', price: 9.0, image: '/images/lancheYummy.png' },
    { id: 's-3', name: 'Mousse de Chocolate', price: 7.0, image: '/images/lancheYummy.png' },
    { id: 's-4', name: 'Cheesecake', price: 8.5, image: '/images/lancheYummy.png' }
  ];

  function handleAddDessert(d) {
    addToCart({ id: d.id, name: d.name, price: d.price, image: d.image });
    const next = getCart();
    setCart(next);
    markAnim(d.id);
    try { window.dispatchEvent(new Event('storage')); } catch(e){}
  }

  if (!cart || cart.length === 0)
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.cartListCard} style={{ textAlign: "center", padding: 48 }}>
            <h2>Seu carrinho está vazio</h2>
            <div style={{ marginTop: 16 }}>
              <button className={`${styles.btn} ${styles.primaryBtn}`} onClick={() => router.push("/cardapio")}>
                Voltar ao cardápio
              </button>
            </div>
          </div>
        </div>
      </div>
    );

  const total = cart.reduce((s, p) => s + p.price * (p.qty || 1), 0);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cartListCard}>
          <h2 style={{ marginTop: 0 }}>Meu Carrinho</h2>
          <div className={styles.cartList}>
            {cart.map((item) => (
              <div key={item.id} className={`${styles.cartItem} ${anim.includes(item.id) ? styles.pop : ""}`}>
                <img src={item.image} alt={item.name} className={styles.itemImage} />
                <div className={styles.itemInfo}>
                  <div className={styles.itemName}>{item.name}</div>
                  <div className={styles.itemPrice}>R$ {Number(item.price).toFixed(2).replace('.', ',')}</div>
                  <div style={{ marginTop: 8 }} className={styles.qtyControls}>
                    <button className={`${styles.btn} ${styles.qtyBtn}`} onClick={() => handleQty(item.id, (item.qty || 1) - 1)}>-</button>
                    <div style={{ minWidth: 28, textAlign: 'center' }}>{item.qty || 1}</div>
                    <button className={`${styles.btn} ${styles.qtyBtn}`} onClick={() => handleQty(item.id, (item.qty || 1) + 1)}>+</button>
                  </div>
                </div>
                <div>
                  <button className={styles.removeBtn} onClick={() => handleRemove(item.id)}>Remover</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.summaryCard}>
          <div>
            <div style={{ fontSize: 14, opacity: 0.9 }}>Resumo do pedido</div>
            <div className={styles.totalLarge} style={{ marginTop: 8 }}>R$ {Number(total).toFixed(2).replace('.', ',')}</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button className={`${styles.btn} ${styles.secondaryBtn}`} onClick={() => router.push('/cardapio')}>Continuar comprando</button>
            <button className={`${styles.btn} ${styles.primaryBtn}`} onClick={() => { clearCart(); setCart([]); try { window.dispatchEvent(new Event('storage')); } catch(e){} }}>Limpar carrinho</button>
          </div>
        </div>
        {/* seção de sobremesas */}
        <div style={{ gridColumn: '1 / -1', marginTop: 12 }} className={styles.dessertRow}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ margin: 0 }}>Adicione uma sobremesa!</h3>
            <small style={{ color: '#666' }}>Rolagem horizontal →</small>
          </div>
          <div className={styles.dessertScroller}>
            {desserts.map((d) => (
              <div key={d.id} className={styles.dessertCard}>
                <img src={d.image} alt={d.name} className={styles.dessertImage} />
                <div className={styles.dessertName}>{d.name}</div>
                <div style={{ color: '#666' }}>R$ {Number(d.price).toFixed(2).replace('.', ',')}</div>
                <button className={styles.dessertAddBtn} onClick={() => handleAddDessert(d)}>Adicionar</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
