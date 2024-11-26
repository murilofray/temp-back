import express from 'express';
import { AuthenticationService } from '../../../middleware/authentication';
import { SaldoContaBancariaController } from '../controller/saldoContaBancariaController';

const router = express.Router();
const authentication = new AuthenticationService();
const saldoContaBancariaController = new SaldoContaBancariaController();

// CRUD
router.post(`/`, authentication.authenticate, saldoContaBancariaController.cadastrarSaldo);

export default router;
