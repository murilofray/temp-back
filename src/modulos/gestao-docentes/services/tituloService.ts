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
        },
      });

      if (!servidor) {
        return { ok: false, data: 'O servidor associado a este título não está cadastrado no sistema.' };
      }

      // Verificar se o documento de certificado existe
      if (titulo.documentoScanId) {
        const documentoScan = await prisma.documentoScan.findUnique({
          where: {
            id: titulo.documentoScanId,
          },
        });

        if (!documentoScan) {
          return { ok: false, data: 'O documento de certificado associado não está cadastrado no sistema.' };
        }
      }

      // Verificar se a categoria do título existe
      const categoriaCertificado = await prisma.categoriaCertificado.findUnique({
        where: {
          id: titulo.tipoId,
        },
      });

      if (!categoriaCertificado) {
        return { ok: false, data: 'A categoria do título não está cadastrada no sistema.' };
      }

      const createTitulo = await prisma.titulo.create({
        data: {
          ...titulo,
          data: new Date(titulo.data),
          dataConclusao: new Date(titulo.dataConclusao),
          validade: titulo.validade ? new Date(titulo.validade) : null,
          createdAt: new Date(),
          aprovadoPor: null,
          status: 'Aguardando Aprovação',
        },
      });

      return { ok: true, data: createTitulo };
    } catch (error) {
      console.error('Erro ao criar título:', error);
      return ErrorHandler.handleError(error);
    }
  }

  async update(titulo: Titulo, id: number) {
    try {
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
            id: +id,
          },
          data: {
            servidorId: titulo.servidorId,
            documentoScanId: titulo.documentoScanId,
            nome: titulo.nome,
            instituicao: titulo.instituicao,
            data: titulo.data,
            tipoId: titulo.tipoId,
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

      // Verificar se a categoria do título existe
      const categoriaCertificado = await prisma.categoriaCertificado.findUnique({
        where: {
          id: titulo.tipoId,
        },
      });

      if (!categoriaCertificado) {
        return { ok: false, data: 'A categoria do título não está cadastrada no sistema.' };
      }

      const updateTitulo = await prisma.titulo.update({
        where: {
          id: id,
        },
        data: {
          servidorId: titulo.servidorId,
          documentoScanId: titulo.documentoScanId,
          nome: titulo.nome,
          instituicao: titulo.instituicao,
          data: titulo.data,
          tipoId: titulo.tipoId, // Atualizado para usar tipoId
          cargaHoraria: titulo.cargaHoraria,
          pontos: titulo.pontos,
          dataConclusao: titulo.dataConclusao,
          validade: titulo.validade,
          aprovadoPor: titulo.aprovadoPor,
          updatedAt: new Date(),
        },
      });

      return { ok: true, data: updateTitulo };
    } catch (error) {
      console.error('Erro ao atualizar título:', error);
      return ErrorHandler.handleError(error);
    }
  }

  async updateStatus(data: { status: string }, id: number) {
    try {
      const tituloExiste = await prisma.titulo.findUnique({
        where: {
          id: id,
        },
      });

      if (!tituloExiste) {
        return { ok: false, data: StatusCodes.NOT_FOUND };
      }

      const updateTitulo = await prisma.titulo.update({
        where: {
          id: id,
        },
        data: {
          status: data.status,
          updatedAt: new Date(),
          ...(data.status === 'Aguardando Aprovação' ? { deletedAt: null } : {}),
        },
      });

      return { ok: true, data: updateTitulo };
    } catch (error) {
      console.error('Erro ao atualizar status do título:', error);
      return ErrorHandler.handleError(error);
    }
  }

  async delete(id: number) {
    try {
      const tituloExiste = await prisma.titulo.findUnique({
        where: {
          id: id,
        },
      });

      if (!tituloExiste) {
        return { ok: false, data: StatusCodes.NOT_FOUND };
      }

      const deleteTitulo = await prisma.titulo.update({
        where: {
          id: id,
        },
        data: {
          status: 'Excluído',
          deletedAt: new Date(),
        },
      });

      return { ok: true, data: deleteTitulo };
    } catch (error) {
      console.error('Erro ao deletar título:', error);
      return ErrorHandler.handleError(error);
    }
  }

  async findById(id: number) {
    try {
      const titulo = await prisma.titulo.findUnique({
        where: {
          id: id,
        },
        include: {
          CategoriaCertificado: true, // Inclui informações da categoria
        },
      });

      if (!titulo) {
        return { ok: false, data: StatusCodes.NOT_FOUND };
      }

      return { ok: true, data: titulo };
    } catch (error) {
      console.error('Erro ao buscar título por ID:', error);
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
        include: {
          CategoriaCertificado: true,
        },
      });

      return { ok: true, data: titulos };
    } catch (error) {
      console.error('Erro ao buscar títulos por servidor:', error);
      return ErrorHandler.handleError(error);
    }
  }

  async findAll() {
    try {
      const titulos = await prisma.titulo.findMany({
        where: {
          deletedAt: null,
        },
        include: {
          CategoriaCertificado: true,
        },
      });

      return { ok: true, data: titulos };
    } catch (error) {
      console.error('Erro ao buscar todos os títulos:', error);
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
        include: {
          CategoriaCertificado: true,
        },
      });

      return { ok: true, data: titulos };
    } catch (error) {
      console.error('Erro ao buscar títulos excluídos:', error);
      return ErrorHandler.handleError(error);
    }
  }
}
