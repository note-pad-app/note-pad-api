import factory from '@adonisjs/lucid/factories'
import Category from '#models/category'
import { UserFactory } from './user_factory.js'
import { NoteFactory } from './note_factory.js'
import { TodoFactory } from './todo_factory.js'

export const CategoryFactory = factory
  .define(Category, async ({ faker }) => {
    return {
      name: faker.internet.userName(),
    }
  })
  .relation('user', ()=> UserFactory)
  .relation('notes', () => NoteFactory)
  .relation('todos', () => TodoFactory)
  .build()