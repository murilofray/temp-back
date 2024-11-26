import { StatusCodes } from 'http-status-codes';
import { prisma } from '../../../../prisma/client';
import { ErrorHandler } from '../../../handler/prismaErrorHandler';
import { PropostaBem, PropostaServico } from '@prisma/client';

export class PropostasService {
  async existPropostaServico(idServico: number, idFornecedor: number) {
    try {
      const resposta = await prisma.propostaServico.findUnique({
        where: {
          servicoId_fornecedorId: {
            servicoId: idServico,
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

  async existPropostaBem(idBem: number, idFornecedor: number) {
    try {
      const resposta = await prisma.propostaBem.findUnique({
        where: {
          bemId_fornecedorId: {
            bemId: idBem,
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

  async createServicoProposta(propostaServico: PropostaServico) {
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

  async createBemProposta(propostaBem: PropostaBem) {
    try {
      const resposta = await prisma.propostaBem.create({
        data: {
          ...propostaBem,
          createdAt: new Date(),
        },
      });
      return { ok: true, data: resposta };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async updateServicoProposta(propostaServico: PropostaServico, idServico: number, idFornecedor: number) {
    try {
      const propostaServicoExiste = await this.existPropostaServico(idServico, idFornecedor);
      if (!propostaServicoExiste.ok) {
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
            valor: propostaServico.valor,
            updatedAt: new Date(),
          },
        });
        return { ok: true, data: updatePropostaServico };
      }
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async updateBemProposta(propostaBem: PropostaBem, idBem: number, idFornecedor: number) {
    try {
      const propostaBemExiste = await this.existPropostaBem(idBem, idFornecedor);
      if (!propostaBemExiste.ok) {
        return { ok: false, data: StatusCodes.NOT_FOUND };
      } else {
        const updatePropostaBem = await prisma.propostaBem.update({
          where: {
            bemId_fornecedorId: {
              bemId: idBem,
              fornecedorId: idFornecedor,
            },
          },
          data: {
            valor: propostaBem.valor,
            updatedAt: new Date(),
          },
        });
        return { ok: true, data: updatePropostaBem };
      }
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async deleteServicoProposta(idServico: number, idFornecedor: number) {
    try {
      const propostaServicoExiste = await this.existPropostaServico(idServico, idFornecedor);
      if (!propostaServicoExiste.ok) {
        return { ok: false, data: StatusCodes.NOT_FOUND };
      } else {
        const deletePropostaServico = await prisma.propostaServico.delete({
          where: {
            servicoId_fornecedorId: {
              servicoId: idServico,
              fornecedorId: idFornecedor,
            },
          },
        });
        return { ok: true, data: deletePropostaServico };
      }
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async deleteBemProposta(idBem: number, idFornecedor: number) {
    try {
      const propostaBemExiste = await this.existPropostaBem(idBem, idFornecedor);
      if (!propostaBemExiste.ok) {
        return { ok: false, data: StatusCodes.NOT_FOUND };
      } else {
        const deletePropostaBem = await prisma.propostaBem.delete({
          where: {
            bemId_fornecedorId: {
              bemId: idBem,
              fornecedorId: idFornecedor,
            },
          },
        });
        return { ok: true, data: deletePropostaBem };
      }
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }
}
