import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ServidorService } from '../services/servidorService';

const servidorService = new ServidorService();

export class ServidorController {
  async getAll(req: Request, res: Response) {
    try {
      const resposta = await servidorService.findAll();
      return res.status(StatusCodes.OK).send(resposta);
    } catch (error) {
      console.error('Erro ao buscar docentes:', error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Erro ao buscar docentes.' });
    }
  }

}
