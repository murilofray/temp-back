import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { PDDEService } from '../services/pDDEService';
import { StatusCodes } from 'http-status-codes';

const prisma = new PrismaClient();
const pDDEService = new PDDEService();

export class PddeController {
  async cadastrarPDDE(req: Request, res: Response) {
    try {
      const { escolaId, contaBancariaId, tipo } = req.body;

      // Validação dos campos obrigatórios
      if (!escolaId || !contaBancariaId || !tipo) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: 'Todos os campos são obrigatórios' });
        return;
      }

      // Inserir um novo registro na tabela PDDE
      const novoPDDE = await prisma.pDDE.create({
        data: {
          escolaId,
          contaBancariaId,
          tipo,
          createdAt: new Date(),
          updatedAt: null,
          deletedAt: null,
        },
      });

      res.status(StatusCodes.CREATED).json(novoPDDE);
    } catch (error) {
      console.error('Erro ao cadastrar PDDE:', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Erro ao cadastrar o PDDE' });
    }
  }

  async listarTodosPDDEs(req: Request, res: Response) {
    try {
      const pddeList = await prisma.pDDE.findMany({
        where: {
          deletedAt: null, // Listar apenas registros que não foram excluídos
        },
        include: {
          Escola: true,
        },
      });

      res.status(StatusCodes.OK).json(pddeList);
    } catch (error) {
      console.error('Erro ao listar PDDEs:', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Erro ao listar os registros de PDDE' });
    }
  }

  async listarPDDEComSaldo(req: Request, res: Response) {
    try {
      const pddeList = await prisma.pDDE.findMany({
        where: {
          deletedAt: null, // Listar apenas registros que não foram excluídos
        },
        include: {
          ContaBancaria: true,
          SaldoPDDE: true,
          Escola: true,
        },
      });

      // Calcular os valores de custeio e capital como porcentagens do valor total
      const pddeListComSaldo = pddeList.map((pdde) => {
        const saldo = pdde.SaldoPDDE[0]; // Pega o primeiro saldo relacionado
        if (saldo) {
          const valorTotal = Number(saldo.valor);
          const custeioCalculado = ((valorTotal * Number(saldo.custeio)) / 100).toFixed(2);
          const capitalCalculado = ((valorTotal * Number(saldo.capital)) / 100).toFixed(2);

          return {
            ...pdde,
            valor: valorTotal,
            custeio: custeioCalculado,
            capital: capitalCalculado,
          };
        }
        return pdde;
      });

      res.status(200).json(pddeListComSaldo);
    } catch (error) {
      console.error('Erro ao listar PDDEs com saldo:', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Erro ao listar os registros de PDDE com saldo' });
    }
  }

  async getById(req: Request, res: Response) {
    const resposta = await pDDEService.findById(Number(req.params.id));
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.NOT_FOUND).send({ resposta });
    }
  }
}
