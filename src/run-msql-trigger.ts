import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Carregar variáveis de ambiente
dotenv.config();

/**
 * Dividir os comandos SQL por `$` e executar um a um
 * @param triggerSQL
 * @returns
 */
function splitComandos(triggerSQL: any) {
  return triggerSQL
    .split('$')
    .map((comando: any) => comando.trim())
    .filter((comando: any) => comando.length > 0);
}

async function aplicarTriggers() {
  // Conexão com o banco de dados usando variáveis de ambiente
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
      rejectUnauthorized: false // Aceita certificados inválidos, similar ao parâmetro `sslaccept=accept_invalid_certs`
    }
  });

  try {
    console.log('Conectado ao banco de dados.');

    // Carregar o arquivo SQL das triggers
    // Cada trigger deve finalizar com um `$` para separar cada uma delas
    let triggerSQL = fs.readFileSync(path.join(__dirname, 'trigger/movimentacao-financeira.sql'), 'utf8');

    // Dividir os comandos SQL por `$` e executar um a um
    let comandos = splitComandos(triggerSQL);

    // Executar cada comando SQL
    for (const comando of comandos) {
      try {
        await connection.query(comando);
      } catch (error: any) {
        if (error.errno === 1359) console.log(`Trigger já existe.`);
      }
    }

    let triggersEEventsOcorrenciasSQL = fs.readFileSync(path.join(__dirname, 'trigger/ocorrencia-servidor.sql'), 'utf8');

    // Dividir os comandos SQL por `$` e executar um a um
    comandos = splitComandos(triggersEEventsOcorrenciasSQL);

    // Executar cada comando SQL
    for (const comando of comandos) {
      try {
        await connection.query(comando);
      } catch (error: any) {
        if (error) console.log(`\nErro ao criar triggers ou eventos.`);
      }
    }

    // Caso for inserir outras triggers, apenas repetir os passos ai nas linhas abaixo

    console.log('Triggers aplicadas com sucesso.');
  } catch (error: any) {
    console.error('Erro ao aplicar triggers:', error);
  } finally {
    // Fechar a conexão
    await connection.end();
    console.log('Conexão com o banco de dados encerrada.');
  }
}

// Executar o script
aplicarTriggers();
