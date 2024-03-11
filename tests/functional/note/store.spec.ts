import { test } from "@japa/runner";
import { UserFactory } from "#database/factories/user_factory";
import testUtils from "@adonisjs/core/services/test_utils";
import { CategoryFactory } from "#database/factories/category_factory";

test.group("Note store", (group) => {
    group.each.setup(() => testUtils.db().withGlobalTransaction());

    test("Note storing without any error", async ({ client }) => {
        let user = await UserFactory.create()
        let cat = await CategoryFactory.create()

        let data = {
            categoryId: cat.id,
            note: "something",
        }

        const response = await client
            .post(`api/notes`)
            .json(data)
            .loginAs(user)

        response.assertStatus(201)

        response.assertBodyContains({
            note: data.note,
            userId: user.id,
            createdAt: Date,
            updatedAt: Date,
          })
        

    });

    test("Note storing with no data", async ({ client }) => {
        let user = await UserFactory.create()

        const response = await client
            .post(`api/notes`)
            .loginAs(user)

        response.assertBodyContains({
            errors: [
                {
                    message: 'The note field must be defined', 
                    rule: 'required',
                    field: 'note'
                }
            ]
        })

        response.assertStatus(422)

    });

    test("Note storing with invalid data", async ({ client }) => {
        let user = await UserFactory.create()

        const response = await client
            .post(`api/notes`)
            .json({note: false})
            .loginAs(user)

        response.assertBodyContains({
            errors: [
                {
                    message: 'The note field must be a string', 
                    rule: 'string',
                    field: 'note'
                }
            ]
        })

        response.assertStatus(422)

    });

    
});