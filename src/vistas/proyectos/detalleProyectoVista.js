import { User } from '../../bd/user'
import { Perfil } from '../../bd/perfil'
import { Proyecto, ProyectoDetalle } from '../../bd/proyecto'
import { Comentario } from '../../bd/comentario'
import { EnunciadoRubrica, EnunciadoRubricaDetalle } from '../../bd/enunciadoRubrica'

import { Nota } from '../../bd/nota'
import { estrellas } from '../../componentes/estrellas'

import { pintaRubricas, pintaRubricasUsuario } from '../../componentes/pintaRubricas'
import Swal from 'sweetalert2'

export default {
  template: `
<div class="container mt-5">
  <div class="row">
    <div class="col-12">
      <a href="#/proyectos" class="btn btn-outline-secondary btn-sm">< Proyectos</a>
      <h1 id="nombre_proyecto" class="w-100 text-center p-2"></h1>
      <div class="d-flex justify-content-center m-5">
        <img src="assets/imagenes/proyectos/proyecto.png" class="w-400" alt="imagen proyecto">
      </div>
    </div>
    <!-- DAtos proyecto -->
    <div class="col-12 col-xl-6 mt-2">
      <h5> Información general: </h5>
      <p>Autor: <span id="autor_proyecto" class="text-center p-2"></span></p>
      <p>Enunciado: <span id="enunciado_proyecto" class="text-center p-2"></span></p>
      <p>Enlace: <a id="enlace_proyecto" class="text-center p-2" target="_black">Link a mi proyecto</a></p>
      <h5>Descripción:</h5>
      <p id="descripcion_proyecto"></p>
    </div>
    <!-- Valoracion   -->
    <div class="col-12 col-xl-6">
      <div class="row">
        <div class="col-12  mt-2">
          <div class="d-flex justify-content-between">
            <h5>Valoración alumnos:</h5>
            <input title="Enviar nota" id="notaMedia" class=" w-25 ms-auto me-2 text-center text-white fw-bold btn-sm bg-primary mb-2" value="6.0" disabled></input>
            
          </div>  
        

          <div id="valoracion">
            <!-- Aqui van los criterios y las estrellas -->
          </div>
          
        </div>
        <div class="col-12 mt-3 ">
          <h5>Tu valoración:</h5>
          <div id="valoracionPersonal">
            <!-- Aqui van los criterios y las estrellas -->
            
          </div> 
        </div>
      </div>
    </div>
    <!-- Comentarios -->
    <div class="col-12">
      <h3>Comentarios:</h3>
      
      <form id="formComentario">
        <div class="comentario d-flex flex-wrap align-item-top bg-dark p-3 mb-5">
          
            <div class="w-100 d-flex">
              <img id="imgPerfilLogueado" src="/assets/avatar.svg" alt="us" class="border me-3 mt-1" style="width:50px;height:50px;">
              <textarea id="nuevoComentario" class="m-1 form-control h-75" placeholder="Escribe un comentario..." required></textarea>
            </div>
            
            <button id="btnEnviarComentario" type="submit" class="btn btn-success btn-small  ms-auto">Enviar comentario</button>
          
        </div>
      </form>
      

      <div id="comentarios">
        
    </div>
  </div>
</div>
    `,
  script: async (id) => {
    // Detectamos eventos si hay cambio en tabla notas
    // const eventos = supabase.channel('custom-all-channel')
    //   .on(
    //     'postgres_changes',
    //     { event: '*', schema: 'public', table: 'notas' },
    //     async (payload) => {
    //       console.log('Change received!', payload)
    //       await pintaRubricas()
    //     }
    //   )
    //   .subscribe()

    // Cargamos datos generales
    let usuarioLogueado = ''
    let perfilLogueado = ''
    let proyectoD = ''

    try {
      // capturamos datos del proyecto
      usuarioLogueado = await User.getUser()
      perfilLogueado = await Perfil.getByUserId(usuarioLogueado.id)
      proyectoD = await ProyectoDetalle.proyectoDetalleId(id)
      // insertamos los datos en la página
      document.querySelector('#imgPerfilLogueado').src = perfilLogueado.avatar
      const autor = proyectoD.nombre_usuario + ' ' + proyectoD.apellidos_usuario
      document.querySelector('#nombre_proyecto').innerHTML = proyectoD.id + ' - ' + proyectoD.nombre
      document.querySelector('#descripcion_proyecto').innerHTML = proyectoD.descripcion
      document.querySelector('#autor_proyecto').innerHTML = autor
      document.querySelector('#enunciado_proyecto').innerHTML = proyectoD.nombre_enunciado
      document.querySelector('#enlace_proyecto').innerHTML = proyectoD.enlace
      document.querySelector('#enlace_proyecto').setAttribute('href', proyectoD.enlace)
    } catch (error) {
      console.log(error)
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Se ha producido un error al abrir el proyecto' + error,
        showConfirmButton: false,
        timer: 1500
      })
    }

    // Intentamos leer las notas de este proyecto
    const notas = []
    try {
      await pintaRubricas(proyectoD)
      // pintamos las rubricas y nota que ha puesto el usuario

      await pintaRubricasUsuario(proyectoD)
    } catch (error) {
      console.log('no hay notas para este proyecto', error)
    }

    // Intentamos PINTAR COMENTARIOS
    try {
      // Definición de función pintaTablaComentarios
      const pintaTablaComentarios = async () => {
        const comentarios = await Comentario.getAllByProjectId(id)
        let divComentarios = `
        <div id="divComentario" class="comentario d-flex flex-wrap align-item-top">`
        for (const comentario of comentarios) {
          // Capturamos autor del comentario
          const perfil = await Perfil.getByUserId(comentario.user_id)
          const autor = perfil.nombre + ' ' + perfil.apellidos
          const avatar = perfil.avatar
          const fecha = perfil.created_at.split('T')[0]
          divComentarios += `
          <div class="w-100 d-flex mb-2 p-3">
          <img src="${avatar}" alt="us" class="border me-3 mt-1" style="width:50px;height:50px;">
            <div class="w-100">          
              <div class="comentario">${comentario.comentario}</div>

              <p class="text-end small "><em>${fecha} - ${autor}</em></p>
            </div>
          </div>
            `
        }
        divComentarios += '</div>'
        document.querySelector('#comentarios').innerHTML = divComentarios
      }
      pintaTablaComentarios()
      // Insertar comentario
      document.querySelector('#formComentario').addEventListener('submit', async (e) => {
        e.preventDefault()
        const inputComentario = document.querySelector('#nuevoComentario')
        const datosComentario = {
          comentario: inputComentario.value,
          user_id: usuarioLogueado.id,
          proyecto_id: id
        }
        await Comentario.create(datosComentario)
        inputComentario.value = ''
        inputComentario.focus()

        pintaTablaComentarios()
      })
    } catch (error) {
      console.log(error)
      //alert('Error al mostrar las COMENTARIOS' + error)
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'No se han podido cargar los comentarios ' + error,
        showConfirmButton: false,
        timer: 1500
      })
    }

    // Evento cambio sobre inputMiNota
    document.addEventListener('change', async (e) => {
      if (e.target.classList.contains('nota')) {
        const datosNota = {
          nota: e.target.value,
          proyecto_id: e.target.dataset.proyectoid,
          user_id: e.target.dataset.userid,
          rubrica_id: e.target.dataset.rubricaid
        }

        try {
          // Si no tiene nota la insertamos. Si ya hay nota la actualizamos
          const notaData = e.target.dataset.nota
          if (notaData === 'undefined') {
            const notaInsertada = await Nota.create(datosNota)
            e.target.setAttribute('data-nota', notaInsertada.nota)
            e.target.setAttribute('data-id', notaInsertada.id)
          } else {
            const notaUsuario = new Nota(
              datosNota.id = e.target.dataset.id,
              datosNota.created_at = null,
              datosNota.nota,
              datosNota.proyecto_id,
              datosNota.user_id,
              datosNota.rubrica_id)
            notaUsuario.id = e.target.dataset.id
            const notaUsuarioActualizada = await notaUsuario.update()
          }
          await pintaRubricas(proyectoD)
          console.log('input', e.target.nextSibling)
          // Capturamos el elemento hermano al input y actualizamos las estrellas a partir de su valor
          e.target.nextElementSibling.innerHTML = estrellas(e.target.value)
        } catch (error) {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'No se han podido modificar la nota del proyectos ' + error,
            showConfirmButton: false,
            timer: 1500
          })
        }

        // const notaCreada = await Nota.create(datosNota)
      }
    })
  }

}
