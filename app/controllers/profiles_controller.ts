import User from '#models/user'
import CrudsController from './cruds_controller.js'
import ProfilePolicy from '#policies/profile_policy'
import { HttpContext } from '@adonisjs/core/http';
import { uploadAvatarValidator } from '#validators/profile';
import { cuid } from '@adonisjs/core/helpers'
import app from '@adonisjs/core/services/app'
import Note from '#models/note';
import Todo from '#models/todo';
import env from '#start/env';

export default class ProfilesController extends CrudsController {
    constructor() {
        super()
        this.model = User;
        this.policy = ProfilePolicy;
    }

    public async uploadAvatar({ request }: HttpContext) {
        const { avatar } = await request.validateUsing(
            uploadAvatarValidator
        )

        await avatar.move(app.makePath('public/uploads'), {
            name: `${cuid()}.${avatar.extname}`
        })

        return {
            file_path: `${env.get("HOST")}:${env.get('PORT')}/uploads/${avatar.fileName}`
        }
    }

    public async getTotalData({auth}: HttpContext){
        const notes = await Note.query()
        .where({is_deleted: false})
        .where({userId: auth.user!.id})
        .count('* as note')
        const todos = await Todo.query()
        .where({is_deleted: false})
        .where({userId: auth.user!.id})
        .count('* as todo')
        let total_notes = notes[0].note
        let total_todos = todos[0].todo

        return {total_notes, total_todos}
    } 
}