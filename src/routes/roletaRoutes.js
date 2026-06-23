import express from 'express';
import * as roletaController from '../controllers/roletaController.js';
import { autenticar, exigirAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/premios', roletaController.premios);
router.get('/premios/admin/todos', autenticar, exigirAdmin, roletaController.premiosAdmin);
router.get('/premios/admin/:id', autenticar, exigirAdmin, roletaController.buscarPremio);
router.post('/premios/admin', autenticar, exigirAdmin, roletaController.criarPremio);
router.put('/premios/admin/:id', autenticar, exigirAdmin, roletaController.atualizarPremio);
router.delete('/premios/admin/:id', autenticar, exigirAdmin, roletaController.removerPremio);
router.get('/cupons', autenticar, roletaController.cupons);
router.get('/cupons/admin/todos', autenticar, exigirAdmin, roletaController.cuponsAdmin);
router.get('/cupons/admin/:id', autenticar, exigirAdmin, roletaController.buscarCupom);
router.post('/cupons/admin', autenticar, exigirAdmin, roletaController.criarCupom);
router.put('/cupons/admin/:id', autenticar, exigirAdmin, roletaController.atualizarCupom);
router.delete('/cupons/admin/:id', autenticar, exigirAdmin, roletaController.removerCupom);
router.post('/girar', autenticar, roletaController.girar);

export default router;
