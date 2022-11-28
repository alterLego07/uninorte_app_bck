'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Sexo extends Model {
  static get table () {return 'sexo'}
  static get primaryKey () {return 'id_sexo'}
  static get createdAtColumn  () {return null}
  static get updatedAtColumn  () {return null}
}

module.exports = Sexo
