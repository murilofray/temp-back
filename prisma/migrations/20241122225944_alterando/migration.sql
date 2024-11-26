/*
  Warnings:

  - You are about to alter the column `titulo` on the `pesquisa_preco` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(60)`.

*/
-- AlterTable
ALTER TABLE `bem` MODIFY `descricao` VARCHAR(60) NOT NULL;

-- AlterTable
ALTER TABLE `fornecedor` MODIFY `cidade` VARCHAR(60) NOT NULL,
    MODIFY `endereco` VARCHAR(60) NOT NULL,
    MODIFY `responsavel` VARCHAR(60) NULL,
    MODIFY `nome_fantasia` VARCHAR(60) NULL,
    MODIFY `telefone` VARCHAR(60) NOT NULL,
    MODIFY `email` VARCHAR(60) NULL,
    MODIFY `razao_social` VARCHAR(60) NOT NULL;

-- AlterTable
ALTER TABLE `oficio_memorando` MODIFY `tipo` VARCHAR(60) NOT NULL;

-- AlterTable
ALTER TABLE `pdde` MODIFY `tipo` VARCHAR(60) NOT NULL;

-- AlterTable
ALTER TABLE `pesquisa_preco` MODIFY `titulo` VARCHAR(60) NOT NULL;

-- AlterTable
ALTER TABLE `servico` MODIFY `descricao` VARCHAR(60) NOT NULL;
