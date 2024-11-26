import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import {
  createServidorService,
  getServidoresService,
  getServidorByIdService,
  updateServidorService,
  deleteServidorService,
  getServidoresByEscolaService,
  validarSenhaAtualService,
  updateServidorSenhaService,
  getServidoresByNivelAcessoService,
  getServidoresByNivelAcessoAndEscolaService,
  getServidoresByNivelAcessosService
} from '../services/servidorService';
import { Prisma } from '@prisma/client';

const SALT_ROUNDS = 10;

export const createServidor = async (req: Request, res: Response) => {
  try {
    const { senha, senhaSED } = req.body;

    if (senha) {
      req.body.senha = await bcrypt.hash(senha, SALT_ROUNDS);
    }
    if (senhaSED) {
      req.body.senhaSED = await bcrypt.hash(senhaSED, SALT_ROUNDS);
    }

    const servidor = await createServidorService(req.body);
    res.status(201).json(servidor);
  } catch (error) {

    console.error(error);

    // Verifica se o erro é de unicidade no Prisma
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002' // Código de erro de violação de unicidade
    ) {
      const target = error.meta?.target || 'campo único';
      return res
        .status(409)
        .json({ error: `Já existe um servidor cadastrado com o mesmo ${target}.` });
    }

    console.error(error);
    res.status(500).json({ error: 'Erro ao criar o servidor' });
  }
};

export const getServidores = async (req: Request, res: Response) => {
  try {
    console.log('Puxando servidores');
    const servidores = await getServidoresService();
    res.status(200).json(servidores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter os servidores' });
  }
};

export const getServidorById = async (req: Request, res: Response) => {
  try {
    const servidor = await getServidorByIdService(Number(req.params.id));
    if (!servidor) {
      return res.status(404).json({ error: 'Servidor não encontrado' });
    }
    res.status(200).json(servidor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter o servidor' });
  }
};

export const getServidoresByEscola = async (req: Request, res: Response) => {
  try {
    const servidores = await getServidoresByEscolaService(Number(req.params.escolaId));
    if (!servidores) {
      return res.status(404).json({ error: 'Nenhum servidor não encontrado' });
    }
    res.status(200).json(servidores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter o servidor' });
  }
};

export const getServidoresByNivelAcessoId = async (req: Request, res: Response) => {
  try {
    const servidores = await getServidoresByNivelAcessoService(Number(req.params.nivelAcessoId));
    if (!servidores) {
      return res.status(404).json({ error: 'Nenhum servidor não encontrado' });
    }
    res.status(200).json(servidores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter o servidor' });
  }
};

export const getServidoresByNivelAcessoAndEscola = async (req: Request, res: Response) => {
  try {
    const servidores = await getServidoresByNivelAcessoAndEscolaService(Number(req.params.nivelAcessoId), Number(req.params.escolaId));
    if (!servidores) {
      return res.status(404).json({ error: 'Nenhum servidor não encontrado' });
    }
    res.status(200).json(servidores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter o servidor' });
  }
};

export const updateServidor = async (req: Request, res: Response) => {
  try {
    const servidorAtualizado = await updateServidorService(Number(req.params.id), req.body);
    res.status(200).json(servidorAtualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar o servidor' });
  }
};

export const deleteServidor = async (req: Request, res: Response) => {
  try {
    await deleteServidorService(Number(req.params.id));
    res.status(200).json({ message: 'Servidor excluído logicamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir o servidor' });
  }
};

export const redefinirSenha = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { senhaAtual, novaSenha } = req.body;

    if (!senhaAtual || !novaSenha) {
      return res
        .status(400)
        .json({ error: 'A senha atual e a nova senha são obrigatórias' });
    }

    // Validar senha atual
    try {
      await validarSenhaAtualService(Number(id), senhaAtual);
    } catch (error) {
      return res.status(401).json({ error: 'Senha atual incorreta' });
    }

    // Atualizar para a nova senha
    await updateServidorSenhaService(Number(id), novaSenha);
    res.status(200).json({ message: 'Senha atualizada com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao redefinir a senha' });
  }
};

export const getServidoresByNivelAcesso = async (req: Request, res: Response) => {
  try {
    console.log('Puxando servidores por nível de acesso');
    // Pega os níveis de acesso passados na query, separados por vírgula
    const niveis = req.query.niveis ? (req.query.niveis as string).split(',') : [];

    if (niveis.length === 0) {
      return res.status(400).json({ error: 'Nenhum nível de acesso especificado' });
    }
    console.log("NIVEIS: ", niveis);

    // Chama o serviço para obter servidores por nível de acesso
    const servidores = await getServidoresByNivelAcessosService(niveis);
    res.status(200).json(servidores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter os servidores por nível de acesso' });
  }
};

// export const redefinirSenha = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const { senhaAtual, novaSenha } = req.body;

//     if (!senhaAtual || !novaSenha) {
//       return res
//         .status(400)
//         .json({ error: 'A senha atual e a nova senha são obrigatórias' });
//     }

//     // Validar senha atual
//     try {
//       await validarSenhaAtualService(Number(id), senhaAtual);
//     } catch (error) {
//       return res.status(401).json({ error: 'Senha atual incorreta' });
//     }

//     // Atualizar para a nova senha
//     await updateServidorSenhaService(Number(id), novaSenha);
//     res.status(200).json({ message: 'Senha atualizada com sucesso' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Erro ao redefinir a senha' });
//   }
// };

// export const getServidoresByNivelAcesso = async (req: Request, res: Response) => {
//   try {
//     console.log('Puxando servidores por nível de acesso');
//     // Pega os níveis de acesso passados na query, separados por vírgula
//     const niveis = req.query.niveis ? (req.query.niveis as string).split(',') : [];

//     if (niveis.length === 0) {
//       return res.status(400).json({ error: 'Nenhum nível de acesso especificado' });
//     }
//     console.log("NIVEIS: ", niveis);

//     // Chama o serviço para obter servidores por nível de acesso
//     const servidores = await getServidoresByNivelAcessoService(niveis);
//     res.status(200).json(servidores);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Erro ao obter os servidores por nível de acesso' });
//   }
// };
