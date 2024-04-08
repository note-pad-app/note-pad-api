import { test } from "@japa/runner";
import { UserFactory } from "#database/factories/user_factory";
import testUtils from "@adonisjs/core/services/test_utils";

test.group("profile show", (group) => {
    group.each.setup(() => testUtils.db().withGlobalTransaction());

    test("profile", async ({ client }) => {
        let user = await UserFactory
        .create()
        
        const response = await client
            .get(`api/profile/${user.id}`)
            .loginAs(user)

        response.assertBodyContains({
            id: user.id,
            fullname: user.fullname,
            username: user.username,
            email: user.email,        
            createdAt: Date,
            updatedAt: Date 
          })

    });
});