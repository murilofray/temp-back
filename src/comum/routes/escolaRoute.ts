import { Router } from 'express';
import {
    createEscola,
    getEscolas,
    getEscolaById,
    updateEscola,
    deleteEscola
} from '../controller/escolaController';

const router = Router();

router.post('/escolas', createEscola);
router.get('/escolas', getEscolas);
router.get('/escolas/:id', getEscolaById);
router.put('/escolas/:id', updateEscola);
router.delete('/escolas/:id', deleteEscola);

export default router;
