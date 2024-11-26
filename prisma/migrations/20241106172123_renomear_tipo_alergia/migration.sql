/*
  Warnings:

  - You are about to drop the `tipoalergia` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `alergia` DROP FOREIGN KEY `Alergia_tipo_alergia_id_fkey`;

-- DropTable
DROP TABLE `tipoalergia`;

-- CreateTable
CREATE TABLE `tipo_alergia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Alergia` ADD CONSTRAINT `Alergia_tipo_alergia_id_fkey` FOREIGN KEY (`tipo_alergia_id`) REFERENCES `tipo_alergia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
