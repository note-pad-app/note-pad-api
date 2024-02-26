import vine from '@vinejs/vine'
import { uniqueRule } from './rules/unique.js'

export const categoryValidator = vine.compile(
    vine.object({
        name: vine.string().use(
            uniqueRule({ table: 'categories', column: 'name' })
        ),
        type: vine.enum(['note', 'todo']),
    })
)