import express from 'express';
import * as cartaoCreditoController from '../controllers/cartaoCreditoController.js';
import { autenticar } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', autenticar, cartaoCreditoController.listar);
router.get('/:id', autenticar, cartaoCreditoController.buscar);
router.post('/', autenticar, cartaoCreditoController.criar);
router.put('/:id', autenticar, cartaoCreditoController.atualizar);
router.delete('/:id', autenticar, cartaoCreditoController.remover);

export default router;