/*
  Warnings:

  - You are about to drop the `ata_gerir_ata` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `gerirAtaId` to the `ata` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titulo` to the `gerir_ata` table without a default value. This is not possible if the table is not empty.

*/

-- AlterTable
ALTER TABLE `nivel_acesso` MODIFY `descricao` VARCHAR(45) NOT NULL;

