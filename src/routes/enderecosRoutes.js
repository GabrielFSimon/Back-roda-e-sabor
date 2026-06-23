import express from 'express';
import * as enderecoController from '../controllers/enderecoController.js';
import { autenticar } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', autenticar, enderecoController.listar);
router.get('/:id', autenticar, enderecoController.buscar);
router.post('/', autenticar, enderecoController.criar);
router.put('/:id', autenticar, enderecoController.atualizar);
router.delete('/:id', autenticar, enderecoController.remover);

export default router;