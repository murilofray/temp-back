import { OficioMemorando } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import { prisma } from '../../../../prisma/client';
import { ErrorHandler } from '../../../handler/prismaErrorHandler';
import { getEscolaByIdService } from '../../../comum/services/escolaService';

export class OficioMemorandoService {
  async create(oficioMemorando: OficioMemorando) {
    try {
      // Verificar se a escola existe
      const escola = await getEscolaByIdService(Number(oficioMemorando.escolaId));

      if (!escola) {
        return { ok: false, data: StatusCodes.NOT_ACCEPTABLE };
      } else {
        const createOfiMem = await prisma.oficioMemorando.create({
          data: {
            ...oficioMemorando,
            createdAt: new Date(),
          },
        });
        return { ok: true, data: createOfiMem };
      }
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async update(oficioMemorando: OficioMemorando, id: number) {
    try {
      const ofiMemExiste = await prisma.oficioMemorando.findUnique({
        where: {
          id: id,
          deletedAt: null,
        },
      });

      if (!ofiMemExiste) {
        return { ok: false, data: StatusCodes.NOT_FOUND };
      } else {
        const updateOfiMem = await prisma.oficioMemorando.update({
          where: {
            id: id,
          },
          data: {
            documentoScanId: oficioMemorando.documentoScanId,
            escolaId: oficioMemorando.escolaId,
            titulo: oficioMemorando.titulo,
            tipo: oficioMemorando.tipo,
            data: oficioMemorando.data,
            updatedAt: new Date(),
          },
        });
        return { ok: true, data: updateOfiMem };
      }
    } catch (error) {}
  }

  async delete(id: number) {
    try {
      const ofiMemExiste = await prisma.oficioMemorando.findUnique({
        where: {
          id: id,
          deletedAt: null,
        },
      });
      if (!ofiMemExiste) {
        return { ok: false, data: StatusCodes.NOT_FOUND };
      } else {
        const deleteOfiMem = await prisma.oficioMemorando.update({
          where: {
            id: id,
          },
          data: {
            deletedAt: new Date(),
          },
        });
        return { ok: true, data: deleteOfiMem };
      }
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async findById(id: number) {
    try {
      const ofiMem = await prisma.oficioMemorando.findUnique({
        where: {
          id: id,
          deletedAt: null,
        },
      });
      if (!ofiMem) {
        return { ok: false, data: StatusCodes.NOT_FOUND };
      } else {
        return { ok: true, data: ofiMem };
      }
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  /**
   * Recupera uma lista de ofícios e memorandos relacionados a uma determinada escola para um ano específico.
   *
   * @param idEscola - O identificador único da escola.
   * @param ano - O ano para o qual recuperar os ofícios e memorandos. Padrão para o ano atual.
   *
   * @returns Um objeto contendo um booleano `ok` indicando sucesso ou falha, e os dados correspondentes.
   * Se `ok` for true, a propriedade `data` conterá um array de objetos {@link OficioMemorando}.
   * Se `ok` for false, a propriedade `data` conterá o código de status HTTP indicando o erro.
   *
   * @throws Lançará um erro se houver um problema com a conexão com o banco de dados ou a execução da consulta.
   */
  async findByEscola(idEscola: number, ano: number = new Date().getFullYear()) {
    try {
      const ofiMemos = await prisma.oficioMemorando.findMany({
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
      if (!ofiMemos) {
        return { ok: false, data: StatusCodes.NOT_FOUND };
      } else {
        return { ok: true, data: ofiMemos };
      }
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }
}
