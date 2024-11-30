import { CargoAPMEnum, DocumentoScan, PrismaClient } from '@prisma/client';
import { TipoDocumentoEnum } from '../../src/enum/TipoDocumentoEnum';
import bcrypt from 'bcrypt';
import {
  createAndSaveDocumento,
  gerarCNPJ,
  gerarCPF,
  gerarDataAleatoria,
  gerarRG,
  obterElementosAleatoriosDistintos,
} from './util-seed';

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

  // Dados para uma apm
  const idAPM = await seedAPM(idEscola, prisma);
  const idFormacaoAPM = await seedFormacaoAPM(idAPM, prisma);
  const idAssociadoAPM = await seedAssociadoAPM(prisma);
  await seedServidorAPM(idFormacaoAPM, idAssociadoAPM, prisma);

  // Dados financeiros e pesquisa de preço
  const idContaBancaria = await seedContaBancaria(idEscola, prisma);
  await seedMovimentacaoFinanceira(idContaBancaria, prisma);
  const idPDDE = await seedPDDE(idEscola, idContaBancaria, prisma);
  const idSaldoPDDE = await seedSaldoPDDE(idPDDE, prisma);
  const idPrograma = await seedPrograma(idPDDE, prisma);
  const idFornecedor = await seedFornecedor(prisma);
  const idPrestacaoContas = await seedPrestacaoContas(idPDDE, prisma);
  const pesquisaPreco = await seedPesquisaPreco(idPrestacaoContas, idFornecedor, prisma);
  const item = await seedItens(pesquisaPreco, prisma);
  await seedPropostaItem(pesquisaPreco, item, prisma);
  await seedOrcamento(prisma);
  await seedAta(prisma, idEscola);
  await seedNotaFiscal(idFornecedor, prisma);
  await seedOficioMemorando(idEscola, prisma);

  console.log('\t✔  Seeding de Prestação de Contas concluído.');
}

async function seedAPM(idEscola: number[], prisma: PrismaClient) {
  let idAPM: number[] = [];
  for (let i = 0; i < idEscola.length; i++) {
    // Encontrar a escola no banco de dados
    const escola = await prisma.escola.findUnique({
      where: {
        id: idEscola[i],
      },
    });

    // Criar a APM para a escola
    const apm = await prisma.aPM.create({
      data: {
        cnpj: gerarCNPJ(),
        nome: `APM da Escola ${escola?.nome}`,
        dataFormacao: new Date('1999-01-01'),
        createdAt: new Date(),
      },
    });

    // Atualizar a Escola com sua APM
    await prisma.escola.update({
      where: {
        id: idEscola[i],
      },
      data: {
        apmId: apm.id,
      },
    });
    idAPM.push(apm.id);
  }
  console.log('\t\t✔  Seeding de APMs concluído.');
  return idAPM;
}

async function seedFormacaoAPM(idAPM: number[], prisma: PrismaClient) {
  let idFormacaoAPM: number[] = [];

  for (let i = 0; i < idAPM.length; i++) {
    // Criar uma APM vigente para cada Escola
    const formacaoAPM = await prisma.formacaoAPM.create({
      data: {
        apmId: idAPM[i],
        dataInicio: new Date('2024-03-01'),
        dataTermino: new Date('2025-02-28'),
        vigencia: true,
        createdAt: new Date(),
      },
    });

    idFormacaoAPM.push(formacaoAPM.id);
  }
  console.log('\t\t✔  Seeding de Formações dos APMs concluído.');
  return idFormacaoAPM;
}

async function seedAssociadoAPM(prisma: PrismaClient) {
  const SALT_ROUNDS = 10;
  let idAssociadoAPM: number[] = [];

  for (let index = 0; index < 15; index++) {
    const associadoAPM = await prisma.servidor.create({
      data: {
        nome: `Associado APM ${index + 1}`,
        cpf: gerarCPF(),
        rg: gerarRG(),
        email: `apm-${index + 1}@escola.com`,
        senha: await bcrypt.hash('12345', SALT_ROUNDS),
        createdAt: new Date(),
      },
    });
    idAssociadoAPM.push(associadoAPM.id);
  }
  console.log('\t\t✔  Seeding de Formações dos APMs concluído.');
  return idAssociadoAPM;
}

async function seedServidorAPM(idFormacaoAPM: number[], idAssociadoAPM: number[], prisma: PrismaClient) {
  for (let i = 0; i < idFormacaoAPM.length; i++) {
    let servidoresAPM: any[] = [];
    // Montar cada cargo da APM
    // // Diretor Financeiro
    const diretorFinanceiro = {
      servidorId: idAssociadoAPM[i],
      formacaoAPMId: idFormacaoAPM[i],
      cargoAPM: CargoAPMEnum.DIRETOR_FINANCEIRO,
    };
    servidoresAPM.push(diretorFinanceiro);

    // Conselheiro Fiscal
    const conselheiroA = {
      servidorId: idAssociadoAPM[i + 3],
      formacaoAPMId: idFormacaoAPM[i],
      cargoAPM: CargoAPMEnum.CONSELHEIRO_FISCAL,
    };
    servidoresAPM.push(conselheiroA);

    // Conselheiro Fiscal
    const conselheiroB = {
      servidorId: idAssociadoAPM[i + 6],
      formacaoAPMId: idFormacaoAPM[i],
      cargoAPM: CargoAPMEnum.CONSELHEIRO_FISCAL,
    };
    servidoresAPM.push(conselheiroB);

    // Conselheiro Fiscal
    const conselheiroC = {
      servidorId: idAssociadoAPM[i + 9],
      formacaoAPMId: idFormacaoAPM[i],
      cargoAPM: CargoAPMEnum.CONSELHEIRO_FISCAL,
    };
    servidoresAPM.push(conselheiroC);

    // Criação dos ServidorAPM
    const servidorAPM = await prisma.servidorAPM.createMany({
      data: servidoresAPM,
    });
  }
  console.log('\t\t✔  Seeding de Servidores APM concluído.');
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
      cnpj: gerarCNPJ(),
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
      cnpj: gerarCNPJ(),
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
      cnpj: gerarCNPJ(),
      cpf: null,
      cidade: 'Presidente Epitácio',
      endereco: 'Jardim Lajeado, 862',
      responsavel: 'Marcos Pererira',
      nomeFantasia: 'AEC Marcenaria',
      telefone: '1136175973',
      email: 'ti@andersonecauamarcenariame.com.br',
    },
    {
      razaoSocial: 'FGgael ME',
      cnpj: null,
      cpf: gerarCPF(),
      cidade: 'Presidente Epitácio',
      endereco: 'Rua Antônio Félix Pacheco, 1047',
      responsavel: 'Gael Felipe',
      nomeFantasia: 'Gael Fernanda Coisas',
      telefone: '1138695074',
      email: 'fgael@fgael.com.br',
    },
    {
      razaoSocial: 'Emanuel e Agatha Eletrônica Ltda',
      cnpj: gerarCNPJ(),
      cpf: null,
      cidade: 'Presidente Epitácio',
      endereco: 'Praça José Félix Lisboa, 688',
      responsavel: 'Emanuel',
      nomeFantasia: 'Eletro EMA',
      telefone: '1138695074',
      email: 'contato@emanueleagathaeletronicaltda.com.br',
    },
    {
      razaoSocial: 'Vicente e Anthony Telas Ltda',
      cnpj: gerarCNPJ(),
      cpf: null,
      cidade: 'Presidente Epitácio',
      endereco: 'Rua Miosótis, 1472',
      responsavel: 'Vicente da Costa',
      nomeFantasia: 'Vitoria Telas',
      telefone: '1136175973',
      email: 'contato@vicenteeanthonytelasltda.com.br',
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
  let listaPesquisaPreco: any[] = [];

  for (let i = 0; i < idPrestacaoContas.length; i++) {
    for (let j = 0; j < 3; j++) {
      const proponente = obterElementosAleatoriosDistintos(idFornecedor, 3);
      const pesquisaPreco = await prisma.pesquisaPreco.create({
        data: {
          prestacaoContasId: idPrestacaoContas[i],
          tipo: 'B',
          titulo: `Prestação ${i + 1}: Pesquisa de Preço ${j + 1}`,
          proponenteA: proponente[0],
          proponenteB: proponente[1],
          proponenteC: proponente[2],
          createdAt: new Date(),
        },
      });
      listaPesquisaPreco.push(pesquisaPreco);
    }
  }
  console.log('\t\t✔  Seeding de Pesquisas de Preço concluído.');
  return listaPesquisaPreco;
}

function gerarItens(quantidadeItens: number) {
  const adjetivos = ['Excelente', 'Básico', 'Avançado', 'Simple', 'Completo', 'Rápido', 'Eficiente'];
  const substantivos = [
    'Equipamento',
    'Material',
    'Kit',
    'Sistema',
    'Dispositivo',
    'Aparelho',
    'Componente',
    'Serviço',
    'Mão de Obra',
  ];
  const unidades = ['m', 'un.', 'kg', 'L', 'm²', 'm³', 'h'];

  const itens: any[] = [];
  for (let i = 0; i < quantidadeItens; i++) {
    const adjetivo = adjetivos[Math.floor(Math.random() * adjetivos.length)];
    const substantivo = substantivos[Math.floor(Math.random() * substantivos.length)];
    const unidade = unidades[Math.floor(Math.random() * unidades.length)];
    const descricao = `${adjetivo} ${substantivo}`;
    const quantidade = Math.floor(Math.random() * 30) + 1;

    itens.push({ descricao, quantidade, unidade });
  }
  return itens;
}

async function seedItens(pesquisaPreco: any[], prisma: PrismaClient) {
  let listaItens: any[] = [];

  for (const pesquisa of pesquisaPreco) {
    const numItens = Math.floor(Math.random() * 4) + 2;
    const itens = gerarItens(numItens);

    for (const item of itens) {
      const resposta = await prisma.item.create({
        data: {
          pesquisaPrecoId: pesquisa.id,
          descricao: item.descricao,
          quantidade: item.quantidade,
          unidade: item.unidade,
          createdAt: new Date(),
        },
      });
      listaItens.push(resposta);
    }
  }
  console.log('\t\t✔  Seeding de Itens concluído.');
  return listaItens;
}

async function seedPropostaItem(pesquisaPreco: any[], item: any[], prisma: PrismaClient) {
  // Para cada pesquisa de preço, irá incluir no máximo, como propostasItem, a quantidade de proponentes da pesquisaPreço
  for (const pesquisa of pesquisaPreco) {
    const fornecedores = [pesquisa.proponenteA, pesquisa.proponenteB, pesquisa.proponenteC].filter(
      (fornecedor) => fornecedor !== null,
    ); // Filtrar nulos

    // Filtrar os itens que pertencem à pesquisa atual
    const itens = item.filter((b) => b.pesquisaPrecoId === pesquisa.id);

    // Para cada item, irá incluir no máximo, como propostasItem, a quantidade de fornecedores da pesquisaPreço
    for (const item of itens) {
      const numPropostas = Math.min(fornecedores.length, Math.floor(Math.random() * 3) + 1);

      for (let i = 0; i < numPropostas; i++) {
        const fornecedorId = fornecedores[i];

        // Gerar um valor aleatório entre 10 e 1000
        const valor = (Math.random() * (1000 - 10) + 10).toFixed(2); // Valor arredondado para 2 casas decimais

        const resposta = await prisma.propostaItem.create({
          data: {
            itemId: item.id, // Associar o item ao qual a proposta pertence
            fornecedorId: fornecedorId, // Associar o fornecedor que fez a proposta
            valor: parseFloat(valor), // Valor da proposta
            createdAt: new Date(),
          },
        });
      }
    }
  }
  console.log('\t\t✔  Seeding de Propostas de Itens concluído.');
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

async function seedAta(prisma: PrismaClient, idEscolas: number[]) {
  const tde = TipoDocumentoEnum.ATA_ASSINADA;
  for (const escolaId of idEscolas) {
    for (let i = 0; i < 4; i++) {
      await prisma.ata.create({
        data: {
          escolaId: escolaId,
          titulo: `Ata da 00${i + 1} da Escola ${escolaId}`,
          documentosScanId: (await createAndSaveDocumento(prisma, tde)).id,
          ata: 'Conteúdo de exemplo para a ata associada ao arquivo-seed.pdf',
          data: gerarDataAleatoria(),
          createdAt: new Date(),
        },
      });
    }
  }
  console.log('\t\t✔   Seeding de Atas concluído.');
}

// Salva um documentoScan, atribui na tabela de nota fiscal e adiciona a um ITEM
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
