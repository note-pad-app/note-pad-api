import { test } from "@japa/runner";
import { UserFactory } from "#database/factories/user_factory";
import testUtils from "@adonisjs/core/services/test_utils";
import { CategoryFactory } from "#database/factories/category_factory";

test.group("category list", (group) => {
    group.each.setup(() => testUtils.db().withGlobalTransaction());

    test("categories", async ({ client }) => {
        let user = await UserFactory.create()
        await CategoryFactory.merge({userId: user.id}).createMany(40)
        
        const response = await client
            .get(`api/categories`)
            .loginAs(user)

        response.assertBodyContains(
            { 
                data: [],
                total: 40, 
                page: 1, 
                perPage: 10 
            }
        )
    });

});