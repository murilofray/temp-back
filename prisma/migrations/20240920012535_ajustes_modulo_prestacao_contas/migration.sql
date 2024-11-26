/*
  Warnings:

  - You are about to drop the column `num_conta` on the `contabancaria` table. All the data in the column will be lost.
  - You are about to drop the column `saldo_bancario_id` on the `contabancaria` table. All the data in the column will be lost.
  - You are about to drop the column `reciboId` on the `movimentacaobancaria` table. All the data in the column will be lost.
  - You are about to drop the column `saldo_pdde_id` on the `pdde` table. All the data in the column will be lost.
  - You are about to drop the column `saldoAnterior` on the `saldobancario` table. All the data in the column will be lost.
  - You are about to drop the column `saldoAnterior` on the `saldopdde` table. All the data in the column will be lost.
  - You are about to drop the `acesso` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `alunodocumentos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `nivelservidoracesso` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `created_at` to the `ContaBancaria` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numero_conta` to the `ContaBancaria` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `PDDE` table without a default value. This is not possible if the table is not empty.
  - Added the required column `conta_bancaria_id` to the `SaldoBancario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `saldo_PDDE_id` to the `SaldoPDDE` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `alunodocumentos` DROP FOREIGN KEY `AlunoDocumentos_aluno_documento_id_fkey`;

-- DropForeignKey
ALTER TABLE `alunodocumentos` DROP FOREIGN KEY `AlunoDocumentos_documento_scan_id_fkey`;

-- DropForeignKey
ALTER TABLE `contabancaria` DROP FOREIGN KEY `ContaBancaria_saldo_bancario_id_fkey`;

-- DropForeignKey
ALTER TABLE `movimentacaobancaria` DROP FOREIGN KEY `MovimentacaoBancaria_reciboId_fkey`;

-- DropForeignKey
ALTER TABLE `nivelservidoracesso` DROP FOREIGN KEY `NivelServidorAcesso_nivel_acesso_id_fkey`;

-- DropForeignKey
ALTER TABLE `nivelservidoracesso` DROP FOREIGN KEY `NivelServidorAcesso_servidor_id_fkey`;

-- DropForeignKey
ALTER TABLE `pdde` DROP FOREIGN KEY `PDDE_saldo_pdde_id_fkey`;

-- AlterTable
ALTER TABLE `contabancaria` DROP COLUMN `num_conta`,
    DROP COLUMN `saldo_bancario_id`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL,
    ADD COLUMN `numero_conta` VARCHAR(10) NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `movimentacaobancaria` DROP COLUMN `reciboId`,
    ADD COLUMN `documento_scan_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `pdde` DROP COLUMN `saldo_pdde_id`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `saldobancario` DROP COLUMN `saldoAnterior`,
    ADD COLUMN `conta_bancaria_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `saldopdde` DROP COLUMN `saldoAnterior`,
    ADD COLUMN `saldo_PDDE_id` INTEGER NOT NULL;

-- DropTable
DROP TABLE `acesso`;

-- DropTable
DROP TABLE `alunodocumentos`;

-- DropTable
DROP TABLE `nivelservidoracesso`;

-- CreateTable
CREATE TABLE `NivelAcesso` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` INTEGER NOT NULL,
    `diretor_temporario` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NivelAcessoServidor` (
    `servidor_id` INTEGER NOT NULL,
    `nivel_acesso_id` INTEGER NOT NULL,

    PRIMARY KEY (`servidor_id`, `nivel_acesso_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AlunoDocumento` (
    `documento_scan_id` INTEGER NOT NULL,
    `aluno_documento_id` INTEGER NOT NULL,

    PRIMARY KEY (`documento_scan_id`, `aluno_documento_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `NivelAcessoServidor` ADD CONSTRAINT `NivelAcessoServidor_servidor_id_fkey` FOREIGN KEY (`servidor_id`) REFERENCES `Servidor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NivelAcessoServidor` ADD CONSTRAINT `NivelAcessoServidor_nivel_acesso_id_fkey` FOREIGN KEY (`nivel_acesso_id`) REFERENCES `NivelAcesso`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SaldoPDDE` ADD CONSTRAINT `SaldoPDDE_saldo_PDDE_id_fkey` FOREIGN KEY (`saldo_PDDE_id`) REFERENCES `PDDE`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SaldoBancario` ADD CONSTRAINT `SaldoBancario_conta_bancaria_id_fkey` FOREIGN KEY (`conta_bancaria_id`) REFERENCES `ContaBancaria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MovimentacaoBancaria` ADD CONSTRAINT `MovimentacaoBancaria_documento_scan_id_fkey` FOREIGN KEY (`documento_scan_id`) REFERENCES `DocumentoScan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AlunoDocumento` ADD CONSTRAINT `AlunoDocumento_documento_scan_id_fkey` FOREIGN KEY (`documento_scan_id`) REFERENCES `DocumentoScan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AlunoDocumento` ADD CONSTRAINT `AlunoDocumento_aluno_documento_id_fkey` FOREIGN KEY (`aluno_documento_id`) REFERENCES `Aluno`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
