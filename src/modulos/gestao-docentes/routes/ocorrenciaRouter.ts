import express from 'express';
import { OcorrenciaController } from '../controller/ocorrenciaController';

const router = express.Router();
const ocorrenciaController = new OcorrenciaController();

// CRUD
router.post('/', ocorrenciaController.create);
router.put('/:id', ocorrenciaController.update);
router.delete('/:id', ocorrenciaController.delete);

// Busca
router.get('/id/:id', ocorrenciaController.getById);
router.get('/servidorId/:servidorId', ocorrenciaController.getByServidorId);
router.get('/', ocorrenciaController.getAll);
router.get('/deleted', ocorrenciaController.findByDeletedAt);
router.put('/:id/status', ocorrenciaController.updateStatus);


export default router;
