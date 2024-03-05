import { DateTime } from 'luxon'
import { column } from '@adonisjs/lucid/orm'
import MyModel from './model.js'
import { todoValidator } from '#validators/todo';

export default class Todo extends MyModel {
  static get validator(){
    return todoValidator;
  }

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare user_id: number

  @column()
  declare category_id: number

  @column()
  declare todo: string

  @column.dateTime()
  declare completed_at: DateTime

  @column({
    consume: (v) => Boolean(v),
  })
  declare is_important: boolean

  @column.dateTime()
  declare reminder: DateTime

  @column({
    consume: (v) => Boolean(v),
  })
  declare is_completed: boolean

  @column({
    consume: (v) => Boolean(v),
  })
  declare is_deleted: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

}