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
    WHERE conta_bancaria_id = NEW.conta_bancaria_id AND ano = YEAR(NEW.data);

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
    WHERE saldo_PDDE_id = (SELECT id FROM pdde WHERE conta_bancaria_id = NEW.conta_bancaria_id);
END;$

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
    WHERE conta_bancaria_id = NEW.conta_bancaria_id AND ano = YEAR(NEW.data);

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
    WHERE saldo_PDDE_id = (SELECT id FROM pdde WHERE conta_bancaria_id = NEW.conta_bancaria_id);
END;$

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
    WHERE conta_bancaria_id = OLD.conta_bancaria_id AND ano = YEAR(OLD.data);

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
    WHERE saldo_PDDE_id = (SELECT id FROM pdde WHERE conta_bancaria_id = OLD.conta_bancaria_id);
END;$
