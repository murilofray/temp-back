import express from 'express';
import { DocenteController } from '../controller/docenteController';

const router = express.Router();
const docenteController = new DocenteController();

// Rota para obter todos os docentes
router.get('/', docenteController.getAllDocentes);

export default router;
