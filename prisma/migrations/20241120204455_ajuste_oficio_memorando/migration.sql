/*
  Warnings:

  - You are about to drop the column `conteudo` on the `oficio_memorando` table. All the data in the column will be lost.
  - You are about to alter the column `ano` on the `turma` table. The data in that column could be lost. The data in that column will be cast from `VarChar(6)` to `VarChar(5)`.
  - Added the required column `titulo` to the `oficio_memorando` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `oficio_memorando` DROP COLUMN `conteudo`,
    ADD COLUMN `titulo` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `turma` MODIFY `ano` VARCHAR(5) NULL;
