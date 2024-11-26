import { StatusCodes } from 'http-status-codes';
import { prisma } from '../../../../prisma/client';
import PDFDocument, { moveDown } from 'pdfkit';

export default class AlergiaService {
  async index() {
    const alergias = await prisma.alergia.findMany({
      include: {
        tipoAlergia: {
          select: {
            descricao: true,
          },
        },
      },
    });

    return this.criarRetorno(true, alergias);
  }

  async getById(id: number) {
    const alergia = await prisma.alergia.findUnique({
      where: {
        id: id,
      },
      include: {
        tipoAlergia: true,
      },
    });

    if (!alergia) {
      return this.criarRetorno(false, StatusCodes.NOT_FOUND);
    }

    return this.criarRetorno(true, alergia);
  }

  async getByDescricao(descricao: string) {
    const alergia = await prisma.alergia.findFirst({
      where: {
        descricao: {
          equals: descricao,
        },
      },
      include: {
        tipoAlergia: true,
      },
    });

    if (!alergia) {
      return this.criarRetorno(false, StatusCodes.NOT_FOUND);
    }

    return this.criarRetorno(true, alergia);
  }

  async create(descricao: string, tipo: number) {
    const alergiaExist = await prisma.alergia.findFirst({
      where: {
        descricao,
      },
    });

    if (alergiaExist) return this.criarRetorno(false, StatusCodes.CONFLICT);

    const tipoAlergiaExist = await prisma.tipoAlergia.findUnique({
      where: {
        id: tipo,
      },
    });

    if (!tipoAlergiaExist) return this.criarRetorno(false, StatusCodes.BAD_REQUEST);

    const novaAlergia = await prisma.alergia.create({
      data: {
        descricao,
        tipoAlergiaId: tipo,
      },

      include: {
        tipoAlergia: {
          select: {
            descricao: true,
          },
        },
      },
    });

    return this.criarRetorno(true, novaAlergia);
  }

  async update(id: number, descricao: string) {
    const alergiaExist = await prisma.alergia.findFirst({
      where: {
        id: +id,
      },
    });

    if (!alergiaExist) return this.criarRetorno(false, StatusCodes.NOT_FOUND);

    const alergiaDescricaoExist = await prisma.alergia.findFirst({
      where: {
        descricao: {
          equals: descricao,
        },
      },
    });

    if (alergiaDescricaoExist) return this.criarRetorno(false, StatusCodes.CONFLICT);

    const alergiaAtualizada = await prisma.alergia.update({
      where: {
        id: +id,
      },
      data: {
        descricao,
      },
    });

    return this.criarRetorno(true, alergiaAtualizada);
  }

  async delete(id: number) {
    const alergiaExist = await prisma.alergia.findFirst({
      where: {
        id: id,
      },
      include: {
        AlunoAlergia: true,
      },
    });

    if (!alergiaExist) return this.criarRetorno(false, StatusCodes.NOT_FOUND);

    if (alergiaExist.AlunoAlergia.length > 0) return this.criarRetorno(false, StatusCodes.BAD_REQUEST);

    await prisma.alergia.delete({
      where: {
        id: alergiaExist.id,
      },
    });

    return this.criarRetorno(true, StatusCodes.OK);
  }

  private criarRetorno(ok: boolean, data: any) {
    return {
      ok: ok,
      data: data,
    };
  }

  buildPDF(dataCallback: any, endCallback: any, alunos: any[], alergias: any[]) {
    const doc = new PDFDocument({ size: 'A4', margin: 50 }); // Define o tamanho A4 e margens

    doc.on('data', dataCallback);
    doc.on('end', endCallback);

    const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;

    // Adiciona a logo no topo da página
    const logoPath = 'src/assets/logo.png'; // Substitua pelo caminho real da logo
    const logoWidth = 50; // Largura desejada para a logo
    const logoHeight = 40; // Altura desejada para a logo
    doc.image(logoPath, 50, 20, { width: logoWidth, height: logoHeight });

    doc.fontSize(20).text('Relatório de Alergias', {
      align: 'center',
      underline: true,
    });

    doc.moveDown(1);

    doc.fontSize(14).text('Alergias', { underline: true });
    doc.moveDown(1);

    alergias.forEach((alergia) => {
      const count = alergia.alunos.length; // Contagem de alunos para cada alergia
      const text = `${alergia.nome} (${count})`;

      const padding = pageWidth - doc.widthOfString(text) - 50;

      doc
        .text(alergia.nome, {
          continued: true,
        })
        .text(`(${count})`, padding);
      doc.moveDown(0.5);
    });

    doc.moveDown(2);

    // Linha de separação
    doc
      .moveTo(50, doc.y)
      .lineTo(pageWidth + 50, doc.y)
      .stroke();

    doc.moveDown(2);

    alergias.forEach((alergia) => {
      const count = alergia.alunos.length;

      // Título de cada alergia com a contagem de alunos
      doc.fontSize(14).text(`${alergia.nome} (${count})`, {
        underline: true,
      });

      doc.moveDown(1);

      // Listar os alunos que têm essa alergia
      alergia.alunos.forEach((ra: any) => {
        const aluno = alunos.find((aluno) => aluno.ra === ra);
        if (aluno) {
          if(aluno.escolaNome){
            doc.fontSize(12).text(
              `RA ${aluno.ra.padEnd(25, ' ')} ${aluno.nome.padEnd(25, ' ')} ${aluno.turmaDescricao.padEnd(10, ' ')} ${aluno.escolaNome}`,
              { align: 'left' }
            );
          }else{
            doc.fontSize(12).text(
              `RA ${aluno.ra.padEnd(25, ' ')} ${aluno.nome.padEnd(25, ' ')} ${aluno.turmaDescricao}`,
              { align: 'left' }
            );
          }
        }
      });

      doc.moveDown(2);
    });

    doc.end();
  }

  async getAlergiasByAlunoId(alunoId: number) {
    const alergias = await prisma.alunoAlergia.findMany({
      where: {
        alunoId: alunoId,
      },
      include: {
        Alergia: true,
      },
    });

    if (!alergias || alergias.length === 0) {
      return this.criarRetorno(true, []); // Retorna OK com lista vazia
    }

    console.log(alergias);
    return this.criarRetorno(true, alergias); // Retorna OK com alergias
  }
}
