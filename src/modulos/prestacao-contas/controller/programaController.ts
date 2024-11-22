import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { ProgramaService } from '../services/programaService';
import { StatusCodes } from 'http-status-codes';

const prisma = new PrismaClient();
const programaService = new ProgramaService();

export class ProgramaController {
  async cadastrarPrograma(req: Request, res: Response) {
    try {
      const { pddeId, nome } = req.body;

      // Validação dos campos obrigatórios
      if (!pddeId || !nome) {
        res.status(400).json({ error: 'Os campos "pddeId" e "nome" são obrigatórios' });
        return;
      }

      // Inserir um novo registro na tabela Programa
      const novoPrograma = await prisma.programa.create({
        data: {
          pddeId,
          nome,
          createdAt: new Date(),
          updatedAt: null,
          deletedAt: null,
        },
      });

      res.status(StatusCodes.CREATED).json(novoPrograma);
    } catch (error) {
      console.error('Erro ao cadastrar Programa:', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Erro ao cadastrar o Programa' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const idPrograma = Number(req.params.id);
      if (!idPrograma) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: 'ID do programa é obrigatório' });
        return;
      } else {
        const resposta = await programaService.update(req.body, idPrograma);
        if (resposta?.ok) {
          return res.status(StatusCodes.OK).send(resposta.data);
        } else {
          return res.status(resposta.data as StatusCodes).send({ resposta });
        }
      }
    } catch (error) {
      console.error('Erro ao cadastrar Programa:', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Erro ao atualizar o Programa' });
    }
  }

  async getByPDDE(req: Request, res: Response) {
    const resposta = await programaService.findByPDDE(Number(req.params.idPDDE));
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.NOT_FOUND).send({ resposta });
    }
  }
}
