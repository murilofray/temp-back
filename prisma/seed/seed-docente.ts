import { PrismaClient } from '@prisma/client';

export async function SeedDocente(idEscola: number[], idServidor: number[], prisma: PrismaClient) {
  console.log('\t🕤 Seedind das tabelas do Módulo de Gestão de Docentes.');

  // Chamar as funções para cada tabela

  console.log('\t✔  Seedind Gestão de Docentes concluído.');

  return { idEscola, idServidor };
}

// Funções de seed específicas para cada tabela
