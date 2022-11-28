'use strict'
const Alumno = use ('App/Models/Alumno')
const Database = use ('Database')
const { validate } = use('Validator')
const Moment = use('moment')

class AlumnoController {
  async store ({request, auth}){
    const login = await auth.getUser()
    const {nombre, apellido, correo, fecha_nacimiento, nro_telefono, nro_documento, direccion, id_tipo_documento} = request.all()
    const response = {}

    const reglas = {
      nombre : 'required',
      apellido : 'required',
      correo : 'required|email|unique:alumnos',
      fecha_nacimiento: 'required',
      nro_documento : 'required',
      direccion : 'required|min:3|max:150',
      id_tipo_documento : 'required'
    }

    const validation = await validate(request.all(), reglas)

    if(validation.fails()){
      response.status = 403
      response.error = validation.messages()
      return response
    }

    try {
      const trx = await Database.beginTransaction()
      const alumno = await Alumno.create({
        nombre,
        apellido,
        correo,
        fecha_nacimiento,
        nro_telefono,
        nro_documento,
        direccion,
        id_tipo_documento,
        id_usuario_creacion : login.id
      }, trx)

      await trx.commit();

      response.status = 200
      response.data = alumno
      return response
    } catch (error) {
      response.status = error.status ? error.status : 403
      response.error = error.message
      return response
    }
  }

  async index(){
    const response = {}
    try {
      const alumnos = await Alumno.all()
      if(alumnos){
        response.status = 200
        response.data = alumnos
      }else{
        response.status = 404
        response.data = {}
      }

      return response
    } catch (error) {
      response.status = error.status ? error.status : 500
      response.error = error.message
      return response
    }
  }


  async mostarAlumno({params}){
    const {id} = params
    const response = {}
    try {
      // const alumno = await Alumno.findOrFail(id)
      const alumno = await Database.select('a.*',
        Database.raw('(SELECT s.descripcion FROM sexo s WHERE s.id_sexo = a.id_sexo) as sexo'),
        Database.raw('(SELECT n.descripcion FROM nacionalidades n WHERE n.id_nacionalidad = a.id_nacionalidad) as nacionalidad'),
        Database.raw('(SELECT t.descripcion FROM tipo_documento t WHERE t.id_tipo_documento = a.id_tipo_documento) as tipo_documento')
                      ).table('alumnos as a').where('a.id_alumno', id)
      if(alumno){
        response.status = 200
        response.data = alumno[0]
      }else{
        response.status = 404
        response.data = 'sin data'
      }

      return response
    } catch (error) {
      response.error = error.message
      response.status = error.status ? error.status  : 500
      return response
    }
  }

}

module.exports = AlumnoController
