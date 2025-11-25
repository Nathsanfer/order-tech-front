const CART_KEY = 'ordertech_cart_v1';

export function getCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('getCart error', e);
    return [];
  }
}

export function saveCart(cart) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (e) {
    console.error('saveCart error', e);
  }
}

export function addToCart(item, qty = 1) {
  const cart = getCart();
  const id = item.id || item.id_item || item._id || item.name;
  const existing = cart.find((p) => String(p.id) === String(id));
  if (existing) {
    existing.qty = (existing.qty || 1) + qty;
  } else {
    cart.push({
      id,
      name: item.name || item.nome || '',
      price: item.cost ?? item.preco ?? 0,
      image: item.imageUrl || item.imagem || '/lancheYummy.png',
      qty: qty
    });
  }
  saveCart(cart);
  return cart;
}

export function removeFromCart(id) {
  const cart = getCart();
  const filtered = cart.filter((p) => String(p.id) !== String(id));
  saveCart(filtered);
  return filtered;
}

export function updateQty(id, qty) {
  const cart = getCart();
  const found = cart.find((p) => String(p.id) === String(id));
  if (found) {
    found.qty = qty;
    if (found.qty <= 0) {
      return removeFromCart(id);
    }
  }
  saveCart(cart);
  return cart;
}

export function clearCart() {
  saveCart([]);
}

export function getCartCount() {
  const cart = getCart();
  return cart.reduce((s, p) => s + (p.qty || 0), 0);
}
