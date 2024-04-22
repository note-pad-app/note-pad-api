import User from '#models/user'
import CrudsController from './cruds_controller.js'
import ProfilePolicy from '#policies/profile_policy'
import { HttpContext } from '@adonisjs/core/http';
import { uploadAvatarValidator } from '#validators/profile';
import { cuid } from '@adonisjs/core/helpers'
import app from '@adonisjs/core/services/app'

export default class ProfilesController extends CrudsController {
    constructor() {
        super()
        this.model = User;
        this.policy = ProfilePolicy;
    }

    async uploadAvatar({ request }: HttpContext) {
        const { avatar } = await request.validateUsing(
            uploadAvatarValidator
        )

        await avatar.move(app.makePath('uploads'), {
            name: `${cuid()}.${avatar.extname}`
        })

        return avatar.filePath;
    }

    
}