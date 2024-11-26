import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AlunoService } from '../services/alunoService';

const alunoService = new AlunoService();

export default class AlunoController {
  async index(req: Request, res: Response) {
    const resposta = await alunoService.index();
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send({ resposta });
    }
  }

  async getAllWithTurmaByServidor(req: Request, res: Response) {
    const { servidorId } = req.params;
    const resposta = await alunoService.findAllWithQuestionarioByServidor(Number(servidorId));
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send({ resposta });
    }
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const resposta = await alunoService.getById(Number(id));
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send({ resposta });
    }
  }

  async getByRa(req: Request, res: Response) {
    const { ra } = req.params;
    const resposta = await alunoService.getByRA(ra);
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else if (resposta.data === StatusCodes.NOT_FOUND) {
      return res.status(StatusCodes.NOT_FOUND).send({ mensagem: 'Aluno não encontrado' });
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send({ resposta });
    }
  }

  async getByRaUnique(req: Request, res: Response) {
    const { ra } = req.params;

    try {
      const aluno = await alunoService.getByRAUnique(ra);
      if (!aluno) {
        return res.status(StatusCodes.OK).send({ mensagem: 'Nenhum aluno encontrado', aluno: null });
      }
      return res.status(StatusCodes.OK).send(aluno);
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ mensagem: 'Erro ao buscar aluno' });
    }
  }

  async getByNome(req: Request, res: Response) {
    const { nome } = req.params;
    const resposta = await alunoService.getByNome(nome);
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send({ resposta });
    }
  }

  async getActiveAlunos(req: Request, res: Response) {
    const resposta = await alunoService.getActiveAlunos();
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send({ resposta });
    }
  }

  async getDisabledAlunos(req: Request, res: Response) {
    const resposta = await alunoService.getDisabledAlunos();
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send({ resposta });
    }
  }

  async create(req: Request, res: Response) {
    const { alergiaIds, documentosCriadosIds, ...alunoData } = req.body; // Separar os dados do aluno e os IDs das alergias e documentos

    // Passar documentoIds para o service
    const resposta = await alunoService.create(alunoData, alergiaIds || [], documentosCriadosIds);

    if (resposta?.ok) {
      return res.status(StatusCodes.CREATED).send(resposta.data);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send({ resposta });
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const alunoData = req.body;
    const resposta = await alunoService.update(Number(id), alunoData);
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send({ resposta });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const resposta = await alunoService.delete(Number(id));
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send({ resposta });
    }
  }

  async adicionarAlergias(req: Request, res: Response) {
    const { id } = req.params; // ID do aluno passado como parâmetro na URL
    const { alergiaIds } = req.body; // IDs das alergias passados no corpo da requisição

    if (!alergiaIds || !Array.isArray(alergiaIds)) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        error: 'A lista de alergias (alergiaIds) é obrigatória e deve ser um array.',
      });
    }

    const resposta = await alunoService.adicionarAlergias(Number(id), alergiaIds);

    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send({
        message: `Alergias adicionadas ao aluno com sucesso.`,
        count: resposta.data,
      });
    }
  }

  async getAlunosByTurmaId(req: Request, res: Response) {
    const { turmaId } = req.params;
    const resposta = await alunoService.findAlunosByTurmaId(+turmaId);
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send({ resposta });
    }
  }

  async adicionarDocumento(req: Request, res: Response) {
    const { id } = req.params; // ID do aluno vindo da URL
    const { documentoId } = req.body; // ID do documento a ser associado ao aluno

    const resposta = await alunoService.adicionarDocumento(Number(id), documentoId);

    if (resposta?.ok) {
      return res.status(StatusCodes.CREATED).send(resposta.data);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send({ resposta });
    }
  }

  async getAlunosSemTurma(req: Request, res: Response) {
    const resposta = await alunoService.getalunosSemTurma();
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.NOT_FOUND).send({ resposta });
    }
  }

  async matricularAluno(req: Request, res: Response) {
    const { turmaId, alunoId } = req.body;

    const resposta = await alunoService.realizarMatricula(+turmaId, +alunoId);

    console.log(resposta);

    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send({ resposta });
    }
  }

  async getAlunosByEscola(req: Request, res: Response) {
    const { escolaId } = req.params;

    const resposta = await alunoService.getAlunosByEscola(+escolaId);

    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.NOT_FOUND).send({ resposta });
    }
  }

  async desvincularAlunoDaTuma(req: Request, res: Response) {
    const { alunoId } = req.body;

    const resposta = await alunoService.desvincularAlunoDaTurma(+alunoId);

    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send({ resposta });
    }
  }

  async desabilitarAluno(req: Request, res: Response) {
    const { alunoId } = req.params;
    const resposta = await alunoService.desabilitarAluno(+alunoId);
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send({ resposta });
    }
  }
}
