/*
  Warnings:

  - Added the required column `bairro` to the `aluno` table without a default value. This is not possible if the table is not empty.
  - Added the required column `beneficiarioBF` to the `aluno` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cep` to the `aluno` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cidade` to the `aluno` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cpf` to the `aluno` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logradouro` to the `aluno` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numero` to the `aluno` table without a default value. This is not possible if the table is not empty.
  - Added the required column `raca` to the `aluno` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sexo` to the `aluno` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uf` to the `aluno` table without a default value. This is not possible if the table is not empty.
  - Made the column `nome_mae` on table `aluno` required. This step will fail if there are existing NULL values in that column.
  - Made the column `data_nascimento` on table `aluno` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `aluno` ADD COLUMN `bairro` VARCHAR(255) NOT NULL,
    ADD COLUMN `beneficiarioBF` BOOLEAN NOT NULL,
    ADD COLUMN `celular` CHAR(11) NULL,
    ADD COLUMN `cep` VARCHAR(9) NOT NULL,
    ADD COLUMN `cidade` VARCHAR(255) NOT NULL,
    ADD COLUMN `cpf` VARCHAR(11) NOT NULL,
    ADD COLUMN `logradouro` VARCHAR(255) NOT NULL,
    ADD COLUMN `numero` VARCHAR(6) NOT NULL,
    ADD COLUMN `raca` CHAR(8) NOT NULL,
    ADD COLUMN `sexo` CHAR(1) NOT NULL,
    ADD COLUMN `uf` CHAR(2) NOT NULL,
    MODIFY `nome_mae` VARCHAR(255) NOT NULL,
    MODIFY `data_nascimento` DATETIME(3) NOT NULL;
