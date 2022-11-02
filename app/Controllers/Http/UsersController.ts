import Mail from '@ioc:Adonis/Addons/Mail'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsersController {
  public async register({request, response}: HttpContextContract){
    try{
      await Mail.send((message) => {
        message
          .from('info@example.com')
          .to(request.input('email'))
          .subject('Welcome Onboard!')
          .htmlView('emails/varification', { name: request.input('username') })
      })
        response.send('success')
    }catch(e){
      response.send('failed')
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
