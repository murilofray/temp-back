import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AtaService } from '../services/ataService';

const ataService = new AtaService();

export class AtaController {
  async create(req: Request, res: Response) {
    try {
      const { titulo, ata, data, documentosScanId } = req.body;

      if (!documentosScanId || !titulo || !ata || !data) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          error: 'Todos os campos obrigatórios devem ser preenchidos.',
        });
      }

      const novaAta = await ataService.create({
        documentosScanId: parseInt(documentosScanId),
        titulo,
        ata,
        data: new Date(data)
      });

      return res.status(StatusCodes.CREATED).json(novaAta.data);
    } catch (error) {
      console.error('Erro ao criar Ata:', error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: 'Erro ao criar Ata.',
      });
    }
  }

  async getAll(req: Request, res: Response) {
    const resposta = await ataService.getAll();
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ resposta });
    }
  }
}
