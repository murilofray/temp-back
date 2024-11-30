/*
  Warnings:

  - You are about to drop the column `vigente` on the `apm` table. All the data in the column will be lost.
  - The primary key for the `servidor_apm` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `apmId` on the `servidor_apm` table. All the data in the column will be lost.
  - You are about to drop the column `cargoAPMId` on the `servidor_apm` table. All the data in the column will be lost.
  - You are about to drop the column `servidorId` on the `servidor_apm` table. All the data in the column will be lost.
  - You are about to drop the `cargo_apm` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[cnpj]` on the table `apm` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[servidor_id,apms_id,cargo_apm]` on the table `servidor_apm` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cnpj` to the `apm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `apm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `apms_id` to the `servidor_apm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cargo_apm` to the `servidor_apm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `servidor_id` to the `servidor_apm` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `servidor_apm` DROP FOREIGN KEY `servidor_apm_apmId_fkey`;

-- DropForeignKey
ALTER TABLE `servidor_apm` DROP FOREIGN KEY `servidor_apm_cargoAPMId_fkey`;

-- DropForeignKey
ALTER TABLE `servidor_apm` DROP FOREIGN KEY `servidor_apm_servidorId_fkey`;

-- AlterTable
ALTER TABLE `apm` DROP COLUMN `vigente`,
    ADD COLUMN `cnpj` VARCHAR(14) NOT NULL,
    ADD COLUMN `nome` VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE `servidor_apm` DROP PRIMARY KEY,
    DROP COLUMN `apmId`,
    DROP COLUMN `cargoAPMId`,
    DROP COLUMN `servidorId`,
    ADD COLUMN `apms_id` INTEGER NOT NULL,
    ADD COLUMN `cargo_apm` ENUM('PRESIDENTE', 'DIRETOR_EXECUTIVO', 'DIRETOR_FINANCEIRO', 'CONSELHEIRO_FISCAL') NOT NULL,
    ADD COLUMN `servidor_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`servidor_id`, `apms_id`);

-- DropTable
DROP TABLE `cargo_apm`;

-- CreateTable
CREATE TABLE `apms` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `apm_id` INTEGER NOT NULL,
    `data_inicio` DATETIME(3) NOT NULL,
    `data_termino` DATETIME(3) NOT NULL,
    `vigencia` BOOLEAN NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `apm_cnpj_key` ON `apm`(`cnpj`);

-- CreateIndex
CREATE UNIQUE INDEX `servidor_apm_servidor_id_apms_id_cargo_apm_key` ON `servidor_apm`(`servidor_id`, `apms_id`, `cargo_apm`);

-- AddForeignKey
ALTER TABLE `servidor_apm` ADD CONSTRAINT `servidor_apm_servidor_id_fkey` FOREIGN KEY (`servidor_id`) REFERENCES `servidor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `servidor_apm` ADD CONSTRAINT `servidor_apm_apms_id_fkey` FOREIGN KEY (`apms_id`) REFERENCES `apms`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
