import { Programa } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import { prisma } from '../../../../prisma/client';
import { ErrorHandler } from '../../../handler/prismaErrorHandler';

export class ProgramaService {
  async update(programa: Programa, id: number) {
    try {
      const programaExiste = await prisma.programa.findFirst({
        where: {
          id: id,
          deletedAt: null,
        },
      });

      if (!programaExiste) {
        return { ok: false, data: StatusCodes.BAD_REQUEST };
      } else {
        const updateServico = await prisma.servico.update({
          where: {
            id: +id,
          },
          data: {
            ...programa,
            updatedAt: new Date(),
          },
        });
        return { ok: true, data: updateServico };
      }
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async findByPDDE(idContaBancaria: number) {
    try {
      const programas = await prisma.programa.findMany({
        where: {
          pddeId: idContaBancaria,
          deletedAt: null,
        },
      });
      return { ok: true, data: programas };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }
}
