import { Request, Response } from 'express';
import {
  createNivelAcessoServidorService,
  updateNivelAcessoServidorService,
  getNivelAcessoByServidorIdService
} from '../services/nivelAcessoServidorService';

export const createNivelAcessoServidor = async (req: Request, res: Response) => {
  try {
    const { servidorId, niveisAcesso } = req.body;

    if (!niveisAcesso || niveisAcesso.length === 0) {
      return res.status(400).json({ error: 'Nenhum nível de acesso fornecido' });
    }

    await createNivelAcessoServidorService(servidorId, niveisAcesso);
    res.status(201).json({ message: 'Níveis de acesso cadastrados com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar níveis de acesso' });
  }
};

export const updateNivelAcessoServidor = async (req: Request, res: Response) => {
  try {
    const { servidorId } = req.params;
    const { niveisAcesso } = req.body;

    if (!niveisAcesso || niveisAcesso.length === 0) {
      return res.status(400).json({ error: 'Nenhum nível de acesso fornecido' });
    }

    await updateNivelAcessoServidorService(Number(servidorId), niveisAcesso);
    res.status(200).json({ message: 'Níveis de acesso atualizados com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar níveis de acesso' });
  }
};

export const getNivelAcessoByServidorId = async (req: Request, res: Response) => {
  try {
    const { servidorId } = req.params;

    const niveisAcesso = await getNivelAcessoByServidorIdService(Number(servidorId));

    if (!niveisAcesso || niveisAcesso.length === 0) {
      return res.status(404).json({ message: 'Nenhum nível de acesso encontrado para o servidor' });
    }

    res.status(200).json(niveisAcesso);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar níveis de acesso' });
  }
};
