import { CategoriaCertificado } from '@prisma/client';
import { prisma } from '../../../../prisma/client';
import { StatusCodes } from 'http-status-codes';
import { ErrorHandler } from '../../../handler/prismaErrorHandler';

export class CategoriaCertificadoService {
  async create(categoria: CategoriaCertificado) {
    try {
      const categoriaExistente = await prisma.categoriaCertificado.findFirst({
        where: { nome: categoria.nome },
      });

      if (categoriaExistente) {
        return { ok: false, data: 'Já existe uma CategoriaCertificado com esse nome.' };
      }

      const createCategoria = await prisma.categoriaCertificado.create({ data: categoria });
      return { ok: true, data: createCategoria };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async update(categoria: CategoriaCertificado, id: number) {
    try {
      const categoriaExiste = await prisma.categoriaCertificado.findUnique({ where: { id } });
  
      if (!categoriaExiste) {
        return { ok: false, data: 'Categoria não encontrada.', statusCode: StatusCodes.NOT_FOUND };
      }
  
      const categoriaComMesmoNome = await prisma.categoriaCertificado.findFirst({
        where: {
          nome: categoria.nome,
          id: { not: id }, 
        },
      });
  
      if (categoriaComMesmoNome) {
        return { ok: false, data: 'Já existe uma categoria com esse nome.', statusCode: StatusCodes.CONFLICT };
      }
  
      const updateCategoria = await prisma.categoriaCertificado.update({
        where: { id },
        data: {
          nome: categoria.nome,
          pontosPorHora: categoria.pontosPorHora,
          horasMinimas: categoria.horasMinimas,
          horasMaximas: categoria.horasMaximas,
        },
      });
  
      return { ok: true, data: updateCategoria };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async delete(id: number) {
    try {
      const categoriaExiste = await prisma.categoriaCertificado.findUnique({ where: { id } });

      if (!categoriaExiste) {
        return { ok: false, message: 'CategoriaCertificado não encontrada.', statusCode: StatusCodes.NOT_FOUND };
      }

      const categoriaDeletada = await prisma.categoriaCertificado.delete({ where: { id } });
      return { ok: true, data: categoriaDeletada };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async index() {
    try {
      const categorias = await prisma.categoriaCertificado.findMany();
      return { ok: true, data: categorias };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async findById(id: number) {
    try {
      const categoria = await prisma.categoriaCertificado.findUnique({ where: { id } });
      return { ok: true, data: categoria };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async findByNome(nome: string) {
    try {
      const categoria = await prisma.categoriaCertificado.findFirst({ where: { nome } });
      return { ok: true, data: categoria };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }
}
