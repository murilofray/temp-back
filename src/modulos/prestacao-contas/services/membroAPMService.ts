import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface CreateMembroAPMDTO {
  nome: string;
  cpf: string;
  rg: string;
  dataContratacao?: Date;
  email?: string;
  senha?: string;
  apmId: number;
  cargoAPMId: number;
}

export const createMembroAPMService = async (data: CreateMembroAPMDTO) => {

    return await prisma.$transaction(async (prisma) => {
      // Criar o servidor
      const servidor = await prisma.servidor.create({
        data: {
          nome: data.nome,
          cpf: data.cpf,
          rg: data.rg,
          dataContratacao: data.dataContratacao,
          email: data.email,
          senha: data.senha,
          createdAt: new Date(),
        },
      });
  
      // Associar o servidor à tabela servidor_apm
      const servidorApm = await prisma.servidorApm.create({
        data: {
          servidorId: servidor.id,
          apmId: data.apmId,
          cargoAPMId: data.cargoAPMId,
        },
      });
  
      // Adicionar uma entrada em nivel_acesso_servidor com nivelAcessoId = 7
      const nivelAcessoServidor = await prisma.nivelAcessoServidor.create({
        data: {
          servidorId: servidor.id,
          nivelAcessoId: 7, // Valor fixo para o nível de acesso
          diretorTemporario: false,
        },
      });
  
      return { servidor, servidorApm, nivelAcessoServidor };
    });
  };
