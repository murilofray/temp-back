/*
  Warnings:

  - Added the required column `escola_id` to the `TermoDoacao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `termodoacao` ADD COLUMN `escola_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `TermoDoacao` ADD CONSTRAINT `TermoDoacao_escola_id_fkey` FOREIGN KEY (`escola_id`) REFERENCES `Escola`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TermoDoacao` ADD CONSTRAINT `TermoDoacao_documento_scan_id_fkey` FOREIGN KEY (`documento_scan_id`) REFERENCES `DocumentoScan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
