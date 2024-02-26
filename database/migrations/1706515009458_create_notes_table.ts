import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'notes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').references('id')
      .inTable('users').onDelete('cascade').unsigned()
      table.integer('category_id').references('id')
      .inTable('categories').onDelete('set null').unsigned()
      table.text('note').notNullable()
      table.boolean('is_favorite').defaultTo(false)
      table.boolean('is_deleted').defaultTo(false)
      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}