# 🍔 OrderTech — Frontend (Next.js)

Aplicação frontend em Next.js para o projeto OrderTech — interface para visualizar o cardápio, montar pedidos, consultar o painel e interagir com o totem.

Este repositório contém a UI (parte frontend) do OrderTech. O frontend consome uma API (backend) responsável por gerenciar itens do cardápio, usuários e pedidos. Este README explica como clonar, configurar e rodar o projeto localmente.

## Tecnologias

- **Framework:** Next.js 13+ (app router)
- **Linguagem:** JavaScript / React
- **Estilos:** CSS Modules
- **Imagens/Assets:** pasta `public/`

## Clone do repositório

- **URL:** https://github.com/Nathsanfer/order-tech-front.git

## Começando (instalação & configuração)

Clone o repositório e abra a pasta:

```bat
git clone https://github.com/Nathsanfer/order-tech-front.git
cd order-tech-front
```

Instale dependências:

```bat
npm install
```

### Variáveis de ambiente (opcional)

Crie um arquivo `.env.local` na raiz para apontar a URL da API do backend (exemplo mínimo):

```env
NEXT_PUBLIC_API_URL=http://localhost:5001
# Para o servidor Next em produção, você pode usar PORT=3000
```

## Rodando em desenvolvimento

```bat
npm run dev
```

Por padrão o Next.js roda em http://localhost:3000.

## Build para produção

```bat
npm run build
npm start
```

## Nota sobre PowerShell / Windows

Se estiver no PowerShell e ocorrerem erros ao executar scripts npm, abra o Prompt de Comando (`cmd.exe`) ou invoque `npm.cmd` manualmente.

## Visão geral do repositório

- **`src/app/`**: rotas e páginas do Next.js (app router). Principais rotas encontradas:
  - `home/` — página inicial
  - `cardapio/` — visualizar itens do cardápio e detalhes (`[id]`)
  - `carrinho/` — página do carrinho
  - `painel/` — painel de pedidos
  - `senhas/` — gerenciamento de senhas/painel
- **`public/`**: ícones e imagens públicas
- **`next.config.mjs`** e **`jsconfig.json`**: configuração do projeto

## Como o frontend se comunica com a API

- O frontend espera uma API REST que exponha endpoints para `menu/items`, `orders`, `user`, etc. Configure `NEXT_PUBLIC_API_URL` para apontar para o backend local (ex.: `http://localhost:5000`).

## Fluxo comum de uso

- Usuário visualiza o menu em `GET /menu` pela API.
- Usuário adiciona itens ao carrinho e submete um pedido; o frontend envia POST para o backend (ex.: `POST /orders/with-items`).

## Scripts úteis (em `package.json`)

- **`dev`**: roda Next.js em modo desenvolvimento (`npm run dev`).
- **`build`**: gera build de produção.
- **`start`**: inicia servidor de produção após build.

## Estrutura rápida de rotas (resumo)

- `GET /` — Home
- `GET /cardapio` — Lista de itens
- `GET /cardapio/:id` — Detalhe do item
- `GET /carrinho` — Carrinho
- `GET /painel` — Painel de pedidos

## Dicas de troubleshooting

- 400/422: verifique os dados enviados ao backend (corpos JSON, nomes de campos).
- 415 Unsupported Media Type: verifique header `Content-Type: application/json` quando enviar JSON via fetch/axios.
- 500 Internal Server Error: verifique os logs do backend e o console do navegador (Network tab).
- Erro ao rodar `npm run dev` no PowerShell: use `cmd.exe` ou `npm.cmd`.

## Boas práticas e próximos passos

- Não esqueça de configurar corretamente `NEXT_PUBLIC_API_URL` para não expor endpoints errados.
- Para produção, use um backend estável (Postgres, API hospedada) e ative CORS apropriadamente.
- Adicionar autenticação (JWT) no backend e integrar fluxos de login no frontend.

## Contribuição

- Fork & clone o repositório.
- Crie uma branch com sua feature: `git checkout -b feat/minha-feature`.
- Faça commits pequenos e claros e abra um Pull Request.

## Posso ajudar com:

- Gerar uma Collection do Postman (ou scripts Newman) para testar a API usada pelo frontend.
- Ajustar ou documentar endpoints no frontend para um backend específico.

Arquivo atualizado em: `README.md` no repositório `order-tech-front`.

Bom trabalho — quer que eu gere uma Collection do Postman ou adicione instruções de deploy?
