import { DateTime } from 'luxon'
import { column } from '@adonisjs/lucid/orm'
import MyModel from './model.js';
import { categoryValidator } from '#validators/category';

export default class Category extends MyModel {
  static get validator(){
    return categoryValidator;
  }

  static get softDelete(){
    return false;
  }

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare user_id: number;

  @column()
  declare name: string;

  @column()
  declare type: 'note' | 'todo';

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}