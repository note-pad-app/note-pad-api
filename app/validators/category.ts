import vine from '@vinejs/vine'
import { uniqueRule } from './rules/unique.js'

let name = vine.string().use(
    uniqueRule({ table: 'categories', column: 'name'})
)

export const storeValidator = vine.compile(
    vine.object({
        name,
        type: vine.enum(['note', 'todo']).optional(),
    })
)

export const updateValidator = vine.compile(
    vine.object({
        name: name.optional(),
    })
)