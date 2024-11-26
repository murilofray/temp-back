import express from 'express';
import { AuthenticationService } from '../../../middleware/authentication';
import { AtaController } from '../controller/ataController';
import multer from 'multer';

// Configuração do multer
const upload = multer(); // Este configura o multer para processar FormData sem arquivos para o endpoint de create

const router = express.Router();
const authentication = new AuthenticationService();
const ataController = new AtaController();

// CRUD
router.post('/', upload.none(), (req, res) => ataController.create(req, res));
router.put('/:id', upload.none(), (req, res) => ataController.update(req, res));
router.get('/escola/:idEscola', authentication.authenticate, ataController.getByEscola);
router.get('/', authentication.authenticate, ataController.getAll);

export default router;
