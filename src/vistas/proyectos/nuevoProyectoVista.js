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
      <h1 class="text-center p-2">Entregar tarea</h1>
      <h3>Tarea: </h3>
      <p id="nombreEnunciado"></p>
      <h3>Descripción: </h3>
      <p id="descripcionEnunciado"></p>
      <form id="form_proyecto" class="" validate>
        <label class="mt-3 form-label" for="enlace">URL de GitHub</label>
        <input
            id="enlace"
            type="enlace"
            class="form-control"
            value=""
            placeholder = "http://miproyecto.com"
            required
        />
        <div class="invalid-feedback">El link no es correcto</div>
        <button type="submit" class="mt-2 btn btn-success">
            Enviar tarea
        </button>
      </form>
  </div>
</div>
    `,
  script: async (id_enunciado = -1) => {
    let enunciados = []
    let enunciado = {}
    try {
      enunciados = await Enunciado.getAll()
      enunciado = await Enunciado.getById(id_enunciado)
      document.querySelector('#nombreEnunciado').innerHTML = enunciado.nombre
      document.querySelector('#descripcionEnunciado').innerHTML = enunciado.definicion
    } catch (error) {
      console.log(error)
    }
    // if (id_enunciado) {
    //   enunciado = enunciados.filter(element => element.id == id_enunciado)[0]
    // }
    // Insertamos los enunciados en el select
    const pintaEnunciados = async () => {
      let opciones = '<option value="-1" >Selecciona el enunciado</option>'
      console.log('enunciados ', enunciados)
      enunciados.forEach(element => {
        opciones += `<option value="${element.id}">${element.nombre}</option>`
      })
      document.querySelector('#selectEnunciado').innerHTML = opciones
      // Si venimos desde enunciado cargamos el valor del enunciado
      document.querySelector('#selectEnunciado').value = id_enunciado
      console.log('enunciado', enunciado)
      document.querySelector('#nombre').value = enunciado.nombre
      document.querySelector('#descripcion').value = enunciado.definicion
    }
    pintaEnunciados()

    // Si cambiamos el enunciado
    document.querySelector('#selectEnunciado').addEventListener('change', (e) => {
      if (e.target.value == -1) {
        document.querySelector('#nombre').value = ''
        document.querySelector('#descripcion').innerHTML = ''
      } else {
        const enunciadoSeleccionado = enunciados.filter(element => element.id == e.target.value)[0]
        document.querySelector('#nombre').value = enunciadoSeleccionado.nombre
        document.querySelector('#descripcion').innerHTML = enunciadoSeleccionado.definicion
      }
    })

    document.querySelector('#form_proyecto').addEventListener('submit', async function (e) {
      e.preventDefault()
      try {
        const user = await User.getUser()

        // Objeto con datos para proyecto
        const proyecto = {
          nombre: document.querySelector('#nombre').value,
          descripcion: document.querySelector('#descripcion').value,
          enlace: document.querySelector('#enlace').value,
          user_id: user.id, // Tomamos el id del usuario logueado
          enunciado_id: document.querySelector('#selectEnunciado').value
        }
        await Proyecto.create(proyecto)
        // alert('Proyecto creado con éxito')
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Proyecto creado con éxito',
          showConfirmButton: false,
          timer: 1500
        })
        // Cargamos la página login
        window.location.href = '/#/proyectos'
      } catch (error) {
        console.log(error)
        // alert('Error al crear rúbrica ' + error)
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Error al crear la rúbrica ' + error,
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }
}
