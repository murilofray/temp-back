import { Prisma } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';

/**
 * Uma classe para lidar com erros e fornecer respostas apropriadas.
 */
export class ErrorHandler {
  /**
   * Lida com erros e retorna um objeto de resposta padronizado.
   *
   * @param error - O erro a ser tratado.
   * @returns Um objeto contendo o status de resposta, código de erro e mensagem de erro.
   */
  static handleError(error: unknown) {
    // Para depuração
    console.error(error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        ok: false,
        data: StatusCodes.INTERNAL_SERVER_ERROR,
        error: {
          code: error.code,
          meta: error.meta,
        },
      };
    }

    // Para outros tipos de erro
    return {
      ok: false,
      data: StatusCodes.INTERNAL_SERVER_ERROR,
      error: { message: 'Erro desconhecido' },
    };
  }
}