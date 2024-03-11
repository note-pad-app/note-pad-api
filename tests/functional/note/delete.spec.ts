import { test } from "@japa/runner";
import { UserFactory } from "#database/factories/user_factory";
import testUtils from "@adonisjs/core/services/test_utils";
import { NoteFactory } from "#database/factories/note_factory";
import Note from "#models/note";

test.group("note delete", (group) => {
    group.each.setup(() => testUtils.db().withGlobalTransaction());

    test("delete", async ({ client, assert}) => {
        let user = await UserFactory.create()
        let note = await NoteFactory.merge({userId: user.id}).create()
        
        const response = await client
            .delete(`api/notes/${note.id}`)
            .loginAs(user)

        response.assertStatus(202)

        let deleted_note = await Note.find(note.id)

        assert.equal(deleted_note, null)

    });
});