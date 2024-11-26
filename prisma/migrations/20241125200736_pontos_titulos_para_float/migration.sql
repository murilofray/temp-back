/*
  Warnings:

  - You are about to alter the column `pontos` on the `titulo` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `titulo` MODIFY `pontos` DOUBLE NULL;
