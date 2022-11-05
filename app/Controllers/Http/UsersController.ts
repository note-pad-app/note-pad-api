import Mail from '@ioc:Adonis/Addons/Mail'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';
import Env from '@ioc:Adonis/Core/Env'

export default class UsersController {
  public async register({request, response, auth}: HttpContextContract){
    try{

      const data = request.only(['username', 'email', 'password']);
      const user = await User.create(data)
      await auth.login(user)

      response.send(user)
      // const token = user.token

      // response.send(token.token)

      // const url = `${Env.get('BASE_URL')}users/${user.id}/verify/${token.teken}`

      // await Mail.send((message) => {
      //   message
      //     .from('note-pad-application.vercel.app')
      //     .to(request.input('email'))
      //     .subject('Email Varification')
      //     .htmlView('emails/varification', { name: request.input('username') })
      // })
      //   response.send('success')
    }catch(e){
      response.send(e)
    }
  }

  public async index({}: HttpContextContract) {}

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
