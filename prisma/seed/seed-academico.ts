import { PrismaClient } from '@prisma/client';

export async function SeedAcademica(idEscola: number[], idServidor: number[], prisma: PrismaClient) {
  console.log('\t🕤 Seedind das tabelas do Módulo de Gestão Acadêmica.');

  const tipoAlergiaIds = await seedTipoAlergia(prisma);
  await seedAlergias(tipoAlergiaIds, prisma);
  const idTurmas = await seedTurmas(prisma, idEscola, idServidor);
  await seedAlunos(prisma, idTurmas);

  console.log('\t✔  Seedind Gestão Acadêmica concluído.');

  return { idEscola, idServidor };
}

async function seedTurmas(prisma: PrismaClient, idEscola: number[], idServidor: number[]): Promise<number[]> {
  const turmas = [
    { escolaId: idEscola[0], servidorId: idServidor[3], anoLetivo: 2024, ano: 'Pré 1', letra: 'A' }, 
    { escolaId: idEscola[1], servidorId: idServidor[11], anoLetivo: 2024, ano: '2º ano', letra: 'A' }, 
  ];

  const turmasCriadas: number[] = []; // Definindo o tipo do array como number[]

  for (const turma of turmas) {
    const turmaCriada = await prisma.turma.create({
      data: {
        escolaId: turma.escolaId,
        servidorId: turma.servidorId,
        anoLetivo: turma.anoLetivo,
        ano: turma.ano,
        letra: turma.letra,
        createdAt: new Date(),
      },
    });
    turmasCriadas.push(turmaCriada.id); // Armazenando o ID da turma criada
  }

  console.log('\t\t✔  Seeding de Turmas concluído.');
  return turmasCriadas; // Retornando os IDs das turmas criadas
}

// Função para incluir os tipos de alergia
async function seedTipoAlergia(prisma: PrismaClient) {
  const tiposAlergia = [
    { descricao: 'Alimentar' },
    { descricao: 'Respiratória' },
    { descricao: 'Medicamentosa' },
    { descricao: 'Insetos' },
    { descricao: 'De pele' },
  ];

  const tipoAlergiaIds: number[] = [];

  for (const tipo of tiposAlergia) {
    const resposta = await prisma.tipoAlergia.create({
      data: tipo,
    });
    tipoAlergiaIds.push(resposta.id);
  }

  console.log('\t\t✔  Seeding de Tipos de Alergia concluído.');
  return tipoAlergiaIds;
}

// Função para incluir as alergias correspondentes
async function seedAlergias(tipoAlergiaIds: number[], prisma: PrismaClient) {
  const alergias = [
    { descricao: 'Leite', tipoAlergiaId: tipoAlergiaIds[0] }, // alimentar
    { descricao: 'Soja', tipoAlergiaId: tipoAlergiaIds[0] },
    { descricao: 'Amendoim', tipoAlergiaId: tipoAlergiaIds[0] },
    { descricao: 'Ovo', tipoAlergiaId: tipoAlergiaIds[0] },
    { descricao: 'Castanhas', tipoAlergiaId: tipoAlergiaIds[0] },
    { descricao: 'Trigo', tipoAlergiaId: tipoAlergiaIds[0] },
    { descricao: 'Peixes', tipoAlergiaId: tipoAlergiaIds[0] },
    { descricao: 'Frutos do mar', tipoAlergiaId: tipoAlergiaIds[0] },
    { descricao: 'Rinite alérgica', tipoAlergiaId: tipoAlergiaIds[1] }, // respiratória
    { descricao: 'Asma', tipoAlergiaId: tipoAlergiaIds[1] },
    { descricao: 'Sinusite', tipoAlergiaId: tipoAlergiaIds[1] },
    { descricao: 'Bronquite alérgica', tipoAlergiaId: tipoAlergiaIds[1] },
    { descricao: 'Ibuprofeno', tipoAlergiaId: tipoAlergiaIds[2] }, // medicamentosa
    { descricao: 'Diclofenaco', tipoAlergiaId: tipoAlergiaIds[2] },
    { descricao: 'Dipirona', tipoAlergiaId: tipoAlergiaIds[2] },
    { descricao: 'Aspirina', tipoAlergiaId: tipoAlergiaIds[2] },
    { descricao: 'Abelha', tipoAlergiaId: tipoAlergiaIds[3] }, // insetos
    { descricao: 'Vespa', tipoAlergiaId: tipoAlergiaIds[3] },
    { descricao: 'Formiga', tipoAlergiaId: tipoAlergiaIds[3] },
    { descricao: 'Pernilongo', tipoAlergiaId: tipoAlergiaIds[3] },
    { descricao: 'Urticária', tipoAlergiaId: tipoAlergiaIds[4] }, // de pele
    { descricao: 'Dermatite de contato', tipoAlergiaId: tipoAlergiaIds[4] },
    { descricao: 'Dermatite seborreica', tipoAlergiaId: tipoAlergiaIds[4] },
  ];

  for (const alergia of alergias) {
    await prisma.alergia.create({
      data: alergia,
    });
  }

  console.log('\t\t✔  Seeding de Alergias concluído.');
}

async function seedAlunos(prisma: PrismaClient, turmas: any[]) {
  const alunos = [
    {
      turmaId: turmas[0], 
      ra: '123.456.789.001-X',
      nome: 'João da Silva',
      nomeMae: 'Maria da Silva',
      cpf: '43505558036',
      dataNascimento: new Date('2020-05-15'),
      celular: '11987654321',
      sexo: 'M',
      raca: 'Branco',
      beneficiarioBF: false,
      logradouro: 'Rua Álvaro Coelho',
      numero: '123',
      bairro: 'Centro',
      cep: '19470-000',
      cidade: 'Presidente Epitácio',
      uf: 'SP',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      turmaId: turmas[0],
      ra: '987.654.321.002-X',
      nome: 'Ana Pereira',
      nomeMae: 'Clara Pereira',
      cpf: '88051204050',
      dataNascimento: new Date('2021-08-20'),
      celular: '11912345678',
      sexo: 'F',
      raca: 'Pardo',
      beneficiarioBF: true,
      logradouro: 'Rua Álvaro Coelho',
      numero: '456',
      bairro: 'Centro',
      cep: '19470-000',
      cidade: 'Presidente Epitácio',
      uf: 'SP',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      turmaId: turmas[0],
      ra: '321.654.987.003-X',
      nome: 'Carlos Souza',
      nomeMae: 'Fernanda Souza',
      cpf: '73925936092',
      dataNascimento: new Date('2019-03-10'),
      celular: '11998765432',
      sexo: 'M',
      raca: 'Negro',
      beneficiarioBF: false,
      logradouro: 'Rua Álvaro Coelho',
      numero: '789',
      bairro: 'Centro',
      cep: '19470-000',
      cidade: 'Presidente Epitácio',
      uf: 'SP',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      turmaId: turmas[1],
      ra: '654.321.987.004-X',
      nome: 'Mariana Lima',
      nomeMae: 'Sofia Lima',
      cpf: '70656165090',
      dataNascimento: new Date('2020-11-25'),
      celular: '11987654321',
      sexo: 'F',
      raca: 'Branco',
      beneficiarioBF: true,
      logradouro: 'Rua Álvaro Coelho',
      numero: '101',
      bairro: 'Centro',
      cep: '19470-000',
      cidade: 'Presidente Epitácio',
      uf: 'SP',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      turmaId: turmas[1],
      ra: '159.753.486.005-X',
      nome: 'Lucas Martins',
      nomeMae: 'Patrícia Martins',
      cpf: '55908189073',
      dataNascimento: new Date('2018-07-30'),
      celular: '11912345678',
      sexo: 'M',
      raca: 'Pardo',
      beneficiarioBF: false,
      logradouro: 'Rua Álvaro Coelho',
      numero: '202',
      bairro: 'Centro',
      cep: '19470-000',
      cidade: 'Presidente Epitácio',
      uf: 'SP',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      turmaId: turmas[1],
      ra: '753.159.486.006-X',
      nome: 'Julia Costa',
      nomeMae: 'Eliane Costa',
      cpf: '48067078050',
      dataNascimento: new Date('2022-01-15'),
      celular: '11987654321',
      sexo: 'F',
      raca: 'Branco',
      beneficiarioBF: true,
      logradouro: 'Rua Álvaro Coelho',
      numero: '303',
      bairro: 'Centro',
      cep: '19470-000',
      cidade: 'Presidente Epitácio',
      uf: 'SP',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  for (const aluno of alunos) {
    await prisma.aluno.create({
      data: aluno,
    });
  }

  console.log('\t\t✔  Seeding de Alunos concluído.');
}