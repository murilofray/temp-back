import express from 'express';
import RelatorioController from '../controller/relatorioController';

const router = express.Router();
const relatorioController = new RelatorioController();

// Relatórios
router.get('/beneficiarios', relatorioController.gerarRelatorioBeneficiariosBF);
router.get('/meninos_meninas', relatorioController.gerarRelatorioMeninosEMeninas);
router.get('/bairros', relatorioController.gerarRelatorioBairros);
router.get('/alunos/raca/:escolaId', relatorioController.gerarRelatorioRacasAlunos);
router.get('/alunos/admin/raca', relatorioController.gerarRelatorioRacasPorAdmin);
router.get('/alunos/admin/bairros', relatorioController.gerarRelatorioBairrosPorAdmin);
router.get('/alunos/admin/meninos_meninas', relatorioController.gerarRelatorioMeninosEMeninasPorAdmin);
router.get('/alunos/admin/beneficiarios', relatorioController.gerarRelatorioBeneficiariosPorAdmin);

export default router;
