/*
  Warnings:

  - A unique constraint covering the columns `[cnpj]` on the table `fornecedor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cpf]` on the table `fornecedor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cpf]` on the table `servidor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `fornecedor_cnpj_key` ON `fornecedor`(`cnpj`);

-- CreateIndex
CREATE UNIQUE INDEX `fornecedor_cpf_key` ON `fornecedor`(`cpf`);

-- CreateIndex
CREATE UNIQUE INDEX `servidor_cpf_key` ON `servidor`(`cpf`);
