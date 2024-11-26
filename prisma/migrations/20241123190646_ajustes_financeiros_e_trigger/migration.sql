/*
  Warnings:

  - You are about to drop the column `data` on the `saldo_bancario` table. All the data in the column will be lost.
  - You are about to drop the column `saldo` on the `saldo_bancario` table. All the data in the column will be lost.
  - Added the required column `ano` to the `saldo_bancario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `saldo_final` to the `saldo_bancario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `capital_valor` to the `saldo_pdde` table without a default value. This is not possible if the table is not empty.
  - Added the required column `custeio_valor` to the `saldo_pdde` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `saldo_bancario` DROP COLUMN `data`,
    DROP COLUMN `saldo`,
    ADD COLUMN `ano` INTEGER NOT NULL,
    ADD COLUMN `saldo_final` DECIMAL(8, 2) NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `saldo_pdde` ADD COLUMN `capital_valor` DECIMAL(8, 2) NOT NULL,
    ADD COLUMN `custeio_valor` DECIMAL(8, 2) NOT NULL;

-- Possivelmente esta trigger não funciona pelo migrate, mas vai ficar aqui por enquanto mesmo, apesar de ter um jeito mais decente de rodar

-- Trigger para INSERT em movimentacao_financeira
CREATE TRIGGER atualizar_saldo_apos_movimentacao_insert
AFTER INSERT ON movimentacao_financeira
FOR EACH ROW
BEGIN
    -- Atualizar o saldo bancário para o ano correspondente
    UPDATE saldo_bancario
    SET saldo_final = saldo_final +
        CASE
            WHEN NEW.tipo = 'E' THEN NEW.valor
            WHEN NEW.tipo = 'S' THEN -NEW.valor
            ELSE 0
        END,
        updated_at = NOW()
    WHERE conta_bancaria_id = NEW.conta_bancaria_id
      AND ano = YEAR(NEW.data);

    -- Atualizar o saldo PDDE
    UPDATE saldo_pdde
    SET
        custeio_valor = custeio_valor +
        CASE
            WHEN NEW.tipo = 'E' THEN NEW.valor * (custeio / 100) -- Proporção de Custeio
            WHEN NEW.tipo = 'S' AND NEW.custeio_capital = 'Custeio' THEN -NEW.valor
            ELSE 0
        END,
        capital_valor = capital_valor +
        CASE
            WHEN NEW.tipo = 'E' THEN NEW.valor * (capital / 100) -- Proporção de Capital
            WHEN NEW.tipo = 'S' AND NEW.custeio_capital = 'Capital' THEN -NEW.valor
            ELSE 0
        END,
        updated_at = NOW()
    WHERE saldo_PDDE_id = (SELECT id FROM pdde WHERE id = NEW.conta_bancaria_id);
END;

-- Trigger para UPDATE em movimentacao_financeira
CREATE TRIGGER atualizar_saldo_apos_movimentacao_update
AFTER UPDATE ON movimentacao_financeira
FOR EACH ROW
BEGIN
    -- Atualizar o saldo bancário removendo o valor antigo e adicionando o novo
    UPDATE saldo_bancario
    SET saldo_final = saldo_final +
        CASE
            WHEN OLD.tipo = 'E' THEN -OLD.valor
            WHEN OLD.tipo = 'S' THEN OLD.valor
            ELSE 0
        END +
        CASE
            WHEN NEW.tipo = 'E' THEN NEW.valor
            WHEN NEW.tipo = 'S' THEN -NEW.valor
            ELSE 0
        END,
        updated_at = NOW()
    WHERE conta_bancaria_id = NEW.conta_bancaria_id
      AND ano = YEAR(NEW.data);

    -- Atualizar o saldo PDDE removendo o valor antigo e adicionando o novo
    UPDATE saldo_pdde
    SET
        custeio_valor = custeio_valor +
        CASE
            WHEN OLD.tipo = 'E' THEN -OLD.valor * (custeio / 100)
            WHEN OLD.tipo = 'S' AND OLD.custeio_capital = 'Custeio' THEN OLD.valor
            ELSE 0
        END +
        CASE
            WHEN NEW.tipo = 'E' THEN NEW.valor * (custeio / 100)
            WHEN NEW.tipo = 'S' AND NEW.custeio_capital = 'Custeio' THEN -NEW.valor
            ELSE 0
        END,
        capital_valor = capital_valor +
        CASE
            WHEN OLD.tipo = 'E' THEN -OLD.valor * (capital / 100)
            WHEN OLD.tipo = 'S' AND OLD.custeio_capital = 'Capital' THEN OLD.valor
            ELSE 0
        END +
        CASE
            WHEN NEW.tipo = 'E' THEN NEW.valor * (capital / 100)
            WHEN NEW.tipo = 'S' AND NEW.custeio_capital = 'Capital' THEN -NEW.valor
            ELSE 0
        END,
        updated_at = NOW()
    WHERE saldo_PDDE_id = (SELECT id FROM pdde WHERE id = NEW.conta_bancaria_id);
END;

-- Trigger para DELETE em movimentacao_financeira
CREATE TRIGGER atualizar_saldo_apos_movimentacao_delete
AFTER DELETE ON movimentacao_financeira
FOR EACH ROW
BEGIN
    -- Atualizar o saldo bancário removendo o valor deletado
    UPDATE saldo_bancario
    SET saldo_final = saldo_final -
        CASE
            WHEN OLD.tipo = 'E' THEN OLD.valor
            WHEN OLD.tipo = 'S' THEN -OLD.valor
            ELSE 0
        END,
        updated_at = NOW()
    WHERE conta_bancaria_id = OLD.conta_bancaria_id
      AND ano = YEAR(OLD.data);

    -- Atualizar o saldo PDDE removendo o valor deletado
    UPDATE saldo_pdde
    SET
        custeio_valor = custeio_valor -
        CASE
            WHEN OLD.tipo = 'E' THEN OLD.valor * (custeio / 100)
            WHEN OLD.tipo = 'S' AND OLD.custeio_capital = 'Custeio' THEN -OLD.valor
            ELSE 0
        END,
        capital_valor = capital_valor -
        CASE
            WHEN OLD.tipo = 'E' THEN OLD.valor * (capital / 100)
            WHEN OLD.tipo = 'S' AND OLD.custeio_capital = 'Capital' THEN -OLD.valor
            ELSE 0
        END,
        updated_at = NOW()
    WHERE saldo_PDDE_id = (SELECT id FROM pdde WHERE id = OLD.conta_bancaria_id);
END;

