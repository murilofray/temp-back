import { PrismaClient, TipoDocumentoEnum } from '@prisma/client';
import bcrypt from 'bcrypt';
import { NivelAcessoEnum } from '../../src/enum/NivelAcessoEnum';

export async function SeedComum(prisma: PrismaClient) {
  console.log('\t🕤 Seedind das tabelas comuns aos módulos.');

  const idEscola: number[] = await seedEscola(prisma);
  await seedImagem(idEscola, prisma);
  await seedTelefone(idEscola, prisma);
  await seedNivelAcesso(prisma);
  const idServidor = await seedServidor(idEscola, prisma);
  await seedNivelAcessoServidor(idServidor, prisma);
  await seedTipoDocumento(prisma);

  console.log('\t✔  Seedind comum concluído.');

  return { idEscola, idServidor };
}

async function seedEscola(prisma: PrismaClient) {
  let idEscola: number[] = [];
  const registrosEscola = [
    {
      nome: 'Escola A',
      cnpj: '83941020000194',
      inep: '1254785456',
      atoCriacao: 'Lei nº 1085/1996',
      endereco: 'Rua 1, 123',
      email: 'escola_a@escola.com',
    },
    {
      nome: 'Escola B',
      cnpj: '88897653000166',
      inep: '1254785456',
      atoCriacao: 'Lei nº 998/1996',
      endereco: 'Rua 2, 456',
      email: 'escola_b@escola.com',
    },
    {
      nome: 'Escola C',
      cnpj: '04369589000150',
      inep: '1254785456',
      atoCriacao: 'Lei nº 1085/1996',
      endereco: 'Rua 3, 789',
      email: 'escola_c@escola.com',
    },
  ];

  for (const registro of registrosEscola) {
    const resposta = await prisma.escola.create({
      data: {
        ...registro,
        createdAt: new Date(),
      },
    });
    idEscola.push(resposta.id);
  }
  console.log('\t\t✔  Seeding de Escolas concluído.');
  return idEscola;
}

async function seedImagem(idEscola: number[], prisma: PrismaClient) {
  const registrosImagem = [
    {
      caminho: '',
    },
    {
      caminho: '',
    },
    {
      caminho: '',
    },
  ];

  let escolaid = 0;
  for (const registro of registrosImagem) {
    const resposta = await prisma.imagens.create({
      data: {
        ...registro,
        createdAt: new Date(),
      },
    });

    await prisma.escola.update({
      where: {
        id: Number(idEscola[escolaid]),
      },
      data: {
        imagensId: resposta.id,
      },
    });

    escolaid++;
  }
  console.log('\t\t✔  Seeding de Imagens de Escolas concluído.');
}

async function seedTelefone(idEscola: number[], prisma: PrismaClient) {
  const registrosTelefone = [
    { numero: '18456321478' },
    { numero: '18014774747' },
    { numero: '14235142514' },
    { numero: '10321547845' },
    { numero: '10215453654' },
    { numero: '10333332125' },
  ];

  let telefoneIndex = 0;

  for (const escolaId of idEscola) {
    for (let i = 0; i < 2; i++) {
      // Cada escola recebe 2 telefones
      const registro = registrosTelefone[telefoneIndex];

      const resposta = await prisma.telefone.create({
        data: {
          ...registro,
          escolaId: escolaId, // Atribui o ID da escola atual
          createdAt: new Date(),
        },
      });
    }
    telefoneIndex++; // Avança para o próximo telefone
  }

  console.log('\t\t✔  Seeding de Telefones de Escolas concluído.');
}

async function seedNivelAcesso(prisma: PrismaClient) {
  for (const registro of Object.values(NivelAcessoEnum)) {
    const resposta = await prisma.nivelAcesso.create({
      data: {
        ...registro,
      },
    });
  }
  console.log('\t\t✔  Seeding de Níveis de Acesso concluído.');
}

async function seedServidor(idEscola: number[], prisma: PrismaClient) {
  let idServidor: number[] = [];
  const SALT_ROUNDS = 10;

  const registrosServidores = [
    //0
    {
      escolaId: idEscola[0],
      nome: 'Diretor A',
      rg: '341471100',
      cpf: '34231428042',
      dataContratacao: new Date('2021-01-01'),
      categoria: '',
      grau: '',
      pontuacaoAnual: 0,
      pontuacaoAssiduidade: 0,
      email: 'diretor-a@escola.com',
      senha: await bcrypt.hash('12345', SALT_ROUNDS),
    },
    //1
    {
      escolaId: idEscola[0],
      nome: 'Vice-Diretor A',
      rg: '373331150',
      cpf: '05234191044',
      dataContratacao: new Date('2021-01-01'),
      categoria: '',
      grau: '',
      pontuacaoAnual: 0,
      pontuacaoAssiduidade: 0,
      email: 'vice-a@escola.com',
      senha: await bcrypt.hash('12345', SALT_ROUNDS),
    },
    //2
    {
      escolaId: idEscola[0],
      nome: 'APM da Escola A',
      rg: '400305458',
      cpf: '33663626008',
      dataContratacao: new Date('2021-01-01'),
      categoria: '',
      grau: '',
      pontuacaoAnual: 0,
      pontuacaoAssiduidade: 0,
      email: 'apm-a@escola.com',
      senha: await bcrypt.hash('12345', SALT_ROUNDS),
    },
    //3
    {
      escolaId: idEscola[0],
      nome: 'Docente A',
      rg: '489724127',
      cpf: '23995838090',
      dataContratacao: new Date('2021-01-01'),
      categoria: '',
      grau: '',
      pontuacaoAnual: 0,
      pontuacaoAssiduidade: 0,
      email: 'professor-a@escola.com',
      senha: await bcrypt.hash('12345', SALT_ROUNDS),
    },
    //4
    {
      escolaId: idEscola[0],
      nome: 'Coordenador A',
      rg: '151241521',
      cpf: '11328378047',
      dataContratacao: new Date('2021-01-01'),
      categoria: '',
      grau: '',
      pontuacaoAnual: 0,
      pontuacaoAssiduidade: 0,
      email: 'coordenador-a@escola.com',
      senha: await bcrypt.hash('12345', SALT_ROUNDS),
    },
    //5
    {
      escolaId: idEscola[0],
      nome: 'Escriturário A',
      rg: '325491689',
      cpf: '50528168045',
      dataContratacao: new Date('2021-01-01'),
      categoria: '',
      grau: '',
      pontuacaoAnual: 0,
      pontuacaoAssiduidade: 0,
      email: 'escrituario-a@escola.com',
      senha: await bcrypt.hash('12345', SALT_ROUNDS),
    },
    //6
    {
      escolaId: idEscola[0],
      nome: 'Docente e APM A',
      rg: '498838365',
      cpf: '76264800074',
      dataContratacao: new Date('2021-01-01'),
      categoria: '',
      grau: '',
      pontuacaoAnual: 0,
      pontuacaoAssiduidade: 0,
      email: 'docente-apm-a@escola.com',
      senha: await bcrypt.hash('12345', SALT_ROUNDS),
    },
    //7
    {
      escolaId: idEscola[0],
      nome: 'Docente Diretor Temporário A',
      rg: '000000005',
      cpf: '06742875097',
      dataContratacao: new Date('2021-01-01'),
      categoria: '',
      grau: '',
      pontuacaoAnual: 0,
      pontuacaoAssiduidade: 0,
      email: 'temporario-a@escola.com',
      senha: await bcrypt.hash('12345', SALT_ROUNDS),
    },
    // 8
    {
      escolaId: idEscola[1],
      nome: 'Diretor B',
      rg: '301779119',
      cpf: '90120695057',
      dataContratacao: new Date('2021-01-01'),
      categoria: '',
      grau: '',
      pontuacaoAnual: 0,
      pontuacaoAssiduidade: 0,
      email: 'diretor-b@escola.com',
      senha: await bcrypt.hash('12345', SALT_ROUNDS),
    },
    //9
    {
      escolaId: idEscola[1],
      nome: 'Vice-Diretor B',
      rg: '320676006',
      cpf: '55050636086',
      dataContratacao: new Date('2021-01-01'),
      categoria: '',
      grau: '',
      pontuacaoAnual: 0,
      pontuacaoAssiduidade: 0,
      email: 'vice-b@escola.com',
      senha: await bcrypt.hash('12345', SALT_ROUNDS),
    },
    //10
    {
      escolaId: idEscola[1],
      nome: 'APM da Escola B',
      rg: '121174505',
      cpf: '55805929066',
      dataContratacao: new Date('2021-01-01'),
      categoria: '',
      grau: '',
      pontuacaoAnual: 0,
      pontuacaoAssiduidade: 0,
      email: 'apm-b@escola.com',
      senha: await bcrypt.hash('12345', SALT_ROUNDS),
    },
    //11
    {
      escolaId: idEscola[1],
      nome: 'Docente B',
      rg: '131232393',
      cpf: '63497110094',
      dataContratacao: new Date('2021-01-01'),
      categoria: '',
      grau: '',
      pontuacaoAnual: 0,
      pontuacaoAssiduidade: 0,
      email: 'professor-b@escola.com',
      senha: await bcrypt.hash('12345', SALT_ROUNDS),
    },
    //12
    {
      escolaId: idEscola[1],
      nome: 'Coordenador B',
      rg: '140473889',
      cpf: '90853832005',
      dataContratacao: new Date('2021-01-01'),
      categoria: '',
      grau: '',
      pontuacaoAnual: 0,
      pontuacaoAssiduidade: 0,
      email: 'coordenador-b@escola.com',
      senha: await bcrypt.hash('12345', SALT_ROUNDS),
    },
    //13
    {
      escolaId: idEscola[1],
      nome: 'Escriturário B',
      rg: '469954267',
      cpf: '92684366047',
      dataContratacao: new Date('2021-01-01'),
      categoria: '',
      grau: '',
      pontuacaoAnual: 0,
      pontuacaoAssiduidade: 0,
      email: 'escrituario-b@escola.com',
      senha: await bcrypt.hash('12345', SALT_ROUNDS),
    },
    //14
    {
      escolaId: idEscola[1],
      nome: 'Docente e APM B',
      rg: '317502050',
      cpf: '40041753054',
      dataContratacao: new Date('2021-01-01'),
      categoria: '',
      grau: '',
      pontuacaoAnual: 0,
      pontuacaoAssiduidade: 0,
      email: 'docente-apm-b@escola.com',
      senha: await bcrypt.hash('12345', SALT_ROUNDS),
    },
    //15
    {
      escolaId: idEscola[2],
      nome: 'Diretor C',
      rg: '153238756',
      cpf: '55142025008',
      dataContratacao: new Date('2021-01-01'),
      categoria: '',
      grau: '',
      pontuacaoAnual: 0,
      pontuacaoAssiduidade: 0,
      email: 'diretor-c@escola.com',
      senha: await bcrypt.hash('12345', SALT_ROUNDS),
    },
    //16
    {
      escolaId: idEscola[2],
      nome: 'Vice-Diretor C',
      rg: '348136316',
      cpf: '60321891040',
      dataContratacao: new Date('2021-01-01'),
      categoria: '',
      grau: '',
      pontuacaoAnual: 0,
      pontuacaoAssiduidade: 0,
      email: 'vice-c@escola.com',
      senha: await bcrypt.hash('12345', SALT_ROUNDS),
    },
    //17
    {
      escolaId: undefined,
      nome: 'Secretário da Educação',
      rg: '326652668',
      cpf: '57129674059',
      dataContratacao: new Date('2021-01-01'),
      categoria: '',
      grau: '',
      pontuacaoAnual: 0,
      pontuacaoAssiduidade: 0,
      email: 'sec-educacao@escola.com',
      senha: await bcrypt.hash('12345', SALT_ROUNDS),
    },
  ];

  for (const registro of registrosServidores) {
    const resposta = await prisma.servidor.create({
      data: {
        ...registro,
        createdAt: new Date(),
      },
    });
    idServidor.push(resposta.id);
  }
  console.log('\t\t✔  Seeding de Servidores concluído.');
  return idServidor;
}
async function seedNivelAcessoServidor(idServidor: number[], prisma: PrismaClient) {
  const registrosNivelAcessoServidor = [
    {
      servidorId: idServidor[0],
      nivelAcessoId: NivelAcessoEnum.DIRETOR.id,
    },
    {
      servidorId: idServidor[1],
      nivelAcessoId: NivelAcessoEnum.VICE_DIRETOR.id,
    },
    {
      servidorId: idServidor[2],
      nivelAcessoId: NivelAcessoEnum.APM.id,
    },
    {
      servidorId: idServidor[3],
      nivelAcessoId: NivelAcessoEnum.DOCENTE.id,
    },
    {
      servidorId: idServidor[4],
      nivelAcessoId: NivelAcessoEnum.COORDENADOR.id,
    },
    {
      servidorId: idServidor[5],
      nivelAcessoId: NivelAcessoEnum.ESCRITUARIO.id,
    },
    {
      servidorId: idServidor[6],
      nivelAcessoId: NivelAcessoEnum.DOCENTE.id,
    },
    {
      servidorId: idServidor[6],
      nivelAcessoId: NivelAcessoEnum.APM.id,
    },
    {
      servidorId: idServidor[7],
      nivelAcessoId: NivelAcessoEnum.DOCENTE.id,
      diretorTemporario: true,
    },
    {
      servidorId: idServidor[8],
      nivelAcessoId: NivelAcessoEnum.DIRETOR.id,
    },
    {
      servidorId: idServidor[9],
      nivelAcessoId: NivelAcessoEnum.VICE_DIRETOR.id,
    },
    {
      servidorId: idServidor[10],
      nivelAcessoId: NivelAcessoEnum.APM.id,
    },
    {
      servidorId: idServidor[11],
      nivelAcessoId: NivelAcessoEnum.DOCENTE.id,
    },
    {
      servidorId: idServidor[12],
      nivelAcessoId: NivelAcessoEnum.COORDENADOR.id,
    },
    {
      servidorId: idServidor[13],
      nivelAcessoId: NivelAcessoEnum.ESCRITUARIO.id,
    },
    {
      servidorId: idServidor[14],
      nivelAcessoId: NivelAcessoEnum.DOCENTE.id,
    },
    {
      servidorId: idServidor[14],
      nivelAcessoId: NivelAcessoEnum.APM.id,
    },
    {
      servidorId: idServidor[15],
      nivelAcessoId: NivelAcessoEnum.DIRETOR.id,
    },
    {
      servidorId: idServidor[16],
      nivelAcessoId: NivelAcessoEnum.VICE_DIRETOR.id,
    },
    {
      servidorId: idServidor[17],
      nivelAcessoId: NivelAcessoEnum.ADMINISTRADOR.id,
    },
  ];

  for (const registro of registrosNivelAcessoServidor) {
    await prisma.nivelAcessoServidor.create({
      data: {
        ...registro,
      },
    });
  }

  console.log('\t\t✔  Seeding de Nível de Acesso para Servidores concluído.');
}

async function seedTipoDocumento(prisma: PrismaClient) {
  for (const registro of Object.values(TipoDocumentoEnum)) {
    const resposta = await prisma.tipoDocumento.create({
      data: {
        descricao: registro,
      },
    });
  }
  console.log('\t\t✔  Seeding de Tipos de Documentos concluído.');
}
