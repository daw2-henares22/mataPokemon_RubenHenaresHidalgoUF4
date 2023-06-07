import { Archivo } from '../bd/archivo'

export const pintaTablaImagenes = (user_id) => {
  const pintaTabla = async () => {
    // Capturamos una lista de las imagenes que ha subido el usuario
    const listaImagenes = await Archivo.getUrlAll(user_id, 'avatar')
    // Construimos lista de imagenes
    let divImagenes = '<div class="d-flex flex-wrap"><h5 class="text-center w-100 mt-4">Mis imagenes de perfil</h5>'
    listaImagenes.forEach(url => {
      const keys = url.split('/')
      const ultimo = keys.length - 1
      const key = keys[ultimo]
      //console.log(key)
      // Evitamos mostrar la carpeta vacía
      if (key !== '.emptyFolderPlaceholder') {
        divImagenes += `
        <div class="border bordered m-1">
          <div class="bg-dark border position-absolute"  style="width:25px">
            <img src="/assets/iconos/icons8-basura-llena.svg"  alt="basura" class="borrarImagen" data-url="${key}" width="20">
          </div>
          <img data-key = '${key}' src="${url}" alt="" style="width:75px" class="imagenListaPerfil m-1">
        </div>`
      }
    })
    divImagenes += '</div>'
    document.querySelector('#imagenesPerfil').innerHTML = divImagenes
  }

  pintaTabla()

  // Deteccion de eventos sobre imagen para insertar o borrar
  // Evento de click en imagen de lista de imagenes
  document.querySelector('#imagenesPerfil').addEventListener('click', async (e) => {
  // Si hacemos click sobre la imagen
    if (e.target.classList.contains('imagenListaPerfil')) {
      const url = e.target.getAttribute('src')
      document.querySelector('#imagenAvatar').src = url
    }
    // si hacemos click sobre la basura de BORRAR imagen
    if (e.target.classList.contains('borrarImagen')) {
      console.log(e.target.dataset.url)
      const urlImagen = e.target.dataset.url

      try {
        await Archivo.deleteFile(user_id, 'avatar', urlImagen)
        pintaTabla()
      } catch (error) {
        console.log('Error al borrar imagen', error)
      }
    }
  })
}
