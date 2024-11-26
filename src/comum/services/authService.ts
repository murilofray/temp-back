import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ErrorHandler } from '../../handler/prismaErrorHandler';
import dotenv from 'dotenv';
import { StatusCodes } from 'http-status-codes';

dotenv.config();

const prisma = new PrismaClient();
const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET || 'default_secret';

export class AuthService {
  async login(email: string, senha: string) {
    try {
      const servidor = await prisma.servidor.findFirst({
        where: { email },
        include: {
          NivelAcessoServidor: {
            include: {
              Acesso: true,
            },
          },
        },
      });

      if (!servidor) {
        return { ok: false, data: StatusCodes.UNAUTHORIZED };
      }

      // Para teste até ter o cadastro de servidor
      // const isPasswordValid = senha == servidor.senha;
      // if (!isPasswordValid) {
      //   return { ok: false, data: StatusCodes.UNAUTHORIZED };
      // }

      // Certo!
      const isPasswordValid = await bcrypt.compare(senha, servidor.senha as string);
      if (!isPasswordValid) {
        // throw new Error('E-mail ou senha inválidos');
        return { ok: false, data: StatusCodes.UNAUTHORIZED };
      }

      // Exclui a senha do objeto para não retornar a senha no token
      servidor.senha = null;

      const token = jwt.sign(
        {
          id: servidor.id,
          escolaId: servidor.escolaId,
          nome: servidor.nome,
          nivelAcesso: servidor.NivelAcessoServidor.map((nivel: any) => nivel.Acesso.descricao),
          servidor: servidor,
        },
        JWT_SECRET,
        { expiresIn: '100000h' },
      );

      return { ok: true, data: token };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  verifyToken(token: string) {
    try {
      const responseToken = jwt.verify(token, JWT_SECRET);
      return { ok: true, data: responseToken };
    } catch (error) {
      return { ok: false, message: 'Token inválido' };
    }
  }
}
