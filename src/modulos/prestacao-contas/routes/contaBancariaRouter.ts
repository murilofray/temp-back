import express from 'express';
import { AuthenticationService } from '../../../middleware/authentication';
import { ContaBancariaController } from '../controller/contaBancariaController';

const router = express.Router();
const authentication = new AuthenticationService();
const contaBancariaController = new ContaBancariaController();

// CRUD
router.post(`/`, authentication.authenticate, contaBancariaController.cadastrarContaBancaria);
router.get(`/`, authentication.authenticate, contaBancariaController.listarContasBancarias);
router.get(`/:id`, authentication.authenticate, contaBancariaController.getContaBancariaById);
router.get(`/escola/:escolaId`, authentication.authenticate, contaBancariaController.listarContasPorEscola);


export default router;
