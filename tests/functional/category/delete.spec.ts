import { test } from "@japa/runner";
import { UserFactory } from "#database/factories/user_factory";
import testUtils from "@adonisjs/core/services/test_utils";
import { CategoryFactory } from "#database/factories/category_factory";
import Category from "#models/category";

test.group("category delete", (group) => {
    group.each.setup(() => testUtils.db().withGlobalTransaction());

    test("delete", async ({ client, assert}) => {
        let user = await UserFactory.create()
        let cat = await CategoryFactory.merge({userId: user.id, type: 'todo'}).create()
        
        const response = await client
            .delete(`api/categories/${cat.id}`)
            .loginAs(user)

        response.assertStatus(202)

        let deleted_cat = await Category.find(cat.id)

        assert.equal(deleted_cat, null)

    });
});