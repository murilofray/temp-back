import { PrismaClient } from '@prisma/client';
import path from 'path';
import { TipoDocumentoEnum } from '../../src/enum/TipoDocumentoEnum';
import * as fs from 'fs';

/**
 * Esta função cria e salva um novo registro de DocumentoScan no banco de dados.
 *
 * @param {PrismaClient} prisma - A instância do cliente Prisma para interagir com o banco de dados.
 * @param {tde} TipoDocumentoEnum - O objeto TipoDocumentoEnum contendo os dados necessários para criar o registro de DocumentoScan.
 *
 * @returns - Uma Promise que resolve para o registro de DocumentoScan recém-criado.
 */
export async function createAndSaveDocumento(prisma: PrismaClient, tde: TipoDocumentoEnum) {
  const arquivoSeedOriginal = path.resolve('uploads/seed/arquivo-seed.pdf');
  const caminhoRelativo = `arquivo-seed-${new Date().toISOString().replace(/:/g, '-')}.pdf`;
  const caminhoAbsolutoDestino = path.resolve('uploads', tde.caminho, caminhoRelativo);

  // Criação do documento no banco de dados
  const respostaDoc = await prisma.documentoScan.create({
    data: {
      tipoDocumentoId: tde.id,
      caminho: path.join(tde.caminho, caminhoRelativo),
      createdAt: new Date(),
    },
  });

  fs.mkdir(path.dirname(caminhoAbsolutoDestino), { recursive: true }, (err) => {
    if (err) {
      console.error('Erro ao criar a pasta:', err);
      return;
    }

    fs.copyFile(arquivoSeedOriginal, caminhoAbsolutoDestino, (err) => {
      if (err) {
        console.error('Erro ao copiar o arquivo:', err);
      }
    });
  });
  return respostaDoc;
}

export function clearUploadsDirectory() {
  const uploadsDir = path.resolve('uploads'); // Caminho absoluto para o diretório uploads
  const seedDir = path.resolve(uploadsDir, 'seed'); // Caminho absoluto para a pasta seed
  const arquivoSeedPath = path.resolve(seedDir, 'arquivo-seed.pdf'); // Caminho absoluto para o arquivo arquivo-seed.pdf

  // Lê o conteúdo do diretório uploads
  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      console.error('Erro ao ler o diretório "uploads":', err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.resolve(uploadsDir, file);
      // Se for a pasta 'seed' ou o arquivo 'arquivo-seed.pdf', não faça nada
      if (filePath === seedDir || filePath === arquivoSeedPath) {
        return;
      }

      // Verifica se o item é um diretório
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error('Erro ao verificar o arquivo:', filePath, err);
          return;
        }

        if (stats.isDirectory()) {
          // Se for um diretório, remove recursivamente
          fs.rm(filePath, { recursive: true, force: true }, (err) => {
            if (err) {
              console.error('Erro ao remover a pasta:', filePath, err);
            }
          });
        } else {
          // Se for um arquivo, remove-o
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error('Erro ao remover o arquivo:', filePath, err);
            }
          });
        }
      });
    });
    console.log('\n✔  Limpeza do diretório "uploads" concluída!');
  });
}

/**
 * Esta função gera uma data aleatória dentro do ano atual.
 *
 * @returns {Date} - Uma data aleatória dentro do ano atual, entre 1º de janeiro e a data atual.
 *
 * @observações
 * A função funciona da seguinte maneira:
 * 1. Obtém o início do ano atual (1º de janeiro).
 * 2. Obtém a data atual (hoje).
 * 3. Calcula a diferença em milissegundos entre a data atual e o início do ano.
 * 4. Converte essa diferença de milissegundos para dias.
 * 5. Gera um número aleatório dentro desse intervalo de dias.
 * 6. Cria um novo objeto Date adicionando esse número de dias aleatórios ao início do ano.
 */
export function gerarDataAleatoria(): Date {
  // 1. Obtém a data de início do ano (01 de janeiro do ano atual)
  const inicioAno = new Date(new Date().getFullYear(), 0, 1);
  // 2. Obtém a data de hoje
  const hoje = new Date();
  // 3. Gera um valor aleatório entre o início do ano e hoje
  const intervalo = hoje.getTime() - inicioAno.getTime() ; // Diferença em milissegundos
  const intervaloEmDias = Math.floor(intervalo / (24 * 60 * 60 * 1000));
  // 4. Gera um número aleatório dentro desse intervalo
  const aleatorio = Math.floor(Math.random() * intervaloEmDias);
  // 5. Cria a data aleatória
  const dataAleatoria = new Date(inicioAno.getTime() + (aleatorio * (24 * 60 * 60 * 1000)));
  return dataAleatoria;
}

