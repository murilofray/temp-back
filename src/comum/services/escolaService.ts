import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createEscolaService = async (data: any) => {
    return await prisma.escola.create({ data });
};

export const getEscolasService = async () => {
    return await prisma.escola.findMany({
        where: { deletedAt: null },
        include: {
            Imagens: true,
            APM: true,
            ContaBancaria: true,
            Telefone: true,
            PDDE: true,
            Servidor: true,
            Turma: true,
            TermoDoacao: true,
            OficioMemorando: true,
            Diretor: true,
        },
    });
};

export const getEscolaByIdService = async (id: number) => {
    return await prisma.escola.findUnique({
        where: { id },
        include: {
            Imagens: true,
            APM: true,
            ContaBancaria: true,
            Telefone: true,
            PDDE: true,
            Servidor: true,
            Turma: true,
            TermoDoacao: true,
            OficioMemorando: true,
            Diretor: true,
        },
    });
};

export const updateEscolaService = async (id: number, data: any) => {
    return await prisma.escola.update({
        where: { id },
        data,
    });
};

export const deleteEscolaService = async (id: number) => {
    return await prisma.escola.update({
        where: { id },
        data: { deletedAt: new Date() },
    });
};
