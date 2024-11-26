import { Quinquenio } from '@prisma/client';
import { prisma } from '../../../../prisma/client';
import { StatusCodes } from 'http-status-codes';
import { ErrorHandler } from '../../../handler/prismaErrorHandler';

export class QuinquenioService {
  async create(quinquenio: Quinquenio) {
    try {
      // Verificar se o servidor existe
      const servidor = await prisma.servidor.findUnique({
        where: {
          id: quinquenio.servidorId,
          deletedAt: null,
        },
      });

      if (!servidor) {
        return { ok: false, data: 'O servidor associado a este quinquênio não está cadastrado no sistema.' };
      }

      const createQuinquenio = await prisma.quinquenio.create({ data: quinquenio });
      return { ok: true, data: createQuinquenio };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async update(quinquenio: Quinquenio, id: number) {
    try {
      const quinquenioExiste = await prisma.quinquenio.findUnique({
        where: {
          id: id,
          deletedAt: null,
        },
      });

      if (!quinquenioExiste) {
        return { ok: false, data: StatusCodes.NOT_FOUND };
      }

      const updateQuinquenio = await prisma.quinquenio.update({
        where: {
          id: +id,
        },
        data: {
          servidorId: quinquenio.servidorId,
          dataInicio: quinquenio.dataInicio,
          dataFim: quinquenio.dataFim,
          licenca: quinquenio.licenca,
          adicional: quinquenio.adicional,
          detalhes: quinquenio.detalhes,
          aprovadoPor: quinquenio.aprovadoPor,
          createdAt: quinquenio.createdAt,
          updatedAt: new Date(),
          deletedAt: null,
        },
      });
      return { ok: true, data: updateQuinquenio };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async delete(id: number) {
    try {
      const quinquenioExiste = await prisma.quinquenio.findUnique({
        where: {
          id: id,
          deletedAt: null,
        },
      });

      if (!quinquenioExiste) {
        return { ok: false, data: StatusCodes.NOT_FOUND };
      }

      const deleteQuinquenio = await prisma.quinquenio.update({
        where: {
          id: +id,
        },
        data: {
          deletedAt: new Date(),
        },
      });
      return { ok: true, data: deleteQuinquenio };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async findById(id: number) {
    try {
      const quinquenio = await prisma.quinquenio.findUnique({
        where: {
          id: id,
          deletedAt: null,
        },
      });
      return { ok: true, data: quinquenio };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async findByServidorId(servidorId: number) {
    try {
      const quinquenios = await prisma.quinquenio.findMany({
        where: {
          servidorId: servidorId,
          deletedAt: null,
        },
      });
      return { ok: true, data: quinquenios };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }
}
