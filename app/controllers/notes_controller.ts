import Note from "#models/note";
import { HttpContext } from "@adonisjs/core/http";
import CrudsController from "./cruds_controller.js";
import { favoriteValidator } from "#validators/note";
import NotePolicy from "#policies/note_policy";

export default class NotesController extends CrudsController {
    constructor() {
        super();
        this.model = Note;
        this.policy = NotePolicy
    }

    async markAsFavorite({request, params, response}: HttpContext){
        let { favorite } = await request.validateUsing(favoriteValidator)
        let note = await Note.findOrFail(params.id)
        note.is_favorite = favorite;
        await note.save()

        return response.status(204).send("updated")
    }
}