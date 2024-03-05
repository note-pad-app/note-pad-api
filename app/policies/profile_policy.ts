import User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class ProfilePolicy extends BasePolicy {
 
  edit(user: User, user_data: User): AuthorizerResponse {
    return user.id === user_data.id
  }

  show(user: User, user_data: User): AuthorizerResponse {
    return user.id === user_data.id
  }

  delete(user: User, user_data: User): AuthorizerResponse {
    return user.id === user_data.id
  }

}