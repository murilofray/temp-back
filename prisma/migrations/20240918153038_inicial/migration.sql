-- CreateTable
CREATE TABLE `Escola` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(45) NOT NULL,
    `cnpj` VARCHAR(14) NOT NULL,
    `inep` VARCHAR(30) NOT NULL,
    `ato_criacao` VARCHAR(60) NOT NULL,
    `endereco` VARCHAR(45) NOT NULL,
    `email` VARCHAR(90) NOT NULL,
    `imagens_id` INTEGER NOT NULL,
    `apm_id` INTEGER NOT NULL,
    `diretor_id` INTEGER NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Diretor` (
    `escola_id` INTEGER NOT NULL,
    `servidor_id` INTEGER NOT NULL,

    UNIQUE INDEX `Diretor_escola_id_key`(`escola_id`),
    UNIQUE INDEX `Diretor_servidor_id_key`(`servidor_id`),
    PRIMARY KEY (`escola_id`, `servidor_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Servidor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `rg` VARCHAR(11) NULL,
    `cpf` VARCHAR(11) NULL,
    `data_contratacao` DATETIME(3) NULL,
    `categoria` VARCHAR(100) NULL,
    `grau` VARCHAR(10) NULL,
    `pontuacao_anual` INTEGER NULL,
    `pontuacao_assiduidade` INTEGER NULL,
    `tipo_servidor` VARCHAR(45) NULL,
    `senha` VARCHAR(255) NULL,
    `email` VARCHAR(70) NULL,
    `created_at` DATETIME(3) NULL,
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,
    `escola_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Acesso` (
    `idAcesso` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` INTEGER NOT NULL,

    PRIMARY KEY (`idAcesso`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ServidorAcesso` (
    `servidorId` INTEGER NOT NULL,
    `acessoIdAcesso` INTEGER NOT NULL,

    PRIMARY KEY (`servidorId`, `acessoIdAcesso`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DocumentosScan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `caminho` VARCHAR(255) NOT NULL,
    `tipo_documento_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NULL,
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TipoDocumento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(45) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Imagens` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `caminho` VARCHAR(255) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Telefone` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `numero` VARCHAR(11) NOT NULL,
    `escola_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `APM` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `vigente` INTEGER NOT NULL,
    `data_formacao` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cargo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(45) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ServidorApm` (
    `servidorId` INTEGER NOT NULL,
    `apmId` INTEGER NOT NULL,
    `cargoId` INTEGER NOT NULL,

    PRIMARY KEY (`servidorId`, `apmId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SaldoBancario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `saldo` DECIMAL(8, 2) NOT NULL,
    `data` DATETIME(3) NOT NULL,
    `saldoAnterior` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContaBancaria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `agencia` VARCHAR(10) NOT NULL,
    `num_conta` VARCHAR(10) NOT NULL,
    `banco` VARCHAR(30) NOT NULL,
    `deleted_at` DATETIME(3) NULL,
    `saldo_bancario_id` INTEGER NOT NULL,
    `escola_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SaldoPdde` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `valor` DECIMAL(8, 2) NOT NULL,
    `custeio` DECIMAL(5, 2) NOT NULL,
    `capital` DECIMAL(5, 2) NOT NULL,
    `saldoAnterior` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PDDE` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` VARCHAR(45) NOT NULL,
    `deleted_at` DATETIME(3) NULL,
    `escola_id` INTEGER NOT NULL,
    `conta_bancaria_id` INTEGER NOT NULL,
    `saldo_pdde_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Programa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(50) NOT NULL,
    `deleted_at` DATETIME(3) NULL,
    `pdde_id` INTEGER NOT NULL,
    `prestacao_contas_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PrestacaoContas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ano` DATETIME(3) NOT NULL,
    `entregue` INTEGER NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PesquisaPreco` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(150) NULL,
    `quantidade` INTEGER NOT NULL,
    `deleted_at` DATETIME(3) NULL,
    `prestacao_contas_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MovimentacaoBancaria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data` DATETIME(3) NULL,
    `valor` DECIMAL(8, 2) NULL,
    `conta_bancaria_id` INTEGER NOT NULL,
    `reciboId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ata` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(80) NOT NULL,
    `ata` VARCHAR(191) NOT NULL,
    `data` DATETIME(3) NOT NULL,
    `tipo` VARCHAR(45) NOT NULL,
    `documentos_scan_id` INTEGER NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GerirAta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `deleted_at` DATETIME(3) NULL,
    `apm_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GerirHasAta` (
    `ataId` INTEGER NOT NULL,
    `gerirAtaId` INTEGER NOT NULL,

    PRIMARY KEY (`ataId`, `gerirAtaId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Fornecedor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cnpj` VARCHAR(14) NULL,
    `cpf` VARCHAR(11) NULL,
    `cidade` VARCHAR(45) NOT NULL,
    `endereco` VARCHAR(45) NOT NULL,
    `responsavel` VARCHAR(45) NOT NULL,
    `nome_fantasia` VARCHAR(45) NOT NULL,
    `telefone` VARCHAR(45) NOT NULL,
    `email` VARCHAR(45) NULL,
    `razao_social` VARCHAR(45) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Orcamento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fornecedor_id` INTEGER NOT NULL,
    `documentos_scan_id` INTEGER NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BemProposto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `orcamento_id` INTEGER NOT NULL,
    `nome` VARCHAR(45) NOT NULL,
    `valor` DECIMAL(8, 2) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BemAdquirido` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(45) NOT NULL,
    `bem_proposto_id` INTEGER NOT NULL,
    `nota_fiscal_id` INTEGER NOT NULL,
    `quantidade` INTEGER NOT NULL,
    `valor` DECIMAL(8, 2) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NotaFiscal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `documentos_scan_id` INTEGER NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Abono` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(75) NOT NULL,
    `abona` BOOLEAN NOT NULL,
    `maximo_dias_ano` INTEGER NOT NULL,
    `maximo_dias_mes` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ocorrencia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `lancado_por` INTEGER NOT NULL,
    `data_ocorrencia` DATETIME(3) NOT NULL,
    `atestado` VARCHAR(200) NULL,
    `descricao` VARCHAR(200) NULL,
    `aprovadoPor` INTEGER NULL,
    `servidor_id` INTEGER NOT NULL,
    `abono_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Progressao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data` DATETIME(3) NOT NULL,
    `tipo` VARCHAR(20) NOT NULL,
    `aprovado` BOOLEAN NULL,
    `detalhes` VARCHAR(45) NULL,
    `aprovadoPor` INTEGER NULL,
    `servidor_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Titulo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(75) NOT NULL,
    `instituicao` VARCHAR(75) NOT NULL,
    `data` VARCHAR(45) NOT NULL,
    `tipo` VARCHAR(10) NOT NULL,
    `carga_horaria` INTEGER NOT NULL,
    `pontos` INTEGER NOT NULL,
    `data_conclusao` DATETIME(3) NOT NULL,
    `validade` DATETIME(3) NOT NULL,
    `certificado` VARCHAR(100) NOT NULL,
    `aprovadoPor` INTEGER NULL,
    `servidor_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Quinquenio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data_inicio` DATETIME(3) NOT NULL,
    `data_fim` DATETIME(3) NOT NULL,
    `licenca` BOOLEAN NOT NULL,
    `adicional` DECIMAL(8, 2) NULL,
    `detalhes` VARCHAR(150) NULL,
    `aprovadoPor` INTEGER NULL,
    `servidor_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Turma` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ano_letivo` INTEGER NULL,
    `ano` VARCHAR(4) NULL,
    `letra` CHAR(1) NULL,
    `servidor_id` INTEGER NOT NULL,
    `escola_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Aluno` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ra` VARCHAR(45) NOT NULL,
    `nome` VARCHAR(255) NOT NULL,
    `nome_mae` VARCHAR(255) NULL,
    `data_nascimento` DATETIME(3) NULL,
    `turma_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AlunoDocumentos` (
    `documentosScanId` INTEGER NOT NULL,
    `alunoId` INTEGER NOT NULL,

    PRIMARY KEY (`documentosScanId`, `alunoId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Alergia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(45) NULL,
    `tipo` VARCHAR(45) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AlunoAlergia` (
    `alunoId` INTEGER NOT NULL,
    `alergiaId` INTEGER NOT NULL,

    PRIMARY KEY (`alunoId`, `alergiaId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Questionario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `servidor_id` INTEGER NOT NULL,
    `data_criacao` DATETIME(3) NULL,
    `descricao` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pergunta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `questionario_id` INTEGER NOT NULL,
    `descricao` VARCHAR(191) NULL,
    `tipo` VARCHAR(45) NULL,
    `numero` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Opcao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(191) NULL,
    `pergunta_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `QuestionarioAluno` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `aluno_id` INTEGER NOT NULL,
    `servidor_id` INTEGER NOT NULL,
    `data_inicio` DATETIME(3) NULL,
    `data_fim` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Resposta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `questionario_aluno_id` INTEGER NOT NULL,
    `pergunta_id` INTEGER NOT NULL,
    `resposta` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OpcaoResposta` (
    `opcaoId` INTEGER NOT NULL,
    `respostaId` INTEGER NOT NULL,
    `descricao` VARCHAR(191) NULL,

    PRIMARY KEY (`opcaoId`, `respostaId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Escola` ADD CONSTRAINT `Escola_imagens_id_fkey` FOREIGN KEY (`imagens_id`) REFERENCES `Imagens`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Escola` ADD CONSTRAINT `Escola_apm_id_fkey` FOREIGN KEY (`apm_id`) REFERENCES `APM`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Diretor` ADD CONSTRAINT `Diretor_servidor_id_fkey` FOREIGN KEY (`servidor_id`) REFERENCES `Servidor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Diretor` ADD CONSTRAINT `Diretor_escola_id_fkey` FOREIGN KEY (`escola_id`) REFERENCES `Escola`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Servidor` ADD CONSTRAINT `Servidor_escola_id_fkey` FOREIGN KEY (`escola_id`) REFERENCES `Escola`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ServidorAcesso` ADD CONSTRAINT `ServidorAcesso_servidorId_fkey` FOREIGN KEY (`servidorId`) REFERENCES `Servidor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ServidorAcesso` ADD CONSTRAINT `ServidorAcesso_acessoIdAcesso_fkey` FOREIGN KEY (`acessoIdAcesso`) REFERENCES `Acesso`(`idAcesso`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DocumentosScan` ADD CONSTRAINT `DocumentosScan_tipo_documento_id_fkey` FOREIGN KEY (`tipo_documento_id`) REFERENCES `TipoDocumento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Telefone` ADD CONSTRAINT `Telefone_escola_id_fkey` FOREIGN KEY (`escola_id`) REFERENCES `Escola`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ServidorApm` ADD CONSTRAINT `ServidorApm_servidorId_fkey` FOREIGN KEY (`servidorId`) REFERENCES `Servidor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ServidorApm` ADD CONSTRAINT `ServidorApm_apmId_fkey` FOREIGN KEY (`apmId`) REFERENCES `APM`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ServidorApm` ADD CONSTRAINT `ServidorApm_cargoId_fkey` FOREIGN KEY (`cargoId`) REFERENCES `Cargo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContaBancaria` ADD CONSTRAINT `ContaBancaria_escola_id_fkey` FOREIGN KEY (`escola_id`) REFERENCES `Escola`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContaBancaria` ADD CONSTRAINT `ContaBancaria_saldo_bancario_id_fkey` FOREIGN KEY (`saldo_bancario_id`) REFERENCES `SaldoBancario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PDDE` ADD CONSTRAINT `PDDE_escola_id_fkey` FOREIGN KEY (`escola_id`) REFERENCES `Escola`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PDDE` ADD CONSTRAINT `PDDE_conta_bancaria_id_fkey` FOREIGN KEY (`conta_bancaria_id`) REFERENCES `ContaBancaria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PDDE` ADD CONSTRAINT `PDDE_saldo_pdde_id_fkey` FOREIGN KEY (`saldo_pdde_id`) REFERENCES `SaldoPdde`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Programa` ADD CONSTRAINT `Programa_pdde_id_fkey` FOREIGN KEY (`pdde_id`) REFERENCES `PDDE`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Programa` ADD CONSTRAINT `Programa_prestacao_contas_id_fkey` FOREIGN KEY (`prestacao_contas_id`) REFERENCES `PrestacaoContas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PesquisaPreco` ADD CONSTRAINT `PesquisaPreco_prestacao_contas_id_fkey` FOREIGN KEY (`prestacao_contas_id`) REFERENCES `PrestacaoContas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MovimentacaoBancaria` ADD CONSTRAINT `MovimentacaoBancaria_conta_bancaria_id_fkey` FOREIGN KEY (`conta_bancaria_id`) REFERENCES `ContaBancaria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MovimentacaoBancaria` ADD CONSTRAINT `MovimentacaoBancaria_reciboId_fkey` FOREIGN KEY (`reciboId`) REFERENCES `DocumentosScan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ata` ADD CONSTRAINT `Ata_documentos_scan_id_fkey` FOREIGN KEY (`documentos_scan_id`) REFERENCES `DocumentosScan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GerirAta` ADD CONSTRAINT `GerirAta_apm_id_fkey` FOREIGN KEY (`apm_id`) REFERENCES `APM`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GerirHasAta` ADD CONSTRAINT `GerirHasAta_ataId_fkey` FOREIGN KEY (`ataId`) REFERENCES `Ata`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GerirHasAta` ADD CONSTRAINT `GerirHasAta_gerirAtaId_fkey` FOREIGN KEY (`gerirAtaId`) REFERENCES `GerirAta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Orcamento` ADD CONSTRAINT `Orcamento_fornecedor_id_fkey` FOREIGN KEY (`fornecedor_id`) REFERENCES `Fornecedor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Orcamento` ADD CONSTRAINT `Orcamento_documentos_scan_id_fkey` FOREIGN KEY (`documentos_scan_id`) REFERENCES `DocumentosScan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BemProposto` ADD CONSTRAINT `BemProposto_orcamento_id_fkey` FOREIGN KEY (`orcamento_id`) REFERENCES `Orcamento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BemAdquirido` ADD CONSTRAINT `BemAdquirido_bem_proposto_id_fkey` FOREIGN KEY (`bem_proposto_id`) REFERENCES `BemProposto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BemAdquirido` ADD CONSTRAINT `BemAdquirido_nota_fiscal_id_fkey` FOREIGN KEY (`nota_fiscal_id`) REFERENCES `NotaFiscal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NotaFiscal` ADD CONSTRAINT `NotaFiscal_documentos_scan_id_fkey` FOREIGN KEY (`documentos_scan_id`) REFERENCES `DocumentosScan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ocorrencia` ADD CONSTRAINT `Ocorrencia_servidor_id_fkey` FOREIGN KEY (`servidor_id`) REFERENCES `Servidor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ocorrencia` ADD CONSTRAINT `Ocorrencia_abono_id_fkey` FOREIGN KEY (`abono_id`) REFERENCES `Abono`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Progressao` ADD CONSTRAINT `Progressao_servidor_id_fkey` FOREIGN KEY (`servidor_id`) REFERENCES `Servidor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Titulo` ADD CONSTRAINT `Titulo_servidor_id_fkey` FOREIGN KEY (`servidor_id`) REFERENCES `Servidor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Quinquenio` ADD CONSTRAINT `Quinquenio_servidor_id_fkey` FOREIGN KEY (`servidor_id`) REFERENCES `Servidor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Turma` ADD CONSTRAINT `Turma_servidor_id_fkey` FOREIGN KEY (`servidor_id`) REFERENCES `Servidor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Turma` ADD CONSTRAINT `Turma_escola_id_fkey` FOREIGN KEY (`escola_id`) REFERENCES `Escola`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Aluno` ADD CONSTRAINT `Aluno_turma_id_fkey` FOREIGN KEY (`turma_id`) REFERENCES `Turma`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AlunoDocumentos` ADD CONSTRAINT `AlunoDocumentos_documentosScanId_fkey` FOREIGN KEY (`documentosScanId`) REFERENCES `DocumentosScan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AlunoDocumentos` ADD CONSTRAINT `AlunoDocumentos_alunoId_fkey` FOREIGN KEY (`alunoId`) REFERENCES `Aluno`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AlunoAlergia` ADD CONSTRAINT `AlunoAlergia_alunoId_fkey` FOREIGN KEY (`alunoId`) REFERENCES `Aluno`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AlunoAlergia` ADD CONSTRAINT `AlunoAlergia_alergiaId_fkey` FOREIGN KEY (`alergiaId`) REFERENCES `Alergia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Questionario` ADD CONSTRAINT `Questionario_servidor_id_fkey` FOREIGN KEY (`servidor_id`) REFERENCES `Servidor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pergunta` ADD CONSTRAINT `Pergunta_questionario_id_fkey` FOREIGN KEY (`questionario_id`) REFERENCES `Questionario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Opcao` ADD CONSTRAINT `Opcao_pergunta_id_fkey` FOREIGN KEY (`pergunta_id`) REFERENCES `Pergunta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QuestionarioAluno` ADD CONSTRAINT `QuestionarioAluno_aluno_id_fkey` FOREIGN KEY (`aluno_id`) REFERENCES `Aluno`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QuestionarioAluno` ADD CONSTRAINT `QuestionarioAluno_servidor_id_fkey` FOREIGN KEY (`servidor_id`) REFERENCES `Servidor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Resposta` ADD CONSTRAINT `Resposta_questionario_aluno_id_fkey` FOREIGN KEY (`questionario_aluno_id`) REFERENCES `QuestionarioAluno`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Resposta` ADD CONSTRAINT `Resposta_pergunta_id_fkey` FOREIGN KEY (`pergunta_id`) REFERENCES `Pergunta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OpcaoResposta` ADD CONSTRAINT `OpcaoResposta_opcaoId_fkey` FOREIGN KEY (`opcaoId`) REFERENCES `Opcao`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OpcaoResposta` ADD CONSTRAINT `OpcaoResposta_respostaId_fkey` FOREIGN KEY (`respostaId`) REFERENCES `Resposta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
