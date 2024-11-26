/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `fornecedor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `servidor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `fornecedor_email_key` ON `fornecedor`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `servidor_email_key` ON `servidor`(`email`);
