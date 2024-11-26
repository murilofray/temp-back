/*
  Warnings:

  - You are about to alter the column `descricao` on the `cargo_apm` table. The data in that column could be lost. The data in that column will be cast from `VarChar(45)` to `Enum(EnumId(2))`.
  - You are about to drop the column `data_ultima_assiduidade` on the `servidor` table. All the data in the column will be lost.
  - You are about to drop the column `data_ultimo_titulo` on the `servidor` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[descricao]` on the table `cargo_apm` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `cargo_apm` MODIFY `descricao` ENUM('PRESIDENTE', 'DIRETOR_EXECUTIVO', 'DIRETOR_FINANCEIRO', 'CONSELHEIRO_FISCAL') NOT NULL;


-- CreateIndex
CREATE UNIQUE INDEX `cargo_apm_descricao_key` ON `cargo_apm`(`descricao`);
