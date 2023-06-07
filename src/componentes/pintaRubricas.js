
import { Nota } from '../bd/nota'
import { EnunciadoRubricaDetalle } from '../bd/enunciadoRubrica'
import { estrellas } from './estrellas'

const pintaRubricas = async (proyectoD) => {
  const notas = await Nota.getAllByProjectId(proyectoD.id)

  const rubricasDetalle = await EnunciadoRubricaDetalle.rubricasTodosDetalleDeProyectoId(proyectoD.enunciado_id)

  let HTMLlistaRubricas = '<ul class="list-group list-group-flush">'
  let notaMediaProyecto = 0
  rubricasDetalle.forEach(element => {
    const calculaNota = (rubrica_id) => {
      let notasRubrica = []
      notasRubrica = notas.filter(ele => ele.rubrica_id === rubrica_id)
      let sumaNotas = 0
      notasRubrica.forEach(notas => {
        sumaNotas += notas.nota
      })
      const notaMediaRubrica = notasRubrica.length > 0 ? (sumaNotas / notasRubrica.length).toFixed(2) : ''
      notaMediaProyecto += (notaMediaRubrica * (element.peso / 100))
      return (notaMediaRubrica)
    }

    let info = ''
    info = `<div class="me-2 d-inline-block">${(calculaNota(element.rubrica_id))}</div> ${estrellas(Math.round(calculaNota(element.rubrica_id)))}`
    console.log('info', info)
    HTMLlistaRubricas += `
      <li class="list-group-item d-flex justify-content-between ">   
        ${element.rubrica_nombre} (${element.peso}/100) 
        <div class="d-flex">
        ${info} 
        </div>
      </li>`
  })
  HTMLlistaRubricas += '</ul>'
  console.log('listaRubricas', HTMLlistaRubricas);
  document.querySelector('#valoracion').innerHTML = rubricasDetalle.length ? HTMLlistaRubricas : '<p class="">No hay criterios de corrección asociados a este proyecto</p>'
  document.querySelector('#notaMedia').value = notaMediaProyecto.toFixed(1)
}

// PINTARUBRICASUSUARIO()
const pintaRubricasUsuario = async (proyectoD) => {
  console.log('proyectoD', proyectoD)
  const notas = await Nota.getAllByProjectId(proyectoD.id)

  // Si recibe user_id pinta la nota que el usuario a puesto y las estrellas, sino, pinta la media de alumnos y las estrellas
  const rubricasDetalle = await EnunciadoRubricaDetalle.rubricasTodosDetalleDeProyectoId(proyectoD.enunciado_id)
  console.log('rubricas detalle ', rubricasDetalle)

  let HTMLlistaRubricas = '<ul class="list-group list-group-flush">'
  rubricasDetalle.forEach(element => {
    let nota
    let id
    console.log('notas', notas)
    if (notas.length > 0) {
      const miNotaFiltrada = notas.filter(nota => nota.rubrica_id === element.rubrica_id && nota.user_id === proyectoD.user_id)
      if (miNotaFiltrada.length > 0) {
        nota = miNotaFiltrada[0].nota
        id = miNotaFiltrada[0].id
      }
    }
    const inputMiNota = `
      <input 
        id = "inputMiNota" 
        class = "nota me-2" 
        style="width: 3em"
        type = "number" 
        min = "0" max = "5" 
        value = "${nota}"
        data-id = "${id}"
        data-userId = "${proyectoD.user_id}"
        data-rubricaId = "${element.rubrica_id}"
        data-proyectoId = "${proyectoD.id}" 
        data-nota = "${nota}"
      />`
    const info = inputMiNota + ' ' + estrellas(nota ? Math.round(nota) : 0)

    HTMLlistaRubricas += `
    <li class="list-group-item d-flex justify-content-between">   
      ${element.rubrica_nombre} (${element.peso}/100) 
      <div class="d-flex">
      ${info}
      </div>
    </li>`
  })
  HTMLlistaRubricas += '</ul>'
  const vp = document.querySelector('#valoracionPersonal')
  vp.innerHTML = rubricasDetalle.length ? HTMLlistaRubricas : '<p class="">Todavia no hay notas para estos criterios de corrección asociados a este proyecto</p>'
}

export { pintaRubricas, pintaRubricasUsuario }
