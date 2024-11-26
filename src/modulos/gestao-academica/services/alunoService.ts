import { Aluno } from '@prisma/client';
import { prisma } from '../../../../prisma/client';
import { StatusCodes } from 'http-status-codes';
import { ErrorHandler } from '../../../handler/prismaErrorHandler';

type CreateAlunoResponse = {
  ok: boolean;
  data: Aluno | number;
};

export class AlunoService {
  async create(aluno: Aluno, alergiaIds: number[], documentoIds: number[]): Promise<CreateAlunoResponse> {
    try {
      const alunoExist = await prisma.aluno.findFirst({
        where: {
          ra: aluno.ra,
          nomeMae: aluno.nomeMae,
        },
      });

      if (alunoExist) {
        return { ok: false, data: StatusCodes.CONFLICT };
      }

      // Criação do aluno
      const novoAluno = await prisma.aluno.create({
        data: {
          ...aluno,
          createdAt: new Date(),
          AlunoAlergia: {
            create: alergiaIds.map((id) => ({
              alergiaId: id,
            })),
          },
        },
      });

      // Criação dos documentos associados
      await prisma.alunoDocumento.createMany({
        data: documentoIds.map((documentoId) => ({
          documentoScanId: documentoId,
          alunoId: novoAluno.id, // Usando o ID do aluno recém-criado
        })),
      });

      return { ok: true, data: novoAluno }; // Retornando o novo aluno
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async findAllWithQuestionarioByServidor(servidorId: number) {
    try {
      const alunos = await prisma.aluno.findMany({
        where: {
          Turma: {
            Servidor: {
              id: servidorId,
            },
            ano: new Date().getFullYear().toString(),
          },
        },
        include: {
          Turma: {
            include: {
              Servidor: true,
            },
          },
          AlunoAlergia: {
            include: {
              Alergia: {
                include: {
                  tipoAlergia: true,
                },
              },
            },
          },
        },
      });
      return { ok: true, data: alunos };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async adicionarAlergias(alunoId: number, alergiaIds: number[]): Promise<CreateAlunoResponse> {
    try {
      const alunoExist = await prisma.aluno.findUnique({
        where: { id: alunoId },
      });

      if (!alunoExist) {
        return { ok: false, data: StatusCodes.NOT_FOUND };
      }

      // Cria os relacionamentos de aluno e alergia
      const alunoAlergias = await prisma.alunoAlergia.createMany({
        data: alergiaIds.map((alergiaId) => ({
          alunoId: alunoId,
          alergiaId: alergiaId,
        })),
        skipDuplicates: true,
      });

      return { ok: true, data: alunoAlergias.count }; // Retorna o número de relações criadas
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async adicionarDocumento(alunoId: number, documentoId: number): Promise<any> {
    try {
      // Verifica se o aluno existe
      const alunoExist = await prisma.aluno.findUnique({
        where: { id: alunoId },
      });

      if (!alunoExist) {
        return { ok: false, data: StatusCodes.NOT_FOUND };
      }

      // Verifica se o documento existe
      const documentoExist = await prisma.documentoScan.findUnique({
        where: { id: documentoId },
        include: { TipoDocumento: true },
      });

      if (!documentoExist) {
        return { ok: false, data: StatusCodes.NOT_FOUND };
      }

      // Caso o documento seja de alguns dos tipos que são únicos
      const tipoDocumento = documentoExist.TipoDocumento.descricao;
      if (
        tipoDocumento === 'CERTIDAO_NASCIMENTO' ||
        tipoDocumento === 'NIS' ||
        tipoDocumento === 'RG' ||
        tipoDocumento === 'CPF' ||
        tipoDocumento === 'DECLARACAO_VACINACAO' ||
        tipoDocumento === 'COMPROVANTE_RESIDENCIA' ||
        tipoDocumento === 'AUTODECLARACAO_RACIAL'
      ) {
        // Busca e remove documentos anteriores do mesmo tipo para o aluno
        await prisma.alunoDocumento.deleteMany({
          where: {
            alunoId: alunoId,
            DocumentosScan: {
              tipoDocumentoId: documentoExist.tipoDocumentoId,
            },
          },
        });
      }

      // Cria a nova relação de documento com o aluno
      const alunoDocumento = await prisma.alunoDocumento.create({
        data: {
          alunoId: alunoId,
          documentoScanId: documentoId,
        },
      });

      return { ok: true, data: alunoDocumento };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async index() {
    try {
      const alunos = await prisma.aluno.findMany();
      return { ok: true, data: alunos };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async getById(id: number) {
    try {
      const aluno = await prisma.aluno.findUnique({
        where: { id },
      });

      if (!aluno) {
        return { ok: false, data: StatusCodes.NOT_FOUND };
      }

      return { ok: true, data: aluno };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  private normalizeString(str: string): string {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  }

  async getByNome(nome: string) {
    try {
      const normalizedNome = this.normalizeString(nome);

      const alunos = await prisma.aluno.findMany({
        where: {
          nome: {
            contains: normalizedNome,
          },
        },
      });

      if (!alunos.length) {
        return { ok: false, data: StatusCodes.NOT_FOUND };
      }

      return { ok: true, data: alunos };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async getByRA(ra: string) {
    try {
      const alunos = await prisma.aluno.findMany({
        where: {
          ra: {
            contains: ra,
          },
        },
      });

      if (!alunos.length) {
        return { ok: false, data: StatusCodes.NOT_FOUND };
      }

      return { ok: true, data: alunos };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async getByRAUnique(ra: string) {
    try {
      const aluno = await prisma.aluno.findFirst({
        where: {
          ra: ra,
        },
      });

      return aluno || null;
    } catch (error) {
      console.log(error);
      return ErrorHandler.handleError(error);
    }
  }

  async getActiveAlunos() {
    try {
      const activeAlunos = await prisma.aluno.findMany({
        where: {
          deletedAt: null, // Filtra apenas alunos com deletedAt igual a null
          isDisabled: false,
        },
        orderBy: {
          nome: 'asc',
        },
      });

      return { ok: true, data: activeAlunos };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async getDisabledAlunos() {
    try {
      const disabledAlunos = await prisma.aluno.findMany({
        where: {
          deletedAt: null, // Filtra apenas alunos com deletedAt igual a null
          isDisabled: true,
        },
        orderBy: {
          nome: 'asc',
        },
      });

      return { ok: true, data: disabledAlunos };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async update(id: number, aluno: Aluno) {
    try {
      const alunoExist = await prisma.aluno.findFirst({
        where: { id },
      });

      if (!alunoExist) {
        return { ok: false, data: StatusCodes.NOT_FOUND };
      }

      const updatedAluno = await prisma.aluno.update({
        where: { id },
        data: {
          ...aluno,
          updatedAt: new Date(),
        },
      });

      return { ok: true, data: updatedAluno };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async delete(id: number) {
    try {
      const alunoExist = await prisma.aluno.findFirst({
        where: { id },
      });

      if (!alunoExist) {
        return { ok: false, data: StatusCodes.NOT_FOUND };
      }

      const deletedAluno = await prisma.aluno.update({
        where: { id },
        data: {
          deletedAt: new Date(),
        },
      });

      return { ok: true, data: deletedAluno };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async findAlunosByTurmaId(turmaId: number) {
    const alunos = await prisma.aluno.findMany({
      where: {
        turmaId: +turmaId,
        deletedAt: null,
        isDisabled: false,
      },
    });

    return alunos.length > 0 ? { ok: true, data: alunos } : { ok: false, data: 404 };
  }

  async getalunosSemTurma() {
    const alunos = await prisma.aluno.findMany({
      where: {
        turmaId: null,
        deletedAt: null,
        isDisabled: false,
      },
    });

    return alunos.length > 0 ? { ok: true, data: alunos } : { ok: false, data: 404 };
  }

  async realizarMatricula(turmaId: number, alunoId: number) {
    const aluno = await prisma.aluno.findUnique({
      where: {
        id: alunoId,
        deletedAt: null,
        turmaId: null,
      },
    });

    if (aluno) {
      const turma = await prisma.turma.findUnique({
        where: {
          id: turmaId,
          deletedAt: null,
        },
      });

      if (turma) {
        await prisma.aluno.update({
          where: {
            id: aluno.id,
          },
          data: {
            turmaId: turma.id,
          },
        });

        return { ok: true, data: 200 };
      }

      return { ok: false, data: 400 };
    }

    return { ok: false, data: 400 };
  }

  async getAlunosByEscola(escolaId: number) {
    const alunos = await prisma.aluno.findMany({
      where: {
        deletedAt: null,
        isDisabled: false,
        Turma: {
          escolaId: escolaId,
        },
      },
      include: {
        Turma: true,
      },
    });

    return alunos.length > 0 ? { ok: true, data: alunos } : { ok: false, data: 404 };
  }

  async desvincularAlunoDaTurma(alunoId: number) {
    const aluno = await prisma.aluno.findUnique({
      where: {
        id: alunoId,
      },
    });

    if (aluno) {
      await prisma.aluno.update({
        where: {
          id: aluno.id,
        },
        data: {
          turmaId: null,
        },
      });

      return { ok: true, data: 200 };
    }

    return { ok: false, data: 400 };
  }

  async desabilitarAluno(alunoId: number) {
    try {
      const alunoExist = await prisma.aluno.findFirst({
        where: { id: alunoId },
      });

      if (!alunoExist) {
        return { ok: false, data: StatusCodes.NOT_FOUND };
      }

      const deletedAluno = await prisma.aluno.update({
        where: { id: alunoId },
        data: {
          isDisabled: true,
        },
      });

      return { ok: true, data: deletedAluno };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }
}
