'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})


Route.group(() => {
  Route.get('listar', 'UserController.index').middleware('auth')
  Route.post('login', 'UserController.login')
  Route.post('crear', 'UserController.store')
  Route.post('editar/:id', 'UserController.editarUsuario')//.middleware('auth')
  Route.get('usuario/:id', 'UserController.listarUsuario').middleware('auth')
  Route.get('info', 'UserController.getuserLogin').middleware('auth')
  
}).prefix('usuarios')

Route.group(() => {
  Route.get('listar', 'TipoDocumentoController.index').middleware('auth')
  Route.post('crear', 'TipoDocumentoController.store').middleware('auth')
  Route.post('editar/:id', 'TipoDocumentoController.editarDocumento').middleware('auth')
}).prefix('tiposdocumentos');


Route.group(() => {
  Route.get('listar', 'AlumnoController.index').middleware('auth')
  Route.post('crear', 'AlumnoController.store').middleware('auth')
  Route.get('alumno/:id', 'AlumnoController.mostarAlumno').middleware('auth')
}).prefix('alumnos');

Route.group(() => {
  Route.get('listar/:idalumno', 'DeudaController.listarDeudaAlumnos').middleware('auth')
  Route.post('crear', 'DeudaController.store').middleware('auth')
}).prefix('deudas');