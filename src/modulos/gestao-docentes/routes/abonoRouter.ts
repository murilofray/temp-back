import express from 'express';
import { AbonoController } from '../controller/abonoController';

const router = express.Router();
const abonoController = new AbonoController();

// CRUD
router.post('/', abonoController.create);
router.put('/:id', abonoController.update);
router.delete('/:id', abonoController.delete);

// Busca
router.get('/', abonoController.index);
router.get('/id/:id', abonoController.getById);
router.get('/nome/:nome', abonoController.getByNome);

export default router;
