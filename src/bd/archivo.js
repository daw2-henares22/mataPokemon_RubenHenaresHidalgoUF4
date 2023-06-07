// Importamos la conexión a la base de datos
import { supabase } from './supabase.js'

export class Archivo {
  constructor () {
    console.log('constructor archivo')
  }

  // Subir un archivo a un bucket determinado
  // file sería lo que devuelve el value de un input tipo file
  static async uploadFile (userId, bucket, file) {
    const { data, error } = await supabase.storage.from(bucket).upload(userId + '/' + file.name, file)

    if (error) {
      throw new Error(`Error al subir el archivo: ${error.message}`)
    }
    return data
  }

  // Devuelve una url a partir de la key de la imagen
  static async getUrl (userId, bucket, file) {
    const key = file.path.match(/[^/]*$/)[0] // nos quedamos solo con el nombre del archivo

    const { data, error } = await supabase.storage.from(bucket + '/' + userId).getPublicUrl(key)

    if (error) {
      throw new Error(`Error al obtener el archivo: ${error.message}`)
    }

    return data
  }

  // Devuelve una url a partir de la key de la imagen
  static async getUrlAll (userId, bucket) {
    // Capturamos una lista de las imagenes que ha subido el usuario
    const listaImagenes = await Archivo.getImagesByUser(userId, bucket)
    const arrayUrls = []
    for await (const imagen of listaImagenes) {
      const key = imagen.name
      const { data, error } = await supabase.storage.from(bucket + '/' + userId).getPublicUrl(key)
      arrayUrls.push(data.publicUrl)
      if (error) {
        throw new Error(`Error al obtener el archivo: ${error.message}`)
      }
    }

    console.log(arrayUrls)
    return arrayUrls
  }

  // Borra un archivo a partir de su key
  static async deleteFile (usuarioLogueado, bucket, key) {
    const file = usuarioLogueado + '/' + key
    console.log('archivo a borrar', file)
    const { error } = await supabase.storage.from(bucket).remove([file])
    if (error) {
      throw new Error(`Error al eliminar el archivo: ${error.message}`)
    }
  }

  static async getImagesByUser (userId, bucket) {
    const { data, error } = await supabase
      .storage
      .from(bucket)
      .list(userId)

    // La lista de archivos encontrados se encuentra en el array `files`
    // Puedes iterar sobre este array y extraer la información que necesites

    return data
  }
}
