import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export class SaldoContaBancariaController {
  async cadastrarSaldo(req: Request, res: Response) {
    try {
      const { contaBancariaId, saldo, data } = req.body;

      if (!contaBancariaId || saldo === undefined || !data) {
        res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        return;
      }

      const novoSaldo = await prisma.saldoBancario.create({
        data: {
          contaBancariaId,
          saldo,
          data: new Date(data),
          createdAt: new Date(),
        },
      });

      res.status(201).json(novoSaldo);
    } catch (error) {
      console.error('Erro ao cadastrar saldo da conta bancária:', error);
      res.status(500).json({ error: 'Erro ao cadastrar o saldo da conta bancária' });
    }
  }
}
