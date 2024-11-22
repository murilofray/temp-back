import { Request, Response } from 'express';
import { getNivelAcessosService, getNivelAcessoByIdService } from '../services/nivelAcessoService';

export const getNivelAcessos = async (req: Request, res: Response) => {
  try {
    const niveisAcesso = await getNivelAcessosService();
    res.status(200).json(niveisAcesso);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter os níveis de acesso' });
  }
};

export const getNivelAcessoById = async (req: Request, res: Response) => {
  try {
    const nivelAcesso = await getNivelAcessoByIdService(Number(req.params.id));
    if (!nivelAcesso) {
      return res.status(404).json({ error: 'Nível de acesso não encontrado' });
    }
    res.status(200).json(nivelAcesso);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter o nível de acesso' });
  }
};

export const getNivelAcessoByDescricao = async (req: Request, res: Response) => {
  try {
    // const nivelAcesso = await getNivelAcessoByDescricaoService(req.params.descricao);
    // if (nivelAcesso.length === 0) {
    //   return res.status(404).json({ error: 'Nível de acesso com a descrição fornecida não encontrado' });
    // }
    // res.status(200).json(nivelAcesso);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter o nível de acesso por descrição' });
  }
};
