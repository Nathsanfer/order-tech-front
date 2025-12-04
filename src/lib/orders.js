export function gerarSenha() {
  // Gera uma senha simples de 4 dígitos — ajuste conforme sua regra
  return String(Math.floor(Math.random() * 9000) + 1000);
}

export function salvarPedido({ senha, itens }) {
  const pedidosAtuais = JSON.parse(localStorage.getItem("pedidos") || "[]");
  const novoPedido = {
    id: Date.now().toString(),
    senha,
    itens,
    criadoEm: new Date().toISOString(),
  };
  pedidosAtuais.push(novoPedido);
  localStorage.setItem("pedidos", JSON.stringify(pedidosAtuais));
  return novoPedido;
}