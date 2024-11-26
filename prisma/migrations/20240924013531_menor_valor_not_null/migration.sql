/*
  Warnings:

  - You are about to drop the column `valor` on the `bem` table. All the data in the column will be lost.
  - You are about to drop the column `bem_id` on the `orcamento` table. All the data in the column will be lost.
  - You are about to drop the column `fornecedor_id` on the `orcamento` table. All the data in the column will be lost.
  - You are about to drop the column `servico_id` on the `orcamento` table. All the data in the column will be lost.
  - You are about to drop the column `valor` on the `servico` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `aluno` DROP FOREIGN KEY `Aluno_turma_id_fkey`;

-- DropForeignKey
ALTER TABLE `ata` DROP FOREIGN KEY `Ata_documentos_scan_id_fkey`;

-- DropForeignKey
ALTER TABLE `bem` DROP FOREIGN KEY `Bem_nota_fiscal_id_fkey`;

-- DropForeignKey
ALTER TABLE `bem` DROP FOREIGN KEY `Bem_pesquisa_preco_id_fkey`;

-- DropForeignKey
ALTER TABLE `bem` DROP FOREIGN KEY `Bem_termo_doacao_id_fkey`;

-- DropForeignKey
ALTER TABLE `diretor` DROP FOREIGN KEY `Diretor_escola_id_fkey`;

-- DropForeignKey
ALTER TABLE `diretor` DROP FOREIGN KEY `Diretor_servidor_id_fkey`;

-- DropForeignKey
ALTER TABLE `escola` DROP FOREIGN KEY `Escola_apm_id_fkey`;

-- DropForeignKey
ALTER TABLE `escola` DROP FOREIGN KEY `Escola_imagens_id_fkey`;

-- DropForeignKey
ALTER TABLE `ocorrencia` DROP FOREIGN KEY `Ocorrencia_abono_id_fkey`;

-- DropForeignKey
ALTER TABLE `ocorrencia` DROP FOREIGN KEY `Ocorrencia_documento_scan_id_fkey`;

-- DropForeignKey
ALTER TABLE `ocorrencia` DROP FOREIGN KEY `Ocorrencia_servidor_id_fkey`;

-- DropForeignKey
ALTER TABLE `opcao` DROP FOREIGN KEY `Opcao_pergunta_id_fkey`;

-- DropForeignKey
ALTER TABLE `orcamento` DROP FOREIGN KEY `Orcamento_bem_id_fkey`;

-- DropForeignKey
ALTER TABLE `orcamento` DROP FOREIGN KEY `Orcamento_documento_scan_id_fkey`;

-- DropForeignKey
ALTER TABLE `orcamento` DROP FOREIGN KEY `Orcamento_fornecedor_id_fkey`;

-- DropForeignKey
ALTER TABLE `orcamento` DROP FOREIGN KEY `Orcamento_servico_id_fkey`;

-- DropForeignKey
ALTER TABLE `pdde` DROP FOREIGN KEY `PDDE_conta_bancaria_id_fkey`;

-- DropForeignKey
ALTER TABLE `pdde` DROP FOREIGN KEY `PDDE_escola_id_fkey`;

-- DropForeignKey
ALTER TABLE `pergunta` DROP FOREIGN KEY `Pergunta_questionario_id_fkey`;

-- DropForeignKey
ALTER TABLE `programa` DROP FOREIGN KEY `Programa_pdde_id_fkey`;

-- DropForeignKey
ALTER TABLE `progressao` DROP FOREIGN KEY `Progressao_servidor_id_fkey`;

-- DropForeignKey
ALTER TABLE `questionario` DROP FOREIGN KEY `Questionario_servidor_id_fkey`;

-- DropForeignKey
ALTER TABLE `quinquenio` DROP FOREIGN KEY `Quinquenio_servidor_id_fkey`;

-- DropForeignKey
ALTER TABLE `resposta` DROP FOREIGN KEY `Resposta_pergunta_id_fkey`;

-- DropForeignKey
ALTER TABLE `resposta` DROP FOREIGN KEY `Resposta_questionario_aluno_id_fkey`;

-- DropForeignKey
ALTER TABLE `servico` DROP FOREIGN KEY `Servico_nota_fiscal_id_fkey`;

-- DropForeignKey
ALTER TABLE `servico` DROP FOREIGN KEY `Servico_pesquisa_preco_id_fkey`;

-- DropForeignKey
ALTER TABLE `servidor` DROP FOREIGN KEY `Servidor_escola_id_fkey`;

-- DropForeignKey
ALTER TABLE `telefone` DROP FOREIGN KEY `Telefone_escola_id_fkey`;

-- DropForeignKey
ALTER TABLE `titulo` DROP FOREIGN KEY `Titulo_documento_scan_id_fkey`;

-- DropForeignKey
ALTER TABLE `titulo` DROP FOREIGN KEY `Titulo_servidor_id_fkey`;

-- DropForeignKey
ALTER TABLE `turma` DROP FOREIGN KEY `Turma_escola_id_fkey`;

-- DropForeignKey
ALTER TABLE `turma` DROP FOREIGN KEY `Turma_servidor_id_fkey`;

-- AlterTable
ALTER TABLE `bem` DROP COLUMN `valor`,
    ADD COLUMN `menor_valor` DECIMAL(8, 2) NULL;

-- AlterTable
ALTER TABLE `escola` MODIFY `imagens_id` INTEGER NULL,
    MODIFY `apm_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `orcamento` DROP COLUMN `bem_id`,
    DROP COLUMN `fornecedor_id`,
    DROP COLUMN `servico_id`;

-- AlterTable
ALTER TABLE `servico` DROP COLUMN `valor`,
    ADD COLUMN `menor_valor` DECIMAL(8, 2) NULL;

-- CreateTable
CREATE TABLE `proposta_bem` (
    `bem_id` INTEGER NOT NULL,
    `fornecedor_id` INTEGER NOT NULL,
    `orcamento_id` INTEGER NULL,
    `valor` DECIMAL(8, 2) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`bem_id`, `fornecedor_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `proposta_servico` (
    `servico_id` INTEGER NOT NULL,
    `fornecedor_id` INTEGER NOT NULL,
    `orcamento_id` INTEGER NULL,
    `valor` DECIMAL(8, 2) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`servico_id`, `fornecedor_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `escola` ADD CONSTRAINT `escola_imagens_id_fkey` FOREIGN KEY (`imagens_id`) REFERENCES `imagens`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `escola` ADD CONSTRAINT `escola_apm_id_fkey` FOREIGN KEY (`apm_id`) REFERENCES `apm`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `telefone` ADD CONSTRAINT `telefone_escola_id_fkey` FOREIGN KEY (`escola_id`) REFERENCES `escola`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `diretor` ADD CONSTRAINT `diretor_servidor_id_fkey` FOREIGN KEY (`servidor_id`) REFERENCES `servidor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `diretor` ADD CONSTRAINT `diretor_escola_id_fkey` FOREIGN KEY (`escola_id`) REFERENCES `escola`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `servidor` ADD CONSTRAINT `servidor_escola_id_fkey` FOREIGN KEY (`escola_id`) REFERENCES `escola`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ata` ADD CONSTRAINT `ata_documentos_scan_id_fkey` FOREIGN KEY (`documentos_scan_id`) REFERENCES `documento_scan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pdde` ADD CONSTRAINT `pdde_escola_id_fkey` FOREIGN KEY (`escola_id`) REFERENCES `escola`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pdde` ADD CONSTRAINT `pdde_conta_bancaria_id_fkey` FOREIGN KEY (`conta_bancaria_id`) REFERENCES `conta_bancaria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `programa` ADD CONSTRAINT `programa_pdde_id_fkey` FOREIGN KEY (`pdde_id`) REFERENCES `pdde`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bem` ADD CONSTRAINT `bem_pesquisa_preco_id_fkey` FOREIGN KEY (`pesquisa_preco_id`) REFERENCES `pesquisa_preco`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bem` ADD CONSTRAINT `bem_nota_fiscal_id_fkey` FOREIGN KEY (`nota_fiscal_id`) REFERENCES `nota_fiscal`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bem` ADD CONSTRAINT `bem_termo_doacao_id_fkey` FOREIGN KEY (`termo_doacao_id`) REFERENCES `termo_doacao`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `proposta_bem` ADD CONSTRAINT `proposta_bem_bem_id_fkey` FOREIGN KEY (`bem_id`) REFERENCES `bem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `proposta_bem` ADD CONSTRAINT `proposta_bem_fornecedor_id_fkey` FOREIGN KEY (`fornecedor_id`) REFERENCES `fornecedor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `proposta_bem` ADD CONSTRAINT `proposta_bem_orcamento_id_fkey` FOREIGN KEY (`orcamento_id`) REFERENCES `orcamento`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `servico` ADD CONSTRAINT `servico_pesquisa_preco_id_fkey` FOREIGN KEY (`pesquisa_preco_id`) REFERENCES `pesquisa_preco`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `servico` ADD CONSTRAINT `servico_nota_fiscal_id_fkey` FOREIGN KEY (`nota_fiscal_id`) REFERENCES `nota_fiscal`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `proposta_servico` ADD CONSTRAINT `proposta_servico_servico_id_fkey` FOREIGN KEY (`servico_id`) REFERENCES `servico`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `proposta_servico` ADD CONSTRAINT `proposta_servico_fornecedor_id_fkey` FOREIGN KEY (`fornecedor_id`) REFERENCES `fornecedor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `proposta_servico` ADD CONSTRAINT `proposta_servico_orcamento_id_fkey` FOREIGN KEY (`orcamento_id`) REFERENCES `orcamento`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orcamento` ADD CONSTRAINT `orcamento_documento_scan_id_fkey` FOREIGN KEY (`documento_scan_id`) REFERENCES `documento_scan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ocorrencia` ADD CONSTRAINT `ocorrencia_servidor_id_fkey` FOREIGN KEY (`servidor_id`) REFERENCES `servidor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ocorrencia` ADD CONSTRAINT `ocorrencia_documento_scan_id_fkey` FOREIGN KEY (`documento_scan_id`) REFERENCES `documento_scan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ocorrencia` ADD CONSTRAINT `ocorrencia_abono_id_fkey` FOREIGN KEY (`abono_id`) REFERENCES `abono`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `progressao` ADD CONSTRAINT `progressao_servidor_id_fkey` FOREIGN KEY (`servidor_id`) REFERENCES `servidor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `titulo` ADD CONSTRAINT `titulo_servidor_id_fkey` FOREIGN KEY (`servidor_id`) REFERENCES `servidor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `titulo` ADD CONSTRAINT `titulo_documento_scan_id_fkey` FOREIGN KEY (`documento_scan_id`) REFERENCES `documento_scan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `quinquenio` ADD CONSTRAINT `quinquenio_servidor_id_fkey` FOREIGN KEY (`servidor_id`) REFERENCES `servidor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `turma` ADD CONSTRAINT `turma_servidor_id_fkey` FOREIGN KEY (`servidor_id`) REFERENCES `servidor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `turma` ADD CONSTRAINT `turma_escola_id_fkey` FOREIGN KEY (`escola_id`) REFERENCES `escola`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `aluno` ADD CONSTRAINT `aluno_turma_id_fkey` FOREIGN KEY (`turma_id`) REFERENCES `turma`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `questionario` ADD CONSTRAINT `questionario_servidor_id_fkey` FOREIGN KEY (`servidor_id`) REFERENCES `servidor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pergunta` ADD CONSTRAINT `pergunta_questionario_id_fkey` FOREIGN KEY (`questionario_id`) REFERENCES `questionario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `resposta` ADD CONSTRAINT `resposta_questionario_aluno_id_fkey` FOREIGN KEY (`questionario_aluno_id`) REFERENCES `questionario_aluno`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `resposta` ADD CONSTRAINT `resposta_pergunta_id_fkey` FOREIGN KEY (`pergunta_id`) REFERENCES `pergunta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `opcao` ADD CONSTRAINT `opcao_pergunta_id_fkey` FOREIGN KEY (`pergunta_id`) REFERENCES `pergunta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `diretor` RENAME INDEX `Diretor_escola_id_key` TO `diretor_escola_id_key`;

-- RenameIndex
ALTER TABLE `diretor` RENAME INDEX `Diretor_servidor_id_key` TO `diretor_servidor_id_key`;
