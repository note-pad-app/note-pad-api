import { test } from "@japa/runner";
import testUtils from "@adonisjs/core/services/test_utils";
import { UserFactory } from "#database/factories/user_factory";

test.group("change password", (group) => {
    group.each.setup(async () => {
        await testUtils.db().withGlobalTransaction();
    });

    test("change password successfully", async ({ client }) => {
        let password = "123"
        let user = await UserFactory.merge({ password }).create()

        const response = await client
            .patch(`api/auth/change-password`)
            .json({
                old_password: password,
                new_password: "111"
            })
            .loginAs(user)

        response.assertStatus(200)
        response.assertBodyContains({
            message: "password is updated successfully"
        })

    });

    test("change password incorrect", async ({ client }) => {
        let user = await UserFactory.create()

        const response = await client
            .patch(`api/auth/change-password`)
            .json({
                old_password: "sss",
                new_password: "111"
            })
            .loginAs(user)

        response.assertStatus(403)
        response.assertBodyContains({
            message: "incorrect password"
        })

    });

    test("change password invalid fields", async ({ client }) => {
        let user = await UserFactory.create()

        const response = await client
            .patch(`api/auth/change-password`)
            .json({
                old_password: false,
                new_password: true
            })
            .loginAs(user)

        response.assertStatus(422)

        response.assertBodyContains({
            "errors": [
                {
                    "field": "old_password",
                    "message": "The old_password field must be a string",
                    "rule": "string",
                },
                {
                    "field": "new_password",
                    "message": "The new_password field must be a string",
                    "rule": "string",
                },
            ],
        })

    });

});
