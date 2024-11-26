/*
  Warnings:

  - You are about to drop the `alunoalergia` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `alunodocumento` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `atagerirata` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cargoapm` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `contabancaria` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `documentoscan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `gerirata` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `movimentacaobancaria` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `nivelacesso` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `nivelacessoservidor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `notafiscal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `oficiomemorando` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `opcaoresposta` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pesquisapreco` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `prestacaocontas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `questionarioaluno` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `saldobancario` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `saldopdde` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `servidorapm` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `termodoacao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tipodocumento` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `created_at` to the `Aluno` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `APM` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `alunoalergia` DROP FOREIGN KEY `AlunoAlergia_alergiaId_fkey`;

-- DropForeignKey
ALTER TABLE `alunoalergia` DROP FOREIGN KEY `AlunoAlergia_alunoId_fkey`;

-- DropForeignKey
ALTER TABLE `alunodocumento` DROP FOREIGN KEY `AlunoDocumento_aluno_documento_id_fkey`;

-- DropForeignKey
ALTER TABLE `alunodocumento` DROP FOREIGN KEY `AlunoDocumento_documento_scan_id_fkey`;

-- DropForeignKey
ALTER TABLE `ata` DROP FOREIGN KEY `Ata_documentos_scan_id_fkey`;

-- DropForeignKey
ALTER TABLE `atagerirata` DROP FOREIGN KEY `AtaGerirAta_ataId_fkey`;

-- DropForeignKey
ALTER TABLE `atagerirata` DROP FOREIGN KEY `AtaGerirAta_gerirAtaId_fkey`;

-- DropForeignKey
ALTER TABLE `bem` DROP FOREIGN KEY `Bem_nota_fiscal_id_fkey`;

-- DropForeignKey
ALTER TABLE `bem` DROP FOREIGN KEY `Bem_pesquisa_preco_id_fkey`;

-- DropForeignKey
ALTER TABLE `bem` DROP FOREIGN KEY `Bem_termo_doacao_id_fkey`;

-- DropForeignKey
ALTER TABLE `contabancaria` DROP FOREIGN KEY `ContaBancaria_escola_id_fkey`;

-- DropForeignKey
ALTER TABLE `documentoscan` DROP FOREIGN KEY `DocumentoScan_tipo_documento_id_fkey`;

-- DropForeignKey
ALTER TABLE `gerirata` DROP FOREIGN KEY `GerirAta_apm_id_fkey`;

-- DropForeignKey
ALTER TABLE `movimentacaobancaria` DROP FOREIGN KEY `MovimentacaoBancaria_conta_bancaria_id_fkey`;

-- DropForeignKey
ALTER TABLE `movimentacaobancaria` DROP FOREIGN KEY `MovimentacaoBancaria_documento_scan_id_fkey`;

-- DropForeignKey
ALTER TABLE `nivelacessoservidor` DROP FOREIGN KEY `NivelAcessoServidor_nivel_acesso_id_fkey`;

-- DropForeignKey
ALTER TABLE `nivelacessoservidor` DROP FOREIGN KEY `NivelAcessoServidor_servidor_id_fkey`;

-- DropForeignKey
ALTER TABLE `notafiscal` DROP FOREIGN KEY `NotaFiscal_documento_scan_id_fkey`;

-- DropForeignKey
ALTER TABLE `notafiscal` DROP FOREIGN KEY `NotaFiscal_fornecedor_id_fkey`;

-- DropForeignKey
ALTER TABLE `ocorrencia` DROP FOREIGN KEY `Ocorrencia_documento_scan_id_fkey`;

-- DropForeignKey
ALTER TABLE `oficiomemorando` DROP FOREIGN KEY `OficioMemorando_documento_scan_id_fkey`;

-- DropForeignKey
ALTER TABLE `oficiomemorando` DROP FOREIGN KEY `OficioMemorando_escola_id_fkey`;

-- DropForeignKey
ALTER TABLE `opcaoresposta` DROP FOREIGN KEY `OpcaoResposta_opcaoId_fkey`;

-- DropForeignKey
ALTER TABLE `opcaoresposta` DROP FOREIGN KEY `OpcaoResposta_respostaId_fkey`;

-- DropForeignKey
ALTER TABLE `orcamento` DROP FOREIGN KEY `Orcamento_documento_scan_id_fkey`;

-- DropForeignKey
ALTER TABLE `pdde` DROP FOREIGN KEY `PDDE_conta_bancaria_id_fkey`;

-- DropForeignKey
ALTER TABLE `pesquisapreco` DROP FOREIGN KEY `PesquisaPreco_prestacao_contas_id_fkey`;

-- DropForeignKey
ALTER TABLE `prestacaocontas` DROP FOREIGN KEY `PrestacaoContas_programa_id_fkey`;

-- DropForeignKey
ALTER TABLE `questionarioaluno` DROP FOREIGN KEY `QuestionarioAluno_aluno_id_fkey`;

-- DropForeignKey
ALTER TABLE `questionarioaluno` DROP FOREIGN KEY `QuestionarioAluno_servidor_id_fkey`;

-- DropForeignKey
ALTER TABLE `resposta` DROP FOREIGN KEY `Resposta_questionario_aluno_id_fkey`;

-- DropForeignKey
ALTER TABLE `saldobancario` DROP FOREIGN KEY `SaldoBancario_conta_bancaria_id_fkey`;

-- DropForeignKey
ALTER TABLE `saldopdde` DROP FOREIGN KEY `SaldoPDDE_saldo_PDDE_id_fkey`;

-- DropForeignKey
ALTER TABLE `servico` DROP FOREIGN KEY `Servico_nota_fiscal_id_fkey`;

-- DropForeignKey
ALTER TABLE `servico` DROP FOREIGN KEY `Servico_pesquisa_preco_id_fkey`;

-- DropForeignKey
ALTER TABLE `servidorapm` DROP FOREIGN KEY `ServidorApm_apmId_fkey`;

-- DropForeignKey
ALTER TABLE `servidorapm` DROP FOREIGN KEY `ServidorApm_cargoAPMId_fkey`;

-- DropForeignKey
ALTER TABLE `servidorapm` DROP FOREIGN KEY `ServidorApm_servidorId_fkey`;

-- DropForeignKey
ALTER TABLE `termodoacao` DROP FOREIGN KEY `TermoDoacao_documento_scan_id_fkey`;

-- DropForeignKey
ALTER TABLE `termodoacao` DROP FOREIGN KEY `TermoDoacao_escola_id_fkey`;

-- DropForeignKey
ALTER TABLE `titulo` DROP FOREIGN KEY `Titulo_documento_scan_id_fkey`;

-- AlterTable
ALTER TABLE `aluno` ADD COLUMN `created_at` DATETIME(3) NOT NULL,
    ADD COLUMN `deleted_at` DATETIME(3) NULL,
    ADD COLUMN `updated_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `apm` ADD COLUMN `created_at` DATETIME(3) NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NULL;

-- DropTable
DROP TABLE `alunoalergia`;

-- DropTable
DROP TABLE `alunodocumento`;

-- DropTable
DROP TABLE `atagerirata`;

-- DropTable
DROP TABLE `cargoapm`;

-- DropTable
DROP TABLE `contabancaria`;

-- DropTable
DROP TABLE `documentoscan`;

-- DropTable
DROP TABLE `gerirata`;

-- DropTable
DROP TABLE `movimentacaobancaria`;

-- DropTable
DROP TABLE `nivelacesso`;

-- DropTable
DROP TABLE `nivelacessoservidor`;

-- DropTable
DROP TABLE `notafiscal`;

-- DropTable
DROP TABLE `oficiomemorando`;

-- DropTable
DROP TABLE `opcaoresposta`;

-- DropTable
DROP TABLE `pesquisapreco`;

-- DropTable
DROP TABLE `prestacaocontas`;

-- DropTable
DROP TABLE `questionarioaluno`;

-- DropTable
DROP TABLE `saldobancario`;

-- DropTable
DROP TABLE `saldopdde`;

-- DropTable
DROP TABLE `servidorapm`;

-- DropTable
DROP TABLE `termodoacao`;

-- DropTable
DROP TABLE `tipodocumento`;

-- CreateTable
CREATE TABLE `nivel_acesso` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` INTEGER NOT NULL,
    `diretor_temporario` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `nivel_acesso_servidor` (
    `servidor_id` INTEGER NOT NULL,
    `nivel_acesso_id` INTEGER NOT NULL,

    PRIMARY KEY (`servidor_id`, `nivel_acesso_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `documento_scan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo_documento_id` INTEGER NOT NULL,
    `caminho` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipo_documento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(45) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `servidor_apm` (
    `servidorId` INTEGER NOT NULL,
    `apmId` INTEGER NOT NULL,
    `cargoAPMId` INTEGER NOT NULL,

    PRIMARY KEY (`servidorId`, `apmId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cargo_apm` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `gerir_ata` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `apm_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ata_gerir_ata` (
    `ata_id` INTEGER NOT NULL,
    `gerir_ata_id` INTEGER NOT NULL,

    PRIMARY KEY (`ata_id`, `gerir_ata_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `oficio_memorando` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `escola_id` INTEGER NOT NULL,
    `documento_scan_id` INTEGER NULL,
    `conteudo` TEXT NOT NULL,
    `tipo` VARCHAR(45) NOT NULL,
    `data` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `saldo_pdde` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `saldo_PDDE_id` INTEGER NOT NULL,
    `valor` DECIMAL(8, 2) NOT NULL,
    `custeio` DECIMAL(5, 2) NOT NULL,
    `capital` DECIMAL(5, 2) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `conta_bancaria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `escola_id` INTEGER NOT NULL,
    `agencia` VARCHAR(10) NOT NULL,
    `numero_conta` VARCHAR(10) NOT NULL,
    `banco` VARCHAR(30) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `saldo_bancario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `conta_bancaria_id` INTEGER NOT NULL,
    `saldo` DECIMAL(8, 2) NOT NULL,
    `data` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `movimentacao_bancaria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `conta_bancaria_id` INTEGER NOT NULL,
    `documento_scan_id` INTEGER NULL,
    `data` DATETIME(3) NULL,
    `valor` DECIMAL(8, 2) NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `prestacao_contas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `programa_id` INTEGER NOT NULL,
    `ano` DATETIME(3) NOT NULL,
    `entregue` BOOLEAN NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pesquisa_preco` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `prestacao_contas_id` INTEGER NOT NULL,
    `titulo` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `nota_fiscal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fornecedor_id` INTEGER NOT NULL,
    `documento_scan_id` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `termo_doacao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `escola_id` INTEGER NOT NULL,
    `documento_scan_id` INTEGER NULL,
    `conteudo` TEXT NOT NULL,
    `data` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `aluno_documento` (
    `documento_scan_id` INTEGER NOT NULL,
    `aluno_documento_id` INTEGER NOT NULL,

    PRIMARY KEY (`documento_scan_id`, `aluno_documento_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `aluno_alergia` (
    `alunoId` INTEGER NOT NULL,
    `alergiaId` INTEGER NOT NULL,

    PRIMARY KEY (`alunoId`, `alergiaId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `opcao_resposta` (
    `opcaoId` INTEGER NOT NULL,
    `respostaId` INTEGER NOT NULL,
    `resposta_descricao` TEXT NULL,

    PRIMARY KEY (`opcaoId`, `respostaId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `questionario_aluno` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `aluno_id` INTEGER NOT NULL,
    `servidor_id` INTEGER NOT NULL,
    `data_inicio` DATETIME(3) NULL,
    `data_fim` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `nivel_acesso_servidor` ADD CONSTRAINT `nivel_acesso_servidor_servidor_id_fkey` FOREIGN KEY (`servidor_id`) REFERENCES `Servidor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `nivel_acesso_servidor` ADD CONSTRAINT `nivel_acesso_servidor_nivel_acesso_id_fkey` FOREIGN KEY (`nivel_acesso_id`) REFERENCES `nivel_acesso`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documento_scan` ADD CONSTRAINT `documento_scan_tipo_documento_id_fkey` FOREIGN KEY (`tipo_documento_id`) REFERENCES `tipo_documento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `servidor_apm` ADD CONSTRAINT `servidor_apm_servidorId_fkey` FOREIGN KEY (`servidorId`) REFERENCES `Servidor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `servidor_apm` ADD CONSTRAINT `servidor_apm_apmId_fkey` FOREIGN KEY (`apmId`) REFERENCES `APM`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `servidor_apm` ADD CONSTRAINT `servidor_apm_cargoAPMId_fkey` FOREIGN KEY (`cargoAPMId`) REFERENCES `cargo_apm`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ata` ADD CONSTRAINT `Ata_documentos_scan_id_fkey` FOREIGN KEY (`documentos_scan_id`) REFERENCES `documento_scan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `gerir_ata` ADD CONSTRAINT `gerir_ata_apm_id_fkey` FOREIGN KEY (`apm_id`) REFERENCES `APM`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ata_gerir_ata` ADD CONSTRAINT `ata_gerir_ata_ata_id_fkey` FOREIGN KEY (`ata_id`) REFERENCES `Ata`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ata_gerir_ata` ADD CONSTRAINT `ata_gerir_ata_gerir_ata_id_fkey` FOREIGN KEY (`gerir_ata_id`) REFERENCES `gerir_ata`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `oficio_memorando` ADD CONSTRAINT `oficio_memorando_escola_id_fkey` FOREIGN KEY (`escola_id`) REFERENCES `Escola`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `oficio_memorando` ADD CONSTRAINT `oficio_memorando_documento_scan_id_fkey` FOREIGN KEY (`documento_scan_id`) REFERENCES `documento_scan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PDDE` ADD CONSTRAINT `PDDE_conta_bancaria_id_fkey` FOREIGN KEY (`conta_bancaria_id`) REFERENCES `conta_bancaria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `saldo_pdde` ADD CONSTRAINT `saldo_pdde_saldo_PDDE_id_fkey` FOREIGN KEY (`saldo_PDDE_id`) REFERENCES `PDDE`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `conta_bancaria` ADD CONSTRAINT `conta_bancaria_escola_id_fkey` FOREIGN KEY (`escola_id`) REFERENCES `Escola`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `saldo_bancario` ADD CONSTRAINT `saldo_bancario_conta_bancaria_id_fkey` FOREIGN KEY (`conta_bancaria_id`) REFERENCES `conta_bancaria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `movimentacao_bancaria` ADD CONSTRAINT `movimentacao_bancaria_conta_bancaria_id_fkey` FOREIGN KEY (`conta_bancaria_id`) REFERENCES `conta_bancaria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `movimentacao_bancaria` ADD CONSTRAINT `movimentacao_bancaria_documento_scan_id_fkey` FOREIGN KEY (`documento_scan_id`) REFERENCES `documento_scan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `prestacao_contas` ADD CONSTRAINT `prestacao_contas_programa_id_fkey` FOREIGN KEY (`programa_id`) REFERENCES `Programa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pesquisa_preco` ADD CONSTRAINT `pesquisa_preco_prestacao_contas_id_fkey` FOREIGN KEY (`prestacao_contas_id`) REFERENCES `prestacao_contas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bem` ADD CONSTRAINT `Bem_pesquisa_preco_id_fkey` FOREIGN KEY (`pesquisa_preco_id`) REFERENCES `pesquisa_preco`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bem` ADD CONSTRAINT `Bem_nota_fiscal_id_fkey` FOREIGN KEY (`nota_fiscal_id`) REFERENCES `nota_fiscal`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bem` ADD CONSTRAINT `Bem_termo_doacao_id_fkey` FOREIGN KEY (`termo_doacao_id`) REFERENCES `termo_doacao`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Servico` ADD CONSTRAINT `Servico_pesquisa_preco_id_fkey` FOREIGN KEY (`pesquisa_preco_id`) REFERENCES `pesquisa_preco`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Servico` ADD CONSTRAINT `Servico_nota_fiscal_id_fkey` FOREIGN KEY (`nota_fiscal_id`) REFERENCES `nota_fiscal`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Orcamento` ADD CONSTRAINT `Orcamento_documento_scan_id_fkey` FOREIGN KEY (`documento_scan_id`) REFERENCES `documento_scan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `nota_fiscal` ADD CONSTRAINT `nota_fiscal_documento_scan_id_fkey` FOREIGN KEY (`documento_scan_id`) REFERENCES `documento_scan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `nota_fiscal` ADD CONSTRAINT `nota_fiscal_fornecedor_id_fkey` FOREIGN KEY (`fornecedor_id`) REFERENCES `Fornecedor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `termo_doacao` ADD CONSTRAINT `termo_doacao_escola_id_fkey` FOREIGN KEY (`escola_id`) REFERENCES `Escola`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `termo_doacao` ADD CONSTRAINT `termo_doacao_documento_scan_id_fkey` FOREIGN KEY (`documento_scan_id`) REFERENCES `documento_scan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ocorrencia` ADD CONSTRAINT `Ocorrencia_documento_scan_id_fkey` FOREIGN KEY (`documento_scan_id`) REFERENCES `documento_scan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Titulo` ADD CONSTRAINT `Titulo_documento_scan_id_fkey` FOREIGN KEY (`documento_scan_id`) REFERENCES `documento_scan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `aluno_documento` ADD CONSTRAINT `aluno_documento_documento_scan_id_fkey` FOREIGN KEY (`documento_scan_id`) REFERENCES `documento_scan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `aluno_documento` ADD CONSTRAINT `aluno_documento_aluno_documento_id_fkey` FOREIGN KEY (`aluno_documento_id`) REFERENCES `Aluno`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `aluno_alergia` ADD CONSTRAINT `aluno_alergia_alunoId_fkey` FOREIGN KEY (`alunoId`) REFERENCES `Aluno`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `aluno_alergia` ADD CONSTRAINT `aluno_alergia_alergiaId_fkey` FOREIGN KEY (`alergiaId`) REFERENCES `Alergia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Resposta` ADD CONSTRAINT `Resposta_questionario_aluno_id_fkey` FOREIGN KEY (`questionario_aluno_id`) REFERENCES `questionario_aluno`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `opcao_resposta` ADD CONSTRAINT `opcao_resposta_opcaoId_fkey` FOREIGN KEY (`opcaoId`) REFERENCES `Opcao`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `opcao_resposta` ADD CONSTRAINT `opcao_resposta_respostaId_fkey` FOREIGN KEY (`respostaId`) REFERENCES `Resposta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `questionario_aluno` ADD CONSTRAINT `questionario_aluno_aluno_id_fkey` FOREIGN KEY (`aluno_id`) REFERENCES `Aluno`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `questionario_aluno` ADD CONSTRAINT `questionario_aluno_servidor_id_fkey` FOREIGN KEY (`servidor_id`) REFERENCES `Servidor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
