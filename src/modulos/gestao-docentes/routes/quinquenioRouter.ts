import express from 'express';
import { QuinquenioController } from '../controller/quinquenioController';

const router = express.Router();
const quinquenioController = new QuinquenioController();

// CRUD
router.post('/', quinquenioController.create);
router.put('/:id', quinquenioController.update);
router.delete('/:id', quinquenioController.delete);

// Busca
router.get('/id/:id', quinquenioController.getById);
router.get('/servidorId/:servidorId', quinquenioController.getByServidorId);

export default router;
