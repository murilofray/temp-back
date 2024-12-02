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
    {
      turmaId: turmas[0],
      ra: '111.222.333.007-X',
      nome: 'Fernanda Almeida',
      nomeMae: 'Luciana Almeida',
      cpf: '18824929001',
      dataNascimento: new Date('2020-04-10'),
      celular: '11987654322',
      sexo: 'F',
      raca: 'Indígena',
      beneficiarioBF: false,
      logradouro: 'Rua das Flores',
      numero: '10',
      bairro: 'Jardim Alto do Mirante I',
      cep: '19470-000',
      cidade: 'Presidente Epitácio',
      uf: 'SP',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      turmaId: turmas[0],
      ra: '222.333.444.008-X',
      nome: 'Ricardo Oliveira',
      nomeMae: 'Mariana Oliveira',
      cpf: '91961833069',
      dataNascimento: new Date('2019-09-15'),
      celular: '11912345679',
      sexo: 'M',
      raca: 'Amarelo',
      beneficiarioBF: true,
      logradouro: 'Rua das Palmeiras',
      numero: '20',
      bairro: 'Jardim dos Pioneiros',
      cep: '19470-000',
      cidade: 'Presidente Epitácio',
      uf: 'SP',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      turmaId: turmas[1],
      ra: '333.444.555.009-X',
      nome: 'Sofia Martins',
      nomeMae: 'Eliane Martins',
      cpf: '64484599015',
      dataNascimento: new Date('2021-01-20'),
      celular: '11998765433',
      sexo: 'F',
      raca: 'Branco',
      beneficiarioBF: false,
      logradouro: 'Rua do Sol',
      numero: '30',
      bairro: 'Vila São José',
      cep: '19470-000',
      cidade: 'Presidente Epitácio',
      uf: 'SP',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      turmaId: turmas[1],
      ra: '444.555.666.010-X',
      nome: 'Gustavo Lima',
      nomeMae: 'Patrícia Lima',
      cpf: '98461713079',
      dataNascimento: new Date('2018-06-25'),
      celular: '11912345680',
      sexo: 'M',
      raca: 'Pardo',
      beneficiarioBF: true,
      logradouro: 'Rua da Esperança',
      numero: '40',
      bairro: 'Vila Palmira',
      cep: '19470-000',
      cidade: 'Presidente Epitácio',
      uf: 'SP',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      turmaId: turmas[0],
      ra: '555.666.777.011-X',
      nome: 'Tatiane Costa',
      nomeMae: 'Ana Costa',
      cpf: '58398877065',
      dataNascimento: new Date('2022-02-05'),
      celular: '11987654323',
      sexo: 'F',
      raca: 'Preto',
      beneficiarioBF: false,
      logradouro: 'Rua da Liberdade',
      numero: '50',
      bairro: 'Vila Porã',
      cep: '19470-000',
      cidade: 'Presidente Epitácio',
      uf: 'SP',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      turmaId: turmas[1],
      ra: '666.777.888.012-X',
      nome: 'Felipe Santos',
      nomeMae: 'Clara Santos',
      cpf: '52733431005',
      dataNascimento: new Date('2019-11-30'),
      celular: '11912345681',
      sexo: 'M',
      raca: 'Branco',
      beneficiarioBF: true,
      logradouro: 'Rua da Amizade',
      numero: '60',
      bairro: 'Village Lagoinha',
      cep: '19470-000',
      cidade: 'Presidente Epitácio',
      uf: 'SP',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      turmaId: turmas[0],
      ra: '777.888.999.013-X',
      nome: 'Marcos Paulo',
      nomeMae: 'Sandra Paulo',
      cpf: '86629041062',
      dataNascimento: new Date('2020-03-18'),
      celular: '11912345682',
      sexo: 'M',
      raca: 'Pardo',
      beneficiarioBF: false,
      logradouro: 'Rua da Vitória',
      numero: '70',
      bairro: 'Vila Porto Tibiriça',
      cep: '19470-000',
      cidade: 'Presidente Epitácio',
      uf: 'SP',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      turmaId: turmas[1],
      ra: '888.999.000.014-X',
      nome: 'Isabela Ferreira',
      nomeMae: 'Juliana Ferreira',
      cpf: '00973033053',
      dataNascimento: new Date('2021-05-22'),
      celular: '11987654324',
      sexo: 'F',
      raca: 'Indígena',
      beneficiarioBF: true,
      logradouro: 'Rua do Progresso',
      numero: '80',
      bairro: 'Jardim Tropical',
      cep: '19470-000',
      cidade: 'Presidente Epitácio',
      uf: 'SP',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      turmaId: turmas[0],
      ra: '999.000.111.015-X',
      nome: 'Leonardo Rocha',
      nomeMae: 'Cecília Rocha',
      cpf: '02078575046',
      dataNascimento: new Date('2019-12-12'),
      celular: '11912345683',
      sexo: 'M',
      raca: 'Amarelo',
      beneficiarioBF: false,
      logradouro: 'Rua da Paz',
      numero: '90',
      bairro: 'Jardim Primavera',
      cep: '19470-000',
      cidade: 'Presidente Epitácio',
      uf: 'SP',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      turmaId: turmas[0],
      ra: '101.202.303.016-X',
      nome: 'Camila Andrade',
      nomeMae: 'Renata Andrade',
      cpf: '89172832096',
      dataNascimento: new Date('2020-07-14'),
      celular: '11987654325',
      sexo: 'F',
      raca: 'Branco',
      beneficiarioBF: true,
      logradouro: 'Rua do Comércio',
      numero: '11',
      bairro: 'Vila Martins',
      cep: '19470-000',
      cidade: 'Presidente Epitácio',
      uf: 'SP',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      turmaId: turmas[1],
      ra: '202.303.404.017-X',
      nome: 'Thiago Mendes',
      nomeMae: 'Patrícia Mendes',
      cpf: '34106270064',
      dataNascimento: new Date('2019-10-05'),
      celular: '11912345684',
      sexo: 'M',
      raca: 'Pardo',
      beneficiarioBF: false,
      logradouro: 'Rua da Alegria',
      numero: '22',
      bairro: 'Jardim Alto do Mirante II',
      cep: '19470-000',
      cidade: 'Presidente Epitácio',
      uf: 'SP',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      turmaId: turmas[0],
      ra: '303.404.505.018-X',
      nome: 'Juliana Ribeiro',
      nomeMae: 'Sofia Ribeiro',
      cpf: '48032983007',
      dataNascimento: new Date('2021-03-30'),
      celular: '11998765434',
      sexo: 'F',
      raca: 'Negro',
      beneficiarioBF: true,
      logradouro: 'Rua da Liberdade',
      numero: '33',
      bairro: 'Vila São José',
      cep: '19470-000',
      cidade: 'Presidente Epitácio',
      uf: 'SP',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      turmaId: turmas[1],
      ra: '404.505.606.019-X',
      nome: 'Rafael Costa',
      nomeMae: 'Eliane Costa',
      cpf: '00868661090',
      dataNascimento: new Date('2018-08-15'),
      celular: '11912345685',
      sexo: 'M',
      raca: 'Indígena',
      beneficiarioBF: false,
      logradouro: 'Rua do Futuro',
      numero: '44',
      bairro: 'Jardim dos Pioneiros',
      cep: '19470-000',
      cidade: 'Presidente Epitácio',
      uf: 'SP',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      turmaId: turmas[0],
      ra: '505.606.707.020-X',
      nome: 'Bianca Lima',
      nomeMae: 'Clara Lima',
      cpf: '18852541055',
      dataNascimento: new Date('2022-04-20'),
      celular: '11987654326',
      sexo: 'F',
      raca: 'Branco',
      beneficiarioBF: true,
      logradouro: 'Rua da Esperança',
      numero: '55',
      bairro: 'Vila Palmira',
      cep: '19470-000',
      cidade: 'Presidente Epitácio',
      uf: 'SP',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      turmaId: null,
      ra: '606.707.808.021-X',
      nome: 'Eduardo Santos',
      nomeMae: 'Mariana Santos',
      cpf: '30657053031',
      dataNascimento: new Date('2019-02-28'),
      celular: '11912345686',
      sexo: 'M',
      raca: 'Amarelo',
      beneficiarioBF: false,
      logradouro: 'Rua da Vitória',
      numero: '66',
      bairro: 'Village Lagoinha',
      cep: '19470-000',
      cidade: 'Presidente Epitácio',
      uf: 'SP',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      turmaId: null,
      ra: '707.808.909.022-X',
      nome: ' Mariana Ferreira',
      nomeMae: 'Cecília Ferreira',
      cpf: '18426976093',
      dataNascimento: new Date('2020-09-12'),
      celular: '11987654327',
      sexo: 'F',
      raca: 'Preto',
      beneficiarioBF: true,
      logradouro: 'Rua da Paz',
      numero: '77',
      bairro: 'Vila Porto Tibiriça',
      cep: '19470-000',
      cidade: 'Presidente Epitácio',
      uf: 'SP',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      turmaId: null,
      ra: '808.909.010.023-X',
      nome: 'Lucas Almeida',
      nomeMae: 'Renata Almeida',
      cpf: '26583663023',
      dataNascimento: new Date('2021-06-18'),
      celular: '11912345687',
      sexo: 'M',
      raca: 'Branco',
      beneficiarioBF: false,
      logradouro: 'Rua do Comércio',
      numero: '88',
      bairro: 'Jardim Tropical',
      cep: '19470-000',
      cidade: 'Presidente Epitácio',
      uf: 'SP',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      turmaId: null,
      ra: '909.010.111.024-X',
      nome: 'Gabriel Martins',
      nomeMae: 'Patrícia Martins',
      cpf: '93256087078',
      dataNascimento: new Date('2019-04-25'),
      celular: '11998765435',
      sexo: 'M',
      raca: 'Indígena',
      beneficiarioBF: true,
      logradouro: 'Rua da Liberdade',
      numero: '99',
      bairro: 'Jardim Primavera',
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