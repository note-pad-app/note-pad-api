import { DateTime } from 'luxon'
import { withAuthFinder } from '@adonisjs/auth'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { column} from '@adonisjs/lucid/orm'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import MyModel from './model.js'
import { profileValidator } from '#validators/user'

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
  declare country: string

  @column()
  declare job: string

  @column()
  declare username: string

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

  static accessTokens = DbAccessTokensProvider.forModel(User)

  //---------------------------------Hooks---------------------------------------------//

}