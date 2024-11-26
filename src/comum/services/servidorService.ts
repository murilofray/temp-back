import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { NivelAcessoEnum } from '../../enum/NivelAcessoEnum';

const prisma = new PrismaClient();

const SALT_ROUNDS = 10;

export const createServidorService = async (data: any) => {
  return await prisma.servidor.create({ data });
};

export const getServidoresService = async () => {
  return await prisma.servidor.findMany({
    where: { deletedAt: null },
    include: { Escola: true },
  });
};

export const getServidorByIdService = async (id: number) => {
  return await prisma.servidor.findUnique({
    where: { id },
    include: { Escola: true },
  });
};

export const getServidoresByEscolaService = async (escolaId: number) => {
  return await prisma.servidor.findMany({
    where: {
      escolaId: escolaId,
      deletedAt: null,
    },
    include: { Escola: true },
  });
};

export const getServidoresByNivelAcessoService = async (nivelAcessoId: number) => {
  return await prisma.servidor.findMany({
    where: {
      deletedAt: null,
      NivelAcessoServidor: {
        some: {
          nivelAcessoId: nivelAcessoId, 
        },
      },
    },
    include: {
      Escola: true, 
    },
  });
};

export const getServidoresByNivelAcessoAndEscolaService = async (nivelAcessoId: number, escolaId: number) => {
  return await prisma.servidor.findMany({
    where: {
      deletedAt: null,
      NivelAcessoServidor: {
        some: {
          nivelAcessoId: nivelAcessoId, 
        },
      },
      escolaId: escolaId
    }
  });
}; 

export const updateServidorService = async (id: number, data: any) => {
  return await prisma.servidor.update({
    where: { id },
    data,
  });
};

export const deleteServidorService = async (id: number) => {
  return await prisma.servidor.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
};

export const updateServidorSenhaService = async (id: number, novaSenha: string) => {
  const hashedSenha = await bcrypt.hash(novaSenha, SALT_ROUNDS);
  return await prisma.servidor.update({
    where: { id },
    data: { senha: hashedSenha, updatedAt: new Date() },
  });
};

export const validarSenhaAtualService = async (id: number, senhaAtual: string) => {
  const servidor = await prisma.servidor.findUnique({
    where: { id },
    select: { senha: true }, // Pegamos apenas o campo de senha
  });

  if (!servidor || !servidor.senha) {
    throw new Error('Servidor não encontrado ou senha não definida');
  }

  // Comparação da senha fornecida com a senha criptografada no banco
  const isMatch = await bcrypt.compare(senhaAtual, servidor.senha);
  if (!isMatch) {
    throw new Error('Senha atual incorreta');
  }
};

export const getServidoresByNivelAcessosService = async (niveis: string[]) => {
  // Mapeia as strings para o enum NivelAcessoEnum
  const niveisEnum = niveis.map(nivel => {
    const found = Object.values(NivelAcessoEnum).find(enumItem => enumItem.descricao === nivel);
    if (!found) {
      throw new Error(`Nível de acesso inválido: ${nivel}`);
    }
    return found.descricao;
  });

  return await prisma.servidor.findMany({
    where: {
      deletedAt: null,
      NivelAcessoServidor: {
        some: {
          Acesso: {
            descricao: {
              in: niveisEnum, // Filtra os níveis de acesso mapeados para o enum
            },
          },
        },
      },
    },
    include: {
      Escola: true,
      NivelAcessoServidor: {
        include: {
          Acesso: true,
        },
      },
    },
  });
};
