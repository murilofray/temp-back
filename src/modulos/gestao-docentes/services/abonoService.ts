import { Abono } from '@prisma/client';
import { prisma } from '../../../../prisma/client';
import { StatusCodes } from 'http-status-codes';
import { ErrorHandler } from '../../../handler/prismaErrorHandler';

export class AbonoService {
  async create(abono: Abono) {
    try {
      // Verificar se já existe um Abono com esse nome
      const abonoExistente = await prisma.abono.findFirst({
        where: {
          nome: abono.nome,
        },
      });

      if (abonoExistente) {
        return { ok: false, data: 'Já existe um Abono com esse nome.' };
      }

      const createAbono = await prisma.abono.create({ data: abono });
      return { ok: true, data: createAbono };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async update(abono: Abono, id: number) {
    try {
      const abonoExiste = await prisma.abono.findUnique({
        where: {
          id: id,
        },
      });

      if (!abonoExiste) {
        return { ok: false, data: StatusCodes.NOT_FOUND };
      } else {
        const updateAbono = await prisma.abono.update({
          where: {
            id: +id,
          },
          data: {
            nome: abono.nome,
            abona: abono.abona,
            maximoDiasAno: abono.maximoDiasAno,
            maximoDiasMes: abono.maximoDiasMes,

            //createdAt: abono.createdAt,
            //updatedAt: new Date(),
            //deletedAt: null,
          },
        });
        return { ok: true, data: updateAbono };
      }
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async delete(id: number) {
    try {
      const abonoExiste = await prisma.abono.findUnique({
        where: {
          id: id,
          //deletedAt: null,
        },
      });

      if (!abonoExiste) {
        return { ok: false, data: StatusCodes.NOT_FOUND };
      } else {
        const deleteAbono = await prisma.abono.update({
          where: {
            id: +id,
          },
          data: {
            //deletedAt: new Date(),
          },
        });
        return { ok: true, data: deleteAbono };
      }
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async index() {
    try {
      const abono = await prisma.abono.findMany();
      return { ok: true, data: abono };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async findByNome(nome: string) {
    try {
      const abono = await prisma.abono.findFirst({
        where: {
          nome: nome,
          //deletedAt: null,
        },
      });
      return { ok: true, data: abono };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async findById(id: number) {
    try {
      const abono = await prisma.abono.findUnique({
        where: {
          id: id,
          //deletedAt: null,
        },
      });
      return { ok: true, data: abono };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }
}
