import { Prisma } from '@prisma/client';
import { prisma } from '../../../../prisma/client';
import { StatusCodes } from 'http-status-codes';
import { ErrorHandler } from '../../../handler/prismaErrorHandler';

export class AtaService {
  async create(ata: { documentosScanId: number; titulo: string; ata: string; data: Date }) {
    try {
      // Cria a Ata se não houver duplicata
      const createAta = await prisma.ata.create({
        data: {
          titulo: ata.titulo,
          ata: ata.ata,
          data: ata.data,
          createdAt: new Date(),
          documentosScanId: ata.documentosScanId,
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
      const atas = await prisma.ata.findMany();
      return { ok: true, data: atas };
    } catch (error) {
      return { ok: false, data: 'Erro ao buscar atas' };
    }
  }
}
