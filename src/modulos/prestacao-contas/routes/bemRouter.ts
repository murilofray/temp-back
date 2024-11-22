import express from 'express';
import { AuthenticationService } from '../../../middleware/authentication';
import { BemController } from '../controller/bemController';

const router = express.Router();
const authentication = new AuthenticationService();
const bemController = new BemController();

// CRUD
router.post('/', authentication.authenticate, bemController.create);
router.put('/:id', authentication.authenticate, bemController.update);
router.delete('/:id', authentication.authenticate, bemController.delete);

// Propostas
router.post('/proposta/', authentication.authenticate, bemController.createProposta);
router.put('/proposta/:idBem/:idFornecedor', authentication.authenticate, bemController.updateProposta);
router.delete('/proposta/:idBem/:idFornecedor', authentication.authenticate, bemController.deleteProposta);

// Busca
router.get('/id/:id', authentication.authenticate, bemController.getById);
router.get('/pesquisa/:id', authentication.authenticate, bemController.getByPesquisa);

export default router;
