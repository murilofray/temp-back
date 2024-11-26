import express from 'express';
import { TituloController } from '../controller/tituloController';

const router = express.Router();
const tituloController = new TituloController();

// CRUD
router.post('/', tituloController.create);
router.put('/:id', tituloController.update);
router.delete('/:id', tituloController.delete);

// Busca
router.get('/id/:id', tituloController.getById);
router.get('/servidorId/:servidorId', tituloController.getByServidorId);
router.get('/', tituloController.getAll);
router.get('/deletedAt', tituloController.findByDeletedAt);

export default router;
