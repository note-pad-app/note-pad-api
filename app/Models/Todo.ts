import { DateTime } from 'luxon'
import { afterUpdate, belongsTo, column} from '@adonisjs/lucid/orm'
import MyModel from './model.js'
import { storeValidator, updateValidator } from '#validators/todo';
import User from './user.js';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import Category from './category.js';

export default class Todo extends MyModel {
  static get preloads() {
    return ["category"];
  }
  
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

  @column.dateTime({consume: (v)=> DateTime.fromJSDate(v).toFormat('yyyy-MM-dd HH:mm:ss')})
  declare completed_at: DateTime | null

  @column({
    consume: (v) => Boolean(v),
  })
  declare is_important: boolean

  @column.dateTime({consume: (v)=> DateTime.fromJSDate(v).toFormat('yyyy-MM-dd HH:mm:ss')})
  declare reminder: DateTime | null

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
    let query = Todo.query()
      .where('id', todo.id)

    if (todo.is_completed) {
      await query
        .update({ completed_at: DateTime.now().toString() })
    } else {
      await query.update({ completed_at: null })
    }
  }
}