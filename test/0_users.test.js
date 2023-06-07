/* eslint-disable no-undef */
// importamos librerias de testing
import { expect } from 'chai'
// Importamos la clase User
import { User } from '../src/bd/user.js'

// Creamos un array para guardar los datos que obtenemos de la bd
const ArrayUsersRegistrados = []
// Array con datos de ejemplo para los registros
const ArrayUsers = [
  {
    email: 'carrebola@fpllefia.com',
    password: '123456'
  },
  {
    email: 'cadmin@fpllefia.com',
    password: '123456'
  },
  {
    email: 'arrebola.c@gmail.com',
    password: '123456'
  },
  {
    email: 'meborraran@email.com',
    password: '123456'
  }
]

// Cada vez que pasemos el test cambiaremos el número para que vaya registrando los usuarios de uno en uno.
const numUser = 0 // Numero de usuario a registrar

describe('************* User: Crearemos 4 usuarios. Uno cada vez.', async function () {
  describe('Registra un nuevo usuario', async function () {
    it('debería crear un nuevo user en la tabla "users"', async function () {
      // Crear el nuevo usuario (DEBEMOS HACERLO UNO A UNO)
      ArrayUsersRegistrados[numUser] = await User.create(ArrayUsers[numUser])

      // Comprobamos que el email del usuario registrado coincide con el del usuario a registrar
      expect(ArrayUsersRegistrados[numUser].email).equal(ArrayUsers[numUser].email)
    })
  })

  describe('Login', async function () {
    // La primera vez que pase el test FALLARÁ porque el usuario aún no está confirmado por mail. Una vez confirmado podremos pasar el test de login
    it('debería logear un usuario registrado y devolver un objeto con id y email', async function () {
      // Logeamos y capturamos el objeto que nos devuelve
      ArrayUsersRegistrados[numUser] = await User.login(ArrayUsers[numUser])
      // Comprobamos que el mail del objeto devuelto corresponde con el mail del usuario registrado
      expect(ArrayUsersRegistrados[numUser].email).equal(ArrayUsers[numUser].email)
    })
  })

  /* Por el momento estos test no los pasaremos ya que parece que hay problemas para que mocha acceda a la sesión creada en el navegador */

  // describe('getUser', async function() {
  //   it('debería capturar los datos del usuario logeado', async function() {

  //     ArrayUsersRegistrados[numUser] = await User.getUser()

  //     console.log(ArrayUsersRegistrados[number]);

  //     expect(ArrayUsersRegistrados[numUser].email).equal(ArrayUsers[numUser].email)
  //   })
  // })

  // describe('Logout', async function() {
  //   it('debería cerrar sesion', async function() {

  //     await User.logout()
  //     ArrayUsersRegistrados[numUser] = await User.logout()
  //     expect(ArrayUsersRegistrados[numUser].email).equal(undefined)
  //   })
  // })
})
