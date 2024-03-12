import { test } from "@japa/runner";
import testUtils from "@adonisjs/core/services/test_utils";
import { UserFactory } from "#database/factories/user_factory";
import User from "#models/user";

test.group("user delete", (group) => {
    group.each.setup(() => testUtils.db().withGlobalTransaction());

    test("delete", async ({ client, assert}) => {
        let user = await UserFactory.create()
        
        const response = await client
            .delete(`api/profile/${user.id}`)
            .loginAs(user)
            
        response.assertStatus(202)

        let deleted_user = await User.find(user.id)

        assert.equal(deleted_user, null)

    });
});