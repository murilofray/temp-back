import { Prisma, NotaFiscal, Bem } from '@prisma/client';
import { prisma } from '../../../../prisma/client';
import { StatusCodes } from 'http-status-codes';

import { ErrorHandler } from '../../../handler/prismaErrorHandler';

export class NotaFiscalService {
  async create(notaFiscal: NotaFiscal) {
    try {
      // Verificar se existe fornecedor válido
      const fornecedorExiste = await prisma.fornecedor.findFirst({
        where: {
          id: Number(notaFiscal.fornecedorId),
        },
      });
      if (!fornecedorExiste) {
        return { ok: false, data: StatusCodes.NOT_FOUND };
      } else {
        const createNotaFiscal = await prisma.notaFiscal.create({
          data: {
            ...notaFiscal,
            createdAt: new Date(),
          },
        });
        return { ok: true, data: createNotaFiscal };
      }
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async update(notaFiscal: NotaFiscal, id: number) {
    try {
      const existeNotaFiscal = await prisma.notaFiscal.findFirst({
        where: {
          id: id,
          deletedAt: null,
        },
      });
      if (!existeNotaFiscal) {
        return { ok: false, data: StatusCodes.NOT_FOUND };
      } else {
        const updateNotaFiscal = await prisma.notaFiscal.update({
          where: {
            id: id,
          },
          data: {
            ...notaFiscal,
            updatedAt: new Date(),
          },
        });
        return { ok: true, data: updateNotaFiscal };
      }
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async delete(id: number) {
    try {
      const existeNotaFiscal = await prisma.notaFiscal.findFirst({
        where: {
          id: id,
          deletedAt: null,
        },
      });
      if (!existeNotaFiscal) {
        return { ok: false, data: StatusCodes.NOT_FOUND };
      } else {
        const deleteNotaFiscal = await prisma.notaFiscal.update({
          where: {
            id: id,
          },
          data: {
            deletedAt: new Date(),
          },
        });
        return { ok: true, data: deleteNotaFiscal };
      }
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async findById(id: number) {
    try {
      const notaFiscal = await prisma.notaFiscal.findFirst({
        where: {
          id: id,
          deletedAt: null,
        },
        include: {
          Fornecedor: true,
          DocumentosScan: true,
        },
      });
      return { ok: true, data: notaFiscal };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async findByBem(idBem: number) {
    try {
      const notasFiscais = await prisma.notaFiscal.findFirst({
        where: {
          Bem: {
            some: {
              id: idBem,
              deletedAt: null,
            },
          },
          deletedAt: null,
        },
        include: {
          Fornecedor: true,
          DocumentosScan: true,
        },
      });
      return { ok: true, data: notasFiscais };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async findByServico(idServico: number) {
    try {
      const notasFiscais = await prisma.notaFiscal.findFirst({
        where: {
          Servico: {
            some: {
              id: idServico,
              deletedAt: null,
            },
          },
          deletedAt: null,
        },
        include: {
          Fornecedor: true,
          DocumentosScan: true,
        },
      });
      return { ok: true, data: notasFiscais };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async findByPesquisa(idPesquisa: number) {
    try {
      const notasFiscais = await prisma.notaFiscal.findMany({
        where: {
          OR: [
            {
              Bem: {
                some: {
                  PesquisaPreco: {
                    id: idPesquisa,
                    deletedAt: null,
                  },
                },
              },
              Servico: {
                some: {
                  PesquisaPreco: {
                    id: idPesquisa,
                    deletedAt: null,
                  },
                },
              },
            },
          ],
          deletedAt: null,
        },
        include: {
          Fornecedor: true,
          DocumentosScan: true,
        },
      });
      return { ok: true, data: notasFiscais };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async findByFornecedor(idFornecedor: number) {
    try {
      const notasFiscais = await prisma.notaFiscal.findMany({
        where: {
          Fornecedor: {
            id: idFornecedor,
            deletedAt: null,
          },
          deletedAt: null,
        },
        include: {
          Fornecedor: true,
          DocumentosScan: true,
        },
      });
      return { ok: true, data: notasFiscais };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }
}
