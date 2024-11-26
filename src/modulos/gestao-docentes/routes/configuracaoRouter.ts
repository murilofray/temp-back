import express from 'express';
import { ConfiguracaoController } from '../controller/configuracaoController';

const router = express.Router();
const configuracaoController = new ConfiguracaoController();

// CRUD
router.post('/', configuracaoController.create);
router.put('/:id', configuracaoController.update);
router.delete('/:id', configuracaoController.delete);

// Busca
router.get('/', configuracaoController.getAll);
router.get('/id/:id', configuracaoController.getById);

export default router;
