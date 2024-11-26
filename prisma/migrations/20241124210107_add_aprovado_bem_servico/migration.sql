-- AlterTable
ALTER TABLE `bem` ADD COLUMN `aprovado` BOOLEAN NULL DEFAULT false,
    ADD COLUMN `melhor_proponente` INTEGER NULL;

-- AlterTable
ALTER TABLE `servico` ADD COLUMN `aprovado` BOOLEAN NULL DEFAULT false,
    ADD COLUMN `melhor_proponente` INTEGER NULL;
