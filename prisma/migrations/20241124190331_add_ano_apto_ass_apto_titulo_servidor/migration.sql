-- AlterTable
ALTER TABLE `servidor` ADD COLUMN `ano_da_ultima_progressao_por_assiduidade` YEAR NULL,
    ADD COLUMN `apto_para_progressao_por_assiduidade` BOOLEAN NULL,
    ADD COLUMN `apto_para_progressao_por_titulo` BOOLEAN NULL;

-- AlterTable
ALTER TABLE `titulo` MODIFY `validade` DATETIME(3) NULL;
