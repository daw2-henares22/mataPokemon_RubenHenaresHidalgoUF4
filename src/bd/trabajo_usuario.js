// Importamos la conexión a la base de datos
import { supabase } from './supabase.js'

export class Trabajo_usuario {
  // Mapping de propiedades de la tabla trabajo_usuarios
  constructor (id = null, trabajo_usuario = null, proyecto_id = null, user_id = null) {
    this.id = id
    this.trabajo_usuario = trabajo_usuario
    this.proyecto_id = proyecto_id
    this.user_id = user_id
  }

  // leer todos
  static async getAll () {
    const { data: trabajo_usuarios, error } = await supabase
      .from('trabajo_usuarios')
      .select('*')

    if (error) {
      throw new Error(error.message)
    }

    // devuelve array de objetos
    return trabajo_usuarios.map(({ id, trabajo_usuario, proyecto_id, user_id }) => {
      return new Trabajo_usuario(id, trabajo_usuario, proyecto_id, user_id)
    })
  }

  // leer registro por id (método static que se puede leer desde la clase sin necesidad de crear una instancia)
  static async getById (id) {
    const { data: trabajo_usuario, error } = await supabase
      .from('trabajo_usuarios')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      throw new Error(error.message)
    }

    return new Trabajo_usuario(trabajo_usuario.id, trabajo_usuario.trabajo_usuario, trabajo_usuario.proyecto_id, trabajo_usuario.user_id)
  }

  // crear registro (método static que se puede leer desde la clase sin necesidad de crear una instancia)
  static async create (trabajo_usuarioData) {
    const { error } = await supabase
      .from('trabajo_usuarios')
      .insert(trabajo_usuarioData)
      .select()
    console.log('nuevo trabajo_usuario ', error)
    if (error) {
      throw new Error(error.message)
    }
    return true
  }

  // actualizar
  async update () {
    const { error } = await supabase
      .from('trabajo_usuarios')
      .update({
        nombre: this.trabajo_usuario,
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
      .from('trabajo_usuarios')
      .delete()
      .eq('id', id)

    if (error) {
      throw new Error(error.message)
    }
    return true
  }
}
