import { PrismaClient } from '@prisma/client';
import { SeedComum } from './seed/seed-comum';
import { SeedPrestacao } from './seed/seed-prestacao';
import { SeedAcademica } from './seed/seed-academico';
import { SeedDocente } from './seed/seed-docente';
const prisma = new PrismaClient();

async function main() {
  console.log('🕤 Iniciando seeding...');

  try {
    // Executa as seeds
    const { idEscola, idServidor } = await SeedComum(prisma);
    await SeedPrestacao(idEscola, idServidor, prisma);
    await SeedAcademica(idEscola, idServidor, prisma);
    await SeedDocente(idEscola, idServidor, prisma);

    console.log('\n✔  Seeding concluído!');
  } catch (error) {
    console.error('❌ Erro durante o seeding:\n', error);
  } finally {
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
