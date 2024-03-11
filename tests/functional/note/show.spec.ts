import { test } from "@japa/runner";
import { UserFactory } from "#database/factories/user_factory";
import testUtils from "@adonisjs/core/services/test_utils";
import { NoteFactory } from "#database/factories/note_factory";

test.group("note show", (group) => {
    group.each.setup(() => testUtils.db().withGlobalTransaction());

    test("one note", async ({ client }) => {
        let user = await UserFactory.create()
        let note = await NoteFactory
        .merge({userId: user.id})
        .with('category')
        .create()
        
        const response = await client
            .get(`api/notes/${note.id}`)
            .loginAs(user)

        response.assertBodyContains({
            id: note.id,
            userId: user.id,
            categoryId: note.categoryId,
            note: note.note,
            isFavorite: false,
            isDeleted: false,
            createdAt: Date,   
            updatedAt: Date    
          })
    });
});