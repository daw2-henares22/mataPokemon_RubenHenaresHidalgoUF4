import { User } from '../../bd/user'
import { Enunciado } from '../../bd/enunciado'

import Swal from 'sweetalert2'

export default {
  template: `
  <div
  class="container d-flex mt-5 justify-content-center">
  <div class="col-12">
      <h1 class="text-center p-2">Editar Enunciado</h1>
      <form id="formEnunciado" class="p-3" novalidate>
          <label class="mt-3 form-label" for="nombre">Nombre: </label>
          <input
            id="nombre" 
            name="nombre" 
            type="text" 
            class="form-control" 
            value="" 
            placeholder ="Nombre del enunciado" 
            required 
          />
          <div class="invalid-feedback">El nombre no es correcto</div>

          <label class="mt-3 form-label" for="definicion">Definición: </label>
          <textarea 
            id="definicion"
            name="definicion"
            class="form-control" 
            value="" 
            required 
            />
          </textarea>
          <div class="invalid-feedback">Este campo no es correcto</div>

          <label class="mt-3 form-label" for="modulo">Módulo: </label>
          <input
            id="modulo" 
            name="modulo"
            type="number"  
            min="1"
            class="form-control" 
            value="" 
            placeholder ="Módulo del enunciado" 
            required 
          />
          <div class="invalid-feedback">El módulo no es correcto</div>

          <label class="mt-3 form-label" for="uf">UF: </label>
          <input
            id="uf" 
            name="uf" 
            type="number" 
            min="1"
            class="form-control" 
            value="" 
            placeholder ="uf del enunciado" 
            required 
          />
          <div class="invalid-feedback">El RA no es correcto</div>

          <label class="mt-3 form-label" for="ra">RA: </label>
          <input
            id="ra" 
            name="ra" 
            type="number" 
            min="1"
            class="form-control" 
            value="" 
            placeholder ="ra del enunciado" 
            required 
          />
          <div class="invalid-feedback">El RA no es correcto</div>

          <label class="mt-3 form-label" for="fecha_inicio">Fecha inicio: </label>
          <input
            id="fecha_inicio"  
            name="fecha_inicio" 
            type="date" 
            class="form-control" 
            value="" 
            placeholder ="" 
            required 
          />
          <div class="invalid-feedback">La fecha no es correcto</div>

          <label class="mt-3 form-label" for="fecha_final">Fecha de finalización: </label>
          <input
            id="fecha_final" 
            name="fecha_final"
            type="date" 
            class="form-control" 
            value="" 
            placeholder ="" 
            required 
          />
          <div class="invalid-feedback">La fecha no es correcto</div>

          <label class="mt-3 form-label" for="estado">Estado: </label>
          <input
            id="estado" 
            name="estado" 
            type="boolean"  
            class="form-control" 
            value="" 
            placeholder ="" 
            required 
          />
          <div class="invalid-feedback">El estado no es correcto</div>

          <label class="mt-3 form-label" for="enlace">Enunciado: </label>
          <input
            id="enlace" 
            name="enlace" 
            type="boolean"  
            class="form-control" 
            value="" 
            placeholder ="" 
            required 
          />
          <div class="invalid-feedback">El enlace no es correcto</div>
         

          <button type="submit" class="mt-5 btn btn-success">
              Actualizar enunciado
          </button>
      </form>
  </div>
</div>
    `,
  script: async (id) => {
    const formEnunciado = document.querySelector('#formEnunciado')
    try {
      const user = await User.getUser()
      const enunciado = await Enunciado.getById(id)
      console.log(enunciado)

      formEnunciado.nombre.value = enunciado.nombre
      formEnunciado.definicion.value = enunciado.definicion
      formEnunciado.enlace.value = enunciado.enlace
      formEnunciado.modulo.value = enunciado.modulo
      formEnunciado.uf.value = enunciado.uf
      formEnunciado.ra.value = enunciado.ra
      formEnunciado.fecha_inicio.value = enunciado.fecha_inicio
      formEnunciado.fecha_final.value = enunciado.fecha_final
      formEnunciado.estado.value = enunciado.estado


      // formEnunciado.user_id.value = user.id
      // formEnunciado.id.value = enunciado.id
    } catch (error) {
      //alert('Error al editar enunciado' + error)
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'No se han podido editar el enunciado ' + error,
        showConfirmButton: false,
        timer: 1500
      })
    }

    formEnunciado.addEventListener('submit', async function (e) {
      e.preventDefault()

      try {
        // Objeto con datos para enunciado
        const enunciadoEditado = await Enunciado.getById(id)
        // Actualizamos los datos del enunciado a editar
        enunciadoEditado.nombre = document.querySelector('#nombre').value
        enunciadoEditado.definicion = document.querySelector('#definicion').value
        enunciadoEditado.enlace = document.querySelector('#enlace').value
        enunciadoEditado.modulo = document.querySelector('#modulo').value
        enunciadoEditado.uf = document.querySelector('#uf').value
        enunciadoEditado.ra = document.querySelector('#ra').value
        enunciadoEditado.fecha_inicio = document.querySelector('#fecha_inicio').value
        enunciadoEditado.fecha_final = document.querySelector('#fecha_final').value
        enunciadoEditado.estado = document.querySelector('#estado').value
        // enunciadoEditado.user_id = document.querySelector('#user_id').value
        // enunciadoEditado.id = document.querySelector('#id').value


        // enunciadoEditado.enlace = document.querySelector('#enlace').value,

        await enunciadoEditado.update()
        //alert('Enunciado editado con éxito')
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Enunciado modificado con éxito',
          showConfirmButton: false,
          timer: 1500
        })
        // Cargamos la página login
        window.location.href = '/#/enunciados'
      } catch (error) {
        //alert('Error al editar enunciado ' + error)
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Error al editar el enunciado ' + error,
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }
}
