import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { OcorrenciaService } from '../services/ocorrenciaService';

const ocorrenciaService = new OcorrenciaService();

export class OcorrenciaController {
  async create(req: Request, res: Response) {
    const resposta = await ocorrenciaService.create(req.body);
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send({ resposta });
    }
  }

  async update(req: Request, res: Response) {
    const resposta = await ocorrenciaService.update(req.body, Number(req.params.id));
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send({ resposta });
    }
  }

  async delete(req: Request, res: Response) {
    const resposta = await ocorrenciaService.delete(Number(req.params.id));
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.NOT_FOUND).send({ resposta });
    }
  }

  async getById(req: Request, res: Response) {
    const resposta = await ocorrenciaService.findById(Number(req.params.id));
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.NOT_FOUND).send({ resposta });
    }
  }

  async getByServidorId(req: Request, res: Response) {
    const resposta = await ocorrenciaService.findByServidorId(Number(req.params.servidorId));
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.NOT_FOUND).send({ resposta });
    }
  }

  async getAll(req: Request, res: Response) {
    const resposta = await ocorrenciaService.findAll();
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.NOT_FOUND).send({ resposta });
    }
  }

  async findByDeletedAt(req: Request, res: Response) {
    const resposta = await ocorrenciaService.findByDeletedAt();
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.NOT_FOUND).send({ resposta });
    }
  }

  async updateStatus(req: Request, res: Response) {
    try {
      const { status, aprovadoPor, motivo } = req.body; // Recebe o ID de quem fez a ação no campo aprovadoPor
      const resposta = await ocorrenciaService.updateStatus(Number(req.params.id), status, aprovadoPor, motivo);
  
      if (resposta?.ok) {
        return res.status(StatusCodes.OK).send(resposta.data);
      } else {
        return res.status(StatusCodes.NOT_FOUND).send({ resposta });
      }
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Erro ao atualizar o status da ocorrência.' });
    }
  }
  

}
