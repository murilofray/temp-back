import { StatusCodes } from 'http-status-codes';
import { prisma } from '../../../../prisma/client';
import { ErrorHandler } from '../../../handler/prismaErrorHandler';
import { PropostaItem } from '@prisma/client';

export class PropostasService {
  async existPropostaItem(idItem: number, idFornecedor: number) {
    try {
      const resposta = await prisma.propostaItem.findUnique({
        where: {
          itemId_fornecedorId: {
            itemId: idItem,
            fornecedorId: idFornecedor,
          },
        },
      });
      if (!resposta) return { ok: false, data: StatusCodes.NOT_FOUND };
      else return { ok: false, data: resposta };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async createItemProposta(propostaItem: PropostaItem) {
    try {
      const resposta = await prisma.propostaItem.create({
        data: {
          ...propostaItem,
          createdAt: new Date(),
        },
      });
      return { ok: true, data: resposta };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async updateItemProposta(propostaItem: PropostaItem, idItem: number, idFornecedor: number) {
    try {
      const propostaItemExiste = await this.existPropostaItem(idItem, idFornecedor);
      if (!propostaItemExiste.ok) {
        return { ok: false, data: StatusCodes.NOT_FOUND };
      } else {
        const updatePropostaItem = await prisma.propostaItem.update({
          where: {
            itemId_fornecedorId: {
              itemId: idItem,
              fornecedorId: idFornecedor,
            },
          },
          data: {
            valor: propostaItem.valor,
            updatedAt: new Date(),
          },
        });
        return { ok: true, data: updatePropostaItem };
      }
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async deleteItemProposta(idItem: number, idFornecedor: number) {
    try {
      const propostaItemExiste = await this.existPropostaItem(idItem, idFornecedor);
      if (!propostaItemExiste.ok) {
        return { ok: false, data: StatusCodes.NOT_FOUND };
      } else {
        const deletePropostaItem = await prisma.propostaItem.update({
          where: {
            itemId_fornecedorId: {
              itemId: idItem,
              fornecedorId: idFornecedor,
            },
          },
          data: {
            deletedAt: new Date(),
          },
        });
        return { ok: true, data: deletePropostaItem };
      }
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }
}
