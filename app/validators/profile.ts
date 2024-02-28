import vine from '@vinejs/vine'
import { uniqueRule } from './rules/unique.js'

export const profileValidator = vine.compile(
    vine.object({
        username: vine.string().use(
            uniqueRule({ table: 'users', column: 'username' })
        ).optional(),
        email: vine.string().use(
            uniqueRule({ table: 'email', column: 'email' })
        ).optional(),
        firstname: vine.string().optional(),
        lastname: vine.string().optional(),
        photo: vine.string().optional()
    })
)