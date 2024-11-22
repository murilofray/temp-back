import { Prisma, PesquisaPreco, Programa } from '@prisma/client';
import { prisma } from '../../../../prisma/client';
import { StatusCodes } from 'http-status-codes';
import { ErrorHandler } from '../../../handler/prismaErrorHandler';

export class PesquisaPrecoService {
  async create(pesquisa: PesquisaPreco) {
    try {
      // Verificar se existe uma Prestação ativa para o ano corrente
      const prestacaoExiste = await prisma.prestacaoContas.findUnique({
        where: {
          id: Number(pesquisa.prestacaoContasId),
          deletedAt: null,
        },
      });

      if (!prestacaoExiste) {
        return { ok: false, data: 'Não há prestação de contas ativa para o ano informado' };
      } else {
        const createPesquisa = await prisma.pesquisaPreco.create({
          data: {
            ...pesquisa,
            createdAt: new Date(),
          },
        });
        return { ok: true, data: createPesquisa };
      }
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async update(pesquisa: PesquisaPreco, id: number) {
    try {
      const pesquisaExiste = await prisma.pesquisaPreco.findFirst({
        where: {
          id: id,
          deletedAt: null,
        },
      });

      if (!pesquisaExiste) {
        return { ok: false, data: 'Não há prestação de contas ativa para o ano informado' };
      } else {
        const updatePesquisa = await prisma.pesquisaPreco.update({
          where: {
            id: +id,
          },
          data: {
            ...pesquisa,
            updatedAt: new Date(),
          },
        });
        return { ok: true, data: updatePesquisa };
      }
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async delete(id: number) {
    try {
      const pesquisaExiste = await prisma.pesquisaPreco.findFirst({
        where: {
          id: id,
          deletedAt: null,
        },
      });

      if (!pesquisaExiste) {
        return { ok: false, data: 'Pesquisa de Preço não encontrada' };
      } else {
        const deletePesquisa = await prisma.pesquisaPreco.update({
          where: {
            id: +id,
          },
          data: {
            deletedAt: new Date(),
          },
        });
        return { ok: true, data: deletePesquisa };
      }
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async findByPrestacao(idPrestacao: number) {
    try {
      const pesquisas = await prisma.pesquisaPreco.findMany({
        where: {
          prestacaoContasId: idPrestacao,
          deletedAt: null,
        },
        include: {
          DocumentoScanA:true,
          DocumentoScanB:true,
          DocumentoScanC:true,
          PrestacaoContas: {
            include: {
              PDDE: {
                include: {
                  Programa: true,
                },
              },
            },
          },
        },
      });
      return { ok: true, data: pesquisas };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async findById(id: number) {
    try {
      const pesquisa = await prisma.pesquisaPreco.findFirst({
        where: {
          id: id,
          deletedAt: null,
        },
        include: {
          Programa: true,
          DocumentoScanA:true,
          DocumentoScanB:true,
          DocumentoScanC:true,
        },
      });
      return { ok: true, data: pesquisa };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }
}
