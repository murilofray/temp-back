import { StatusCodes } from 'http-status-codes';
import { prisma } from '../../../../prisma/client';

export default class TipoAlergiaService {
  async index() {
    const tiposAlergia = await prisma.tipoAlergia.findMany();
    return this.criarRetorno(true, tiposAlergia);
  }

  async getById(id: number) {
    const tipoAlergia = await prisma.tipoAlergia.findUnique({
      where: { id },
    });

    if (!tipoAlergia) {
      return this.criarRetorno(false, StatusCodes.NOT_FOUND);
    }

    return this.criarRetorno(true, tipoAlergia);
  }

  async getByDescricao(descricao: string) {
    const tipoAlergia = await prisma.tipoAlergia.findFirst({
      where: { descricao: { equals: descricao } },
    });

    if (!tipoAlergia) {
      return this.criarRetorno(false, StatusCodes.NOT_FOUND);
    }

    return this.criarRetorno(true, tipoAlergia);
  }

  async create(descricao: string) {
    const tipoAlergiaExistente = await prisma.tipoAlergia.findFirst({
      where: { descricao },
    });

    if (tipoAlergiaExistente) {
      return this.criarRetorno(false, StatusCodes.CONFLICT);
    }

    const novoTipoAlergia = await prisma.tipoAlergia.create({
      data: { descricao },
    });

    return this.criarRetorno(true, novoTipoAlergia);
  }

  async update(id: number, descricao: string) {
    const tipoAlergiaExistente = await prisma.tipoAlergia.findUnique({
      where: { id },
    });

    if (!tipoAlergiaExistente) {
      return this.criarRetorno(false, StatusCodes.NOT_FOUND);
    }

    const tipoAlergiaDescricaoExistente = await prisma.tipoAlergia.findFirst({
      where: {
        descricao: descricao,
        id: { not: id },
      },
    });

    if (tipoAlergiaDescricaoExistente) {
      return this.criarRetorno(false, StatusCodes.CONFLICT);
    }

    const tipoAlergiaAtualizado = await prisma.tipoAlergia.update({
      where: { id },
      data: { descricao },
    });

    return this.criarRetorno(true, tipoAlergiaAtualizado);
  }

  async delete(id: number) {
    const tipoAlergiaExistente = await prisma.tipoAlergia.findUnique({
      where: { id },
      include: {
        alergias: true, // Inclui as alergias relacionadas
      },
    });

    if (!tipoAlergiaExistente) {
      return this.criarRetorno(false, StatusCodes.NOT_FOUND);
    }

    if (tipoAlergiaExistente.alergias.length > 0) {
      return this.criarRetorno(false, StatusCodes.BAD_REQUEST); // Não pode deletar se houver alergias relacionadas
    }

    await prisma.tipoAlergia.delete({
      where: { id },
    });

    return this.criarRetorno(true, StatusCodes.OK);
  }

  private criarRetorno(ok: boolean, data: any) {
    return {
      ok,
      data,
    };
  }
}
