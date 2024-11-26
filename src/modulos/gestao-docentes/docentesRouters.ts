import express from 'express';
import ocorrenciaRouter from './routes/ocorrenciaRouter';
import abonoRouter from './routes/abonoRouter';
import tituloRouter from './routes/tituloRouter';
import docenteRouter from './routes/docenteRouter';
import quinquenioRouter from './routes/quinquenioRouter';
import configuracaoRouter from './routes/configuracaoRouter';
import progressaoRouter from './routes/progressaoRouter';
import servidorRouter from './routes/servidorRouter';
import categoriaCertificadoRouter from './routes/categoriaCertificadoRouter';

const router = express.Router();

// Roteamento especifico do módulo de gestão de docentes

router.use('/ocorrencia', ocorrenciaRouter);
router.use('/abono', abonoRouter);
router.use('/titulo', tituloRouter);
router.use('/progressao', progressaoRouter);
router.use('/professor', docenteRouter);
router.use('/quinquenio', quinquenioRouter);
router.use('/configuracao', configuracaoRouter);
router.use('/servidor', servidorRouter);
router.use('/categoriaCertificado', categoriaCertificadoRouter);

export default router;
