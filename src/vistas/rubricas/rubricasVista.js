import { Perfil } from '../../bd/perfil'
import { Rubrica } from '../../bd/rubrica'

import Swal from 'sweetalert2'

export default {
  template: `
  <main style="padding-top: 50px">
  <div class="container-fluid">
    <div class="d-flex justify-content-between border-bottom">
      <h1>Rúbricas</h1>
      <div>
        <a href="/#/misRubricas" id="rubricas" class="btn btn-link mt-3 ms-2">Mis Rúbricas</a>
        <a href="/#/nuevoRubrica" id="nuevoRubrica" class="btn btn-success m-3 ms-auto">Nueva Rúbrica</a>
      </div>  
    </div>
      <table id="tablaRubricas" class="table table-striped table-hover mt-5 align-middle">
          <thead>
              <tr>
                  <th>AUTOR</th>
                  <th>NOMBRE</th>
                  <th>DESCRIPCIÓN</th>
                  <th>ESTADO</th>
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
    const pintaTablaRubricas = async () => {
      // Generación de tabla
      try {
        // Capturamos todos los usuarios de la tabla perfiles
        const rubricas = await Rubrica.getAll()
        console.log('numero rubricas ', rubricas.length)
        // Generamos la tabla tablaRubricas
        let tabla = ''

        for (const rubrica of rubricas) {
          // Capturamos el nombre del autor de cada rubrica
          const perfil = await Perfil.getByUserId(rubrica.user_id)
          const autor = perfil.nombre + ' ' + perfil.apellidos
          tabla += `
  <tr>
    
    <td>${autor}</td>
    <td>${rubrica.nombre}</td>
    <td class="">${rubrica.descripcion}</td>
    <td class="">${rubrica.estado}</td>
    <td class="text-end">
      <button
        data-id="${rubrica.id}"
        type="button"
        class="btn text-danger detalle"
      >
      <img  data-id="${rubrica.id}" class="detalle " src="/assets/iconos/icons8-acerca-de.svg" width="20" alt="" />
      </button>
      <button
        data-id="${rubrica.id}"
        type="button"
        class="btn text-info editar"
      >
        <img src="/assets/iconos/icons8-editar.svg" width="20" alt="" class="editar" data-id="${rubrica.id}"/>
      </button>
    
      <button
          data-id="${rubrica.id}"
          type="button"
          class="btn text-danger bloquear"
      >
        <img  data-id="${rubrica.id}" class="bloquear " src="/assets/iconos/icons8-bloquear.svg" width="20" alt="" />
      </button>
    
      <button
          data-id="${rubrica.id}"
          type="button"
          class="btn text-danger borrar"
      >
        <img  data-id="${rubrica.id}" class="borrar " src="/assets/iconos/icons8-basura-llena.svg" width="20" alt="" />
      </button>
    </td>
  </tr>
  `
        }
        document.querySelector('#tablaRubricas tbody').innerHTML = tabla
      } catch (error) {
        alert('No se han podido cargar la tabla de usuarios ' + error)
      }
    }
    pintaTablaRubricas()

    // Borrar y Editar usuario
    document.querySelector('#tablaRubricas').addEventListener('click', async (e) => {
      // capturamos el id del usuarios
      const id = e.target.dataset.id
      // BLOQUEAR RUBRICA
      if (e.target.classList.contains('bloquear')) {
        try {
          const rubricaABloquear = await Rubrica.getById(id)
          if (rubricaABloquear.estado) {
            rubricaABloquear.estado = false
            e.target.classList.remove('bloqueado')
          } else {
            rubricaABloquear.estado = true
            e.target.classList.add('bloqueado')
          }

          await rubricaABloquear.block()
          window.location.href = '/#/rubricas'
        } catch (error) {
          alert('No se han podido desactivar el rubrica' + error)
        }
      }

      // BORRAR RUBRICA (CUIDADO!!! HABRÍA QUE ELIMINAR EL USER Y TODAS LAS REFERENCIAS)
      if (e.target.classList.contains('borrar')) {
        try {
          const rubricaABorrar = await Rubrica.getById(id)

          // const seguro = confirm('¿Está seguro que desea borrar el rubrica? Se eliminarán todos sus comentarios y notas ' + rubricaABorrar.nombre + ', ' + rubricaABorrar.nombre)
          Swal.fire({
            title: '¿Estás seguro?',
            text: `'¿Está seguro que desea borrar el enunciado: ${rubricaABorrar.nombre}? Se eliminarán todos sus comentarios y notas '`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Sí, bórralo!'
          }).then(async (result) => {
            if (result.isConfirmed) {
              await Rubrica.delete(id)
              pintaTablaRubricas()
              Swal.fire(
                '¡Borrado!',
                'Tu enunciado ha sido borrado.',
                'success'
              )
            }
          })
        } catch (error) {
          alert('No se han podido borrar el rubrica' + error)
        }
      }
      // EDITAR RUBRICA
      if (e.target.classList.contains('editar')) {
        window.location.href = '/#/editarRubrica/' + id
      }

      // VER DETALLE PROYECTO  USUARIO
      if (e.target.classList.contains('detalle')) {
        window.location.href = '/#/detalleRubrica/' + id
      }
    })
  }
}
