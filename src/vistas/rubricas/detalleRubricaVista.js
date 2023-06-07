import { User } from '../../bd/user'
import { Perfil } from '../../bd/perfil'
import { Rubrica } from '../../bd/rubrica'

import Swal from 'sweetalert2'

export default {
  template: `
<div class="container mt-5">
  <div class="row">
    <div class="col-12">
    <a href="#/rubricas" class="btn btn-outline-secondary btn-sm">< Rúbricas</a>
    <h1 id="nombre_rubrica" class="w-100 mt-5"></h1>
      <p>Autor: <span id="autor_rubrica" class="text-center p-2"></span></p>
      <h3>Descripción:</h3>
      <div id="descripcion_rubrica"></div>
  </div>
</div>
    `,
  script: async (id) => {
    console.log('pagina cargada')
    try {
      const usuarioLogueado = await User.getUser()
      const perfilLogueado = await Perfil.getByUserId(usuarioLogueado.id)
      const rubrica = await Rubrica.getById(id)
      console.log('rubrica: ', rubrica)
      const perfilAutor = await Perfil.getByUserId(rubrica.user_id)
      const autor = perfilAutor.nombre + ' ' + perfilAutor.apellidos
      
      document.querySelector('#nombre_rubrica').innerHTML = rubrica.nombre
      document.querySelector('#descripcion_rubrica').innerHTML = rubrica.descripcion
      document.querySelector('#autor_rubrica').innerHTML = autor
    } catch (error) {
      console.log(error)
      //alert('Error al mostrar el rubrica' + error)
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Error al mostrar la rúbrica',
        showConfirmButton: true,
        timer: 1500
      })
    }
  }

}
