import express from 'express';
import multerConfig from '../../../config/multer';
import multer from 'multer';
import DocumentoController from '../controller/documentoController';

const upload = multer(multerConfig);
const router = express.Router();
const documentoController = new DocumentoController();

router.get('/', documentoController.index);
router.get('/deleted/', documentoController.deletados);
router.get('/id/:id', documentoController.findById);
router.get('/download/', documentoController.downloadDoc);
router.get('/recover/:id', documentoController.recover);
router.get('/aluno/:id', documentoController.getDocumentosByAlunoId);

router.get('/atas', (req, res) => documentoController.getAtaDocumentosScan(req, res));

router.post('/', upload.single('pdf'), documentoController.create);
router.put('/:id', upload.single('pdf'), documentoController.update);
router.delete('/:id', documentoController.delete);
router.get('/ultimo-tipo-20', documentoController.getLastDocumentoTipo20.bind(documentoController));
router.put('/ata/:id', upload.single('pdf'), documentoController.updateAta)

export default router;
