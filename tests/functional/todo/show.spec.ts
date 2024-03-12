
import { test } from "@japa/runner";
import { UserFactory } from "#database/factories/user_factory";
import testUtils from "@adonisjs/core/services/test_utils";
import { TodoFactory } from "#database/factories/todo_factory";

test.group("todo show", (group) => {
    group.each.setup(() => testUtils.db().withGlobalTransaction());

    test("one todo", async ({ client }) => {
        let user = await UserFactory.create()
        let todo = await TodoFactory
        .merge({userId: user.id})
        .with('category')
        .create()
        
        const response = await client
            .get(`api/todos/${todo.id}`)
            .loginAs(user)
            
        response.assertBodyContains({
            id: todo.id,
            userId: user.id,
            categoryId: todo.categoryId,
            todo: todo.todo,
            completedAt: null,
            isImportant: false,
            reminder: null,
            remarks: null,
            isDeleted: false,
            isCompleted: false,
            createdAt: Date,   
            updatedAt: Date    
          })
    });
});