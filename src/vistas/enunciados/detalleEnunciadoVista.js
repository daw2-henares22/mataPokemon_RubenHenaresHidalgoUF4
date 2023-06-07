import { User } from '../../bd/user'
import { Perfil } from '../../bd/perfil'
import { Enunciado } from '../../bd/enunciado'
import { Comentario } from '../../bd/comentario'
import { EnunciadoRubricaDetalle } from '../../bd/enunciadoRubrica'
import { Rubrica } from '../../bd/rubrica'

import Swal from 'sweetalert2'

export default {
  template: `
<div class="container mt-5">
  <div class="row">
    <div class="col-12">
      <a href="#/enunciados" class="btn btn-outline-secondary btn-sm">< Enunciados</a>
      <h1 class="w-100 text-center p-2">Enunciado tarea: </h1>
      <h3 id="nombre_enunciado"></h3>
      <div class="d-flex justify-content-center m-5">
        <img src="" class="" alt="">
      </div>
      <p>Autor: <span id="autor_enunciado" class="text-center p-2"></span></p>

      <span>Enunciado: <span id="enlace_enunciado" class="text-center p-2"></span></span>
      <span>Última actualización: <span id="actualizado_enunciado" class="text-center p-2"></span></span>
      <div class="mt-3">
        <div class="btn btn-outline-dark ">Módulo: <span id="modulo_enunciado" class="text-center p-2"></span></div>
        <div class="btn btn-outline-dark">RA: <span id="ra_enunciado" class="text-center p-2"></span></div>
        <div class="btn btn-outline-dark">UF: <span id="uf_enunciado" class="text-center p-2"></span></div>
        <div class="btn btn-outline-dark">Fecha inicio: <span id="fechaInicio_enunciado" class="text-center p-2"></span></div>
        <div class="btn btn-outline-dark">Fecha Final: <span id="fechaFinal_enunciado" class="text-center p-2"></span></div>
        <div class="btn btn-outline-dark">Estado: <span id="estado_enunciado" class="text-center p-2"></span></div>
      </div>

      <h3 class="mt-4">Descripción: </h3>
      <div class="p-2 mt-2 mb-4" id="definicion_enunciado"></div>
      <div class="d-flex justify-content-between">
        <h3 class="">Rúbricas asociadas: </h3>
        <div class="btn btn-outline-secondary mb-1">
          Seleccionar rúbricas
        </div>

      </div>
      <div id="rubricas">
        Aquí van las rubricas asociadas a este enunciado...
        
      </div>      
  </div>
</div>
    `,
  script: async (id) => {
    console.log('pagina cargada')
    try {
      const usuarioLogueado = await User.getUser()
      const perfilLogueado = await Perfil.getByUserId(usuarioLogueado.id)
      const enunciado = await Enunciado.getById(id)
      const perfilAutor = await Perfil.getByUserId(enunciado.user_id)
      const autor = perfilAutor.nombre + ' ' + perfilAutor.apellidos

      document.querySelector('#nombre_enunciado').innerHTML = enunciado.id + ' - ' + enunciado.nombre
      document.querySelector('#definicion_enunciado').innerHTML = enunciado.definicion
      document.querySelector('#autor_enunciado').innerHTML = autor
      document.querySelector('#modulo_enunciado').innerHTML = enunciado.modulo
      document.querySelector('#ra_enunciado').innerHTML = enunciado.ra
      document.querySelector('#uf_enunciado').innerHTML = enunciado.uf
      document.querySelector('#fechaInicio_enunciado').innerHTML = enunciado.fecha_inicio.split('T')[0]
      document.querySelector('#fechaFinal_enunciado').innerHTML = enunciado.fecha_final.split('T')[0]
      document.querySelector('#estado_enunciado').innerHTML = enunciado.estado
      document.querySelector('#actualizado_enunciado').innerHTML = enunciado.created_at.split('T')[0]

      document.querySelector('#enlace_enunciado').innerHTML = enunciado.enlace
      document.querySelector('#enlace_enunciado').setAttribute('href', enunciado.enlace)

      pintaTablaRubricasSeleccion()
    } catch (error) {
      console.log(error)
      // alert('Error al mostrar el enunciado' + error)
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'se ha producido un error al mostrar el enunciado ' + error,
        showConfirmButton: false,
        timer: 1500
      })
    }

    // Tabla rubricas
    async function pintaTablaRubricasSeleccion () {
      const enunciado = await Enunciado.getById(id)

      // Leermos todas las rubricas y las del enunciado
      const enunciadoRubricas = await EnunciadoRubricaDetalle.rubricasTodosDetalleDeProyectoId(enunciado.id)
      const rubricasTodas = await Rubrica.getAll()

      let tabla = `
      <table class="table">
        <thead class="">
          <th>NOMBRE</th>
          <th>DESCRIPCIÓN</th>
          <th>PESO PONDERACIÓN.</th>
          <th></th></tr>
        </thead>
        <tbody>
      `
      // ordenamos todas las rubricas en orden descendiente por peso
      rubricasTodas.sort(element => element.peso).reverse()

      rubricasTodas.forEach(rubrica => {
        const indexRubricaBuscada = enunciadoRubricas.findIndex(element => rubrica.id === element.rubrica_id)

        const existeRubricaBuscada = indexRubricaBuscada >= 0
        const enunciadoRubricaId = existeRubricaBuscada ? enunciadoRubricas[indexRubricaBuscada].id : null
        const peso = existeRubricaBuscada ? enunciadoRubricas[indexRubricaBuscada].peso : 0

        console.log('id de enunciadosrubricas ')
        // selector de rubrica
        const inputSelector = existeRubricaBuscada
          ? `
          <input 
            type='checkbox' 
            checked 
            value=''
            data-enunciado_id = '${enunciado.id}' 
            data-rubrica_id = '${rubrica.id}' 
            data-id = '${enunciadoRubricaId}' 
            class='selector borrar'
          />
          `
          : `
          <input 
            type='checkbox' value='' 
            data-enunciado_id = '${enunciado.id}' 
            data-rubrica_id = '${rubrica.id}' 
            data-id = 'null' 
            class='selector insertar'
          />          
          `

        tabla += `
        <tr>
          <td>${rubrica.nombre}</td>
          <td>${rubrica.descripcion}</td>
          <td>
          <input 
            type='number' 
            data-id = ${enunciadoRubricaId}
            data-enunciado_id = '${enunciado.id}' 
            data-rubrica_id = '${rubrica.id}' 
            min = '0' max = '100' 
            value = '${peso}'
            class="inputPeso" 
          />
          </td>
          <td>
            ${inputSelector}
          </td>
        </tr>
        `
      })
      tabla += '</tbody></table>'
      document.querySelector('#rubricas').innerHTML = tabla
    }
    document.querySelector('body').addEventListener('change', async (e) => {
      // si modifica el checkbox
      if (e.target.classList.contains('selector')) {
        const enunciadoRubricaId = e.target.dataset.id
        if (e.target.checked) {
          // añadir rubrica a enunciado
          try {
            const enunciadoRubricaData = {
              enunciado_id: e.target.dataset.enunciado_id,
              rubrica_id: e.target.dataset.rubrica_id,
              peso: e.target.parentNode.previousElementSibling.querySelector('input').value
            }
            await EnunciadoRubricaDetalle.create(enunciadoRubricaData)
            //pintaTablaRubricasSeleccion()
          } catch (error) {
            console.log('Error al insertar la rúbrica del enunciado ', error)
          }
        } else {
          // eliminar rubrica de enunciado
          try {
            await EnunciadoRubricaDetalle.delete(enunciadoRubricaId)
            //pintaTablaRubricasSeleccion()
          } catch (error) {
            console.log('Error al eliminar la rúbrica del enunciado ', error)
          }
        }
      }
      // Si modifica el valor de un input seleccionado que está chequedado
      if (e.target.classList.contains('inputPeso') && e.target.parentNode.nextElementSibling.querySelector('input').checked) {
        const enunciadoRubricaId = e.target.dataset.id
        // actualizar rubrica de enunciado
        try {
          console.log('enunciadoRubricaDetalla ', enunciadoRubricaId);
          const rubricaAModificar = await EnunciadoRubricaDetalle.getById(enunciadoRubricaId)
          console.log(rubricaAModificar);
          rubricaAModificar.peso = e.target.value
          rubricaAModificar.update()

          //pintaTablaRubricasSeleccion()
        } catch (error) {
          console.log('Error al insertar la rúbrica del enunciado ', error)
        }
      } else if (e.target.classList.contains('insertar')) {
        console.log('insertar')
      }
    })
  }

}
