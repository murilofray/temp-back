import express from 'express';
import RelatorioController from '../controller/relatorioController';

const router = express.Router();
const relatorioController = new RelatorioController();

// Relatórios
router.get('/relatorios/beneficiarios', relatorioController.gerarRelatorioBeneficiariosBF);

export default router;
