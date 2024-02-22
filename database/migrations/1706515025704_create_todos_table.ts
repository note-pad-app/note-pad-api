import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'todos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').references('id')
      .inTable('users').onDelete('cascade').unsigned()
      table.string('todo').notNullable()
      table.dateTime('completed_at').nullable()
      table.boolean('is_important').defaultTo(false)
      table.dateTime('reminder').nullable()
      table.string('remarks').nullable()
      table.boolean('is_deleted').defaultTo(false)
      table.boolean('is_completed').defaultTo(false)
      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}