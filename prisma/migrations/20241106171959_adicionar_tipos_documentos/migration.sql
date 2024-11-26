-- DropForeignKey
ALTER TABLE `ocorrencia` DROP FOREIGN KEY `ocorrencia_documento_scan_id_fkey`;

-- DropForeignKey
ALTER TABLE `ocorrencia` DROP FOREIGN KEY `ocorrencia_servidor_id_fkey`;

-- DropForeignKey
ALTER TABLE `titulo` DROP FOREIGN KEY `titulo_documento_scan_id_fkey`;

-- AlterTable
ALTER TABLE `ocorrencia` ADD COLUMN `status` VARCHAR(45) NULL,
    MODIFY `lancado_por` INTEGER NULL,
    MODIFY `data_ocorrencia` DATETIME(3) NULL,
    MODIFY `servidor_id` INTEGER NULL,
    MODIFY `created_at` DATETIME(3) NULL,
    MODIFY `documento_scan_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `tipo_documento` MODIFY `descricao` ENUM('ATA_ASSINADA', 'CERTIDAO_NASCIMENTO', 'NOTA_FISCAL', 'ORCAMENTO', 'RECIBO', 'NIS', 'LAUDO', 'ATESTADO', 'CERTIFICADO', 'MEMORANDO', 'OFICIO', 'TOMBAMENTO', 'TERMO_DOACAO') NOT NULL;

-- AlterTable
ALTER TABLE `titulo` ADD COLUMN `status` VARCHAR(35) NULL,
    MODIFY `documento_scan_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `ocorrencia` ADD CONSTRAINT `ocorrencia_servidor_id_fkey` FOREIGN KEY (`servidor_id`) REFERENCES `servidor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ocorrencia` ADD CONSTRAINT `ocorrencia_documento_scan_id_fkey` FOREIGN KEY (`documento_scan_id`) REFERENCES `documento_scan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `titulo` ADD CONSTRAINT `titulo_documento_scan_id_fkey` FOREIGN KEY (`documento_scan_id`) REFERENCES `documento_scan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
