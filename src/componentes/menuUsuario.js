import { User } from '../bd/user'
import { header } from './header'
export const menuUsuario = {
  template: `
  <ul class="navbar nav me-5">
      <li class="nav-item dropdown">
        <a
          class="nav-link dropdown-toggle text-light"        
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <div class="avatarLogin d-inline-block">
            <div class="d-flex align-items-center">
              <span style="width:100px" id="emailUsuarioLogueado" class="pe-3  text-light"></span>
                <img
                  id="imgAvatar"
                  src="/assets/avatar.svg"
                  alt="Logo"
                  width="30"
                  height="30"
                  class="d-inline-block align-text-top border"
                />
            </div>
          </div>
        </a>
        
        <!-- Menú usuario -->
        <ul id="menuUsuario" class="dropdown-menu">
          <li class="text-center" id="rolUsuarioLogueado">
            anónimo
          </li>
          <li>
            <a class="liLogin dropdown-item" href="#/login">Login</a>
          </li>
          
          <li>
            <a class="liRegistro dropdown-item" href="#/registro">Registrate</a>
          </li>
        </ul>
      </li>
    </ul>
  `,
  script: (perfilLogueado) => {
    const items = {
      anonimo: `
        <li class="text-center" id="rolUsuarioLogueado">
            anónimo
        </li>
        <li>
        <a class="liLogin dropdown-item" href="#/login">Login</a>
        </li>
        <li>
          <a class="liRegistro dropdown-item" href="#/registro">Registrate</a>
        </li>
        
      `,
      registrado: `
      <li class="text-center" id="rolUsuarioLogueado">
        anónimo
      </li>
      <li>
        <a
          id="editarPerfil"
          data-bs-toggle="modal"
          data-bs-target="#editar"
          class="dropdown-item"
          href="#/editarPerfil"
          >Perfil</a
        >
      </li>      
      <li><a class="liLogout dropdown-item" href="">Logout</a></li>
      `,
      alumno: `
      <li class="text-center" id="rolUsuarioLogueado">
        anónimo
      </li>
      <li>
        <a
          id="editarPerfil"
          data-bs-toggle="modal"
          data-bs-target="#editar"
          class="dropdown-item"
          href="#/editarPerfil"
          >Perfil</a
        >
      </li>
      <li>
        <a class="liMisProyectos dropdown-item" href="#/misProyectos">Mis Proyectos</a>
      </li>
      <li>
        <a class="dropdown-item" href="#/enunciados">Mis Enunciados</a>
      </li>
      <div class="dropdown-divider"></div>
      <li><a class="liLogout dropdown-item" href="">Logout</a></li>
      `,
      profesor: `
      <li class="text-center" id="rolUsuarioLogueado">
        anónimo
      </li>
      <li>
        <a class="liRegistro dropdown-item" href="#/registro">Regístrate</a>
      </li>
      <li>
        <a
          id="editarPerfil"
          data-bs-toggle="modal"
          data-bs-target="#editar"
          class="dropdown-item"
          href="#/editarPerfil"
          >Perfil</a
        >
      </li>
      <div class="dropdown-divider"></div>
      <li>
        <a class="liMisProyectos dropdown-item d-none" href="#/misProyectos">Mis Proyectos</a>
      </li>
      <li>
        <a class="dropdown-item" href="#/adminUsuarios">Admin Usuarios</a>
      </li>
      <li>
        <a class="dropdown-item" href="#/enunciados">Enunciados</a>
      </li>
      <li>
        <a class="dropdown-item" href="#/rubricas">Rúbricas</a>
      </li>
      <li><a class="liLogout dropdown-item" href="">Logout</a></li>
      `,
      admin: `
      <li class="text-end p-2 fw-bold border m-2" id="rolUsuarioLogueado">
        anónimo
      </li>
      <li>
        <a
          id="editarPerfil"
          data-bs-toggle="modal"
          data-bs-target="#editar"
          class="dropdown-item"
          href="#/editarPerfil"
          >Perfil</a
        >
      </li>
      <div class="dropdown-divider"></div>
      <li>
        <a class="dropdown-item" href="#/adminUsuarios">Admin Usuarios</a>
      </li>
      <li>
        <a class="dropdown-item" href="#/enunciados">Enunciados</a>
      </li>
      <li>
        <a class="dropdown-item" href="#/rubricas">Rúbricas</a>
      </li>
      <li><a class="liLogout dropdown-item" href="">Logout</a></li>
      `
    }
    //console.log(perfilLogueado)
    let rol = 'anonimo'
    if (perfilLogueado.rol) rol = perfilLogueado.rol
    //console.log('cargando menu', rol)

    // Insertamos los items del menú según el rol
    document.querySelector('#menuUsuario').innerHTML = items[rol]

    let imgAvatar = '/assets/avatar.svg'

    if (rol !== 'anonimo') {
      // Leemos la url de la imagen que está en la carpeta user_id del storage de supabase
      imgAvatar = perfilLogueado.avatar
      // Insertamos la foto del avatar
      document.querySelector('#imgAvatar').src = imgAvatar
      // Insertamos el email del usuario
      document.querySelector('#emailUsuarioLogueado').innerHTML = (perfilLogueado.email).split('@')[0]
      // Insertamos el rol
      document.querySelector('#rolUsuarioLogueado').innerHTML = perfilLogueado.rol

      document.querySelector('.liLogout').addEventListener('click', async (e) => {
        e.preventDefault()
        // Cargamos la página home
        window.location.href = '/#/home'
        // Cerramos sesión utilizando el método de logout de nuestra clase User
        await User.logout()
        header.script()
      })
    } else {
      // Insertamos el email del usuario
      document.querySelector('#emailUsuarioLogueado').innerHTML = ''
    }
    // Insertamos la foto del avatar
    document.querySelector('#imgAvatar').src = imgAvatar

    // Gestionamos click en editar perfil
    document.querySelector('#editarPerfil').addEventListener('click', (e) => {
      e.preventDefault()
      // formEditarPerfil.script()
    })
  }
}
