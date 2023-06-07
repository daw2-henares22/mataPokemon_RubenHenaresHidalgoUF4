// Importamos la conexión a la base de datos
import { supabase } from './supabase.js'

export class Semana {
  // Mapping de propiedades de la tabla notas
  constructor (id = null, created_at = null, fecha = null, semana = null, trimestre = null, curso = null) {
    this.id = id
    this.created_at = created_at
    this.fecha = fecha
    this.semana = semana
    this.trimestre = trimestre
    this.curso = curso
  }

  // leer todos
  static async getAll () {
    const { data: semanas, error } = await supabase
      .from('semanas')
      .select('*')
      .order('fecha', { ascending: true })
    if (error) {
      throw new Error(error.message)
    }

    // devuelve array de objetos
    return semanas.map(({ id, created_at, fecha, semana, trimestre, curso }) => {
      return new Semana(id, created_at, fecha, semana, trimestre, curso)
    })
  }
}
