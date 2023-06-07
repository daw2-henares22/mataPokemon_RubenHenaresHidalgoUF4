import { User } from '../../bd/user'
import { Rubrica } from '../../bd/rubrica'

import Swal from 'sweetalert2'

export default {
  template: `
  <div
  class="container-fluid d-flex mt-5 justify-content-center">
  <div class="col-12">
      <h1 class="text-center p-2">Editar RÚBRICA</h1>
      <form id="formRubrica" class="p-3" novalidate>
        <label class="mt-3 form-label" for="user_id">User_id: </label>    
        <input
            id="user_id" 
            type="text" 
            class="form-control text-black-50 " 
            value="" 
            disabled
            
          /> 
          <label class="mt-3 form-label" for="id">Id rubrica: </label>
          <input
            id="id" 
            type="text" 
            class="form-control text-black-50" 
            value="" 
            disabled
          />  
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

          
          <div class="invalid-feedback">El link no es correcto</div>
          <button type="submit" class="mt-5 btn btn-success">
              Actualizar rubrica
          </button>
          <button type="button" onclick="history.back()" class="mt-5 btn btn-primary">
              Cancelar
          </button>
      </form>
  </div>
</div>
    `,
  script: async (id) => {
    const formRubrica = document.querySelector('#formRubrica')
    try {
      const user = await User.getUser()
      const rubrica = await Rubrica.getById(id)

      formRubrica.nombre.value = rubrica.nombre
      formRubrica.descripcion.value = rubrica.descripcion
      formRubrica.user_id.value = user.id
      formRubrica.id.value = rubrica.id
    } catch (error) {
      console.log(error)
      //alert('Error al editar rubrica' + error)
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Error al editar la rúbrica',
        showConfirmButton: false,
        timer: 1500
      })
    }

    formRubrica.addEventListener('submit', async function (e) {
      e.preventDefault()

      try {
        // Objeto con datos para rubrica
        const rubricaEditado = await Rubrica.getById(id)
        // Actualizamos los datos del rubrica a editar
        rubricaEditado.nombre = document.querySelector('#nombre').value
        rubricaEditado.descripcion = document.querySelector('#descripcion').value
        // rubricaEditado.enlace = document.querySelector('#enlace').value,

        await rubricaEditado.update()
        //alert('Rubrica editado con éxito')
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Rúbrica editada con éxito',
          showConfirmButton: false,
          timer: 1500
        })
        // Cargamos la página login
        window.location.href = '/#/rubricas'
      } catch (error) {
        console.log(error)
        alert('Error al editar rubrica ' + error)
      }
    })
  }
}
