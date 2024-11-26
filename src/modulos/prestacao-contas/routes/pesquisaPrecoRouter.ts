import express from 'express';
import { AuthenticationService } from '../../../middleware/authentication';
import { PesquisaPrecoController } from '../controller/pesquisaPrecoController';

const router = express.Router();
const authentication = new AuthenticationService();
const pesquisaController = new PesquisaPrecoController();

// CRUD
router.post('/', authentication.authenticate.bind(authentication), pesquisaController.create);
router.put('/:id', authentication.authenticate.bind(authentication), pesquisaController.update);
router.delete('/:id', authentication.authenticate.bind(authentication), pesquisaController.delete);
router.get('/:id', authentication.authenticate.bind(authentication), pesquisaController.getById);

// Busca
router.get('/prestacao/:idPrestacao', authentication.authenticate.bind(authentication), pesquisaController.getByPrestacao);
router.get('/programa/:idPrograma', authentication.authenticate.bind(authentication), pesquisaController.getByPrograma);

export default router;
