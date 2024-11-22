import { StatusCodes } from 'http-status-codes';
import { prisma } from '../../../prisma/client';

export default class TipoDocumentoService {
  async index() {
    const tiposDoc = await prisma.tipoDocumento.findMany();

    return { ok: true, data: tiposDoc };
  }

  async findById(id: number) {
    const tipoDoc = await prisma.tipoDocumento.findUnique({
      where: {
        id,
      },
    });

    if (tipoDoc) {
      return { ok: true, data: tipoDoc };
    } else {
      return { ok: false, data: StatusCodes.NOT_FOUND };
    }
  }
}
