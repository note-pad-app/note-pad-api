import { DateTime } from 'luxon'
import { afterSave, belongsTo, column } from '@adonisjs/lucid/orm'
import MyModel from './model.js'
import { storeValidator, updateValidator } from '#validators/todo';
import User from './user.js';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import Category from './category.js';

export default class Todo extends MyModel {

  static get storeValidator() {
    return storeValidator;
  }

  static get updateValidator() {
    return updateValidator;
  }

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare categoryId: number

  @column()
  declare todo: string

  @column()
  declare remarks: string

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

  // relationships

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Category)
  declare category: BelongsTo<typeof Category>

  // hooks

  @afterSave()
  static async afterUpdate(todo: Todo) {
    console.log('outside')
    if (todo.is_completed) {
      console.log('inside')
      todo.completed_at = DateTime.now();
      await todo.save()
    }
  }

}