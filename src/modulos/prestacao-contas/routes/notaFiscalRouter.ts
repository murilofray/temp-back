import express from 'express';
import { AuthenticationService } from '../../../middleware/authentication';
import { NotaFiscalController } from '../controller/notaFiscalController';

const router = express.Router();
const authentication = new AuthenticationService();
const notaFiscalController = new NotaFiscalController();

// CRUD
router.post('/', authentication.authenticate, notaFiscalController.create);
router.put('/:id', authentication.authenticate, notaFiscalController.update);
router.delete('/:id', authentication.authenticate, notaFiscalController.delete);

// Busca
router.get('/:id', authentication.authenticate, notaFiscalController.getById);
router.get('/bem/:id', authentication.authenticate, notaFiscalController.findByBem);
router.get('/pesquisa/:id', authentication.authenticate, notaFiscalController.findByPesquisa);

export default router;
