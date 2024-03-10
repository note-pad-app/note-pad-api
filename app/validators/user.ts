import vine from '@vinejs/vine'
import { uniqueRule } from './rules/unique.js'

export const profileValidator = vine.compile(
    vine.object({
        firstname: vine.string().trim().optional(),
        lastname: vine.string().trim().optional(),
        photo: vine.string().trim().optional(),
        username: vine.string().trim().use(
            uniqueRule({ table: 'users', column: 'username' })
        ).optional(),
        email: vine.string().trim().email().use(
            uniqueRule({ table: 'users', column: 'email' })
        ).optional(),
    })
)