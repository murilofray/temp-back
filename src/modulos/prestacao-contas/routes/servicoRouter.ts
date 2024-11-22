import express from 'express';
import { AuthenticationService } from '../../../middleware/authentication';
import { ServicoController } from '../controller/servicoController';

const router = express.Router();
const authentication = new AuthenticationService();
const servicoController = new ServicoController();

// CRUD
router.post('/', authentication.authenticate, servicoController.create);
router.put('/:id', authentication.authenticate, servicoController.update);
router.delete('/:id', authentication.authenticate, servicoController.delete);

// Propostas
router.post('/proposta', authentication.authenticate, servicoController.createProposta);
router.put('/proposta/:idServico/:idFornecedor', authentication.authenticate, servicoController.updateProposta);
router.delete('/proposta/:idServico/:idFornecedor', authentication.authenticate, servicoController.deleteProposta);

// Busca
router.get('/id/:id', authentication.authenticate, servicoController.getById);
router.use('/pesquisa/:id', authentication.authenticate, servicoController.getByPesquisa);

export default router;
