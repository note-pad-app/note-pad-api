import Todo from "#models/todo";
import { HttpContext } from "@adonisjs/core/http";
import CrudsController from "./cruds_controller.js";
import { completedValidator } from "#validators/todo";
import TodoPolicy from "#policies/todo_policy";

export default class TodosController extends CrudsController {
    constructor() {
        super();
        this.model = Todo
        this.policy = TodoPolicy
    }

    async markAsCompleted({ request, params }: HttpContext) {
        let { is_completed } = await request.validateUsing(completedValidator)
        let todo = await Todo.findOrFail(params.id)
        todo.is_completed = is_completed;
        await todo.save()

        return "updated"
    }
}