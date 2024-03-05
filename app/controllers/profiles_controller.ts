import User from '#models/user'
import UserPolicy from '#policies/profile_policy'
import { profileValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import CrudsController from './cruds_controller.js'
import ProfilePolicy from '#policies/profile_policy'

export default class ProfilesController extends CrudsController{
    constructor(){
        super()
        this.model = User;
        this.policy = ProfilePolicy;
    }
    
    // public async show({params, response, bouncer}: HttpContext){
    //     let user = await User.findOrFail(params.id)

    //     if(await bouncer.with(UserPolicy).denies('edit', user)){
    //         return response.forbidden("you can not edit this user")
    //     }

    //     return response.status(200).json(user)
    // }

    // public async edit({request, params, response, bouncer}: HttpContext){
    //     let payload = await request.validateUsing(profileValidator)
    //     let user = await User.findOrFail(params.id)

    //     if(await bouncer.with(UserPolicy).denies('show', user)){
    //         return response.forbidden("you can not see this user")
    //     }
        
    //     user.merge(payload)
    //     await user.save()

    //     return response.status(204)
    // }

    // public async remove({params, response, bouncer}: HttpContext){
    //     let user = await User.findOrFail(params.id)

    //     if(await bouncer.with(UserPolicy).denies('delete', user)){
    //         return response.forbidden("you can not delete this user")
    //     }

    //     user.delete()

    //     return response.status(202)
    // }
}