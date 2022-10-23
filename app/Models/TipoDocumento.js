'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class TipoDocumento extends Model {
  static get table () {return 'tipo_documento'}
  static get primaryKey () {return 'id_tipo_documento'}
  static get createdAtColumn  () {return null}
  static get updatedAtColumn  () {return null}
}

module.exports = TipoDocumento
