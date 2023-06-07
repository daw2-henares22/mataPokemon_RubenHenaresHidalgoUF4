// Importamos la conexión a la base de datos
import { supabase } from './supabase.js'

export class Enunciado {
  // Mapping de propiedades de la tabla enunciados
  constructor (id = null, created_at = null, nombre = null, definicion = null, uf = null, ra = null, fecha_inicio = null, fecha_final = null, modulo = null, user_id = null, estado = null, enlace = null, imagen = null) {
    this.id = id
    this.created_at = created_at
    this.nombre = nombre
    this.definicion = definicion
    this.uf = uf
    this.ra = ra
    this.fecha_inicio = fecha_inicio
    this.fecha_final = fecha_final
    this.modulo = modulo
    this.user_id = user_id
    this.estado = estado
    this.enlace = enlace
    this.imagen = imagen
  }

  // leer todos en orden descendiente a como se han creado
  static async getAll () {
    const { data: enunciados, error } = await supabase
      .from('enunciados')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) {
      throw new Error(error.message)
    }

    // devuelve array de objetos
    return enunciados.map(({ id, created_at, nombre, definicion, uf, ra, fecha_inicio, fecha_final, modulo, user_id, estado, enlace, imagen }) => {
      return new Enunciado(id, created_at, nombre, definicion, uf, ra, fecha_inicio, fecha_final, modulo, user_id, estado, enlace, imagen)
    })
  }

  // leer todos en orden descendiente a como se han creado
  static async getAllByUserId (user_id) {
    const { data: enunciados, error } = await supabase
      .from('enunciados')
      .select('*')
      .eq('user_id', user_id)
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error(error.message)
    }

    // devuelve array de objetos
    return enunciados.map(({ id, created_at, nombre, definicion, uf, ra, fecha_inicio, fecha_final, modulo, user_id, estado, enlace, imagen }) => {
      return new Enunciado(id, created_at, nombre, definicion, uf, ra, fecha_inicio, fecha_final, modulo, user_id, estado, enlace, imagen)
    })
  }

  // leer todos en orden descendiente a como se han creado
  static async getAllByProjectId (user_id) {
    const { data: enunciados, error } = await supabase
      .from('enunciados')
      .select('*')
      .eq('user_id', user_id)
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error(error.message)
    }

    // devuelve array de objetos
    return enunciados.map(({ id, created_at, nombre, definicion, uf, ra, fecha_inicio, fecha_final, modulo, user_id, estado, enlace, imagen }) => {
      return new Enunciado(id, created_at, nombre, definicion, uf, ra, fecha_inicio, fecha_final, modulo, user_id, estado, enlace, imagen)
    })
  }

  // leer registro por id (método static que se puede leer desde la clase sin necesidad de crear una instancia)
  static async getById (id) {
    const { data: enunciado, error } = await supabase
      .from('enunciados')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      throw new Error(error.message)
    }

    return new Enunciado(enunciado.id, enunciado.created_at, enunciado.nombre, enunciado.definicion, enunciado.uf, enunciado.ra, enunciado.fecha_inicio, enunciado.fecha_final, enunciado.modulo, enunciado.user_id, enunciado.estado, enunciado.enlace, enunciado.imagen)
  }

  // crear registro (método static que se puede leer desde la clase sin necesidad de crear una instancia)
  static async create (EnunciadoData) {
    const { error } = await supabase
      .from('enunciados')
      .insert(EnunciadoData)
      .select()
    console.log('nuevo Enunciado ', error)
    if (error) {
      throw new Error(error.message)
    }
    return true
  }

  // actualizar
  async update () {
    const { error } = await supabase
      .from('enunciados')
      .update({
        id: this.id,
        created_at: this.created_at,
        nombre: this.nombre,
        definicion: this.definicion,
        uf: this.uf,
        ra: this.ra,
        fecha_inicio: this.fecha_inicio,
        fecha_final: this.fecha_final,
        modulo: this.modulo,
        user_id: this.user_id,
        estado: this.estado,
        enlace: this.enlace,
        imagen: this.imagen
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
      .from('enunciados')
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
      .from('enunciados')
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
