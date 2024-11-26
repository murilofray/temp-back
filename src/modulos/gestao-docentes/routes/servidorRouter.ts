import express from 'express';
import { ServidorController } from '../controller/servidorController';

const router = express.Router();
const servidorController = new ServidorController();

router.get('/', servidorController.getAll);

export default router;
