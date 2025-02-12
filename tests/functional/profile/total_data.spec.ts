import { test } from "@japa/runner";
import { UserFactory } from "#database/factories/user_factory";
import testUtils from "@adonisjs/core/services/test_utils";

test.group("total notes and todos", (group) => {
    group.each.setup(() => testUtils.db().withGlobalTransaction());

    test("total data", async ({ client }) => {
        await UserFactory
        .with('notes', 3)
        .with('todos', 3)
        .create()

        let user = await UserFactory
        .with('notes', 3)
        .with('todos', 3)
        .create()
        
        const response = await client
            .get(`api/profile/data/get-total`)
            .loginAs(user)

        response.assertBodyContains({ total_notes: 3, total_todos: 3 })
    });
});