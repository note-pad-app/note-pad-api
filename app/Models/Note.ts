import { DateTime } from 'luxon'
import { belongsTo, column } from '@adonisjs/lucid/orm'
import MyModel from './model.js'
import { storeValidator, updateValidator } from '#validators/note';
import User from './user.js';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import Category from './category.js';

export default class Note extends MyModel {
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
  declare note: string

  @column({
    consume: (v) => Boolean(v),
  })
  declare is_favorite: boolean

  @column({
    consume: (v) => Boolean(v),
  })
  declare is_deleted: number

  @column.dateTime({ autoCreate: true, consume: (v)=> DateTime.fromJSDate(v).toFormat('yyyy-MM-dd HH:mm:ss')})
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // relationships

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Category)
  declare category: BelongsTo<typeof Category>

}