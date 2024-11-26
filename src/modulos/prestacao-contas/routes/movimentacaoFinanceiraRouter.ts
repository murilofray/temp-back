import express, { Router } from 'express';
import { AuthenticationService } from '../../../middleware/authentication';
import { MovimentacaoFinanceiraController } from '../controller/movimentacaoFinanceiraController';

const router = Router();
const authentication = new AuthenticationService();
const movimentacaoFinanceiraController = new MovimentacaoFinanceiraController();

// CRUD

router.post('/', authentication.authenticate, movimentacaoFinanceiraController.create);
router.put('/:id', authentication.authenticate, movimentacaoFinanceiraController.update);
router.delete('/:id', authentication.authenticate, movimentacaoFinanceiraController.delete);

// Busca
router.get('/:id', authentication.authenticate, movimentacaoFinanceiraController.getById);
router.get('/conta/:idConta', authentication.authenticate, movimentacaoFinanceiraController.getByContaBancaria);

export default router;
