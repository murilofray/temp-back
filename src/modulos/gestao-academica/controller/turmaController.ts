import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { TurmaService } from '../services/turmaService';

const turmaService = new TurmaService();

export default class TurmaController {
  async index(req: Request, res: Response) {
    const resposta = await turmaService.findAll();
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send({ resposta });
    }
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const resposta = await turmaService.findById(Number(id));
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send({ resposta });
    }
  }

  async getByEscola(req: Request, res: Response) {
    const { escolaId } = req.params;
    const resposta = await turmaService.findByEscola(Number(escolaId));
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send({ resposta });
    }
  }

  async create(req: Request, res: Response) {
    const turmaData = req.body;
    const resposta = await turmaService.create(turmaData);
    if (resposta?.ok) {
      return res.status(StatusCodes.CREATED).send(resposta.data);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send({ resposta });
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const turmaData = req.body;
    const resposta = await turmaService.update(Number(id), turmaData);
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send({ resposta });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const resposta = await turmaService.delete(Number(id));
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send({ resposta });
    }
  }

  async rematricular(req: Request, res: Response) {
    const { turmaAtual, turmaNova } = req.body;
    const resposta = await turmaService.rematricular(+turmaAtual, +turmaNova)
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send({ resposta });
    }
  }
}
