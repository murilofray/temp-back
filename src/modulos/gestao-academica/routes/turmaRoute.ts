import express from 'express';
import TurmaController from '../controller/turmaController';

const router = express.Router();
const turmaController = new TurmaController();

// Finds
router.get('/', turmaController.index);
router.get('/turma/:id', turmaController.getById);
router.get('/turma/escola/:escolaId', turmaController.getByEscola);

// Cruds
router.post('/', turmaController.create);
router.put('/:id', turmaController.update);
router.delete('/:id', turmaController.delete);

export default router;
