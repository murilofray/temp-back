import { Prisma, Bem, Servico, PropostaServico } from '@prisma/client';
import { prisma } from '../../../../prisma/client';
import { StatusCodes } from 'http-status-codes';
import { PesquisaPrecoService } from './pesquisaPrecoService';
import { ErrorHandler } from '../../../handler/prismaErrorHandler';

const pesquisaPrecoService = new PesquisaPrecoService();

export class ServicoService {
  async create(servico: Servico) {
    try {
      // Verificar se existe um Pesquisa de Preço ativo
      const pesquisaPrecoExiste = pesquisaPrecoService.findById(Number(servico.pesquisaPrecoId));

      if (!pesquisaPrecoExiste) {
        return { ok: false, data: StatusCodes.NOT_FOUND };
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
      const servicoExiste = await prisma.servico.findFirst({
        where: {
          id: id,
          deletedAt: null,
        },
      });

      if (!servicoExiste) {
        return { ok: false, data: StatusCodes.NOT_FOUND };
      } else {
        const updateServico = await prisma.servico.update({
          where: {
            id: +id,
          },
          data: {
            ...servico,
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
      const servicoExiste = await prisma.servico.findFirst({
        where: {
          id: id,
          deletedAt: null,
        },
      });

      if (!servicoExiste) {
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
    try {
      const resposta = await prisma.propostaServico.create({
        data: {
          ...propostaServico,
          createdAt: new Date(),
        },
      });
      return { ok: true, data: resposta };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async updateProposta(propostaServico: PropostaServico, idServico: number, idFornecedor: number) {
    try {
      const propostaServicoExiste = await prisma.propostaServico.findFirst({
        where: {
          servicoId: idServico,
          fornecedorId: idFornecedor,
          deletedAt: null,
        },
      });
      if (!propostaServicoExiste) {
        return { ok: false, data: StatusCodes.NOT_FOUND };
      } else {
        const updatePropostaServico = await prisma.propostaServico.update({
          where: {
            servicoId_fornecedorId: {
              servicoId: idServico,
              fornecedorId: idFornecedor,
            },
          },
          data: {
            ...propostaServico,
            updatedAt: new Date(),
          },
        });
        return { ok: true, data: updatePropostaServico };
      }
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async deleteProposta(idServico: number, idFornecedor: number) {
    try {
      const propostaServicoExiste = await prisma.propostaServico.findFirst({
        where: {
          servicoId: idServico,
          fornecedorId: idFornecedor,
          deletedAt: null,
        },
      });
      if (!propostaServicoExiste) {
        return { ok: false, data: StatusCodes.NOT_FOUND };
      } else {
        const deletePropostaServico = await prisma.propostaServico.update({
          where: {
            servicoId_fornecedorId: {
              servicoId: idServico,
              fornecedorId: idFornecedor,
            },
          },
          data: {
            deletedAt: new Date(),
          },
        });
        return { ok: true, data: deletePropostaServico };
      }
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }
}
