// Importamos la conexión a la base de datos
import { supabase } from './supabase.js'

export class Rubrica {
  // Mapping de propiedades de la tabla rubricas
  constructor (id = null, create_at = null, nombre = null, descripcion = null, user_id = null, estado = null) {
    this.id = id
    this.create_at = create_at
    this.nombre = nombre
    this.descripcion = descripcion
    this.user_id = user_id
    this.estado = estado
  }

  // leer todos en orden descendiente a como se han creado
  static async getAll () {
    const { data: rubricas, error } = await supabase
      .from('rubricas')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) {
      throw new Error(error.message)
    }

    // devuelve array de objetos
    return rubricas.map(({ id, create_at, nombre, descripcion, user_id, estado }) => {
      return new Rubrica(id, create_at, nombre, descripcion, user_id, estado)
    })
  }

  // leer todos en orden descendiente a como se han creado
  static async getAllByUserId (user_id) {
    const { data: rubricas, error } = await supabase
      .from('rubricas')
      .select('*')
      .eq('user_id', user_id)
      // .order('created_at', { ascending: false })

    if (error) {
      throw new Error(error.message)
    }

    // devuelve array de objetos
    return rubricas.map(({ id, create_at, nombre, descripcion, user_id, estado }) => {
      return new Rubrica(id, create_at, nombre, descripcion, user_id, estado)
    })
  }

  // leer registro por id (método static que se puede leer desde la clase sin necesidad de crear una instancia)
  static async getById (id) {
    const { data: rubrica, error } = await supabase
      .from('rubricas')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      throw new Error(error.message)
    }

    return new Rubrica(rubrica.id, rubrica.create_at, rubrica.nombre, rubrica.descripcion, rubrica.user_id, rubrica.estado)
  }

  // leer registro por id (método static que se puede leer desde la clase sin necesidad de crear una instancia)
  static async getAllByEnunciadoId (id) {
    const { data: rubrica, error } = await supabase
      .from('rubricas')
      .select('*')
      .eq('enunciado_id', id)
      .single()

    if (error) {
      throw new Error(error.message)
    }

    return new Rubrica(rubrica.id, rubrica.create_at, rubrica.nombre, rubrica.descripcion, rubrica.user_id, rubrica.estado)
  }

  // crear registro (método static que se puede leer desde la clase sin necesidad de crear una instancia)
  static async create (rubricaData) {
    const { error } = await supabase
      .from('rubricas')
      .insert(rubricaData)
      .select()
    console.log('nuevo rubrica ', error)
    if (error) {
      throw new Error(error.message)
    }
    return true
  }

  // actualizar
  async update () {
    const { error } = await supabase
      .from('rubricas')
      .update({
        nombre: this.nombre,
        descripcion: this.descripcion,
        user_id: this.user_id,
        estado: this.estado
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
      .from('rubricas')
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
      .from('rubricas')
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
