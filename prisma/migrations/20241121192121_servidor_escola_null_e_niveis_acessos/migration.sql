/*
  Warnings:

  - The values [SECRETARIA] on the enum `nivel_acesso_descricao` will be removed. If these variants are still used in the database, this will fail.

*/
-- DropForeignKey
ALTER TABLE `servidor` DROP FOREIGN KEY `servidor_escola_id_fkey`;

-- AlterTable
ALTER TABLE `nivel_acesso` MODIFY `descricao` ENUM('ADMINISTRADOR', 'DIRETOR', 'VICE_DIRETOR', 'COORDENADOR', 'ESCRITUARIO', 'DOCENTE', 'APM') NOT NULL;

-- AlterTable
ALTER TABLE `servidor` MODIFY `escola_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `servidor` ADD CONSTRAINT `servidor_escola_id_fkey` FOREIGN KEY (`escola_id`) REFERENCES `escola`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
