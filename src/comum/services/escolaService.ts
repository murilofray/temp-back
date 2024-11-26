import { PrismaClient } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import { ErrorHandler } from '../../handler/prismaErrorHandler';

const prisma = new PrismaClient();

export const createEscolaService = async (data: any) => {
  delete data.id;

  return await prisma.escola.create({ data });
};

export const getEscolasService = async () => {
  return await prisma.escola.findMany({
    where: { deletedAt: null },
    include: {
      Imagens: true,
      APM: true,
      ContaBancaria: true,
      Telefone: true,
      PDDE: true,
      Servidor: true,
      Turma: true,
      TermoDoacao: true,
      OficioMemorando: true,
      Diretor: true,
    },
  });
};

export const getEscolaByIdService = async (id: number) => {
  return await prisma.escola.findUnique({
    where: { id, deletedAt: null },
    include: {
      Imagens: true,
      APM: true,
      ContaBancaria: true,
      Telefone: true,
      PDDE: true,
      Servidor: true,
      Turma: true,
      TermoDoacao: true,
      OficioMemorando: true,
      Diretor: true,
    },
  });
};

export const updateEscolaService = async (id: number, data: any) => {
  await prisma.telefone.deleteMany({
    where: { escolaId: Number(id) },
  });

  return await prisma.escola.update({
    where: { id },
    data,
  });
};

export const deleteEscolaService = async (id: number) => {
  try {
    const escolaExist = await prisma.escola.findFirst({
      where: {
        id,
      },
      include: {
        ContaBancaria: true,
        Telefone: true,
        PDDE: true,
        Servidor: true,
        Turma: true,
        TermoDoacao: true,
        OficioMemorando: true,
        Diretor: true,
      },
    });

    if (!escolaExist) {
      return { ok: false, data: StatusCodes.NOT_FOUND };
    }

    if (
      escolaExist.ContaBancaria?.length == 0 &&
      escolaExist.PDDE?.length == 0 &&
      escolaExist.Servidor?.length == 0 &&
      escolaExist.Turma?.length == 0 &&
      escolaExist.OficioMemorando?.length == 0 &&
      escolaExist.Diretor == null
    ) {
      await prisma.telefone.deleteMany({
        where: {
          escolaId: Number(id),
        },
      });

      const deletedEscola = await prisma.escola.delete({
        where: { id: Number(id) },
      });

      return { ok: true, data: deletedEscola };
    } else {
      return await prisma.escola.update({
        where: { id },
        data: { deletedAt: new Date() },
      });
    }
  } catch (error) {
    return ErrorHandler.handleError(error);
  }
};
