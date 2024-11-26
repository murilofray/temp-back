import { Progressao } from '@prisma/client';
import { prisma } from '../../../../prisma/client';
import { StatusCodes } from 'http-status-codes';
import { ErrorHandler } from '../../../handler/prismaErrorHandler';

export class ProgressaoService {

  async getAll() {
    try {
      const progressoes = await prisma.progressao.findMany({
        where: {
          deletedAt: null,
        },
      });
      return { ok: true, data: progressoes };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }
  
  async create(progressao: Progressao) {
    try {
      // Verificar se o servidor associado à progressão existe
      const servidor = await prisma.servidor.findUnique({
        where: {
          id: progressao.servidorId ?? undefined,
          deletedAt: null,
        },
      });

      if (!servidor) {
        return { ok: false, data: 'O servidor associado a esta progressão não está cadastrado no sistema.' };
      }

      // Criar a progressão
      const createProgressao = await prisma.progressao.create({ data: progressao });
      return { ok: true, data: createProgressao };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async update(progressao: Progressao, id: number) {
    try {
      const progressaoExiste = await prisma.progressao.findUnique({
        where: {
          id: id,
          deletedAt: null,
        },
      });

      if (!progressaoExiste) {
        return { ok: false, data: StatusCodes.NOT_FOUND };
      } else {
        const updateProgressao = await prisma.progressao.update({
          where: {
            id: +id,
          },
          data: {
            servidorId: progressao.servidorId,
            data: progressao.data,
            tipo: progressao.tipo,
            aprovado: progressao.aprovado,
            detalhes: progressao.detalhes,
            aprovadoPor: progressao.aprovadoPor,
            updatedAt: new Date(),
            deletedAt: null,
          },
        });
        return { ok: true, data: updateProgressao };
      }
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async delete(id: number) {
    try {
      const progressaoExiste = await prisma.progressao.findUnique({
        where: {
          id: id,
          deletedAt: null,
        },
      });

      if (!progressaoExiste) {
        return { ok: false, data: StatusCodes.NOT_FOUND };
      } else {
        const deleteProgressao = await prisma.progressao.update({
          where: {
            id: +id,
          },
          data: {
            deletedAt: new Date(),
          },
        });
        return { ok: true, data: deleteProgressao };
      }
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async findById(id: number) {
    try {
      const progressao = await prisma.progressao.findUnique({
        where: {
          id: id,
          deletedAt: null,
        },
      });
      return { ok: true, data: progressao };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async findByServidorId(servidorId: number) {
    try {
      const progressoes = await prisma.progressao.findMany({
        where: {
          servidorId: servidorId,
          deletedAt: null,
        },
      });
      return { ok: true, data: progressoes };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }
}
