import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { PesquisaPrecoService } from '../services/pesquisaPrecoService';

const pesquisaService = new PesquisaPrecoService();

export class PesquisaPrecoController {
  async create(req: Request, res: Response) {
    const pesquisaPreco = req.body;

    if (!pesquisaPreco) {
      return res.status(StatusCodes.BAD_REQUEST).send({ message: 'Dados inválidos' });
    }

    const resposta = await pesquisaService.create(req.body);
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send({ resposta });
    }
  }

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const pesquisaPreco = req.body;

    if (!id || isNaN(id) || !pesquisaPreco) {
      return res.status(StatusCodes.BAD_REQUEST).send({ message: 'ID ou dados inválidos' });
    }

    const resposta = await pesquisaService.update(pesquisaPreco, id);
    if (resposta.ok) {
      return res.status(StatusCodes.OK).send(resposta);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send(resposta);
    }
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);

    if (!id || isNaN(id)) {
      return res.status(StatusCodes.BAD_REQUEST).send({ message: 'ID inválido' });
    }

    const resposta = await pesquisaService.delete(id);
    if (resposta.ok) {
      return res.status(StatusCodes.OK).send(resposta);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send(resposta);
    }
  }

  async getByPrestacao(req: Request, res: Response) {
    const idPrestacao = Number(req.params.idPrestacao);

    if (!idPrestacao || isNaN(idPrestacao)) {
      return res.status(StatusCodes.BAD_REQUEST).send({ message: 'Prestação de Contas inválida' });
    }

    const resposta = await pesquisaService.findByPrestacao(idPrestacao);
    if (resposta.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send(resposta);
    }
  }

  async getByPrograma(req: Request, res: Response) {
    const idPrograma = Number(req.params.idPrograma);

    if (!idPrograma || isNaN(idPrograma)) {
      return res.status(StatusCodes.BAD_REQUEST).send({ message: 'Programa inválido' });
    }

    const resposta = await pesquisaService.findByPrograma(idPrograma);
    if (resposta.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send(resposta);
    }
  }

  async getById(req: Request, res: Response) {
    const id = Number(req.params.id);

    if (!id || isNaN(id)) {
      return res.status(StatusCodes.BAD_REQUEST).send({ message: 'ID inválido' });
    }

    const resposta = await pesquisaService.findById(id);
    if (resposta.ok) {
      return res.status(StatusCodes.OK).send(resposta);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send(resposta);
    }
  }
}
