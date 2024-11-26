/*
  Warnings:

  - You are about to drop the column `programa_id` on the `prestacao_contas` table. All the data in the column will be lost.
  - Added the required column `pdde_id` to the `prestacao_contas` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `prestacao_contas` DROP FOREIGN KEY `prestacao_contas_programa_id_fkey`;

-- AlterTable
ALTER TABLE `prestacao_contas` DROP COLUMN `programa_id`,
    ADD COLUMN `pdde_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `prestacao_contas` ADD CONSTRAINT `prestacao_contas_pdde_id_fkey` FOREIGN KEY (`pdde_id`) REFERENCES `pdde`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
