import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { DocenteService } from '../services/docenteService';

const docenteService = new DocenteService();

export class DocenteController {
  async getAllDocentes(req: Request, res: Response) {
    try {
      const resposta = await docenteService.findAll();
      return res.status(StatusCodes.OK).send(resposta);
    } catch (error) {
      console.error('Erro ao buscar docentes:', error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Erro ao buscar docentes.' });
    }
  }


}
