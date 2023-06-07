import { User } from '../bd/user'
import { Perfil } from '../bd/perfil'
import { Archivo } from '../bd/archivo'
import { header } from '../componentes/header'
import { pintaTablaImagenes } from './pintaTablaImagenes'


// Import sweetalert2 para crear alertas
import Swal from 'sweetalert2'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

export const formEditarPerfil = {
  template: `
    
<!-- Modal -->
<div class="modal fade" id="editar">

<div class="modal-dialog" role="document">
    <div class="modal-content">
    <div class="modal-header">
        <h5 class="modal-title">Mi Perfil</h5>
        <button
        type="button"
        class="btn-close"
        data-bs-dismiss="modal"
        aria-label="Close"
        >
        <span aria-hidden="true"></span>
        </button>
    </div>
    <div class="modal-body">
      <div class="row">
        <form id="formEditarPerfil" class="p-3 col-6">
          <label class="mt-3 form-label" for="nick">Nombre: </label>
          <input id="edit_nombre" type="text" class="form-control" name="nombre" value="" />

          <label class="mt-3 form-label" for="apellidos">Apellidos: </label>
          <input id="edit_apellidos" type="text" class="form-control" value="" name="apellidos"/>
          <label class="mt-3 form-label" for="inputAvatar">Imagen de perfil: </label>
          <input
              id="inputAvatar"
              type="file"
              class="form-control"
              value=""
          />
          </form>
          <div class="col-6">
            <div class="mt-2 border shadow" >
              <img src="" alt="" id="imagenAvatar" class="img img-fluid ">
            </div>
            <div id="imagenesPerfil" class="d-flex justify-content-center border p-2">LISTA DE IMAGENES</div>
          </div>
        
      </div>
    </div>
    <div class="modal-footer">
        <button id="guardarCambios" type="button" class="btn btn-primary"  data-bs-dismiss="modal">
       Actualizar cambios
        </button>
        <button
        type="button"
        class="btn btn-secondary"
        data-bs-dismiss="modal"
        >
        Cerrar
        </button>
    </div>
    </div>
</div>
</div>
  
  `,
  script: async (perfilLogueado) => {
    // Seleccionamos el input de avatar para detectar cuando cambia porque se ha seleccionado una imagen
    document.querySelector('#inputAvatar').addEventListener('change', (e) => {
      // Capturamos la imagen del input
      const file = e.target.files[0]
      // Cargamos la imagen en un div creando una url a partir del archivo
      document.querySelector('#imagenAvatar').src = window.URL.createObjectURL(file)
    })

    // Seleccionamos el formulario de editar usuario
    const formulario = document.querySelector('#formEditarPerfil')

    // Capturamos los datos del usuario logueado
    // const usuarioLogueado = await User.getUser()
    console.log('datos usuario', perfilLogueado)

    // Si el usuario logeado existe
    if (perfilLogueado) {
      // Insertamos los datos en el formulario para editar el usuario
      formulario.nombre.value = perfilLogueado.nombre
      formulario.apellidos.value = perfilLogueado.apellidos
      formulario.inputAvatar.value = ''
      // Cargamos la imagen actual del perfil
      document.querySelector('#imagenAvatar').src = perfilLogueado.avatar
      pintaTablaImagenes(perfilLogueado.user_id)
    }

    // Evento de click en el botón guardar
    document.querySelector('#guardarCambios').addEventListener('click', async (e) => {
      try {
        // Si se ha seleccionado una imagen la subimos
        const file = document.querySelector('#inputAvatar').files[0]
        let url = ''
        // Capturamos los datos del usuario logueado
        const usuarioLogueado = await User.getUser()
        const datosUsuario = await Perfil.getByUserId(usuarioLogueado.id)
        if (file) {
          const data = await Archivo.uploadFile(usuarioLogueado.id, 'avatar', file)
          // console.log('data', data.name)
          // Obtenemos la url
          url = await Archivo.getUrl(usuarioLogueado.id, 'avatar', data)
          // console.log('url de la imagen subida', url)
        } else {
          datosUsuario.avatar = document.querySelector('#imagenAvatar').src
        }

        // Modificamos los campos del usuario
        if (url) datosUsuario.avatar = url.publicUrl
        datosUsuario.nombre = formulario.nombre.value
        datosUsuario.apellidos = formulario.apellidos.value
        // Guardamos los cambios en la bd
        await datosUsuario.update(datosUsuario)
        pintaTablaImagenes()
        header.script()
        //alert('Usuario actualizado')
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Usuario actualizado',
          showConfirmButton: false,
          timer: 1500
        })
      } catch (error) {
        //alert('No se pudo guardar los cambios ' + error)
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'No se pudo guardar los cambios ' + error,
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }
}
