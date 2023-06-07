import { User } from '../bd/user'
import { header } from '../componentes/header'

import Swal from 'sweetalert2'

export default {
  template: `
  
  <div class="vh-100 d-flex align-items-center justify-content-center">
  <div class="" style="width: 300px">
      <h1 class="text-center ">Login</h1>
      <form id="login" class="p-3 shadow border" novalidate>
          <label class="mt-1 form-label" for="email">Email</label>
          <input id="email" type="email" class="form-control" value="" required />
          <div class="invalid-feedback">Debes introducir un email valido</div>

          <label class="mt-3 form-label" for="nick">Contraseña: </label>
          <input id="password" type="password" class="form-control" value="" required />
          <div class="invalid-feedback">Esta no es una contraseña correcta</div>

          <button
              id="btn_submit"
              type="submit"
              class="mt-4 btn btn-success w-100"
          >
              Enviar
          </button>
          <p class="mt-3">
              <a href="">No recuerdo mi contraseña</a>
              <br />
              <a href="#/registro">Quiero Registrarme</a>
          </p>
          
      </form>
  </div>
</div>



  `,
  script: (parametro) => {
    // script para validación de formulario
    const form = document.querySelector('#login')
    form.addEventListener('submit', async (event) => {
      event.preventDefault()
      event.stopPropagation()
      // Verificamos validación del formulario
      form.classList.add('was-validated')
      if (!form.checkValidity()) {
        console.log('formulario no valido')
      } else {
        // Si los datos validan
        try {
          // Capturamos datos del formulario
          const userData = {
            email: document.querySelector('#email').value,
            password: document.querySelector('#password').value
          }
          // Intentamos loguearnos utilizando el método login de nuestra clase User
          await User.login(userData)
          // Refrescamos el header
          header.script()
          // Cagamos la página home
          window.location.href = '/#/home'
        } catch (error) {
          //alert('No se ha podido iniciar sesión ' + error)
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Se ha producido un error!',
            text: error,
            showConfirmButton: true
          })
        }
      }
    })
  }
}
