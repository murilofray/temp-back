import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { QuinquenioService } from '../services/quinquenioService';

const quinquenioService = new QuinquenioService();

export class QuinquenioController {
  async create(req: Request, res: Response) {
    try {
      const resposta = await quinquenioService.create(req.body);
      if (resposta?.ok) {
        return res.status(StatusCodes.OK).send(resposta.data);
      } else {
        return res.status(StatusCodes.BAD_REQUEST).send({ resposta });
      }
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Erro ao criar o registro.' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const resposta = await quinquenioService.update(req.body, Number(req.params.id));
      if (resposta?.ok) {
        return res.status(StatusCodes.OK).send(resposta.data);
      } else {
        return res.status(StatusCodes.BAD_REQUEST).send({ resposta });
      }
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Erro ao atualizar o registro.' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const resposta = await quinquenioService.delete(Number(req.params.id));
      if (resposta?.ok) {
        return res.status(StatusCodes.OK).send(resposta.data);
      } else {
        return res.status(StatusCodes.NOT_FOUND).send({ resposta });
      }
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Erro ao deletar o registro.' });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const resposta = await quinquenioService.findById(Number(req.params.id));
      if (resposta?.ok) {
        return res.status(StatusCodes.OK).send(resposta.data);
      } else {
        return res.status(StatusCodes.NOT_FOUND).send({ resposta });
      }
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Erro ao buscar o registro por ID.' });
    }
  }

  async getByServidorId(req: Request, res: Response) {
    try {
      const resposta = await quinquenioService.findByServidorId(Number(req.params.servidorId));
      if (resposta?.ok) {
        return res.status(StatusCodes.OK).send(resposta.data);
      } else {
        return res.status(StatusCodes.NOT_FOUND).send({ resposta });
      }
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ error: 'Erro ao buscar o registro por Servidor ID.' });
    }
  }
}
