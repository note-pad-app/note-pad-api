import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Todo extends BaseModel {
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

  @column()
  declare is_important: boolean

  @column.dateTime()
  declare reminder: DateTime

  @column()
  declare is_completed: boolean

  @column()
  declare is_deleted: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}