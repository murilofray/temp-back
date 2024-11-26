/*
  Warnings:

  - You are about to alter the column `diretor_temporario` on the `acesso` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.
  - You are about to drop the column `atestado` on the `ocorrencia` table. All the data in the column will be lost.
  - You are about to drop the column `certificado` on the `titulo` table. All the data in the column will be lost.
  - You are about to alter the column `data` on the `titulo` table. The data in that column could be lost. The data in that column will be cast from `VarChar(45)` to `DateTime(3)`.
  - Added the required column `created_at` to the `Ocorrencia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `documento_scan_id` to the `Ocorrencia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `Progressao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `Quinquenio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `Titulo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `documento_scan_id` to the `Titulo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `acesso` MODIFY `diretor_temporario` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `ocorrencia` DROP COLUMN `atestado`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL,
    ADD COLUMN `deleted_at` DATETIME(3) NULL,
    ADD COLUMN `documento_scan_id` INTEGER NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NULL,
    MODIFY `descricao` TEXT NULL;

-- AlterTable
ALTER TABLE `progressao` ADD COLUMN `created_at` DATETIME(3) NOT NULL,
    ADD COLUMN `deleted_at` DATETIME(3) NULL,
    ADD COLUMN `updated_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `quinquenio` ADD COLUMN `created_at` DATETIME(3) NOT NULL,
    ADD COLUMN `deleted_at` DATETIME(3) NULL,
    ADD COLUMN `updated_at` DATETIME(3) NULL,
    MODIFY `detalhes` TEXT NULL;

-- AlterTable
ALTER TABLE `titulo` DROP COLUMN `certificado`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL,
    ADD COLUMN `deleted_at` DATETIME(3) NULL,
    ADD COLUMN `documento_scan_id` INTEGER NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NULL,
    MODIFY `data` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `configuracao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ano_letivo` INTEGER NOT NULL,
    `tempo_minimo_assiduidade` INTEGER NOT NULL,
    `tempo_minimo_titulo` INTEGER NOT NULL,
    `curso_horas_minimas` INTEGER NOT NULL,
    `curso_validade` INTEGER NOT NULL,
    `curso_horas_max_ano` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `secretaria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(75) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Ocorrencia` ADD CONSTRAINT `Ocorrencia_documento_scan_id_fkey` FOREIGN KEY (`documento_scan_id`) REFERENCES `DocumentoScan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Titulo` ADD CONSTRAINT `Titulo_documento_scan_id_fkey` FOREIGN KEY (`documento_scan_id`) REFERENCES `DocumentoScan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
