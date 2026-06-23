import express from 'express';
import * as usuarioController from '../controllers/usuarioController.js';
import { autenticar, exigirAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Rota pública para registro/upgrade de perfil (criação de usuário sem exigir autenticação)
router.post('/register', usuarioController.criar);
router.get('/', autenticar, exigirAdmin, usuarioController.listar);
router.get('/:id', autenticar, exigirAdmin, usuarioController.buscar);
router.post('/', autenticar, exigirAdmin, usuarioController.criar);
router.put('/:id', autenticar, exigirAdmin, usuarioController.atualizar);
router.delete('/:id', autenticar, exigirAdmin, usuarioController.remover);

export default router;