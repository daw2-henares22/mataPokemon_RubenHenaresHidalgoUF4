import { createClient } from '@supabase/supabase-js'

export const pruebaSupabase = {
  template: '<h1>Pruebas Supabase</h1>',
  script: async () => {
    console.log('purebas supabase')
    // Creando la conexión con supabase
    const supabaseUrl = 'https://ptnlczuiuaotrscavujw.supabase.co'
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0bmxjenVpdWFvdHJzY2F2dWp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzcxNzY2MTAsImV4cCI6MTk5Mjc1MjYxMH0.CaOtS_kudjpUTJlnV4VfNU_5tZn1N8T0Uj9DkNjIecs'
    const supabase = createClient(supabaseUrl, supabaseKey)
    // console.log(supabase);

    // Consulta a la tabla perfiles
    const verTodosLosPerfiles = async () => {
      const { data: perfiles, error } = await supabase
        .from('perfiles')
        .select('*')
      console.log('leer todos los perfiles: ', perfiles)
    }

    // Consulta a la tabla proyectos
    const verTodosLosProyectos = async () => {
      const { data: proyectos, error } = await supabase
        .from('proyectos')
        .select('*')
      console.log('leer todos los proyectos: ', proyectos)
    }

    // Agregar un nuevo perfil
    const agregarPerfil = async () => {
      // INSERT A ROW
      const { data, error } = await supabase
        .from('perfiles')
        .insert([
          { nombre: 'cadmin' }
        ])
    }

    // Invocamos funcion proyectoDetalle
    const leerProyectosDetalle = async () => {
      // INVOKE FUNCTION
      const { data, error } = await supabase
        .rpc('proyectosdetalle')

      if (error) console.error(error)
      else console.log('leer proyectos detalle ', data)
    }

    // Registro de usuarios
    const registro = async () => {
      // USER SIGNUP
      const { data, error } = await supabase.auth.signUp({
        email: 'cadmin@fpllefia.com',
        password: '123456'
      })
    }
    // login
    const usuario = {
      email: 'carrebola@fpllefia.com',
      password: '123456'
    }
    const login = async (usuario) => {
      // USER LOGIN
      const { data, error } = await supabase.auth.signInWithPassword(usuario)
    }

    // logout
    const logout = async () => {
      // USER LOGOUT
      const { error } = await supabase.auth.signOut()
    }

    // mostrar usuarios logeados
    const mostrarUsuarioLogeado = async () => {
      // GET USER
      const { data: { user } } = await supabase.auth.getUser()
      console.log('usuario logueado', user)
    }

    // leer todos los proyectos
    await verTodosLosProyectos()

    // leer perfiles
    await verTodosLosPerfiles()

    // login como admin
    login({
      email: 'carrebola@fpllefia.com',
      password: '123456'
    })
  }
}
