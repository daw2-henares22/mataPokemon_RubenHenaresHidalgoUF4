export const menuSuperior = {
  template: `
  <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul id="menuSuperiorGeneral" class="navbar-nav"> 
        <li class="nav-item">
          <a class="nav-link" href="#">TOP 5 - Proyectos</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#/recursos">Recursos</a>
        </li>
      </ul>
      <ul id="menuSuperior" class="navbar-nav ms-auto border-end"> 
        
      </ul>
      
    </div>
  `,
  script: (perfilLogueado) => {
    const items = {
      anonimo: '',
      registrado: '',
      alumno: `
      <li><hr /></li>
      <li class="nav-item">
        <a class="nav-link" href="#/proyectos">Proyectos</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#/proyectos">Proyectos</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#/tareas">Tareas</a>
      </li>
      `,
      profesor: `
      
      <li class="nav-item">
        <a class="nav-link" href="#/proyectos">Proyectos</a>
      </li>
      <li><hr /></li>
      <li class="nav-item">
        <a class="nav-link" href="#/tareas">Tareas</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#/rubricas">Rúbricas</a>
      </li>
      `,
      admin: `
      <li><hr /></li>
      <li class="nav-item">
        <a class="nav-link" href="#/proyectos">Proyectos</a>
      </li>
      
      <li class="nav-item">
        <a class="nav-link" href="#/enunciados">Tareas</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#/rubricas">Rúbricas</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#/adminUsuarios">Admin</a>
      </li>
      `
    }
    if (perfilLogueado !== 'anonimo') {
      const rol = perfilLogueado.rol
      // Insertamos los items del menú según el rol
      document.querySelector('#menuSuperior').innerHTML = items[rol]
    } else {
      document.querySelector('#menuSuperior').innerHTML = items.anonimo
    }
  }
}
