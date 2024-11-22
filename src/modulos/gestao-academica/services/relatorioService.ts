import PDFDocument from 'pdfkit';

export default class RelatorioService {
  
  buildPDF(dataCallback: any, endCallback: any, alunos: any[]) {
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
    doc
      .fontSize(14)
      .text('RA'.padEnd(15), 50, doc.y, { continued: true })
      .text('Nome'.padEnd(50), { continued: true })
      .text('Turma');
  
    // Linha de separação do cabeçalho
    doc
      .moveTo(50, doc.y + 5)
      .lineTo(pageWidth + 50, doc.y + 5)
      .stroke();
  
    doc.moveDown(1);
  
    // Listagem dos alunos
    alunos.forEach((aluno) => {
      const turma = aluno.turma || 'Sem turma';
  
      doc
        .fontSize(12)
        .text(aluno.ra.padEnd(15), 50, doc.y, { continued: true })
        .text(aluno.nome.padEnd(50), { continued: true })
        .text(turma);
  
      doc.moveDown(0.5);
    });
  
    doc.end();
  }

}
