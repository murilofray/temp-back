/*
  Warnings:

  - A unique constraint covering the columns `[proponente_a,proponente_b,proponente_c]` on the table `pesquisa_preco` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `pesquisa_preco` ADD COLUMN `proponente_a` INTEGER NULL,
    ADD COLUMN `proponente_b` INTEGER NULL,
    ADD COLUMN `proponente_c` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `pesquisa_preco_proponente_a_proponente_b_proponente_c_key` ON `pesquisa_preco`(`proponente_a`, `proponente_b`, `proponente_c`);