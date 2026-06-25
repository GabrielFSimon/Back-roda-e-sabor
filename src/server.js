import express from 'express';
import './config/env.js';
import { syncModels } from './models/index.js';
import authRoutes from './routes/authRoutes.js';
import usuariosRoutes from './routes/usuariosRoutes.js';
import * as usuarioController from './controllers/usuarioController.js';
import enderecosRoutes from './routes/enderecosRoutes.js';
import cartoesRoutes from './routes/cartoesRoutes.js';
import pagamentosRoutes from './routes/pagamentosRoutes.js';
import itemPedidosRoutes from './routes/itemPedidosRoutes.js';
import premiosUsuarioRoutes from './routes/premiosUsuarioRoutes.js';
import transacoesPontosRoutes from './routes/transacoesPontosRoutes.js';
import menuRoutes from './routes/menuRoutes.js';
import roletaRoutes from './routes/roletaRoutes.js';
import pedidoRoutes from './routes/pedidoRoutes.js';
import pontosRoutes from './routes/pontosRoutes.js';
import { garantirSeedInicial } from './database/bootstrapSeed.js';
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';

const app = express();
const porta = process.env.API_PORT || 3333;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS — permite o domínio do Vercel (e localhost em dev)
const ORIGENS_PERMITIDAS = [
  process.env.FRONTEND_URL,       // ex: https://roda-sabor.vercel.app
  'http://localhost:5173',
  'http://localhost:3000',
].filter(Boolean);

app.use((req, res, next) => {
  const origem = req.headers.origin;
  // Em desenvolvimento aceita tudo; em produção valida a origem
  if (!origem || ORIGENS_PERMITIDAS.includes(origem) || process.env.NODE_ENV !== 'production') {
    res.header('Access-Control-Allow-Origin', origem || '*');
  } else {
    res.header('Access-Control-Allow-Origin', ORIGENS_PERMITIDAS[0]);
  }
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

// Health check — usado pelo Render para saber se o serviço está vivo
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', projeto: 'Roda & Sabor API' });
});

// Rotas de API
app.post('/api/usuarios/register', usuarioController.criar);
app.post('/usuarios/register', usuarioController.criar);

app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/api/enderecos', enderecosRoutes);
app.use('/api/cartoes', cartoesRoutes);
app.use('/api/pagamentos', pagamentosRoutes);
app.use('/api/item-pedidos', itemPedidosRoutes);
app.use('/api/premios-usuario', premiosUsuarioRoutes);
app.use('/api/transacoes-pontos', transacoesPontosRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/roleta', roletaRoutes);
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/pontos', pontosRoutes);

// 404 para qualquer rota não mapeada
app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  try {
    await syncModels();
    await garantirSeedInicial();

    app.listen(porta, () => {
      console.log(`✅ API rodando em http://localhost:${porta}`);
      console.log(`   Frontend esperado em: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar o servidor. Confira o PostgreSQL e o .env.');
    console.error(error);
    process.exit(1);
  }
};

startServer();
