import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { NotaFiscalService } from '../services/notaFiscalService';

const notaFiscalService = new NotaFiscalService();

export class NotaFiscalController {
  async create(req: Request, res: Response) {
    const resposta = await notaFiscalService.create(req.body);
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(resposta);
    }
  }

  async update(req: Request, res: Response) {
    const resposta = await notaFiscalService.update(req.body, Number(req.params.id));
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(resposta);
    }
  }

  async delete(req: Request, res: Response) {
    const resposta = await notaFiscalService.delete(Number(req.params.id));
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(resposta);
    }
  }

  async getById(req: Request, res: Response) {
    const resposta = await notaFiscalService.findById(Number(req.params.id));
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.NOT_FOUND).send({ resposta });
    }
  }

 
  async findByPesquisa(req: Request, res: Response) {
    const resposta = await notaFiscalService.findByPesquisa(Number(req.params.idPesquisa));
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.NOT_FOUND).send({ resposta });
    }
  }

  async findByFornecedor(req: Request, res: Response) {
    const resposta = await notaFiscalService.findByFornecedor(Number(req.params.idFornecedor));
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.NOT_FOUND).send({ resposta });
    }
  }
}
