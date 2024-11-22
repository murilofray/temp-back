import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export class ContaBancariaController {
  async cadastrarContaBancaria(req: Request, res: Response) {
    try {
      const { agencia, numeroConta, banco, escolaId } = req.body;

      if (!agencia || !numeroConta || !banco || !escolaId) {
        res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        return;
      }

      const novaConta = await prisma.contaBancaria.create({
        data: {
          escolaId,
          agencia,
          numeroConta,
          banco,
          createdAt: new Date(),
          updatedAt: null,
          deletedAt: null,
        },
      });

      res.status(201).json(novaConta);
    } catch (error) {
      console.error('Erro ao cadastrar conta bancária:', error);
      res.status(500).json({ error: 'Erro ao cadastrar a conta bancária' });
    }
  }

  async listarContasBancarias(req: Request, res: Response) {
    try {
      const contas = await prisma.contaBancaria.findMany();
      res.status(200).json(contas);
    } catch (error) {
      console.error('Erro ao listar contas bancárias:', error);
      res.status(500).json({ error: 'Erro ao listar as contas bancárias' });
    }
  }

  async getContaBancariaById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({ error: 'ID da conta bancária é obrigatório' });
        return;
      }

      const conta = await prisma.contaBancaria.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!conta) {
        res.status(404).json({ error: 'Conta bancária não encontrada' });
        return;
      }

      res.status(200).json(conta);
    } catch (error) {
      console.error('Erro ao buscar conta bancária por ID:', error);
      res.status(500).json({ error: 'Erro ao buscar a conta bancária' });
    }
  }
}
