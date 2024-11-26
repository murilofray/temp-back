import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getNivelAcessosService = async () => {
  return await prisma.nivelAcesso.findMany();
};

export const getNivelAcessoByIdService = async (id: number) => {
  return await prisma.nivelAcesso.findUnique({
    where: { id },
  });
};
