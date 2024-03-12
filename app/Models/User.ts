import { DateTime } from 'luxon'
import { withAuthFinder } from '@adonisjs/auth'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { column, hasMany} from '@adonisjs/lucid/orm'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import MyModel from './model.js'
import { profileValidator } from '#validators/user'
import Todo from './todo.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Note from './note.js'
import Category from './category.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['username', 'email'],
  passwordColumnName: 'password',
})

export default class User extends compose(MyModel, AuthFinder) {

  static get updateValidator(){
    return profileValidator;
  }

  static get softDelete(){
    return false;
  }

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare firstname: string

  @column()
  declare lastname: string

  @column()
  declare username: string

  @column()
  declare photo: string

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare rememberMeToken: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  //---------------------------------Relationships---------------------------------------------//
  @hasMany(()=> Todo)
  declare todos: HasMany<typeof Todo>
  
  @hasMany(()=> Note)
  declare notes: HasMany<typeof Note>

  @hasMany(()=> Category)
  declare categories: HasMany<typeof Category> 
   
  // functions .................................
  static accessTokens = DbAccessTokensProvider.forModel(User)

  //---------------------------------Hooks---------------------------------------------//

}