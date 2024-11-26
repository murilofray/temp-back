import { MovimentacaoFinanceira } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import { prisma } from '../../../../prisma/client';
import { ErrorHandler } from '../../../handler/prismaErrorHandler';

/**
 * Esta classe de serviço fornece métodos para gerenciar registros de MovimentacaoFinanceira.
 */
export class MovimentacaoFinanceiraService {
  async findById(id: number) {
    console.log('pesquisa id');

    try {
      const movimentacao = await prisma.movimentacaoFinanceira.findFirst({
        where: {
          id: id,
          deletedAt: null,
        },
        include: {
          ContaBancaria: true,
          DocumentosScan: true,
        },
      });
      if (!movimentacao) {
        return { ok: false, data: StatusCodes.NOT_FOUND };
      }
      return { ok: true, data: movimentacao };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async create(movimentacaoFinanceira: MovimentacaoFinanceira) {
    try {
      const contaBancariaId = Number(movimentacaoFinanceira.contaBancariaId);
      if (isNaN(contaBancariaId) || contaBancariaId <= 0) {
        return { ok: false, data: StatusCodes.BAD_REQUEST, message: 'ID da conta bancária inválido.' };
      }

      // Verificar se existe uma Conta Bancária
      const contaBancariaExiste = await prisma.contaBancaria.findFirst({
        where: {
          id: Number(movimentacaoFinanceira.contaBancariaId),
        },
      });

      if (!contaBancariaExiste) {
        return { ok: false, data: StatusCodes.NOT_ACCEPTABLE };
      } else {
        const createMovFinanceira = await prisma.movimentacaoFinanceira.create({
          data: {
            ...movimentacaoFinanceira,
            createdAt: new Date(),
          },
        });
        return { ok: true, data: createMovFinanceira };
      }
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async update(movimentacaoFinanceira: MovimentacaoFinanceira, id: number) {
    try {
      const movFinanceiraExiste = await this.findById(id);

      if (!movFinanceiraExiste) {
        return { ok: false, data: StatusCodes.NOT_FOUND };
      } else {
        const updateMovFinanceira = await prisma.movimentacaoFinanceira.update({
          where: {
            id: movimentacaoFinanceira.id,
          },
          data: {
            contaBancariaId: movimentacaoFinanceira.contaBancariaId,
            documentoScanId: movimentacaoFinanceira.documentoScanId,
            data: movimentacaoFinanceira.data,
            valor: movimentacaoFinanceira.valor,
            descricao: movimentacaoFinanceira.descricao,
            tipo: movimentacaoFinanceira.tipo,
            updatedAt: new Date(),
          },
        });
        return { ok: true, data: updateMovFinanceira };
      }
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async delete(id: number) {
    try {
      const movFinanceiraExiste = await this.findById(Number(id));
      if (!movFinanceiraExiste) {
        return { ok: false, data: StatusCodes.NOT_FOUND };
      } else {
        const deleteMovFinanceira = await prisma.movimentacaoFinanceira.update({
          where: {
            id: id,
          },
          data: {
            deletedAt: new Date(),
          },
        });
        return { ok: true, data: deleteMovFinanceira };
      }
    } catch (error) {}
  }

  /**
   * Esta função recupera uma lista de registros de movimentacaoFinanceira associados a uma Conta Bancaria específica para um ano determinado.
   *
   * @param idContaBancaria - O identificador único da Conta Bancaria.
   * @param ano - O ano para o qual recuperar os registros de movimentacaoFinanceira. Padrão para o ano atual.
   *
   * @returns Um objeto contendo um booleano `ok` indicando sucesso ou falha, e os registros de movimentacaoFinanceira recuperados.
   * Se `ok` for true, a propriedade `data` conterá um array de registros de movimentacaoFinanceira.
   * Se `ok` for false, a propriedade `data` conterá um código de status HTTP indicando o erro.
   *
   * @throws Lançará um erro se houver um problema com a consulta de banco de dados.
   */
  async findByContaBancaria(idContaBancaria: number, ano: number = new Date().getFullYear()) {
    try {
      const movimentacoes = await prisma.movimentacaoFinanceira.findMany({
        where: {
          contaBancariaId: idContaBancaria,
          deletedAt: null,
          data: {
            gte: new Date(`${ano}-01-01`),
            lte: new Date(`${ano}-12-31`),
          },
        },
        include: {
          DocumentosScan: true,
        },
        orderBy: {
          data: 'asc',
        },
      });
      return { ok: true, data: movimentacoes };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }
}
