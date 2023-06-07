
export const fechasTareas = {
  template: `
    <div class="fechas d-flex flex-wrap m-1"></div>
  `,
  script: async (semanas) => {
    // creamos la tabla con las fechas
    try {
      // Capturamos fecha hoy y marcamos la linea
      let hoy = new Date()
      hoy = hoy.toISOString().split('T')[0]
      let posicionActual = 0

      let divFechas = ''
      semanas.forEach((element, index) => {
        if (element.fecha < hoy) posicionActual = index
        divFechas += `
        <div style="width: 100px;" class="fecha border text-center" >sem. <strong>${element.semana}</strong> ${element.fecha}</div>
        `
      })
      document.querySelector('.fechas').innerHTML = divFechas
      document.querySelector('#marcador').style.width = 100 * posicionActual + 'px'
      window.scroll(posicionActual * 100, 0)
    } catch (error) {
      console.log(error)
    }
  }
}
