import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BemService } from '../services/bemService';

const bemService = new BemService();

export class BemController {
  async create(req: Request, res: Response) {
    const resposta = await bemService.create(req.body);
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send({ resposta });
    }
  }

  async update(req: Request, res: Response) {
    const resposta = await bemService.update(req.body, Number(req.params.id));
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send({ resposta });
    }
  }

  async delete(req: Request, res: Response) {
    const resposta = await bemService.delete(Number(req.params.id));
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send({ resposta });
    }
  }

  async getById(req: Request, res: Response) {
    const resposta = await bemService.findById(Number(req.params.id));
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send({ resposta });
    }
  }

  async getByPesquisa(req: Request, res: Response) {
    const resposta = await bemService.findByPesquisa(Number(req.params.id));
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send({ resposta });
    }
  }

  async createProposta(req: Request, res: Response) {
    const resposta = await bemService.createProposta(req.body);
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send({ resposta });
    }
  }

  async updateProposta(req: Request, res: Response) {
    const resposta = await bemService.updateProposta(
      req.body,
      Number(req.params.idBem),
      Number(req.params.idFornecedor),
    );
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send({ resposta });
    }
  }

  async deleteProposta(req: Request, res: Response) {
    const resposta = await bemService.deleteProposta(Number(req.params.idBem), Number(req.params.idFornecedor));
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send({ resposta });
    }
  }
}
