import express from 'express';
import { AuthenticationService } from '../../../middleware/authentication';
import { createMembroAPM } from '../controller/membroAPMController';

const router = express.Router();
const authentication = new AuthenticationService();

// CRUD
router.post('/', authentication.authenticate, createMembroAPM);
// router.put('/:id', authentication.authenticate, membroAPMController.update);
// router.delete('/:id', authentication.authenticate, membroAPMController.delete);

// Busca
// router.get('/id/:id', authentication.authenticate, membroAPMController.getById);
// router.get('/escola/:idEscola', authentication.authenticate, membroAPMController.getByEscola);

export default router;
