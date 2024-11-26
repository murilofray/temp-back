/*
  Warnings:

  - You are about to drop the `movimentacao_bancaria` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `movimentacao_bancaria` DROP FOREIGN KEY `movimentacao_bancaria_conta_bancaria_id_fkey`;

-- DropForeignKey
ALTER TABLE `movimentacao_bancaria` DROP FOREIGN KEY `movimentacao_bancaria_documento_scan_id_fkey`;

-- DropTable
DROP TABLE `movimentacao_bancaria`;

-- CreateTable
CREATE TABLE `movimentacao_financeira` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `conta_bancaria_id` INTEGER NOT NULL,
    `documento_scan_id` INTEGER NULL,
    `data` DATETIME(3) NULL,
    `valor` DECIMAL(8, 2) NULL,
    `descricao` VARCHAR(255) NULL,
    `tipo` VARCHAR(1) NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `movimentacao_financeira` ADD CONSTRAINT `movimentacao_financeira_conta_bancaria_id_fkey` FOREIGN KEY (`conta_bancaria_id`) REFERENCES `conta_bancaria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `movimentacao_financeira` ADD CONSTRAINT `movimentacao_financeira_documento_scan_id_fkey` FOREIGN KEY (`documento_scan_id`) REFERENCES `documento_scan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
