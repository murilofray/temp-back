/*
  Warnings:

  - You are about to drop the column `curso_horas_max_ano` on the `configuracao` table. All the data in the column will be lost.
  - You are about to drop the column `curso_horas_minimas` on the `configuracao` table. All the data in the column will be lost.
  - You are about to drop the column `curso_validade` on the `configuracao` table. All the data in the column will be lost.
  - You are about to alter the column `ano_letivo` on the `configuracao` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Year`.
  - You are about to drop the column `tipo` on the `titulo` table. All the data in the column will be lost.
  - Added the required column `fim_ano_letivo` to the `configuracao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inicio_ano_letivo` to the `configuracao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo_id` to the `titulo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `configuracao` DROP COLUMN `curso_horas_max_ano`,
    DROP COLUMN `curso_horas_minimas`,
    DROP COLUMN `curso_validade`,
    ADD COLUMN `fim_ano_letivo` DATETIME(3) NOT NULL,
    ADD COLUMN `inicio_ano_letivo` DATETIME(3) NOT NULL,
    MODIFY `ano_letivo` YEAR NOT NULL;

-- AlterTable
ALTER TABLE `servidor` ADD COLUMN `ano_da_ultima_progressao_por_titulo` YEAR NULL,
    ADD COLUMN `ano_do_ultimo_quinquenio` YEAR NULL;

-- AlterTable
ALTER TABLE `tipo_documento` MODIFY `descricao` ENUM('ATA_ASSINADA', 'CERTIDAO_NASCIMENTO', 'NOTA_FISCAL', 'ORCAMENTO', 'RECIBO', 'NIS', 'LAUDO', 'ATESTADO', 'CERTIFICADO', 'MEMORANDO', 'OFICIO', 'TOMBAMENTO', 'TERMO_DOACAO', 'RG', 'CPF', 'DECLARACAO_VACINACAO', 'COMPROVANTE_RESIDENCIA', 'DOCUMENTO_DO_RESPONSAVEL', 'AUTODECLARACAO_RACIAL', 'TABELA_VENCIMENTO') NOT NULL;

-- AlterTable
ALTER TABLE `titulo` DROP COLUMN `tipo`,
    ADD COLUMN `tipo_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `CategoriaCertificado` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `pontos_por_hora` DOUBLE NULL,
    `horas_minimas` INTEGER NULL,
    `horas_maximas` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `titulo` ADD CONSTRAINT `titulo_tipo_id_fkey` FOREIGN KEY (`tipo_id`) REFERENCES `CategoriaCertificado`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
