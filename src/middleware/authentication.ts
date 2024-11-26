// src/middleware/authentication.ts
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';

const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET || 'default_secret';

interface CustomRequest extends Request {
  user?: any;
}

export class AuthenticationService {
  public authenticate(req: CustomRequest, res: Response, next: NextFunction) {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token não fornecido' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(StatusCodes.FORBIDDEN).json({ message: 'Token inválido' });
      }

      req.user = user;
      next();
    });
  }

  // // Bypass para testar mais rapidamente
  // public authenticate(req: CustomRequest, res: Response, next: NextFunction) {
  //   console.log('Authenticate funciona, depois descomentar o original');
  //   next();
  // }
}
