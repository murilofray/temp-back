import { Prisma } from '@prisma/client';
import { prisma } from '../../../../prisma/client';
import { StatusCodes } from 'http-status-codes';
import { ErrorHandler } from '../../../handler/prismaErrorHandler';

export class AtaService {
  async create(ata: { documentosScanId: number; escolaId: number; titulo: string; ata: string; data: Date }) {
    try {
      // Cria a Ata se não houver duplicata
      const createAta = await prisma.ata.create({
        data: {
          titulo: ata.titulo,
          ata: ata.ata,
          data: ata.data,
          createdAt: new Date(),
          documentosScanId: ata.documentosScanId,
          escolaId: ata.escolaId,
        },
      });

      return { ok: true, data: createAta };
    } catch (error) {
      console.error('Erro ao criar Ata:', error);
      return ErrorHandler.handleError(error);
    }
  }

  async getAll() {
    try {
      const atas = await prisma.ata.findMany({
        orderBy: {
          data: 'asc',
        },
      });
      return { ok: true, data: atas };
    } catch (error) {
      return { ok: false, data: 'Erro ao buscar atas' };
    }
  }

  async update(id: number, ata: { titulo?: string; ata?: string; data?: Date; documentosScanId?: number }) {
    try {
      const updatedAta = await prisma.ata.update({
        where: { id },
        data: {
          titulo: ata.titulo,
          ata: ata.ata,
          data: ata.data,
          documentosScanId: ata.documentosScanId,
          updatedAt: new Date(),
        },
      });

      return { ok: true, data: updatedAta };
    } catch (error) {
      console.error('Erro ao atualizar Ata:', error);
      return ErrorHandler.handleError(error);
    }
  }

  async findByEscola(idEscola: number, ano: number = new Date().getFullYear()) {
    try {
      const atas = await prisma.ata.findMany({
        where: {
          escolaId: idEscola,
          deletedAt: null,
          data: {
            gte: new Date(`${ano}-01-01`),
            lte: new Date(`${ano}-12-31`),
          },
        },
        include: {
          DocumentosScan: true,
        },
        orderBy: {
          data: 'asc',
        },
      });
      return { ok: true, data: atas };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }
}
