import express from 'express';
import * as pontosController from '../controllers/pontosController.js';
import { autenticar, exigirAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/extrato', autenticar, pontosController.extrato);
router.get('/admin/todos', autenticar, exigirAdmin, pontosController.listar);
router.get('/admin/:id', autenticar, exigirAdmin, pontosController.buscar);
router.post('/admin', autenticar, exigirAdmin, pontosController.criar);
router.put('/admin/:id', autenticar, exigirAdmin, pontosController.atualizar);
router.delete('/admin/:id', autenticar, exigirAdmin, pontosController.remover);

export default router;
