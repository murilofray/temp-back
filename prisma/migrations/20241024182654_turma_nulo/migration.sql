/*
  Warnings:

  - You are about to drop the column `email_SED` on the `servidor` table. All the data in the column will be lost.
  - You are about to drop the column `senha_SED` on the `servidor` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `aluno` DROP FOREIGN KEY `aluno_turma_id_fkey`;

-- AlterTable
ALTER TABLE `aluno` MODIFY `turma_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `servidor` DROP COLUMN `email_SED`,
    DROP COLUMN `senha_SED`;

-- AddForeignKey
ALTER TABLE `aluno` ADD CONSTRAINT `aluno_turma_id_fkey` FOREIGN KEY (`turma_id`) REFERENCES `turma`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
