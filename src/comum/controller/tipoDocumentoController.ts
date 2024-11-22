import { Request, Response } from 'express';
import TipoDocumentoService from '../services/tipoDocumentoService';

const tipoDocService = new TipoDocumentoService();

export default class TipoDocumentoController {
  async index(req: Request, res: Response) {
    const resposta = await tipoDocService.index();

    if (resposta.ok) return res.json(resposta.data);
    else return res.status(500).json({ message: 'Erro interno do servidor.' });
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;

    const resposta = await tipoDocService.findById(+id);

    if (resposta.ok) return res.json(resposta.data);
    else return res.status(404).json({ message: 'Tipo Documento não encontrado.' });
  }
}
