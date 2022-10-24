'use strict'
const TipoDocumento = use('App/Models/TipoDocumento')
const Database = use('Database');

class TipoDocumentoController {
  async store({ request }) {
    const response = {}
    const {descripcion, codigo, estado} = request.all()
    try {
      const trx = await Database.beginTransaction()
      const tipoDocumento = await TipoDocumento.create({
        descripcion : descripcion.toUpperCase(),
        codigo,
        estado
      }, trx)

      await trx.commit(tipoDocumento)

      response.status = 200
      response.data = tipoDocumento
      return response;
    } catch (error) {
      response.status = error.status ? error.status : 403
      response.error = error.message

      return response;
    }
  }

  async index() {
    const response = {}
    try {
      const documento = await TipoDocumento.all()
      if(documento) {
        response.status = 200
        response.data = documento
      }else{
        response.status = 404
        response.data = 'sin data'
      }

      return response
    } catch (error) {
      response.status = error.status ? error.status : 403
      response.error = error.message
      return response
    }
  }

  async editarDocumento({params, request}){
    const {id} = params
    const response = {}
    const {descripcion, codigo, estado} = request.all()

    const description = descripcion ? descripcion.toUpperCase() : descripcion

    try {
      const documento = await TipoDocumento.find(id)
      const trx = await Database.beginTransaction()
      documento.descripcion = description
      documento.codigo = codigo
      documento.estado = estado

      await documento.save(trx)
      await trx.commit(documento)

      response.status = 200
      response.data = documento
      return response
    } catch (error) {
      response.status = error.status ? error.status : 403
      response.error = error.message
      return response
    }
  }
}

module.exports = TipoDocumentoController
