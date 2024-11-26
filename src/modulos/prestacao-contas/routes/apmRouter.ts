import express from 'express';
import { AuthenticationService } from '../../../middleware/authentication';
import { ApmController } from '../controller/apmController';

const router = express.Router();
const authentication = new AuthenticationService();
const apmController = new ApmController();

// CRUD
router.post('/', authentication.authenticate, apmController.create);
router.get('/', authentication.authenticate, apmController.getAll);
router.get('/escola/:idEscola', authentication.authenticate, apmController.getByEscola);
router.put('/:id', authentication.authenticate, apmController.update);
router.delete('/:id', authentication.authenticate, apmController.delete);

export default router;
