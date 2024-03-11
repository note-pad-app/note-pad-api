import { test } from "@japa/runner";
import { UserFactory } from "#database/factories/user_factory";
import testUtils from "@adonisjs/core/services/test_utils";
import { CategoryFactory } from "#database/factories/category_factory";
import Category from "#models/category";

test.group("category update", (group) => {
    group.each.setup(() => testUtils.db().withGlobalTransaction());

    test("category updating without any error", async ({ client, assert }) => {
        let user = await UserFactory.create()
        let cat = await CategoryFactory.merge({userId: user.id}).create()

        let data = {
            name: 'work',
        }

        const response = await client
            .put(`api/categories/${cat.id}`)
            .json(data)
            .loginAs(user)

        let result = await Category.findOrFail(cat.id)

        assert.equal(result.name, data.name)

        response.assertStatus(204)

    });

    test("category storing with invalid name", async ({ client }) => {
        let user = await UserFactory.create()

        let cat = await CategoryFactory.merge({userId: user.id}).create()

        const response = await client
            .put(`api/categories/${cat.id}`)
            .json({name: false})
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