import { Request, Response } from 'express';
import { prisma } from '../../../../prisma/client';
import RelatorioService from '../services/relatorioService';

const relatorioService = new RelatorioService();

export default class RelatorioController {

  async gerarRelatorioBeneficiariosBF(req: Request, res: Response) {
    try {
      const turmaId = req.query.turmaId ? parseInt(req.query.turmaId as string, 10) : undefined;
  
      // Filtro para alunos beneficiários do Bolsa Família, com filtro opcional por turma
      const filtroAlunos = turmaId
        ? { turmaId, beneficiarioBF: true }
        : { beneficiarioBF: true };
  
      const alunos = await prisma.aluno.findMany({
        where: filtroAlunos,
        select: {
          ra: true,
          nome: true,
          Turma: {
            select: {
              ano: true,
              letra: true,
              anoLetivo: true,
            },
          },
        },
      });
  
      // Formatando os dados para o relatório
      const formattedAlunos = alunos.map((aluno) => ({
        ra: aluno.ra,
        nome: aluno.nome,
        turma: aluno.Turma
          ? `${aluno.Turma.ano}${aluno.Turma.letra} - ${aluno.Turma.anoLetivo}`
          : 'Sem turma',
      }));
  
      // Configurando o cabeçalho da resposta para PDF
      const stream = res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment;filename=relatorio_beneficiarios_bf.pdf`,
      });
  
      // Construindo o PDF
      relatorioService.buildPDF(
        (chunk: any) => stream.write(chunk),
        () => stream.end(),
        formattedAlunos,
      );
    } catch (error) {
      console.error('Erro ao gerar relatório de beneficiários do Bolsa Família:', error);
      res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  }
  
}
