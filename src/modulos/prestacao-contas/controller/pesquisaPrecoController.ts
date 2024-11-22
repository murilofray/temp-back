import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { PesquisaPrecoService } from '../services/pesquisaPrecoService';

const pesquisaService = new PesquisaPrecoService();

export class PesquisaPrecoController {
  async create(req: Request, res: Response) {
    const resposta = await pesquisaService.create(req.body);

    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send({ resposta });
    }
  }

  async update(req: Request, res: Response) {
    const resposta = await pesquisaService.update(req.body, Number(req.params.id));
    if (resposta.ok) {
      return res.status(StatusCodes.OK).send(resposta);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send(resposta);
    }
  }

  async delete(req: Request, res: Response) {
    const resposta = await pesquisaService.delete(Number(req.params.id));
    if (resposta.ok) {
      return res.status(StatusCodes.OK).send(resposta);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send(resposta);
    }
  }

  async getByPrestacao(req: Request, res: Response) {
    const resposta = await pesquisaService.findByPrestacao(Number(req.params.id));
    if (resposta.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send(resposta);
    }
  }

  async getById(req: Request, res: Response) {
    const resposta = await pesquisaService.findById(Number(req.params.id));
    if (resposta.ok) {
      return res.status(StatusCodes.OK).send(resposta);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send(resposta);
    }
  }
}
