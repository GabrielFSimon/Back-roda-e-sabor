import express from 'express';
import * as authController from '../controllers/authController.js';
import { autenticar } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/cadastro', authController.cadastrar);
router.post('/login', authController.login);
router.get('/me', autenticar, authController.me);
router.put('/me', autenticar, authController.atualizarPerfil);
router.put('/me/senha', autenticar, authController.atualizarSenha);
router.delete('/me', autenticar, authController.removerConta);

export default router;
