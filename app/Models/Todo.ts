import { DateTime } from 'luxon'
import { afterUpdate, belongsTo, column } from '@adonisjs/lucid/orm'
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
  declare completed_at: DateTime | null

  @column({
    consume: (v) => Boolean(v),
  })
  declare is_important: boolean

  @column.dateTime()
  declare reminder: DateTime

  @column({
    consume: (v) => Boolean(v) as boolean,
  })
  declare is_completed: boolean

  @column({
    consume: (v) => Boolean(v) as boolean,
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
  @afterUpdate()
  static async afterUpdate(todo: Todo) {
    if (todo.$dirty.is_completed) {
      console.log('dirty')
      if (todo.is_completed) {
        console.log('date')
        todo.completed_at = DateTime.now();
        await todo.save()
      } else {
        console.log('set null')
        todo.completed_at = null;
      }
    }
  }
}