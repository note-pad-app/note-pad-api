import { test } from "@japa/runner";
import { UserFactory } from "#database/factories/user_factory";
import testUtils from "@adonisjs/core/services/test_utils";
import { NoteFactory } from "#database/factories/note_factory";

test.group("Note list", (group) => {
    group.each.setup(() => testUtils.db().withGlobalTransaction());

    test("notes", async ({ client }) => {
        let user = await UserFactory.create()
        await NoteFactory.merge({userId: user.id}).createMany(40)
        
        const response = await client
            .get(`api/notes`)
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

    test("notes with pagination", async ({ client }) => {
        let user = await UserFactory.create()
        await NoteFactory.merge({userId: user.id}).createMany(40)
        
        const response = await client
            .get(`api/notes?page=2&perPage=3`)
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