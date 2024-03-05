import User from '#models/user'
import Todo from '#models/todo'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class TodoPolicy extends BasePolicy {
  /**
   * Every logged-in user can create a todo
   */
  create(): AuthorizerResponse {
    return true
  }

  /**
   * Only the post creator can edit the post
   */
  edit(user: User, todo: Todo): AuthorizerResponse {
    return user.id === todo.user_id
  }

  /**
   * Only the todo creator can delete the todo
   */
  delete(user: User, todo: Todo): AuthorizerResponse {
    return user.id === todo.user_id
  }

  /**
   * Only the todo creator can see the todo
   */
  show(user: User, todo: Todo): AuthorizerResponse {
    return user.id === todo.user_id
  }

}