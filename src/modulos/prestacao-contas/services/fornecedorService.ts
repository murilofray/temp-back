import { Fornecedor } from '@prisma/client';
import { prisma } from '../../../../prisma/client';
import { StatusCodes } from 'http-status-codes';
import { ErrorHandler } from '../../../handler/prismaErrorHandler';

export class FornecedorService {
  async create(fornecedor: Fornecedor) {
    try {
      const createFornecedor = await prisma.fornecedor.create({
        data: {
          ...fornecedor,
          createdAt: new Date(),
        },
      });
      return { ok: true, data: createFornecedor };
    } catch (error) {
      ErrorHandler.handleError(error);
    }
  }

  async update(fornecedor: Fornecedor, id: number) {
    try {
      const updateFornecedor = await prisma.fornecedor.update({
        where: {
          id: +id,
        },
        data: {
          ...fornecedor,
          updatedAt: new Date(),
        },
      });
      return { ok: true, data: updateFornecedor };
    } catch (error) {
      ErrorHandler.handleError(error);
    }
  }

  /**
   * Atualiza ou cria um fornecedor com base no ID fornecido.
   * Se o ID for fornecido, a função tentará atualizar o fornecedor existente com os dados fornecidos.
   * Se o ID não for fornecido ou for nulo, a função criará um novo fornecedor com os dados fornecidos.
   *
   * @param fornecedor - Os dados do fornecedor a serem atualizados ou criados.
   * @param id - O ID do fornecedor a ser atualizado. Se for nulo, um novo fornecedor será criado.
   *
   * @returns Um objeto contendo um booleano `ok` indicando sucesso ou falha, e os dados do fornecedor atualizados ou criados.
   * Se `ok` for falso, a propriedade `data` conterá o código de status HTTP indicando o erro.
   *
   * @throws Lançará um erro se alguma operação de banco de dados falhar.
   */
  async updateOrCreate(fornecedor: Fornecedor, id: number | null) {
    try {
      // Certifique-se de que o ID é válido e que não estamos passando NaN
      const fornecedorId = id ? Number(id) : null;

      const updateOrCreateFornecedor = await prisma.fornecedor.upsert({
        create: {
          ...fornecedor,
          createdAt: new Date(),
        },
        update: {
          ...fornecedor,
          createdAt: fornecedor.createdAt,
          updatedAt: new Date(),
        },
        where: {
          id: fornecedorId || 0, // Defina um ID inválido para criação
        },
      });
      return { ok: true, data: updateOrCreateFornecedor };
    } catch (error) {
      ErrorHandler.handleError(error);
    }
  }

  async delete(id: number) {
    try {
      const deleteFornecedor = await prisma.fornecedor.delete({
        where: {
          id: id,
        },
      });
      return { ok: true, data: deleteFornecedor };
    } catch (error) {
      ErrorHandler.handleError(error);
    }
  }

  async findById(id: number) {
    try {
      const fornecedor = await prisma.fornecedor.findFirst({
        where: {
          id: id,
          deletedAt: null,
        },
      });
      if (!fornecedor) {
        return { ok: false, data: StatusCodes.NOT_FOUND };
      }
      return { ok: true, data: fornecedor };
    } catch (error) {
      ErrorHandler.handleError(error);
    }
  }

  /**
   * Busca fornecedores associados a uma pesquisa de preço pelo ID da pesquisa.
   *
   * @param idPesquisa - O ID da pesquisa de preço para a qual buscar fornecedores.
   *
   * @returns Um objeto contendo um booleano `ok` indicando sucesso ou falha, e os dados dos fornecedores encontrados.
   * Se `ok` for falso, a propriedade `data` conterá o código de status HTTP indicando o erro.
   *
   * @throws Lançará um erro se alguma operação de banco de dados falhar.
   */
  async findByPesquisa(idPesquisa: number) {
    try {
      const pesquisaPreco = await prisma.pesquisaPreco.findFirst({
        where: {
          id: idPesquisa,
          deletedAt: null,
        },
      });

      if (!pesquisaPreco) {
        return { ok: false, data: StatusCodes.NOT_FOUND };
      } else {
        const proponentes = [pesquisaPreco.proponenteA, pesquisaPreco.proponenteB, pesquisaPreco.proponenteC].filter(
          (proponente) => proponente !== null,
        );

        // Se o array estiver vazio, não há fornecedores a buscar
        if (proponentes.length === 0) {
          return { ok: true, data: [] };
        }

        const fornecedores = await prisma.fornecedor.findMany({
          where: {
            id: { in: proponentes as number[] },
            deletedAt: null,
          },
        });
        return { ok: true, data: fornecedores };
      }
    } catch (error) {
      ErrorHandler.handleError(error);
    }
  }

  async findByCNPJ(cnpj: string) {
    try {
      const fornecedor = await prisma.fornecedor.findFirst({
        where: {
          cnpj: cnpj,
          deletedAt: null,
        },
      });
      if (!fornecedor) {
        return { ok: false, data: StatusCodes.NOT_FOUND };
      }
      return { ok: true, data: fornecedor };
    } catch (error) {
      ErrorHandler.handleError(error);
    }
  }

  async findByCPF(cpf: string) {
    try {
      const fornecedor = await prisma.fornecedor.findFirst({
        where: {
          cpf: cpf,
          deletedAt: null,
        },
      });
      if (!fornecedor) {
        return { ok: false, data: StatusCodes.NOT_FOUND };
      }
      return { ok: true, data: fornecedor };
    } catch (error) {
      ErrorHandler.handleError(error);
    }
  }

  async findAll() {
    try {
      const fornecedores = await prisma.fornecedor.findMany({
        where: {
          deletedAt: null,
        },
      });
      return { ok: true, data: fornecedores };
    } catch (error) {
      ErrorHandler.handleError(error);
    }
  }
}
