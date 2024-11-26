import express from 'express';
import TipoDocumentoController from '../controller/tipoDocumentoController';

const router = express.Router();
const tipoDocumentoController = new TipoDocumentoController();

router.get('/', tipoDocumentoController.index);
router.get('/id/:id', tipoDocumentoController.findById);

export default router;
