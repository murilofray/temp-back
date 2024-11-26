import { QuestionarioAluno } from '@prisma/client';
import { prisma } from '../../../../prisma/client';
import { StatusCodes } from 'http-status-codes';
import { ErrorHandler } from '../../../handler/prismaErrorHandler';

export class QuestionarioAlunoService {
  async create(questionarioAluno: QuestionarioAluno) {
    try {
      const novoQuestionarioAluno = await prisma.questionarioAluno.create({
        data: { ...questionarioAluno, createdAt: new Date() },
      });

      return { ok: true, data: novoQuestionarioAluno };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async findAll() {
    try {
      const questionariosAluno = await prisma.questionarioAluno.findMany({
        include: {
          Aluno: true,
          Servidor: true,
          Resposta: {
            include: {
              Pergunta: {
                include: {
                  Opcao: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      return { ok: true, data: questionariosAluno };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async findById(id: number) {
    try {
      const questionarioAluno = await prisma.questionarioAluno.findUnique({
        where: { id },
        include: {
          Aluno: true,
          Servidor: true,
          Resposta: {
            include: {
              Pergunta: {
                include: {
                  Opcao: true,
                },
              },
            },
          },
        },
      });

      if (!questionarioAluno) {
        return { ok: false, data: StatusCodes.NOT_FOUND };
      }

      return { ok: true, data: questionarioAluno };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async fyndByAlunoId(alunoId: number) {
    try {
      const questionarioAluno = await prisma.questionarioAluno.findMany({
        where: { alunoId },
        include: {
          Aluno: true,
          Servidor: true,
          Resposta: {
            include: {
              Pergunta: {
                include: {
                  Opcao: true,
                  Questionario: true,
                },
              },
              OpcaoResposta: {
                include: {
                  Opcao: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      if (!questionarioAluno) {
        return { ok: false, data: StatusCodes.NOT_FOUND };
      }

      return { ok: true, data: questionarioAluno };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async delete(id: number) {
    try {
      const questionarioAlunoExist = await prisma.questionarioAluno.findFirst({
        where: { id },
      });

      if (!questionarioAlunoExist) {
        return { ok: false, data: StatusCodes.NOT_FOUND };
      }

      const deletedQuestionarioAluno = await prisma.$transaction(async (prisma) => {
        await prisma.opcaoResposta.deleteMany({
          where: {
            respostaId: {
              in: await prisma.resposta
                .findMany({
                  where: {
                    questionarioAlunoId: id,
                  },
                  select: {
                    id: true,
                  },
                })
                .then((respostas) => respostas.map((r) => r.id)),
            },
          },
        });

        await prisma.resposta.deleteMany({
          where: {
            questionarioAlunoId: id,
          },
        });

        return await prisma.questionarioAluno.delete({
          where: {
            id,
          },
        });
      });

      return { ok: true, data: deletedQuestionarioAluno };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }
}
