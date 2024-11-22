import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import {
  createServidorService,
  getServidoresService,
  getServidorByIdService,
  updateServidorService,
  deleteServidorService,
  getServidoresByEscolaService,
} from '../services/servidorService';

const SALT_ROUNDS = 10;

export const createServidor = async (req: Request, res: Response) => {
  try {
    const { senha, senhaSED } = req.body;

    if (senha) {
      req.body.senha = await bcrypt.hash(senha, SALT_ROUNDS);
    }
    if (senhaSED) {
      req.body.senhaSED = await bcrypt.hash(senhaSED, SALT_ROUNDS);
    }

    const servidor = await createServidorService(req.body);
    res.status(201).json(servidor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar o servidor' });
  }
};

export const getServidores = async (req: Request, res: Response) => {
  try {
    console.log('Puxando servidores');
    const servidores = await getServidoresService();
    res.status(200).json(servidores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter os servidores' });
  }
};

export const getServidorById = async (req: Request, res: Response) => {
  try {
    const servidor = await getServidorByIdService(Number(req.params.id));
    if (!servidor) {
      return res.status(404).json({ error: 'Servidor não encontrado' });
    }
    res.status(200).json(servidor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter o servidor' });
  }
};

export const getServidoresByEscola = async (req: Request, res: Response) => {
  try {
    const servidores = await getServidoresByEscolaService(Number(req.params.escolaId));
    if (!servidores) {
      return res.status(404).json({ error: 'Nenhum servidor não encontrado' });
    }
    res.status(200).json(servidores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter o servidor' });
  }
};

export const updateServidor = async (req: Request, res: Response) => {
  try {
    const servidorAtualizado = await updateServidorService(Number(req.params.id), req.body);
    res.status(200).json(servidorAtualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar o servidor' });
  }
};

export const deleteServidor = async (req: Request, res: Response) => {
  try {
    await deleteServidorService(Number(req.params.id));
    res.status(200).json({ message: 'Servidor excluído logicamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir o servidor' });
  }
};
