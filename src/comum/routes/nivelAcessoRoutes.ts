import { Router } from 'express';
import { getNivelAcessos, getNivelAcessoById, getNivelAcessoByDescricao } from '../controller/nivelAcessoController';

const router = Router();

router.get('/nivelAcessos', getNivelAcessos);
router.get('/nivelAcessos/:id', getNivelAcessoById);
router.get('/nivelAcessos/descricao/:descricao', getNivelAcessoByDescricao);

export default router;
