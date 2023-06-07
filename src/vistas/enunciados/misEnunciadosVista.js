import { Perfil } from '../../bd/perfil'
import { Enunciado } from '../../bd/enunciado'
import { User } from '../../bd/user'

import Swal from 'sweetalert2'

export default {
  template: `
  <main style="padding-top: 50px">
  <div class="container-fluid">  
      <div class="d-flex justify-content-between border-bottom">
        <h1>Enunciados</h1>
        <div>
          <a href="/#/misEnunciados" id="misEnunciados" class="btn btn-link mt-3 ms-2">Ver mis enunciados</a>
          <a href="/#/nuevoEnunciado" id="nuevoEnunciado" class="btn btn-success m-3 ms-auto">Nuevo Enunciado</a>
        </div>  
      </div>
      <table id="tablaEnunciados" class="table table-striped table-hover mt-5 align-middle">
          <thead>
              <tr>
                  <th></th>
                  <th>AUTOR</th>
                  <th>NOMBRE</th>
                  <th>DESCRIPCIÓN</th>
                  <th>MÓDULO</th>
                  <th>UF</th>
                  <th>RA</th>
                  <th>FECHA_INICIO</th>
                  <th>FECHA_FINAL</th>
                  <th>ESTADO</th>

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
      const enunciados = await Enunciado.getAllByUserId(user.id)
      // Generamos la tabla tablaEnunciados

      const spinner = '<div class="d-flex justify-content-center align-items-center p-5 w-100"><img src=\'/assets/iconos/icons8-spinner-100.png\' width=\'100\'/></div>'
      document.querySelector('#tablaEnunciados tbody').innerHTML = spinner

      let tabla = ''
      for (const enunciado of enunciados) {
        console.log(enunciado)

        // Capturamos el nombre del autor de cada enunciado
        const perfil = await Perfil.getByUserId(enunciado.user_id)
        const autor = perfil.nombre + ' ' + perfil.apellidos
        tabla += `
      <tr>
        <td>
          <img src="${enunciado.imagen ? enunciado.imagen : '/assets/imagenes/proyectos/proyecto.png'}" width="50" alt="" data-id="${enunciado.id}" class="detalle border"/>
        </td>
        <td>${autor}</td>
        <td>${enunciado.nombre}</td>
        <td class="w-100">${enunciado.definicion}</td>
        <td class="w-100">${enunciado.modulo}</td>
        <td class="w-100">${enunciado.uf}</td>
        <td class="w-100">${enunciado.ra}</td>
        <td class="w-100">${enunciado.fecha_inicio}</td>
        <td class="w-100">${enunciado.fecha_final}</td>
        <td class="w-100">${enunciado.estado}</td>
        <td class="text-end">
          <button
            data-id="${enunciado.id}"
            type="button"
            class="btn text-danger detalle"
          >
          <img  data-id="${enunciado.id}" class="detalle w-100" src="/assets/iconos/icons8-acerca-de.svg" width="20" alt="" />
          </button>
          <button
            data-id="${enunciado.id}"
            type="button"
            class="btn text-info editar"
          >
            <img src="/assets/iconos/icons8-editar.svg" width="20" alt="" class="editar" data-id="${enunciado.id}"/>
          </button>
        
          <button
              data-id="${enunciado.id}"
              type="button"
              class="btn text-danger bloquear"
          >
            <img  data-id="${enunciado.id}" class="bloquear w-100" src="/assets/iconos/icons8-bloquear.svg" width="20" alt="" />
          </button>
        
          <button
              data-id="${enunciado.id}"
              type="button"
              class="btn text-danger borrar"
          >
            <img  data-id="${enunciado.id}" class="borrar w-100" src="/assets/iconos/icons8-basura-llena.svg" width="20" alt="" />
          </button>
        </td>
      </tr>
      `
      }
      document.querySelector('#tablaEnunciados tbody').innerHTML = tabla
    } catch (error) {
      //alert('No se han podido cargar la tabla de usuarios ' + error)
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'No se han podido cargar la tabla de enunciados ' + error,
        showConfirmButton: false,
        timer: 1500
      })
    }

    // Borrar y Editar usuario
    document.querySelector('#tablaEnunciados').addEventListener('click', async (e) => {
      // capturamos el id del usuarios
      const id = e.target.dataset.id
      // BLOQUEAR PROYECTO
      if (e.target.classList.contains('bloquear')) {
        console.log('bloquear')
        try {
          const enunciadoABloquear = await Enunciado.getById(id)
          console.log(enunciadoABloquear)
          if (enunciadoABloquear.estado) {
            enunciadoABloquear.estado = false
            e.target.classList.remove('bloqueado')
          } else {
            enunciadoABloquear.estado = true
            e.target.classList.add('bloqueado')
          }

          await enunciadoABloquear.block()
          window.location.href = '/#/enunciados'
        } catch (error) {
          //alert('No se han podido desactivar el enunciado' + error)
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'No se han podido desactivar el enunciado ' + error,
            showConfirmButton: false,
            timer: 1500
          })
        }
      }

      // BORRAR PROYECTO USUARIO (CUIDADO!!! HABRÍA QUE ELIMINAR EL USER Y TODAS LAS REFERENCIAS)
      if (e.target.classList.contains('borrar')) {
        try {
          const enunciadoABorrar = await Enunciado.getById(id)

          const seguro = confirm('¿Está seguro que desea borrar el enunciado? Se eliminarán todos sus comentarios y notas ' + enunciadoABorrar.nombre + ', ' + enunciadoABorrar.nombre)

          if (seguro) {
            await Enunciado.delete(id)
          }
          window.location.href = '/#/enunciados'
        } catch (error) {
          //alert('No se han podido borrar el enunciado' + error)
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'No se ha podido borrar el enunciado ' + error,
            showConfirmButton: false,
            timer: 1500
          })
        }
      }
      // EDITAR PROYECTO  USUARIO
      if (e.target.classList.contains('editar')) {
        window.location.href = '/#/editarEnunciado/' + id
      }

      // VER DETALLE PROYECTO  USUARIO
      if (e.target.classList.contains('detalle')) {
        window.location.href = '/#/detalleEnunciado/' + id
      }
    })
  }
}
