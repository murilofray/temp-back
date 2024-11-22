import express from 'express';
import { ProgressaoController } from '../controller/progressaoController';

const router = express.Router();
const progressaoController = new ProgressaoController();

// CRUD
router.post('/', progressaoController.create);
router.put('/:id', progressaoController.update);
router.delete('/:id', progressaoController.delete);

// Busca
router.get('/id/:id', progressaoController.getById);
router.get('/servidorId/:servidorId', progressaoController.getByServidorId);

export default router;
