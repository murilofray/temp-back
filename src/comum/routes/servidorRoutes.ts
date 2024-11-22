import { Router } from 'express';
import {
  createServidor,
  getServidores,
  getServidorById,
  updateServidor,
  deleteServidor,
  getServidoresByEscola,
} from '../controller/servidorController';

const router = Router();

router.post('/servidores', createServidor);
router.get('/servidores', getServidores);
router.get('/servidores/:id', getServidorById);
router.get('/servidores/escola/:escolaId', getServidoresByEscola);
router.put('/servidores/:id', updateServidor);
router.delete('/servidores/:id', deleteServidor);

export default router;
