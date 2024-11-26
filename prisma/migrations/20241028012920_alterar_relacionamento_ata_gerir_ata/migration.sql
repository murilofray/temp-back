/*
  Warnings:

  - You are about to drop the `ata_gerir_ata` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `gerirAtaId` to the `ata` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titulo` to the `gerir_ata` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ata_gerir_ata` DROP FOREIGN KEY `ata_gerir_ata_ata_id_fkey`;

-- DropForeignKey
ALTER TABLE `ata_gerir_ata` DROP FOREIGN KEY `ata_gerir_ata_gerir_ata_id_fkey`;

-- AlterTable
ALTER TABLE `ata` ADD COLUMN `gerirAtaId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `gerir_ata` ADD COLUMN `titulo` VARCHAR(50) NOT NULL;

-- DropTable
DROP TABLE `ata_gerir_ata`;

-- AddForeignKey
ALTER TABLE `ata` ADD CONSTRAINT `ata_gerirAtaId_fkey` FOREIGN KEY (`gerirAtaId`) REFERENCES `gerir_ata`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
