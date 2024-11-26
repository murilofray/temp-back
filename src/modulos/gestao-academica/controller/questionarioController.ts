import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { QuestionarioService } from '../services/questionarioService';
import { create } from 'domain';

const questionarioService = new QuestionarioService();

export default class QuestionarioController {
  async index(req: Request, res: Response) {
    const { servidorId } = req.query;

    try {
      const resposta = await questionarioService.findAll({
        servidorId: servidorId ? Number(servidorId) : undefined,
      });

      if (resposta?.ok) {
        return res.status(StatusCodes.OK).send(resposta.data);
      } else {
        return res.status(StatusCodes.BAD_REQUEST).send({ resposta });
      }
    } catch (error) {
      console.error('Erro ao buscar questionários:', error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Erro ao buscar questionários' });
    }
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const resposta = await questionarioService.findById(Number(id));
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send({ resposta });
    }
  }

  async create(req: Request, res: Response) {
    const questionarioData = req.body;
    const perguntas = questionarioData.pergunta;
    const servidorId = questionarioData.servidorId;

    delete questionarioData.pergunta;
    delete questionarioData.id;
    delete questionarioData.servidorId;

    const resposta = await questionarioService.create({
      ...questionarioData,
      Servidor: {
        connect: {
          id: servidorId,
        },
      },
      Pergunta: {
        create: perguntas.map((pergunta: any) => {
          const { opcoes, ...restoPergunta } = pergunta; // Remove 'opcoes' (minúsculo)

          return {
            ...restoPergunta,
            numero: parseInt(pergunta.numero),
            createdAt: new Date().toISOString(),
            ...(opcoes &&
              opcoes.length > 0 && {
                Opcao: {
                  create: opcoes.map((opcao: any) => ({
                    ...opcao,
                  })),
                },
              }),
          };
        }),
      },
    });
    if (resposta?.ok) {
      return res.status(StatusCodes.CREATED).send(resposta.data);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send({ resposta });
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const questionarioData = req.body;
    const perguntas = questionarioData.pergunta;
    const servidorId = questionarioData.servidorId;

    delete questionarioData.pergunta;
    delete questionarioData.id;
    delete questionarioData.servidorId;

    const resposta = await questionarioService.update(Number(id), {
      ...questionarioData,
      Servidor: {
        connect: {
          id: servidorId,
        },
      },
      Pergunta: {
        deleteMany: {
          questionarioId: Number(id),
        },
        create: perguntas.map((pergunta: any) => {
          const { opcoes, ...restoPergunta } = pergunta; // Remove 'opcoes' (minúsculo)

          return {
            ...restoPergunta,
            numero: parseInt(pergunta.numero),
            createdAt: new Date().toISOString(),
            ...(opcoes &&
              opcoes.length > 0 && {
                Opcao: {
                  create: opcoes.map((opcao: any) => ({
                    ...opcao,
                  })),
                },
              }),
          };
        }),
      },
    });

    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send({ resposta });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const resposta = await questionarioService.delete(Number(id));
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send({ resposta });
    }
  }
}
