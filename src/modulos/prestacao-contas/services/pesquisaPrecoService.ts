import { PesquisaPreco } from '@prisma/client';
import { prisma } from '../../../../prisma/client';
import { ErrorHandler } from '../../../handler/prismaErrorHandler';
import { StatusCodes } from 'http-status-codes';

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
        return { ok: false, data: StatusCodes.BAD_REQUEST };
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
      const pesquisaExiste = await this.findById(id);

      if (!pesquisaExiste.ok) {
        return { ok: false, data: StatusCodes.NOT_FOUND };
      } else {
        const updatePesquisa = await prisma.pesquisaPreco.update({
          where: {
            id: +id,
          },
          data: {
            titulo: pesquisa.titulo,
            consolidado: pesquisa.consolidado,
            proponenteA: pesquisa.proponenteA,
            proponenteB: pesquisa.proponenteB,
            proponenteC: pesquisa.proponenteC,
            orcamentoA: pesquisa.orcamentoA,
            orcamentoB: pesquisa.orcamentoB,
            orcamentoC: pesquisa.orcamentoC,
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
      const pesquisaExiste = await this.findById(id);

      if (!pesquisaExiste.ok) {
        return { ok: false, data: StatusCodes.NOT_FOUND };
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

  async findById(id: number) {
    try {
      const pesquisa = await prisma.pesquisaPreco.findFirst({
        where: {
          id: id,
          deletedAt: null,
        },
        include: {
          DocumentoScanA: true,
          DocumentoScanB: true,
          DocumentoScanC: true,
          Programa: true,
          PrestacaoContas: {
            include: {
              PDDE: true,
            },
          },
        },
      });
      if (!pesquisa) {
        return { ok: false, data: StatusCodes.NOT_FOUND };
      }
      return { ok: true, data: pesquisa };
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
          DocumentoScanA: true,
          DocumentoScanB: true,
          DocumentoScanC: true,
          Programa: true,
          PrestacaoContas: {
            include: {
              PDDE: true,
            },
          },
        },
      });
      return { ok: true, data: pesquisas };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async findByPrograma(idPrograma: number) {
    try {
      const pesquisas = await prisma.pesquisaPreco.findMany({
        where: {
          programaId: idPrograma,
          deletedAt: null,
        },
        include: {
          DocumentoScanA: true,
          DocumentoScanB: true,
          DocumentoScanC: true,
          Programa: true,
          PrestacaoContas: {
            include: {
              PDDE: true,
            },
          },
        },
      });
      return { ok: true, data: pesquisas };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }
}
