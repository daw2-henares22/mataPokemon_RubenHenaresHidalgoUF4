import { User } from '../../bd/user'
import { Rubrica } from '../../bd/rubrica'

import Swal from 'sweetalert2'

export default {
  template: `
  <div
  class="container d-flex mt-5 justify-content-center">
  <div class="col-12">
      <a href="#/rubricas" class="btn btn-outline-secondary btn-sm">< Rúbricas</a>
      <h1 class="text-center p-2">Nueva Rúbrica</h1>
      <form id="form_rubrica" class="p-3" novalidate>
          <label class="mt-3 form-label" for="nombre">Nombre: </label>
          <input
            id="nombre" 
            type="text" 
            class="form-control" 
            value="" 
            placeholder ="Nombre del rubrica" 
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

          <button type="submit" class="mt-5 btn btn-success">
              Crear nuevo rubrica
          </button>
      </form>
  </div>
</div>
    `,
  script: () => {
    document.querySelector('#form_rubrica').addEventListener('submit', async function (e) {
      e.preventDefault()
      try {
        const user = await User.getUser()
        // Objeto con datos para rubrica
        const rubrica = {
          nombre: document.querySelector('#nombre').value,
          descripcion: document.querySelector('#descripcion').value,
          user_id: user.id // Tomamos el id del usuario logueado
        }
        await Rubrica.create(rubrica)
        alert('Rubrica creado con éxito')
        // Cargamos la página login
        window.location.href = '/#/rubricas'
      } catch (error) {
        console.log(error)
        alert('Error al crear rubrica ' + error)
      }
    })
  }
}
