import express from 'express';
import * as pagamentoController from '../controllers/pagamentoController.js';
import { autenticar, exigirAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', autenticar, exigirAdmin, pagamentoController.listar);
router.get('/:id', autenticar, exigirAdmin, pagamentoController.buscar);
router.post('/', autenticar, exigirAdmin, pagamentoController.criar);
router.put('/:id', autenticar, exigirAdmin, pagamentoController.atualizar);
router.delete('/:id', autenticar, exigirAdmin, pagamentoController.remover);

export default router;