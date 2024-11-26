import express from 'express';
import apmRouter from './routes/apmRouter';
import bemRouter from './routes/bemRouter';
import fornecedorRouter from './routes/fornecedorRouter';
import pesquisaPrecoRouter from './routes/pesquisaPrecoRouter';
import contaBancariaRouter from './routes/contaBancariaRouter';
import saldoContaBancariaRouter from './routes/saldoContaBancariaRouter';
import pddeRouter from './routes/pddeRouter';
import saldoPddeRouter from './routes/saldoPddeRouter';
import programaRouter from './routes/programaRouter';
import prestacaoContasRouter from './routes/prestacaoContasRouter';
import servicoRouter from './routes/servicoRouter';
import movimentacaoFinanceiraRouter from './routes/movimentacaoFinanceiraRouter';
import ataRouter from './routes/ataRouter';
import oficioMemorandoRouter from './routes/oficioMemorandoRouter';
import membroAPMRouter from './routes/membroAPMRouter';

const router = express.Router();

// Roteamento especifico do módulo de prestação de contas

// PDDE e Contas
router.use('/pdde', pddeRouter);
router.use('/saldoPDDE', saldoPddeRouter);
router.use(`/contaBancaria`, contaBancariaRouter);
router.use('/saldoConta', saldoContaBancariaRouter);
router.use('/movimentacao', movimentacaoFinanceiraRouter);

// Pesquisa de precos e prestação de contas
router.use('/prestacao', prestacaoContasRouter);
router.use('/pesquisa', pesquisaPrecoRouter);
router.use('/programa', programaRouter);
router.use('/bem', bemRouter);
router.use('/servico', servicoRouter);
router.use('/fornecedor', fornecedorRouter);
router.use('/ata', ataRouter);

router.use('/ofimem', oficioMemorandoRouter);

// router.use('/notafiscal', notaFiscalRouter);
// router.use('/doacao', termoDoacaoRouter);

// APM e atas
router.use(`/apm`, apmRouter);
router.use(`/membroAPM`, membroAPMRouter);
export default router;
