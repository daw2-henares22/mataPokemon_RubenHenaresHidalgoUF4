-- Consulta para crear función

CREATE OR REPLACE FUNCTION PROYECTODETALLEID(ID INT
) RETURNS TABLE(ID INT, CREATED_AT TIMESTAMP, NOMBRE 
TEXT, DESCRIPCION TEXT, USER_ID UUID, ESTADO TEXT
, ENUNCIADO_ID INT, NOMBRE_USUARIO TEXT, APELLIDOS_USUARIO 
TEXT, NOMBRE_ENUNCIADO TEXT, DEFINICION_ENUNCIADO 
TEXT) LANGUAGE SQL AS 
	$$
	SELECT
	    DISTINCT proyectos.id,
	    to_timestamp(
	        proyectos.created_at:: text,
	        'YYYY-MM-DD HH24:MI:SS'
	    ) AS created_at,
	    proyectos.nombre,
	    proyectos.descripcion,
	    proyectos.user_id,
	    proyectos.estado,
	    proyectos.enunciado_id,
	    perfiles.nombre AS nombre_usuario,
	    perfiles.apellidos AS apellidos_usuario,
	    enunciados.nombre AS nombre_enunciado,
	    enunciados.definicion AS definicion_enunciado
	FROM proyectos
	    INNER JOIN perfiles ON proyectos.user_id = perfiles.user_id
	    INNER JOIN enunciados ON enunciados.id = proyectos.enunciado_id
	WHERE proyectos.id = ID;
	$$;
	-- API JAVASCRIPT DE SUPABASE
	let{data,
	error}= await supabase.rpc(
	    'proyectodetalleid',
	{proyectoid}
	) if (error) console.error(error)
	else console.log(data)
