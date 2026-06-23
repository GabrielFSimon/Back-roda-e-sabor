import express from 'express';
import * as transacaoPontoController from '../controllers/transacaoPontoController.js';
import { autenticar, exigirAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', autenticar, exigirAdmin, transacaoPontoController.listar);
router.get('/:id', autenticar, exigirAdmin, transacaoPontoController.buscar);
router.post('/', autenticar, exigirAdmin, transacaoPontoController.criar);
router.put('/:id', autenticar, exigirAdmin, transacaoPontoController.atualizar);
router.delete('/:id', autenticar, exigirAdmin, transacaoPontoController.remover);

export default router;