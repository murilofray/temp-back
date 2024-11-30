/*
  Warnings:

  - You are about to alter the column `menor_valor` on the `item` table. The data in that column could be lost. The data in that column will be cast from `Decimal(8,2)` to `Decimal(10,2)`.
  - You are about to alter the column `quantidade` on the `item` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(10,3)`.
  - You are about to alter the column `unidade` on the `item` table. The data in that column could be lost. The data in that column will be cast from `VarChar(40)` to `VarChar(5)`.
  - You are about to alter the column `valor` on the `movimentacao_financeira` table. The data in that column could be lost. The data in that column will be cast from `Decimal(8,2)` to `Decimal(10,2)`.
  - You are about to alter the column `valor` on the `proposta_item` table. The data in that column could be lost. The data in that column will be cast from `Decimal(8,2)` to `Decimal(10,2)`.
  - You are about to alter the column `saldo_final` on the `saldo_bancario` table. The data in that column could be lost. The data in that column will be cast from `Decimal(8,2)` to `Decimal(10,2)`.
  - You are about to alter the column `valor` on the `saldo_pdde` table. The data in that column could be lost. The data in that column will be cast from `Decimal(8,2)` to `Decimal(10,2)`.
  - You are about to alter the column `capital_valor` on the `saldo_pdde` table. The data in that column could be lost. The data in that column will be cast from `Decimal(8,2)` to `Decimal(10,2)`.
  - You are about to alter the column `custeio_valor` on the `saldo_pdde` table. The data in that column could be lost. The data in that column will be cast from `Decimal(8,2)` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE `item` MODIFY `menor_valor` DECIMAL(10, 2) NULL,
    MODIFY `quantidade` DECIMAL(10, 3) NOT NULL,
    MODIFY `unidade` VARCHAR(5) NOT NULL DEFAULT 'un.';

-- AlterTable
ALTER TABLE `movimentacao_financeira` MODIFY `valor` DECIMAL(10, 2) NULL;

-- AlterTable
ALTER TABLE `proposta_item` MODIFY `valor` DECIMAL(10, 2) NOT NULL;

-- AlterTable
ALTER TABLE `saldo_bancario` MODIFY `saldo_final` DECIMAL(10, 2) NOT NULL;

-- AlterTable
ALTER TABLE `saldo_pdde` MODIFY `valor` DECIMAL(10, 2) NOT NULL,
    MODIFY `capital_valor` DECIMAL(10, 2) NOT NULL,
    MODIFY `custeio_valor` DECIMAL(10, 2) NOT NULL;
