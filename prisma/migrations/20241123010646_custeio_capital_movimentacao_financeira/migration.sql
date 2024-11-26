/*
  Warnings:

  - Added the required column `custeio_capital` to the `movimentacao_financeira` table without a default value. This is not possible if the table is not empty.
  - Made the column `tipo` on table `movimentacao_financeira` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `movimentacao_financeira` ADD COLUMN `custeio_capital` VARCHAR(7) NOT NULL,
    MODIFY `tipo` VARCHAR(1) NOT NULL;
