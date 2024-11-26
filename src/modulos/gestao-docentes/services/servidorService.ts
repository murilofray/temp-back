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

  async incrementarGrau(servidorId: number) {
    // Tenta buscar o servidor
    const servidor = await prisma.servidor.findUnique({ where: { id: servidorId } });
  
    // Verifica se o servidor foi encontrado
    if (!servidor) {
      throw new Error('Servidor não encontrado.');
    }
  
    // Garantir que grau seja um número. Se for null ou uma string, converte para número (zero se não for válido)
    const grauAtual = servidor.grau ? parseInt(servidor.grau, 10) : 0;
  
    // Se grau for NaN (por conta de uma string inválida), considera como 0
    if (isNaN(grauAtual)) {
      throw new Error('Valor de grau inválido no servidor.');
    }
  
    // Atualiza o grau do servidor incrementando em 1 e convertendo para string
    return await prisma.servidor.update({
      where: { id: servidorId },
      data: { grau: (grauAtual + 1).toString() }, // Convertendo para string antes de atualizar
    });
  }
  
  
  
  async atualizarServidorApto(servidorId: number, tipo: string) {
    const updateData: any = {};

    if (tipo === 'ASSIDUIDADE') {
      updateData.aptoParaProgressaoPorAssiduidade = false;
    } else if (tipo === 'TITULO') {
      updateData.aptoParaProgressaoPorTitulo = false;
    }

    return await prisma.servidor.update({
      where: { id: servidorId },
      data: updateData,
    });
  }

}
