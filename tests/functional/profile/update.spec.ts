import { test } from "@japa/runner";
import { UserFactory } from "#database/factories/user_factory";
import testUtils from "@adonisjs/core/services/test_utils";
import User from "#models/user";

test.group("user update", (group) => {
    group.each.setup(() => testUtils.db().withGlobalTransaction());

    test("user updating without any error", async ({ client, assert }) => {
        let user = await UserFactory.create()

        let data = {
            username: 'sis',
            firstname: 'ssis',
            lastname: 'ssss',
            email: 'ssis@gmail.com',
            photo: "/sljdlkdlkdjlkjd.com"
        }

        const response = await client
            .put(`api/profile/${user.id}`)
            .json(data)
            .loginAs(user)

        let result = await User.findOrFail(user.id)

        assert.equal(result.username, data.username)
        assert.equal(result.firstname, data.firstname)
        assert.equal(result.lastname, data.lastname)
        assert.equal(result.email, data.email)
        assert.equal(result.photo, data.photo)

        response.assertStatus(204)

    });

    test("user storing with invalid data", async ({ client }) => {
        let user = await UserFactory.create()


        const response = await client
            .put(`api/profile/${user.id}`)
            .json({
                username: 232,
                firstname: false,
                lastname: 232,
                email: false,
                photo: 4343
            })
            .loginAs(user)

        response.assertBodyContains({
            errors: [
              {
                message: 'The firstname field must be a string',
                rule: 'string',
                field: 'firstname'
              },
              {
                message: 'The lastname field must be a string',
                rule: 'string',
                field: 'lastname'
              },
              {
                message: 'The photo field must be a string',
                rule: 'string',
                field: 'photo'
              },
              {
                message: 'The username field must be a string',
                rule: 'string',
                field: 'username'
              },
              {
                message: 'The email field must be a string',
                rule: 'string',
                field: 'email'
              }
            ]
          })

    });

    test("user storing with invalid data", async ({ client }) => {
        let user = await UserFactory.create()


        const response = await client
            .put(`api/profile/${user.id}`)
            .json({
                username: 'sdlkjds',
                firstname: 'aldkjlsdk',
                lastname: 'aldkjsldkj',
                email: "sdlkjslkj",
                photo: "lsjkdlksjd;lds/sldkfjldskj/"
            })
            .loginAs(user)

        response.assertBodyContains({
            errors: [
              {
                message: 'The email field must be a valid email address',
                rule: 'email',
                field: 'email'
              }
            ]
          })

    });


});