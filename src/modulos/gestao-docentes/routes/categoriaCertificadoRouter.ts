import express from 'express';
import { CategoriaCertificadoController } from '../controller/categoriaCertificadoController';

const router = express.Router();
const categoriaCertificadoController = new CategoriaCertificadoController();

// CRUD
router.post('/', categoriaCertificadoController.create);
router.put('/:id', categoriaCertificadoController.update);
router.delete('/:id', categoriaCertificadoController.delete);

// Busca
router.get('/', categoriaCertificadoController.index);
router.get('/id/:id', categoriaCertificadoController.getById);
router.get('/nome/:nome', categoriaCertificadoController.getByNome);

export default router;
