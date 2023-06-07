import { formEditarPerfil } from './formEditarPerfil'
import { User } from '../bd/user'
import { Perfil } from '../bd/perfil'
import { menuSuperior } from './menuSuperior'
import { menuUsuario } from './menuUsuario'

export const header = {
  template: `
  
<!-- Navbar  -->
<nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
  <div class="container-fluid">
    <a class="navbar-brand d-flex align-items-center" href="#/home">
      <img
        src="/assets/logo_vanilla.svg"
        alt="Logo"
        width="30"
        height="30"
        class="d-inline-block align-text-top me-2"
      />
      <span class=""></span>
      Vanilla Games
    </a>
    <!-- Menú superior -->
    ${menuSuperior.template}
    <button
      class="navbar-toggler ms-auto
      "
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNavDropdown"
      aria-controls="navbarNavDropdown"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
    <span class="navbar-toggler-icon"></span>
    </button>
   
    <!-- Menu usuario -->
    ${menuUsuario.template}
  </div>
</nav>

//Modals
${formEditarPerfil.template}
  `,
  script: async () => {
    try {
      // Capturamos los datos del usuario logueado
      const usuarioLogueado = await User.getUser()
      if (usuarioLogueado) {
        const perfilLogueado = await Perfil.getByUserId(usuarioLogueado.id)
        // cargamos el menú superior y usuario para su rol
        menuSuperior.script(perfilLogueado)
        menuUsuario.script(perfilLogueado)

        // Ejecutamos la lógica del componente formEditarPerifio
        formEditarPerfil.script(perfilLogueado)
      } else {
        menuSuperior.script('anonimo')
        menuUsuario.script('anonimo')
      }
    } catch (error) {
      // alert('No he podido cargar el usuario logueado')
    }
  }
}
