import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createServidorService = async (data: any) => {
  return await prisma.servidor.create({ data });
};

export const getServidoresService = async () => {
  return await prisma.servidor.findMany({
    where: { deletedAt: null },
    include: { Escola: true },
  });
};

export const getServidorByIdService = async (id: number) => {
  return await prisma.servidor.findUnique({
    where: { id },
    include: { Escola: true },
  });
};

export const getServidoresByEscolaService = async (escolaId: number) => {
  return await prisma.servidor.findMany({
    where: {
      escolaId: escolaId,
      deletedAt: null,
    },
    include: { Escola: true },
  });
};

export const updateServidorService = async (id: number, data: any) => {
  return await prisma.servidor.update({
    where: { id },
    data,
  });
};

export const deleteServidorService = async (id: number) => {
  return await prisma.servidor.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
};
