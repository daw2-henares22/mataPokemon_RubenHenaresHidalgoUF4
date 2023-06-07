// Importamos la conexión a la base de datos
import { supabase } from './supabase.js'

class Proyecto {
  // Mapping de propiedades de la tabla proyectos
  constructor (id = null, nombre = null, descripcion = null, user_id = null, nota = null, enlace = null, estado = null, enunciado_id = null) {
    this.id = id
    this.nombre = nombre
    this.descripcion = descripcion
    this.user_id = user_id
    this.nota = nota
    this.enlace = enlace
    this.estado = estado
    this.enunciado_id = enunciado_id
  }

  // leer todos en orden descendiente a como se han creado
  static async getAll () {
    const { data: proyectos, error } = await supabase
      .from('proyectos')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) {
      throw new Error(error.message)
    }

    // devuelve array de objetos
    return proyectos.map(({ id, nombre, descripcion, user_id, nota, enlace, estado, enunciado_id }) => {
      return new Proyecto(id, nombre, descripcion, user_id, nota, enlace, estado, enunciado_id)
    })
  }

  // leer todos en orden descendiente a como se han creado
  static async getAllByUserId (user_id) {
    const { data: proyectos, error } = await supabase
      .from('proyectos')
      .select('*')
      .eq('user_id', user_id)
      // .order('created_at', { ascending: false })

    if (error) {
      throw new Error(error.message)
    }

    // devuelve array de objetos
    return proyectos.map(({ id, nombre, descripcion, user_id, nota, enlace, estado, enunciado_id }) => {
      return new Proyecto(id, nombre, descripcion, user_id, nota, enlace, estado, enunciado_id)
    })
  }

  // leer registro por id (método static que se puede leer desde la clase sin necesidad de crear una instancia)
  static async getById (id) {
    const { data: proyecto, error } = await supabase
      .from('proyectos')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      throw new Error(error.message)
    }

    return new Proyecto(proyecto.id, proyecto.nombre, proyecto.descripcion, proyecto.user_id, proyecto.nota, proyecto.enlace, proyecto.estado, proyecto.enunciado_id)
  }

  // leer registro por proyecto_id (método static que se puede leer desde la clase sin necesidad de crear una instancia)
  static async getByEnunciadoId (id) {
    const { data: proyecto, error } = await supabase
      .from('proyectos')
      .select('*')
      .eq('enunciado_id', id)
      .single()

    if (error) {
      throw new Error(error.message)
    }

    return new Proyecto(proyecto.id, proyecto.nombre, proyecto.descripcion, proyecto.user_id, proyecto.nota, proyecto.enlace, proyecto.estado, proyecto.enunciado_id)
  }

  // crear registro (método static que se puede leer desde la clase sin necesidad de crear una instancia)
  static async create (proyectoData) {
    const { error } = await supabase
      .from('proyectos')
      .insert(proyectoData)
      .select()
    console.log('nuevo proyecto ', error)
    if (error) {
      throw new Error(error.message)
    }
    return true
  }

  // actualizar
  async update () {
    const { error } = await supabase
      .from('proyectos')
      .update({
        nombre: this.nombre,
        descripcion: this.descripcion,
        user_id: this.user_id,
        nota: this.nota,
        enlace: this.enlace,
        estado: this.estado,
        enunciado_id: this.enunciado_id
      })
      .eq('id', this.id)
      .single()

    if (error) {
      throw new Error(error.message)
    }
    return true
  }

  // borrar
  static async delete (id) {
    const { error } = await supabase
      .from('proyectos')
      .delete()
      .eq('id', id)

    if (error) {
      throw new Error(error.message)
    }
    return true
  }

  // actualizar
  async block () {
    const { error } = await supabase
      .from('proyectos')
      .update({
        estado: this.estado
      })
      .eq('id', this.id)
      .single()

    if (error) {
      throw new Error(error.message)
    }
    return true
  }
}
class ProyectoDetalle extends Proyecto {
  constructor (id = null, nombre = null, descripcion = null, user_id = null, nota = null, enlace = null, estado = null, enunciado_id = null, nombre_usuario = null, apellidos_usuario, nombre_enunciado = null, definicion_enunciado = null) {
    super(id, nombre, descripcion, user_id, nota, enlace, estado, enunciado_id)

    this.id = id
    this.nombre = nombre
    this.descripcion = descripcion
    this.user_id = user_id
    this.nota = nota
    this.enlace = enlace
    this.estado = estado
    this.enunciado_id = enunciado_id
    // detalle
    this.nombre_usuario = nombre_usuario
    this.apellidos_usuario = apellidos_usuario
    this.nombre_enunciado = nombre_enunciado
    this.definicion_enunciado = definicion_enunciado
  }

  // funciones de supabase especificas
  // proyectosDetalle
  // leer registro por id (método static que se puede leer desde la clase sin necesidad de crear una instancia)

  //* *************** esto debe ser getAll con detalle */

  static async proyectoDetalleId (proyectoid) {
    const { data, error } = await supabase
      .rpc('proyectodetalleid', {
        proyectoid
      })

    if (error) console.error(error)
    else {
      const proyecto = data[0]
      // console.log('data desde clase proyectosdetalle2-', data[0])
      return new ProyectoDetalle(
        proyecto.id,
        proyecto.nombre,
        proyecto.descripcion,
        proyecto.user_id,
        proyecto.nota,
        proyecto.enlace,
        proyecto.estado,
        proyecto.enunciado_id,
        // detalle
        proyecto.nombre_usuario,
        proyecto.apellidos_usuario,
        proyecto.nombre_enunciado,
        proyecto.definicion_enunciado
      )
    }
  }
}
export { Proyecto, ProyectoDetalle }
