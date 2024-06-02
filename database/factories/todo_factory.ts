import factory from '@adonisjs/lucid/factories'
import Todo from '#models/todo'
import { UserFactory } from './user_factory.js'
import { CategoryFactory } from './category_factory.js'
import { DateTime } from 'luxon'

export const TodoFactory = factory
  .define(Todo, async ({ faker }) => {
    return {
      todo: faker.lorem.sentence(),
      reminder: DateTime.now()
    }
  })
  .relation('user', () => UserFactory)
  .relation('category', () => CategoryFactory)
  .build()