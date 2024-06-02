import vine from '@vinejs/vine'
import { uniqueRule } from './rules/unique.js'

export const profileValidator = vine.compile(
  vine.object({
      fullname: vine.string().optional(),
      avatar_path: vine.string().trim().optional(),
      username: vine.string().trim().use(
          uniqueRule({ table: 'users', column: 'username' })
      ).optional(),
  })
)

export const uploadAvatarValidator = vine.compile(
  vine.object({
    avatar: vine.file({
      size: '2mb',
      extnames: ['jpg', 'png', 'pdf']
    })
  })
)