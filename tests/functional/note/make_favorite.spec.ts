import { test } from "@japa/runner";
import { UserFactory } from "#database/factories/user_factory";
import testUtils from "@adonisjs/core/services/test_utils";
import { NoteFactory } from "#database/factories/note_factory";
import Note from "#models/note";

test.group("note favorite", (group) => {
    group.each.setup(() => testUtils.db().withGlobalTransaction());

    test("favorite", async ({ client, assert}) => {
        let user = await UserFactory.create()
        let note = await NoteFactory
        .merge({userId: user.id, is_favorite: false})
        .with('category')
        .create()
        
        const response = await client
            .patch(`api/notes/${note.id}/favorite`)
            .json({
                favorite: true
            })
            .loginAs(user)


        let d_note = await Note.findOrFail(note.id)

        assert.equal(d_note.is_favorite, true)

        response.assertStatus(204)
    });
});