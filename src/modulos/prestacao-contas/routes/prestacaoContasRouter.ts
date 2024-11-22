import express from 'express';
import { AuthenticationService } from '../../../middleware/authentication';
import { PrestacaoContasController } from '../controller/prestacaoContaController';

const router = express.Router();
const authentication = new AuthenticationService();
const prestacaoContasController = new PrestacaoContasController();

// CRUD
router.post('/', authentication.authenticate, prestacaoContasController.create);
router.put('/:id', authentication.authenticate, prestacaoContasController.update);
router.delete('/:id', authentication.authenticate, prestacaoContasController.delete);

// Busca
router.get('/id/:id', authentication.authenticate, prestacaoContasController.getById);
router.get('/pdde/:idPDDE', authentication.authenticate, prestacaoContasController.getByAnoPDDE)

export default router;
