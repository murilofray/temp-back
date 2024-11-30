import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { FornecedorService } from '../services/fornecedorService';

const fornecedorService = new FornecedorService();

export class FornecedorController {
  async create(req: Request, res: Response) {
    const resposta = await fornecedorService.create(req.body);
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send({ resposta });
    }
  }

  async update(req: Request, res: Response) {
    const resposta = await fornecedorService.update(req.body, Number(req.params.id));
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send({ resposta });
    }
  }

  /**
   * Atualiza um fornecedor existente ou cria um novo caso o ID não seja fornecido.
   *
   * @remarks
   * Essa função lida com a solicitação HTTP PUT para atualizar ou criar um fornecedor.
   * Extrai o ID dos parâmetros de solicitação e os dados do fornecedor do corpo da solicitação.
   * Em seguida, chama o método `updateOrCreate` do `FornecedorService` com os dados fornecidos.
   *
   * @param req - O objeto de solicitação Express contendo os parâmetros de solicitação e o corpo.
   * @param res - O objeto de resposta Express para enviar a resposta HTTP.
   *
   * @returns
   * - Se a operação for bem-sucedida, ele enviará uma resposta HTTP OK com os dados do fornecedor atualizados ou criados.
   * - Se a operação falhar, ele enviará uma resposta HTTP BAD_REQUEST com os detalhes do erro.
   */
  async updateOrCreate(req: Request, res: Response) {
    const id = req.params.id ? Number(req.params.id) : null;
    const resposta = await fornecedorService.updateOrCreate(req.body, id);
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).send({ resposta });
    }
  }

  async delete(req: Request, res: Response) {
    const resposta = await fornecedorService.delete(Number(req.params.id));
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.NOT_FOUND).send({ resposta });
    }
  }

  async getById(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (isNaN(id) || id <= 0) {
      return res.status(StatusCodes.BAD_REQUEST).send({ message: 'ID inválido' });
    }
    const resposta = await fornecedorService.findById(id);
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.NOT_FOUND).send({ resposta });
    }
  }

  async getByPesquisa(req: Request, res: Response) {
    const resposta = await fornecedorService.findByPesquisa(Number(req.params.idPesquisa));
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta);
    } else {
      return res.status(StatusCodes.NOT_FOUND).send({ resposta });
    }
  }

  async getByCNPJ(req: Request, res: Response) {
    const resposta = await fornecedorService.findByCNPJ(req.params.cnpj);
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.NOT_FOUND).send({ resposta });
    }
  }

  async getByCPF(req: Request, res: Response) {
    const resposta = await fornecedorService.findByCPF(req.params.cpf);
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.NOT_FOUND).send({ resposta });
    }
  }

  async getAll(req: Request, res: Response) {
    const resposta = await fornecedorService.findAll();
    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data);
    } else {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ resposta });
    }
  }
}
