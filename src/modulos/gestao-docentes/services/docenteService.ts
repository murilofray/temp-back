import { prisma } from '../../../../prisma/client';
import { Servidor } from '@prisma/client';

export class DocenteService {
  async findAll() {
    return await prisma.servidor.findMany({
      where: {
        NivelAcessoServidor: {
          some: {
            nivelAcessoId: 6,
          },
        },
      },
      select: {
        id: true,
        nome: true,
        categoria: true,
        grau: true,
        pontuacaoAssiduidade: true,
        escolaId: true,
      },
    });
  }
  
}
