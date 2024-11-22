import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { MovimentacaoFinanceiraService } from '../services/movimentacaoFinanceiraService';

const movimentacaoFinanceiraService = new MovimentacaoFinanceiraService();

export class MovimentacaoFinanceiraController {
  async create(req: Request, res: Response) {
    const resposta = await movimentacaoFinanceiraService.create(req.body);
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(resposta);
    }
  }

  async update(req: Request, res: Response) {
    const resposta = await movimentacaoFinanceiraService.update(req.body, Number(req.params.id));
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(resposta);
    }
  }

  async delete(req: Request, res: Response) {
    const resposta = await movimentacaoFinanceiraService.delete(Number(req.params.id));
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(resposta);
    }
  }

  async getById(req: Request, res: Response) {
    const resposta = await movimentacaoFinanceiraService.findById(Number(req.params.id));
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.NOT_FOUND).send({ resposta });
    }
  }
  async getByContaBancaria(req: Request, res: Response) {
    const idConta = Number(req.params.idConta);
    const ano = req.query.ano ? Number(req.query.ano) : undefined;

    if (!idConta || (ano && isNaN(ano))) {
      return res.status(StatusCodes.BAD_REQUEST).send({ message: 'Ano ou Conta Bancária inválidos' });
    }

    const resposta = await movimentacaoFinanceiraService.findByContaBancaria(idConta, ano);
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.NOT_FOUND).send({ resposta });
    }
  }
}
