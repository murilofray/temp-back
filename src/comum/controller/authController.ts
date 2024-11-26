import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { StatusCodes } from 'http-status-codes';
import { ErrorHandler } from '../../handler/prismaErrorHandler';

const authService = new AuthService();

export class AuthController {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const result = await authService.login(email, password);

      if (!result.ok) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'E-mail ou senha inválidos' });
      }

      return res.status(StatusCodes.OK).json({
        ok: true,
        data: {
          token: result.data,
        },
      });
    } catch (error) {
      const handledError = ErrorHandler.handleError(error);
      return res.status(handledError.data).json({ error: handledError.error });
    }
  }

  async verifyToken(req: Request, res: Response) {
    try {
      const token = req.body.token;

      const result = authService.verifyToken(token);

      if (!result.ok) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: result.message });
      }

      return res.status(StatusCodes.OK).json({
        ok: true,
        data: result.data,
      });
    } catch (error) {
      const handledError = ErrorHandler.handleError(error);
      return res.status(handledError.data).json({ error: handledError.error });
    }
  }
}
