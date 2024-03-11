import { DateTime } from 'luxon'
import { belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import MyModel from './model.js';
import { storeValidator, updateValidator } from '#validators/category';
import User from './user.js';
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations';
import Todo from './todo.js';
import Note from './note.js';

export default class Category extends MyModel {

  static get preloads() {
    return ["user", "notes", "todos"];
  }

  static get storeValidator(){
    return storeValidator;
  }

  static get updateValidator(){
    return updateValidator;
  }

  static get softDelete(){
    return false;
  }

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number;

  @column()
  declare name: string;

  @column()
  declare type: 'note' | 'todo';

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // relationships

  @belongsTo(()=> User)
  declare user: BelongsTo<typeof User>

  @hasMany(()=> Todo)
  declare todos: HasMany<typeof Todo>
  
  @hasMany(()=> Note)
  declare notes: HasMany<typeof Note>

}