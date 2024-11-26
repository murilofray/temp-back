/*
  Warnings:

  - You are about to drop the column `data_ultima_assiduidade` on the `servidor` table. All the data in the column will be lost.
  - You are about to drop the column `data_ultimo_titulo` on the `servidor` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `servidor_email_key` ON `servidor`;

-- AlterTable
ALTER TABLE `servidor` DROP COLUMN `data_ultima_assiduidade`,
    DROP COLUMN `data_ultimo_titulo`;
