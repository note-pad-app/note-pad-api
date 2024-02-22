import type { HttpContext } from '@adonisjs/core/http'
import User from "#models/user";

import {
  ForgotPasswordValidator,
  PasswordChangeValidator,
  // ResetPasswordValidator,
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
    
  }

  async resetPassword({ request }: HttpContext) {
 
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
