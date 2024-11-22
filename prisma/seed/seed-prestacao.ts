import { Prisma, PrismaClient } from '@prisma/client';
import { TipoDocumentoEnum } from '../../src/enum/TipoDocumentoEnum';
import bcrypt from 'bcrypt';

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
  const idPDDE = await seedPDDE(idEscola, idContaBancaria, prisma);
  const idPrograma = await seedPrograma(idPDDE, prisma);
  const idFornecedor = await seedFornecedor(prisma);
  const idPrestacaoContas = await seedPrestacaoContas(idPDDE, prisma);
  const pesquisaPreco = await seedPesquisaPreco(idPrestacaoContas, idFornecedor, prisma);
  const bem = await seedBem(pesquisaPreco, prisma);
  await seedPropostaBem(pesquisaPreco, bem, prisma);
  await seedOrcamento(prisma);
  await seedNotaFiscal(idFornecedor, prisma);

  console.log('\t✔  Seeding de Prestação de Contas concluído.');
}

async function seedContaBancaria(idEscola: number[], prisma: PrismaClient) {
  let idContaBancaria: number[] = [];

  const registrosContaBancaria = [
    {
      escolaId: idEscola[0],
      agencia: '1234',
      numeroConta: '123456789',
      banco: 'Banco do Brasil',
    },
    {
      escolaId: idEscola[1],
      agencia: '0001',
      numeroConta: '102547',
      banco: 'Banco do Brasil',
    },
    {
      escolaId: idEscola[2],
      agencia: '7896',
      numeroConta: '365214',
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

  console.log('\t\t✔  Seeding de Conta Bancárias concluído.');
  return idContaBancaria;
}

async function seedPDDE(idEscola: number[], idContaBancaria: number[], prisma: PrismaClient) {
  let idPDDE: number[] = [];

  const registrosPDDE = [
    {
      escolaId: idEscola[0],
      contaBancariaId: idContaBancaria[0],
      tipo: 'Básico',
    },
    {
      escolaId: idEscola[0],
      contaBancariaId: idContaBancaria[0],
      tipo: 'Qualidade',
    },
    {
      escolaId: idEscola[1],
      contaBancariaId: idContaBancaria[1],
      tipo: 'Básico',
    },
    {
      escolaId: idEscola[1],
      contaBancariaId: idContaBancaria[1],
      tipo: 'Qualidade',
    },
    {
      escolaId: idEscola[2],
      contaBancariaId: idContaBancaria[2],
      tipo: 'Básico',
    },
    {
      escolaId: idEscola[2],
      contaBancariaId: idContaBancaria[2],
      tipo: 'Qualidade',
    },
  ];

  for (const registro of registrosPDDE) {
    const resposta = await prisma.pDDE.create({
      data: {
        ...registro,
        createdAt: new Date(),
      },
    });
    idPDDE.push(resposta.id);
  }

  console.log('\t\t✔  Seeding de PDDEs concluído.');
  return idPDDE;
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

  const registrosPrograma = [
    {
      pddeId: idPDDE[0],
      nome: 'Programa 1',
    },
    {
      pddeId: idPDDE[1],
      nome: 'Programa 2',
    },
    {
      pddeId: idPDDE[2],
      nome: 'Programa 3',
    },
    {
      pddeId: idPDDE[3],
      nome: 'Programa 4',
    },
    {
      pddeId: idPDDE[4],
      nome: 'Programa 5',
    },
    {
      pddeId: idPDDE[5],
      nome: 'Programa 6',
    },
  ];

  for (const registro of registrosPrograma) {
    const resposta = await prisma.programa.create({
      data: {
        ...registro,
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
  const respostaDoc = await prisma.documentoScan.create({
    data: {
      tipoDocumentoId: TipoDocumentoEnum.ORCAMENTO.id,
      caminho: 'seed/arquivo-seed.pdf',
      createdAt: new Date(),
    },
  });

  const pesquisaPreco = await prisma.pesquisaPreco.findMany();

  for (const pesquisa of pesquisaPreco) {
    const coinFlipA = Math.random() < 0.33;
    const coinFlipB = Math.random() < 0.3;
    const coinFlipC = Math.random() < 0.15;
    if (coinFlipA) {
      await prisma.pesquisaPreco.update({
        where: {
          id: pesquisa.id,
        },
        data: {
          orcamentoA: respostaDoc.id,
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
          orcamentoB: respostaDoc.id,
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
          orcamentoC: respostaDoc.id,
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
