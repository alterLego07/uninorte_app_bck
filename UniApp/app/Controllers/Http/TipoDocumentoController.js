'use strict'
const TipoDocumento = use('App/Model/TipoDocumento')

class TipoDocumentoController {
    async store ({request}){
        const response ={}
        try {
            const trx = await Database.beginTransaction()
            const tipoDocumento = await TipoDocumento.store({

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
}

module.exports = TipoDocumentoController
