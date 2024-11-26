import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ApmService } from '../services/apmService';

const apmService = new ApmService();

export class ApmController {
  async create(req: Request, res: Response) {
    try {
      const { vigente, dataFormacao } = req.body;

      if (!vigente || !dataFormacao) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          error: 'Todos os campos obrigatórios devem ser preenchidos.',
        });
      }

      const novaApm = await apmService.create({
        vigente: parseInt(vigente),
        dataFormacao: new Date(dataFormacao),
      });

      return res.status(StatusCodes.CREATED).json(novaApm.data);
    } catch (error) {
      console.error('Erro ao criar APM:', error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: 'Erro ao criar APM.',
      });
    }
  }

  async getAll(req: Request, res: Response) {
    const resposta = await apmService.getAll();
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ resposta });
    }
  }

  async getByEscola(req: Request, res: Response) {
    const idEscola = Number(req.params.idEscola);

    if (!idEscola) {
      return res.status(StatusCodes.BAD_REQUEST).send({ message: 'Escola inválida.' });
    }

    const resposta = await apmService.findByEscola(idEscola);
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.NOT_FOUND).send({ resposta });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { vigente, dataFormacao } = req.body;

      if (!id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          error: 'O ID da APM é obrigatório.',
        });
      }

      const updatedData: any = {};
      if (vigente) updatedData.vigente = parseInt(vigente);
      if (dataFormacao) updatedData.dataFormacao = new Date(dataFormacao);

      const resposta = await apmService.update(parseInt(id), updatedData);

      if (resposta.ok) {
        return res.status(StatusCodes.OK).json(resposta.data);
      } else {
        return res.status(StatusCodes.BAD_REQUEST).json({
          error: 'Erro ao atualizar APM.',
        });
      }
    } catch (error) {
      console.error('Erro ao atualizar APM:', error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: 'Erro ao atualizar APM.',
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          error: 'O ID da APM é obrigatório.',
        });
      }

      const resposta = await apmService.delete(parseInt(id));

      if (resposta.ok) {
        return res.status(StatusCodes.OK).json({ message: 'APM excluída logicamente com sucesso.' });
      } else {
        return res.status(StatusCodes.BAD_REQUEST).json({
          error: 'Erro ao excluir APM.',
        });
      }
    } catch (error) {
      console.error('Erro ao excluir APM:', error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: 'Erro ao excluir APM.',
      });
    }
  }
}
