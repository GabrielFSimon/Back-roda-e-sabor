import express from 'express';
import * as premioUsuarioController from '../controllers/premioUsuarioController.js';
import { autenticar, exigirAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', autenticar, exigirAdmin, premioUsuarioController.listar);
router.get('/:id', autenticar, exigirAdmin, premioUsuarioController.buscar);
router.post('/', autenticar, exigirAdmin, premioUsuarioController.criar);
router.put('/:id', autenticar, exigirAdmin, premioUsuarioController.atualizar);
router.delete('/:id', autenticar, exigirAdmin, premioUsuarioController.remover);

export default router;