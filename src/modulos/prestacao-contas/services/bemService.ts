import { Bem, PropostaBem } from '@prisma/client';
import { prisma } from '../../../../prisma/client';
import { StatusCodes } from 'http-status-codes';
import { PesquisaPrecoService } from './pesquisaPrecoService';
import { ErrorHandler } from '../../../handler/prismaErrorHandler';
import { PropostasService } from './propostaService';

const pesquisaPrecoService = new PesquisaPrecoService();
const propostasService = new PropostasService();

export class BemService {
  async create(bem: Bem) {
    try {
      // Verificar se existe um Pesquisa de Preço ativo
      const pesquisaPrecoExiste = await pesquisaPrecoService.findById(Number(bem.pesquisaPrecoId));
      if (!pesquisaPrecoExiste.ok) {
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
      const existeBem = await this.findById(id);
      if (!existeBem.ok) {
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
            justificativa: bem.justificativa,
            aprovado: bem.aprovado,
            melhorProponente: bem.melhorProponente,
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
      const existeBem = await this.findById(id);
      if (!existeBem.ok) {
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
    return await propostasService.createBemProposta(propostaBem);
  }

  async updateProposta(propostaBem: PropostaBem, idBem: number, idFornecedor: number) {
    return await propostasService.updateBemProposta(propostaBem, idBem, idFornecedor);
  }

  async deleteProposta(idBem: number, idFornecedor: number) {
    return await propostasService.deleteBemProposta(idBem, idFornecedor);
  }
}
