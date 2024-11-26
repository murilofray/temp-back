/*
  Warnings:

  - You are about to drop the column `tipo` on the `alergia` table. All the data in the column will be lost.
  - Added the required column `tipo_alergia_id` to the `Alergia` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `alergia` DROP COLUMN `tipo`,
    ADD COLUMN `tipo_alergia_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `TipoAlergia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Alergia` ADD CONSTRAINT `Alergia_tipo_alergia_id_fkey` FOREIGN KEY (`tipo_alergia_id`) REFERENCES `TipoAlergia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
