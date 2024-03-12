import { test } from "@japa/runner";
import { UserFactory } from "#database/factories/user_factory";
import testUtils from "@adonisjs/core/services/test_utils";
import { CategoryFactory } from "#database/factories/category_factory";

test.group("todo store", (group) => {
    group.each.setup(() => testUtils.db().withGlobalTransaction());

    test("todo storing without any error", async ({ client }) => {
        let user = await UserFactory.create()
        let cat = await CategoryFactory.create()

        let data = {
            categoryId: cat.id,
            todo: "something",
            is_important: true,
            reminder: '2022-12-12 04:02:22',
            remarks: "remark",
        }

        const response = await client
            .post(`api/todos`)
            .json(data)
            .loginAs(user)

        response.assertStatus(201)

        response.assertBodyContains({
            todo: data.todo,
            userId: user.id,
            isImportant: data.is_important,
            reminder: data.reminder,
            remarks: data.remarks,
            createdAt: Date,
            updatedAt: Date,
        })
    });

    test("todo storing with no data", async ({ client }) => {
        let user = await UserFactory.create()

        const response = await client
            .post(`api/todos`)
            .loginAs(user)

        response.assertBodyContains({
            errors: [
                {
                    message: 'The todo field must be defined',
                    rule: 'required',
                    field: 'todo'
                }
            ]
        })

        response.assertStatus(422)

    });

    test("todo storing with invalid data", async ({ client }) => {
        let user = await UserFactory.create()

        const response = await client
            .post(`api/todos`)
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