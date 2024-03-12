import { test } from "@japa/runner";
import { UserFactory } from "#database/factories/user_factory";
import testUtils from "@adonisjs/core/services/test_utils";
import { TodoFactory } from "#database/factories/todo_factory";
import Todo from "#models/todo";

test.group("todo complete", (group) => {
    group.each.setup(() => testUtils.db().withGlobalTransaction());

    test("complete", async ({ client, assert}) => {
        let user = await UserFactory.create()
        let todo = await TodoFactory
        .merge({userId: user.id, is_completed: false})
        .with('category')
        .create()
        
        const response = await client
            .patch(`api/todos/${todo.id}/complete`)
            .json({
                is_complete: true
            })
            .loginAs(user)

        let d_todo = await Todo.findOrFail(todo.id)

        assert.equal(d_todo.is_completed, true)

        response.assertStatus(204)
    });
});