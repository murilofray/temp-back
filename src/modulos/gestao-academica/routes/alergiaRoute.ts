import express from 'express';
import AlergiaController from '../controller/alergiaController';

const router = express.Router();
const alergiaController = new AlergiaController();

// Finds
router.get('/', alergiaController.index);
router.get('/id/:id', alergiaController.getById);
router.get('/descricao/:descricao', alergiaController.getByDescricao);
router.get('/aluno/:alunoId/alergias', alergiaController.getAlergiasByAlunoId);

// Cruds
router.post('/', alergiaController.create);
router.put('/:id', alergiaController.update);
router.delete('/:id', alergiaController.delete);

// Relatório
router.get('/relatorio', alergiaController.gerarRelatorio);

export default router;
