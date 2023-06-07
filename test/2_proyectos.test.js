
import  { expect } from 'chai'

import { supabase } from '../src/bd/supabase.js';
import { Perfil } from '../src/bd/perfil.js';
import { Proyecto } from '../src/bd/proyecto.js';

// Antes de cada prueba, borrar todos los registros de la tabla 'proyectos'



describe('Proyectos: Crearemos dos proyectos para cada usuario. Uno de los de Juan los modificaremos y borraremos', async function() {

  let proyecto
  

  describe('getAll()', async function() {  
    it('debería devolver un array de proyectos vacío', async function() {
      const proyectos = await Proyecto.getAll()
      expect(proyectos).to.be.an('array')
      expect(proyectos.length).to.equal(0)
    })
  })

})


  // describe('create()', async function() {
  //   it('debería crear varios (8) proyectos', async function() {
  //     //Capturamos los perfiles
      
  //     const perfiles = await Perfil.getAll()
  //     ArrayProyectos = [
  //       {
  //         nombre: 'Aplicación mascotas',
  //         descripción: 'App para la gestión de tu mascota',
  //         user_id:       
  //       },
  //       {
  //         nombre: 'Juan',
  //         apellidos: 'Eustaquio'      
  //       },
  //       {
  //         nombre: 'Ramona',
  //         apellidos: 'Rizota'      
  //       }
  //     ]
        
  //     const perfilDevuelto = {
  //       nombre: 'Pepe',
  //       apellidos: 'Gotera',
  //       user_id: null,
  //       estado: 'pendiente',
  //       rol: 'registrado',
  //       avatar: null
  //     }

  //     // Crear el nuevo perfil
  //     await Perfil.create(ArrayPerfiles[0])
  //     await Perfil.create(ArrayPerfiles[1])
  //     await Perfil.create(ArrayPerfiles[2])

  //     // Verificar que se ha creado el perfil correctamente
  //     const { data: perfiles } = await supabase.from('perfiles').select('*')
  //     expect(perfiles).to.be.an('array')
  //     expect(perfiles.length).to.equal(3)
  //     expect(perfiles[0]).to.include(perfilDevuelto)
  //   })
  // })

  // // describe('getById()', function() {
  // //   it('debería devolver el perfil con el ID correspondiente', async function() {
      
  // //     // Obtener el ID del perfil recién creado
  // //     const { data: perfiles } = await supabase.from('perfiles').select('id')
  // //     const perfilId = perfiles[0].id

  // //     // Obtener el perfil por ID
  // //     const perfil = await Perfil.getById(perfilId)
  // //     expect(perfil).to.be.an.instanceof(Perfil)
  // //   })
  // // })

  

  // // describe('actualizarPerfil', () => {
    
  // //   it('debería actualizar el nombre y apellido del perfil', async () => {
  // //     // Obtener el ID del perfil recién creado
  // //     const { data: perfiles } = await supabase.from('perfiles').select('id').order('created_at')
  // //     const perfilId = perfiles[0].id

  // //     // Obtener el perfil por ID
  // //     const perfil = await Perfil.getById(perfilId)
  // //     perfil.nombre = 'Jose'
  // //     perfil.apellidos = 'GoteraNueva'
    
  // //     await perfil.update()
  // //     const perfilActualizado = await Perfil.getById(perfilId)

  // //     expect(perfilActualizado.nombre).to.equal('Jose')
  // //     expect(perfilActualizado.apellidos).to.equal('GoteraNueva')
  // //   });

  // // });
  // // //Borrar perfil
  // // describe('borraPerfil', () => {
    
  // //   it('debería borrar el último perfil creado', async () => {
  // //     // Obtener el ID del perfil recién creado
  // //     const { data: perfiles } = await supabase.from('perfiles').select('id').order('created_at')
  // //     const perfilId = perfiles[0].id
    
  // //     //obtengo el perfil
  // //     const perfilABorrar = await Perfil.getById(perfilId)
  // //     await Perfil.delete(perfilId) // asegúrate de que se complete antes de continuar
  // //     //Si los id no coinciden es que se ha borrado
  // //     expect(perfiles[0].id).to.equal(perfilABorrar.id) 
  // //   })

  // //  })




