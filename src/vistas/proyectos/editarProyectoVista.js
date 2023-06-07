import { User } from '../../bd/user'
import { Proyecto } from '../../bd/proyecto'
import { Enunciado } from '../../bd/enunciado'

import Swal from 'sweetalert2'

export default {
  template: `
  <div
  class="container d-flex mt-5 justify-content-center">
  <div class="col-12">
      <a href="#/proyectos" class="btn btn-outline-secondary btn-sm">< Proyectos</a>
      <h1 class="text-center p-2">Editar Proyecto</h1>
      <form id="formProyecto" class="p-3" novalidate>
        <label class="mt-3 form-label" for="user_id">User_id: </label>    
        <input
            id="user_id" 
            type="text" 
            class="form-control text-black-50 " 
            value="" 
            disabled
            
          /> 
          <label class="mt-3 form-label" for="id">Id proyecto: </label>
          <input
            id="proyecto_id" 
            type="text" 
            class="form-control text-black-50" 
            value="" 
            disabled
          />  
          <label class="mt-3 form-label" for="id">Enunciado: </label>

          <select id="selectEnunciado" name="enunciado" class="form-control text-black-50">
            <option value = "0" >Selecciona un enunciado</option>
          </select> 
          <label class="mt-3 form-label" for="nombre">Nombre: </label>
          <input
            id="nombre" 
            type="text" 
            class="form-control" 
            value="" 
            placeholder ="Nombre del proyecto" 
            required 
          />
          <div class="invalid-feedback">El nombre no es correcto</div>

          <label class="mt-3 form-label" for="descripcion">Descripción: </label>
          <textarea 
            id="descripcion"
            class="form-control" 
            value="" 
            required 
            />
          </textarea>
          <div class="invalid-feedback">Este campo no es correcto</div>

          <label class="mt-3 form-label" for="enlace">Enlace a producción</label>
          <input
              id="enlace"
              type="enlace"
              class="form-control"
              value=""
              placeholder = "http://miproyecto.com"
              required
          />
          <div class="invalid-feedback">El link no es correcto</div>
          <button type="submit" class="mt-5 btn btn-success">
              Actualizar proyecto
          </button>
          <button type="button" onclick="history.back()" class="mt-5 btn btn-primary">
              Cancelar
          </button>
      </form>
  </div>
</div>
    `,
  script: async (id = -1) => {
    let enunciados = []

    const formProyecto = document.querySelector('#formProyecto')

    try {
      const user = await User.getUser()
      const proyecto = await Proyecto.getById(id)
      if (proyecto.enunciado_id) {
        const enunciado = await Enunciado.getById(proyecto.enunciado_id)
        formProyecto.enunciado.value = enunciado.id
      }
      enunciados = await Enunciado.getAll()

      if (enunciados) {
        let optionsEnunciados = '<option value="-1">Selecciona enunciado</option>`'
        enunciados.forEach(enunciado => {
          optionsEnunciados += `<option value="${enunciado.id}">${enunciado.nombre}</option>`
        })
        formProyecto.enunciado.innerHTML = optionsEnunciados
      }

      formProyecto.nombre.value = proyecto.nombre
      formProyecto.descripcion.value = proyecto.descripcion
      formProyecto.enlace.value = proyecto.enlace
      formProyecto.user_id.value = user.id
      formProyecto.proyecto_id.value = proyecto.id
      formProyecto.enunciado.value = proyecto.enunciado_id
    } catch (error) {
      console.log(error)
      // alert('Error al editar proyecto' + error)
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'No se han podido editar el proyecto ' + error,
        showConfirmButton: false,
        timer: 1500
      })
    }

    // Si cambiamos el enunciado
    document.querySelector('#selectEnunciado').addEventListener('change', (e) => {
      if (e.target.value == -1) {
        document.querySelector('#nombre').value = ''
        document.querySelector('#descripcion').value = ''
      } else {
        const enunciadoSeleccionado = enunciados.filter(element => element.id == e.target.value)[0]
        console.log('enunciadoSelecionado', enunciados)
        document.querySelector('#nombre').value = enunciadoSeleccionado.nombre
        document.querySelector('#descripcion').value = enunciadoSeleccionado.definicion
      }
    })

    formProyecto.addEventListener('submit', async function (e) {
      e.preventDefault()

      try {
        // Objeto con datos para proyecto
        const proyectoEditado = await Proyecto.getById(id)
        // Actualizamos los datos del proyecto a editar
        proyectoEditado.nombre = document.querySelector('#nombre').value
        proyectoEditado.descripcion = document.querySelector('#descripcion').value
        proyectoEditado.enunciado_id = document.querySelector('#selectEnunciado').value
        // proyectoEditado.enlace = document.querySelector('#enlace').value

        await proyectoEditado.update()
        // alert('Proyecto editado con éxito')
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Proyecto editado con éxito',
          showConfirmButton: false,
          timer: 1500
        })
        // Cargamos la página login
        window.location.href = '/#/proyectos'
      } catch (error) {
        console.log(error)
        // alert('Error al editar proyecto ' + error)
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'No se ha podido editar el proyecto ' + error,
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }
}
