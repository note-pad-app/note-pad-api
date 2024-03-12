import { test } from "@japa/runner";
import { UserFactory } from "#database/factories/user_factory";
import testUtils from "@adonisjs/core/services/test_utils";
import { TodoFactory } from "#database/factories/todo_factory";
import Todo from "#models/todo";

test.group("Todo delete", (group) => {
    group.each.setup(() => testUtils.db().withGlobalTransaction());

    test("delete", async ({ client, assert}) => {
        let user = await UserFactory.create()
        let todo = await TodoFactory.merge({userId: user.id}).create()
        
        const response = await client
            .delete(`api/todos/${todo.id}`)
            .loginAs(user)

        response.assertStatus(202)

        let deleted_Todo = await Todo.find(todo.id)

        assert.equal(deleted_Todo, null)

    });
});