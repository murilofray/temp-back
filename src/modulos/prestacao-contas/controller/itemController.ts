import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ItemService } from '../services/itemService';

const itemService = new ItemService();

export class ItemController {
  async create(req: Request, res: Response) {
    const resposta = await itemService.create(req.body);
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send({ resposta });
    }
  }

  async update(req: Request, res: Response) {
    const resposta = await itemService.update(req.body, Number(req.params.id));
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send({ resposta });
    }
  }

  async delete(req: Request, res: Response) {
    const resposta = await itemService.delete(Number(req.params.id));
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send({ resposta });
    }
  }

  async getById(req: Request, res: Response) {
    const resposta = await itemService.findById(Number(req.params.id));
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send({ resposta });
    }
  }

  async getByPesquisa(req: Request, res: Response) {
    const resposta = await itemService.findByPesquisa(Number(req.params.id));
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send({ resposta });
    }
  }

  async createProposta(req: Request, res: Response) {
    const resposta = await itemService.createProposta(req.body);
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send({ resposta });
    }
  }

  async updateProposta(req: Request, res: Response) {
    const resposta = await itemService.updateProposta(
      req.body,
      Number(req.params.idItem),
      Number(req.params.idFornecedor),
    );
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send({ resposta });
    }
  }

  async deleteProposta(req: Request, res: Response) {
    const resposta = await itemService.deleteProposta(Number(req.params.idItem), Number(req.params.idFornecedor));
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send({ resposta });
    }
  }
}
