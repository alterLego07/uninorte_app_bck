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
  Route.post('editar/:id', 'UserController.editarUsuario').middleware('auth')
  Route.get('usuario/:id', 'UserController.listarUsuario').middleware('auth')
}).prefix('usuarios')