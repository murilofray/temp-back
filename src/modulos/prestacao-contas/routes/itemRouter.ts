import express from 'express';
import { AuthenticationService } from '../../../middleware/authentication';
import { ItemController } from '../controller/itemController';

const router = express.Router();
const authentication = new AuthenticationService();
const itemController = new ItemController();

// CRUD
router.post('/', authentication.authenticate, itemController.create);
router.put('/:id', authentication.authenticate, itemController.update);
router.delete('/:id', authentication.authenticate, itemController.delete);

// Propostas
router.post('/proposta/', authentication.authenticate, itemController.createProposta);
router.put('/proposta/:idItem/:idFornecedor', authentication.authenticate, itemController.updateProposta);
router.delete('/proposta/:idItem/:idFornecedor', authentication.authenticate, itemController.deleteProposta);

// Busca
router.get('/id/:id', authentication.authenticate, itemController.getById);
router.get('/pesquisa/:id', authentication.authenticate, itemController.getByPesquisa);

export default router;
