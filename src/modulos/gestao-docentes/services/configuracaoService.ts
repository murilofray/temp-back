import { PrismaClient } from '@prisma/client';

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

  async findById(id: number) {
    return prisma.configuracao.findUnique({ where: { id } });
  }
}
