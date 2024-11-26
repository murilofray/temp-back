import { prisma } from '../../../../prisma/client';
import { Servidor } from '@prisma/client';

export class ServidorService {

  async findAll() {
    return await prisma.servidor.findMany({
      select: {
        id: true,
        nome: true,
        categoria: true,
        grau: true,
        pontuacaoAssiduidade: true,
        escolaId: true,
        aptoParaProgressaoPorAssiduidade: true,
        aptoParaProgressaoPorTitulo: true
      },
    });
  }

}
