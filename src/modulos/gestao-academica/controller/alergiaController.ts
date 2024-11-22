import { Request, response, Response } from 'express';
import { prisma } from '../../../../prisma/client';
import AlergiaService from '../services/alergiaService';
import { StatusCodes } from 'http-status-codes';
import { STATUS_CODES } from 'http';

const alergiaService = new AlergiaService();

export default class AlergiaController {
  async index(req: Request, res: Response) {
    const resposta = await alergiaService.index();

    if (resposta.ok) {
      return res.status(200).json(resposta.data);
    }
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const resposta = await alergiaService.getById(+id);

      if (resposta.ok) {
        return res.status(200).json(resposta.data);
      } else {
        return res.status(404).json({ message: 'Alergia não encontrada.' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  }

  async getByDescricao(req: Request, res: Response) {
    const { descricao } = req.params;

    try {
      const resposta = await alergiaService.getByDescricao(descricao);

      if (resposta.ok) {
        return res.status(200).json(resposta.data);
      } else {
        return res.status(404).json({ message: 'Alergia não encontrada.' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  }

  async getAlergiasByAlunoId(req: Request, res: Response) {
    const { alunoId } = req.params;

    try {
      const resposta = await alergiaService.getAlergiasByAlunoId(+alunoId);

      if (resposta.ok) {
        return res.status(200).json(resposta.data);
      } else {
        return res.status(404).json({ message: 'Nenhuma alergia encontrada para este aluno.' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  }

  async create(req: Request, res: Response) {
    const { descricao, tipo } = req.body;

    try {
      const resposta = await alergiaService.create(descricao, +tipo);

      if (resposta.ok) {
        return res.status(201).json(resposta.data);
      } else {
        switch (resposta.data) {
          case StatusCodes.CONFLICT:
            return res.status(409).json({ message: 'Esta alergia já está registrada no sistema.' });
          case StatusCodes.BAD_REQUEST:
            return res.status(400).json({ message: 'Este tipo de alergia não existe no sistema.' });
          default:
            return res.status(500).json({ message: 'Erro interno do servidor.' });
        }
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { descricao } = req.body;

    try {
      const resposta = await alergiaService.update(+id, descricao);

      if (resposta.ok) {
        return res.status(200).json(resposta.data);
      } else {
        switch (resposta.data) {
          case StatusCodes.CONFLICT:
            return res.status(409).json({ message: 'Já existe uma alergia com a descrição ' + descricao });
          case StatusCodes.NOT_FOUND:
            return res.status(404).json({ message: 'Alergia não encontrada.' });
          default:
            return res.status(500).json({ message: 'Erro interno do servidor.' });
        }
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const resposta = await alergiaService.delete(+id);

      if (resposta.ok) {
        return res.status(200).json({ message: 'Alergia removida com sucesso.' });
      } else {
        switch (resposta.data) {
          case StatusCodes.NOT_FOUND:
            return res.status(404).json({ message: 'Alergia não encontrada.' });
          case StatusCodes.BAD_REQUEST:
            return res.status(400).json({
              message:
                'Não é possível remover esta alergia, pois alguns alunos estão associados a ela. Remova as associações antes de tentar excluir.',
            });
          default:
            return res.status(500).json({ message: 'Erro interno do servidor.' });
        }
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  }

  async gerarRelatorio(req: Request, res: Response) {
    try {
      // Pega o tipoAlergiaId da query string (exemplo: /alergias?tipoAlergiaId=1)
      const tipoAlergiaId = req.query.tipoAlergiaId ? parseInt(req.query.tipoAlergiaId as string, 10) : undefined;

      const filtroAlergias = tipoAlergiaId
        ? { tipoAlergiaId, AlunoAlergia: { some: {} } }
        : { AlunoAlergia: { some: {} } };

      const alergias = await prisma.alergia.findMany({
        where: filtroAlergias,
        select: {
          descricao: true,
          AlunoAlergia: {
            select: {
              Aluno: {
                select: {
                  ra: true,
                },
              },
            },
          },
        },
      });

      const alunos = await prisma.aluno.findMany({
        select: {
          ra: true,
          nome: true,
        },
      });

      const formattedAlergias = alergias.map((alergia) => ({
        nome: alergia.descricao,
        alunos: alergia.AlunoAlergia.map((alunoAlergia) => alunoAlergia.Aluno.ra),
      }));

      const formattedAlunos = alunos.map((aluno) => ({
        ra: aluno.ra,
        nome: aluno.nome,
      }));

      const stream = res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment;filename=invoice.pdf`,
      });

      alergiaService.buildPDF(
        (chunk: any) => stream.write(chunk),
        () => stream.end(),
        formattedAlunos,
        formattedAlergias,
      );
    } catch (error) {
      console.error('Erro ao buscar alergias:', error);
      res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  }
}
