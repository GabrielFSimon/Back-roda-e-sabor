import express from 'express';
import * as itemPedidoController from '../controllers/itemPedidoController.js';
import { autenticar, exigirAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', autenticar, exigirAdmin, itemPedidoController.listar);
router.get('/:id', autenticar, exigirAdmin, itemPedidoController.buscar);
router.post('/', autenticar, exigirAdmin, itemPedidoController.criar);
router.put('/:id', autenticar, exigirAdmin, itemPedidoController.atualizar);
router.delete('/:id', autenticar, exigirAdmin, itemPedidoController.remover);

export default router;