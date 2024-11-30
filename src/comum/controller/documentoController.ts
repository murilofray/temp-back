import { Request, Response } from 'express';
import DocumentoService from '../services/documentoService';
import { DocumentoScan } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import path from 'path';
import fs from 'fs';

const docService = new DocumentoService();

export default class DocumentoController {
  async index(req: Request, res: Response) {
    const resposta = await docService.index(false);

    if (resposta.ok) return res.json(resposta.data);
    else return res.status(500).json({ message: 'Erro interno do servidor.' });
  }

  async getAtaDocumentosScan(req: Request, res: Response) {
    const resposta = await docService.getAtaDocumentosScan();

    if (resposta.ok) {
      return res.json(resposta.data);
    } else {
      return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  }

  async indexComDeletados(req: Request, res: Response) {
    const resposta = await docService.index(true);

    if (resposta.ok) return res.json(resposta.data);
    else return res.status(500).json({ message: 'Erro interno do servidor.' });
  }

  async deletados(req: Request, res: Response) {
    const resposta = await docService.indexDeletados();

    if (resposta.ok) return res.json(resposta.data);
    else return res.json(500).json({ message: 'Erro interno do servidor.' });
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;

    const resposta = await docService.findById(+id);

    if (resposta.ok) return res.json(resposta.data);
    return res.status(404).json({ message: 'Documento não encontrado.' });
  }

  async recover(req: Request, res: Response) {
    const { id } = req.params;

    const resposta = await docService.recovery(+id);

    if (resposta.ok) return res.json(resposta.data);
    else return res.json({ message: 'Documento não existe ou não foi deletado.' });
  }

  async create(req: Request, res: Response) {
    const pdf = req.file;
    const { tipoDocumentoId, caminho, descricao } = req.body;
    if (!pdf) return res.status(400).json({ message: 'Documento não recebido ou arquivo incompatível.' });

    const documento = {
      tipoDocumentoId: +tipoDocumentoId,
      createdAt: new Date(),
      descricao: descricao,
      caminho: caminho + pdf.filename,
      updatedAt: null,
      deletedAt: null,
    };
    const resposta = await docService.create(documento);

    if (resposta.ok) return res.json(resposta.data);
    else return res.status(500).json({ message: 'Documento não armazenado. Tente novamente.' });
  }

  async updateAta(req: Request, res: Response) {
    try {
      const { id } = req.params; // ID do documento a ser atualizado
      const pdf = req.file; // Arquivo enviado no upload
  
      // Verifica se o ID foi fornecido
      if (!id) {
        return res.status(400).json({ message: 'ID do documento não fornecido.' });
      }
  
      // Verifica se o documento existe
      const documentoExiste = await docService.findById(+id);
      if (!documentoExiste.ok) {
        return res.status(404).json({ message: 'Documento não encontrado.' });
      }
  
      // Prepara os dados para atualização
      const documentoAtualizado = {
        caminho: pdf ? `atas/${pdf.filename}` : undefined, // Atualiza o caminho se o arquivo for enviado
      };
  
      // Chama o serviço de atualização
      const resposta = await docService.updateAta(+id, documentoAtualizado);
  
      if (resposta.ok) {
        return res.json(resposta.data);
      } else {
        return res.status(500).json({ message: 'Erro ao atualizar o documento. Tente novamente.' });
      }
    } catch (error) {
      console.error('Erro no controlador update:', error);
      return res.status(500).json({ message: 'Erro interno no servidor.' });
    }
  }
  

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const pdf = req.file;

    if (!pdf) return res.status(400).json({ message: 'Documento não recebido ou arquivo incompatível.' });

    const resposta = await docService.update(+id, pdf);

    if (resposta.ok) {
      return res.json(resposta.data);
    } else {
      switch (resposta.data) {
        case StatusCodes.NOT_FOUND:
          return res.status(404).json({ message: 'Documento não encontrado.' });
        case StatusCodes.INTERNAL_SERVER_ERROR:
          return res.status(500).json({ message: 'Erro ao remover o arquivo anterior.' });
        default:
          return res.status(500).json({ message: 'Erro interno do servidor.' });
      }
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const resposta = await docService.delete(+id);

    if (resposta.ok) return res.json({ message: 'Documento deletado com sucesso.' });

    switch (resposta.data) {
      case StatusCodes.CONFLICT:
        return res.status(409).json({ message: 'O documento não pode ser removido pois está sendo utilizado.' });
      case StatusCodes.NOT_FOUND:
        return res.status(404).json({ message: 'Documento não encontrado.' });
      default:
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  }

  async downloadDoc(req: Request, res: Response) {
    const docPath = req.query.docPath;

    const filePath = path.resolve(__dirname, '..', '..', '..', 'uploads', docPath?.toString() ?? '');

    console.log(filePath);

    fs.stat(filePath, (err: any) => {
      if (err) {
        console.error('Erro ao acessar o arquivo:', err);
        return res.status(404).send('Documento não encontrado.');
      }

      console.log('Arquivo encontrado. Enviando...');

      // Envia o arquivo PDF
      res.sendFile(filePath, (err) => {
        if (err) {
          console.error('Erro ao enviar o arquivo:', err);
          res.status(500).send('Erro ao enviar o arquivo.');
        } else {
          console.log('Arquivo enviado com sucesso.');
        }
      });
    });
  }

  async getDocumentosByAlunoId(req: Request, res: Response) {
    const { id } = req.params; // Obtém o ID do aluno dos parâmetros da requisição
    const resposta = await docService.getDocumentosByAlunoId(Number(id)); // Chama o método no serviço

    if (resposta?.ok) {
      return res.status(StatusCodes.OK).send(resposta.data); // Retorna os documentos com status 200
    } else {
      return res.status(StatusCodes.OK).send([]); // Retorna uma lista vazia com status 200
    }
  }

  async getLastDocumentoTipo20(req: Request, res: Response) {
    try {
      const documento = await docService.findLastDocumentoTipo20();
  
      if (documento) {
        return res.status(StatusCodes.OK).json(documento);
      } else {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'Nenhum documento encontrado para o tipo especificado.' });
      }
    } catch (error) {
      console.error('Erro ao buscar o último documento:', error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Erro interno do servidor.' });
    }
  }
  
}
