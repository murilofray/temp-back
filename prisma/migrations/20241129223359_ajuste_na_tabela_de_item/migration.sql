/*
  Warnings:

  - You are about to drop the `proposta_bem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `proposta_bem` DROP FOREIGN KEY `proposta_bem_fornecedor_id_fkey`;

-- DropForeignKey
ALTER TABLE `proposta_bem` DROP FOREIGN KEY `proposta_bem_item_id_fkey`;

-- DropTable
DROP TABLE `proposta_bem`;

-- CreateTable
CREATE TABLE `proposta_item` (
    `item_id` INTEGER NOT NULL,
    `fornecedor_id` INTEGER NOT NULL,
    `valor` DECIMAL(8, 2) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`item_id`, `fornecedor_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `proposta_item` ADD CONSTRAINT `proposta_item_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `proposta_item` ADD CONSTRAINT `proposta_item_fornecedor_id_fkey` FOREIGN KEY (`fornecedor_id`) REFERENCES `fornecedor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
