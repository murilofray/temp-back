import { Router } from 'express';
import {
  createServidor,
  getServidores,
  getServidorById,
  updateServidor,
  deleteServidor,
  getServidoresByEscola,
  getServidoresByNivelAcessoId,
  getServidoresByNivelAcessoAndEscola,
  redefinirSenha,
  getServidoresByNivelAcesso
} from '../controller/servidorController';

const router = Router();

router.post('/servidores', createServidor);
router.get('/servidores/nivel-acesso', getServidoresByNivelAcesso);
router.get('/servidores', getServidores);
router.get('/servidores/:id', getServidorById);
router.get('/servidores/escola/:escolaId', getServidoresByEscola);
router.get('/servidores/nivelacesso/:nivelAcessoId', getServidoresByNivelAcessoId)
router.get('/servidores/escola/:escolaId/:nivelAcessoId', getServidoresByNivelAcessoAndEscola)
router.put('/servidores/:id', updateServidor);
router.delete('/servidores/:id', deleteServidor);
router.put('/servidores/:id/redefinir-senha', redefinirSenha);

export default router;
