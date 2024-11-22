import { Router } from 'express';
import { createNivelAcessoServidor, updateNivelAcessoServidor, getNivelAcessoByServidorId } from '../controller/nivelAcessoServidorController';

const router = Router();

router.post('/nivel-acesso-servidor', createNivelAcessoServidor);
router.put('/nivel-acesso-servidor/:servidorId', updateNivelAcessoServidor);
router.get('/nivel-acesso-servidor/:servidorId', getNivelAcessoByServidorId);

export default router;
