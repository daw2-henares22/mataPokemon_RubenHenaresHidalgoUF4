// Importamos la conexión a la base de datos
import { supabase } from './supabase.js'

export class Comentario {
  // Mapping de propiedades de la tabla comentarios
  constructor (id = null, create_at = null, comentario = null, proyecto_id = null, user_id = null) {
    this.id = id
    this.create_at = create_at
    this.comentario = comentario
    this.proyecto_id = proyecto_id
    this.user_id = user_id
  }

  // leer todos
  static async getAll () {
    const { data: comentarios, error } = await supabase
      .from('comentarios')
      .select('*')

    if (error) {
      throw new Error(error.message)
    }

    // devuelve array de objetos
    return comentarios.map(({ id, comentario, proyecto_id, user_id }) => {
      return new Comentario(id, comentario, proyecto_id, user_id)
    })
  }

  // leer todos por usuario
  static async getAllByUserId (userId) {
    const { data: comentarios, error } = await supabase
      .from('comentarios')
      .select('*')
      .eq('user_id', userId)

    if (error) {
      throw new Error(error.message)
    }

    // devuelve array de objetos
    return comentarios.map(({ id, create_at, comentario, proyecto_id, user_id }) => {
      return new Comentario(id, comentario, proyecto_id, user_id)
    })
  }

  // leer todos por usuario
  static async getAllByProjectId (proyectoId) {
    const { data: comentarios, error } = await supabase
      .from('comentarios')
      .select('*')
      .eq('proyecto_id', proyectoId)
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error(error.message)
    }

    // devuelve array de objetos
    return comentarios.map(({ id, create_at, comentario, proyecto_id, user_id }) => {
      return new Comentario(id, create_at, comentario, proyecto_id, user_id)
    })
  }

  // leer todos por usuario
  static async getAllById (proyectoId) {
    const { data: comentarios, error } = await supabase
      .from('comentarios')
      .select('*')
      .eq('proyecto_id', proyectoId)
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error(error.message)
    }

    // devuelve array de objetos
    return comentarios.map(({ id, create_at, comentario, proyecto_id, user_id }) => {
      return new Comentario(id, create_at, comentario, proyecto_id, user_id)
    })
  }

  // leer registro por id (método static que se puede leer desde la clase sin necesidad de crear una instancia)
  static async getById (id) {
    const { data: comentario, error } = await supabase
      .from('comentarios')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      throw new Error(error.message)
    }

    return new Comentario(comentario.id, comentario.create_at, comentario.comentario, comentario.proyecto_id, comentario.user_id)
  }

  // crear registro (método static que se puede leer desde la clase sin necesidad de crear una instancia)
  static async create (comentarioData) {
    const { error } = await supabase
      .from('comentarios')
      .insert(comentarioData)
      .select()
    console.log('nuevo comentario ', error)
    if (error) {
      throw new Error(error.message)
    }
    return true
  }

  // actualizar
  async update () {
    const { error } = await supabase
      .from('comentarios')
      .update({
        nombre: this.comentario,
        proyecto_id: this.proyecto_id,
        user_id: this.user_id
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
      .from('comentarios')
      .delete()
      .eq('id', id)

    if (error) {
      throw new Error(error.message)
    }
    return true
  }
}