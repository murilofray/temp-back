import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { createMembroAPMService } from '../services/membroAPMService';

const SALT_ROUNDS = 10;

export const createMembroAPM = async (req: Request, res: Response) => {
  try {
    const { nome, cpf, rg, dataContratacao, email, senha, apmId, cargoAPMId } = req.body;

    // Hash da senha
    const hashedSenha = senha ? await bcrypt.hash(senha, SALT_ROUNDS) : undefined;

    // Chamada ao service para criar o membro da APM
    const result = await createMembroAPMService({
      nome,
      cpf,
      rg,
      dataContratacao,
      email,
      senha: hashedSenha,
      apmId,
      cargoAPMId,
    });

    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar o membro da APM' });
  }
};
