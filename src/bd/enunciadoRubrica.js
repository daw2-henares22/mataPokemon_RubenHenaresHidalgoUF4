// Importamos la conexión a la base de datos
import { supabase } from './supabase.js'

class EnunciadoRubrica {
  // Mapping de propiedades de la tabla enunciados_rubricas
  constructor (id = null, created_at = null, enunciado_id = null, rubrica_id = null, peso = null) {
    this.id = id
    this.created_at = created_at
    this.enunciado_id = enunciado_id
    this.rubrica_id = rubrica_id
    this.peso = peso
  }

  // leer todos
  static async getAll () {
    const { data: enunciados_rubricas, error } = await supabase
      .from('enunciados_rubricas')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) {
      throw new Error(error.message)
    }

    // devuelve array de objetos
    return enunciados_rubricas.map(({ id, created_at, enunciado_id, rubrica_id, peso }) => {
      return new EnunciadoRubrica(id, created_at, enunciado_id, rubrica_id, peso)
    })
  }

  // leer todos
  static async getAllByEnunciadoId (id) {
    const { data: enunciados_rubricas, error } = await supabase
      .from('enunciados_rubricas')
      .select('*')
      .eq('enunciado_id', id)
      .order('created_at', { ascending: false })
    if (error) {
      throw new Error(error.message)
    }

    // devuelve array de objetos
    return enunciados_rubricas.map(({ id, created_at, enunciado_id, rubrica_id, peso }) => {
      return new EnunciadoRubrica(id, created_at, enunciado_id, rubrica_id, peso)
    })
  }

  // leer registro por id (método static que se puede leer desde la clase sin necesidad de crear una instancia)
  static async getById (id) {
    const { data: er, error } = await supabase
      .from('enunciados_rubricas')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      throw new Error(error.message)
    }

    return new EnunciadoRubrica(er.id, er.created_at, er.enunciado_id, er.rubrica_id, er.peso)
  }

  // crear registro (método static que se puede leer desde la clase sin necesidad de crear una instancia)
  static async create (notaData) {
    const { error } = await supabase
      .from('enunciados_rubricas')
      .insert(notaData)
      .select()
    if (error) {
      throw new Error(error.message)
    }
    return true
  }

  // actualizar
  async update () {
    const { error } = await supabase
      .from('enunciados_rubricas')
      .update({
        enunciado_id: this.enunciado_id,
        rubrica_id: this.rubrica_id,
        user_id: this.user_id,
        peso: this.peso
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
      .from('enunciados_rubricas')
      .delete()
      .eq('id', id)

    if (error) {
      throw new Error(error.message)
    }
    return true
  }
}

class EnunciadoRubricaDetalle extends EnunciadoRubrica {
  constructor (

    id = null,
    created_at = null,
    enunciado_id = null,
    rubrica_id = null,
    peso = null,
    enunciado_nombre = null,
    enunciado_descripcion = null,
    enunciado_autor = null,
    rubrica_nombre = null,
    rubrica_descripcion = null

  ) {
    super(id = null, created_at = null, enunciado_id = null, rubrica_id = null, peso = null)
    this.id = id
    this.created_at = created_at
    this.enunciado_id = enunciado_id
    this.rubrica_id = rubrica_id
    this.peso = peso
  }

  static async rubricasTodosDetalleDeProyectoId (id_enunciado) {
    const { data, error } = await supabase
      .rpc('rubricastodosdetalledeenunciadoid', {
        id_enunciado
      })

    if (error) console.error(error)
    else {
      return data
      // return new EnunciadoRubricaDetalle(
      //   data.id,
      //   data.rubrica_id,
      //   data.peso,
      //   data.rubrica_nombre,
      //   data.rubrica_descripcion
      // )
    }
  }
}

export { EnunciadoRubrica, EnunciadoRubricaDetalle }
