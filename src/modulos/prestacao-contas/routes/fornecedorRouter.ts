import express from 'express';
import { AuthenticationService } from '../../../middleware/authentication';
import { FornecedorController } from '../controller/fornecedorController';

const router = express.Router();
const authentication = new AuthenticationService();
const fornecedorController = new FornecedorController();

// CRUD

router.put('/upsert/:id?', authentication.authenticate.bind(authentication), fornecedorController.updateOrCreate);
router.post('/', authentication.authenticate.bind(authentication), fornecedorController.create);
router.put('/:id', authentication.authenticate.bind(authentication), fornecedorController.update);
router.delete('/:id', authentication.authenticate.bind(authentication), fornecedorController.delete);

// Busca
router.get('/id/:id', authentication.authenticate.bind(authentication), fornecedorController.getById);
router.get('/', authentication.authenticate.bind(authentication), fornecedorController.getAll);
router.get('/pesquisa/:idPesquisa', authentication.authenticate.bind(authentication), fornecedorController.getByPesquisa);
router.get('/cnpj/:cnpj', authentication.authenticate.bind(authentication), fornecedorController.getByCNPJ);
router.get('/cpf/:cpf', authentication.authenticate.bind(authentication), fornecedorController.getByCPF);

export default router;
