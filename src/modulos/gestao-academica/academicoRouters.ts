import express from 'express';
import alunoRoute from './routes/alunoRoute';
import turmaRoute from './routes/turmaRoute';
import alergiaRoute from './routes/alergiaRoute';
import tipoAlergiaRoute from './routes/tipoAlergiaRoute';
import questionarioRoute from './routes/questionarioRoute';
import questionarioAlunoRoute from './routes/questionarioAlunoRoute';
import relatorioRoute from './routes/relatorioRoute';

const router = express.Router();

// Roteamento especifico do módulo de gestão acadêmica

router.use('/aluno', alunoRoute);
router.use('/turma', turmaRoute);
router.use('/alergia', alergiaRoute);
router.use('/tipo-alergia', tipoAlergiaRoute);
router.use('/questionario', questionarioRoute);
router.use('/questionario-aluno', questionarioAlunoRoute);
router.use('/relatorios', relatorioRoute);

export default router;
