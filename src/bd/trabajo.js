// Importamos la conexión a la base de datos
import { supabase } from './supabase.js'
export class Trabajo {
  // Mapping de propiedades de la tabla trabajos
  constructor (id = null, nombre = null, definicion = null, uf = null, ra = null, fechaInicio = null, fechaFinal = null, modulo) {
    this.id = id
    this.nombre = nombre
    this.definicion = definicion
    this.uf = uf
    this.ra = ra
    this.fechaInicio = fechaInicio
    this.fechaFinal = fechaFinal
    this.modulo = modulo
  }

  // leer todos
  static async getAll () {
    const { data: trabajos, error } = await supabase
      .from('trabajos')
      .select('*')

    if (error) {
      throw new Error(error.message)
    }

    // devuelve array de objetos
    return trabajos.map(({ id, nombre, definicion, uf, ra, fechaInicio, fechaFinal, modulo }) => {
      return new Trabajo(id, nombre, definicion, uf, ra, fechaInicio, fechaFinal, modulo)
    })
  }

  // leer registro por id (método static que se puede leer desde la clase sin necesidad de crear una instancia)
  static async getById (id) {
    const { data: trabajo, error } = await supabase
      .from('trabajos')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      throw new Error(error.message)
    }

    return new Trabajo(trabajo.id, trabajo.nombre, trabajo.apellidos, trabajo.user_id, trabajo.estado, trabajo.rol, trabajo.avatar)
  }

  // crear registro (método static que se puede leer desde la clase sin necesidad de crear una instancia)
  static async create (trabajoData) {
    const { error } = await supabase
      .from('trabajos')
      .insert(trabajoData)
      .select()
    console.log('nuevo trabajo ', error)
    if (error) {
      throw new Error(error.message)
    }
    return true
  }

  // actualizar
  async update () {
    const { error } = await supabase
      .from('trabajos')
      .update({
        nombre: this.nombre,
        definicion: this.definicion,
        uf: this.uf,
        ra: this.ra,
        fechaInicio: this.fechaInicio,
        fechaFinal: this.fechaFinal,
        modulo: this.modulo
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
      .from('trabajos')
      .delete()
      .eq('id', id)

    if (error) {
      throw new Error(error.message)
    }
    return true
  }
}
