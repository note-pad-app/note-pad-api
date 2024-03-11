import { test } from "@japa/runner";
import { UserFactory } from "#database/factories/user_factory";
import testUtils from "@adonisjs/core/services/test_utils";
import { NoteFactory } from "#database/factories/note_factory";
import Note from "#models/note";

test.group("Note update", (group) => {
    group.each.setup(() => testUtils.db().withGlobalTransaction());

    test("Note updating without any error", async ({ client, assert }) => {
        let user = await UserFactory.create()
        let note = await NoteFactory.merge({ userId: user.id }).create()

        let data = {
            note: 'work',
        }

        const response = await client
            .put(`api/notes/${note.id}`)
            .json(data)
            .loginAs(user)

        let result = await Note.findOrFail(note.id)

        assert.equal(result.note, data.note)

        response.assertStatus(204)

    });

    test("Note storing with invalid data", async ({ client }) => {
        let user = await UserFactory.create()

        let note = await NoteFactory.merge({ userId: user.id }).create()

        const response = await client
            .put(`api/notes/${note.id}`)
            .json({ note: false })
            .loginAs(user)

        response.assertBodyContains({
            errors: [
                {
                    message: 'The note field must be a string',
                    rule: 'string',
                    field: 'note'
                }
            ]
        })

    });


});