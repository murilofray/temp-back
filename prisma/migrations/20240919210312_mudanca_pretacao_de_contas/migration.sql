/*
  Warnings:

  - You are about to drop the column `documentos_scan_id` on the `notafiscal` table. All the data in the column will be lost.
  - You are about to drop the column `documentos_scan_id` on the `orcamento` table. All the data in the column will be lost.
  - You are about to drop the column `descricao` on the `pesquisapreco` table. All the data in the column will be lost.
  - You are about to drop the column `quantidade` on the `pesquisapreco` table. All the data in the column will be lost.
  - You are about to drop the column `prestacao_contas_id` on the `programa` table. All the data in the column will be lost.
  - You are about to drop the `bemadquirido` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `bemproposto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `documentosscan` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `created_at` to the `Fornecedor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `NotaFiscal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fornecedor_id` to the `NotaFiscal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `Orcamento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `PesquisaPreco` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titulo` to the `PesquisaPreco` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `PrestacaoContas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `programa_id` to the `PrestacaoContas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `Programa` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `alunodocumentos` DROP FOREIGN KEY `AlunoDocumentos_documentosScanId_fkey`;

-- DropForeignKey
ALTER TABLE `ata` DROP FOREIGN KEY `Ata_documentos_scan_id_fkey`;

-- DropForeignKey
ALTER TABLE `bemadquirido` DROP FOREIGN KEY `BemAdquirido_bem_proposto_id_fkey`;

-- DropForeignKey
ALTER TABLE `bemadquirido` DROP FOREIGN KEY `BemAdquirido_nota_fiscal_id_fkey`;

-- DropForeignKey
ALTER TABLE `bemproposto` DROP FOREIGN KEY `BemProposto_orcamento_id_fkey`;

-- DropForeignKey
ALTER TABLE `documentosscan` DROP FOREIGN KEY `DocumentosScan_tipo_documento_id_fkey`;

-- DropForeignKey
ALTER TABLE `movimentacaobancaria` DROP FOREIGN KEY `MovimentacaoBancaria_reciboId_fkey`;

-- DropForeignKey
ALTER TABLE `notafiscal` DROP FOREIGN KEY `NotaFiscal_documentos_scan_id_fkey`;

-- DropForeignKey
ALTER TABLE `orcamento` DROP FOREIGN KEY `Orcamento_documentos_scan_id_fkey`;

-- DropForeignKey
ALTER TABLE `programa` DROP FOREIGN KEY `Programa_prestacao_contas_id_fkey`;

-- AlterTable
ALTER TABLE `fornecedor` ADD COLUMN `created_at` DATETIME(3) NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `notafiscal` DROP COLUMN `documentos_scan_id`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL,
    ADD COLUMN `documento_scan_id` INTEGER NULL,
    ADD COLUMN `fornecedor_id` INTEGER NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `orcamento` DROP COLUMN `documentos_scan_id`,
    ADD COLUMN `bem_id` INTEGER NULL,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL,
    ADD COLUMN `documento_scan_id` INTEGER NULL,
    ADD COLUMN `servico_id` INTEGER NULL,
    ADD COLUMN `updated_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `pesquisapreco` DROP COLUMN `descricao`,
    DROP COLUMN `quantidade`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL,
    ADD COLUMN `titulo` VARCHAR(255) NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `prestacaocontas` ADD COLUMN `created_at` DATETIME(3) NOT NULL,
    ADD COLUMN `programa_id` INTEGER NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `programa` DROP COLUMN `prestacao_contas_id`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NULL;

-- DropTable
DROP TABLE `bemadquirido`;

-- DropTable
DROP TABLE `bemproposto`;

-- DropTable
DROP TABLE `documentosscan`;

-- CreateTable
CREATE TABLE `DocumentoScan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo_documento_id` INTEGER NOT NULL,
    `caminho` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NULL,
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Bem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pesquisa_preco_id` INTEGER NOT NULL,
    `descricao` VARCHAR(45) NOT NULL,
    `valor` DECIMAL(8, 2) NOT NULL,
    `quantidade` INTEGER NOT NULL,
    `nota_fiscal_id` INTEGER NULL,
    `termo_doacao_id` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Servico` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pesquisa_preco_id` INTEGER NOT NULL,
    `descricao` VARCHAR(45) NOT NULL,
    `valor` DECIMAL(8, 2) NOT NULL,
    `nota_fiscal_id` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TermoDoacao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `documento_scan_id` INTEGER NULL,
    `conteudo` TEXT NOT NULL,
    `data` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DocumentoScan` ADD CONSTRAINT `DocumentoScan_tipo_documento_id_fkey` FOREIGN KEY (`tipo_documento_id`) REFERENCES `TipoDocumento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ata` ADD CONSTRAINT `Ata_documentos_scan_id_fkey` FOREIGN KEY (`documentos_scan_id`) REFERENCES `DocumentoScan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MovimentacaoBancaria` ADD CONSTRAINT `MovimentacaoBancaria_reciboId_fkey` FOREIGN KEY (`reciboId`) REFERENCES `DocumentoScan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PrestacaoContas` ADD CONSTRAINT `PrestacaoContas_programa_id_fkey` FOREIGN KEY (`programa_id`) REFERENCES `Programa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bem` ADD CONSTRAINT `Bem_pesquisa_preco_id_fkey` FOREIGN KEY (`pesquisa_preco_id`) REFERENCES `PesquisaPreco`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bem` ADD CONSTRAINT `Bem_nota_fiscal_id_fkey` FOREIGN KEY (`nota_fiscal_id`) REFERENCES `NotaFiscal`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bem` ADD CONSTRAINT `Bem_termo_doacao_id_fkey` FOREIGN KEY (`termo_doacao_id`) REFERENCES `TermoDoacao`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Servico` ADD CONSTRAINT `Servico_pesquisa_preco_id_fkey` FOREIGN KEY (`pesquisa_preco_id`) REFERENCES `PesquisaPreco`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Servico` ADD CONSTRAINT `Servico_nota_fiscal_id_fkey` FOREIGN KEY (`nota_fiscal_id`) REFERENCES `NotaFiscal`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Orcamento` ADD CONSTRAINT `Orcamento_bem_id_fkey` FOREIGN KEY (`bem_id`) REFERENCES `Bem`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Orcamento` ADD CONSTRAINT `Orcamento_servico_id_fkey` FOREIGN KEY (`servico_id`) REFERENCES `Servico`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Orcamento` ADD CONSTRAINT `Orcamento_documento_scan_id_fkey` FOREIGN KEY (`documento_scan_id`) REFERENCES `DocumentoScan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NotaFiscal` ADD CONSTRAINT `NotaFiscal_documento_scan_id_fkey` FOREIGN KEY (`documento_scan_id`) REFERENCES `DocumentoScan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NotaFiscal` ADD CONSTRAINT `NotaFiscal_fornecedor_id_fkey` FOREIGN KEY (`fornecedor_id`) REFERENCES `Fornecedor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AlunoDocumentos` ADD CONSTRAINT `AlunoDocumentos_documentosScanId_fkey` FOREIGN KEY (`documentosScanId`) REFERENCES `DocumentoScan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
