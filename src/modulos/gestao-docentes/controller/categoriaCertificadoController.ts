import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CategoriaCertificadoService } from '../services/categoriaCertificadoService';

const categoriaCertificadoService = new CategoriaCertificadoService();

export class CategoriaCertificadoController {
  async create(req: Request, res: Response) {
    const resposta = await categoriaCertificadoService.create(req.body);
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send({ resposta });
    }
  }

  async update(req: Request, res: Response) {
    const resposta = await categoriaCertificadoService.update(req.body, Number(req.params.id));
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send({ resposta });
    }
  }

  async delete(req: Request, res: Response) {
    const resposta = await categoriaCertificadoService.delete(Number(req.params.id));
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.NOT_FOUND).send({ resposta });
    }
  }

  async index(req: Request, res: Response) {
    const resposta = await categoriaCertificadoService.index();
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.NOT_FOUND).send({ resposta });
    }
  }

  async getById(req: Request, res: Response) {
    const resposta = await categoriaCertificadoService.findById(Number(req.params.id));
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.NOT_FOUND).send({ resposta });
    }
  }

  async getByNome(req: Request, res: Response) {
    const resposta = await categoriaCertificadoService.findByNome(String(req.params.nome));
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.NOT_FOUND).send({ resposta });
    }
  }
}
