/*
  Warnings:

  - Added the required column `tipo` to the `pesquisa_preco` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pesquisa_preco` ADD COLUMN `tipo` VARCHAR(1) NOT NULL;
