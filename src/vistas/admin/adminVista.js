import { Perfil } from '../../bd/perfil'
import { formEditarUsuario } from '../../componentes/formEditarUsuario'

import Swal from 'sweetalert2'

export default {
  template: `
  <main style="padding-top: 100px">
  <div class="container-fluid mt-5">
      <h1>Administración de usuarios</h1>
      <table id="tablaPerfiles" class="table table-striped table-hover mt-5 align-middle">
          <thead>
              <tr>
                  <th></th>
                  <th>NOMBRE</th>
                  <th>APELLIDOS</th>
                  <th>EMAIL</th>
                  <th>ROL</th>
                  <th>BLOQUEADO</th>
                  <th class="w-100"></th>
              </tr>
          </thead>
          <tbody>
          </tbody>
      </table>
  </div>
</main>
${formEditarUsuario.template}

`,

  script: async () => {
    // Generación de tabla
    try {
      // Capturamos todos los usuarios de la tabla perfiles
      const perfiles = await Perfil.getAll()
      if (perfiles) {
        // Generamos la tabla tablaPerfiles
        let tablaPerfiles = ''
        perfiles.forEach((perfil) => {
          tablaPerfiles += `
            <tr>
              <td>
                  <img src="${perfil.avatar ? perfil.avatar : 'assets/avatar.svg'}" width="50" alt="" />
              </td>
              <td>${perfil.nombre}</td>
              <td>${perfil.apellidos}</td>
              <td>${perfil.email}</td>
              <td>${perfil.rol}</td>
              <td>${perfil.bloqueado}</td>
              <td class="text-end">
                <button
                  data-id="${perfil.id}"
                  type="button"
                  class="btn text-info editar"
                  data-bs-toggle="modal"
                  data-bs-target="#editarUsuario"
                >
                  <img src="/assets/iconos/icons8-editar.svg" width="20" alt="" class="editar" data-id="${perfil.id}"/>
                </button>
              
                <button
                    data-id="${perfil.id}"
                    type="button"
                    class="btn text-danger bloquear"
                >
                  <img  data-id="${perfil.id}" class="bloquear w-100" src="/assets/iconos/icons8-bloquear.svg" width="20" alt="" />
                </button>
              
                <button
                    data-id="${perfil.id}"
                    type="button"
                    class="btn text-danger borrar"
                >
                  <img  data-id="${perfil.id}" class="borrar w-100" src="/assets/iconos/icons8-basura-llena.svg" width="20" alt="" />
                </button>
              </td>
            </tr>
          `
        })
        const divTabla = document.querySelector('#tablaPerfiles tbody')
        if (divTabla) divTabla.innerHTML = tablaPerfiles
      }
    } catch (error) {
      alert('No se han podido cargar la tabla de usuarios ' + error)
    }

    // Borrar y Editar usuario
    const divTabla = document.querySelector('#tablaPerfiles tbody')
    if (divTabla) {
      document.querySelector('#tablaPerfiles').addEventListener('click', async (e) => {
        // capturamos el id del usuarios
        const id = e.target.dataset.id
        // si es un boton de bloquear
        if (e.target.classList.contains('bloquear')) {
          try {
            const usuarioABloquear = await Perfil.getById(id)
            if (usuarioABloquear.bloqueado) {
              usuarioABloquear.bloqueado = false
              e.target.classList.remove('bloqueado')
              alert('Usuario desbloqueado')
            } else {
              usuarioABloquear.bloqueado = true
              e.target.classList.add('bloqueado')
              console.log(e.target.classList)
              alert('Usuario bloqueado')
            }

            await usuarioABloquear.block()
            window.location.href = '/#/adminUsuarios'
          } catch (error) {
            alert('No se han podido bloquear el usuario' + error)
          }
        }

        // BORRAR PERFIL USUARIO (CUIDADO!!! HABRÍA QUE ELIMINAR EL USER Y TODAS LAS REFERENCIAS)
        if (e.target.classList.contains('borrar')) {
          try {
            const usuarioABorrar = await Perfil.getById(id)

            const seguro = confirm('¿Está seguro que desea borrar el usuario? ' + usuarioABorrar.apellidos + ', ' + usuarioABorrar.nombre)

            if (seguro) {
              await Perfil.delete(id)
            }
            window.location.href = '/#/adminUsuarios'
          } catch (error) {
            alert('No se han podido borrar el usuario' + error)
          }
        }
        // editar PERFIL USUARIO
        if (e.target.classList.contains('editar')) {
          formEditarUsuario.script(id)
        }
      })
    }

    // // Edición de perfil de usuario
    // // Script para la validación del formulario
    // const form = document.querySelector('#form_editar')
    const btnEditar = document.querySelector('#btn_editar')
    if (btnEditar) {
      btnEditar.addEventListener('click', (event) => {
        event.preventDefault()
        event.stopPropagation()
        form.classList.add('was-validated')
        console.log(form.checkValidity())
        if (!form.checkValidity()) {
          console.log('formulario no valido')
        } else {
          console.log('formulario valido, debe hacerse el submit')
        }
      })
    }
  }
}
