import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { QuestionarioAlunoService } from '../services/questionarioAlunoService';

const questionarioAlunoService = new QuestionarioAlunoService();

export default class QuestionarioAlunoController {
  async index(req: Request, res: Response) {
    const resposta = await questionarioAlunoService.findAll();
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send({ resposta });
    }
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const resposta = await questionarioAlunoService.findById(Number(id));
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send({ resposta });
    }
  }

  async getByAlunoId(req: Request, res: Response) {
    const { alunoId } = req.params;
    const resposta = await questionarioAlunoService.fyndByAlunoId(Number(alunoId));
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send({ resposta });
    }
  }

  async create(req: Request, res: Response) {
    const questionarioAlunoData = req.body;

    const respostas = questionarioAlunoData.resposta;
    const servidorId = questionarioAlunoData.servidorId;
    const alunoId = questionarioAlunoData.alunoId;

    delete questionarioAlunoData.resposta;
    delete questionarioAlunoData.id;
    delete questionarioAlunoData.servidorId;
    delete questionarioAlunoData.alunoId;

    const resposta = await questionarioAlunoService.create({
      ...questionarioAlunoData,
      Servidor: {
        connect: {
          id: servidorId,
        },
      },
      Aluno: {
        connect: {
          id: alunoId,
        },
      },
      Resposta: {
        create: respostas.map((pergunta: any) => {
          const { perguntaId, tipo, resposta, respostas } = pergunta;

          const baseResposta = {
            Pergunta: {
              connect: {
                id: perguntaId,
              },
            },
            resposta: tipo === 'multiplaEscolha' ? null : resposta,
            createdAt: new Date().toISOString(),
          };

          if (tipo === 'multiplaEscolha') {
            return {
              ...baseResposta,
              OpcaoResposta: {
                create: respostas.map((opcao: any) => ({
                  Opcao: {
                    connect: {
                      id: opcao.id,
                    },
                  },
                  respostaDescricao: opcao.descricao,
                })),
              },
            };
          }

          return baseResposta;
        }),
      },
    });
    if (resposta?.ok) {
      return res.status(StatusCodes.CREATED).send(resposta.data);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send({ resposta });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const resposta = await questionarioAlunoService.delete(Number(id));
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send({ resposta });
    }
  }
}
