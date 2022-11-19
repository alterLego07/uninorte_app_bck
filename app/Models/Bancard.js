'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Bancard extends Model {
  static get table () {return 'bancard'}
  static get primaryKey () {return 'id_bancard'}
  static get createdAtColumn  () {return 'date_pay'}
  static get updatedAtColumn  () {return null}
}

module.exports = Bancard
