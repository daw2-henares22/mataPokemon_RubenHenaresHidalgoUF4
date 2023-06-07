-- Consulta para crear función proyectosTodosDetalle(user_id)

CREATE OR REPLACE FUNCTION rubricasTodosDetalleDeEnunciadoId(id_enunciado INT)
RETURNS TABLE (
  id INT,
  rubrica_id INT,  
  peso INT,  
  rubrica_nombre TEXT,
  rubrica_descripcion TEXT
)
LANGUAGE SQL
AS $$ 
SELECT DISTINCT
  enunciados_rubricas.id AS id,
  rubricas.id AS rubrica_id,
  enunciados_rubricas.peso AS rubrica_peso,
  rubricas.nombre AS rubrica_nombre,
  rubricas.descripcion AS rubrica_descripcion
FROM rubricas
INNER JOIN enunciados_rubricas ON rubricas.id = enunciados_rubricas.rubrica_id
INNER JOIN enunciados ON enunciados.id = enunciados_rubricas.enunciado_id
WHERE enunciados.id = id_enunciado;
$$;


-- API JAVASCRIPT DE SUPABASE


