/*
  Warnings:

  - The primary key for the `proposta_bem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `bem_id` on the `proposta_bem` table. All the data in the column will be lost.
  - You are about to drop the `bem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `proposta_servico` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `servico` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `item_id` to the `proposta_bem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `bem` DROP FOREIGN KEY `bem_nota_fiscal_id_fkey`;

-- DropForeignKey
ALTER TABLE `bem` DROP FOREIGN KEY `bem_pesquisa_preco_id_fkey`;

-- DropForeignKey
ALTER TABLE `bem` DROP FOREIGN KEY `bem_termo_doacao_id_fkey`;

-- DropForeignKey
ALTER TABLE `proposta_bem` DROP FOREIGN KEY `proposta_bem_bem_id_fkey`;

-- DropForeignKey
ALTER TABLE `proposta_servico` DROP FOREIGN KEY `proposta_servico_fornecedor_id_fkey`;

-- DropForeignKey
ALTER TABLE `proposta_servico` DROP FOREIGN KEY `proposta_servico_servico_id_fkey`;

-- DropForeignKey
ALTER TABLE `servico` DROP FOREIGN KEY `servico_nota_fiscal_id_fkey`;

-- DropForeignKey
ALTER TABLE `servico` DROP FOREIGN KEY `servico_pesquisa_preco_id_fkey`;

-- AlterTable
ALTER TABLE `proposta_bem` DROP PRIMARY KEY,
    DROP COLUMN `bem_id`,
    ADD COLUMN `item_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`item_id`, `fornecedor_id`);

-- DropTable
DROP TABLE `bem`;

-- DropTable
DROP TABLE `proposta_servico`;

-- DropTable
DROP TABLE `servico`;

-- CreateTable
CREATE TABLE `item` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pesquisa_preco_id` INTEGER NOT NULL,
    `nota_fiscal_id` INTEGER NULL,
    `termo_doacao_id` INTEGER NULL,
    `descricao` VARCHAR(60) NOT NULL,
    `menor_valor` DECIMAL(8, 2) NULL,
    `quantidade` INTEGER NOT NULL,
    `unidade` VARCHAR(40) NOT NULL DEFAULT 'UNID',
    `justificativa` VARCHAR(255) NULL,
    `aprovado` BOOLEAN NULL DEFAULT false,
    `melhor_proponente` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `item` ADD CONSTRAINT `item_pesquisa_preco_id_fkey` FOREIGN KEY (`pesquisa_preco_id`) REFERENCES `pesquisa_preco`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `item` ADD CONSTRAINT `item_nota_fiscal_id_fkey` FOREIGN KEY (`nota_fiscal_id`) REFERENCES `nota_fiscal`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `item` ADD CONSTRAINT `item_termo_doacao_id_fkey` FOREIGN KEY (`termo_doacao_id`) REFERENCES `termo_doacao`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `proposta_bem` ADD CONSTRAINT `proposta_bem_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
