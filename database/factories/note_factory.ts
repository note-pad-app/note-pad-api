import factory from '@adonisjs/lucid/factories'
import Note from '#models/note'
import { UserFactory } from './user_factory.js'
import { CategoryFactory } from './category_factory.js'

export const NoteFactory = factory
  .define(Note, async ({ faker }) => {
    return {
      note: faker.lorem.paragraph(),

    }
  })
  .relation('user', () => UserFactory)
  .relation('category', () => CategoryFactory)
  .build()