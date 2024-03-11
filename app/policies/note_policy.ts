import User from '#models/user'
import Note from '#models/note'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class NotePolicy extends BasePolicy {
  /**
   * Every logged-in user can create a note
   */
  create(): AuthorizerResponse {
    return true
  }

  /**
   * Only the post creator can edit the post
   */
  edit(user: User, note: Note): AuthorizerResponse {
    return user.id === note.userId
  }

  /**
   * Only the note creator can delete the note
   */
  delete(user: User, note: Note): AuthorizerResponse {
    return user.id === note.userId
  }

  /**
   * Only the note creator can see the note
   */
  show(user: User, note: Note): AuthorizerResponse {
    return user.id === note.userId
  }

}