import Todo from "#models/todo";
import CrudsController from "./cruds_controller.js";

export default class TodosController extends CrudsController{
    constructor(){
        super();
        this.model = Todo

    }
}