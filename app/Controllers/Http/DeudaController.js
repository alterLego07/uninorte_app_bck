'use strict'
const Deuda = use('App/Models/Deuda')
const Database = use('Database');
const Alumno = use('App/Models/Alumno')



class DeudaController {
  async store ({request}){
    // Generamos la Deuda..
    const response = {}
    const {id_alumno, id_concepto, monto_a_pagar, mora, fecha_vencimiento} = request.all()

    let total = parseFloat(monto_a_pagar) + parseFloat(mora);

    try {
      const deuda = await Deuda.create({
        id_alumno,
        id_concepto,
        monto_a_pagar : parseFloat(monto_a_pagar),
        mora : parseFloat(mora),
        fecha_vencimiento,
        monto_total : total
      })

      response.status = 200
      response.data = deuda;
      return response

    } catch (error) {
      response.stauts = error.status ? error.status : 403
      response.error = error.message

      return response
    }
  }

  async update ({request, params}){

  }

  async listarDeudaAlumnos({params}){
    const response = {}
    const {idalumno} = params

    try {
      const deuda = await Deuda.findByOrFail('id_alumno', idalumno)

      if(deuda){
        response.status = 200
        response.data = deuda
        return response;
      }else{
        response.status = 200
        response.data = 'No se registran Deudas para el Alumno.'
        return response
      }
    } catch (error) {
      response.status = error.status ? error.status : 403
      response.error = 'No se registran Deudas para el Alumno.'

      return response
    }
  }
}

module.exports = DeudaController
