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
          Escola: true,
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
          Escola: true,
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
}
