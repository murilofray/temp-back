import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ProgressaoService } from '../services/progressaoService';

const progressaoService = new ProgressaoService();

export class ProgressaoController {
  async create(req: Request, res: Response) {
    const resposta = await progressaoService.create(req.body);
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send({ resposta });
    }
  }

  async getAll(req: Request, res: Response) {
    const resposta = await progressaoService.getAll();
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ resposta });
    }
  }
  

  async update(req: Request, res: Response) {
    const resposta = await progressaoService.update(req.body, Number(req.params.id));
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send({ resposta });
    }
  }

  async delete(req: Request, res: Response) {
    const resposta = await progressaoService.delete(Number(req.params.id));
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.NOT_FOUND).send({ resposta });
    }
  }

  async getById(req: Request, res: Response) {
    const resposta = await progressaoService.findById(Number(req.params.id));
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.NOT_FOUND).send({ resposta });
    }
  }

  async getByServidorId(req: Request, res: Response) {
    const resposta = await progressaoService.findByServidorId(Number(req.params.servidorId));
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.NOT_FOUND).send({ resposta });
    }
  }
}
