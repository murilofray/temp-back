import { Request, Response } from 'express';
import {
  createEscolaService,
  getEscolasService,
  getEscolaByIdService,
  updateEscolaService,
  deleteEscolaService,
} from '../services/escolaService';

export const createEscola = async (req: Request, res: Response) => {
  try {
    const { telefone, ...resto } = req.body;
    const createdAt = new Date().toISOString();
    const escola = await createEscolaService({
      ...resto,
      createdAt,
      Telefone: {
        create: telefone.map((tel: { numero: string }) => ({
          numero: tel.numero.replace(/\D/g, ''),
          createdAt: new Date(),
        })),
      },
    });
    res.status(201).json(escola);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar a escola' });
  }
};

export const getEscolas = async (req: Request, res: Response) => {
  try {
    const escolas = await getEscolasService();
    res.status(200).json(escolas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter as escolas' });
  }
};

export const getEscolaById = async (req: Request, res: Response) => {
  try {
    const escola = await getEscolaByIdService(Number(req.params.id));
    if (!escola) {
      return res.status(404).json({ error: 'Escola não encontrada' });
    }
    res.status(200).json(escola);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter a escola' });
  }
};

export const updateEscola = async (req: Request, res: Response) => {
  try {
    const { telefone, ...resto } = req.body;
    const createdAt = new Date().toISOString();

    const escolaAtualizada = await updateEscolaService(Number(req.params.id), {
      ...resto,
      createdAt,
      Telefone: {
        create: telefone.map((tel: { numero: string }) => ({
          numero: tel.numero.replace(/\D/g, ''),
          createdAt: new Date(),
        })),
      },
    });
    res.status(200).json(escolaAtualizada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar a escola' });
  }
};

export const deleteEscola = async (req: Request, res: Response) => {
  try {
    await deleteEscolaService(Number(req.params.id));
    res.status(200).json({ message: 'Escola excluída' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir a escola' });
  }
};
