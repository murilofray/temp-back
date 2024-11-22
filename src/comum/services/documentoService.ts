import { DocumentoScan } from '@prisma/client';
import { prisma } from '../../../prisma/client';
import { ErrorHandler } from '../../handler/prismaErrorHandler';
import { StatusCodes } from 'http-status-codes';
import fs from 'fs';

export default class DocumentoService {
  async index(comDeletados: boolean) {
    var docs: DocumentoScan[] = [];

    if (comDeletados) docs = await prisma.documentoScan.findMany();
    else
      docs = await prisma.documentoScan.findMany({
        where: {
          deletedAt: null,
        },
      });

    return { ok: true, data: docs };
  }

  async getAtaDocumentosScan() {
    try {
      const documentos = await prisma.documentoScan.findMany({
        where: {
          Ata: {
            some: {}, // Filtra apenas documentos que possuem relação com `Ata`
          },
          deletedAt: null, // Exclui documentos que estão deletados
        },
        include: {
          TipoDocumento: true, // Inclui detalhes do tipo de documento, se necessário
        },
      });
      return { ok: true, data: documentos };
    } catch (error) {
      return { ok: false, data: 'Erro ao buscar documentos relacionados a atas' };
    }
  }

  async indexDeletados() {
    const docs = await prisma.documentoScan.findMany({
      where: {
        deletedAt: {
          not: null,
        },
      },
    });

    return { ok: true, data: docs };
  }

  async findById(id: number) {
    const documento = await prisma.documentoScan.findUnique({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!documento) return { ok: false, data: StatusCodes.NOT_FOUND };

    return { ok: true, data: documento };
  }

  async create(doc: Omit<DocumentoScan, 'id'>) {
    try {
      const novoDoc = await prisma.documentoScan.create({
        data: {
          caminho: doc.caminho,
          createdAt: doc.createdAt,
          descricao: doc.descricao,
          tipoDocumentoId: +doc.tipoDocumentoId,
        },
      });

      return {
        ok: true,
        data: novoDoc,
      };
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }

  async update(id: number, pdf: Express.Multer.File) {
    const documentoExiste = await prisma.documentoScan.findUnique({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!documentoExiste) {
      this.removerDocumento(pdf.filename);
      return { ok: false, data: StatusCodes.NOT_FOUND };
    }

    const documentoRemovido = this.removerDocumento(pdf.filename);

    if (!documentoRemovido) return { ok: false, data: StatusCodes.INTERNAL_SERVER_ERROR };

    const novoDoc = await prisma.documentoScan.update({
      where: {
        id: +id,
      },
      data: {
        caminho: pdf.filename,
        updatedAt: new Date(),
      },
    });

    return { ok: true, data: novoDoc };
  }

  async delete(id: number) {
    const documentoExiste = await prisma.documentoScan.findUnique({
      where: {
        id,
      },
      include: {
        AlunoDocumentos: true,
        Ata: true,
        MovimentacaoFinanceira: true,
        NotaFiscal: true,
        Ocorrencia: true,
        OficioMemorando: true,
        PesquisaPrecoA:true,
        PesquisaPrecoB:true,
        PesquisaPrecoC: true,
        TermoDoacao: true,
        Titulo: true,
      },
    });

    if (!documentoExiste) return { ok: false, data: StatusCodes.NOT_FOUND };

    if (
      documentoExiste.AlunoDocumentos.length > 0 ||
      documentoExiste.Ata.length > 0 ||
      documentoExiste.MovimentacaoFinanceira.length > 0 ||
      documentoExiste.NotaFiscal.length > 0 ||
      documentoExiste.Ocorrencia.length > 0 ||
      documentoExiste.OficioMemorando.length > 0 ||
      documentoExiste.PesquisaPrecoA.length > 0 ||
      documentoExiste.PesquisaPrecoB.length > 0 ||
      documentoExiste.PesquisaPrecoC.length > 0 ||
      documentoExiste.TermoDoacao.length > 0 ||
      documentoExiste.Titulo.length > 0
    ) {
      return { ok: false, data: StatusCodes.CONFLICT };
    }

    await prisma.documentoScan.update({
      where: {
        id: +id,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    return { ok: true, data: StatusCodes.OK };
  }

  async recovery(id: number) {
    const documentoExiste = await prisma.documentoScan.findUnique({
      where: {
        id,
        deletedAt: {
          not: null,
        },
      },
    });

    if (!documentoExiste) return { ok: false, data: StatusCodes.NOT_FOUND };

    const docRecuperado = await prisma.documentoScan.update({
      where: {
        id,
      },
      data: {
        deletedAt: null,
      },
    });

    return { ok: true, data: docRecuperado };
  }

  private removerDocumento(caminho: string) {
    fs.unlink('./uploads/' + caminho, (err) => {
      if (err) {
        console.log(err);
        return false;
      }
    });
    return true;
  }

  async getDocumentosByAlunoId(alunoId: number) {
    try {
      // Busca os documentos associados ao aluno
      const documentos = await prisma.alunoDocumento.findMany({
        where: {
          alunoId: alunoId,
        },
        include: {
          DocumentosScan: true,
        },
      });

      // Se não encontrar documentos, retornar NOT_FOUND
      if (!documentos.length) {
        return { ok: false, data: StatusCodes.NOT_FOUND };
      }

      return { ok: true, data: documentos }; // Retorna os documentos encontrados
    } catch (error) {
      return ErrorHandler.handleError(error);
    }
  }
}
