/*
  Warnings:

  - The primary key for the `acesso` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idAcesso` on the `acesso` table. All the data in the column will be lost.
  - You are about to drop the column `diretor_id` on the `escola` table. All the data in the column will be lost.
  - You are about to drop the column `tipo_servidor` on the `servidor` table. All the data in the column will be lost.
  - You are about to drop the column `cargoId` on the `servidorapm` table. All the data in the column will be lost.
  - You are about to drop the `cargo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `gerirhasata` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `servidoracesso` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id` to the `Acesso` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `Ata` table without a default value. This is not possible if the table is not empty.
  - Made the column `created_at` on table `documentoscan` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `created_at` to the `Escola` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `GerirAta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `Imagens` table without a default value. This is not possible if the table is not empty.
  - Made the column `rg` on table `servidor` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cpf` on table `servidor` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `servidor` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `cargoAPMId` to the `ServidorApm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `ServidorApm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `Telefone` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `gerirhasata` DROP FOREIGN KEY `GerirHasAta_ataId_fkey`;

-- DropForeignKey
ALTER TABLE `gerirhasata` DROP FOREIGN KEY `GerirHasAta_gerirAtaId_fkey`;

-- DropForeignKey
ALTER TABLE `servidoracesso` DROP FOREIGN KEY `ServidorAcesso_acessoIdAcesso_fkey`;

-- DropForeignKey
ALTER TABLE `servidoracesso` DROP FOREIGN KEY `ServidorAcesso_servidorId_fkey`;

-- DropForeignKey
ALTER TABLE `servidorapm` DROP FOREIGN KEY `ServidorApm_cargoId_fkey`;

-- AlterTable
ALTER TABLE `acesso` DROP PRIMARY KEY,
    DROP COLUMN `idAcesso`,
    ADD COLUMN `diretor_temporario` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `ata` ADD COLUMN `created_at` DATETIME(3) NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `documentoscan` MODIFY `created_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `escola` DROP COLUMN `diretor_id`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `gerirata` ADD COLUMN `created_at` DATETIME(3) NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `imagens` ADD COLUMN `created_at` DATETIME(3) NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `servidor` DROP COLUMN `tipo_servidor`,
    ADD COLUMN `email_SED` VARCHAR(150) NULL,
    ADD COLUMN `senha_SED` TEXT NULL,
    MODIFY `rg` VARCHAR(11) NOT NULL,
    MODIFY `cpf` VARCHAR(11) NOT NULL,
    MODIFY `email` VARCHAR(150) NULL,
    MODIFY `created_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `servidorapm` DROP COLUMN `cargoId`,
    ADD COLUMN `cargoAPMId` INTEGER NOT NULL,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL,
    ADD COLUMN `deleted_at` DATETIME(3) NULL,
    ADD COLUMN `updated_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `telefone` ADD COLUMN `created_at` DATETIME(3) NOT NULL,
    ADD COLUMN `deleted_at` DATETIME(3) NULL,
    ADD COLUMN `updated_at` DATETIME(3) NULL;

-- DropTable
DROP TABLE `cargo`;

-- DropTable
DROP TABLE `gerirhasata`;

-- DropTable
DROP TABLE `servidoracesso`;

-- CreateTable
CREATE TABLE `NivelServidorAcesso` (
    `servidor_id` INTEGER NOT NULL,
    `nivel_acesso_id` INTEGER NOT NULL,

    PRIMARY KEY (`servidor_id`, `nivel_acesso_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CargoAPM` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(45) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AtaGerirAta` (
    `ataId` INTEGER NOT NULL,
    `gerirAtaId` INTEGER NOT NULL,

    PRIMARY KEY (`ataId`, `gerirAtaId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OficioMemorando` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `escola_id` INTEGER NOT NULL,
    `documento_scan_id` INTEGER NULL,
    `conteudo` TEXT NOT NULL,
    `tipo` VARCHAR(45) NOT NULL,
    `data` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `NivelServidorAcesso` ADD CONSTRAINT `NivelServidorAcesso_servidor_id_fkey` FOREIGN KEY (`servidor_id`) REFERENCES `Servidor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NivelServidorAcesso` ADD CONSTRAINT `NivelServidorAcesso_nivel_acesso_id_fkey` FOREIGN KEY (`nivel_acesso_id`) REFERENCES `Acesso`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ServidorApm` ADD CONSTRAINT `ServidorApm_cargoAPMId_fkey` FOREIGN KEY (`cargoAPMId`) REFERENCES `CargoAPM`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AtaGerirAta` ADD CONSTRAINT `AtaGerirAta_ataId_fkey` FOREIGN KEY (`ataId`) REFERENCES `Ata`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AtaGerirAta` ADD CONSTRAINT `AtaGerirAta_gerirAtaId_fkey` FOREIGN KEY (`gerirAtaId`) REFERENCES `GerirAta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OficioMemorando` ADD CONSTRAINT `OficioMemorando_escola_id_fkey` FOREIGN KEY (`escola_id`) REFERENCES `Escola`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OficioMemorando` ADD CONSTRAINT `OficioMemorando_documento_scan_id_fkey` FOREIGN KEY (`documento_scan_id`) REFERENCES `DocumentoScan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
