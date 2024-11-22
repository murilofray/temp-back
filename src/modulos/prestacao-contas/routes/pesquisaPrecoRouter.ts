import express from 'express';
import { AuthenticationService } from '../../../middleware/authentication';
import { PesquisaPrecoController } from '../controller/pesquisaPrecoController';

const router = express.Router();
const authentication = new AuthenticationService();
const pesquisaController = new PesquisaPrecoController();

// CRUD
router.post('/', authentication.authenticate, pesquisaController.create);
router.put('/:id', authentication.authenticate, pesquisaController.update);
router.delete('/:id', authentication.authenticate, pesquisaController.delete);
router.get('/:id', authentication.authenticate, pesquisaController.getById);

// Busca
router.get('/prestacao/:id', authentication.authenticate, pesquisaController.getByPrestacao);

export default router;
