import express from 'express';
import { AuthenticationService } from '../../../middleware/authentication';
import { SaldoPddeController } from '../controller/saldoPddeController';

const router = express.Router();
const authentication = new AuthenticationService();
const saldoPddeController = new SaldoPddeController();

router.post(`/`, authentication.authenticate, saldoPddeController.cadastrarSaldoPDDE);

export default router;
