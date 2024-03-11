import { test } from "@japa/runner";
import { UserFactory } from "#database/factories/user_factory";
import testUtils from "@adonisjs/core/services/test_utils";
import { CategoryFactory } from "#database/factories/category_factory";

test.group("category show", (group) => {
    group.each.setup(() => testUtils.db().withGlobalTransaction());

    test("one category", async ({ client }) => {
        let user = await UserFactory.create()
        let cat = await CategoryFactory
        .merge({userId: user.id, type: 'todo'})
        .with('notes')
        .with('todos')
        .create()
        
        const response = await client
            .get(`api/categories/${cat.id}`)
            .loginAs(user)

        response.assertBodyContains({
            id: cat.id,
            userId: cat.userId,
            type: cat.type,
            name: cat.name,
            notes: [],
            todos: [],
            user: {},
            createdAt: Date,
            updatedAt: Date
          })
    });
});