import { prisma } from '../../../../prisma/client';

export class TurmaService {
  async findAll() {
    const turmas = await prisma.turma.findMany({
      include: {
        Escola: {
          select: {
            nome: true
          }
        },
        Servidor: {
          select: {
            nome: true
          }
        }
      }
    });
    return { ok: true, data: turmas };
  }

  async findById(id: number) {
    const turma = await prisma.turma.findUnique({ where: { id } });
    return turma ? { ok: true, data: turma } : { ok: false, data: 404 };
  }

  async findByEscola(escolaId: number) {
    const turmas = await prisma.turma.findMany({
      where: { escolaId }, include: {
        Escola: {
          select: {
            nome: true
          }
        },
        Servidor: {
          select: {
            nome: true
          }
        }
      }
    });
    return turmas.length > 0 ? { ok: true, data: turmas } : { ok: false, data: 404 };
  }

  async create(turmaData: any) {
    const turmaExist = await prisma.turma.findFirst({
      where: {
        escolaId: turmaData.escolaId,
        servidorId: turmaData.servidorId,
        anoLetivo: turmaData.anoLetivo,
        ano: turmaData.ano,
        letra: turmaData.letra,
      },
    });

    if (turmaExist) {
      return { ok: false, data: 409 }; // Turma já cadastrada
    }

    const novaTurma = await prisma.turma.create({ data: turmaData, include: { Servidor: true } });
    return { ok: true, data: novaTurma };
  }

  async update(id: number, turmaData: any) {
    const turmaExist = await prisma.turma.findFirst({ where: { id } });

    if (!turmaExist) {
      return { ok: false, data: 404 }; // Turma não existe
    }

    const turmaUpdated = await prisma.turma.update({
      where: { id },
      data: turmaData,
    });

    return { ok: true, data: turmaUpdated };
  }

  async delete(id: number) {
    const turmaExist = await prisma.turma.findFirst({
      where: { id },
      include: { Aluno: true },
    });

    if (!turmaExist) {
      return { ok: false, data: 404 }; // Turma não existe
    }

    if (turmaExist.Aluno.length > 0) {
      return { ok: false, data: 400 }; // Alunos relacionados
    }

    await prisma.turma.delete({ where: { id } });
    return { ok: true, data: { message: 'Turma excluída com sucesso.' } };
  }
}
