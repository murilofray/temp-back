import express from 'express';
import { AuthenticationService } from '../../../middleware/authentication';
import { OficioMemorandoController } from '../controller/oficioMemorandoController';

const router = express.Router();
const authentication = new AuthenticationService();
const oficioMemorandoController = new OficioMemorandoController();

// CRUD
router.post('/', authentication.authenticate, oficioMemorandoController.create);
router.put('/:id', authentication.authenticate, oficioMemorandoController.update);
router.delete('/:id', authentication.authenticate, oficioMemorandoController.delete);

// Busca
router.get('/:id', authentication.authenticate, oficioMemorandoController.getById);
router.get('/escola/:idEscola', authentication.authenticate, oficioMemorandoController.getByEscola);

export default router;
