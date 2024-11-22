import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { PrestacaoContasService } from '../services/prestacaoContaService';

const prestacaoContaService = new PrestacaoContasService();

export class PrestacaoContasController {
  async create(req: Request, res: Response) {
    const resposta = await prestacaoContaService.create(req.body);
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send({ resposta });
    }
  }

  async update(req: Request, res: Response) {
    const resposta = await prestacaoContaService.update(req.body, Number(req.params.id));
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send({ resposta });
    }
  }

  async delete(req: Request, res: Response) {
    const resposta = await prestacaoContaService.delete(Number(req.params.id));
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.NOT_FOUND).send({ resposta });
    }
  }

  async getById(req: Request, res: Response) {
    const resposta = await prestacaoContaService.findById(Number(req.params.id));
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.NOT_FOUND).send({ resposta });
    }
  }

  async getByAnoPDDE(req: Request, res: Response) {
    const idPDDE = Number(req.params.idPDDE);
    const ano = req.query.ano ? Number(req.query.ano) : undefined;

    if (!idPDDE) {
      return res.status(StatusCodes.BAD_REQUEST).send({ message: 'Informe um PDDE é obrigatório' });
    }

    const resposta = await prestacaoContaService.findByAnoPDDE(idPDDE, ano);
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.NOT_FOUND).send({ resposta });
    }
  }
}
