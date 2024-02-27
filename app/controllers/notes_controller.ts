import Note from "#models/note";
import CrudsController from "./cruds_controller.js";

export default class NotesController extends CrudsController {
    constructor() {
        super();
        this.model = Note;
    }
}