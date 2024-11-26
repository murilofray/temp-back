import { Request, Response } from 'express';
import { prisma } from '../../../../prisma/client';
import RelatorioService from '../services/relatorioService';

const relatorioService = new RelatorioService();

export default class RelatorioController {

  async gerarRelatorioBeneficiariosBF(req: Request, res: Response) {
    try {
      const turmaId = req.query.turmaId ? parseInt(req.query.turmaId as string, 10) : undefined;
      const escolaId = parseInt(req.query.escolaId as string, 10);

      const filtroAlunos: any = {
        deletedAt: null,
        isDisabled: false,
        beneficiarioBF: true,
      };

      const filtroTurma: any = {
        escolaId: escolaId, // Filtra apenas turmas da escola especificada
      };

      // Se turmaId for fornecido e válido, adicione ao filtro de turma
      if (turmaId && turmaId !== -1) {
        filtroTurma.id = turmaId;
      }

      filtroAlunos.Turma = filtroTurma;

      const alunos = await prisma.aluno.findMany({
        where: filtroAlunos,
        select: {
          ra: true,
          nome: true,
          Turma: {
            select: {
              ano: true,
              letra: true,
            },
          },
        },
      });

      // Formatando os dados para o relatório
      const formattedAlunos = alunos.map((aluno: any) => ({
        ra: aluno.ra,
        nome: aluno.nome,
        turma: aluno.Turma
          ? `${aluno.Turma.ano} ${aluno.Turma.letra}`
          : 'Sem turma',
      }));

      // Configurando o cabeçalho da resposta para PDF
      const stream = res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment;filename=relatorio_beneficiarios_bf.pdf`,
      });

      // Construindo o PDF
      relatorioService.buildPDFBeneficiarios(
        (chunk: any) => stream.write(chunk),
        () => stream.end(),
        formattedAlunos,
      );
    } catch (error) {
      console.error('Erro ao gerar relatório de beneficiários do Bolsa Família:', error);
      res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  }

  async gerarRelatorioMeninosEMeninas(req: Request, res: Response) {
    try {
      const turmaId = req.query.turmaId ? parseInt(req.query.turmaId as string, 10) : undefined;
      const escolaId = parseInt(req.query.escolaId as string, 10);

      const filtroAlunos: any = {
        deletedAt: null,
        isDisabled: false,
      };

      const filtroTurma: any = {
        escolaId: escolaId, // Filtra apenas turmas da escola especificada
      };

      // Se turmaId for fornecido e válido, adicione ao filtro de turma
      if (turmaId && turmaId !== -1) {
        filtroTurma.id = turmaId;
      }

      filtroAlunos.Turma = filtroTurma;

      // Buscando alunos
      const alunos = await prisma.aluno.findMany({
        where: filtroAlunos,
        select: {
          ra: true,
          nome: true,
          sexo: true,
          Turma: {
            select: {
              ano: true,
              letra: true,
            },
          },
        },
      });
      // Separando alunos em meninos e meninas
      const meninos = alunos.filter((aluno: any) => aluno.sexo == 'M');
      const meninas = alunos.filter((aluno: any) => aluno.sexo == 'F');

      // Formatando os dados para o relatório
      const formattedMeninos = meninos.map((aluno: any) => ({
        ra: aluno.ra,
        nome: aluno.nome,
        turma: aluno.Turma
          ? `${aluno.Turma.ano} ${aluno.Turma.letra}`
          : 'Sem turma',
      }));

      const formattedMeninas = meninas.map((aluno: any) => ({
        ra: aluno.ra,
        nome: aluno.nome,
        turma: aluno.Turma
          ? `${aluno.Turma.ano} ${aluno.Turma.letra}`
          : 'Sem turma',
      }));

      const stream = res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment;filename=relatorio_meninos_meninas.pdf`,
      });

      relatorioService.buildPDFMeninosEMeninas(
        (chunk: any) => stream.write(chunk),
        () => stream.end(),
        formattedMeninas,
        formattedMeninos,
      );
    } catch (error) {
      console.error('Erro ao gerar relatório de Meninos e Meninas:', error);
      res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  }

  async gerarRelatorioMeninosEMeninasPorAdmin(req: Request, res: Response) {
    try {
      // Obter todas as escolas com suas turmas e alunos
      const escolas = await prisma.escola.findMany({
        include: {
          Turma: {
            include: {
              Aluno: true, // Carregar todos os alunos vinculados às turmas
            },
          },
        },
      });

      if (!escolas || escolas.length === 0) {
        return res.status(404).json({ message: 'Nenhuma escola encontrada.' });
      }

      // Processar os dados para cada escola
      const relatorioPorEscola = escolas.map((escola) => {
        const todasTurmas = escola.Turma || [];

        // Combina todos os alunos da escola
        const todosAlunos = todasTurmas.flatMap((turma) => turma.Aluno || []);

        // Separando alunos em meninos e meninas
        const meninos = todosAlunos.filter((aluno: any) => aluno.sexo === 'M');
        const meninas = todosAlunos.filter((aluno: any) => aluno.sexo === 'F');

        // Formatando os dados para o relatório
        const formattedMeninos = meninos.map((aluno: any) => ({
          ra: aluno.ra,
          nome: aluno.nome,
          turma: aluno.Turma
            ? `${aluno.Turma.ano} ${aluno.Turma.letra}`
            : 'Sem turma',
        }));

        const formattedMeninas = meninas.map((aluno: any) => ({
          ra: aluno.ra,
          nome: aluno.nome,
          turma: aluno.Turma
            ? `${aluno.Turma.ano} ${aluno.Turma.letra}`
            : 'Sem turma',
        }));

        // Cálculo da distribuição de meninos e meninas
        const totalAlunos = todosAlunos.length;
        const distribuicaoGeral = [
          {
            sexo: 'Meninos',
            quantidade: meninos.length,
            percentual: totalAlunos > 0 ? ((meninos.length / totalAlunos) * 100).toFixed(2) + '%' : '0.00%',
          },
          {
            sexo: 'Meninas',
            quantidade: meninas.length,
            percentual: totalAlunos > 0 ? ((meninas.length / totalAlunos) * 100).toFixed(2) + '%' : '0.00%',
          },
        ];

        // Cálculo da distribuição por turma
        const distribuicaoPorTurma = todasTurmas.map((turma) => {
          const alunosDaTurma = turma.Aluno || [];
          const meninosDaTurma = alunosDaTurma.filter((aluno: any) => aluno.sexo === 'M');
          const meninasDaTurma = alunosDaTurma.filter((aluno: any) => aluno.sexo === 'F');

          return {
            turma: `${turma.ano || ''} ${turma.letra || ''}`,
            distribuicao: [
              {
                sexo: 'Meninos',
                quantidade: meninosDaTurma.length,
              },
              {
                sexo: 'Meninas',
                quantidade: meninasDaTurma.length,
              },
            ],
          };
        });

        return {
          escola: escola.nome,
          distribuicaoGeral,
          distribuicaoPorTurma,
          formattedMeninos,
          formattedMeninas,
        };
      });

      // Geração do PDF usando o relatorioService
      const stream = res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment;filename=relatorio_admin_meninos_meninas.pdf',
      });

      relatorioService.buildPDFMeninosEMeninasAdmin(
        (chunk: any) => stream.write(chunk),
        () => stream.end(),
        relatorioPorEscola
      );
    } catch (error) {
      console.error('Erro ao gerar relatório de Meninos e Meninas para administradores:', error);
      res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  }

  async gerarRelatorioRacasAlunos(req: Request, res: Response) {
    try {
      const { escolaId } = req.params

      const escola = await prisma.escola.findUnique({
        where: {
          id: +escolaId
        }
      })

      if (!escola)
        res.status(400).json({ message: 'Escola não encontrada.' });

      const alunosPorRaca = await prisma.aluno.groupBy({
        by: ['raca'],
        _count: { id: true },
        where: {
          Turma: {
            escolaId: +escolaId, // Filtra alunos vinculados às turmas da escola.
          },
        },
      });

      const totalAlunos = await prisma.aluno.count({
        where: {
          Turma: {
            escolaId: +escolaId,
          },
        },
      });

      const distribuicaoGeral = alunosPorRaca.map((grupo: any) => ({
        raca: grupo.raca,
        quantidade: grupo._count.id,
        percentual: ((grupo._count.id / totalAlunos) * 100).toFixed(2) + '%',
      }));

      const turmas = await prisma.turma.findMany({
        where: { escolaId: +escolaId },
        include: {
          Aluno: {
            select: { raca: true },
          },
        },
      });

      const distribuicaoPorTurma = turmas.map((turma: any) => {
        const alunos = turma.Aluno;

        const distribuicaoRacial = alunos.reduce((acc: any, aluno: any) => {
          acc[aluno.raca] = (acc[aluno.raca] || 0) + 1;
          return acc;
        }, {});

        return {
          turma: `${turma.ano}${turma.letra}`,
          distribuicaoRacial,
        };
      });

      const stream = res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment;filename=relatorio_alunos_raca.pdf`,
      });

      console.log()

      relatorioService.buildRelatorioRacaPDF(
        (chunk: any) => stream.write(chunk),
        () => stream.end(),
        distribuicaoGeral,
        distribuicaoPorTurma
      );
    } catch (error) {
      console.error('Erro ao gerar relatório: ', error);
      res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  }

  async gerarRelatorioRacasPorAdmin(req: Request, res: Response) {
    try {
      // Obter todas as escolas com suas turmas e alunos
      const escolas = await prisma.escola.findMany({
        include: {
          Turma: {
            include: {
              Aluno: true, // Carregar todos os alunos vinculados às turmas
            },
          },
        },
      });

      if (!escolas || escolas.length === 0) {
        return res.status(404).json({ message: 'Nenhuma escola encontrada.' });
      }

      // Processar os dados para cada escola
      const relatorioPorEscola = escolas.map((escola) => {
        const todasTurmas = escola.Turma || [];

        // Combina todos os alunos da escola
        const todosAlunos = todasTurmas.flatMap((turma) => turma.Aluno || []);

        const totalAlunos = todosAlunos.length;

        // Cálculo da distribuição geral de raças na escola
        const distribuicaoGeral = Object.entries(
          todosAlunos.reduce((acc: Record<string, number>, aluno) => {
            acc[aluno.raca] = (acc[aluno.raca] || 0) + 1;
            return acc;
          }, {})
        ).map(([raca, quantidade]) => ({
          raca,
          quantidade: quantidade as number,
          percentual: totalAlunos > 0 ? ((quantidade as number) / totalAlunos * 100).toFixed(2) + '%' : '0.00%',
        }));

        // Cálculo da distribuição racial por turma
        const distribuicaoPorTurma = todasTurmas.map((turma) => {
          const alunosDaTurma = turma.Aluno || [];

          const distribuicaoRacial = alunosDaTurma.reduce((acc: Record<string, number>, aluno) => {
            acc[aluno.raca] = (acc[aluno.raca] || 0) + 1;
            return acc;
          }, {});

          return {
            turma: `${turma.ano || ''} ${turma.letra || ''}`,
            distribuicaoRacial,
          };
        });

        return {
          escola: escola.nome,
          distribuicaoGeral,
          distribuicaoPorTurma,
        };
      });

      // Geração do PDF usando o relatorioService
      const stream = res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment;filename=relatorio_admin_alunos_raca.pdf',
      });

      relatorioService.buildRelatorioRacaAdminPDF(
        (chunk: any) => stream.write(chunk),
        () => stream.end(),
        relatorioPorEscola
      );
    } catch (error) {
      console.error('Erro ao gerar relatório para administradores:', error);
      res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  }


  async gerarRelatorioBairros(req: Request, res: Response) {
    try {
      const escolaId = parseInt(req.query.escolaId as string, 10);

      const escola = await prisma.escola.findUnique({
        where: {
          id: +escolaId
        }
      })

      if (!escola) {
        res.status(400).json({ message: 'Escola não encontrada.' });
      }

      const alunosPorBairro = await prisma.aluno.groupBy({
        by: ['bairro'],
        _count: { id: true },
        where: {
          deletedAt: null,
          isDisabled: false,
          Turma: {
            escolaId: +escolaId, // Filtra alunos vinculados às turmas da escola.
          },
        },
      });

      const totalAlunos = await prisma.aluno.count({
        where: {
          deletedAt: null,
          isDisabled: false,
          Turma: {
            escolaId: +escolaId,
          },
        },
      });

      const distribuicaoGeral = alunosPorBairro.map((grupo: any) => ({
        bairro: grupo.bairro,
        quantidade: grupo._count.id,
        percentual: ((grupo._count.id / totalAlunos) * 100).toFixed(2) + '%',
      }));

      const turmas = await prisma.turma.findMany({
        where: { escolaId: +escolaId },
        include: {
          Aluno: {
            select: { bairro: true },
          },
        },
      });

      const distribuicaoPorTurma = turmas.map((turma: any) => {
        const alunos = turma.Aluno;

        const distribuicaoPorBairro = alunos.reduce((acc: any, aluno: any) => {
          acc[aluno.bairro] = (acc[aluno.bairro] || 0) + 1;
          return acc;
        }, {});

        return {
          turma: `${turma.ano} ${turma.letra}`,
          distribuicaoBairros: distribuicaoPorBairro,
        };
      });

      const stream = res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment;filename=relatorio_alunos_bairros.pdf`,
      });

      relatorioService.buildPDFBairros(
        (chunk: any) => stream.write(chunk),
        () => stream.end(),
        distribuicaoGeral,
        distribuicaoPorTurma
      );
    } catch (error) {
      console.error('Erro ao gerar relatório: ', error);
      res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  }

  async gerarRelatorioBairrosPorAdmin(req: Request, res: Response) {
    try {
      // Obter todas as escolas com suas turmas e alunos
      const escolas = await prisma.escola.findMany({
        include: {
          Turma: {
            include: {
              Aluno: true, // Carregar todos os alunos vinculados às turmas
            },
          },
        },
      });

      if (!escolas || escolas.length === 0) {
        return res.status(404).json({ message: 'Nenhuma escola encontrada.' });
      }

      // Processar os dados para cada escola
      const relatorioPorEscola = escolas.map((escola) => {
        const todasTurmas = escola.Turma || [];

        // Combina todos os alunos da escola
        const todosAlunos = todasTurmas.flatMap((turma) => turma.Aluno || []);
        const totalAlunos = todosAlunos.length;

        // Cálculo da distribuição geral de alunos por bairro na escola
        const distribuicaoGeral = Object.entries(
          todosAlunos.reduce((acc: Record<string, number>, aluno) => {
            acc[aluno.bairro] = (acc[aluno.bairro] || 0) + 1;
            return acc;
          }, {})
        ).map(([bairro, quantidade]) => ({
          bairro,
          quantidade: quantidade as number,
          percentual: totalAlunos > 0 ? ((quantidade as number) / totalAlunos * 100).toFixed(2) + '%' : '0.00%',
        }));

        // Cálculo da distribuição por bairro por turma
        const distribuicaoPorTurma = todasTurmas.map((turma) => {
          const alunosDaTurma = turma.Aluno || [];

          const distribuicaoPorBairro = alunosDaTurma.reduce((acc: Record<string, number>, aluno) => {
            acc[aluno.bairro] = (acc[aluno.bairro] || 0) + 1;
            return acc;
          }, {});

          return {
            turma: `${turma.ano || ''} ${turma.letra || ''}`,
            distribuicaoBairros: distribuicaoPorBairro,
          };
        });

        return {
          escola: escola.nome,
          distribuicaoGeral,
          distribuicaoPorTurma,
        };
      });

      // Geração do PDF usando o relatorioService
      const stream = res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment;filename=relatorio_admin_alunos_bairros.pdf',
      });

      relatorioService.buildRelatorioBairrosAdminPDF(
        (chunk: any) => stream.write(chunk),
        () => stream.end(),
        relatorioPorEscola
      );
    } catch (error) {
      console.error('Erro ao gerar relatório para administradores:', error);
      res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  }

  async gerarRelatorioBeneficiariosPorAdmin(req: Request, res: Response) {
    try {
      // Obter todas as escolas com suas turmas e alunos beneficiários
      const escolas = await prisma.escola.findMany({
        include: {
          Turma: {
            include: {
              Aluno: {
                where: {
                  deletedAt: null,
                  isDisabled: false,
                  beneficiarioBF: true, // Filtra apenas os beneficiários do Bolsa Família
                },
              },
            },
          },
        },
      });

      if (!escolas || escolas.length === 0) {
        return res.status(404).json({ message: 'Nenhuma escola encontrada.' });
      }

      // Processar os dados para cada escola
      const relatorioPorEscola = escolas.map((escola) => {
        const todasTurmas = escola.Turma || [];

        // Combina todos os alunos beneficiários da escola
        const todosAlunos = todasTurmas.flatMap((turma) => turma.Aluno || []);

        // Formatando os dados para o relatório
        const formattedAlunos = todosAlunos.map((aluno: any) => ({
          ra: aluno.ra,
          nome: aluno.nome,
          turma: aluno.Turma
            ? `${aluno.Turma.ano} ${aluno.Turma.letra}`
            : 'Sem turma',
        }));

        return {
          escola: escola.nome,
          alunos: formattedAlunos,
        };
      });

      // Geração do PDF usando o relatorioService
      const stream = res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment;filename=relatorio_beneficiarios_bf.pdf`,
      });

      relatorioService.buildRelatorioBeneficiariosAdminPDF(
        (chunk: any) => stream.write(chunk),
        () => stream.end(),
        relatorioPorEscola
      );
    } catch (error) {
      console.error('Erro ao gerar relatório de beneficiários do Bolsa Família para administradores:', error);
      res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  }
}
