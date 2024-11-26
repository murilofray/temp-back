import express from 'express';
import { AuthController } from '../controller/authController';
import { ProtectedController } from '../controller/protectedController';
import { AuthenticationService } from '../../middleware/authentication';

const router = express.Router();
const authController = new AuthController();
const protectedController = new ProtectedController();
const authentication = new AuthenticationService();

// Rota de login
router.post('/login', authController.login);

// Rota de verificação de token JWT
router.post('/verify-token', authController.verifyToken);

// Rota protegida
// Remover: Exemplo de rota protegida
router.get('/protected', authentication.authenticate.bind(authentication), protectedController.getProtectedData);

export default router;
