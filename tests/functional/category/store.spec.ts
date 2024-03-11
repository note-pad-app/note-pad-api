import { test } from "@japa/runner";
import { UserFactory } from "#database/factories/user_factory";
import testUtils from "@adonisjs/core/services/test_utils";

test.group("category store", (group) => {
    group.each.setup(() => testUtils.db().withGlobalTransaction());

    test("category storing without any error", async ({ client }) => {
        let user = await UserFactory.create()
        let data = {
            name: 'work',
        }

        const response = await client
            .post(`api/categories`)
            .json(data)
            .loginAs(user)

        response.assertStatus(201)

        response.assertBodyContains({
            userId: user.id,
            name: data.name,
            createdAt: Date,
            updatedAt: Date
        })
    });

    test("category storing with no name", async ({ client }) => {
        let user = await UserFactory.create()

        const response = await client
            .post(`api/categories`)
            .loginAs(user)

        response.assertBodyContains({
            errors: [
                {
                    message: 'The name field must be defined', 
                    rule: 'required',
                    field: 'name'
                }
            ]
        })

        response.assertStatus(422)

    });

    test("category storing with invalid name", async ({ client }) => {
        let user = await UserFactory.create()

        const response = await client
            .post(`api/categories`)
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

        response.assertStatus(422)

    });

    
});