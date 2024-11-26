import { Router } from 'express';
import { createEscola, getEscolas, getEscolaById, updateEscola, deleteEscola } from '../controller/escolaController';

const router = Router();

router.post('/', createEscola);
router.get('/', getEscolas);
router.get('/:id', getEscolaById);
router.put('/:id', updateEscola);
router.delete('/:id', deleteEscola);

export default router;
