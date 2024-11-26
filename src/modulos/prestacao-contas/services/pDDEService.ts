import { PDDE } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import { prisma } from '../../../../prisma/client';
import { ErrorHandler } from '../../../handler/prismaErrorHandler';

export class PDDEService {
  async create() {}

  async findByEscola(idEscola: number) {
    try {
      const escola = await prisma.escola.findFirstOrThrow({
        where: {
          id: idEscola,
          deletedAt: null,
        },
      });

      const pddes = await prisma.pDDE.findMany({
        where: {
          escolaId: idEscola,
          deletedAt: null,
        },
        include: {
          ContaBancaria: true,
          SaldoPDDE: true,
          Escola: {
            include: {
              APM: true,
            },
          },
        },
      });
      return { ok: true, data: pddes };
    } catch (error) {
      // return ErrorHandler.handleError(error);
    }
  }

  async findById(id: number) {
    try {
      const pdde = await prisma.pDDE.findFirst({
        where: {
          id: id,
          deletedAt: null,
        },
        include: {
          ContaBancaria: true,
          SaldoPDDE: true,
          Escola: {
            include: {
              APM: true,
            },
          },
        },
      });
      if (!pdde) {
        return { ok: false, data: StatusCodes.NOT_FOUND };
      }
      return { ok: true, data: pdde };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async findPDDEWithSaldoByEscola(idEscola: number) {
    try {
      // Valida se a escola existe
      const escola = await prisma.escola.findFirstOrThrow({
        where: {
          id: idEscola,
          deletedAt: null,
        },
      });

      // Busca os PDDEs relacionados à escola
      const pddes = await prisma.pDDE.findMany({
        where: {
          escolaId: idEscola,
          deletedAt: null,
        },
        include: {
          ContaBancaria: true,
          SaldoPDDE: true,
          Escola: {
            include: {
              APM: true,
            },
          },
        },
      });

      // Adiciona cálculos de saldo (custeio e capital)
      const pddesComSaldo = pddes.map((pdde) => {
        const saldo = pdde.SaldoPDDE[0]; // Considera o primeiro saldo relacionado
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

      return { ok: true, data: pddesComSaldo };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }
}
