import { Request, Response } from 'express';
import TipoAlergiaService from '../services/tipoAlergiaService';
import { StatusCodes } from 'http-status-codes';

const tipoAlergiaService = new TipoAlergiaService();

export default class TipoAlergiaController {
  async index(req: Request, res: Response) {
    try {
      const resposta = await tipoAlergiaService.index();

      if (resposta.ok) return res.json(resposta.data);

      switch (resposta.data) {
        case StatusCodes.INTERNAL_SERVER_ERROR:
          return res.status(500).json({ message: 'Erro ao obter os tipos de alergia.' });
        default:
          return res.status(500).json({ message: 'Erro interno do servidor.' });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { descricao } = req.body;

      const resposta = await tipoAlergiaService.create(descricao);

      if (resposta.ok) return res.status(201).json(resposta.data);

      switch (resposta.data) {
        case StatusCodes.CONFLICT:
          return res.status(409).json({ message: 'O tipo de alergia ' + descricao + ' já está cadastrado.' });
        default:
          return res.status(500).json({ message: 'Erro interno do servidor.' });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { descricao } = req.body;

      const resposta = await tipoAlergiaService.update(+id, descricao);

      if (resposta.ok) return res.json(resposta.data);

      switch (resposta.data) {
        case StatusCodes.NOT_FOUND:
          return res.status(404).json({ message: 'O tipo de alergia ' + descricao + ' não existe no sistema.' });
        case StatusCodes.CONFLICT:
          return res.status(409).json({ message: 'O tipo de alergia ' + descricao + ' já está cadastrado.' });
        default:
          return res.status(500).json({ message: 'Erro interno do servidor.' });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const resposta = await tipoAlergiaService.delete(+id);

      if (resposta.ok) return res.status(200).json({ message: 'Tipo Alergia deletada' });

      switch (resposta.data) {
        case StatusCodes.NOT_FOUND:
          return res
            .status(404)
            .json({ message: 'O tipo de alergia que você está tentando remover não existe no sistema.' });
        case StatusCodes.BAD_REQUEST:
          return res.status(400).json({
            message:
              'Este tipo de alergia está em uso. Por favor, remova todas as alergias associadas a ele antes de apagá-lo.',
          });
        default:
          return res.status(500).json({ message: 'Erro interno do servidor.' });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  }
}
