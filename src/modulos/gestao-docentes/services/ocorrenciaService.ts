import { Ocorrencia } from '@prisma/client';
import { prisma } from '../../../../prisma/client';
import { StatusCodes } from 'http-status-codes';
import { ErrorHandler } from '../../../handler/prismaErrorHandler';

export class OcorrenciaService {
  async create(ocorrencia: Ocorrencia) {
    try {
      // Verificar se as contas ligadas a ocorrencia existem
      const lancadoPor = await prisma.servidor.findUnique({
        where: {
          id: ocorrencia.lancadoPor ?? undefined,
          deletedAt: null,
        },
      });

      if (!lancadoPor) {
        return { ok: false, data: 'O servidor que lançou a ocorrência não está cadastrado no sistema.' };
      }

      const servidor = await prisma.servidor.findUnique({
        where: {
          id: ocorrencia.servidorId ?? undefined,
          deletedAt: null,
        },
      });

      if (!servidor) {
        return { ok: false, data: 'O servidor atribuido a essa ocorrência não está cadastrado no sistema.' };
      }

      const createOcorrencia = await prisma.ocorrencia.create({ data: ocorrencia });
      return { ok: true, data: createOcorrencia };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async update(ocorrencia: Ocorrencia, id: number) {
    try {
      const ocorrenciaExiste = await prisma.ocorrencia.findUnique({
        where: {
          id: id,
          deletedAt: null,
        },
      });

      if (!ocorrenciaExiste) {
        return { ok: false, data: StatusCodes.NOT_FOUND };
      } else {

        const updateOcorrencia = await prisma.ocorrencia.update({
          data: ocorrencia,
          where: {
            id: +id,
          },
        });
        return { ok: true, data: updateOcorrencia };
      }
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async delete(id: number) {
    try {
      const ocorrenciaExiste = await prisma.ocorrencia.findUnique({
        where: {
          id: id,
          deletedAt: null,
        },
      });

      if (!ocorrenciaExiste) {
        return { ok: false, data: StatusCodes.NOT_FOUND };
      } else {
        const deleteOcorrencia = await prisma.ocorrencia.update({
          where: {
            id: +id,
          },
          data: {
            deletedAt: new Date(),
          },
        });
        return { ok: true, data: deleteOcorrencia };
      }
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async findById(id: number) {
    try {
      const ocorrencia = await prisma.ocorrencia.findUnique({
        where: {
          id: id,
          deletedAt: null,
        },
      });
      return { ok: true, data: ocorrencia };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async findByServidorId(servidorId: number) {
    try {
      const ocorrencia = await prisma.ocorrencia.findMany({
        where: {
          servidorId: servidorId,
          deletedAt: null,
        },
      });
      return { ok: true, data: ocorrencia };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async findAll() {
    try {
      const ocorrencias = await prisma.ocorrencia.findMany({
        where: { deletedAt: null },
      });

      return { ok: true, data: ocorrencias };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async findByDeletedAt() {
    try {
      const ocorrenciasDeletadas = await prisma.ocorrencia.findMany({
        where: { deletedAt: { not: null } },
      });

      return { ok: true, data: ocorrenciasDeletadas };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async updateStatus(id: number, status: string, aprovadoPor: number, motivo: string) {
    try {
      const ocorrenciaExiste = await prisma.ocorrencia.findUnique({
        where: {
          id: id,
          deletedAt: null,
        },
      });
  
      if (!ocorrenciaExiste) {
        return { ok: false, data: StatusCodes.NOT_FOUND };
      }
  
      const updatedOcorrencia = await prisma.ocorrencia.update({
        where: { id },
        data: {
          status,
          aprovadoPor, // Salva o ID de quem realizou a ação
          updatedAt: new Date(),
          motivo,
        },
      });
  
      return { ok: true, data: updatedOcorrencia };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }
  
  
}
