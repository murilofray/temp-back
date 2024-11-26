/*
  Warnings:

  - You are about to drop the column `diretor_temporario` on the `nivel_acesso` table. All the data in the column will be lost.
  - You are about to alter the column `descricao` on the `nivel_acesso` table. The data in that column could be lost. The data in that column will be cast from `VarChar(45)` to `Enum(EnumId(0))`.
  - A unique constraint covering the columns `[descricao]` on the table `nivel_acesso` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[descricao]` on the table `tipo_documento` will be added. If there are existing duplicate values, this will fail.
  - Made the column `descricao` on table `tipo_documento` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `nivel_acesso` DROP COLUMN `diretor_temporario`,
    MODIFY `descricao` ENUM('APM', 'DIRETOR', 'DOCENTE', 'ESCRITUARIO', 'SECRETARIA', 'VICE_DIRETOR') NOT NULL;

-- AlterTable
ALTER TABLE `nivel_acesso_servidor` ADD COLUMN `diretor_temporario` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `tipo_documento` MODIFY `descricao` ENUM('ATA_ASSINADA', 'CERTIDAO_NASCIMENTO', 'NOTA_FISCAL', 'ORCAMENTO', 'RECIBO') NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `nivel_acesso_descricao_key` ON `nivel_acesso`(`descricao`);

-- CreateIndex
CREATE UNIQUE INDEX `tipo_documento_descricao_key` ON `tipo_documento`(`descricao`);
