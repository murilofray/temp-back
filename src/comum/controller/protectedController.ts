import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class ProtectedController {
  getProtectedData(req: Request, res: Response) {
    const user = (req as any).user;

    return res.status(StatusCodes.OK).json({
      message: 'Dados protegidos acessados com sucesso!',
      user,
    });
  }
}
