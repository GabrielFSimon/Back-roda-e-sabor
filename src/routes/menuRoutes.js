import express from 'express';
import * as menuController from '../controllers/menuController.js';
import { autenticar, exigirAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', menuController.listar);
router.get('/:id', menuController.buscar);
router.post('/', autenticar, exigirAdmin, menuController.criar);
router.put('/:id', autenticar, exigirAdmin, menuController.atualizar);
router.delete('/:id', autenticar, exigirAdmin, menuController.remover);

export default router;
