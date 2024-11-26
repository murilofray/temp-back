import PDFDocument from 'pdfkit';

interface DistribuicaoBairros {
  bairro: string;
  quantidade: number;
  percentual: string;
}

interface DistribuicaoRacial {
  raca: string;
  quantidade: number;
  percentual: string;
}

interface DistribuicaoBairrosPorTurma {
  turma: string;
  distribuicaoBairros: { [key: string]: number };
}

interface DistribuicaoPorTurma {
  turma: string;
  distribuicaoRacial: { [key: string]: number };
}

export default class RelatorioService {

  buildPDFBeneficiarios(dataCallback: any, endCallback: any, alunos: any[]) {
    const doc = new PDFDocument({ size: 'A4', margin: 50 }); // Define o tamanho A4 e margens

    doc.on('data', dataCallback);
    doc.on('end', endCallback);

    const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;

    // logo no topo da página
    const logoPath = 'src/assets/logo.png';
    const logoWidth = 50; // Largura para a logo
    const logoHeight = 40; // Altura para a logo
    doc.image(logoPath, 50, 20, { width: logoWidth, height: logoHeight });

    // Título do relatório
    doc.fontSize(20).text('Relatório de Beneficiários do Bolsa Família', {
      align: 'center',
      underline: true,
    });

    doc.moveDown(2);

    // Cabeçalho da tabela
    const startX = 50; // Margem inicial
    const columnWidths = [150, 250, 50];
    let currentY = doc.y;

    doc.fontSize(14).text(`Total: ${alunos.length}`, startX, currentY);

    currentY += 30;

    doc.fontSize(14)
      .text('RA', startX, currentY)
      .text('Nome', startX + columnWidths[0], currentY)
      .text('Turma', startX + columnWidths[0] + columnWidths[1], currentY);

    // Linha de separação do cabeçalho
    doc
      .moveTo(50, doc.y + 5)
      .lineTo(pageWidth + 50, doc.y + 5)
      .stroke();

    doc.moveDown(1);

    currentY += 30;

    // Listagem dos alunos
    alunos.forEach((aluno) => {
      const turma = aluno.turma || 'Sem turma';

      doc.fontSize(12)
        .text(aluno.ra, startX, currentY)
        .text(aluno.nome, startX + columnWidths[0], currentY)
        .text(turma, startX + columnWidths[0] + columnWidths[1], currentY);

      currentY += 20;
    });

    // Linha de separação
    doc
      .moveTo(50, doc.y + 5)
      .lineTo(pageWidth + 50, doc.y + 5)
      .stroke();

    doc.moveDown(1);

    doc.end();
  }

  buildPDFMeninosEMeninas(dataCallback: any, endCallback: any, meninas: any[], meninos: any[]) {
    const doc = new PDFDocument({ size: 'A4', margin: 50 }); // Define o tamanho A4 e margens

    doc.on('data', dataCallback);
    doc.on('end', endCallback);

    const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;

    // Logo no topo da página
    const logoPath = 'src/assets/logo.png';
    const logoWidth = 50; // Largura para a logo
    const logoHeight = 40; // Altura para a logo
    doc.image(logoPath, 50, 20, { width: logoWidth, height: logoHeight });

    // Título do relatório
    doc.fontSize(20).text('Relatório de Meninos e Meninas', {
      align: 'center',
      underline: true,
    });

    doc.moveDown(1);

    // Cabeçalho da tabela
    const startX = 50; // Margem inicial
    const columnWidths = [150, 250, 50];
    let currentY = doc.y;

    // Totais
    doc.fontSize(14).text(`Total de meninas: ${meninas.length}`, startX, currentY);
    currentY += 20;
    doc.fontSize(14).text(`Total de meninos: ${meninos.length}`, startX, currentY);
    currentY += 20;
    doc.fontSize(14).text(`Total de alunos: ${meninos.length + meninas.length}`, startX, currentY);

    currentY += 35;

    // Título "Meninas"
    doc.font('Helvetica-Bold')
      .fontSize(14)
      .text('Meninas', 50, currentY);

    doc.moveDown(1);

    currentY += 30;

    doc.font('Helvetica')
      .fontSize(14)
      .text('RA', startX, currentY)
      .text('Nome', startX + columnWidths[0], currentY)
      .text('Turma', startX + columnWidths[0] + columnWidths[1], currentY);

    // Linha de separação do cabeçalho
    doc
      .moveTo(50, doc.y + 5)
      .lineTo(pageWidth + 50, doc.y + 5)
      .stroke();

    doc.moveDown(1);

    currentY += 30;

    // Listagem das meninas
    meninas.forEach((aluno) => {
      const turma = aluno.turma || 'Sem turma';

      doc.fontSize(12)
        .text(aluno.ra, startX, currentY)
        .text(aluno.nome, startX + columnWidths[0], currentY)
        .text(turma, startX + columnWidths[0] + columnWidths[1], currentY);

      currentY += 20;
    });

    // Linha de separação após a lista de meninas
    doc
      .moveTo(50, currentY + 5)
      .lineTo(pageWidth + 50, currentY + 5)
      .stroke();

    doc.moveDown(5);

    // Título "Meninos"
    doc.font('Helvetica-Bold')
      .fontSize(14)
      .text('Meninos', 50, currentY + 20);

    currentY += 50;

    // Cabeçalho da tabela para os meninos
    doc.font('Helvetica')
      .fontSize(14)
      .text('RA', startX, currentY)
      .text('Nome', startX + columnWidths[0], currentY)
      .text('Turma', startX + columnWidths[0] + columnWidths[1], currentY);

    // Linha de separação do cabeçalho
    doc
      .moveTo(50, doc.y + 5)
      .lineTo(pageWidth + 50, doc.y + 5)
      .stroke();

    doc.moveDown(1);

    currentY += 30;

    // Listagem dos meninos
    meninos.forEach((aluno) => {
      const turma = aluno.turma || 'Sem turma';

      doc.fontSize(12)
        .text(aluno.ra, startX, currentY)
        .text(aluno.nome, startX + columnWidths[0], currentY)
        .text(turma, startX + columnWidths[0] + columnWidths[1], currentY);

      currentY += 20;
    });

    // Linha de separação
    doc
      .moveTo(50, currentY + 5)
      .lineTo(pageWidth + 50, currentY + 5)
      .stroke();

    currentY += 20;

    doc.end();
  }

  buildPDFBairros(dataCallback: any, endCallback: any, distribuicaoGeral: DistribuicaoBairros[], distribuicaoPorTurma: DistribuicaoBairrosPorTurma[]) {
    const doc = new PDFDocument({ size: 'A4', margin: 50 });

    doc.on('data', dataCallback);
    doc.on('end', endCallback);

    const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;
    const startX = 50;
    const columnWidths = [200, 100, 100];
    let currentY = doc.y;

    const logoPath = 'src/assets/logo.png';
    const logoWidth = 50;
    const logoHeight = 40;
    doc.image(logoPath, 50, 20, { width: logoWidth, height: logoHeight });

    doc.moveDown(2);

    doc.fontSize(20).text('Relatório de Distribuição por Bairro dos Alunos', {
      align: 'center',
      underline: true,
    });

    doc.moveDown(2);

    // Seção de Distribuição Geral
    doc.fontSize(16).text('Distribuição Geral por Bairro', { align: 'center' });
    doc.moveDown(1);

    // Cabeçalho da tabela de distribuição geral
    currentY = doc.y;
    doc.font('Helvetica').fontSize(14)
      .text('Bairro', startX, currentY, { width: columnWidths[0] })
      .text('Quantidade', startX + columnWidths[0], currentY, { width: columnWidths[1] })
      .text('Percentual', startX + columnWidths[0] + columnWidths[1], currentY, { width: columnWidths[2] });

    // Linha de separação do cabeçalho
    doc.moveTo(startX, doc.y + 5)
      .lineTo(pageWidth + startX, doc.y + 5)
      .stroke();

    doc.moveDown(1);

    // Listagem da distribuição geral por bairro
    distribuicaoGeral.forEach((item) => {
      currentY = doc.y;
      doc.fontSize(12)
        .text(item.bairro, startX, currentY, { width: columnWidths[0] })
        .text(item.quantidade.toString(), startX + columnWidths[0], currentY, { width: columnWidths[1] })
        .text(item.percentual, startX + columnWidths[0] + columnWidths[1], currentY, { width: columnWidths[2] });

      doc.moveDown(0.5);
    });

    doc.moveDown(2);

    // Seção de Distribuição por Turma
    currentY = doc.y;
    doc.fontSize(16).text('Distribuição por Turma', startX, currentY, { align: 'center' });
    doc.moveDown(1);

    distribuicaoPorTurma.forEach((turma) => {
      currentY = doc.y;
      doc.fontSize(14).text(`Turma: ${turma.turma}`, startX, currentY, { align: 'center' });
      doc.moveDown(0.5);

      currentY = doc.y;
      doc.font('Helvetica').fontSize(12)
        .text('Bairro', startX, currentY, { width: columnWidths[0] })
        .text('Quantidade', startX + columnWidths[0], currentY, { width: columnWidths[1] });

      doc.moveTo(startX, doc.y + 5)
        .lineTo(pageWidth + startX, doc.y + 5)
        .stroke();

      doc.moveDown(1);

      for (const [bairro, quantidade] of Object.entries(turma.distribuicaoBairros)) {
        currentY = doc.y;
        doc.fontSize(12)
          .text(bairro, startX, currentY, { width: columnWidths[0] })
          .text(quantidade.toString(), startX + columnWidths[0], currentY, { width: columnWidths[1] });

        doc.moveDown(0.5);
      }

      doc.moveDown(2);
    });

    doc.end();
  }

  buildRelatorioRacaPDF(dataCallback: any, endCallback: any, distribuicaoGeral: DistribuicaoRacial[], distribuicaoPorTurma: DistribuicaoPorTurma[]) {
    const doc = new PDFDocument({ size: 'A4', margin: 50 });

    doc.on('data', dataCallback);
    doc.on('end', endCallback);

    const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;
    const startX = 50;
    const columnWidths = [100, 100, 100];
    let currentY = doc.y;

    const logoPath = 'src/assets/logo.png';
    const logoWidth = 50;
    const logoHeight = 40;
    doc.image(logoPath, 50, 20, { width: logoWidth, height: logoHeight });

    doc.fontSize(20).text('Relatório de Distribuição Racial dos Alunos', {
      align: 'center',
      underline: true,
    });

    doc.moveDown(2);

    // Seção de Distribuição Geral
    doc.fontSize(16).text('Distribuição Geral por Raça', { align: 'center' });
    doc.moveDown(1);

    // Cabeçalho da tabela de distribuição geral
    currentY = doc.y;
    doc.font('Helvetica').fontSize(14)
      .text('Raça', startX, currentY, { width: columnWidths[0] })
      .text('Quantidade', startX + columnWidths[0], currentY, { width: columnWidths[1] })
      .text('Percentual', startX + columnWidths[0] + columnWidths[1], currentY, { width: columnWidths[2] });

    // Linha de separação do cabeçalho
    doc.moveTo(startX, doc.y + 5)
      .lineTo(pageWidth + startX, doc.y + 5)
      .stroke();

    doc.moveDown(1);

    // Listagem da distribuição geral por raça
    distribuicaoGeral.forEach((item) => {
      currentY = doc.y;
      doc.fontSize(12)
        .text(item.raca, startX, currentY, { width: columnWidths[0] })
        .text(item.quantidade.toString(), startX + columnWidths[0], currentY, { width: columnWidths[1] })
        .text(item.percentual, startX + columnWidths[0] + columnWidths[1], currentY, { width: columnWidths[2] });

      doc.moveDown(0.5);
    });

    doc.moveDown(2);

    // Seção de Distribuição por Turma
    currentY = doc.y;
    doc.fontSize(16).text('Distribuição por Turma', startX, currentY, { align: 'center' });
    doc.moveDown(1);

    distribuicaoPorTurma.forEach((turma) => {
      currentY = doc.y;
      doc.fontSize(14).text(`Turma: ${turma.turma}`, startX, currentY, { align: 'center' });
      doc.moveDown(0.5);

      currentY = doc.y;
      doc.font('Helvetica').fontSize(12)
        .text('Raça', startX, currentY, { width: columnWidths[0] })
        .text('Quantidade', startX + columnWidths[0], currentY, { width: columnWidths[1] });

      doc.moveTo(startX, doc.y + 5)
        .lineTo(pageWidth + startX, doc.y + 5)
        .stroke();

      doc.moveDown(1);

      for (const [raca, quantidade] of Object.entries(turma.distribuicaoRacial)) {
        currentY = doc.y;
        doc.fontSize(12)
          .text(raca, startX, currentY, { width: columnWidths[0] })
          .text(quantidade.toString(), startX + columnWidths[0], currentY, { width: columnWidths[1] });

        doc.moveDown(0.5);
      }

      doc.moveDown(2);
    });

    doc.end();
  }

  buildRelatorioRacaAdminPDF(
    dataCallback: any,
    endCallback: any,
    relatorioPorEscola: Array<{
      escola: string;
      distribuicaoGeral: { raca: string; quantidade: number; percentual: string }[];
      distribuicaoPorTurma: { turma: string; distribuicaoRacial: Record<string, number> }[];
    }>
  ) {
    const doc = new PDFDocument({ size: 'A4', margin: 50 });

    doc.on('data', dataCallback);
    doc.on('end', endCallback);

    const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;
    const startX = 50;
    const columnWidths = [100, 100, 100];

    // Adiciona o logo e título no topo
    const logoPath = 'src/assets/logo.png';
    const logoWidth = 50;
    const logoHeight = 40;
    doc.image(logoPath, startX, 20, { width: logoWidth, height: logoHeight });

    doc.fontSize(20).text('Relatório de Distribuição Racial por Escola', {
      align: 'center',
      underline: true,
    });

    doc.moveDown(2);

    relatorioPorEscola.forEach((escolaData, escolaIndex) => {
      if (escolaIndex > 0) doc.addPage(); // Nova página para cada escola

      // Nome da escola
      doc.fontSize(16).text(`Escola: ${escolaData.escola}`, { align: 'center' });
      doc.moveDown(2);

      // Distribuição Geral da Escola
      doc.fontSize(14).text('Distribuição Geral por Raça', { align: 'left' });
      doc.moveDown(1);

      // Cabeçalho da tabela de distribuição geral
      let currentY = doc.y;
      doc.font('Helvetica').fontSize(12)
        .text('Raça', startX, currentY, { width: columnWidths[0] })
        .text('Quantidade', startX + columnWidths[0], currentY, { width: columnWidths[1] })
        .text('Percentual', startX + columnWidths[0] + columnWidths[1], currentY, { width: columnWidths[2] });

      // Linha de separação do cabeçalho
      doc.moveTo(startX, doc.y + 5)
        .lineTo(pageWidth + startX, doc.y + 5)
        .stroke();

      doc.moveDown(1);

      // Listagem da distribuição geral
      escolaData.distribuicaoGeral.forEach((item) => {
        currentY = doc.y;
        doc.fontSize(12)
          .text(item.raca, startX, currentY, { width: columnWidths[0] })
          .text(item.quantidade.toString(), startX + columnWidths[0], currentY, { width: columnWidths[1] })
          .text(item.percentual, startX + columnWidths[0] + columnWidths[1], currentY, { width: columnWidths[2] });

        doc.moveDown(0.5);
      });

      doc.moveDown(2);

      // Distribuição por Turma
      escolaData.distribuicaoPorTurma.forEach((turma) => {
        currentY = doc.y;

        doc.fontSize(14).text(`Turma: ${turma.turma}`, startX, currentY);
        doc.moveDown(0.5);

        currentY = doc.y;
        doc.font('Helvetica').fontSize(12)
          .text('Raça', startX, currentY, { width: columnWidths[0] })
          .text('Quantidade', startX + columnWidths[0], currentY, { width: columnWidths[1] });

        doc.moveTo(startX, doc.y + 5)
          .lineTo(pageWidth + startX, doc.y + 5)
          .stroke();

        doc.moveDown(1);

        // Detalhes da turma
        for (const [raca, quantidade] of Object.entries(turma.distribuicaoRacial)) {
          currentY = doc.y;
          doc.fontSize(12)
            .text(raca, startX, currentY, { width: columnWidths[0] })
            .text(quantidade.toString(), startX + columnWidths[0], currentY, { width: columnWidths[1] });

          doc.moveDown(0.5);
        }

        doc.moveDown(2);
      });
    });

    doc.end();
  }

  buildRelatorioBairrosAdminPDF(
    dataCallback: any,
    endCallback: any,
    relatorioPorEscola: Array<{
      escola: string;
      distribuicaoGeral: { bairro: string; quantidade: number; percentual: string }[];
      distribuicaoPorTurma: { turma: string; distribuicaoBairros: Record<string, number> }[];
    }>
  ) {
    const doc = new PDFDocument({ size: 'A4', margin: 50 });

    doc.on('data', dataCallback);
    doc.on('end', endCallback);

    const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;
    const startX = 50;
    const columnWidths = [100, 100, 100];

    // Adiciona o logo e título no topo
    const logoPath = 'src/assets/logo.png';
    const logoWidth = 50;
    const logoHeight = 40;
    doc.image(logoPath, startX, 20, { width: logoWidth, height: logoHeight });

    doc.fontSize(20).text('Relatório de Bairros dos Alunos por Escola', {
      align: 'center',
      underline: true,
    });

    doc.moveDown(2);

    relatorioPorEscola.forEach((escolaData, escolaIndex) => {
      if (escolaIndex > 0) doc.addPage(); // Nova página para cada escola

      // Nome da escola
      doc.fontSize(16).text(`Escola: ${escolaData.escola}`, { align: 'center' });
      doc.moveDown(2);

      // Distribuição Geral da Escola
      doc.fontSize(14).text('Distribuição Geral por Bairros', { align: 'left' });
      doc.moveDown(1);

      // Cabeçalho da tabela de distribuição geral
      let currentY = doc.y;
      doc.font('Helvetica').fontSize(12)
        .text('Raça', startX, currentY, { width: columnWidths[0] })
        .text('Quantidade', startX + columnWidths[0], currentY, { width: columnWidths[1] })
        .text('Percentual', startX + columnWidths[0] + columnWidths[1], currentY, { width: columnWidths[2] });

      // Linha de separação do cabeçalho
      doc.moveTo(startX, doc.y + 5)
        .lineTo(pageWidth + startX, doc.y + 5)
        .stroke();

      doc.moveDown(1);

      // Listagem da distribuição geral
      escolaData.distribuicaoGeral.forEach((item) => {
        currentY = doc.y;
        doc.fontSize(12)
          .text(item.bairro, startX, currentY, { width: columnWidths[0] })
          .text(item.quantidade.toString(), startX + columnWidths[0], currentY, { width: columnWidths[1] })
          .text(item.percentual, startX + columnWidths[0] + columnWidths[1], currentY, { width: columnWidths[2] });

        doc.moveDown(0.5);
      });

      doc.moveDown(2);

      // Distribuição por Turma
      escolaData.distribuicaoPorTurma.forEach((turma) => {
        currentY = doc.y;

        doc.fontSize(14).text(`Turma: ${turma.turma}`, startX, currentY);
        doc.moveDown(0.5);

        currentY = doc.y;
        doc.font('Helvetica').fontSize(12)
          .text('Raça', startX, currentY, { width: columnWidths[0] })
          .text('Quantidade', startX + columnWidths[0], currentY, { width: columnWidths[1] });

        doc.moveTo(startX, doc.y + 5)
          .lineTo(pageWidth + startX, doc.y + 5)
          .stroke();

        doc.moveDown(1);

        // Detalhes da turma
        for (const [raca, quantidade] of Object.entries(turma.distribuicaoBairros)) {
          currentY = doc.y;
          doc.fontSize(12)
            .text(raca, startX, currentY, { width: columnWidths[0] })
            .text(quantidade.toString(), startX + columnWidths[0], currentY, { width: columnWidths[1] });

          doc.moveDown(0.5);
        }

        doc.moveDown(2);
      });
    });

    doc.end();
  }

  buildPDFMeninosEMeninasAdmin(
    dataCallback: any,
    endCallback: any,
    relatorioPorEscola: Array<{
      escola: string;
      distribuicaoGeral: { sexo: string; quantidade: number; percentual: string }[];
      distribuicaoPorTurma: { turma: string; distribuicao: { sexo: string; quantidade: number }[] }[];
      formattedMeninos: Array<{ ra: string; nome: string; turma: string }>;
      formattedMeninas: Array<{ ra: string; nome: string; turma: string }>;
    }>
  ) {
    const doc = new PDFDocument({ size: 'A4', margin: 50 });

    doc.on('data', dataCallback);
    doc.on('end', endCallback);

    const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;
    const startX = 50;
    const columnWidths = [100, 100, 100];

    // Adiciona o logo e título no topo
    const logoPath = 'src/assets/logo.png';
    const logoWidth = 50;
    const logoHeight = 40;
    doc.image(logoPath, startX, 20, { width: logoWidth, height: logoHeight });

    doc.fontSize(20).text('Relatório de Meninos e Meninas por Escola', {
      align: 'center',
      underline: true,
    });

    doc.moveDown(2);

    relatorioPorEscola.forEach((escolaData, escolaIndex) => {
      if (escolaIndex > 0) doc.addPage(); // Nova página para cada escola

      // Nome da escola
      doc.fontSize(16).text(`Escola: ${escolaData.escola}`, { align: 'center' });
      doc.moveDown(2);

      // Distribuição Geral da Escola
      doc.fontSize(14).text('Distribuição Geral de Meninos e Meninas', { align: 'left' });
      doc.moveDown(1);

      // Cabeçalho da tabela de distribuição geral
      let currentY = doc.y;
      doc.font('Helvetica').fontSize(12)
        .text('Sexo', startX, currentY, { width: columnWidths[0] })
        .text('Quantidade', startX + columnWidths[0], currentY, { width: columnWidths[1] })
        .text('Percentual', startX + columnWidths[0] + columnWidths[1], currentY, { width: columnWidths[2] });

      // Linha de separação do cabeçalho
      doc.moveTo(startX, doc.y + 5)
        .lineTo(pageWidth + startX, doc.y + 5)
        .stroke();

      doc.moveDown(1);

      // Listagem da distribuição geral
      escolaData.distribuicaoGeral.forEach((item) => {
        currentY = doc.y;
        doc.fontSize(12)
          .text(item.sexo, startX, currentY, { width: columnWidths[0] })
          .text(item.quantidade.toString(), startX + columnWidths[0], currentY, { width: columnWidths[1] })
          .text(item.percentual, startX + columnWidths[0] + columnWidths[1], currentY, { width: columnWidths[2] });

        doc.moveDown(0.5);
      });

      doc.moveDown(2);

      // Distribuição por Turma
      escolaData.distribuicaoPorTurma.forEach((turma) => {
        currentY = doc.y;

        doc.fontSize(14).text(`Turma: ${turma.turma}`, startX, currentY);
        doc.moveDown(0.5);

        currentY = doc.y;
        doc.font('Helvetica').fontSize(12)
          .text('Sexo', startX, currentY, { width: columnWidths[0] })
          .text('Quantidade', startX + columnWidths[0], currentY, { width: columnWidths[1] });

        doc.moveTo(startX, doc.y + 5)
          .lineTo(pageWidth + startX, doc.y + 5)
          .stroke();

        doc.moveDown(1);

        // Detalhes da turma
        turma.distribuicao.forEach((item) => {
          currentY = doc.y;
          doc.fontSize(12)
            .text(item.sexo, startX, currentY, { width: columnWidths[0] })
            .text(item.quantidade.toString(), startX + columnWidths[0], currentY, { width: columnWidths[1] });

          doc.moveDown(0.5);
        });

        doc.moveDown(2);
      });
    });

    doc.end();
  }

  buildRelatorioBeneficiariosAdminPDF(
    dataCallback: any,
    endCallback: any,
    relatorioPorEscola: Array<{
      escola: string;
      alunos: Array<{ ra: string; nome: string; turma: string }>;
    }>
  ) {
    const doc = new PDFDocument({ size: 'A4', margin: 50 });

    doc.on('data', dataCallback);
    doc.on('end', endCallback);

    const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;
    const startX = 50;
    const columnWidths = [150, 250, 70];

    // Adiciona o logo e título no topo
    const logoPath = 'src/assets/logo.png';
    const logoWidth = 50;
    const logoHeight = 40;
    doc.image(logoPath, startX, 20, { width: logoWidth, height: logoHeight });

    doc.moveDown(2);

    doc.fontSize(20).text('Relatório de Beneficiários do Bolsa Família por Escola', {
      align: 'center',
      underline: true,
    });

    doc.moveDown(2);

    relatorioPorEscola.forEach((escolaData, escolaIndex) => {
      if (escolaIndex > 0) doc.addPage(); // Nova página para cada escola

      // Nome da escola
      doc.fontSize(16).text(`Escola: ${escolaData.escola}`, { align: 'center' });
      doc.moveDown(1);

      // Número de alunos beneficiários
      const numeroAlunos = escolaData.alunos.length;
      doc.fontSize(14).text(`Número de Alunos Beneficiários: ${numeroAlunos}`, { align: 'center' });
      doc.moveDown(1);

      // Listagem dos alunos beneficiários
      doc.fontSize(14).text('Alunos Beneficiários', { align: 'left' });
      doc.moveDown(1);

      // Cabeçalho da tabela de alunos
      let currentY = doc.y;
      doc.font('Helvetica').fontSize(12)
        .text('RA', startX, currentY, { width: columnWidths[0] })
        .text('Nome', startX + columnWidths[0], currentY, { width: columnWidths[1] })
        .text('Turma', startX + columnWidths[0] + columnWidths[1], currentY, { width: columnWidths[2] });

      // Linha de separação do cabeçalho
      doc.moveTo(startX, doc.y + 5)
        .lineTo(pageWidth + startX, doc.y + 5)
        .stroke();

      doc.moveDown(1);

      // Listagem dos alunos
      escolaData.alunos.forEach((aluno) => {
        currentY = doc.y;
        doc.fontSize(12)
          .text(aluno.ra, startX, currentY, { width: columnWidths[0] })
          .text(aluno.nome, startX + columnWidths[0], currentY, { width: columnWidths[1] })
          .text(aluno.turma, startX + columnWidths[0] + columnWidths[1], currentY, { width: columnWidths[2] });

        doc.moveDown(0.5);
      });
      doc.moveDown(2);
    });
    doc.end();
  }
}