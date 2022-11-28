'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Nacionalidad extends Model {
  static get table() { return 'nacionalidades' }
  static get primaryKey() { return 'id_nacionalidad' }
  static get createdAtColumn() { return null }
  static get updatedAtColumn() { return null }
}

module.exports = Nacionalidad
