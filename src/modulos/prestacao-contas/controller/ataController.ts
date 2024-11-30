import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AtaService } from '../services/ataService';

const ataService = new AtaService();

export class AtaController {
  async create(req: Request, res: Response) {
    try {
      const { titulo, ata, data, documentosScanId, escolaId, tipo } = req.body;

      if ( !titulo || !ata || !data || !escolaId || !tipo) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          error: 'Todos os campos obrigatórios devem ser preenchidos.',
        });
      }

      const novaAta = await ataService.create({
        documentosScanId: parseInt(documentosScanId),
        escolaId: parseInt(escolaId),
        titulo,
        ata,
        data: new Date(data),
        tipo,
      });

      return res.status(StatusCodes.CREATED).json(novaAta.data);
    } catch (error) {
      console.error('Erro ao criar Ata:', error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: 'Erro ao criar Ata.',
      });
    }
  }

  async getByEscola(req: Request, res: Response) {
    const idEscola = Number(req.params.idEscola);
    const ano = req.query.ano ? Number(req.query.ano) : undefined;

    if (!idEscola || (ano && isNaN(ano))) {
      return res.status(StatusCodes.BAD_REQUEST).send({ message: 'Ano ou Escola inválidos' });
    }

    const resposta = await ataService.findByEscola(idEscola, ano);
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.NOT_FOUND).send({ resposta });
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

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { titulo, ata, data, documentosScanId, tipo } = req.body;

      if (!id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          error: 'O ID da ata é obrigatório.',
        });
      }

      const updatedData: any = {};
      if (titulo) updatedData.titulo = titulo;
      if (ata) updatedData.ata = ata;
      if (data) updatedData.data = new Date(data);
      if (documentosScanId) updatedData.documentosScanId = parseInt(documentosScanId);
      if(tipo) updatedData.tipo = tipo

      const resposta = await ataService.update(parseInt(id), updatedData);

      if (resposta.ok) {
        return res.status(StatusCodes.OK).json(resposta.data);
      } else {
        return res.status(StatusCodes.BAD_REQUEST).json({
          error: 'Erro ao atualizar Ata.',
        });
      }
    } catch (error) {
      console.error('Erro ao atualizar Ata:', error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: 'Erro ao atualizar Ata.',
      });
    }
  }
}
