/*
  Warnings:

  - Added the required column `escola_id` to the `ata` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ata` ADD COLUMN `escola_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `ata` ADD CONSTRAINT `ata_escola_id_fkey` FOREIGN KEY (`escola_id`) REFERENCES `escola`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
