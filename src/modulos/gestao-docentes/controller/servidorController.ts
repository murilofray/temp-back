import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ServidorService } from '../services/servidorService';

const servidorService = new ServidorService();

export class ServidorController {
  async atualizarGrau(req: Request, res: Response) {
    const { id } = req.params;
  
    try {
      const servidorAtualizado = await servidorService.incrementarGrau(Number(id));
      return res.status(StatusCodes.OK).send(servidorAtualizado);
    } catch (error) {
      console.error('Erro ao atualizar grau:', error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Erro ao atualizar grau.' });
    }
  }
  

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
