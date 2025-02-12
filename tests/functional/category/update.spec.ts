import { test } from "@japa/runner";
import { UserFactory } from "#database/factories/user_factory";
import testUtils from "@adonisjs/core/services/test_utils";
import { CategoryFactory } from "#database/factories/category_factory";

test.group("category update", (group) => {
    group.each.setup(() => testUtils.db().withGlobalTransaction());

    test("category updating without any error", async ({ client, assert }) => {
        let user = await UserFactory.create()
        let cat = await CategoryFactory.merge({ userId: user.id }).create()

        let data = {
            name: "work",
            type: "todo",
            user_id: user.id
        }

        const response = await client
            .put(`api/categories/${cat.id}`)
            .json(data)
            .loginAs(user)

        response.assertBodyContains({
            name: data.name
        })

        response.assertStatus(200)

    });

    test("category storing with invalid name", async ({ client }) => {
        let user = await UserFactory.create()

        let cat = await CategoryFactory.merge({ userId: user.id }).create()

        const response = await client
            .put(`api/categories/${cat.id}`)
            .json({ name: false })
            .loginAs(user)

        response.assertBodyContains({
            errors: [
                {
                    message: 'The name field must be a string',
                    rule: 'string',
                    field: 'name'
                }
            ]
        })

    });


});