import { User } from '../../bd/user'
import { Enunciado } from '../../bd/enunciado'

import Swal from 'sweetalert2'

export default {
  template: `
  <div
  class="container d-flex mt-5 justify-content-center">
  <div class="col-12">
      <a href="#/enunciados" class="btn btn-outline-secondary btn-sm"> < Volver a Enunciados</a>
      <h1 class="text-center p-2">Nuevo Enunciado</h1>
      <form id="form_enunciado" class="p-3" novalidate>
          <label class="mt-3 form-label" for="nombre">Nombre: </label>
          <input
            id="nombre" 
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
            class="form-control" 
            value="" 
            required 
            />
          </textarea>
          <div class="invalid-feedback">Este campo no es correcto</div>

          <label class="mt-3 form-label" for="nombre">Módulo: </label>
          <input
            id="modulo" 
            type="number"  
            min="1"
            class="form-control" 
            value="" 
            placeholder ="Módulo del enunciado" 
            required 
          />
          <div class="invalid-feedback">El módulo no es correcto</div>

          <label class="mt-3 form-label" for="nombre">UF: </label>
          <input
            id="uf" 
            type="number" 
            min="1"
            class="form-control" 
            value="" 
            placeholder ="uf del enunciado" 
            required 
          />
          <div class="invalid-feedback">El RA no es correcto</div>

          <label class="mt-3 form-label" for="nombre">RA: </label>
          <input
            id="ra" 
            type="number" 
            min="1"
            class="form-control" 
            value="" 
            placeholder ="ra del enunciado" 
            required 
          />
          <div class="invalid-feedback">El RA no es correcto</div>

          <label class="mt-3 form-label" for="nombre">Fecha inicio: </label>
          <input
            id="fecha_inicio"  
            type="date" 
            class="form-control" 
            value="" 
            placeholder ="" 
            required 
          />
          <div class="invalid-feedback">La fecha no es correcto</div>

          <label class="mt-3 form-label" for="nombre">Fecha de finalización: </label>
          <input
            id="fecha_final" 
            type="date" 
            class="form-control" 
            value="" 
            placeholder ="" 
            required 
          />
          <div class="invalid-feedback">La fecha no es correcto</div>

          <label class="mt-3 form-label" for="nombre">Estado: </label>
          <select id="estado" class="form-control" />
            <option value="true">estado</option>
            <option value="false">No estado</option>
          </select>
          <div class="invalid-feedback">El estado no es correcto</div>

         

          <button type="submit" class="mt-5 btn btn-success">
              Crear nuevo enunciado
          </button>
      </form>
  </div>
</div>
    `,
  script: () => {
    document.querySelector('#form_enunciado').addEventListener('submit', async function (e) {
      e.preventDefault()
      try {
        const user = await User.getUser()
        // Objeto con datos para enunciado
        const enunciado = {
          nombre: document.querySelector('#nombre').value,
          definicion: document.querySelector('#definicion').value,
          modulo: document.querySelector('#modulo').value,
          uf: document.querySelector('#uf').value,
          ra: document.querySelector('#ra').value,
          fecha_inicio: document.querySelector('#fecha_inicio').value,
          fecha_final: document.querySelector('#fecha_final').value,
          user_id: user.id, // Tomamos el id del usuario logueado
          estado: document.querySelector('#estado').value
        }
        await Enunciado.create(enunciado)
        // alert('Enunciado creado con éxito')
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Enunciado creado con éxito',
          showConfirmButton: false,
          timer: 1500
        })
        // Cargamos la página login
        window.location.href = '/#/enunciados'
      } catch (error) {
        console.log(error)
        // alert('Error al crear enunciado ' + error)
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Se ha producido un error al crear el enunciado ' + error,
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }
}
