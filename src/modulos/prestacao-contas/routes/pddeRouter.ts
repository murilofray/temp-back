import express from 'express';
import { AuthenticationService } from '../../../middleware/authentication';
import { PddeController } from '../controller/pddeController';

const router = express.Router();
const authentication = new AuthenticationService();
const pddeController = new PddeController();

router.post(`/`, authentication.authenticate, pddeController.cadastrarPDDE);
router.get(`/saldo`, authentication.authenticate, pddeController.listarPDDEComSaldo);
router.get(`/listarPorEscola/:escolaId`, authentication.authenticate, pddeController.listarPDDEComSaldoPorEscola)

router.get(`/`, authentication.authenticate, pddeController.listarTodosPDDEs);
router.get('/:id', authentication.authenticate, pddeController.getById);
export default router;
