import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export class SaldoPddeController {
  async cadastrarSaldoPDDE(req: Request, res: Response) {
    try {
      const { saldoPDDEId, valor, custeio, capital } = req.body;

      // Validação dos campos obrigatórios
      if (!saldoPDDEId || valor === undefined || custeio === undefined || capital === undefined) {
        res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        return;
      }

      // Inserir um novo registro na tabela SaldoPDDE
      const novoSaldoPDDE = await prisma.saldoPDDE.create({
        data: {
          saldoPDDEId,
          valor,
          custeio,
          capital,
          custeioValor: (valor * custeio) / 100,
          capitalValor: (valor * capital) / 100,
          createdAt: new Date(),
          updatedAt: null,
          deletedAt: null,
        },
      });

      res.status(201).json(novoSaldoPDDE);
    } catch (error) {
      console.error('Erro ao cadastrar SaldoPDDE:', error);
      res.status(500).json({ error: 'Erro ao cadastrar o SaldoPDDE' });
    }
  }
}
