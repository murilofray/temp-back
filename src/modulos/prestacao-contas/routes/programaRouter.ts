import express from 'express';
import { AuthenticationService } from '../../../middleware/authentication';
import { ProgramaController } from '../controller/programaController';

const router = express.Router();
const authentication = new AuthenticationService();
const programaController = new ProgramaController();

// CRUD
router.post('/', authentication.authenticate, programaController.cadastrarPrograma);
router.put('/:id', authentication.authenticate, programaController.update);

router.get('/pdde/:idPDDE', authentication.authenticate, programaController.getByPDDE);

export default router;
