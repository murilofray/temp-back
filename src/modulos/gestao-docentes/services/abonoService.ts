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
        where: { id },
      });
  
      if (!abonoExiste) {
        return { ok: false, data: 'Abono não encontrado.', statusCode: StatusCodes.NOT_FOUND };
      }
  
      const abonoComMesmoNome = await prisma.abono.findFirst({
        where: {
          nome: abono.nome,
          id: { not: id }, 
        },
      });
  
      if (abonoComMesmoNome) {
        return { ok: false, data: 'Já existe um Abono com esse nome.', statusCode: StatusCodes.CONFLICT };
      }
  
      const updateAbono = await prisma.abono.update({
        where: { id },
        data: {
          nome: abono.nome,
          abona: abono.abona,
          maximoDiasAno: abono.maximoDiasAno,
          maximoDiasMes: abono.maximoDiasMes,
        },
      });
  
      return { ok: true, data: updateAbono };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }
  

  async delete(id: number) {
    try {
      // Verifica se o registro existe
      const abonoExiste = await prisma.abono.findUnique({
        where: {
          id: id,
        },
      });
  
      if (!abonoExiste) {
        return { ok: false, message: 'Abono não encontrado.', statusCode: StatusCodes.NOT_FOUND };
      }
  
      // Exclui fisicamente o registro
      const abonoDeletado = await prisma.abono.delete({
        where: {
          id: id,
        },
      });
  
      return { ok: true, data: abonoDeletado };
    } catch (error) {
      console.error('Erro ao deletar abono:', error);
      return { ok: false, message: 'Erro ao deletar abono.', statusCode: StatusCodes.INTERNAL_SERVER_ERROR };
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
