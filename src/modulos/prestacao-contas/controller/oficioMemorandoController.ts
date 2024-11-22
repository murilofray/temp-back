import { Request, Response } from 'express';

import { StatusCodes } from 'http-status-codes';
import { OficioMemorandoService } from '../services/oficioMemorandoService';

const oficioMemorandoService = new OficioMemorandoService();

export class OficioMemorandoController {
  async create(req: Request, res: Response) {
    const resposta = await oficioMemorandoService.create(req.body);

    const { escolaId, documentoScanId, titulo, tipo, data } = req.body;

    if (!escolaId || !titulo || !tipo || !data) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        message: 'Campos obrigatórios faltando. Por favor, forneça escolaId, titulo, tipo e data.',
      });
    }

    if (
      typeof escolaId !== 'number' ||
      (documentoScanId !== null && typeof documentoScanId !== 'number') ||
      typeof titulo !== 'string' ||
      typeof tipo !== 'string' ||
      (!(data instanceof Date) && isNaN(Date.parse(data)))
    ) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        message: 'Tipos de dados inválidos. Por favor, verifique os tipos dos campos fornecidos.',
      });
    }

    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(resposta);
    }
  }

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        message: 'ID inválido.',
      });
    }

    const updateData = req.body;
    const validationErrors: string[] = [];

    // Validate each field if it's present in the update data
    if ('escolaId' in updateData && typeof updateData.escolaId !== 'number') {
      validationErrors.push('escolaId deve ser um número.');
    }

    if (
      'documentoScanId' in updateData &&
      updateData.documentoScanId !== null &&
      typeof updateData.documentoScanId !== 'number'
    ) {
      validationErrors.push('documentoScanId deve ser null ou um número.');
    }

    if ('titulo' in updateData && typeof updateData.titulo !== 'string') {
      validationErrors.push('titulo deve ser uma string.');
    }

    if ('tipo' in updateData && typeof updateData.tipo !== 'string') {
      validationErrors.push('tipo deve ser uma string.');
    }

    if ('data' in updateData && !(updateData.data instanceof Date) && isNaN(Date.parse(updateData.data))) {
      validationErrors.push('data deve ser uma data válida.');
    }

    // Check for any validation errors
    if (validationErrors.length > 0) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        message: 'Erro de validação',
        errors: validationErrors,
      });
    }

    const resposta = await oficioMemorandoService.update(updateData, id);
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(resposta);
    }
  }

  async delete(req: Request, res: Response) {
    const resposta = await oficioMemorandoService.delete(Number(req.params.id));
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(resposta);
    }
  }

  async getById(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        message: 'ID inválido.',
      });
    }

    const resposta = await oficioMemorandoService.findById(Number(req.params.id));
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.NOT_FOUND).send({ resposta });
    }
  }
  async getByEscola(req: Request, res: Response) {
    const idEscola = Number(req.params.idEscola);
    const ano = req.query.ano ? Number(req.query.ano) : undefined;

    if (!idEscola || (ano && isNaN(ano))) {
      return res.status(StatusCodes.BAD_REQUEST).send({ message: 'Ano ou Escola inválidos' });
    }

    const resposta = await oficioMemorandoService.findByEscola(idEscola, ano);
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.NOT_FOUND).send({ resposta });
    }
  }
}
