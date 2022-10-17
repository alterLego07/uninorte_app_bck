'use strict'
const User = use ('App/Models/User')
const Database = use('Database');


class UserController {
  async login ({request, auth}){
    const response = {}
    const { email, password } = request.all()

    if(!email || !password){
      response.status = 403;
      response.error = 'Fallo de credenciales'
      return response
    }

    try {
      const token =  await auth.attempt(email, password)
      response.status = 200
      response.data = token
      return response
    } catch (error) {
      response.status = error.status ? error.status : 403
      response.error = error.message
      return response
    }

  }


  async store ({request}){
    const response = {}

    const {email, password, tipo_usuario} = request.all()

    try {
      const trx = await Database.beginTransaction();
      const usuario = await User.create({
        username : email,
        email: email, 
        password: password,
        tipo_usuario: tipo_usuario
      }, trx)

      await trx.commit(usuario);

      response.status = 200
      response.data = usuario
      return response
    } catch (error) {
      response.status = error.status ? error.status: 403;
      response.error  = error.message
      return response
    }
  }
}

module.exports = UserController
