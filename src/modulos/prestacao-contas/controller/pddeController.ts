import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { PDDEService } from '../services/pDDEService';
import { StatusCodes } from 'http-status-codes';

const prisma = new PrismaClient();
const pDDEService = new PDDEService();

export class PddeController {
  async cadastrarPDDE(req: Request, res: Response) {
    try {
      const { escolaId, contaBancariaId, tipo, saldo } = req.body;

      if (!escolaId || !contaBancariaId || !tipo || !saldo) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
      }

      // Verifica se já existe um PDDE com o mesmo tipo e conta bancária
      const pddeExistente = await prisma.pDDE.findFirst({
        where: {
          contaBancariaId,
          tipo,
          deletedAt: null, // Considera apenas registros ativos
        },
      });

      if (pddeExistente) {
        return res.status(400).json({ error: 'Já existe um PDDE com esse tipo e conta bancária.' });
      }

      // Criação do novo PDDE
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

      // Adiciona o saldo associado ao PDDE
      await prisma.saldoPDDE.create({
        data: {
          saldoPDDEId: novoPDDE.id, // Use saldoPDDEId conforme o modelo
          valor: saldo.valor,
          custeio: saldo.custeio,
          capital: saldo.capital,
          custeioValor: (saldo.valor * saldo.custeio) / 100,
          capitalValor: (saldo.valor * saldo.capital) / 100,
          createdAt: new Date(),
          updatedAt: null,
          deletedAt: null,
        },
      });

      res.status(201).json(novoPDDE);
    } catch (error) {
      console.error('Erro ao cadastrar PDDE:', error);
      res.status(500).json({ error: 'Erro ao cadastrar o PDDE' });
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
        const saldo = pdde.SaldoPDDE[0] || { valor: 0, custeio: 0, capital: 0 }; // Valores padrão
        const valorTotal = Number(saldo.valor);
        const custeioCalculado = ((valorTotal * Number(saldo.custeio)) / 100).toFixed(2);
        const capitalCalculado = ((valorTotal * Number(saldo.capital)) / 100).toFixed(2);

        return {
          ...pdde,
          valor: valorTotal || 0,
          custeio: custeioCalculado || '0.00',
          capital: capitalCalculado || '0.00',
        };
      });

      res.status(200).json(pddeListComSaldo);
    } catch (error) {
      console.error('Erro ao listar PDDEs com saldo:', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Erro ao listar os registros de PDDE com saldo' });
    }
  }

  async listarPDDEComSaldoPorEscola(req: Request, res: Response) {
    try {
      const { escolaId } = req.params;

      if (!escolaId) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: 'O ID da escola é obrigatório' });
      }

      // Busca os PDDEs relacionados à escola, incluindo saldo e contas bancárias
      const pddeList = await prisma.pDDE.findMany({
        where: {
          deletedAt: null, // Listar apenas registros que não foram excluídos
          escolaId: Number(escolaId),
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

      return res.status(StatusCodes.OK).json(pddeListComSaldo);
    } catch (error) {
      console.error('Erro ao listar PDDEs com saldo por escola:', error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'Erro ao listar os registros de PDDE com saldo por escola' });
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
