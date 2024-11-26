import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ConfiguracaoService } from '../services/configuracaoService';

const configuracaoService = new ConfiguracaoService();

export class ConfiguracaoController {
  async create(req: Request, res: Response) {
    try {
      const resposta = await configuracaoService.create(req.body);
      return res.status(StatusCodes.CREATED).send(resposta);
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Erro ao criar a configuração.' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const resposta = await configuracaoService.update(req.body, Number(req.params.id));
      return res.status(StatusCodes.OK).send(resposta);
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Erro ao atualizar a configuração.' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const resposta = await configuracaoService.delete(Number(req.params.id));
      return res.status(StatusCodes.OK).send(resposta);
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Erro ao deletar a configuração.' });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const resposta = await configuracaoService.findAll();
      return res.status(StatusCodes.OK).send(resposta);
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Erro ao buscar configuração por ID.' });
    }
  }
  async getById(req: Request, res: Response) {
    try {
      const resposta = await configuracaoService.findById(Number(req.params.id));
      return res.status(StatusCodes.OK).send(resposta);
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Erro ao buscar configuração por ID.' });
    }
  }
}
