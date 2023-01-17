'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Deuda extends Model {
  static get table () {return 'deudas'}
  static get primaryKey () {return 'id_deuda'}
  static get createdAtColumn  () {return 'fecha_generacion'}
  static get updatedAtColumn  () {return 'fecha_actualizacion'}
}

module.exports = Deuda
