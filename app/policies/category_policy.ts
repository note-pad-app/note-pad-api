import User from '#models/user'
import Category from '#models/category'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class CategoryPolicy extends BasePolicy {
  /**
   * Every logged-in user can create a category
   */
  create(): AuthorizerResponse {
    return true
  }

  /**
   * Only the post creator can edit the post
   */
  edit(user: User, category: Category): AuthorizerResponse {
    return user.id === category.user_id
  }

  /**
   * Only the category creator can delete the category
   */
  delete(user: User, category: Category): AuthorizerResponse {
    return user.id === category.user_id
  }

  /**
   * Only the category creator can see the category
   */
  show(user: User, category: Category): AuthorizerResponse {
    return user.id === category.user_id
  }

  /**
   * Only the category creator can see the category list
   */
  index(user: User, category: Category): AuthorizerResponse {
    return user.id === category.user_id
  }
}