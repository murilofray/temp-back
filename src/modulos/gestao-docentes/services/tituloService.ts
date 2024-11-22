import { Titulo } from '@prisma/client';
import { prisma } from '../../../../prisma/client';
import { StatusCodes } from 'http-status-codes';
import { ErrorHandler } from '../../../handler/prismaErrorHandler';

export class TituloService {
  async create(titulo: Titulo) {
    try {
      // Verificar se o servidor associado ao título existe
      const servidor = await prisma.servidor.findUnique({
        where: {
          id: titulo.servidorId ?? undefined,
          deletedAt: null,
        },
      });

      if (!servidor) {
        return { ok: false, data: 'O servidor associado a este título não está cadastrado no sistema.' };
      }

      // Verificar se o documento de certificado existe
      const documentoScan = await prisma.documentoScan.findUnique({
        where: {
          id: titulo.documentoScanId ?? undefined,
          deletedAt: null,
        },
      });

      if (!documentoScan) {
        return { ok: false, data: 'O documento de certificado associado não está cadastrado no sistema.' };
      }

      const createTitulo = await prisma.titulo.create({
        data: {
          ...titulo,
          data: new Date(titulo.data), // Assegura que está no formato Date
          dataConclusao: new Date(titulo.dataConclusao), // Assegura que está no formato Date
          validade: titulo.validade ? new Date(titulo.validade) : null, // Verifica se não é null antes de converter
          createdAt: new Date(), // Usa a data atual
          aprovadoPor: null,
          status: 'Aguardando Aprovação',
        },
      });
      

      return { ok: true, data: createTitulo };
    } catch (error) {
      console.error('Error creating title:', error);
      return ErrorHandler.handleError(error);
    }
  }

  async update(titulo: Titulo, id: number) {
    try {
      const tituloExiste = await prisma.titulo.findUnique({
        where: {
          id: id,
          deletedAt: null,
        },
      });

      if (!tituloExiste) {
        return { ok: false, data: StatusCodes.NOT_FOUND };
      } else {
        const updateTitulo = await prisma.titulo.update({
          where: {
            id: +id,
          },
          data: {
            servidorId: titulo.servidorId,
            documentoScanId: titulo.documentoScanId,
            nome: titulo.nome,
            instituicao: titulo.instituicao,
            data: titulo.data,
            tipo: titulo.tipo,
            cargaHoraria: titulo.cargaHoraria,
            pontos: titulo.pontos,
            dataConclusao: titulo.dataConclusao,
            validade: titulo.validade,
            aprovadoPor: titulo.aprovadoPor,
            updatedAt: new Date(),
            deletedAt: null,
          },
        });
        return { ok: true, data: updateTitulo };
      }
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async updateStatus(data: { status: string }, id: number) {
    try {
      // Se entrar no if  significa que o titulo foi deletado e está sendo restaurado
      if (data.status == 'Aguardando Aprovação') {
        const tituloExiste = await prisma.titulo.findUnique({
          where: {
            id: id,
          },
        });
        if (!tituloExiste) {
          return { ok: false, data: StatusCodes.NOT_FOUND };
        } else {
          const updateTitulo = await prisma.titulo.update({
            where: {
              id: id,
            },
            data: {
              status: data.status,
              updatedAt: new Date(),
              deletedAt: null,
            },
          });
          return { ok: true, data: updateTitulo };
        }
      }

      const tituloExiste = await prisma.titulo.findUnique({
        where: {
          id: id,
          deletedAt: null,
        },
      });

      if (!tituloExiste) {
        return { ok: false, data: StatusCodes.NOT_FOUND };
      } else {
        const updateTitulo = await prisma.titulo.update({
          where: {
            id: id,
          },
          data: {
            status: data.status,
            updatedAt: new Date(),
          },
        });
        return { ok: true, data: updateTitulo };
      }
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async delete(id: number) {
    try {
      const tituloExiste = await prisma.titulo.findUnique({
        where: {
          id: id,
          deletedAt: null,
        },
      });

      if (!tituloExiste) {
        return { ok: false, data: StatusCodes.NOT_FOUND };
      } else {
        const deleteTitulo = await prisma.titulo.update({
          where: {
            id: +id,
          },
          data: {
            status: 'Excluido',
            deletedAt: new Date(),
          },
        });
        return { ok: true, data: deleteTitulo };
      }
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async findById(id: number) {
    try {
      const titulo = await prisma.titulo.findUnique({
        where: {
          id: id,
          deletedAt: null,
        },
      });
      return { ok: true, data: titulo };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async findByServidorId(servidorId: number) {
    try {
      const titulos = await prisma.titulo.findMany({
        where: {
          servidorId: servidorId,
          deletedAt: null,
        },
      });
      return { ok: true, data: titulos };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async findAll() {
    try {
      const titulos = await prisma.titulo.findMany({
        where: {
          deletedAt: null,
        },
      });
      return { ok: true, data: titulos };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async findByDeletedAt() {
    try {
      const titulos = await prisma.titulo.findMany({
        where: {
          deletedAt: {
            not: null,
          },
        },
      });
      return { ok: true, data: titulos };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }
}
