import { prisma } from '../../../../prisma/client';
import { ErrorHandler } from '../../../handler/prismaErrorHandler';

export class ApmService {
  async create(apm: { vigente: number; dataFormacao: Date }) {
    try {
      // const createApm = await prisma.aPM.create({
      //   data: {
      //     nome: apm.nome,
      //     cnpj: apm.cnpj,
      //     dataFormacao: apm.dataFormacao,
      //     createdAt: new Date(),
      //   },
      // });
      // return { ok: true, data: createApm };
    } catch (error) {
      console.error('Erro ao criar APM:', error);
      return ErrorHandler.handleError(error);
    }
  }

  async getAll() {
    try {
      const apms = await prisma.aPM.findMany({
        where: {
          deletedAt: null,
        },
        orderBy: {
          dataFormacao: 'asc',
        },
      });
      return { ok: true, data: apms };
    } catch (error) {
      return { ok: false, data: 'Erro ao buscar APMs' };
    }
  }

  async findByEscola(idEscola: number) {
    try {
      const apms = await prisma.aPM.findMany({
        where: {
          Escola: {
            id: idEscola,
          },
          deletedAt: null,
        },
        orderBy: {
          dataFormacao: 'asc',
        },
      });
      return { ok: true, data: apms };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async update(id: number, apm: { vigente?: number; dataFormacao?: Date }) {
    try {
      const updatedApm = await prisma.aPM.update({
        where: { id },
        data: {
          dataFormacao: apm.dataFormacao,
          updatedAt: new Date(),
        },
      });

      return { ok: true, data: updatedApm };
    } catch (error) {
      console.error('Erro ao atualizar APM:', error);
      return ErrorHandler.handleError(error);
    }
  }

  async delete(id: number) {
    try {
      const deletedApm = await prisma.aPM.update({
        where: { id },
        data: {
          deletedAt: new Date(),
        },
      });

      return { ok: true, data: deletedApm };
    } catch (error) {
      console.error('Erro ao excluir logicamente APM:', error);
      return ErrorHandler.handleError(error);
    }
  }

  async getApmDetailsByEscola(idEscola: number) {
    try {
      const apmDetails = await prisma.aPM.findFirst({
        where: {
          Escola: {
            id: idEscola,
          },
          deletedAt: null,
        },
        include: {
          FormacaoAPM: {
            where: {
              vigencia: true, // Apenas a formação atual
            },
            include: {
              ServidorApm: {
                include: {
                  Servidor: true, // Inclui todos os dados de Servidor
                },
              },
            },
          },
        },
      });
  
      if (!apmDetails) {
        return { ok: false, message: 'APM não encontrada para a escola especificada.' };
      }
  
      return { ok: true, data: apmDetails };
    } catch (error) {
      console.error('Erro ao buscar detalhes da APM:', error);
      return { ok: false, error: 'Erro ao buscar detalhes da APM.' };
    }
  }
  
  
  
}
