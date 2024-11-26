import { Questionario } from '@prisma/client';
import { prisma } from '../../../../prisma/client';
import { StatusCodes } from 'http-status-codes';
import { ErrorHandler } from '../../../handler/prismaErrorHandler';

export class QuestionarioService {
  async create(questionario: Questionario) {
    try {
      const novoQuestionario = await prisma.questionario.create({
        data: { ...questionario, createdAt: new Date(), dataCriacao: new Date() },
      });

      return { ok: true, data: novoQuestionario };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async findAll(filter?: { servidorId?: number }) {
    try {
      const whereClause = filter?.servidorId
        ? {
            Servidor: {
              escolaId: {
                equals: await prisma.servidor
                  .findUnique({
                    where: { id: filter.servidorId },
                    select: { escolaId: true },
                  })
                  .then((servidor) => servidor?.escolaId),
              },
            },
          }
        : {};

      const questionarios = await prisma.questionario.findMany({
        where: whereClause,
        include: {
          Servidor: {
            include: { Escola: true },
          },
          Pergunta: {
            include: {
              Resposta: true,
              Opcao: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return { ok: true, data: questionarios };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async findById(id: number) {
    try {
      const questionario = await prisma.questionario.findUnique({
        where: { id },
        include: {
          Servidor: true,
          Pergunta: {
            include: {
              Resposta: true,
              Opcao: true,
            },
          },
        },
      });

      if (!questionario) {
        return { ok: false, data: StatusCodes.NOT_FOUND };
      }

      return { ok: true, data: questionario };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async update(id: number, questionario: Questionario) {
    try {
      const questionarioExist = await prisma.questionario.findFirst({
        where: { id },
      });

      if (!questionarioExist) {
        return { ok: false, data: StatusCodes.NOT_FOUND };
      }

      await prisma.opcao.deleteMany({
        where: {
          perguntaId: {
            in: await prisma.pergunta
              .findMany({
                where: {
                  questionarioId: id,
                },
                select: {
                  id: true,
                },
              })
              .then((perguntas) => perguntas.map((p) => p.id)),
          },
        },
      });

      const updatedQuestionario = await prisma.questionario.update({
        where: { id },
        data: {
          ...questionario,
          updatedAt: new Date(),
        },
      });

      return { ok: true, data: questionario };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async delete(id: number) {
    try {
      const questionarioExist = await prisma.questionario.findFirst({
        where: { id },
      });

      if (!questionarioExist) {
        return { ok: false, data: StatusCodes.NOT_FOUND };
      }

      const deletedQuestionario = await prisma.$transaction(async (prisma) => {
        await prisma.opcao.deleteMany({
          where: {
            perguntaId: {
              in: await prisma.pergunta
                .findMany({
                  where: {
                    questionarioId: id,
                  },
                  select: {
                    id: true,
                  },
                })
                .then((perguntas) => perguntas.map((p) => p.id)),
            },
          },
        });

        await prisma.pergunta.deleteMany({
          where: {
            questionarioId: id,
          },
        });

        return await prisma.questionario.delete({
          where: {
            id,
          },
        });
      });

      return { ok: true, data: deletedQuestionario };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }
}
