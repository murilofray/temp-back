import { Bem, PropostaBem } from '@prisma/client';
import { prisma } from '../../../../prisma/client';
import { StatusCodes } from 'http-status-codes';
import { PesquisaPrecoService } from './pesquisaPrecoService';
import { ErrorHandler } from '../../../handler/prismaErrorHandler';

const pesquisaPrecoService = new PesquisaPrecoService();

/**
 * Esta classe de serviço fornece métodos para gerenciar registros de Bem.
 */
export class BemService {
  async create(bem: Bem) {
    try {
      // Verificar se existe um Pesquisa de Preço ativo
      const pesquisaPrecoExiste = pesquisaPrecoService.findById(Number(bem.pesquisaPrecoId));
      if (!pesquisaPrecoExiste) {
        return { ok: false, data: StatusCodes.NOT_ACCEPTABLE };
      } else {
        const createBem = await prisma.bem.create({
          data: {
            ...bem,
            createdAt: new Date(),
          },
        });

        return { ok: true, data: createBem };
      }
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async update(bem: Bem, id: number) {
    try {
      const existeBem = await prisma.bem.findFirst({
        where: {
          id: id,
          deletedAt: null,
        },
      });

      if (!existeBem) {
        return { ok: false, data: StatusCodes.NOT_FOUND };
      } else {
        const updateBem = await prisma.bem.update({
          where: {
            id: +id,
          },
          data: {
            notaFiscalId: bem.notaFiscalId,
            termoDoacaoId: bem.termoDoacaoId,
            descricao: bem.descricao,
            menorValor: bem.menorValor,
            quantidade: bem.quantidade,
            updatedAt: new Date(),
          },
        });
        return { ok: true, data: updateBem };
      }
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async delete(id: number) {
    try {
      const existeBem = await prisma.bem.findFirst({
        where: {
          id: id,
          deletedAt: null,
        },
      });
      if (!existeBem) {
        return { ok: false, data: StatusCodes.NOT_FOUND };
      }
      const deleteBem = await prisma.bem.update({
        where: {
          id: +id,
        },
        data: {
          deletedAt: new Date(),
        },
      });
      return { ok: true, data: deleteBem };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async findById(id: number) {
    try {
      const bem = await prisma.bem.findFirst({
        where: {
          id: id,
          deletedAt: null,
        },
        include: {
          PropostaBem: {
            include: {
              Fornecedor: true,
            },
          },
          PesquisaPreco: {
            include: {
              DocumentoScanA: true,
              DocumentoScanB: true,
              DocumentoScanC: true,
            },
          },
        },
      });
      if (!bem) {
        return { ok: false, data: StatusCodes.NOT_FOUND };
      }
      return { ok: true, data: bem };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async findByPesquisa(idPesquisa: number) {
    try {
      const bens = await prisma.bem.findMany({
        where: {
          pesquisaPrecoId: idPesquisa,
          deletedAt: null,
        },
        include: {
          PesquisaPreco: {
            include: {
              DocumentoScanA: true,
              DocumentoScanB: true,
              DocumentoScanC: true,
            },
          },
          PropostaBem: {
            include: {
              Fornecedor: true,
            },
          },
        },
      });
      return { ok: true, data: bens };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async createProposta(propostaBem: PropostaBem) {
    try {
      const createProposta = await prisma.propostaBem.create({
        data: {
          ...propostaBem,
          createdAt: new Date(),
        },
      });
      return { ok: true, data: createProposta };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async updateProposta(propostaBem: PropostaBem, idBem: number, idFornecedor: number) {
    try {
      const existeProposta = await prisma.propostaBem.findFirst({
        where: {
          bemId: idBem,
          fornecedorId: idFornecedor,
          deletedAt: null,
        },
      });
      if (!existeProposta) {
        return { ok: false, data: StatusCodes.NOT_FOUND };
      } else {
        const updateProposta = await prisma.propostaBem.update({
          where: {
            bemId_fornecedorId: {
              bemId: idBem,
              fornecedorId: idFornecedor,
            },
          },
          data: {
            ...propostaBem,
            updatedAt: new Date(),
          },
        });
        return { ok: true, data: updateProposta };
      }
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async deleteProposta(idBem: number, idFornecedor: number) {
    try {
      const existeProposta = await prisma.propostaBem.findFirst({
        where: {
          bemId: idBem,
          fornecedorId: idFornecedor,
          deletedAt: null,
        },
      });
      if (!existeProposta) {
        return { ok: false, data: StatusCodes.NOT_FOUND };
      }
      const deleteProposta = await prisma.propostaBem.delete({
        where: {
          bemId_fornecedorId: {
            bemId: idBem,
            fornecedorId: idFornecedor,
          },
        },
      });
      return { ok: true, data: deleteProposta };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }
}
