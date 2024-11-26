import { DocumentoScan, PrismaClient } from '@prisma/client';
import { TipoDocumentoEnum } from '../../src/enum/TipoDocumentoEnum';
import bcrypt from 'bcrypt';
import { createAndSaveDocumento, gerarDataAleatoria } from './util-seed';

/**
 * Esta função realiza a semeação das tabelas necessárias para o módulo de Prestação de Contas no banco de dados.
 * Ela cria dados de amostra para várias entidades relacionadas ao módulo.
 *
 * @param idEscola - Um array de IDs de escolas para associar aos dados de semeação.
 * @param idServidor - Um array de IDs de servidores para associar aos dados de semeação.
 * @param prisma - Uma instância do PrismaClient para interagir com o banco de dados.
 *
 */
export async function SeedPrestacao(idEscola: number[], idServidor: number[], prisma: PrismaClient) {
  console.log('\t🕤 Seeding das tabelas do Módulo de Prestação de Contas.');

  const idContaBancaria = await seedContaBancaria(idEscola, prisma);
  await seedMovimentacaoFinanceira(idContaBancaria, prisma);
  const idPDDE = await seedPDDE(idEscola, idContaBancaria, prisma);
  const idSaldoPDDE = await seedSaldoPDDE(idPDDE, prisma);
  const idPrograma = await seedPrograma(idPDDE, prisma);
  const idFornecedor = await seedFornecedor(prisma);
  const idPrestacaoContas = await seedPrestacaoContas(idPDDE, prisma);
  const pesquisaPreco = await seedPesquisaPreco(idPrestacaoContas, idFornecedor, prisma);
  const bem = await seedBem(pesquisaPreco, prisma);
  await seedPropostaBem(pesquisaPreco, bem, prisma);
  await seedOrcamento(prisma);
  await seedAtaComArquivo(prisma, idEscola);
  await seedNotaFiscal(idFornecedor, prisma);

  await seedOficioMemorando(idEscola, prisma);

  console.log('\t✔  Seeding de Prestação de Contas concluído.');
}

async function seedAtaComArquivo(prisma: PrismaClient, idEscolas: number[]) {
  const tde = TipoDocumentoEnum.ATA_ASSINADA;
  for (const escolaId of idEscolas) {
    for (let i = 0; i < 4; i++) {
      await prisma.ata.create({
        data: {
          escolaId: escolaId,
          documentosScanId: (await createAndSaveDocumento(prisma, tde)).id,
          titulo: `Ata da 00${i + 1} da Escola ${escolaId}`,
          ata: 'Conteúdo de exemplo para a ata associada ao arquivo-seed.pdf',
          data: gerarDataAleatoria(),
          createdAt: new Date(),
        },
      });
    }
  }
  console.log('\t\t✔   Seeding de Atas concluído.');
}

async function seedContaBancaria(idEscola: number[], prisma: PrismaClient) {
  let idContaBancaria: number[] = [];

  const registrosContaBancaria = [
    {
      escolaId: idEscola[0],
      agencia: '1000-0',
      numeroConta: '123456789',
      banco: 'Banco do Brasil',
    },
    {
      escolaId: idEscola[1],
      agencia: '1000-0',
      numeroConta: '987654321',
      banco: 'Banco do Brasil',
    },
    {
      escolaId: idEscola[2],
      agencia: '1000-0',
      numeroConta: '654987321',
      banco: 'Banco do Brasil',
    },
    {
      escolaId: idEscola[0],
      agencia: '0000-1',
      numeroConta: '963528741',
      banco: 'Banco do Brasil',
    },
    {
      escolaId: idEscola[1],
      agencia: '0000-1',
      numeroConta: '147456398',
      banco: 'Banco do Brasil',
    },
    {
      escolaId: idEscola[2],
      agencia: '0000-1',
      numeroConta: '456321789',
      banco: 'Banco do Brasil',
    },
    {
      escolaId: idEscola[0],
      agencia: '1111-2',
      numeroConta: '555888222',
      banco: 'Banco do Brasil',
    },
    {
      escolaId: idEscola[1],
      agencia: '2222-3',
      numeroConta: '777999333',
      banco: 'Banco do Brasil',
    },
    {
      escolaId: idEscola[2],
      agencia: '3333-4',
      numeroConta: '111444666',
      banco: 'Banco do Brasil',
    },
  ];

  for (const registro of registrosContaBancaria) {
    const resposta = await prisma.contaBancaria.create({
      data: {
        ...registro,
        createdAt: new Date(),
      },
    });
    idContaBancaria.push(resposta.id);
  }

  const dados = idContaBancaria.map((id) => ({
    contaBancariaId: id,
    ano: new Date().getFullYear(),
    saldoFinal: 10000,
    createdAt: new Date(),
  }));
  await prisma.saldoBancario.createMany({ data: dados });

  console.log('\t\t✔  Seeding de Conta Bancárias concluído.');
  return idContaBancaria;
}

async function seedMovimentacaoFinanceira(idContaBancaria: number[], prisma: PrismaClient) {
  const tde = TipoDocumentoEnum.RECIBO;
  const tipoMovimentacao = ['E', 'S'];
  const capitalCusteio = ['Capital', 'Custeio'];

  for (let i = 0; i < 30; i++) {
    const tipo = tipoMovimentacao[Math.floor(Math.random() * tipoMovimentacao.length)];
    const capital = capitalCusteio[Math.floor(Math.random() * capitalCusteio.length)];
    const resposta = await prisma.movimentacaoFinanceira.create({
      data: {
        contaBancariaId: idContaBancaria[Math.floor(Math.random() * idContaBancaria.length)],
        documentoScanId: (await createAndSaveDocumento(prisma, tde)).id,
        data: gerarDataAleatoria(),
        descricao: `${capital} ${tipo} ${i + 1}`,
        tipo: tipo,
        capitalCusteio: capital,
        valor: (Math.random() * 100).toFixed(2),
        createdAt: new Date(),
      },
    });
  }
  console.log('\t\t✔  Seeding de Movimentações Financeiras concluído.');
}

async function seedPDDE(idEscola: number[], idContaBancaria: number[], prisma: PrismaClient) {
  let idPDDE: number[] = [];

  for (let i = 0; i < idEscola.length; i++) {
    const respostaBasico = await prisma.pDDE.create({
      data: {
        escolaId: idEscola[i],
        contaBancariaId: idContaBancaria[i],
        tipo: 'Básico',
        createdAt: new Date(),
      },
    });

    idPDDE.push(respostaBasico.id);
    const respostaQualidade = await prisma.pDDE.create({
      data: {
        escolaId: idEscola[i],
        contaBancariaId: idContaBancaria[i + 3],
        tipo: 'Qualidade',
        createdAt: new Date(),
      },
    });
    idPDDE.push(respostaQualidade.id);

    const respostaEstrutura = await prisma.pDDE.create({
      data: {
        escolaId: idEscola[i],
        contaBancariaId: idContaBancaria[i + 6],
        tipo: 'Estrutura',
        createdAt: new Date(),
      },
    });
    idPDDE.push(respostaEstrutura.id);
  }

  console.log('\t\t✔  Seeding de PDDEs concluído.');
  return idPDDE;
}

async function seedSaldoPDDE(idPDDE: number[], prisma: PrismaClient) {
  let idSaldoPDDE: number[] = [];

  for (let i = 0; i < idPDDE.length; i++) {
    const resposta = await prisma.saldoPDDE.create({
      data: {
        saldoPDDEId: idPDDE[i],
        valor: 10000,
        custeio: 60,
        capital: 40,
        custeioValor: 6000,
        capitalValor: 4000,
        createdAt: new Date(),
      },
    });
    idSaldoPDDE.push(resposta.id);
  }
  console.log('\t\t✔  Seeding de Saldos PDDEs concluído.');
}

/**
 * Esta função realiza a semeação da tabela Programa no banco de dados com dados de amostra.
 * Ela cria 6 registros de programas associados aos IDs de PDDE fornecidos.
 *
 * @param idPDDE - Um array de IDs de PDDE para associar aos registros de programas.
 * @param prisma - Uma instância do PrismaClient para interagir com o banco de dados.
 *
 * @returns Uma promessa que resolve para um array dos IDs dos novos registros de programas criados.
 */
async function seedPrograma(idPDDE: number[], prisma: PrismaClient): Promise<number[]> {
  let idPrograma: number[] = [];
  let nomePrograma;
  const nomeQualidade = [
    'Programa de Inovação Educação Conectada',
    'Programa Novo Ensino Médio',
    'PDDE Emergencial',
    'Programa Tempo de Aprender',
    'Programa Brasil na Escola',
    'Programa Educação e Família',
    'Programa Itinerários Formativos',
  ];
  const nomeEstrutura = [
    'Programa Sala de Recursos Multifuncionais',
    'Programa Escola Acessível',
    'Programa Água e Esgotamento Sanitário nas Escolas Rurais',
    'Programa PDDE Escolas Rurais: Campo, Indígenas e Quilombolas',
  ];

  for (let i = 0; i < idPDDE.length; i++) {
    const pdde = await prisma.pDDE.findUnique({ where: { id: idPDDE[i] } });
    if (pdde?.tipo === 'Básico') nomePrograma = 'Básico';
    else if (pdde?.tipo === 'Qualidade') nomePrograma = nomeQualidade[Math.floor(Math.random() * nomeQualidade.length)];
    else nomePrograma = nomeEstrutura[Math.floor(Math.random() * nomeEstrutura.length)];

    const resposta = await prisma.programa.create({
      data: {
        pddeId: idPDDE[i],
        nome: `${nomePrograma} ${i + 1}`,
        createdAt: new Date(),
      },
    });
    idPrograma.push(resposta.id);
  }

  console.log('\t\t✔  Seeding de Programas concluído.');
  return idPrograma;
}

/**
 * Esta função realiza a semeação da tabela PrestacaoContas no banco de dados com dados de amostra.
 * Ela cria vários registros (6) de PrestacaoContas associados aos IDs de Programa fornecidos.
 *
 * @param idPDDE - Um array de IDs de Programa para associar aos registros de PrestacaoContas.
 * @param prisma - Uma instância do PrismaClient para interagir com o banco de dados.
 *
 * @returns Uma promessa que resolve para um array dos IDs dos novos registros de PrestacaoContas criados.
 */
async function seedPrestacaoContas(idPDDE: number[], prisma: PrismaClient): Promise<number[]> {
  let idPrestacaoContas: number[] = [];

  for (const pdde of idPDDE) {
    const prestacaoContas = await prisma.prestacaoContas.createMany({
      data: {
        pDDEId: pdde,
        ano: 2024,
        entregue: false,
        createdAt: new Date(),
      },
    });
  }

  const prestacaoContasIds = await prisma.prestacaoContas.findMany({
    select: { id: true },
  });

  idPrestacaoContas.push(...prestacaoContasIds.map((p) => p.id));
  console.log('\t\t✔  Seeding de Prestações de Contas concluído.');
  return idPrestacaoContas;
}

async function seedFornecedor(prisma: PrismaClient) {
  let idFornecedor: number[] = [];

  const registrosFornecedor = [
    {
      razaoSocial: 'Felipe e Aparecida Limpeza ME',
      cnpj: '74326770000165',
      cpf: null,
      cidade: 'Presidente Epitácio',
      endereco: 'Avenida Américo Tornero, 632',
      responsavel: 'Felipe Alberto',
      nomeFantasia: 'Felipe Limpeza',
      telefone: '1139891403',
      email: 'qualidade@felipeeaparecidalimpezame.com.br',
    },
    {
      razaoSocial: 'Marcos e Eloá Marcenaria Ltda',
      cnpj: '12191727000182',
      cpf: null,
      cidade: 'Presidente Epitácio',
      endereco: 'Jardim Santa Rosa, 862',
      responsavel: 'Marcos Oliveira',
      nomeFantasia: 'ME Marcenaria',
      telefone: '1927725114',
      email: 'ouvidoria@marcoseeloamarcenarialtda.com.br',
    },
    {
      razaoSocial: 'Anderson e Cauã Marcenaria ME',
      cnpj: '37737808000166',
      cpf: null,
      cidade: 'Presidente Epitácio',
      endereco: 'Jardim Lajeado, 862',
      responsavel: 'Marcos Pererira',
      nomeFantasia: 'AEC Marcenaria',
      telefone: '1136175973',
      email: 'ti@andersonecauamarcenariame.com.br',
    },
  ];

  for (const registro of registrosFornecedor) {
    const resposta = await prisma.fornecedor.create({
      data: {
        ...registro,
        createdAt: new Date(),
      },
    });
    idFornecedor.push(resposta.id);
  }

  console.log('\t\t✔  Seeding de Fornecedores concluído.');
  return idFornecedor;
}

async function seedPesquisaPreco(idPrestacaoContas: number[], idFornecedor: number[], prisma: PrismaClient) {
  let pesquisaPreco: any[] = [];

  const registrosPesquisaPreco = [
    {
      prestacaoContasId: idPrestacaoContas[0],
      tipo: 'B',
      titulo: 'Pesquisa de Preço A',
      proponenteA: idFornecedor[1],
      proponenteB: idFornecedor[2],
      proponenteC: idFornecedor[0],
      programaId: 1,
    },
    {
      prestacaoContasId: idPrestacaoContas[0],
      tipo: 'B',
      titulo: 'Segunda Pesquisa de Preço A',
      proponenteA: idFornecedor[2],
      proponenteB: idFornecedor[0],
      proponenteC: idFornecedor[1],
      programaId: 2,
    },
    {
      prestacaoContasId: idPrestacaoContas[0],
      tipo: 'B',
      titulo: 'Terceira Pesquisa de Preço A',
      proponenteA: null,
      proponenteB: null,
      proponenteC: null,
      programaId: 3,
    },
    {
      prestacaoContasId: idPrestacaoContas[1],
      tipo: 'B',
      titulo: 'Pesquisa de Preço B',
      proponenteA: idFornecedor[2],
      proponenteB: idFornecedor[0],
      proponenteC: idFornecedor[1],
    },
    {
      prestacaoContasId: idPrestacaoContas[2],
      tipo: 'B',
      titulo: 'Segunda Pesquisa de Preço B',
      proponenteA: idFornecedor[0],
      proponenteB: idFornecedor[1],
      proponenteC: idFornecedor[2],
    },
    {
      prestacaoContasId: idPrestacaoContas[2],
      tipo: 'B',
      titulo: 'Pesquisa de Preço C',
      proponenteA: idFornecedor[0],
      proponenteB: idFornecedor[1],
      proponenteC: idFornecedor[2],
    },
    {
      prestacaoContasId: idPrestacaoContas[3],
      tipo: 'B',
      titulo: 'Pesquisa de Preço D',
      proponenteA: idFornecedor[1],
      proponenteB: idFornecedor[0],
      proponenteC: idFornecedor[2],
    },
    {
      prestacaoContasId: idPrestacaoContas[4],
      tipo: 'B',
      titulo: 'Pesquisa de Preço E',
      proponenteA: idFornecedor[2],
      proponenteB: idFornecedor[1],
      proponenteC: idFornecedor[0],
    },
    {
      prestacaoContasId: idPrestacaoContas[5],
      tipo: 'B',
      titulo: 'Pesquisa de Preço F',
      proponenteA: idFornecedor[0],
      proponenteB: idFornecedor[2],
      proponenteC: idFornecedor[1],
    },
  ];

  for (const registro of registrosPesquisaPreco) {
    const resposta = await prisma.pesquisaPreco.create({
      data: {
        ...registro,
        createdAt: new Date(),
      },
    });
    pesquisaPreco.push(resposta);
  }

  console.log('\t\t✔  Seeding de Pesquisas de Preço concluído.');
  return pesquisaPreco;
}

function gerarBens(quantidadeBens: number) {
  const adjetivos = ['Excelente', 'Básico', 'Avançado', 'Simple', 'Completo', 'Rápido', 'Eficiente'];
  const substantivos = ['Equipamento', 'Material', 'Kit', 'Sistema', 'Dispositivo', 'Aparelho', 'Componente'];

  const bens: any[] = [];

  for (let i = 0; i < quantidadeBens; i++) {
    const adjetivo = adjetivos[Math.floor(Math.random() * adjetivos.length)];
    const substantivo = substantivos[Math.floor(Math.random() * substantivos.length)];
    const descricao = `${adjetivo} ${substantivo}`;
    const quantidade = Math.floor(Math.random() * 30) + 1;

    bens.push({ descricao, quantidade });
  }

  return bens;
}

async function seedBem(pesquisaPreco: any[], prisma: PrismaClient) {
  let listaBens: any[] = [];

  for (const pesquisa of pesquisaPreco) {
    const numBens = Math.floor(Math.random() * 4) + 2;
    const bens = gerarBens(numBens);

    for (const bem of bens) {
      const resposta = await prisma.bem.create({
        data: {
          pesquisaPrecoId: pesquisa.id,
          descricao: bem.descricao,
          quantidade: bem.quantidade,
          createdAt: new Date(),
        },
      });
      listaBens.push(resposta);
    }
  }

  console.log('\t\t✔  Seeding de Bens concluído.');
  return listaBens;
}

async function seedPropostaBem(pesquisaPreco: any[], bem: any[], prisma: PrismaClient) {
  // Para cada pesquisa de preço, irá incluir no máximo, como propostasBem, a quantidade de proponentes da pesquisaPreço
  for (const pesquisa of pesquisaPreco) {
    const fornecedores = [pesquisa.proponenteA, pesquisa.proponenteB, pesquisa.proponenteC].filter(
      (fornecedor) => fornecedor !== null,
    ); // Filtrar nulos

    // Filtrar os bens que pertencem à pesquisa atual
    const bens = bem.filter((b) => b.pesquisaPrecoId === pesquisa.id);

    // Para cada bem, irá incluir no máximo, como propostasBem, a quantidade de fornecedores da pesquisaPreço
    for (const bem of bens) {
      const numPropostas = Math.min(fornecedores.length, Math.floor(Math.random() * 3) + 1);

      for (let i = 0; i < numPropostas; i++) {
        const fornecedorId = fornecedores[i];

        // Gerar um valor aleatório entre 10 e 1000
        const valor = (Math.random() * (1000 - 10) + 10).toFixed(2); // Valor arredondado para 2 casas decimais

        const resposta = await prisma.propostaBem.create({
          data: {
            bemId: bem.id, // Associar o bem ao qual a proposta pertence
            fornecedorId: fornecedorId, // Associar o fornecedor que fez a proposta
            valor: parseFloat(valor), // Valor da proposta
            createdAt: new Date(),
          },
        });
      }
    }
  }
  console.log('\t\t✔  Seeding de Propostas de Bens concluído.');
}

// Salva um documentoScan, atribui na tabela de orçamento e salva na proposta correta
async function seedOrcamento(prisma: PrismaClient) {
  const tde = TipoDocumentoEnum.ORCAMENTO;
  const pesquisaPreco = await prisma.pesquisaPreco.findMany();

  for (const pesquisa of pesquisaPreco) {
    const coinFlipA = Math.random() < 0.33;
    const coinFlipB = Math.random() < 0.52;
    const coinFlipC = Math.random() < 0.15;
    if (coinFlipA) {
      const resposta = await prisma.pesquisaPreco.update({
        where: {
          id: pesquisa.id,
        },
        data: {
          orcamentoA: (await createAndSaveDocumento(prisma, tde)).id,
          updatedAt: new Date(),
        },
      });
    }
    if (coinFlipB) {
      await prisma.pesquisaPreco.update({
        where: {
          id: pesquisa.id,
        },
        data: {
          orcamentoB: (await createAndSaveDocumento(prisma, tde)).id,
          updatedAt: new Date(),
        },
      });
    }
    if (coinFlipC) {
      await prisma.pesquisaPreco.update({
        where: {
          id: pesquisa.id,
        },
        data: {
          orcamentoC: (await createAndSaveDocumento(prisma, tde)).id,
          updatedAt: new Date(),
        },
      });
    }
  }
  console.log('\t\t✔  Seeding de Orçamentos concluído.');
}

// Salva um documentoScan, atribui na tabela de nota fiscal e adiciona a um BEM
async function seedNotaFiscal(idFornecedor: number[], prisma: PrismaClient) {
  console.log('\t\t✔  Seeding de Notas Fiscais concluído.');
}

async function seedTermoDoacao() {}

async function seedOficioMemorando(idEscola: number[], prisma: PrismaClient) {
  const tde = TipoDocumentoEnum.OFICIO;
  const tipoOM = ['Ofício', 'Memorando'];

  for (let i = 0; i < 25; i++) {
    const tipo = tipoOM[Math.floor(Math.random() * tipoOM.length)];
    const resposta = await prisma.oficioMemorando.create({
      data: {
        escolaId: idEscola[Math.floor(Math.random() * idEscola.length)],
        documentoScanId: (await createAndSaveDocumento(prisma, tde)).id,
        titulo: `00${i + 1}`,
        tipo: tipo,
        data: gerarDataAleatoria(),
        createdAt: new Date(),
      },
    });
  }
  console.log('\t\t✔  Seeding de Ofícios e Memorandos concluído.');
}
