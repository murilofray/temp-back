import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createNivelAcessoServidorService = async (servidorId: number, niveisAcesso: number[]) => {
  const nivelAcessoServidorData = niveisAcesso.map((nivelId) => ({
    servidorId,
    nivelAcessoId: nivelId,
  }));

  return await prisma.nivelAcessoServidor.createMany({
    data: nivelAcessoServidorData,
  });
};

export const updateNivelAcessoServidorService = async (servidorId: number, niveisAcesso: number[]) => {
  await prisma.nivelAcessoServidor.deleteMany({
    where: {
      servidorId: servidorId,
    },
  });

  const nivelAcessoServidorData = niveisAcesso.map((nivelId) => ({
    servidorId,
    nivelAcessoId: nivelId,
  }));

  return await prisma.nivelAcessoServidor.createMany({
    data: nivelAcessoServidorData,
  });
};

export const getNivelAcessoByServidorIdService = async (servidorId: number) => {
  return await prisma.nivelAcessoServidor.findMany({
    where: {
      servidorId: servidorId,
    },
    include: {
      Acesso: true,
    },
  });
};
