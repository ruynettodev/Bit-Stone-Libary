const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const booksRoutes = require('./routes/books');

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares de segurança e configuração
app.use(helmet());

// Configuração de CORS para desenvolvimento e produção
const allowedOrigins = [
  'http://localhost:5173/',
  'http://localhost:3000/',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Permitir requests sem origin (ex: mobile apps, Postman)
    if (!origin) return callback(null, true);

    // Permitir origens da lista ou URLs da Vercel
    if (allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
      return callback(null, true);
    }

    callback(new Error('Não permitido pelo CORS'));
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas da API
app.use('/api/books', booksRoutes);

// Rota de health check
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Konige API está funcionando!',
    timestamp: new Date().toISOString()
  });
});

// Rota 404
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Rota não encontrada',
    message: 'A rota solicitada não existe na API'
  });
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error('Erro na aplicação:', err.stack);
  res.status(500).json({
    error: 'Erro interno do servidor',
    message: 'Algo deu errado!'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📚 API Konige - Biblioteca de Livros Favoritos`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
});

module.exports = app;