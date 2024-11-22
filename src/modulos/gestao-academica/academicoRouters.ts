import express from 'express';
import alunoRoute from './routes/alunoRoute';
import turmaRoute from './routes/turmaRoute';
import alergiaRoute from './routes/alergiaRoute';
import tipoAlergiaRoute from './routes/tipoAlergiaRoute';

const router = express.Router();

// Roteamento especifico do módulo de gestão acadêmica

router.use('/aluno', alunoRoute);
router.use('/turma', turmaRoute);
router.use('/alergia', alergiaRoute);
router.use('/tipo-alergia', tipoAlergiaRoute);

export default router;
