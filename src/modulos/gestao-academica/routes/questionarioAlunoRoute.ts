import { Router } from 'express';
import QuestionarioAlunoController from '../controller/questionarioAlunoController';

const router = Router();
const questionarioAlunoController = new QuestionarioAlunoController();

router.get('/', questionarioAlunoController.index.bind(questionarioAlunoController));
router.get('/:id', questionarioAlunoController.getById.bind(questionarioAlunoController));
router.get('/aluno/:alunoId', questionarioAlunoController.getByAlunoId.bind(questionarioAlunoController));
router.post('/', questionarioAlunoController.create.bind(questionarioAlunoController));
router.delete('/:id', questionarioAlunoController.delete.bind(questionarioAlunoController));

export default router;
