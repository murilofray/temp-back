import express from 'express';
import { AuthenticationService } from '../../../middleware/authentication';
import { FornecedorController } from '../controller/fornecedorController';

const router = express.Router();
const authentication = new AuthenticationService();
const fornecedorController = new FornecedorController();

// CRUD

router.put('/upsert/:id?', authentication.authenticate, fornecedorController.updateOrCreate);
router.post('/', authentication.authenticate, fornecedorController.create);
router.put('/:id', authentication.authenticate, fornecedorController.update);
router.delete('/:id', authentication.authenticate, fornecedorController.delete);

// Busca
router.get('/id/:id', authentication.authenticate, fornecedorController.getById);
router.get('/', authentication.authenticate, fornecedorController.getAll);
router.get('/pesquisa/:idPesquisa', authentication.authenticate, fornecedorController.getByPesquisa);
router.get('/cnpj/:cnpj', authentication.authenticate, fornecedorController.getByCNPJ);
router.get('/cpf/:cpf', authentication.authenticate, fornecedorController.getByCPF);

export default router;
