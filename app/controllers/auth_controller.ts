import type { HttpContext } from '@adonisjs/core/http'
import User from "#models/user";
import mail from '@adonisjs/mail/services/main';

import {
  ForgotPasswordValidator,
  PasswordChangeValidator,
  ResetPasswordValidator,
  LoginValidator,
  UserValidator
} from "#validators/AuthValidator";
import hash from '@adonisjs/core/services/hash'

export default class AuthController {

  async login({ request }: HttpContext) {

    let { uids, password } = await request.validateUsing(LoginValidator);

    let user = await User.verifyCredentials(uids, password)

    let token = await User.accessTokens.create(user, ['*'],
      {
        expiresIn: '30 days'
      }
    )

    return token;

  }

  async register({ request }: HttpContext) {
    let { confirm, ...user } = await request.validateUsing(UserValidator)

    let newuser = await User.create(user)

    const token = await User.accessTokens.create(newuser, ['*'],
      {
        expiresIn: '30 days'
      }
    )

    return token
  }

  async forgotPassword({ request }: HttpContext) {
    let {uids} = await request.validateUsing(ForgotPasswordValidator)

    let user = await User.query().where({username: uids}).orWhere({email: uids}).first()

    if (user) {
      // Generate a unique token for password reset
      const token = await User.accessTokens.create(user)

      await mail.send((message) => {
        message
          .to('edrisssalokozay@gmail.com')
          .from('edrissaria8@gmail.com')
          .subject('Password Reset')
          .html(`<div style="text-align: center"><h2>Password Reset</h2><p>Click the link below to reset your password:</p><a href="http://localhost:3333?token=${token.hash}" style="margin-top: 1rem;background: blue; padding: 10px; border-radius: 2px; color: white">Reset Password</a></div>`)
      })
    }

    return 'An email with password reset instructions has been sent.'
      
  }

  async resetPassword({ request }: HttpContext) {
    let {user_id, password, token} = await request.validateUsing(ResetPasswordValidator)
    
    let user = await User.findOrFail(user_id);
    user.password = password;
    await user.save();
    
    return "password changed!";
  }

  async info({ auth }: HttpContext) {
    let user = auth.user;
    return { user };
  }

  async logout({ auth }: HttpContext) {
    let user = auth.user;

    await User.accessTokens.delete(user!, user!.currentAccessToken.identifier)

    return { logout: true };
  }

  async changePassword({ auth, request, response }: HttpContext) {
    const { old_password, new_password } = await request.validateUsing(PasswordChangeValidator);

    const user = await User.findOrFail(auth.user?.id);

    if (await hash.verify(user.password, old_password)) {
      user.merge({ password: new_password });
      await user.save();

      response
        .status(200)
        .json({ message: "password is updated successfully" });
    } else {
      response.status(403).json({ message: "incorrect password" });
    }
  }
}
