import express from 'express';
import TipoAlergiaController from '../controller/tipoAlergiaController';

const router = express.Router();
const tipoAlergiaController = new TipoAlergiaController();

// Finds
router.get('/', tipoAlergiaController.index);

// Cruds
router.post('/', tipoAlergiaController.create);
router.put('/:id', tipoAlergiaController.update);
router.delete('/:id', tipoAlergiaController.delete);

export default router;
