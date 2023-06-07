import { Perfil } from '../../bd/perfil'
import { Proyecto } from '../../bd/proyecto'

import Swal from 'sweetalert2'

export default {
  template: `
  <main style="padding-top: 50px">
  <div class="container-fluid">  
      <div class="d-flex justify-content-between border-bottom">
        <h1>Tareas entregadas</h1>
        <div>
          <a href="/#/misProyectos" id="misProyectos" class="btn btn-link mt-3 ms-2">Ver mis tareas entregadas</a>
          
        </div>  
      </div>
      
      
      <table id="tablaProyectos" class="table table-striped table-hover mt-5 align-middle">
          <thead>
              <tr>
                  <th>IMAGEN</th>
                  <th>ID</th>
                  <th>AUTOR</th>
                  <th>NOMBRE</th>
                  <th>DESCRIPCIÓN</th>
                  <th>ENLACE</th>
                  <th>NOTA</th>
                  <th>estado</th>
                  <th>ENUNCIADO</th>
                  <th class=""></th>
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
    const pintaTablaProyectos = async () => {
      try {
      // Capturamos todos los usuarios de la tabla perfiles
        const proyectos = await Proyecto.getAll()
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
      <tr data-id="${proyecto.id}" class="detalle">
        <td>
          <img src="/assets/imagenes/proyectos/proyecto.png" width="50" alt="" data-id="${proyecto.id}" class="detalle"/>
        </td>
        <td>${proyecto.id}</td>
        <td>${autor}</td>
        <td>${proyecto.nombre}</td>
        <td class="">${proyecto.descripcion}</td>
        <td><a href="${proyecto.enlace}" target="_black">${proyecto.enlace}</a></td>
        <td class="text-center">${proyecto.nota}</td>
        <td class="text-center">${proyecto.estado}</td>
        <td class="text-center"><a href="#/detalleEnunciado/${proyecto.enunciado_id}"> Ir a enunciado </a></td>
        <td class="text-end">
          <div style="width: 150px">
            <button
              data-id="${proyecto.id}"
              type="button"
              class="btn text-danger detalle p-0"
            >
              <img  data-id="${proyecto.id}" class="detalle" src="/assets/iconos/icons8-acerca-de.svg" width="20" alt="" />
            </button>
            <button
              data-id="${proyecto.id}"
              type="button"
              class="btn text-info editar p-0"
            >
              <img src="/assets/iconos/icons8-editar.svg" width="20" alt="" class="editar" data-id="${proyecto.id}"/>
            </button>
          
            <button
                data-id="${proyecto.id}"
                type="button"
                class="btn text-danger bloquear p-0"
            >
              <img  data-id="${proyecto.id}" class="bloquear" src="/assets/iconos/icons8-bloquear.svg" width="20" alt="" />
            </button>
          
            <button
                data-id="${proyecto.id}"
                type="button"
                class="btn text-danger borrar p-0"
            >
              <img  data-id="${proyecto.id}" class="borrar" src="/assets/iconos/icons8-basura-llena.svg" width="20" alt="" />
            </button>
          </div>
          
        </td>
      </tr>
      `
        }
        const tablaProyectosBody = document.querySelector('#tablaProyectos tbody')
        if (tablaProyectosBody) tablaProyectosBody.innerHTML = tabla
      } catch (error) {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'No se han podido cargar la tabla de usuarios ' + error,
          showConfirmButton: false,
          timer: 1500
        })
      }
    }

    pintaTablaProyectos()
    // Borrar y Editar usuario
    const tablaProyectos = document.querySelector('#tablaProyectos')
    if (tablaProyectos) {
      tablaProyectos.addEventListener('click', async (e) => {
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
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'No se han podido desactivar el proyecto' + error,
              showConfirmButton: false,
              timer: 1500
            })
          }
        }

        // BORRAR PROYECTO USUARIO (CUIDADO!!! HABRÍA QUE ELIMINAR EL USER Y TODAS LAS REFERENCIAS)
        if (e.target.classList.contains('borrar')) {
          try {
            const proyectoABorrar = await Proyecto.getById(id)

            // const seguro = confirm('¿Está seguro que desea borrar el proyecto? Se eliminarán todos sus comentarios y notas ' + proyectoABorrar.nombre + ', ' + proyectoABorrar.nombre)
            Swal.fire({
              title: '¿Estás seguro?',
              text: `Se borrará el proyecto: ${proyectoABorrar.nombre} y todos las notas y comentarios asociados a este proyecto!`,
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: '¡Sí, borralo!'
            }).then(async (result) => {
              if (result.isConfirmed) {
                await Proyecto.delete(id)
                pintaTablaProyectos()
                Swal.fire(
                  'Borrado!',
                  'El archivo ha sido borrado.',
                  'success'
                )
              }
            })
          } catch (error) {
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
        // Si ha hecho click sobre la imagen o sobre algún td de la fila
        if (e.target.classList.contains('detalle') || e.target.parentNode.classList.contains('detalle')) {
          console.log('detalle', e.target)
          // Si id es undefined porque ha hecho click en cualquier td del tr le asignamos el id del tr
          const nuevoid = id || e.target.parentNode.dataset.id
          window.location.href = '/#/detalleProyecto/' + nuevoid
        }
      })
    }
  }
}
