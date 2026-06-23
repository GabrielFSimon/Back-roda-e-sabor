import express from 'express';
import * as pedidoController from '../controllers/pedidoController.js';
import { autenticar, exigirAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', autenticar, pedidoController.listar);
router.get('/admin/todos', autenticar, exigirAdmin, pedidoController.listarTodos);
router.get('/admin/:id', autenticar, exigirAdmin, pedidoController.buscar);
router.post('/', autenticar, pedidoController.criar);
router.put('/admin/:id', autenticar, exigirAdmin, pedidoController.atualizar);
router.delete('/admin/:id', autenticar, exigirAdmin, pedidoController.remover);

export default router;
