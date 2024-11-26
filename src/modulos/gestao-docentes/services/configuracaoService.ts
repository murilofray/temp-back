import { PrismaClient } from '@prisma/client';
import { ErrorHandler } from '../../../handler/prismaErrorHandler';

const prisma = new PrismaClient();

export class ConfiguracaoService {
  async create(data: any) {
    return prisma.configuracao.create({ data });
  }

  async update(data: any, id: number) {
    return prisma.configuracao.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return prisma.configuracao.delete({ where: { id } });
  }

  async findAll() {
    try {
      const configuracoes = await prisma.configuracao.findMany({
        where: { deletedAt: null },
      });

      return { ok: true, data: configuracoes };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async findById(id: number) {
    return prisma.configuracao.findUnique({ where: { id } });
  }
}
