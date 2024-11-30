import { Item, PropostaItem } from '@prisma/client';
import { prisma } from '../../../../prisma/client';
import { StatusCodes } from 'http-status-codes';
import { PesquisaPrecoService } from './pesquisaPrecoService';
import { ErrorHandler } from '../../../handler/prismaErrorHandler';
import { PropostasService } from './propostaService';

const pesquisaPrecoService = new PesquisaPrecoService();
const propostasService = new PropostasService();

export class ItemService {
  async create(item: Item) {
    try {
      // Verificar se existe um Pesquisa de Preço ativo
      const pesquisaPrecoExiste = await pesquisaPrecoService.findById(Number(item.pesquisaPrecoId));
      if (!pesquisaPrecoExiste.ok) {
        return { ok: false, data: StatusCodes.NOT_ACCEPTABLE };
      } else {
        const createItem = await prisma.item.create({
          data: {
            ...item,
            createdAt: new Date(),
          },
        });

        return { ok: true, data: createItem };
      }
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async update(item: Item, id: number) {
    try {
      const existeItem = await this.findById(id);
      if (!existeItem.ok) {
        return { ok: false, data: StatusCodes.NOT_FOUND };
      } else {
        const updateItem = await prisma.item.update({
          where: {
            id: +id,
          },
          data: {
            notaFiscalId: item.notaFiscalId,
            termoDoacaoId: item.termoDoacaoId,
            descricao: item.descricao,
            menorValor: item.menorValor,
            quantidade: item.quantidade,
            unidade: item.unidade,
            justificativa: item.justificativa,
            aprovado: item.aprovado,
            melhorProponente: item.melhorProponente,
            updatedAt: new Date(),
          },
        });
        return { ok: true, data: updateItem };
      }
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async delete(id: number) {
    try {
      const existeItem = await this.findById(id);
      if (!existeItem.ok) {
        return { ok: false, data: StatusCodes.NOT_FOUND };
      }
      const deleteItem = await prisma.item.update({
        where: {
          id: +id,
        },
        data: {
          deletedAt: new Date(),
        },
      });
      return { ok: true, data: deleteItem };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async findById(id: number) {
    try {
      const item = await prisma.item.findFirst({
        where: {
          id: id,
          deletedAt: null,
        },
        include: {
          PropostaItem: {
            where: {
              deletedAt: null,
            },
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
      if (!item) {
        return { ok: false, data: StatusCodes.NOT_FOUND };
      }
      return { ok: true, data: item };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async findByPesquisa(idPesquisa: number) {
    try {
      const bens = await prisma.item.findMany({
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
          PropostaItem: {
            where: {
              deletedAt: null,
            },
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

  async createProposta(propostaItem: PropostaItem) {
    return await propostasService.createItemProposta(propostaItem);
  }

  async updateProposta(propostaItem: PropostaItem, idItem: number, idFornecedor: number) {
    return await propostasService.updateItemProposta(propostaItem, idItem, idFornecedor);
  }

  async deleteProposta(idItem: number, idFornecedor: number) {
    return await propostasService.deleteItemProposta(idItem, idFornecedor);
  }
}
