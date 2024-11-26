import express from 'express';
import authRoutes from './routes/authRoutes';
import documentoRouter from './routes/documentoRoute';
import tipoDocumentoRouter from './routes/tipoDocumentoRoute';
import servidorRoutes from './routes/servidorRoutes';
import nivelAcessoServidorRoutes from './routes/nivelAcessoServidorRoutes';
import nivelAcessoRoutes from './routes/nivelAcessoRoutes';
import escolaRoute from './routes/escolaRoute';

const router = express.Router();

// Roteamento especifico para funcionalidades comuns
router.use('/auth', authRoutes);

router.use('/doc', documentoRouter);
router.use('/tipo-doc', tipoDocumentoRouter);

router.use('/servidor', servidorRoutes);
router.use('/nivelAcesso', nivelAcessoServidorRoutes);
router.use('/nivel', nivelAcessoRoutes);

router.use('/escola', escolaRoute);

export default router;

