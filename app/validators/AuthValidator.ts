import vine from '@vinejs/vine'
import { uniqueRule } from './rules/unique.js'
import { existRule } from './rules/exists.js'
import { column } from '@adonisjs/lucid/orm'

export const LoginValidator = vine.compile(
  vine.object({
    uids: vine.string().trim(),
    password: vine.string(),
  })
)
  

export const UserValidator = vine.compile(
  vine.object({
    firstname: vine.string().trim(),
    lastname: vine.string().trim(),
    username: vine.string().trim().use(
      uniqueRule({ table: 'users', column: 'username' })
    ),
    email: vine.string().trim().email().use(
      uniqueRule({ table: 'users', column: 'email' })
    ),
    password: vine.string(),
    confirm: vine.string().confirmed({confirmationField: 'password'})
  })
)

export const PasswordChangeValidator  = vine.compile(
  vine.object({
    old_password: vine.string(),
    new_password: vine.string(),
  })    
)

export const PasswordConfirmationValidator = vine.compile (
  vine.object({
    password: vine.string().confirmed({confirmationField: 'password'}),
  })
)

export const ForgotPasswordValidator = vine.compile (
  vine.object({
    uids: vine.string().trim(),
  })
)

// export const ResetPasswordValidator = vine.compile(
  // constructor(protected ctx: HttpContextContract) {}
  // public refs = schema.refs({
  //   admin_id: this.ctx.request.body().admin_id,
  // });

  // vine.object({
  //   user_id: vine.number().use(existRule({table: 'users', column: 'id'})),
  //   token: vine.string()
  //     .use(existRule({table: 'auth_api_token', column: 'hash'}))
  //     rules.exists({
  //       column: "token",
  //       table: "admin_tokens",
  //       where: {
  //         is_revoked: false,
  //         admin_id: this.refs.admin_id,
  //         type: "password",
  //       },
  //     }),
  //   ]),
  //   password: vine.string([rules.confirmed()]),
  // });
// )

