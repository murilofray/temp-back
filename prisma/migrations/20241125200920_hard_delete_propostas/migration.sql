/*
  Warnings:

  - You are about to drop the column `deleted_at` on the `proposta_bem` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `proposta_servico` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `proposta_bem` DROP COLUMN `deleted_at`;

-- AlterTable
ALTER TABLE `proposta_servico` DROP COLUMN `deleted_at`;
