import { Router } from 'express';
import QuestionarioController from '../controller/questionarioController';

const router = Router();
const questionarioController = new QuestionarioController();

router.get('/', questionarioController.index.bind(questionarioController));
router.get('/:id', questionarioController.getById.bind(questionarioController));
router.post('/', questionarioController.create.bind(questionarioController));
router.put('/:id', questionarioController.update.bind(questionarioController));
router.delete('/:id', questionarioController.delete.bind(questionarioController));

export default router;
