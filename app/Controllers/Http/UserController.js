'use strict'
const User = use ('App/Models/User')
const Alumno = use('App/Models/Alumno')
const Nacionalidad = use('App/Models/Nacionalidad')
const Sexo = use('App/Models/Sexo')
const TipoDocumento = use('App/Models/TipoDocumento')
const Database = use('Database');
const Moment = use('moment')


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
      const token = await auth.withRefreshToken().attempt(email, password)
      const data = {}
      if (token) {
        const user = await User.findByOrFail('email', email);
        // console.log(user.id_usuario)
        const alumno = await Alumno.find(user.id_usuario)
        const nacionalidad = await Nacionalidad.find(alumno.id_nacionalidad)
        const sexo = await Sexo.find(alumno.id_sexo)
        const documento = await TipoDocumento.find(alumno.id_tipo_documento)

        data.id_alumno= alumno.id_alumno
        data.nombreyapellido = alumno.nombre + " " + alumno.apellido
        data.nacionalidad = nacionalidad.descripcion
        data.sexo = sexo.descripcion
        data.fechanacimiento = alumno.fecha_nacimiento
        data.tipo_documento = documento.descripcion
      }
      
      response.status = 200
      response.token = token
      response.data = data
      return response
    } catch (error) {
      response.status = error.status ? error.status : 403
      response.error = error.message
      return response
    }

  }


  async store ({request}){
    const response = {}

    const {email, password, tipo_usuario, id_usuario} = request.all()

    try {
      const trx = await Database.beginTransaction();
      const usuario = await User.create({
        username : email,
        email: email, 
        password: password,
        tipo_usuario: tipo_usuario,
        id_usuario
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

  async index (){
    const response = {}

    try {
      const usuarios = await User.all();
      response.status = 200;
      response.data = usuarios

      return response
    } catch (error) {
      response.status = error.status ? error.status : 403
      response.error = error.message
      return response
    }
  }

  async listarUsuario({params}){
    const response = {}
    const {id} = params

    try {
      const usuario = await User.find(id)
      if(id){
        response.status = 200;
        response.data = usuario
        return response
      }else{
        response.status = 404;
        response.data = 'sin data'
        return response
      }
    } catch (error) {
      response.status = error.status ? error.status : 403
      response.error = error.message
      return response
    }
  }

  async editarUsuario ({request, params}){
    const response = {};
    const {password} = request.all()
    const {id} = params

    try {
      const trx = await Database.beginTransaction()
      const usuario = await User.find(id)
      usuario.password = password;
      await usuario.save(trx)
      await trx.commit()

      response.status = 200
      response.data = ' Actualizado id ' + id;
      return response 
    } catch (error) {
      response.status = error.status ? error.status : 403
      response.error = error.message
      return response
    }
  }


  async getuserLogin ({auth}){
    const response = {}
    const login = await auth.getUser();
    console.log(login)
    try {
      if(login.tipo_usuario == 'alumno'){
        const info = await Alumno.find(login.id_usuario)
        if(info){
          response.status = 200;
          response.data = info;
          return response

        }else{
          response.status = 200;
          response.data = 'sin data';
          return response

        }

      }else if (login.tipo_usuario == 'docente'){
        // buscaremos en docente..
        response.status = 403;
        response.error = 'sin modulos'
        return response
      }else{
      // buscaremos en BACK_OFFICE..
      response.status = 403;
      response.error = 'sin modulos'
      return response
    }
    } catch (error) {
      response.status = error.status ? error.status : 403
      response.error = error.message
      return response
    }
  }

}

module.exports = UserController
