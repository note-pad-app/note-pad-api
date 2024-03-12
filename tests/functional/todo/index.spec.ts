import { test } from "@japa/runner";
import { UserFactory } from "#database/factories/user_factory";
import testUtils from "@adonisjs/core/services/test_utils";
import { TodoFactory } from "#database/factories/todo_factory";

test.group("todo list", (group) => {
    group.each.setup(() => testUtils.db().withGlobalTransaction());

    test("todos", async ({ client }) => {
        let user = await UserFactory.create()
        await TodoFactory.merge({userId: user.id}).createMany(40)
        
        const response = await client
            .get(`api/todos`)
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

    test("todo with pagination", async ({ client }) => {
        let user = await UserFactory.create()
        await TodoFactory.merge({userId: user.id}).createMany(40)
        
        const response = await client
            .get(`api/todos?page=2&perPage=3`)
            .loginAs(user)

        response.assertBodyContains(
            { 
                data: [],
                total: 40, 
                page: 2, 
                perPage: 3 
            }
        )
    });

});