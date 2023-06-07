import { Perfil } from '../../bd/perfil'
import { Proyecto } from '../../bd/proyecto'
import { User } from '../../bd/user'

import Swal from 'sweetalert2'

export default {
  template: `
  <main style="padding-top: 50px">
  <div class="container-fluid">
    <div class="d-flex justify-content-between border-bottom">
      <h1>Mis tareas entregadas</h1>
      <div>
        <a href="/#/proyectos" id="proyectos" class="btn btn-link mt-3 ms-2">< Volver a tareas entregadas</a>
        <a href="/#/nuevoProyecto" id="nuevoProyecto" class="btn btn-success m-3 ms-auto">Nuevo Proyecto</a>
      </div>  
    </div>
      <table id="tablaProyectos" class="table table-striped table-hover mt-5 align-middle">
          <thead>
              <tr>
                  <th></th>
                  <th>AUTOR</th>
                  <th>NOMBRE</th>
                  <th>DESCRIPCIÓN</th>
                  <th>ENLACE</th>
                  <th>NOTA</th>
                  <th>estado</th>
                  <th class="w-100"></th>
              </tr>
          </thead>
          <tbody>
                     
              
              
          </tbody>
      </table>
  </div>
</main>

`,
  script: async () => {
  // Generación de tabla
    try {
      const user = await User.getUser()
      // Capturamos todos los usuarios de la tabla perfiles
      const proyectos = await Proyecto.getAllByUserId(user.id)
      console.log('user_id', user)
      console.log('numero proyectos ', proyectos.length)
      // Generamos la tabla tablaProyectos
      let tabla = ''

      for (const proyecto of proyectos) {
        // Si proyecto.nota es null no pintamos nada
        if (!proyecto.nota) proyecto.nota = '-'

        // Capturamos el nombre del autor de cada proyecto
        const perfil = await Perfil.getByUserId(proyecto.user_id)
        const autor = perfil.nombre + ' ' + perfil.apellidos
        tabla += `
      <tr>
        <td>
            <img src="/assets/imagenes/proyectos/proyecto.png" width="100" alt="" data-id="${proyecto.id}" class="detalle"/>
        </td>
        <td>${autor}</td>
        <td>${proyecto.nombre}</td>
        <td class="w-100">${proyecto.descripcion}</td>
        <td><a href="${proyecto.enlace}" target="_black">${proyecto.enlace}</a></td>
        <td class="text-center">${proyecto.nota}</td>
        <td class="text-center">${proyecto.estado}</td>
        <td class="text-end">
          <button
            data-id="${proyecto.id}"
            type="button"
            class="btn text-danger detalle"
          >
          <img  data-id="${proyecto.id}" class="detalle w-100" src="/assets/iconos/icons8-acerca-de.svg" width="20" alt="" />
          </button>
          <button
            data-id="${proyecto.id}"
            type="button"
            class="btn text-info editar"
          >
            <img src="/assets/iconos/icons8-editar.svg" width="20" alt="" class="editar" data-id="${proyecto.id}"/>
          </button>
        
          <button
              data-id="${proyecto.id}"
              type="button"
              class="btn text-danger bloquear"
          >
            <img  data-id="${proyecto.id}" class="bloquear w-100" src="/assets/iconos/icons8-bloquear.svg" width="20" alt="" />
          </button>
        
          <button
              data-id="${proyecto.id}"
              type="button"
              class="btn text-danger borrar"
          >
            <img  data-id="${proyecto.id}" class="borrar w-100" src="/assets/iconos/icons8-basura-llena.svg" width="20" alt="" />
          </button>
        </td>
      </tr>
      `
      }
      document.querySelector('#tablaProyectos tbody').innerHTML = tabla
    } catch (error) {
      // alert('No se han podido cargar la tabla de usuarios ' + error)
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'No se han podido cargar la tabla de proyectos ' + error,
        showConfirmButton: false,
        timer: 1500
      })
    }

    // Borrar y Editar usuario
    document.querySelector('#tablaProyectos').addEventListener('click', async (e) => {
      // capturamos el id del usuarios
      const id = e.target.dataset.id
      // BLOQUEAR PROYECTO
      if (e.target.classList.contains('bloquear')) {
        try {
          const proyectoABloquear = await Proyecto.getById(id)
          if (proyectoABloquear.estado) {
            proyectoABloquear.estado = false
            e.target.classList.remove('bloqueado')
          } else {
            proyectoABloquear.estado = true
            e.target.classList.add('bloqueado')
          }

          await proyectoABloquear.block()
          window.location.href = '/#/proyectos'
        } catch (error) {
          // alert('No se han podido desactivar el proyecto' + error)
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'No se han podido desactivar el proyecto ' + error,
            showConfirmButton: false,
            timer: 1500
          })
        }
      }

      // BORRAR PROYECTO USUARIO (CUIDADO!!! HABRÍA QUE ELIMINAR EL USER Y TODAS LAS REFERENCIAS)
      if (e.target.classList.contains('borrar')) {
        try {
          const proyectoABorrar = await Proyecto.getById(id)

          const seguro = confirm('¿Está seguro que desea borrar el proyecto? Se eliminarán todos sus comentarios y notas ' + proyectoABorrar.nombre + ', ' + proyectoABorrar.nombre)

          if (seguro) {
            await Proyecto.delete(id)
          }
          window.location.href = '/#/proyectos'
        } catch (error) {
          // alert('No se han podido borrar el proyecto' + error)
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'No se han podido borrar el proyecto' + error,
            showConfirmButton: false,
            timer: 1500
          })
        }
      }
      // EDITAR PROYECTO  USUARIO
      if (e.target.classList.contains('editar')) {
        window.location.href = '/#/editarProyecto/' + id
      }

      // VER DETALLE PROYECTO  USUARIO
      if (e.target.classList.contains('detalle')) {
        window.location.href = '/#/detalleProyecto/' + id
      }
    })
  }
}
