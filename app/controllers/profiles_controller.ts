import User from '#models/user'
import { profileValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProfilesController {

    public async show({params, response}: HttpContext){
        let user = await User.findOrFail(params.id)

        return response.status(200).json(user)
    }

    public async edit({request, params, response}: HttpContext){
        let payload = await request.validateUsing(profileValidator)
        let user = await User.findOrFail(params.id)
        user.merge(payload)
        await user.save()

        return response.status(204)
    }

    public async remove({params, response}: HttpContext){
        let user = await User.findOrFail(params.id)

        user.delete()

        return response.status(202)
    }
}