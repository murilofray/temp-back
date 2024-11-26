import { PrestacaoContas } from '@prisma/client';
import { prisma } from '../../../../prisma/client';
import { StatusCodes } from 'http-status-codes';
import { ErrorHandler } from '../../../handler/prismaErrorHandler';

// const pesquisaPrecoService = new PesquisaPrecoService();

export class PrestacaoContasService {
  async create(prestacao: PrestacaoContas) {
    try {
      // Verificar se existe um Programa ativo
      const pddeExiste = await prisma.pDDE.findFirst({
        where: {
          id: prestacao.pDDEId,
          deletedAt: null,
        },
      });

      if (!pddeExiste) {
        return { ok: false, data: StatusCodes.NOT_FOUND };
      } else {
        const createPrestacao = await prisma.prestacaoContas.create({
          data: {
            ...prestacao,
            createdAt: new Date(),
          },
        });
        return { ok: true, data: createPrestacao };
      }
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async update(prestacao: PrestacaoContas, id: number) {
    try {
      const prestacaoExiste = await prisma.prestacaoContas.findFirst({
        where: {
          id: id,
          deletedAt: null,
        },
      });

      if (!prestacaoExiste) {
        return { ok: false, data: StatusCodes.NOT_FOUND };
      } else {
        const updatePrestacao = await prisma.prestacaoContas.update({
          where: {
            id: +id,
          },
          data: {
            ...prestacao,
            updatedAt: new Date(),
          },
        });
        return { ok: true, data: updatePrestacao };
      }
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async delete(id: number) {
    try {
      const prestacaoExiste = await prisma.prestacaoContas.findFirst({
        where: {
          id: id,
          deletedAt: null,
        },
      });

      if (!prestacaoExiste) {
        return { ok: false, data: StatusCodes.NOT_FOUND };
      } else {
        const deletePrestacao = await prisma.prestacaoContas.update({
          where: {
            id: +id,
          },
          data: {
            deletedAt: new Date(),
          },
        });
        return { ok: true, data: deletePrestacao };
      }
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async findById(id: number) {
    try {
      const prestacao = await prisma.prestacaoContas.findFirst({
        where: {
          id: id,
          deletedAt: null,
        },
        include: {
          PDDE: {
            include: {
              Programa: true,
            },
          },
        },
      });
      return { ok: true, data: prestacao };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async findByAnoPDDE(idPDDE: number, ano: number = new Date().getFullYear()) {
    try {
      const prestacaoContas = await prisma.prestacaoContas.findFirst({
        where: {
          pDDEId: idPDDE,
          ano: ano,
          deletedAt: null,
        },
        include: {
          PDDE: {
            include: {
              Programa: true,
            },
          },
        },
      });
      return { ok: true, data: prestacaoContas };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }
}
