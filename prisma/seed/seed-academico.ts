import { PrismaClient } from '@prisma/client';

export async function SeedAcademica(idEscola: number[], idServidor: number[], prisma: PrismaClient) {
  console.log('\t🕤 Seedind das tabelas do Módulo de Gestão Acadêmica.');

  const tipoAlergiaIds = await seedTipoAlergia(prisma);
  await seedAlergias(tipoAlergiaIds, prisma);
  await seedTurmas(prisma, idEscola, idServidor);

  console.log('\t✔  Seedind Gestão Acadêmica concluído.');

  return { idEscola, idServidor };
}

async function seedTurmas(prisma: PrismaClient, idEscola: number[], idServidor: number[]) {
  const turmas = [
    { escolaId: idEscola[0], servidorId: idServidor[1], anoLetivo: 2024, ano: 'Pré 1', letra: 'A' }, 
    { escolaId: idEscola[2], servidorId: idServidor[6], anoLetivo: 2024, ano: '2º ano', letra: 'A' }, 
  ];

  for (const turma of turmas) {
    await prisma.turma.create({
      data: {
        escolaId: turma.escolaId,
        servidorId: turma.servidorId,
        anoLetivo: turma.anoLetivo,
        ano: turma.ano,
        letra: turma.letra,
        createdAt: new Date(),
      },
    });
  }

  console.log('\t\t✔  Seeding de Turmas concluído.');
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