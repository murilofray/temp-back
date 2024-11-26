/*
  Warnings:

  - The primary key for the `alunodocumentos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `alunoId` on the `alunodocumentos` table. All the data in the column will be lost.
  - You are about to drop the column `documentosScanId` on the `alunodocumentos` table. All the data in the column will be lost.
  - You are about to drop the column `descricao` on the `opcaoresposta` table. All the data in the column will be lost.
  - Added the required column `aluno_documento_id` to the `AlunoDocumentos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `documento_scan_id` to the `AlunoDocumentos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `Pergunta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `Questionario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `QuestionarioAluno` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `Resposta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `Turma` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `alunodocumentos` DROP FOREIGN KEY `AlunoDocumentos_alunoId_fkey`;

-- DropForeignKey
ALTER TABLE `alunodocumentos` DROP FOREIGN KEY `AlunoDocumentos_documentosScanId_fkey`;

-- AlterTable
ALTER TABLE `alunodocumentos` DROP PRIMARY KEY,
    DROP COLUMN `alunoId`,
    DROP COLUMN `documentosScanId`,
    ADD COLUMN `aluno_documento_id` INTEGER NOT NULL,
    ADD COLUMN `documento_scan_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`documento_scan_id`, `aluno_documento_id`);

-- AlterTable
ALTER TABLE `opcao` MODIFY `descricao` TEXT NULL;

-- AlterTable
ALTER TABLE `opcaoresposta` DROP COLUMN `descricao`,
    ADD COLUMN `resposta_descricao` TEXT NULL;

-- AlterTable
ALTER TABLE `pergunta` ADD COLUMN `created_at` DATETIME(3) NOT NULL,
    ADD COLUMN `deleted_at` DATETIME(3) NULL,
    ADD COLUMN `updated_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `questionario` ADD COLUMN `created_at` DATETIME(3) NOT NULL,
    ADD COLUMN `deleted_at` DATETIME(3) NULL,
    ADD COLUMN `updated_at` DATETIME(3) NULL,
    MODIFY `descricao` TEXT NULL;

-- AlterTable
ALTER TABLE `questionarioaluno` ADD COLUMN `created_at` DATETIME(3) NOT NULL,
    ADD COLUMN `deleted_at` DATETIME(3) NULL,
    ADD COLUMN `updated_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `resposta` ADD COLUMN `created_at` DATETIME(3) NOT NULL,
    ADD COLUMN `deleted_at` DATETIME(3) NULL,
    ADD COLUMN `updated_at` DATETIME(3) NULL,
    MODIFY `resposta` TEXT NULL;

-- AlterTable
ALTER TABLE `turma` ADD COLUMN `created_at` DATETIME(3) NOT NULL,
    ADD COLUMN `deleted_at` DATETIME(3) NULL,
    ADD COLUMN `updated_at` DATETIME(3) NULL;

-- AddForeignKey
ALTER TABLE `AlunoDocumentos` ADD CONSTRAINT `AlunoDocumentos_documento_scan_id_fkey` FOREIGN KEY (`documento_scan_id`) REFERENCES `DocumentoScan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AlunoDocumentos` ADD CONSTRAINT `AlunoDocumentos_aluno_documento_id_fkey` FOREIGN KEY (`aluno_documento_id`) REFERENCES `Aluno`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
