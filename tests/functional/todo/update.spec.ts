import { test } from "@japa/runner";
import { UserFactory } from "#database/factories/user_factory";
import testUtils from "@adonisjs/core/services/test_utils";
import { CategoryFactory } from "#database/factories/category_factory";
import { TodoFactory } from "#database/factories/todo_factory";
import Todo from "#models/todo";

test.group("todo update", (group) => {
    group.each.setup(() => testUtils.db().withGlobalTransaction());

    test("todo updating without any error", async ({ client, assert }) => {
        let user = await UserFactory.create()
        let cat = await CategoryFactory.create()
        let todo = await TodoFactory.merge({ userId: user.id }).with('category').create()

        let data = {
            categoryId: cat.id,
            todo: "something",
            is_important: true,
            reminder: '2022-12-12T04:02:22.000+00:00',
            remarks: "remark",
        }

        const response = await client
            .put(`api/todos/${todo.id}`)
            .json(data)
            .loginAs(user)

        let result = await Todo.findOrFail(todo.id)
        
        assert.equal(result.todo, data.todo)
        assert.equal(result.categoryId, data.categoryId)
        assert.equal(result.is_important, data.is_important)
        assert.equal(result.reminder.toString(), data.reminder)
        assert.equal(result.remarks, data.remarks)

        response.assertStatus(204)

    });

    test("todo updating with invalid data", async ({ client }) => {
        let user = await UserFactory.create()

        let todo = await TodoFactory.merge({ userId: user.id }).with('category').create()

        const response = await client
            .put(`api/todos/${todo.id}`)
            .json({
                categoryId: false,
                todo: 2323,
                is_important: 23,
                reminder: true,
                remarks: 2323,
            })
            .loginAs(user)

        response.assertBodyContains({
            errors: [
                {
                    message: 'The todo field must be a string',
                    rule: 'string',
                    field: 'todo'
                },
                {
                    message: 'The remarks field must be a string',
                    rule: 'string',
                    field: 'remarks'
                },
                {
                    message: 'The value must be a boolean',
                    rule: 'boolean',
                    field: 'is_important'
                },
                {
                    message: 'The reminder field must be a string',
                    rule: 'string',
                    field: 'reminder'
                }
            ]
        })

        response.assertStatus(422)

    });


});