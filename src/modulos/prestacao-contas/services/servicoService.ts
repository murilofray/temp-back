import { Servico, PropostaServico } from '@prisma/client';
import { prisma } from '../../../../prisma/client';
import { StatusCodes } from 'http-status-codes';
import { PesquisaPrecoService } from './pesquisaPrecoService';
import { ErrorHandler } from '../../../handler/prismaErrorHandler';
import { PropostasService } from './propostaService';

const pesquisaPrecoService = new PesquisaPrecoService();
const propostasService = new PropostasService();

export class ServicoService {
  async create(servico: Servico) {
    try {
      // Verificar se existe um Pesquisa de Preço ativo
      const pesquisaPrecoExiste = await pesquisaPrecoService.findById(Number(servico.pesquisaPrecoId));
      if (!pesquisaPrecoExiste.ok) {
        return { ok: false, data: StatusCodes.NOT_ACCEPTABLE };
      } else {
        const resposta = await prisma.servico.create({
          data: {
            ...servico,
            createdAt: new Date(),
          },
        });
        return { ok: true, data: resposta };
      }
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async update(servico: Servico, id: number) {
    try {
      const servicoExiste = await this.findById(id);
      if (!servicoExiste.ok) {
        return { ok: false, data: StatusCodes.NOT_FOUND };
      } else {
        const updateServico = await prisma.servico.update({
          where: {
            id: +id,
          },
          data: {
            notaFiscalId: servico.notaFiscalId,
            descricao: servico.descricao,
            menorValor: servico.menorValor,
            justificativa: servico.justificativa,
            aprovado: servico.aprovado,
            melhorProponente: servico.melhorProponente,
            updatedAt: new Date(),
          },
        });
        return { ok: true, data: updateServico };
      }
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async delete(id: number) {
    try {
      const servicoExiste = await this.findById(id);
      if (!servicoExiste.ok) {
        return { ok: false, data: StatusCodes.NOT_FOUND };
      } else {
        const deleteServico = await prisma.servico.update({
          where: {
            id: +id,
          },
          data: {
            deletedAt: new Date(),
          },
        });
        return { ok: true, data: deleteServico };
      }
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async findById(id: number) {
    try {
      const servico = await prisma.servico.findFirst({
        where: {
          id: id,
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
          PropostaServico: {
            include: {
              Fornecedor: true,
            },
          },
        },
      });
      if (!servico) {
        return { ok: false, data: StatusCodes.NOT_FOUND };
      }
      return { ok: true, data: servico };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async findByPesquisa(idPesquisa: number) {
    try {
      const servicos = await prisma.servico.findMany({
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
          PropostaServico: {
            include: {
              Fornecedor: true,
            },
          },
        },
      });
      return { ok: true, data: servicos };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async createProposta(propostaServico: PropostaServico) {
    return await propostasService.createServicoProposta(propostaServico);
  }

  async updateProposta(propostaServico: PropostaServico, idServico: number, idFornecedor: number) {
    return await propostasService.updateServicoProposta(propostaServico, idServico, idFornecedor);
  }

  async deleteProposta(idServico: number, idFornecedor: number) {
    return await propostasService.deleteServicoProposta(idServico, idFornecedor);
  }
}
