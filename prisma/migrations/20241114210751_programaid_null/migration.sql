-- AlterTable
ALTER TABLE `pesquisa_preco` ADD COLUMN `programa_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `pesquisa_preco` ADD CONSTRAINT `pesquisa_preco_programa_id_fkey` FOREIGN KEY (`programa_id`) REFERENCES `programa`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
