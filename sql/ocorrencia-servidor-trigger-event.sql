SET GLOBAL event_scheduler = ON;
-- event_scheduler=ON

-- PRIMEIRO EVENTO
CREATE EVENT evento_diario_adicionar_pontuacao
ON SCHEDULE EVERY 1 DAY
STARTS '2023-11-30 00:00:00'
DO
  UPDATE servidor
  SET pontuacao_anual = pontuacao_anual + 1
  WHERE deleted_at IS null;

-- SEGUNDO EVENTO
CREATE EVENT evento_verificar_quinquenio
ON SCHEDULE EVERY 1 YEAR
STARTS '2024-02-02 00:00:00'
DO
	UPDATE servidor
		SET ano_do_ultimo_quinquenio = YEAR(CURDATE()) -- Atualiza para o ano atual
		WHERE deleted_at IS NULL
		AND ano_do_ultimo_quinquenio = YEAR(CURDATE()) - 5;


-- TERCEIRO EVENTO
DELIMITER //

CREATE EVENT evento_anual_calcular_assiduidade
ON SCHEDULE EVERY 1 YEAR
STARTS '2023-11-30 00:00:00'
DO
BEGIN
  DECLARE tempo_minimo INT;

  -- Busca o valor de 'tempo_minimo_assiduidade' da tabela configuracao
  SELECT tempo_minimo_assiduidade INTO tempo_minimo
  FROM configuracao
  WHERE ano_letivo = YEAR(CURDATE())
  LIMIT 1;

  -- Atualiza a pontuação de assiduidade para cada servidor
  UPDATE servidor s
  SET pontuacao_assiduidade = pontuacao_assiduidade + (
    SELECT
      CASE
        WHEN COUNT(o.id) < 7 THEN 2
        WHEN COUNT(o.id) < 13 THEN 1
        ELSE 0
      END
    FROM ocorrencia o
    LEFT JOIN abono a ON o.abono_id = a.id
    WHERE 
      o.servidor_id = s.id
      AND o.deleted_at IS NULL
      AND YEAR(o.data_ocorrencia) = YEAR(CURDATE()) -- Apenas ocorrências deste ano
      AND (
        o.status = 'Recusada' OR a.abona = FALSE OR o.abono_id IS NULL
      )
  )
  WHERE s.deleted_at IS NULL;

  -- Verifica se a pontuação do servidor é >= 6 e se o ano da última progressão por assiduidade foi há 'tempo_minimo' anos ou mais
  UPDATE servidor s
  SET apto_para_progressao_por_assiduidade = 1,
      pontuacao_assiduidade = 0,
      ano_da_ultima_progressao_por_assiduidade = YEAR(CURDATE())
  WHERE s.pontuacao_assiduidade >= 6
    AND s.ano_da_ultima_progressao_por_assiduidade <= YEAR(CURDATE()) - tempo_minimo  -- Configurável
    AND s.deleted_at IS NULL;
END//

DELIMITER ;


-- QUARTO EVENTO

DELIMITER //

CREATE EVENT evento_anual_calcular_progressao_titulos
ON SCHEDULE EVERY 1 YEAR
STARTS '2023-11-30 00:00:00'
DO
BEGIN
  -- Cria uma tabela temporária para armazenar servidores aptos
  CREATE TEMPORARY TABLE servidores_aptos AS
  SELECT 
    t.servidor_id,
    SUM(COALESCE(t.pontos, 0)) AS pontuacao_total,
    MAX(s.ano_da_ultima_progressao_por_titulos) AS ultima_progressao
  FROM titulo t
  JOIN servidor s ON t.servidor_id = s.id
  WHERE t.deleted_at IS NULL
    AND t.status = 'Aceito'
    AND (t.validade IS NULL OR t.validade >= CURDATE()) -- Apenas títulos não vencidos
    AND t.data_conclusao >= DATE_SUB(CURDATE(), INTERVAL 5 YEAR) -- Apenas títulos recentes
  GROUP BY t.servidor_id
  HAVING pontuacao_total >= 5 -- Apenas servidores com pontuação suficiente
    AND ultima_progressao <= YEAR(CURDATE()) - 5; -- Progressão há pelo menos 5 anos

  -- Atualiza os servidores aptos para progressão por títulos
  UPDATE servidor s
  SET apto_para_progressao_por_titulos = 1,
      ano_da_ultima_progressao_por_titulos = YEAR(CURDATE())
  WHERE s.id IN (SELECT servidor_id FROM servidores_aptos)
    AND s.deleted_at IS NULL;

  -- Remove a tabela temporária
  DROP TEMPORARY TABLE servidores_aptos;
END//

DELIMITER ;



-- QUINTO EVENTO

DELIMITER //

CREATE EVENT evento_anual_recusar_ocorrencias
ON SCHEDULE EVERY 1 YEAR
STARTS '2023-11-30 00:00:00'
DO
BEGIN
  -- Atualiza ocorrências com status "Não justificada"
  UPDATE ocorrencia
  SET status = 'Recusada',
      motivo = 'O ano letivo foi encerrado, essa ocorrência não foi justificada.'
  WHERE status = 'Não justificada'
    AND deleted_at IS NULL
	AND id IS NOT NULL;

  -- Atualiza ocorrências com status "Não avaliada"
  UPDATE ocorrencia
  SET status = 'Recusada',
      motivo = 'O ano letivo foi encerrado, essa ocorrência não foi avaliada.'
  WHERE status = 'Não avaliada'
    AND deleted_at IS NULL
	AND id IS NOT NULL; 
END//

DELIMITER ;

-- PRIMEIRA TRIGGER
DELIMITER //

CREATE TRIGGER tirar_ponto_docente
AFTER INSERT ON ocorrencia
FOR EACH ROW
BEGIN
    UPDATE servidor
    SET pontuacao_anual = pontuacao_anual - 1
    WHERE id = NEW.servidor_id AND deleted_at IS NULL;;
END//

DELIMITER ;

-- SEGUNDA TRIGGER

DELIMITER //

CREATE TRIGGER verificar_update_ocorrencia_adicionar_ponto
AFTER UPDATE ON ocorrencia
FOR EACH ROW
BEGIN
    IF NEW.status = 'Aceita' THEN
        UPDATE servidor
        SET pontuacao_anual = pontuacao_anual + 1
        WHERE id = NEW.servidor_id
          AND deleted_at IS null
          AND EXISTS (
              SELECT 1
              FROM abono
              WHERE id = NEW.abono_id AND abona = TRUE
          );
    END IF;
END//

DELIMITER ;