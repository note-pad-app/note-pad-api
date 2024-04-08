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
      fullname: 'ssss',
      photo: "/sljdlkdlkdjlkjd.com"
    }

    const response = await client
      .put(`api/profile/${user.id}`)
      .json(data)
      .loginAs(user)

    let result = await User.findOrFail(user.id)

    assert.equal(result.username, data.username)
    assert.equal(result.fullname, data.fullname)
    assert.equal(result.photo, data.photo)

    response.assertStatus(204)

  });

  test("user updating with invalid data", async ({ client }) => {
    let user = await UserFactory.create()

    const response = await client
      .put(`api/profile/${user.id}`)
      .json({
        fullname: false,
        username: false,
        photo: 4343
      })
      .loginAs(user)

    response.assertBodyContains({
      errors: [
        {
          message: 'The fullname field must be a string',
          rule: 'string',
          field: 'fullname'
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
        }
      ]
    })
  });
});