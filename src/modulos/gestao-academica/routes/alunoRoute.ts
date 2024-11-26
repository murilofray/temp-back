import { Router } from 'express';
import AlunoController from '../controller/alunoController';

const router = Router();
const alunoController = new AlunoController();

router.get('/', alunoController.index.bind(alunoController));
router.get('/ativos', alunoController.getActiveAlunos.bind(alunoController));
router.get('/desabilitados', alunoController.getDisabledAlunos.bind(alunoController));
router.get('/:id', alunoController.getById.bind(alunoController));

router.get('/ras/:ra', alunoController.getByRa.bind(alunoController));
router.get('/ra/:ra', alunoController.getByRaUnique.bind(alunoController));

router.get('/alunos/:turmaId', alunoController.getAlunosByTurmaId);
router.get('/alunos/turma/inativos', alunoController.getAlunosSemTurma);
router.get('/alunos/escola/:escolaId', alunoController.getAlunosByEscola);

router.post('/alunos/turma/desvincular', alunoController.desvincularAlunoDaTuma);
router.post('/matricular', alunoController.matricularAluno);

router.get('/nome/:nome', alunoController.getByNome.bind(alunoController));
router.post('/', alunoController.create.bind(alunoController));
router.put('/:id', alunoController.update.bind(alunoController));
router.delete('/:id', alunoController.delete.bind(alunoController));
router.post('/:id/alergias', alunoController.adicionarAlergias.bind(alunoController));
router.post('/:id/documento', alunoController.adicionarDocumento.bind(alunoController));

router.delete('/desabilitar/:alunoId', alunoController.desabilitarAluno);

router.get('/servidor/:servidorId', alunoController.getAllWithTurmaByServidor.bind(alunoController));

export default router;
