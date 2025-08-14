# 📚 Bit Stone Library - Biblioteca de Livros Favoritos

Uma aplicação web moderna e intuitiva para organizar seus livros favoritos. Com **tema escuro/claro**, **interface responsiva** e **sistema de scroll otimizado**, oferece uma experiência completa para gerenciar sua biblioteca pessoal.

## 🎯 Objetivo

Desenvolver uma solução prática para substituir planilhas e blocos de notas na organização de livros favoritos, permitindo que qualquer pessoa possa gerenciar sua biblioteca de forma simples através do navegador.

## ✨ Funcionalidades

### 📚 **Gerenciamento de Livros**
- ✅ **Cadastrar livros** (título, autor, ano de publicação)
- ✅ **Marcar livros como favoritos** independente do status de leitura
- ✅ **Marcar livros como lidos** para acompanhar progresso
- ✅ **Remover livros** da lista
- ✅ **Visualizar lista organizada** por seções (Favoritos, Para Ler, Lidos)

### 🎨 **Interface e Experiência**
- ✅ **Tema escuro/claro** com alternância e persistência
- ✅ **Interface totalmente responsiva** (mobile, tablet, desktop)
- ✅ **Sistema de scroll otimizado** para listas longas
- ✅ **Animações suaves** e micro-interações
- ✅ **Feedback visual claro** para todas as ações

### 📊 **Dashboard e Estatísticas**
- ✅ **Contador em tempo real** (total, favoritos, lidos, para ler)
- ✅ **Barra de progresso** de leitura
- ✅ **Cards estatísticos** com indicadores visuais
- ✅ **Layout adaptativo** para diferentes telas

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **Supabase** - Banco de dados PostgreSQL
- **Helmet** - Segurança HTTP
- **CORS** - Controle de acesso

### Frontend
- **React 18** - Biblioteca de interface
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework de estilização
- **Axios** - Cliente HTTP
- **Lucide React** - Ícones

### Banco de Dados
- **PostgreSQL** (via Supabase)

## 📋 Pré-requisitos

- Node.js 18+ instalado
- Conta no Supabase (gratuita)
- Git

## 🚀 Instalação e Configuração

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd magni
```

### 2. Configurar o Supabase

1. Acesse [supabase.com](https://supabase.com) e crie uma conta
2. Crie um novo projeto
3. Vá para **SQL Editor** e execute o seguinte script para criar a tabela:

```sql
-- Criar tabela de livros
CREATE TABLE books (
  id BIGSERIAL PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  autor VARCHAR(255) NOT NULL,
  ano INTEGER NOT NULL,
  lido BOOLEAN DEFAULT FALSE,
  favorito BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

4. Copie a **URL do projeto** e a **chave anon/public** das configurações do projeto

### 3. Configurar o Backend

```bash
cd backend

# Instalar dependências
npm install

# Criar arquivo de ambiente
cp .env.example .env

# Editar o arquivo .env com suas credenciais do Supabase
nano .env
```

Configurar o arquivo `.env`:
```env
SUPABASE_URL=sua_url_do_supabase
SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### 4. Configurar o Frontend

```bash
cd ../frontend

# Instalar dependências
npm install

# Criar arquivo de ambiente
cp .env.example .env.local

# Editar o arquivo de ambiente
nano .env.local
```

Configurar o arquivo `.env.local`:
```env
VITE_API_URL=http://localhost:3001
```

## 🏃‍♂️ Executando a Aplicação

### Executar Backend
```bash
cd backend
npm run dev
```
O servidor estará rodando em: http://localhost:3001

### Executar Frontend
```bash
cd frontend
npm run dev
```
A aplicação estará disponível em: http://localhost:5173

## 📡 API Endpoints

### Livros
- `GET /api/books` - Listar todos os livros
- `POST /api/books` - Cadastrar novo livro
- `PUT /api/books/:id/toggle-read` - Marcar/desmarcar como lido
- `PUT /api/books/:id/toggle-favorite` - Marcar/desmarcar como favorito
- `DELETE /api/books/:id` - Remover livro

### Health Check
- `GET /health` - Verificar status da API

## 🧪 Testando a API

```bash
# Listar livros
curl http://localhost:3001/api/books

# Adicionar livro
curl -X POST http://localhost:3001/api/books \
  -H "Content-Type: application/json" \
  -d '{"titulo":"1984","autor":"George Orwell","ano":1949}'

# Health check
curl http://localhost:3001/health
```

## 🚀 Deploy

### Backend - Railway
1. Conecte seu repositório no [Railway](https://railway.app)
2. Configure as variáveis de ambiente
3. Deploy automático será feito

### Frontend - Vercel
1. Conecte seu repositório no [Vercel](https://vercel.com)
2. Configure a variável `VITE_API_URL` com a URL do backend
3. Deploy automático será feito

## 📁 Estrutura do Projeto

```
magni/
├── backend/
│   ├── config/
│   │   └── supabase.js
│   ├── routes/
│   │   └── books.js
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── BookForm.jsx
│   │   │   ├── BookList.jsx
│   │   │   ├── BookCard.jsx
│   │   │   └── LoadingSpinner.jsx
│   │   ├── services/
│   │   │   └── bookService.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
└── README.md
```

## 🎨 Capturas de Tela

A interface apresenta:
- **Header** com estatísticas da biblioteca
- **Formulário** para adicionar novos livros
- **Lista organizada** de livros (lidos e não lidos)
- **Indicadores visuais** claros para status de leitura
- **Barra de progresso** de leitura

## 🔧 Regras de Negócio Implementadas

1. **Cadastro de Livros**:
   - Título, autor e ano são obrigatórios
   - Ano deve ser válido (entre 1000 e ano atual + 1)
   - Livros iniciam como "não lidos"

2. **Gestão de Status**:
   - Livros podem ser marcados/desmarcados como lidos
   - Status é persistido no banco de dados
   - Interface visual diferencia livros lidos

3. **Organização**:
   - Livros são exibidos separados por status
   - Ordenação por data de criação (mais recentes primeiro)
   - Contador de progresso baseado em livros lidos

4. **Validações**:
   - Validação client-side e server-side
   - Mensagens de erro claras
   - Confirmação para remoção de livros

## 🤝 Contribuição

Este projeto segue as melhores práticas de desenvolvimento:

- **Clean Code** - Código limpo e bem documentado
- **Conventional Commits** - Padrão de commits
- **Componentização** - Componentes reutilizáveis
- **Responsividade** - Interface adaptável
- **Tratamento de Erros** - Feedback adequado ao usuário

## 📄 Licença

MIT License - veja o arquivo LICENSE para mais detalhes.

## 🏆 Desafio Konige

Este projeto foi desenvolvido como parte do desafio prático da **Konige**, aplicando conhecimentos de:
- Organização de projeto e estratégia de desenvolvimento
- Boas práticas de código (Clean Code)
- Uso do Git em fluxo colaborativo
- Deploy de aplicação para acesso público

---

**Desenvolvido com ❤️ para a Bit Stone Library**
