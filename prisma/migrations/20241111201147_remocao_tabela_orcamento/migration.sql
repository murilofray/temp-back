/*
  Warnings:

  - You are about to drop the column `orcamento_id` on the `proposta_bem` table. All the data in the column will be lost.
  - You are about to drop the column `orcamento_id` on the `proposta_servico` table. All the data in the column will be lost.
  - You are about to drop the `orcamento` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `orcamento` DROP FOREIGN KEY `orcamento_documento_scan_id_fkey`;

-- DropForeignKey
ALTER TABLE `proposta_bem` DROP FOREIGN KEY `proposta_bem_orcamento_id_fkey`;

-- DropForeignKey
ALTER TABLE `proposta_servico` DROP FOREIGN KEY `proposta_servico_orcamento_id_fkey`;

-- AlterTable
ALTER TABLE `pesquisa_preco` ADD COLUMN `orcamento_a` INTEGER NULL,
    ADD COLUMN `orcamento_b` INTEGER NULL,
    ADD COLUMN `orcamento_c` INTEGER NULL;

-- AlterTable
ALTER TABLE `proposta_bem` DROP COLUMN `orcamento_id`;

-- AlterTable
ALTER TABLE `proposta_servico` DROP COLUMN `orcamento_id`;

-- DropTable
DROP TABLE `orcamento`;

-- AddForeignKey
ALTER TABLE `pesquisa_preco` ADD CONSTRAINT `pesquisa_preco_orcamento_a_fkey` FOREIGN KEY (`orcamento_a`) REFERENCES `documento_scan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pesquisa_preco` ADD CONSTRAINT `pesquisa_preco_orcamento_b_fkey` FOREIGN KEY (`orcamento_b`) REFERENCES `documento_scan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pesquisa_preco` ADD CONSTRAINT `pesquisa_preco_orcamento_c_fkey` FOREIGN KEY (`orcamento_c`) REFERENCES `documento_scan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
