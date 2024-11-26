/*
  Warnings:

  - You are about to drop the column `gerirAtaId` on the `ata` table. All the data in the column will be lost.
  - You are about to drop the column `tipo` on the `ata` table. All the data in the column will be lost.
  - You are about to drop the `gerir_ata` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `ata` DROP FOREIGN KEY `ata_gerirAtaId_fkey`;

-- DropForeignKey
ALTER TABLE `gerir_ata` DROP FOREIGN KEY `gerir_ata_apm_id_fkey`;

-- AlterTable
ALTER TABLE `ata` DROP COLUMN `gerirAtaId`,
    DROP COLUMN `tipo`;

-- DropTable
DROP TABLE `gerir_ata`;
