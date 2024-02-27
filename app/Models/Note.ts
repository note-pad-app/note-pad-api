import { DateTime } from 'luxon'
import { column } from '@adonisjs/lucid/orm'
import MyModel from './model.js'
import { noteValidator } from '#validators/note';

export default class Note extends MyModel {
  static get validator(){
    return noteValidator;
  }

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare user_id: number

  @column()
  declare category_id: number

  @column()
  declare note: string

  @column()
  declare is_favorite: boolean

  @column()
  declare is_deleted: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}